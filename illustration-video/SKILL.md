---
name: illustration-video
description: Makes a captioned 1080p explainer video in a 3Blue1Brown-like style with the illustration skill's isometric look - a script of captions drives timed scenes of cards, devices, servers, databases, connectors and moving packets, rendered frame by frame with headless Chromium and ffmpeg to MP4. Use when the user asks for an explainer, walkthrough or architecture video, an animated diagram, a motion version of an illustration, or types /illustration-video.
---

# Illustration video

A video is a function of time: `scenes.mjs` lists scenes, each with captions and a `draw(t, c)` that returns SVG built from the
**illustration** skill's kit (`iso.mjs`). Caption start times `c[i]` drive the animation, and caption lengths set the pacing.
`scripts/render.mjs` plays it in a browser, renders stills, and encodes the MP4.

Read **[DIRECTION.md](DIRECTION.md)** (how to tell it) and the illustration skill's **STYLE.md** (how it looks) first.
This skill needs the `illustration` skill installed next to it (`../illustration`), plus Node 18+, ffmpeg and `playwright-core`
(looked up from the current directory's `node_modules`, then globally: `npm i -g playwright-core`).

## Quick start

```sh
node <skill-dir>/scripts/new.mjs docs/explainer          # iso.mjs + timeline.mjs + a 54 s sample scenes.mjs
node <skill-dir>/scripts/render.mjs docs/explainer --captions          # caption start times
node <skill-dir>/scripts/render.mjs docs/explainer --stills 12,20.5    # out/still-12.png …
node <skill-dir>/scripts/render.mjs docs/explainer --serve             # player: scrub, play, jump to a scene
node <skill-dir>/scripts/render.mjs docs/explainer                     # out/explainer.mp4 (6 pages in parallel)
node <skill-dir>/scripts/render.mjs docs/explainer --sheet             # out/sheet.png: a frame every 3 s
```

`<skill-dir>` is this skill's base directory. The sample scenes (a job queue: happy path, then a crash and retry) show every
move. Replace their content and keep their shape.

```js
// a scene: captions drive the drawing
{
  id: "queue", part: "Part 1 · The happy path", title: "Out of the request", accent: P.yellow,
  captions: ["The app writes each job to a **queue** and answers right away.", "**Workers** take jobs off the queue."],
  draw: (t, c) => app(t, 0) + In(t, c[0], queue()) + arrow(t, c[0] + 0.2, toQueue) + worker(t, c[1]) +
    packets(t, toWorker, { at: c[1] + 1 }),
}
```

## Workflow

- [ ] **Facts**: read the sources (code, docs, ADRs). Note each claim with its source. Mark anything planned but not built.
- [ ] **Script**: write every caption in parts (DIRECTION.md §1–2) before drawing anything. If the user is reachable, show them the
      outline now, because this is the cheapest point to change it.
- [ ] **Scaffold**: `new.mjs <dir>`. Write the shared pieces once (one function per thing) at the top of `scenes.mjs`.
- [ ] **Scenes, one at a time**: draw, then use `--stills` at each `c[i] + 1.2` and Read the PNGs. Each caption should have one
      visual change, nothing should appear before it is named, and nothing should sit in the caption band.
- [ ] **Render** the MP4, run `--sheet` for a contact sheet and Read it, and scrub the motion in `--serve`.
- [ ] **Review**: check every caption against its source, then run STYLE.md's checklist on stills. Fix, then re-render.
- [ ] **Deliver**: the MP4 with its length and 2–3 stills. Mention `--serve` for scrubbing, and offer a voice-over (§8) and cuts if it runs long.

## Scene fields (see `timeline.mjs`)

`id`, `captions`, `draw(t, c, s)`; `part` / `title` / `accent` for the header; `chapter: [kicker, title]` for a chapter card;
`overlay(t, s)` for a corner mini-map; `lead` (0.7 s), `tail` (0.9 s) or a fixed `dur`. `**word**` in a caption takes the
scene's accent; `*word*` is italic.

## Gotchas

- Frames are pure functions of `t`: no `Date.now()`, no randomness without a seed, and no state kept between frames.
  Otherwise the parallel render will not match the player.
- Long captions wrap to two lines at about 80 characters. Captions over about 130 characters crowd the frame: split them.
- Scene timing comes from caption length. Change words, not numbers, and use `--captions` to see where things land.
- A full render takes about 0.6 s of wall time per second of video on 6 pages. Use `--from/--to` to re-render one part.
