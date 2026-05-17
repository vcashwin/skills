# Color

## Ditch hex for HSL

Hex and RGB hide the human-meaningful attributes of a color. Two colors that look very similar can have totally different hex values and totally different RGB triplets.

**HSL is intuitive:**

- **Hue** (0°–360°): position on the color wheel. 0° red, 120° green, 240° blue. Tells you what color this *is*.
- **Saturation** (0%–100%): how vivid. 0% = grey, 100% = full color.
- **Lightness** (0%–100%): 0% black, 50% pure color, 100% white.

When you want a darker blue, you decrease the lightness of the same hue — and the relationship is *visible in the code*. When you want a related accent color, you rotate the hue and keep saturation/lightness in the same range.

**HSL ≠ HSB.** Design software often uses HSB (Brightness), but browsers only speak HSL. In HSB, 100% brightness = white only when saturation is 0; in HSL, 100% lightness is always white. If you're working in Figma's HSB and pasting into CSS, you have to translate.

## You need more colors than you think

A "five hex codes from a palette generator" approach can't build a real interface. A real UI needs:

**Greys** — most of the interface. Text, backgrounds, dividers, panels, form controls. You'll need **8–10 shades**. Three or four feels like enough until you keep wanting "a tiny bit lighter than #4 but darker than #5". Avoid pure black at the dark end — it looks unnatural. Start with a very dark grey and step up to white.

**Primary color(s)** — one (maybe two) brand color used for primary actions, active nav, etc. The colors that define "the product's color". Again **5–10 shades** — ultra-light tints for backgrounds (alerts, hover states), darker shades for text-on-color and emphasis.

**Accent colors** — semantic states (success/warning/error/info) plus any visual highlights. Red for destructive confirmations, yellow for warnings, green for positive trends, plus eye-grabbers (pink, teal, yellow) for highlighting new features. Each still wants ~5 shades, even though they're used sparingly.

For complex UIs (graphs, calendars, tags), you may need 8–10 distinct hues with multiple shades each.

## Define your shades up front

Don't generate shades on the fly with `lighten()`/`darken()` — you'll end up with 35 nearly-identical blues. Pick a fixed set.

**How to build a 9-shade scale:**

1. **Pick the base.** A middle shade you'd use as a button background. Eye-balled, not formulaic.
2. **Pick the darkest.** Usually text-on-tinted-background. Same hue as base; tweak saturation/lightness.
3. **Pick the lightest.** Usually a background tint (alert backgrounds, hover states).
4. **Number them.** Call darkest `900`, base `500`, lightest `100`.
5. **Fill 700 and 300.** The halfway shades between base and edges. Aim for "this feels exactly between those two".
6. **Fill 800, 600, 400, 200.** Same approach — split each remaining gap.

You can borrow Tailwind's `slate-50` through `slate-900` for greys and its color scales as a starting point — they're tuned this way.

**It's not pure math.** Once you start *using* the scale, you'll want to tweak a saturation here, a lightness there. Trust your eyes. Just don't keep adding new shades — that defeats the system.

## Don't let lightness kill your saturation

In HSL, saturation has less perceptual impact at extreme lightnesses. The same saturation value at 90% lightness looks much less colorful than at 50% lightness.

**To keep light/dark shades from feeling washed out, *increase* saturation as you move away from 50% lightness.** A subtle move, but it's the difference between a vibrant palette and a tired one.

### When you can't push saturation higher

If base is already 100% saturation, you can't increase it further. You can still adjust **perceived brightness** by rotating the hue.

Each hue has a different inherent brightness:
- **Bright hues** (yellow ~60°, cyan ~180°, magenta ~300°) feel lighter at the same lightness value.
- **Dark hues** (red ~0°, green ~120°, blue ~240°) feel darker.

**To make a color feel lighter without going closer to white**, rotate its hue toward the nearest bright hue. **To make it feel darker without going toward black**, rotate toward the nearest dark hue.

This is why a well-designed yellow palette warms toward orange in the dark shades (rotating from ~60° toward 30° as lightness drops) — the dark shades feel rich and warm instead of greenish-brown.

**Keep rotations modest** (20–30° max). Beyond that, it stops being "lighter/darker" and starts being a different color.

## Greys don't have to be grey

True grey (0% saturation) is neutral. But greys with a tiny bit of saturation feel **warm** or **cool**:

- Saturate with **blue** (e.g., HSL 210° at 5–15% saturation) for cool greys.
- Saturate with **yellow/orange** (e.g., HSL 40° at 5–15% saturation) for warm greys.

Maintain temperature consistency across your grey scale by *increasing* saturation as shades go lighter or darker (same perceived-saturation logic as above). Otherwise the extreme shades will read as more neutral than the mid-shades.

Pick warm or cool deliberately based on the personality you chose. Don't mix temperatures in one design.

## Accessible doesn't have to mean ugly

WCAG: 4.5:1 contrast for normal text (<18px), 3:1 for large text.

Dark-on-light is easy. Things get tricky when:

**You want white text on a colored background.** Hitting 4.5:1 often requires the background to be *very* dark, which then commands too much visual attention — your color-coded callouts start dominating the page.

**The fix: flip the contrast.** Dark colored text on a *light* colored background. Same color family (alerts feel "red"), much less in-your-face, way easier to hit accessible contrast.

**You want colored text on a colored background** (e.g., secondary text inside a dark panel). Pure lightness adjustment forces you almost to white before you hit 4.5:1.

**The fix: rotate the hue toward a brighter hue** (cyan, magenta, yellow) to gain perceived brightness without going to white. The text stays colorful but reaches accessible contrast.

## Don't rely on color alone

~8% of men are red-green colorblind. If color is your *only* signal, those users can't read your UI.

**Always pair color with a second cue:**
- Up/down arrows alongside red/green metrics.
- ✓ / ✗ icons alongside success/error states.
- Different *line styles* (solid, dashed, dotted) in graphs, or different markers, in addition to color.
- In multi-line graphs where everything is just colored, switch some lines to vary by *contrast* (darker vs. lighter shades of the same hue). Colorblind users see lightness contrast fine.

Color enhances information; it shouldn't carry it alone.

## Quick checks

- Hex codes in the code? Suggest HSL (or design tokens) for new work — keeps relationships visible.
- Only 2–3 greys defined? Likely undersupplied; suggest expanding to 5–8.
- White-on-color buttons that look heavy? Try flipping to dark-on-light tint.
- Status indicators that use only color? Add an icon or label.
- Lighter shades feel washed out? Bump saturation in those shades.
