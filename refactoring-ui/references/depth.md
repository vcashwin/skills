# Depth

Even on a flat 2D screen, UIs feel more polished when they convey a sense of depth. There's a small set of mechanical tricks that produce most of the effect.

## Emulate a light source

**The single rule: light comes from above.** Mimic how real-world objects look under a top-down light source and your interfaces will read as physical.

### Raised elements (buttons, cards, popovers)

Looking slightly down at a screen, you see a little of the top edge of a raised object and none of the bottom. So:

- **Top edge slightly lighter** than the face — a 1px top border in a lighter hue, *or* an inset box-shadow with a small positive vertical offset.
  - **Pick the lighter color by hand** rather than `rgba(255,255,255,0.x)`. A semi-transparent white desaturates the underlying color and looks washed out.
- **Below the element, a small dark shadow** — the raised object blocks some light from reaching the surface below. Keep the blur radius tight (a few pixels). These edge shadows should be *sharp* — think of a window frame's shadow on a wall, not a soft halo.

### Inset elements (text inputs, "wells", checkboxes)

Mirror everything: only the *bottom* lip is visible from a slightly-downward viewing angle, and that lip is *upward-facing*, so it catches light.

- **Bottom edge slightly lighter** — bottom border or inset box-shadow with a negative vertical offset.
- **Top inside edge slightly darker** — small inset box-shadow with a positive vertical offset, simulating the lip above blocking ambient light from the top of the well.

This is what makes form inputs read as "you can put stuff into me" instead of "I'm a flat rectangle".

### Don't get carried away

You're suggesting a light source, not rendering a photo. Real-world fidelity makes interfaces look busy and dated (skeuomorphism). A subtle hint of depth is plenty.

## Use shadows to convey elevation

Shadows position elements on a virtual **z-axis**. Bigger/softer shadow → element feels closer to the user → more attention.

- **Small, tight shadow** — slightly raised. Buttons, cards.
- **Medium shadow** — noticeably above the surface. Dropdowns, popovers.
- **Large, soft shadow** — clearly floating over the rest of the UI. Modals, command palettes.

**Define a fixed elevation scale up front** (usually ~5 levels is enough). Pick the smallest and largest first, then fill in between with shadows that grow roughly linearly. Pick a shadow based on *where the element sits on the z-axis*, not by tweaking the shadow itself for each component.

**Combine with interaction:**
- Drag-and-drop: when the user grabs an item, give it a bigger shadow. Visually pops forward; obviously draggable.
- Press states: when a button is clicked, shrink the shadow (or remove it). Reads as "being pushed into the page".

## Shadows can have two parts

The really nice shadows you see on polished sites are usually *two* shadows stacked:

1. **Large, soft, with significant vertical offset** — simulates the direct-light cast shadow behind the object.
2. **Tight, darker, low vertical offset, small blur** — simulates the ambient occlusion right under the object where even ambient light doesn't reach.

Example in CSS:

```css
box-shadow:
  0 10px 20px rgba(0, 0, 0, 0.10),   /* large, soft */
  0 3px 6px rgba(0, 0, 0, 0.06);     /* tight, sharper */
```

This gives you control the single-shadow approach can't: the soft outer halo stays subtle while the edges of the element stay crisp and defined.

**Adjust with elevation:** higher-elevation elements look further from the surface, and the tight ambient-occlusion shadow weakens with distance in real life. So make the tight under-shadow more prominent at *low* elevations and very subtle (or absent) at *high* elevations.

## Even flat designs can have depth

"Flat design" usually means no shadows, gradients, or skeuomorphism. The best flat designs still convey depth — they just use other tools.

**Color does work that shadow normally would.** When the background and elements share a hue family:
- An element **lighter than the background** feels raised.
- An element **darker than the background** feels inset, like a well.

That's why a Slack-style sidebar (darker than the main canvas) reads as a layer behind the content, and a card slightly lighter than the page background reads as floating.

**Solid offset shadows** — short shadows with no blur, just a flat color offset down and to the right — give a stylized "raised" feel without breaking the flat aesthetic. Common on cards or buttons in playful designs.

## Overlap elements to create layers

A powerful and underused move: have elements **cross boundaries** instead of sitting inside containers.

- A card that **straddles the transition** between two backgrounds (e.g., half on a colored hero, half on the white content area below) feels more dimensional than a card cleanly inside one section.
- A featured element **taller than its parent** that pokes out top and bottom.
- Carousel arrows or video controls **overlapping** the media instead of sitting beside it.

### Overlapping images cleanly

When images overlap, their edges can clash visually. Trick: give each image a thin **invisible border** in the *background color*. Creates a small breathing gap between overlapping images without an obvious border — looks like layering without the mess.

In CSS this is `border: 4px solid <page-bg-color>`.

## Quick checks

- Buttons feel completely flat / plastic? Add a subtle top-edge highlight and a tight under-shadow.
- All shadows in the UI are the same? Define an elevation scale (3–5 levels).
- Modals only feel slightly above the page? Bump to the largest shadow tier.
- Cards rendered as bordered rectangles? Try replacing the border with a subtle shadow + slight background-color contrast.
- Whole UI feels static? Look for one element you can have overlap a section boundary.
