# Working with Images

Images are usually the first thing to make a polished design look amateurish. A few specific failure modes and their fixes.

## Use good photos

Bad photos sink an otherwise good design. If you need photography:

1. **Hire a photographer** for specific needs. Lighting, composition, and color are years of skill — not camera price.
2. **Use high-quality stock** for generic needs. Unsplash, Pexels, etc. for free; the paid sites for distinctive imagery.

Don't design with placeholder photos and plan to "swap in real photos later". You'll size and crop around the placeholders' specific compositions, and the swap-in step never goes smoothly.

## Text needs consistent contrast

Putting a headline over a hero image is hard because photos are *dynamic* — they have very light areas and very dark areas in the same frame. White text vanishes in the light spots; dark text vanishes in the dark spots. There's no text color that works everywhere on a dynamic image.

The fix is to **reduce dynamics in the image** so the text-to-background contrast becomes consistent.

### Add an overlay

Drop a semi-transparent layer over the image:

- **Dark overlay** → tones down the bright spots → light text reads everywhere.
- **Light overlay** → brightens the shadows → dark text reads everywhere.

Simplest fix, but it darkens or lightens the *whole* image — you lose some of the photo's character.

### Lower the image contrast

Process the image itself: drop the contrast (and compensate brightness so it doesn't go murky). More control than an overlay; preserves more of the photo's "feel".

### Colorize the image

Strip the image's color and replace with a single brand-color tint:

1. Lower the image contrast (balances it out).
2. Desaturate fully (kills existing color).
3. Add a solid fill in your brand color with a "multiply" blend mode.

Great way to make stock photography feel on-brand and unify a hero with the surrounding design.

### Add a text shadow

If you want to keep the photo's dynamics, use a **subtle text shadow that looks more like a glow than a drop shadow**:

- Large blur radius.
- No offset (centered glow).
- Subtle opacity.

Combine with a mild contrast reduction on the image — text shadow alone won't carry contrast across heavy dynamics.

## Everything has an intended size

Icons and screenshots both fail when scaled away from the size they were drawn at.

### Don't scale up small icons

A 16–24px-grid icon blown up to 64–128px looks chunky and amateurish, even though it's a vector and "won't pixelate". Detail is missing for the larger size; proportions assume a small canvas.

**Fix:** instead of scaling the icon, **wrap it in a larger shape** with a background color. The icon stays near its intended size; the shape fills the larger area. (Common pattern: 16px icon centered in a 48px colored circle for landing-page "features" sections.)

### Don't scale down screenshots

A full app screenshot shrunk 70% renders 16px text as 4px text — illegible squinting.

**Fix options:**
- Take the screenshot **at a smaller layout size** (e.g., a tablet viewport) so it fits without aggressive shrinking.
- **Take a partial screenshot** — crop to one component, not the whole UI.
- **Draw a simplified version** with details removed and small text replaced with simple lines. Communicates the design without illegible noise.

### Don't scale down icons either

Icons drawn for 64px look mushy at 16px (favicon-style). The renderer can't make every detail readable in a tiny space.

**Fix:** redraw a **simplified version** at the target size. Lose detail you control, instead of letting the rasterizer decide.

## Beware user-uploaded content

When images come from your users, you can't fine-tune them. But you can prevent them from destroying your layout.

### Control shape and size

User-uploaded images at their intrinsic aspect ratios wreak havoc — especially in grids or lists. Force a uniform container and crop:

```css
background-image: url(...);
background-size: cover;
background-position: center;
/* container has the dimensions you actually want */
```

Or with `<img>`:

```css
object-fit: cover;
object-position: center;
width: <fixed>;
height: <fixed>;
```

### Prevent background bleed

User uploads a photo with a background close to your UI's background color, and the image loses its edges. Fixing this with a border usually clashes with whatever colors are in the image.

**Better fix: a subtle inner box-shadow.** Most users won't notice it's there, but it gives the image a defined edge regardless of contents.

```css
box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
```

If you don't like the inset look, a **semi-transparent inner border** (e.g., a 1px border in `rgba(0,0,0,0.05)`) accomplishes the same thing.

## Quick checks

- Hero with text and a varied photo background? Add an overlay or lower the photo's contrast.
- 64px icons that look chunky? They're probably 16px-grid icons scaled up — wrap them in shapes.
- Tiny screenshot crammed into a feature card? Use a partial screenshot or take it at a smaller viewport.
- User avatars in a feed have wildly different aspect ratios? `object-fit: cover` in a fixed container.
- User photo backgrounds blending into the page? Subtle inner shadow.
