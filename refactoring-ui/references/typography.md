# Typography

## Establish a type scale

Most UIs use too many font sizes. Without a system, every pixel from 10px to 24px ends up somewhere. The cost: inconsistent designs *and* slow workflow.

**Linear scales don't work** (same reason as spacing — 16 → 18 is meaningful, 46 → 48 is invisible). And **modular scales** (based on ratios like 4:5 or the golden ratio) produce fractional pixel values that subpixel-round inconsistently across browsers, and often don't give you the sizes you actually need for UI work.

**The pragmatic answer is a hand-crafted scale.** A solid default:

```
12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72
```

Tight at the bottom (where small jumps matter), looser at the top.

**Use `px` or `rem`, not `em`.** `em` is relative to the current font size, so nested elements' computed sizes fall *outside* your scale. A 0.875em inside a 1.25em parent gives 17.5px — a value you never defined.

## Use good fonts

Don't agonize over typeface selection. A few heuristics get you 90% of the way:

- **Play it safe with a neutral sans-serif** (think Helvetica, Inter, Roboto, system stack). The system stack is great if you can't decide:
  ```
  -apple-system, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue"
  ```
- **Filter directories by number of weights.** Fonts with 5+ weights (10+ counting italics) tend to be crafted more carefully. On Google Fonts this cuts ~85% of options.
- **Avoid display/condensed/short-x-height fonts for UI text.** They're designed for headlines, not paragraphs.
- **Trust popularity.** If a font is widely used, it's probably good. Useful when you need something other than a neutral UI face (e.g., a serif with personality).
- **Steal.** Inspect sites you admire; see what they use.

## Keep line length in check

Optimal reading width: **45–75 characters per line**. Easiest way on the web: `max-width: 20em–35em` (since em is relative to font size, this scales naturally).

If you're mixing paragraph text with wider components (images, code blocks), constrain *just the paragraph* width — keep the content area wide, but cap paragraph width inside it. Looks more polished than letting paragraphs run the full width.

## Baseline, not center

When you have mixed font sizes on a single line (e.g., card title + smaller actions in a header), the default instinct is to vertically center them. **Don't.** Align them by baseline — the imaginary line letters sit on.

Center-alignment offsets the baselines, which the eye notices subconsciously. Baseline alignment uses an alignment reference the eye already perceives, so it always looks cleaner — especially when the text is close together.

In CSS Flexbox: `align-items: baseline`.

## Line-height is proportional

The advice "line-height ≈ 1.5" is a starting point, not a universal rule. Line-height depends on two things:

**1. Line length.** Long lines need more leading because the eye has further to travel back to the next line. Short, narrow paragraphs can use ~1.5; very wide paragraphs may need ~2.

**2. Font size.** Inversely proportional:
- **Small text** (body, captions) needs *more* line-height — readers need help finding the next line.
- **Large headlines** can use line-height ~1 — the text is big enough that finding the next line is trivial.

Rule of thumb: tall line-height for small text, tight line-height for large text.

## Not every link needs a color

The classic "blue + underline" treatment is for when a link sits in a block of non-link text and needs to *stand out*. In an interface where almost everything is clickable (nav, cards, table rows), applying that treatment to every link makes the UI scream.

Two softer options:
- Emphasize most links with a **heavier font weight or slightly darker color** — still clearly clickable, doesn't shout.
- For truly ancillary links, **show the underline/color only on hover**. Discoverable but invisible by default.

## Align with readability in mind

- **Match the language direction.** English is left-to-right, so most text should be left-aligned.
- **Don't center long-form text.** Center looks great for short headlines or independent blocks; it's painful for anything over 2–3 lines.
  - If a center-aligned heading is *almost* too long, the right fix is usually to **rewrite it shorter**, not to switch alignment.
- **Right-align numbers in tables.** Decimals line up, comparisons become trivial.
- **Hyphenate justified text.** Justified text without hyphenation creates ugly rivers of white space between words (`text-justify: inter-word; hyphens: auto`).

## Use letter-spacing effectively

Trust the type designer by default. Two cases where adjusting helps:

**Tighten headlines.** Body-text-optimized faces (Open Sans, system fonts) have wider letter-spacing than headline-optimized faces. When you use a body face for headlines, *decrease* letter-spacing (e.g., `-0.02em`) to mimic the condensed look real headline faces have. Don't try the reverse — headline fonts almost never work at small sizes regardless of letter-spacing.

**Loosen all-caps.** Default letter-spacing is optimized for sentence case (mixed ascenders/descenders/x-height). All-caps has none of that variety, so default spacing makes letters mush together. Add letter-spacing (e.g., `0.05em–0.1em`) to all-caps text — small labels, button text, section eyebrows.

## Quick checks

- How many distinct font sizes appear in the UI? If more than ~7, consolidate to a scale.
- Are paragraphs wider than ~75 characters? Cap with `max-width`.
- Mixed font sizes on a single line? `align-items: baseline`.
- Small body text with `leading-tight`, or huge display text with `leading-loose`? Swap them.
- All-caps without letter-spacing? Add it.
