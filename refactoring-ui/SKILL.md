---
name: refactoring-ui
description: Apply principles from Adam Wathan & Steve Schoger's "Refactoring UI" to design and improve user interfaces. Use this skill whenever the user is building, reviewing, or improving any frontend UI — designing a new component, screen, form, or layout; refactoring existing markup/CSS that "looks off" or "feels unpolished"; asking how to make something "look more designed"; or making decisions about visual hierarchy, spacing, typography, color palette, shadows/depth, images, or finishing touches. Trigger even when the user doesn't say "design" — concrete UI tasks (a card, a dashboard, a sidebar, a modal, a landing page hero, a navbar, a table, a settings page) all qualify. Also trigger when the user shows a screenshot or pastes JSX/HTML/CSS and asks for feedback on appearance. Skip only for pure backend, data, or logic work that has no rendered output.
---

# Refactoring UI

A practical design coach grounded in *Refactoring UI* by Adam Wathan & Steve Schoger. The book's premise: most "ugly" interfaces aren't ugly because of poor taste — they're ugly because of a handful of fixable, mechanical mistakes. This skill helps you find those mistakes and fix them, or avoid them when building something new.

## When this triggers, do this

1. **Figure out the mode.** Three common shapes:
   - **Refactor / review** — user shows existing code or a screenshot and wants it improved. Diagnose first; prescribe second.
   - **New build** — user is starting a component or screen. Use the *Starting from Scratch* workflow.
   - **Decision support** — user asks a narrow question ("what color for the secondary button?", "how much padding?"). Answer the question, but check whether a missing *system* is the real cause.
2. **Read the actual code or image** before suggesting anything. Don't prescribe from imagination. If they pointed at a file, read it. If they pasted markup, parse it. If it's a screenshot, look at it.
3. **Diagnose along the seven axes** below. The fastest path to a better UI is usually fixing the *weakest* axis, not polishing the strongest one.
4. **Prescribe concrete changes in their stack.** If they're on Tailwind, give Tailwind classes. If they're on plain CSS, give CSS. If on shadcn/Radix/MUI, use the right props. Always tie the change back to the principle ("we're bumping this from `text-base` to `font-semibold text-base` because *size isn't everything* — weight gives the same emphasis without forcing a larger font").
5. **Don't dump every principle.** Pick the 2–4 that actually matter for this UI and explain *why* they apply here. A wall of advice is noise.

## The seven axes

Each links to a reference file. Read the relevant one(s) before prescribing if you're not already confident — these are dense and easy to get subtly wrong (the section on grey-on-colored-backgrounds, the perceived-brightness color trick, the two-shadow technique, etc. all have non-obvious specifics).

1. **Hierarchy** — what's most important, and how do you make that obvious without shouting? See `references/hierarchy.md`.
2. **Layout & spacing** — breathing room, sizing systems, when not to use grids, ambiguous spacing. See `references/layout-and-spacing.md`.
3. **Typography** — type scale, font choice, line length, line-height, alignment, letter-spacing. See `references/typography.md`.
4. **Color** — HSL over hex, 8–10 shades per color, perceived brightness, accessible contrast. See `references/color.md`.
5. **Depth** — light from above, elevation via shadow, the two-part shadow, flat-with-depth tricks, overlap. See `references/depth.md`.
6. **Images** — text-on-image contrast, intended size for icons, taming user-uploaded content. See `references/images.md`.
7. **Finishing touches** — supercharged defaults, accent borders, background decoration, empty states, fewer borders, breaking component clichés. See `references/finishing-touches.md`.

Plus a workflow chapter for when you're starting cold: `references/starting-from-scratch.md`.

## The diagnostic checklist

When reviewing or refactoring, run through this quickly. Most UIs that "feel off" fail one or two of these:

- **Hierarchy is flat.** Headings, body, captions, labels all roughly the same weight and color. Fix: pick one element that *matters most*, push everything else back. Often via weight + color, not size.
- **Everything is the same shade of grey.** Two greys for text where there should be three (primary / secondary / tertiary). Or grey text on a colored background (use a hand-picked low-contrast color in the same hue instead).
- **Cramped.** Less than ~16px between distinct groups, or padding tighter than the breathing room a control needs. Add space. Then add more.
- **Ambiguous grouping.** Form labels equidistant from their own input and from the next field. Bulleted lists with line-spacing ≈ bullet-spacing. Always: *more space around a group than within it*.
- **Too many font sizes, all arbitrary.** Five sizes between 13px and 18px. Collapse to a scale (see typography reference).
- **Borders everywhere.** Every card, every row, every section has a 1px border. Try removing them — use a slight background shade or a shadow instead.
- **Buttons all look equally important.** Three solid-blue buttons on one screen. Decide which one is *the* primary; demote the others to outline or link styling.
- **Empty states are a sad blank panel.** Treat first-run / zero-state as a real screen, with an illustration or icon and a clear call-to-action.
- **Color is the only signal.** Red/green for up/down, no icon, no shape. Add a second cue.
- **Icons at the wrong intended size.** A 16px-grid icon blown up to 64px feels chunky; a 64px illustration shrunk to 24px turns to mush. Match icon to size or wrap small icons in a colored circle.

## How to talk about the changes

Two anti-patterns to avoid:

- **Don't dictate.** "Change this to `text-gray-500`" without context teaches nothing. Say *why*: "*Labels are a last resort* — the label `Status:` and the value `Active` are competing. Combine them (`Active`, on its own) or demote the label (`text-gray-500`, smaller) so the value reads first."
- **Don't moralize.** The user isn't bad at design. They're missing a system or pattern. Frame fixes as systems to adopt, not personal failings.

When you prescribe a system (a type scale, a color palette, a shadow scale), give them the *whole* scale, not just the one value you're using now. The point of a system is reuse — one-off values defeat it.

## Output format

For **refactor / review**, structure your reply roughly like:

> **What's working:** (1–2 lines, genuine.)
>
> **What to change** (ordered by impact):
> 1. **[Principle name]** — what's wrong, what to change to, code or class names.
> 2. ...
>
> **System gaps** (if any): missing type scale, color palette, spacing scale. Suggest the smallest version that solves their current problem; they can grow it.

For **new build**, walk through the *Starting from Scratch* sequence: feature first, grayscale, hierarchy, spacing, then color and depth. Don't try to design the whole app — pick the one feature they're building.

For **decision support**, answer the question directly. Add one sentence about whether a system would prevent the question from coming up again.

## What this skill isn't

- Not a brand or visual-identity system. It tells you how to make an interface feel polished within whatever identity the product already has.
- Not a substitute for usability testing or accessibility audits (though it cares about both — see the accessibility notes in `color.md`).
- Not opinionated about specific design tools (Figma, Sketch, code-first). Principles apply equally.

When the user gives you a real UI to work with, dig into the relevant reference file before you start prescribing. Generic advice produces generic UIs.
