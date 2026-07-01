# Web Launch Kit

A small, reusable starting point for building a **public static site** that is
cheap to host, safe to share, and finished-looking from the first deploy. It is
distilled from real builds so the same things never get forgotten twice (the
social card being the usual one).

Reference material, in the spirit of this archive. Copy what you need.

## Files

| File | What it is |
| --- | --- |
| `head.html` | A complete, commented `<head>` with SEO + social-card meta. Fill the `{{PLACEHOLDERS}}` and paste into your base layout. |
| `generate-og.mjs` | Generates the 1200x630 `og:image` PNG. Edit the CONFIG block, `npm i -D sharp`, then `node generate-og.mjs`. |

## Architecture blueprint

The default shape that keeps a personal/portfolio site maintainable for years:

- **Static-first.** A static site generator (Astro is the current pick; Eleventy,
  Hugo, or plain HTML all work). Output is plain HTML/CSS/JS.
- **No backend, no database, no login, no comments.** Nothing to operate, nothing
  to leak, free to host on GitHub Pages.
- **Content as validated data files.** One file per entry (YAML/MD/MDX) under a
  `content/` dir, checked against a schema (e.g. Astro content collections + zod).
  A malformed edit fails the build instead of shipping silently. This is also what
  makes it safe to let an AI assistant edit content.
- **CI is the gate.** A PR workflow runs the build + schema check; a deploy workflow
  publishes on merge to `main`. AI or humans open PRs; a human reviews and merges.
- **Derived, not hand-tuned, state.** Progress bars, counts, and "current" widgets
  are computed from data (dates, file counts), so they never go stale or lie.
- **Public-safe by policy.** If the site touches school/work material, ship a
  `CONTENT_POLICY.md`: own words + public links only; no syllabi, prompts, rubrics,
  solutions, slides, or private data. The default posture is "when in doubt, leave
  it out."
- **Social card from commit one.** See the checklist below.

## Pre-launch checklist

Anything public-facing is not "done" until all of these are true:

- [ ] `og:image` exists (1200x630 PNG) and is an **absolute** URL
- [ ] `twitter:card` = `summary_large_image`
- [ ] `og:title`, `og:description`, `og:url` set with absolute URLs
- [ ] favicon (`favicon.svg`) + `apple-touch-icon.png`
- [ ] canonical link + meta description
- [ ] `sitemap.xml`, sensible `robots`, and a real `404` page
- [ ] page `<title>` reads well in a browser tab and a search result
- [ ] correct base path if hosted under a sub-path (e.g. `/repo-name/`)
- [ ] for project Pages sites: repo Settings -> Pages -> Source = "GitHub Actions"

## Why the social card matters (the lesson baked in here)

It is invisible while developing; you only see it when someone shares the link.
For a portfolio that whole point is to be shared, so a bare, banner-less link reads
as broken. The text OG tags are one line each; the `og:image` needs an actual file,
which is where people stop. This kit removes that excuse: paste `head.html`, run
`generate-og.mjs`, deploy, then force one re-scrape in the
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).

## Gotchas (so they are written down somewhere)

- Previews only work on the **deployed public URL**. Crawlers cannot reach
  `localhost` or a `192.168.x.x` LAN address.
- `fb:app_id` is **not required**; that debugger warning is advisory.
- Each chat client (phone app vs desktop/web) caches previews **separately**, so
  one may show the banner before another. Already-sent messages never update; send
  a **new** message to test after re-scraping.
