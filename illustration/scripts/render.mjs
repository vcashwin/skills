// Renders a drawing module to SVG and PNG:
//
//   node render.mjs <drawing.mjs> [--t 0.4,1.2] [--scale 2] [--out <dir>]
//
// The module's default export is an SVG string, or a function of time `t` (seconds) returning one (use `svg()` from iso.mjs).
// Without --t it is drawn settled (t = 1000). Writes <name>.svg and <name>.png (or <name>@<t>.png per time) next to the
// module or into --out, and prints their paths. Needs playwright-core (see browser.mjs).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { launch, open, shot } from "./browser.mjs";

const arg = (name, dflt) => { const i = process.argv.indexOf(`--${name}`); return i < 0 ? dflt : process.argv[i + 1]; };
const file = process.argv[2];
if (!file || file.startsWith("--")) { console.error("usage: node render.mjs <drawing.mjs> [--t 0.4,1.2] [--scale 2] [--out dir]"); process.exit(1); }

const mod = await import(pathToFileURL(path.resolve(file)).href);
const draw = typeof mod.default === "function" ? mod.default : () => mod.default;
const times = arg("t") ? String(arg("t")).split(",").map(Number) : [null];
const out = path.resolve(arg("out", path.dirname(file))), name = path.basename(file).replace(/\.m?js$/, "");
fs.mkdirSync(out, { recursive: true });

const browser = await launch();
for (const t of times) {
  const svg = draw(t ?? 1000);
  const [, w, h] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/) ?? [];
  if (!w) throw new Error("the drawing must return an <svg> with viewBox=\"0 0 W H\" (use svg() from iso.mjs)");
  const base = path.join(out, t === null ? name : `${name}@${t}`);
  if (t === null) { fs.writeFileSync(`${base}.svg`, svg); console.log(`${base}.svg`); }
  const page = await open(browser, { width: Math.ceil(+w), height: Math.ceil(+h), scale: Number(arg("scale", 2)) });
  fs.writeFileSync(`${base}.png`, await shot(page, svg));
  await page.close();
  console.log(`${base}.png`);
}
await browser.close();
