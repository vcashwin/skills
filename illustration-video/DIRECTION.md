# Direction: a 3Blue1Brown-style explainer

The viewer should leave with a picture in their head they could redraw. Everything below serves that.

## 1. Script first

- Start from the viewer's question ("how is this built?", "what happens when a worker dies?") and answer it in **parts**:
  Part 1 the big picture (one diagram), Part 2 one layer deeper (each scene zooms into one piece of that diagram).
- Write the **captions before any drawing**. They are the narration: one idea each, plain words, present tense, concrete nouns,
  ≤ ~130 characters (two lines). Mark the word the picture is about with `**word**`.
- Every claim comes from a source you read: the code, docs and ADRs for a codebase; specs, RFCs and official docs for a general
  topic. Keep a list of sources per scene and put them on the end card. Facts that are planned, not built, are drawn dashed and
  labelled as such. When the brief simplifies, keep the simplification only if it is true at the level shown; otherwise say it
  correctly and tell the user what you changed.

## 2. Structure

```
title card (5–7 s) → for each part: chapter card (3 s) → 2–6 scenes → end card (sources, 5 s)
```

- A scene has a header (`part`, `title`, `accent`) and 3–7 captions; a scene runs 15–35 s.
- The big-picture diagram becomes the **map**: in Part 2, `overlay` draws it small in the top-right corner with the current
  piece lit, so the viewer always knows where they are.
- Under a minute: no chapter cards, a 3–4 s title, 1–2 scenes of 3–5 captions, a 3–4 s end card.
- Length: a short explainer is 1–3 min; a deep one 5–7 min. Cut a scene rather than speed captions up (reading pace is fixed at
  17 characters a second).

## 3. One caption, one visual change

`c[i]` is when caption i appears. Each caption gets exactly one visual event at (or just after) `c[i]`: a piece enters, an
arrow draws on, a packet starts flowing, a state flips (light goes red, a cross, a tick), the focus moves.

- **Never show a thing before its caption names it.** Never leave a caption with nothing changing.
- **Build up, don't replace**: pieces stay once introduced; what is not being talked about dims to 0.35–0.4 and comes back.
- The subject gets the glow and the accent; the scene's accent is also the header underline and the caption emphasis colour
  (one per scene: if a caption needs another colour's word, it belongs in another scene, or reword it).

## 4. Continuity

- The same thing is the same drawing, colour and place in every scene. Define each piece once (a function) and reuse it.
- Re-enter a scene from where the last one left off: the map, the same layout, then zoom (`G(..., { s, at })`) into the part.
- Return to the map at the end of a part to recap.

## 5. Motion vocabulary

| Move | Use | Code |
|---|---|---|
| rise in | a piece appears | `In(t, c[i], svg)` (0.7 s expo, from 14px below; `from` for a side) |
| pop | a dot, check, spark, chip | `Pop(t, at, centre, svg)` |
| draw on | a connection exists | `arrow(t, at, curve, { trim })` (0.9 s) |
| flow | data / work moving | `packets(t, curve, { at, period, travel, trim })` (trim like the arrow's), one `dot` for a single item |
| a token's trip | a request and its answer, a cycle | `trip(t, at, [[curve, trim], …], { leg })` |
| state | failure / success | `cross`, `tick`, a light colour change, `row` dot colour |
| focus | what we are talking about | opacity 0.35–0.4 on the rest, a `glow` on the subject |
| log / table | rows written in order | `In(t, at, row(...), [-24, 0], 0.6)` staggered |
| boundary | a transaction, a trust zone, planned | `zone(...)` or `dashedBox(...)`, dashed |

Smooth everything (`k` uses 3b1b's smoothstep). Nothing moves without a meaning; idle motion only for what runs by nature. The
timeline already crossfades scenes with a 2.5% push-in.

## 6. Frame

1920×1080, margins 96px. Header top-left (the timeline draws it). Art within y 200–880, centred on the frame's optical centre
(~y 520). Captions own y 900–1040: keep art out. 3–6 pieces in view, aligned label baselines, nothing under 16px.

## 7. Review loop

1. `render.mjs <dir> --captions` lists every caption's start time.
2. For each scene, `--stills` at every `c[i] + 1.2` and at the scene's end − 0.8; Read them. Fix overlaps, crowding, a caption
   with no change, a thing shown before it is named, an accent used for decoration.
3. Render the MP4, make a contact sheet (`render.mjs <dir> --sheet`, a frame every 3 s) and check the rhythm; scrub the moving
   parts in `--serve`.
4. Fact-check every caption against its source once more; then deliver.

## 8. Sound

Captions carry the narration; the video is silent. A voice-over needs a natural TTS voice (system voices sound robotic): generate
one clip per caption, set each caption's duration from its clip, and mux the audio with ffmpeg. Offer it; don't do it with a
robotic voice.
