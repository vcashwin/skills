// Plays and renders a video project (a dir with scenes.mjs, timeline.mjs, iso.mjs; see new.mjs):
//
//   node render.mjs <dir> --serve                 the player at http://127.0.0.1:<port>/ (scrub, play, jump to a scene)
//   node render.mjs <dir> --stills 3,12.5         <dir>/out/still-3.png, … (1920×1080)
//   node render.mjs <dir> --captions              every caption's start time, to pick stills from
//   node render.mjs <dir> --sheet [every]         <dir>/out/sheet.png: a frame of the rendered MP4 every 3 s, 4 across
//   node render.mjs <dir>                         <dir>/out/<dir name>.mp4, 1080p30 H.264
//     --from S --to S (a part) · --jobs N (parallel pages, default 6) · --fps 30 · --out file.mp4
//
// Frames are computed in Node (scenes are pure functions of time) and rasterised in headless Chromium with Inter embedded,
// then piped to ffmpeg. Needs ffmpeg on the PATH and playwright-core (see ../../illustration/scripts/browser.mjs).
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import { launch, open, shot } from "../../illustration/scripts/browser.mjs";

const arg = (name, dflt) => { const i = process.argv.indexOf(`--${name}`); return i < 0 ? dflt : process.argv[i + 1] ?? true; };
const has = name => process.argv.includes(`--${name}`);
const dir = process.argv[2] && !process.argv[2].startsWith("--") ? path.resolve(process.argv[2]) : null;
if (!dir || !fs.existsSync(path.join(dir, "scenes.mjs"))) { console.error("usage: node render.mjs <dir with scenes.mjs> [--serve | --stills 1,2 | --captions]"); process.exit(1); }
const here = import.meta.dirname, fonts = path.resolve(here, "../../illustration/fonts"), outDir = path.join(dir, "out");

if (has("serve")) {
  const types = { ".html": "text/html", ".mjs": "text/javascript", ".js": "text/javascript", ".woff2": "font/woff2" };
  const roots = { "/p/": dir, "/fonts/": fonts };
  http.createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = url === "/" ? path.join(here, "player.html") : null;
    for (const [prefix, root] of Object.entries(roots)) if (url.startsWith(prefix)) { const f = path.join(root, url.slice(prefix.length)); if (f.startsWith(root + path.sep)) file = f; }
    if (!file || !fs.statSync(file, { throwIfNoEntry: false })?.isFile()) { res.writeHead(404).end(); return; }
    res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream", "cache-control": "no-store" });
    fs.createReadStream(file).pipe(res);
  }).listen(Number(arg("port", 0)), "127.0.0.1", function () { console.log(`player: http://127.0.0.1:${this.address().port}/`); });
} else {
  const { frame, DURATION, sceneList } = await import(pathToFileURL(path.join(dir, "scenes.mjs")).href);
  const mp4 = path.resolve(arg("out", path.join(outDir, `${path.basename(dir)}.mp4`)));
  if (has("sheet")) {
    const every = Number(arg("sheet")) || 3, rows = Math.ceil(Math.ceil(DURATION / every) / 4), sheet = path.join(outDir, "sheet.png");
    if (!fs.existsSync(mp4)) { console.error(`render the video first (${mp4})`); process.exit(1); }
    await new Promise((r, x) => spawn("ffmpeg", ["-y", "-loglevel", "error", "-i", mp4, "-vf", `fps=1/${every},scale=480:-1,tile=4x${rows}`, "-frames:v", "1", sheet], { stdio: "inherit" })
      .on("close", c => c ? x(new Error(`ffmpeg exited ${c}`)) : r()));
    console.log(sheet);
    process.exit(0);
  }
  if (has("captions")) {
    for (const s of sceneList()) { console.log(`${s.start.toFixed(1).padStart(6)}  ${s.id}`); for (const c of s.captions) console.log(`${c.at.toFixed(1).padStart(6)}    ${c.text}`); }
    console.log(`${DURATION.toFixed(1).padStart(6)}  end`);
    process.exit(0);
  }
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await launch(), page = () => open(browser, { width: 1920, height: 1080 });
  if (has("stills")) {
    const p = await page();
    const times = String(arg("stills")).split(",").map(Number);
    if (times.some(Number.isNaN)) { console.error("--stills takes seconds: --stills 3,12.5"); process.exit(1); }
    for (const t of times) {
      const file = path.join(outDir, `still-${t}.png`);
      fs.writeFileSync(file, await shot(p, frame(t)));
      console.log(file);
    }
  } else {
    const fps = Number(arg("fps", 30)), from = Number(arg("from", 0)), to = Math.min(DURATION, Number(arg("to", DURATION)));
    const frames = Math.round((to - from) * fps), jobs = Math.max(1, Math.min(frames, Number(arg("jobs", 6))));
    const out = mp4;
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "illustration-video-"));
    console.log(`${frames} frames (${(to - from).toFixed(1)} s) in ${jobs} parts → ${out}`);
    let done = 0;
    const part = async j => {
      const a = Math.floor(frames * j / jobs), b = Math.floor(frames * (j + 1) / jobs), file = path.join(tmp, `part-${j}.mp4`), p = await page();
      const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-i", "-",
        "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-tune", "animation", file], { stdio: ["pipe", "inherit", "inherit"] });
      const closed = new Promise((r, x) => ff.on("close", c => c ? x(new Error(`ffmpeg exited ${c}`)) : r()));
      for (let f = a; f < b; f++) {
        if (!ff.stdin.write(await shot(p, frame(from + f / fps)))) await new Promise(r => ff.stdin.once("drain", r));
        if (++done % 300 === 0) console.log(`${done}/${frames}`);
      }
      ff.stdin.end();
      await closed;
      await p.close();
      return file;
    };
    const parts = await Promise.all(Array.from({ length: jobs }, (_, j) => part(j)));
    fs.writeFileSync(path.join(tmp, "list.txt"), parts.map(p => `file '${p}'`).join("\n"));
    await new Promise((r, x) => spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", path.join(tmp, "list.txt"), "-c", "copy", "-movflags", "+faststart", out], { stdio: "inherit" })
      .on("close", c => c ? x(new Error(`ffmpeg concat exited ${c}`)) : r()));
    fs.rmSync(tmp, { recursive: true, force: true });
    console.log(out);
  }
  await browser.close();
}
