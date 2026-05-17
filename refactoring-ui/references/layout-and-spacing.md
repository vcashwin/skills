# Layout & Spacing

White space is the cheapest, most-overlooked tool. Adding it almost always improves a design; the hard part is being willing to.

## Start with too much white space

When designing in a browser, white space gets *added* to a too-tight design until it stops looking bad — which means elements get only the minimum room to not be ugly. To look *great*, most things need more.

**Reverse the workflow:** start with way too much white space, then remove until you're satisfied. What feels like "a little too much" around an isolated element usually turns into "just enough" in the context of the full UI.

**Dense UIs have their place** (dashboards, data-heavy tables, IDE chrome). Make density a deliberate choice, not the default — it's much easier to notice you need to *remove* white space than that you need to add it.

## Establish a spacing and sizing system

Don't pick from arbitrary pixel values one at a time. Define a scale up front.

**A linear scale won't work.** A 4px step is enormous at the small end (12 → 16 = +33%) and invisible at the large end (500 → 504 = +1%). For a system to actually save you decisions, **no two adjacent values should be closer than ~25%**.

**Practical scale:** start at a base (16px is great — divides cleanly, default browser font size), then build out tighter steps near the bottom and wider steps near the top. A workable scale:

```
4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 640, 768
```

Use it for padding, margin, gap, width, height — anywhere a number lives in the design.

Tailwind's default spacing scale follows this shape (`p-1`, `p-2`, `p-3`, `p-4`, `p-6`, `p-8`, `p-12`, `p-16`, `p-24`, …). If the user is on Tailwind, just use the defaults — they already encode this insight.

## You don't have to fill the whole screen

We give ourselves 1200–1400px canvases on modern displays and then feel obligated to fill them. Don't.

- If you only need 600px, use 600px.
- Don't make a section full-width just because the navbar is full-width.
- Spreading elements out makes interfaces *harder* to scan; extra space at the edges never hurts.

**Shrink the canvas trick:** if you're struggling to design something small on a huge canvas, shrink the canvas. For responsive work, start at ~400px (mobile-first design literally; constraints force good decisions). Then expand and only adjust what felt cramped.

**Thinking in columns:** if a single-column block feels too narrow on a wide screen but you don't want to widen it, split it into multiple columns instead. A form on the left, supporting text on the right — same widths, more balanced page.

## Grids are overrated

A 12-column grid is a useful starting tool, not a religion. Two failure modes:

**Forcing fluid widths on elements that shouldn't be fluid.** A sidebar at "3 of 12 columns" gets too wide on big screens and squeezes the content; gets too narrow on small screens and breaks. Give it a *fixed* width tuned to its content; let the main area flex around it.

**Shrinking elements you have space for.** A login card at "6 of 12 columns" can end up *narrower* on a medium screen than on a wider one because column widths are fluid. Instead: give the card a `max-width` (e.g., 500px) and stop scaling it once it hits that. Only shrink when the viewport gets smaller than its optimal width.

Use percentages when you actually want something to scale. Use fixed widths or max-widths everywhere else.

## Relative sizing doesn't scale

It's tempting to define everything in relation to other things — "headline is 2.5× body". This breaks at different breakpoints.

If body is 18px on desktop, headline at 2.5em = 45px (good). On mobile body drops to 14px → headline becomes 35px (way too big). A good mobile headline might be 20–24px — which is 1.5× body, not 2.5×. **There is no fixed relationship** that survives.

**Rule of thumb:** large elements need to shrink *faster* than small elements as the screen shrinks. The gap between large and small should compress on mobile.

This applies inside single components too. Don't define button padding as `em` relative to font size; if you want a "small button" that's actually smaller (not just zoomed), make the padding *tighter* than proportional and the font *smaller* than proportional. Define each size variant by hand. Don't try to make everything a function of one variable.

## Avoid ambiguous spacing

When groups aren't explicitly separated by a border or background, **spacing alone communicates grouping**. Get the ratios wrong and the UI becomes hard to parse — or worse, leads to wrong-field errors.

**The rule: more space around a group than within it.**

- Form: label below input, then `mb-6` to the next group (not the same `mb-2` you used between label and input).
- Section headings: more space *above* the heading than below it, so it reads as starting the next section, not ending the previous.
- Bulleted lists: gap between bullets should exceed the line-height of a wrapped bullet.
- Horizontal groups too: a row of [icon + text] pairs needs more gap between pairs than within them.

If users have to look twice to figure out which label goes with which input, the spacing is wrong.

## Quick checks when prescribing

- Is there *any* spacing scale at all, or are values ad-hoc? Suggest a scale.
- Do related elements visually group? Apply the "more between than within" rule.
- Is the content stretched to fill space it doesn't need? Set a `max-width`.
- Are columns flexing when they should be fixed? Switch the chrome (sidebar, etc.) to fixed width.
