# OG social card checklist (audit items 12 and 42)

Status 2026-11-20: images and tags verified locally. The debugger check below
is still pending a browser and a deploy. Do it before the next publish.

## What exists now

- One 1200x630 PNG per article in `public/og/<slug>.png` (17 files), plus
  `public/og/default.png` for home and about.
- Template: `scripts/og-card-template.html` (warm paper #FFFCF0, red #AF3029,
  Space Grotesk title, `$ izaz` brand mark, category in JetBrains Mono).
  Titles are the articles' real titles, word for word, from frontmatter.
  No title needed shortening, no ellipsis was used.
- Metadata: article pages set `openGraph.images` and `twitter.images` to
  `${site.url}/og/<slug>.png` (1200x630, alt is the article title) and
  `twitter.card` is `summary_large_image`. Home and about use
  `${site.url}/og/default.png` the same way.
- Local verification 2026-11-20: all 18 PNGs are exactly 1200x630 (Python
  PIL), each 22 to 41 KB (limit was about 300 KB), and 3 cards were viewed
  (longest title, a mid-length title, default): no clipped or overflowing
  text. `npx tsc --noEmit --incremental false` passes.

## Before you open the debuggers

1. Confirm `site.url` in `src/lib/site.ts` points at the live host that
   serves the site (the SEO work switches it from `https://izaz.dev` to
   the live Vercel host). The image URLs in the meta tags are built from
   `site.url`, so a wrong `site.url` means the debuggers fetch a dead URL.
2. Deploy, then open each image URL directly in a browser and confirm it
   loads, for example `<live-host>/og/an-introduction-to-llm-prompt-injection.png`
   and `<live-host>/og/default.png`.

## Test two cards

Test one article card and the home card. Suggested pair:

- Article: `<live-host>/blog/an-introduction-to-llm-prompt-injection`
- Home: `<live-host>/`

### 1. Facebook Sharing Debugger

URL: https://developers.facebook.com/tools/debug/

1. Paste the article URL, click Debug.
2. Check the preview shows the article card image (1200x630), the exact
   article title, and the article description.
3. Check `og:image` is the absolute URL ending in
   `/og/an-introduction-to-llm-prompt-injection.png`, `og:type` is
   `article`, and there are no warnings about a missing or too small image.
4. If the preview is stale or shows an old image, click Scrape Again and
   re-check. Facebook caches a card for about 30 days, so fix mistakes
   here before sharing the link anywhere.
5. Repeat steps 1 to 4 for the home URL and confirm the preview shows
   `default.png` with the site title.

### 2. X Card Validator

URL: https://cards-dev.twitter.com/validator

1. Paste the article URL and preview the card.
2. Check the large image card renders with the article image, the exact
   article title, and the description, and that `twitter:card` reads
   `summary_large_image`.
3. Repeat for the home URL and confirm the `default.png` card renders.

## What a correct card looks like

- Large image on top, 1200x630, warm paper background, red `$ izaz` mark,
  red category pill, article title in dark Space Grotesk, footer
  `izaz.dev` and `Cybersecurity, AI, Engineering`.
- Title and description match the article page exactly.
- No fallback site logo, no broken image icon, no cropped title.

## If a card is wrong

- Wrong or missing image: check the file exists at `public/og/<slug>.png`,
  the deploy included it, and `site.url` is the live host.
- Stale image in Facebook: use Scrape Again in the Sharing Debugger.
  X caches too; re-validate after a fix and allow a few minutes.
- Title cut off in the preview: the card PNG itself is fine (titles were
  render-verified), so check the page title in `generateMetadata` instead.
- After any fix, re-run both debuggers on both URLs and regenerate the
  card from `scripts/og-card-template.html` if the PNG itself must change.
