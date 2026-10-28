---
name: illustration
description: Draws isometric line illustrations and diagrams in Linear / Linefold's empty-state art style (rounded cards in 30° isometric, outlined faces on a dark field, dotted text lines, dashed rings, colour only on what moves) and exports SVG + PNG. Use when the user asks for an illustration, spot art, empty-state or onboarding art, an architecture or system diagram, a hero image or a still in this look, or types /illustration.
---

# Illustration

Draw with code, not by hand: a drawing is a JS module that returns an SVG string, built from the isometric kit
`scripts/iso.mjs` (projection, pieces, connectors, text, motion). `scripts/render.mjs` writes the `.svg` and a `.png`.

**Read [STYLE.md](STYLE.md) before drawing** and look at `examples/spot.png` and `examples/diagram.png`: they are the taste.

## Quick start

```sh
mkdir -p art && cp <skill-dir>/scripts/iso.mjs art/
```

```js
// art/empty-inbox.mjs
import { P, setStroke, svg, iso, rect, circle, line, face, dots, bar, ring, ghosts, slab, spark } from "./iso.mjs";
setStroke(1.5);
export default t => {
  const W = iso(140, 116, 1.2), card = pl => rect(pl, 0, 0, 96, 70, 9), top = W.flat(0, 0, 0), s = W.at(-6, -18, 52);
  return svg(280, 210, ring(circle(W.flat(0, 0, -24), 0, 0, 72)) + ghosts(W, card, 0) + slab(W, card, 0) +
    face(circle(top, -30, -14, 5), P.blue, P.blue) + bar(line(top, [-18, -14], [24, -14])) +
    dots(line(top, [-30, 2], [30, 2])) + dots(line(top, [-30, 15], [12, 15])) + spark(s, 12));
};
```

```sh
node <skill-dir>/scripts/render.mjs art/empty-inbox.mjs            # art/empty-inbox.svg + .png (2×)
node <skill-dir>/scripts/render.mjs art/empty-inbox.mjs --t 0.3,0.6 # stills of the entrance, if it uses In/Pop
```

`<skill-dir>` is this skill's base directory. Needs Node 18+ and `playwright-core`, looked up from the **current directory**
(run from a project that has it in `node_modules`), then the skill, then the global npm root (`npm i -g playwright-core`), with
Playwright's Chromium or a system Chrome.

## Workflow

- [ ] **Pick the kind**: *spot* (280×210, one hero object, no labels; empty states, onboarding, cards) or *diagram* (1920×1080,
      labelled pieces, connectors, optional header; architecture, flows, explainer stills).
- [ ] **Compose in words first**: the one idea, the hero, the 3–6 pieces and the piece from the STYLE.md table that depicts
      each, what flows where, the single accent. Reuse a piece for the same thing every time.
- [ ] **Draw**: copy `iso.mjs` next to the drawing, write the module, start from the closer of `examples/spot.mjs` or
      `examples/diagram.mjs`. Back to front; connectors before pieces; labels on one baseline.
- [ ] **Render and look**: run `render.mjs`, then Read the PNG. Check it against the list below, fix, render again. Two or three
      passes is normal.
- [ ] **Deliver** the PNG (and the SVG). For in-app art: `useTheme({ …CSS variables })` and `bg: null` so it follows the app's
      theme, inline the SVG or port it to a component, and add the CSS motion from STYLE.md if it should animate.

## Check before delivering

- One idea, one hero, readable at a glance; generous empty space; nothing touches or crosses a label.
- Every face filled with `bg` and outlined; depth by tone (base → faint → border → shade); no gradients or shadows on faces.
- Accent only on what moves, a state, the subject's glow, or emphasis; at most two accents besides status dots.
- Text: no real text inside the art (bars and dots); labels name + muted sub-line; mono for identifiers; nothing <16px at 1080p.
- Connectors trimmed off pieces, gently bent, dashed only for feedback / retry / planned.
- The same piece looks the same across a set; spot art at 1.5px strokes, diagrams at 2px.

## Animated

For a moving version, use the companion **illustration-video** skill: it turns the same drawings into a captioned MP4.
