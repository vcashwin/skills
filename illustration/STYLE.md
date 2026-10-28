# The look

Linear / Linefold's empty-state and onboarding art, grown into diagrams. Calm and exact: a dark field, thin bright outlines,
everything in one 30° isometric projection, depth shown by tone, never by shading. Colour is rare and means something.

Compare against `examples/spot.png` (a spot illustration) and `examples/diagram.png` (a diagram still) before and after drawing.

## Palette (`P`, from `iso.mjs`)

| Tone | Role |
|---|---|
| `bg` | the field, and the fill of every face (faces hide what is behind them; painter's order does the rest) |
| `shade` | the farthest ghost card; a selected surface |
| `border` | the middle ghost; dotted text lines; row and chip edges |
| `thin`, `faint` | a slab's underside outline; dimmed pieces; minor strokes (clock ticks, bands) |
| `muted` | connectors, sub-labels, text bars, glyphs |
| `base` | the hero's outline, labels, captions |
| `title` | titles only |

Accents: `blue teal yellow green purple orange red`. An accent goes **only** on what moves (a packet), what a state says (a status
dot, a server light, a cross, a tick), the subject's glow, a boundary that matters, and emphasised words. One accent per idea and
at most two per frame besides status dots. Never fill a face with an accent; a hero may take an accent *outline* when selected.

Themes: `useTheme("dark")` (default), `useTheme("light")`, or CSS variables for in-app art:
`useTheme({ bg: "var(--color-bg-base)", base: "var(--color-label-base)", … })`.

## Geometry

- **Projection**: `iso(ox, oy, S)` puts the origin at screen point (ox, oy). +x runs down-right, +y down-left, +z up. Planes:
  `flat(x, y, z, deg)` lies on the ground (u runs up-right, the reading direction), `wall` stands facing down-right, `wallL`
  facing down-left. Shapes (`rect`, `circle`, `hex`, `poly`, `line`, `arcIn`) are drawn *in a plane*, so they foreshorten
  correctly.
- **Everything is rounded**: cards r 6–10, tiles are hexagons with r 6, boxes r 3–4, line joins and caps round.
- **Painter's order**: draw back to front (smaller x + y first, lower z first). Connectors before the pieces they join.
- **Stroke**: `SW` = 2 on a 1920×1080 frame; `setStroke(1.5)` for ~280px spot art. Arrows 2.4, emphasised strokes ×1.4–1.6.

## Depth by tone

The hero is outlined in `base`. Below it, `slab()` shows its lower outline in `faint`; `ghosts()` stacks two copies a step
down-left in `border`, then `shade`. A dashed `ring` on the ground anchors a lone piece. Out-of-focus pieces drop to opacity
0.35–0.4 (never removed while still relevant). A soft `glow` of the subject's accent sits behind the hero (r 150–260 at 1080p,
opacity 0.35–0.55); one or two per frame.

## Text

- **Inside the art there is no real text**: one thick `bar` (muted) for a title, `dots` lines (border) for body text, a status dot.
- **Labels** sit outside, 110–130px below the piece's origin (its `iso()` point), on one baseline across a row: `caption2(x, y, name, sub)` = name
  (600, base, 25–27px) over a muted sub-line (450, 0.72×) whose items are joined with " · "; `anchor: "start"` for a label
  beside a piece.
- **Identifiers** (`POST /issues`, `job #42`, table names) are mono, in a `chip` or a `row`. A chip estimates its width
  from the character count; pass `w` when the text must fit exactly.
- **Diagram header**: kicker 17px/600 uppercase, letter-spacing 2.2, muted, at (96, 92); title 38px/640 at (96, 136); a 48×3
  accent underline at y 154. Caption (if any) 34px/480 centred at y 1000; `**word**` takes `text()`'s `accent` option.
- Inter Variable throughout (weights 450 normal, 560–650 emphasis, never 700+). Nothing under 16px at 1080p.

## Connectors and boundaries

