#!/usr/bin/env node
/**
 * convert-colors.js — convert a hex color into the CSS format used by the
 * project's globals.css (oklch, hsl, or hex).
 *
 * Usage:
 *   node convert-colors.js <format> <#rrggbb | #rgb>
 *     format: oklch | hsl | hex
 *
 * Examples:
 *   node convert-colors.js oklch "#d97706"   -> oklch(0.681 0.162 55.94)
 *   node convert-colors.js hsl   "#fafafa"   -> hsl(0 0% 98%)
 *   node convert-colors.js hex   "#FFF"      -> #ffffff
 *
 * Output is the bare color function/value (no CSS var wrapper), ready to drop
 * in as the value of a `--token: ...;` declaration. Alpha is not handled here —
 * preserve existing alpha patterns (`/ 10%`, `/ 0.5`) in the CSS by hand.
 */

function fail(msg) {
  process.stderr.write(`convert-colors: ${msg}\n`);
  process.exit(1);
}

function parseHex(input) {
  let h = String(input).trim().replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{3}$/.test(h)) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-f]{6}$/.test(h)) fail(`not a valid hex color: "${input}"`);
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
    hex: `#${h}`,
  };
}

// sRGB (0..1) channel -> linear light
function srgbToLinear(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

// Björn Ottosson's linear-sRGB -> OKLab -> OKLCH
function hexToOklch({ r, g, b }) {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  let C = Math.sqrt(a * a + bb * bb);
  let H = (Math.atan2(bb, a) * 180) / Math.PI;
  if (H < 0) H += 360;

  return { L, C, H };
}

// standard HSL from sRGB (0..1)
function hexToHsl({ r, g, b }) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return { h, s: s * 100, l: l * 100 };
}

const round = (n, p = 3) => {
  const f = Math.pow(10, p);
  return Math.round(n * f) / f;
};

function main() {
  const [, , format, color] = process.argv;
  if (!format || !color) {
    fail("usage: node convert-colors.js <oklch|hsl|hex> <#rrggbb>");
  }
  const rgb = parseHex(color);

  switch (format) {
    case "oklch": {
      const { L, C, H } = hexToOklch(rgb);
      if (C < 0.0005) {
        process.stdout.write(`oklch(${round(L)} 0 0)\n`);
      } else {
        process.stdout.write(`oklch(${round(L)} ${round(C)} ${round(H, 2)})\n`);
      }
      break;
    }
    case "hsl": {
      const { h, s, l } = hexToHsl(rgb);
      process.stdout.write(`hsl(${round(h, 1)} ${round(s, 1)}% ${round(l, 1)}%)\n`);
      break;
    }
    case "hex": {
      process.stdout.write(`${rgb.hex}\n`);
      break;
    }
    default:
      fail(`unknown format "${format}" (expected oklch | hsl | hex)`);
  }
}

main();
