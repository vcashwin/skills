// Headless Chromium for rendering SVG strings to PNG: playwright-core from the current project, this skill or the global npm
// root; Playwright's own Chromium if it is installed, else the system Chrome. Inter is embedded from ../fonts, so sans text
// renders the same on every machine; mono text uses the first installed font of iso.mjs' MONO stack.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const fonts = path.resolve(import.meta.dirname, "../fonts");

function playwright() {
  const roots = [process.cwd(), import.meta.dirname];
  try { roots.push(execSync("npm root -g", { encoding: "utf8" }).trim()); } catch {}
  for (const r of roots) { try { return createRequire(path.join(r, "_.js"))("playwright-core"); } catch {} }
  throw new Error("playwright-core not found: npm i -g playwright-core (or npm i -D playwright-core in the project)");
}

export async function launch() {
  const { chromium } = playwright();
  return chromium.launch().catch(() => chromium.launch({ channel: "chrome" }));
}

const face = (file, style) => `@font-face{font-family:"Inter Variable";font-weight:100 900;font-style:${style};` +
  `src:url(data:font/woff2;base64,${fs.readFileSync(path.join(fonts, file)).toString("base64")}) format("woff2")}`;

/** a page at `width`×`height` CSS px and `scale` device pixels per px, fonts loaded, with `#stage` to put SVG into */
export async function open(browser, { width, height, scale = 1 }) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
  await page.setContent(`<!doctype html><meta charset="utf-8"><style>${face("InterVariable.woff2", "normal")}${face("InterVariable-Italic.woff2", "italic")}` +
    `html,body{margin:0;background:transparent}#stage svg{display:block}</style><div id="stage"></div>`);
  await page.evaluate(() => Promise.all(["450 20px 'Inter Variable'", "650 20px 'Inter Variable'", "italic 450 20px 'Inter Variable'"].map(f => document.fonts.load(f))));
  return page;
}

/** a PNG of one SVG string; what the SVG leaves unpainted stays transparent */
export async function shot(page, svg) {
  await page.evaluate(s => { document.getElementById("stage").innerHTML = s; }, svg);
  return page.screenshot({ type: "png", omitBackground: true });
}