- `curve(a, b, bend)` + `arrow(t, at, c, { trim: [start, end] })`: muted, gently bent (`bend` ±20–50; the apex lands ~bend/2
  off the straight line, and negative bows up for a left→right curve), trimmed 80–95px off the pieces
  so they never touch them, an arrowhead at the end (`heads: 2` for two-way). `path(...pts)` for straight elbows.
- **Dashed** (`dashed: true`) means not the main path: feedback, a retry, something planned or optional. Colour a connector only
  when the colour means something (feedback in blue, failure in red).
- `packets` / `dot` / `trip`: an accent dot with a soft halo travelling a connector = something flowing; give them the arrow's
  `trim` so they never ride over a piece.
- Boundaries: `zone(x, y, w, h, colour, { label })` is a dashed rounded rectangle in screen space around a group (a transaction,
  a trust zone, "planned"), its label a small uppercase kicker above its top-left; `dashedBox` is an isometric dashed box around a *single* piece (a
  sandbox, a container). Never an isometric box around a whole row of pieces: it slices through labels.

## Composition

- **Spot art** (empty states, onboarding steps): 280×210, `iso(140, ~112, 1.2)`, `setStroke(1.5)`. One hero object with its
  ghosts and a ground ring, at most one accent dot and a spark or two. No labels, no arrows. Transparent background when it goes
  in an app (`svg(w, h, inner, { bg: null })`); faces still fill with `bg` so the app's surface must be that colour.
- **Diagrams**: 1920×1080, 96px margins, the header top-left, art within y 200–880, the band y 900–1040 kept for captions.
  3–6 pieces, laid on a loose grid with lots of air; odd counts read calmer. Left to right or a loop for a flow.
- The same thing is always the same drawing, in the same colour, in every picture of a set.

## Pieces in `iso.mjs`

| Piece | Depicts |
|---|---|
| `issueCard`, `docCard`, `cardStack`, `checkCard`, `branchCard` | an item / ticket, a document, a set of items, a done list, a branch merging |
| `personTile`, `person`, `spark`, `loopRing` (in a `slab` of a `hex`) | a person, an AI agent, a recurring loop |
| `windowUp` (term or page), `laptop`, `box`, `server`, `cylinder` | a terminal or app window, a device, a container, a server, a database |
| `clock` (hands at `a` hours; 10.1 reads well), `padlock`, `keyGlyph`, `envelope` | a timer or schedule, security, a credential, a message |
| `row`, `chip`, `cross`, `tick` | a log line or table row, an identifier, failure, success |
| `ghosts`, `slab`, `ring`, `dashedBox`, `zone`, `glow` | depth, a ground anchor, a sandbox, a boundary, focus |

Build new pieces from the same parts (a rounded `rect`/`hex` in a plane, `face`, `dots`, `bar`, `glyph`), 40–130 units across.
Every stroke follows `setStroke`, so pieces keep their weight at any size. Mid-entrance a piece is translucent (`In` fades the
group): judge layering on settled stills.

## Motion (when it moves)

All motion is a function of time `t` (seconds): `In(t, at, svg, from = [0, 14])` rises and fades in (expo, 0.7s); `Pop` scales up
with a small overshoot (dots, checks, sparks); `arrow` draws on (0.9s, smooth); `packets` travel (1.4s each); `k(t, at, d)` is
0→1 progress with 3b1b's smooth curve, `vis(t, a, b)` fades in at a and out at b. Stagger related pieces 0.08–0.3s. Idle motion
only for what runs by nature (a loop ring turning, clock hands, a cursor blink, packets on a live path).

In-app (CSS, the onboarding recipe): entrance `enter .5s cubic-bezier(.16,1,.3,1) var(--d) both` from `translate(0, 8px)` and
opacity 0; pops `scale(0)` with `cubic-bezier(.3,1.5,.6,1)`; the hero floats up 4px and settles once (`2.4s ease-in-out 1s 2
alternate`); dashes walk with `stroke-dashoffset`; all of it off under `prefers-reduced-motion`.

## Never

Gradients or shading on faces, drop shadows, perspective other than this isometric, stock icons or emoji, real paragraphs inside
the art, accent-filled shapes bigger than a dot, more than two accents competing, thin grey text on grey, crowding the frame.
