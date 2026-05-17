# Starting from Scratch

Workflow notes for when the user is building something new — a feature, a screen, an app. The mistake here is almost always *trying to design too much at once*.

## Start with a feature, not a layout

When you start "designing the app", you reach for the shell: top nav vs sidebar, where the logo goes, container width. That decision-making is paralyzing because you haven't built any actual features yet — you don't know what the shell needs to contain.

Flip it: pick one concrete feature (e.g., "search for a flight") and design that. List the elements the feature actually needs:

- A field for the departure city
- A field for the destination city
- A field for the dates
- A search button

That's it. Once you have a few features, the shell almost designs itself — and you might find you need less of it than you thought (Google has no chrome).

**When to apply:** the user says "I'm building a new app/dashboard/admin" but hasn't named a specific feature. Push them: *which one feature should we design first?*

## Detail comes later

In early sketches, don't pick typefaces, shadows, icons. Stay in low fidelity.

- Sharpies on paper, if anything.
- Or: design in greyscale, with no color at all. Forces spacing, size, and contrast to do the work. Color goes in later, when there's a clear hierarchy to *enhance*.

Sketches and wireframes are disposable. Their job is to let you move fast to the real thing.

## Don't design too much

Don't design every screen and every edge case before building. Work in cycles:

1. Design a small version of the next feature.
2. Build it.
3. Iterate on the working version until problems are solved.
4. Move to the next feature.

Be a pessimist: don't imply functionality you aren't ready to build. The comment system without attachments still beats no comment system, but if you designed in the attachments you'll get blocked trying to ship it. Design the smallest useful version.

## Choose a personality

Personality is mostly determined by four concrete factors. Decide each *deliberately*:

- **Font choice.** Serif → classic / elegant. Rounded sans-serif → playful. Neutral sans-serif → plain, lets other elements carry personality.
- **Color.** Blue → safe, familiar (no one complains). Gold → expensive, sophisticated. Pink → fun, less serious. There's no rigorous psychology — pay attention to how the color feels to you.
- **Border radius.** Small → neutral. Large → playful. None → serious, formal. *Stay consistent.* Mixing square and rounded looks worse than either.
- **Language.** Tone in copy carries as much personality as visuals. Choose between formal/official and casual/friendly deliberately.

If you don't have a gut feeling, look at sites your audience already uses. Borrow the *level of seriousness*, not the specific design — don't look like a second-rate clone.

## Limit your choices

Most decision fatigue comes from working without constraints: should this be 12px or 13px? 18px or 20px margin? Semibold or bold? With infinite options, every choice feels equally defensible — paralysis.

**Define systems in advance.** Pick a small set of values up front for:

- Font size
- Font weight
- Line height
- Color (8–10 shades per hue)
- Margin / padding
- Width / height
- Box shadows
- Border radius
- Border width
- Opacity

Then *only choose from the system*. Decision-making becomes: "pick the closest value; try the one above and below; one of them is clearly best."

You don't have to define all systems on day one. Just adopt the mindset: whenever you find yourself making the same minor decision twice, introduce a system instead.

## How to bring this into a Claude session

If the user is starting cold:

1. Ask which one feature they want to design first. Don't let them stay at "the app".
2. List the minimum elements that feature needs.
3. Sketch it in grayscale first (literally — use only `gray-*` classes / values for the first pass).
4. Once hierarchy reads correctly without color, introduce the primary color for the most important action only.
5. Then add the rest of the system (full palette, type scale, spacing scale) as needs arise.
