# Finishing Touches

The small details that take a UI from functional to feeling-designed. Most of these cost very little; many are pure additions to elements already in the design.

## Supercharge the defaults

The HTML defaults (browser bullets, native checkboxes, plain underlined links) are functional but bland. Easy wins:

- **Replace bullets with icons.** Checkmarks or arrows in your brand color for a generic list; topic-specific icons (padlock for security features, gear for settings, etc.) when it fits.
- **Promote quotes/testimonials into visual elements.** Bump the quotation mark to a large, soft, brand-colored ornament rather than a tiny inline character.
- **Style links beyond the default underline.** Brand color + heavier weight; or a thick, partial-overlap underline that feels custom; or a colored highlight on hover.
- **Custom checkboxes and radios using brand colors.** Just using your primary color for the selected state instead of the browser default lifts a form from "boring" to "polished".

These are all things the existing markup already has — you're enhancing, not adding.

## Add color with accent borders

A thin colored bar in the right place adds visual flair without any graphic-design talent:

- **Across the top of a card** — gives an otherwise plain card a definite identity. Useful for color-coding card categories.
- **Highlighting the active nav item** — a thick left border (or bottom border on horizontal nav) in your primary color.
- **Down the left side of an alert message** — turns a flat colored box into something that feels more designed. Especially nice when paired with a neutral background and the accent providing all the semantic color.
- **As a short bar underneath a headline** — a decorative underline that's not literally an underline.
- **Across the top of the entire layout** — a brand-colored band at the very top of the page.

These are essentially zero-effort and consistently improve the *feel*. Color a rectangle is not "design talent".

## Decorate your backgrounds

Even with great hierarchy, type, and color, a UI can feel plain because the *backgrounds* are all the same flat white or grey.

**Vary the background color.** Use a subtle off-white or a slight tint for one section of a page. Distinguishes sections from one another and emphasizes individual panels.

**Use a slight gradient.** For a more energetic look. Best results: two hues no more than ~30° apart on the color wheel — too far apart starts looking like a rainbow.

**Add a subtle repeating pattern.** SVG noise, dots, lines, geometric textures (e.g., from Hero Patterns). Keep the contrast low so it doesn't fight the content. Can run across the whole background or be tiled along a single edge.

**Drop in a single shape or simple illustration.** A geometric blob in a corner, a simplified world map behind a contact section, a piece of a pattern peeking out. Low contrast — still supporting, not stealing.

## Don't overlook empty states

It's tempting to design only the populated state — "here's the dashboard with sample data" — and let the empty state be a blank panel. The empty state is often a user's *first* interaction with a feature; treat it like a real screen.

- **Use an illustration or icon** to give the empty state warmth and personality.
- **Make the call-to-action obvious.** The whole point of an empty state is to tell the user what to do next. Emphasize the primary action.
- **Hide unnecessary supporting UI.** If the populated view has tabs, filters, sort dropdowns — most of those have nothing to do until there's content. Hide them in the empty state so the call-to-action isn't competing.

Empty states are an opportunity to be interesting. Don't waste them.

## Use fewer borders

Borders are the default tool for separation, and most UIs have *way* more borders than they need. Each border adds visual noise; many borders make designs feel cluttered.

Three replacements:

**Use a box shadow.** A soft shadow outlines the element similarly to a border but feels less harsh. Works best when the bordered element is a different color than its background (the shadow contributes the contrast).

**Use two different background colors.** A subtle tint difference between adjacent areas creates separation without any explicit line. If you have both a background-color difference *and* a border, try removing the border — you probably don't need it.

**Use extra spacing.** Increase the gap between two groups instead of separating them with a line. Often the most elegant fix — separation by *absence* rather than addition.

A quick exercise: remove every border in a design, and add back only the ones that actually solve a real visual problem. You'll usually end up keeping ~30% of them.

## Think outside the box

Many components have a "default look" we've absorbed by exposure. Just because a dropdown is *usually* a white box with a vertical list of grey links doesn't mean it has to be.

**Dropdowns** can be multi-column, sectioned, contain icons or supporting text, mix different content types. They're just floating boxes — they can hold anything.

**Tables** don't need one piece of data per column. If a column doesn't need to be sortable, combine it with a related column for richer hierarchy:
- Name + email in one cell with name bold and email small/grey.
- Avatar + name + role as a single cell.

**Tables can hold non-text.** Status pills, avatars, sparkline graphs, color swatches — far more interesting than rows of plain text.

**Radio buttons** can be **selectable cards** when the choice is significant (pricing tiers, plan selection, "which template?"). A stack of labels next to circles is the laziest possible UI for an important decision.

**Buttons** can have icons + text, secondary text below the main label, two-tone backgrounds, etc.

The exercise: look at each component in the UI, ask "what's the cliché version of this?", and ask whether you can do better.

## Quick checks

- Bulleted list in a feature section? Try replacing the bullets with brand-colored checkmarks or topic icons.
- Form using browser-default checkboxes/radios? Style them with your brand color — easy win.
- Plain rectangular cards? Add an accent border across the top, optionally colored by category.
- Background is one flat color everywhere? Vary one section, or add a subtle pattern in the hero.
- Empty state is just "No items yet."? Add an illustration and a prominent CTA.
- Lots of borders defining cards, rows, sections? Remove all and add back only what's needed.
- A boring component (table, dropdown, radio group) doing important work? Consider the unconventional version.
