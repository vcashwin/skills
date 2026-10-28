// Starts a video project: node new.mjs <dir>
// Copies iso.mjs (the illustration skill's kit), timeline.mjs and a sample scenes.mjs into <dir>, so the project's source is
// self-contained and renders with any copy of this skill. Never overwrites a file that is already there.
import fs from "node:fs";
import path from "node:path";

const here = import.meta.dirname, dir = process.argv[2];
if (!dir) { console.error("usage: node new.mjs <dir>"); process.exit(1); }
const kit = path.resolve(here, "../../illustration/scripts/iso.mjs");
if (!fs.existsSync(kit)) { console.error(`needs the illustration skill next to this one (${kit})`); process.exit(1); }
fs.mkdirSync(dir, { recursive: true });
const files = [[kit, "iso.mjs"], [path.join(here, "template/timeline.mjs"), "timeline.mjs"], [path.join(here, "template/scenes.mjs"), "scenes.mjs"]];
for (const [from, name] of files) {
  const to = path.join(dir, name);
  if (fs.existsSync(to)) { console.log(`kept ${to}`); continue; }
  fs.copyFileSync(from, to);
  console.log(`wrote ${to}`);
}
if (!fs.existsSync(path.join(dir, ".gitignore"))) fs.writeFileSync(path.join(dir, ".gitignore"), "out/\n");
