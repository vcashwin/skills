// The timeline of a captioned explainer: scenes → one 1920×1080 SVG per instant. Copied into a video project by new.mjs,
// next to iso.mjs (the illustration kit) and scenes.mjs (the video).
//
// A scene is { id, captions, draw(t, c, s) } plus optional fields:
//   part, title, accent  the header (kicker, title, accent underline) and the colour of **emphasis** in its captions
//   chapter: [kicker, title]   a chapter card instead (no draw, no captions; give it a dur)
//   overlay(t, s)        drawn above the scene, outside its end-of-scene zoom (a mini-map, a legend)
//   lead, tail, dur      seconds before the first caption (0.7), after the last (0.9), or a fixed length
// `t` is seconds into the scene; `c[i]` is when caption i appears, so animations key off what is being said.
import { P, k, vis, expo, clamp, G, text, rich, svg } from "./iso.mjs";

export const W = 1920, H = 1080;
/** characters a second a caption is read at: a caption stays up for its reading time (2.4–7.5 s) */
export const READ = 17;
const capDur = s => clamp(s.replace(/\*/g, "").length / READ + 0.9, 2.4, 7.5);

export function timeline(list) {
  let T0 = 0;
  const scenes = list.map(s0 => {
    const s = { lead: 0.7, tail: 0.9, captions: [], accent: P.yellow, ...s0 };
    s.start = T0;
    const c = [];
    let at = s.lead;
    for (const cap of s.captions) { c.push(at); at += capDur(cap); }
    c.end = at;
    s.c = c;
    s.dur = s.dur ?? at + s.tail;
    T0 += s.dur;
    return s;
  });
  const DURATION = T0;

  function frame(T) {
    const i = scenes.findIndex(s => T < s.start + s.dur);
    const s = scenes[i < 0 ? scenes.length - 1 : i], t = Math.min(T - s.start, s.dur - 1e-3);
    let body;
    if (s.chapter) body = drawChapter(s, t);
    else {
      // every scene fades in, and out with a slight push in
      const o = vis(t, 0, s.dur - 0.55, 0.55), z = 1 + 0.025 * k(t, s.dur - 0.6, 0.6);
      body = G(s.draw?.(t, s.c, s) ?? "", { o, s: z, at: [960, 520] }) + drawHeader(s, t) + drawCaption(s, t) +
        (s.overlay ? G(s.overlay(t, s), { o: vis(t, 0.2, s.dur - 0.55, 0.5) }) : "");
    }
    return svg(W, H, body);
  }
  const sceneList = () => scenes.map(s => ({ id: s.id, start: s.start, dur: s.dur, captions: s.captions.map((x, j) => ({ at: s.start + s.c[j], text: x })) }));
  return { frame, DURATION, sceneList };
}

/** the captions: one or two centred lines at the bottom, crossfading */
function drawCaption(s, t) {
  let out = "";
  s.captions.forEach((cap, i) => {
    const a = s.c[i], b = i + 1 < s.c.length ? s.c[i + 1] : s.dur - 0.3;
    const o = Math.min(k(t, a - 0.1, 0.35), 1 - k(t, b - 0.25, 0.3));
    if (o <= 0) return;
    const lines = wrap(cap, 80);
    lines.forEach((ln, j) => {
      const y = 1000 - (lines.length - 1 - j) * 46;
      out += `<text x="960" y="${y}" font-family="Inter Variable, Inter, sans-serif" font-size="34" font-weight="480" fill="${P.base}" text-anchor="middle" opacity="${o.toFixed(3)}">${rich(ln, s.accent)}</text>`;
    });
  });
  return out;
}
/** one line, or two of about equal length split at a space */
function wrap(s, max) {
  const len = x => x.replace(/\*/g, "").length;
  if (len(s) <= max) return [s];
  let best = -1;
  for (let i = s.indexOf(" "); i > 0; i = s.indexOf(" ", i + 1)) if (best < 0 || Math.abs(len(s.slice(0, i)) - len(s) / 2) < Math.abs(len(s.slice(0, best)) - len(s) / 2)) best = i;
  const lines = [s.slice(0, best), s.slice(best + 1)];
  // an emphasis split across the lines is closed and reopened
  if ((lines[0].match(/\*\*/g) || []).length % 2) { lines[0] += "**"; lines[1] = "**" + lines[1]; }
  return lines;
}
function drawHeader(s, t) {
  if (!s.title) return "";
  const o = vis(t, 0.1, s.dur - 0.5, 0.5);
  return G((s.part ? text(96, 92, s.part.toUpperCase(), { size: 17, weight: 600, color: P.muted, anchor: "start", ls: 2.2 }) : "") +
    text(96, 136, s.title, { size: 38, weight: 640, color: P.title, anchor: "start" }) +
    `<rect x="96" y="154" width="${48 * k(t, 0.3, 0.8)}" height="3" rx="1.5" fill="${s.accent}"/>`, { o });
}
function drawChapter(s, t) {
  const o = vis(t, 0.1, s.dur - 0.6, 0.6);
  return G(text(960, 500, s.chapter[0].toUpperCase(), { size: 26, weight: 600, color: P.muted, ls: 4 }) +
    text(960, 580, s.chapter[1], { size: 76, weight: 650, color: P.title, ls: -1 }) +
    `<rect x="${960 - 60 * k(t, 0.4, 1)}" y="618" width="${120 * k(t, 0.4, 1)}" height="3" rx="1.5" fill="${s.accent}"/>`, { o, y: (1 - k(t, 0, 1, expo)) * 16 });
}
