/**
 * Generate a 1200x630 social-share banner (og:image) as a PNG.
 *
 * Why this exists: Facebook / Messenger / LinkedIn do NOT accept SVG for
 * og:image, so a real raster PNG must be produced and committed. This is a
 * one-time author tool, not a runtime dependency. The PNG it writes is a
 * static asset you commit and serve.
 *
 * Usage:
 *   npm i -D sharp
 *   node generate-og.mjs            # writes ./og.png
 *
 * Customize the CONFIG block, then re-run. Fonts come from the system, so
 * the wordmark renders in whatever sans/mono is installed (Segoe UI / Arial
 * on Windows, Helvetica/DejaVu elsewhere). That is fine for a banner.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// ----------------------------- CONFIG ------------------------------
const CONFIG = {
  out: 'og.png',
  eyebrow: 'YOUR PROJECT · TAGLINE · EST. 2026',
  // The wordmark is split so the second part can be accented.
  wordA: 'Your',
  wordB: 'Brand',
  tagline: 'One clear sentence about the site.',
  url: 'example.github.io/your-repo',
  colors: {
    bg: '#0f1318',
    ink: '#eef2f5',
    muted: '#a7b1bb',
    accent: '#2ce3c4',
    frame: '#283139',
  },
};
// -------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, CONFIG.out);
const c = CONFIG.colors;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0 H0 V48" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.05"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="${c.bg}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="40" y="40" width="1120" height="550" rx="16" fill="none" stroke="${c.frame}" stroke-width="2"/>

  <circle cx="98" cy="156" r="6" fill="${c.accent}"/>
  <text x="116" y="162" font-family="Consolas, 'Courier New', monospace" font-size="24"
        letter-spacing="4" fill="${c.muted}">${CONFIG.eyebrow}</text>

  <text x="90" y="330" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="118" letter-spacing="-1">
    <tspan fill="${c.ink}">${CONFIG.wordA}</tspan><tspan fill="${c.accent}">${CONFIG.wordB}</tspan>
  </text>

  <text x="94" y="402" font-family="'Segoe UI', Arial, sans-serif" font-size="40" fill="${c.muted}">
    ${CONFIG.tagline}
  </text>

  <rect x="94" y="446" width="120" height="5" rx="2.5" fill="${c.accent}"/>

  <text x="94" y="540" font-family="Consolas, 'Courier New', monospace" font-size="26" fill="${c.muted}">
    ${CONFIG.url}
  </text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`Wrote ${out} (1200x630)`);
