# Hierarchy

The single highest-leverage axis. Hierarchy is what makes something feel "designed" vs. feel like a wall of equally-loud content. Most interfaces that look bad fail here first.

## Not all elements are equal

Visual hierarchy = how important each element *appears* relative to the others. You make it happen deliberately by emphasizing primary content *and* de-emphasizing secondary/tertiary content.

When everything competes for attention, nothing wins. Before you touch a color or font, decide for each element: primary, secondary, or tertiary.

## Size isn't everything

Don't rely on font size alone to encode importance. It leads to:
- Primary content that's awkwardly huge.
- Secondary content that's too small to read.

Use **weight** and **color** to do the work instead. A primary element can stay at a reasonable size if it's `font-semibold` or `font-bold`. Supporting text can stay readable while being de-emphasized with a softer color.

**Rules of thumb for text:**

- Two or three colors for text: dark (primary), medium grey (secondary), light grey (tertiary, e.g. footer copyright).
- Two font weights: normal (400 or 500) for most text, heavier (600 or 700) for emphasis.
- Avoid weights under 400 in UI — they look fine in huge headlines but turn fuzzy at small sizes. To de-emphasize, drop the color or size instead.

## Don't use grey text on colored backgrounds

Grey-on-white works because it's *reduced contrast vs. background*. Apply that same lens to colored backgrounds — the goal is "closer to the background color", not "literally grey".

Two failure modes to avoid:

- **White + opacity.** Looks washed-out or disabled. On top of images/patterns, the background bleeds through the text.
- **Pure grey on color.** Looks dirty; the hues clash.

The fix: hand-pick a new color with the *same hue* as the background, then adjust saturation and lightness until the contrast feels right. The text stays in the family of the background but reads as supporting.

## Emphasize by de-emphasizing

When the main element doesn't pop and you can't make it any louder, the right move is to *quiet down the things around it*.

- Active nav item not standing out? Don't make it brighter — make the inactive items softer.
- Sidebar competing with content? Don't add a background to the content — *remove* the background from the sidebar so the content sits directly on the page.

This is one of the most powerful moves in the book. When in doubt, look for what to *subtract* before adding more emphasis.

## Labels are a last resort

Naive `label: value` formatting gives every datum the same emphasis, which destroys hierarchy.

**You often don't need a label at all.** Format and context carry it:
- `janedoe@example.com` is obviously an email.
- `$19.99` is obviously a price.
- "Customer Support" under a person's name is obviously a department.

**When you do need clarity, fold the label into the value:**
- "Bedrooms: 3" → "3 bedrooms"
- "In stock: 12" → "12 left in stock"

**When you must keep separate labels** (e.g., a dashboard with scannable rows), treat the label as supporting content: smaller, lower contrast, lighter weight. The data is what matters.

**When the label *is* the scan target** (e.g., a tech-spec table where users look for "depth"), emphasize the label and de-emphasize the value modestly. Don't crush the value — it's still the answer.

## Separate visual hierarchy from document hierarchy

`<h1>` is semantic. It does *not* mean "big". `<h6>` is semantic. It does *not* mean "tiny".

Page titles like "Manage Account" are usually labels, not headlines — they support the content under them rather than starring. Often the right styling for a page title is small and quiet, while the main content gets the visual weight.

In some cases the section title is so redundant the right move is to keep it in the markup (for accessibility) but visually hide it. Pick elements semantically; style them however the hierarchy demands.

## Balance weight and contrast

Bold text feels emphasized because it covers more pixels. The same logic applies to icons, borders, fills — anything with *surface area*.

**Use contrast to compensate for weight.** Icons (especially solid ones) are heavy. When you put an icon next to text, the icon dominates by default. Soften it with a lighter color so it stops shouting. The icon stays the same size; it just feels balanced.

**Use weight to compensate for contrast.** A 1px hairline border at a soft color can vanish; bumping it to a noticeable color makes the design feel harsh. Instead, *make the border thicker* and keep the color soft. It reads without being aggressive.

## Semantics are secondary (for buttons)

There's a "pyramid of importance" on every page:

- One **primary action** — the thing the user is most likely to do. Solid, high-contrast background.
- A few **secondary actions** — important but not the focus. Outline buttons or low-contrast solid fills.
- Several **tertiary actions** — discoverable but quiet. Style like links.

Most pages get this wrong by giving multiple buttons identical solid styling because they're all "important actions". They aren't — one of them is *the* action; everyone else is supporting.

**Destructive ≠ primary.** A delete button on a list view shouldn't be big and red. Make it a quiet tertiary control. When the user clicks it, *the confirmation modal's "Delete" button* becomes the primary action there — that's where big and red belongs.

## Quick diagnostic

Squint at the screen. Can you tell what matters most in one glance?

- If no, the hierarchy is flat. Pick the one thing that should win and quiet everything else.
- If yes but it feels noisy, you probably have two or three things all yelling. De-emphasize all but one.
- If the page title is hogging visual weight and you're not sure why, it's almost certainly too big.
