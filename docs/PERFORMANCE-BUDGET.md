# Performance budget

Date: 20 Nov 2026. Source for the baseline numbers: the audit in
`~/workspace/your_files/izaz-dev-blog-outstanding-audit/izaz-dev-blog-outstanding-audit.html`
(items 9 and 10, section 2), measured 20 Nov 2026, 00:23 to 00:45 CET.

## Measured baseline (audit, before this change)

- Home page: 1,412 KB transferred over 25 requests, measured locally.
- Article page: 1,019 KB transferred, measured locally.
- Largest items on home: Next.js RSC prefetch payloads of about 115 to 229 KB
  per prefetched route, caused by `Link` prefetching.
- CLS: 0 on home and article, measured locally. Load: 800 to 928 ms in
  headless Chromium locally. LCP produced no entry in that run, so LCP is
  unmeasured (audit item 6).

## Budget

| Page | Transfer | Requests |
| ---- | -------- | -------- |
| Home, mobile | 600 KB or less | 20 or fewer |
| Home, desktop | 600 KB or less | 20 or fewer |
| Article, mobile | 800 KB or less | 20 or fewer |
| Article, desktop | 800 KB or less | 20 or fewer |

Notes:

- Article pages get a proportionate budget, not the home budget, because an
  article legitimately carries more content: a longer page, more diagrams,
  and code blocks. The article budget is set from the measured article
  baseline of 1,019 KB: it requires a cut of at least about 20 percent from
  that baseline, mainly by removing prefetched RSC payloads for below-fold
  links (see below).
- The request budget is the same on every page (20 or fewer) because the
  request count is driven by template assets and prefetches, not by article
  length.
- No budget is set for LCP, INP, or CLS here. Those are covered by audit
  item 6 (field measurement with Vercel Speed Insights and Search Console),
  not by this document.

## CI thresholds (to be enforced by the CI agent)

Lighthouse CI must fail a pull request that breaches any of these:

- Performance: over 90
- Accessibility: 100
- Best Practices: over 90
- SEO: over 90

The CI configuration itself is not part of this item. The CI agent owns
adding the Lighthouse CI check and wiring it to the budgets above. Until
that check exists, the budgets in this file are a manual pre-merge check:
measure home and one article page before merging a change that adds
assets, fonts, scripts, or links.

## What changed for audit item 10 (20 Nov 2026)

### Prefetch disabled on below-fold links

Next.js `Link` prefetches the linked route by default when the link is in
the viewport. On this site that prefetched a full RSC payload (about 115
to 229 KB each) for every visible article link, even though a reader
usually clicks at most one of them. That is the main cause of the home
page transferring 1,412 KB over 25 requests.

`prefetch={false}` was added in exactly two places:

1. `src/components/ArticleRow.tsx`: the single `Link` in that component.
   This covers every place `ArticleRow` is used: home Selected writing
   (4 links), the blog index, and the Related writing list on article
   pages.
2. `src/app/page.tsx`: the Topics links only (`/blog?topic=...`).

### Prefetch deliberately kept

These links were NOT changed, because they are above the fold or are the
most likely next navigation:

- Hero links on home (`/blog` "Read the writing", `/about` "About me").
- Header navigation (`src/components/Header.tsx`).
- "View all writing" link on home (`/blog`).
- Breadcrumb links on article pages (`/` and `/blog`).
- Previous and next article links on article pages.
- Tag pills on article pages (`/blog?tag=...`).
- Table of contents anchor links (same-page anchors, no RSC payload).

### Font fallback (audit item 9, same change set)

`font-size-adjust: from-font;` was added to the `body` rule in
`src/app/globals.css`. Fonts are self-hosted with `next/font/google`
(Space Grotesk, Instrument Sans, JetBrains Mono in `src/app/layout.tsx`)
with `display: "swap"`, and this declaration makes the fallback font match
the primary font x-height while the web font loads. It adds no bytes of
transfer. Verify it by blocking the web font in DevTools and checking that
fallback text does not reflow.

## Re-measurement status

Re-measurement after the prefetch change is left for final verification.
No new transfer or request total is claimed in this document, because no
post-change measurement has been run. The final verification step is: load
home and one article page on mobile emulation, record transfer and request
count, and compare them with the budgets above.

## Static audit of client JavaScript (audit item 10, Coverage substitute)

No live browser was available for this item, so no DevTools Coverage run
was done. This section is a static audit instead: every client component
and its imports, as found in `src/` on 20 Nov 2026. It is the input for
the real Coverage run described below, not a replacement for it.

### Client components (files starting with `"use client"`)

| Component | Lines | Imports | Used on |
| --------- | ----- | ------- | ------- |
| `src/components/ThemeProvider.tsx` | 76 | `react` only (`createContext`, `useCallback`, `useContext`, `useEffect`, `useMemo`, `useState`) | Every page, via `src/app/layout.tsx` |
| `src/components/ThemeToggle.tsx` | 33 | `lucide-react` (`Moon`, `Sun`); `useTheme` from `./ThemeProvider` | Every page, via `Header` |
| `src/components/Particles.tsx` | 167 | `react` only (`useEffect`, `useRef`) | Every page, via `src/app/layout.tsx` |
| `src/components/Header.tsx` | 91 | `lucide-react` (`Menu`, `X`); `next/link`; `next/navigation` (`usePathname`); `react` (`useEffect`, `useState`); `@/lib/site`; `./ThemeToggle` | Every page, via `src/app/layout.tsx` |
| `src/components/CodeBlock.tsx` | 75 | `lucide-react` (`Check`, `Copy`); `react` (`useState`) | Article and project pages, via `MdxContent`, only where a code block renders |
| `src/components/SearchPalette.tsx` | 177 | `lucide-react` (`Search`, `X`); `next/navigation` (`useRouter`); `react` (`useEffect`, `useMemo`, `useRef`, `useState`); `@/lib/format`; `@/lib/search` (`searchItems`) | Every page, via `src/app/layout.tsx` |
| `src/components/BlogIndex.tsx` | 245 | `next/link`; `next/navigation` (`useSearchParams`); `react` (`useEffect`, `useMemo`, `useState`); `@/lib/content` (type `Post`); `@/lib/format` (`stripMarkdown`); `@/lib/topics`; `./ArticleRow` | Blog index only (`src/app/blog/page.tsx`) |
| `src/components/SearchPageContent.tsx` | 88 | `next/link`; `next/navigation` (`useSearchParams`); `react` (`useMemo`, `useState`); `@/lib/format`; `@/lib/search` | Search page only (`src/app/search/page.tsx`) |

### Server components on the article page (no client JavaScript of their own)

- `src/components/MdxContent.tsx` (151 lines, server): `next-mdx-remote/rsc`,
  `rehype-highlight`, `remark-gfm`, plus `Callout`, `CodeBlock` (client),
  and `Diagram`. It is the only server component that pulls a client
  component (`CodeBlock`) onto article pages.
- `src/components/TableOfContents.tsx` (39 lines, server): `next/link`
  only, for same-page anchor links.
- `src/components/ArticleRow.tsx` (32 lines, server): `next/link` and
  `@/lib/format` only.
- `src/components/Callout.tsx` (59 lines, server): seven named icons from
  `lucide-react` (`AlertCircle`, `AlertTriangle`, `Info`, `Lightbulb`,
  `Scale`, `ShieldAlert`, `ShieldCheck`).
- `src/components/Diagram.tsx` (35 lines, server): `react` types only.

### Findings from the static audit

1. Layout-wide client JavaScript ships on every page, including every
   article page: `ThemeProvider`, `ThemeToggle`, `Particles`, `Header`,
   and `SearchPalette`. That is the baseline client bundle for an article
   page before any article-specific code.
2. `SearchPalette` (177 lines) is the largest single client component and
   it ships on every page, but it does nothing until the reader opens it
   with Ctrl+K or the search button. It is the strongest candidate for
   lazy loading (dynamic import on first open). This is a candidate only;
   the Coverage run below must confirm how much of it is unused on a
   plain article read.
3. `Particles` (167 lines) is a canvas animation that ships on every page.
   It is static under `prefers-reduced-motion` and pauses when hidden, but
   its code still downloads and parses on every article page. Check in
   Coverage whether its bytes count as unused on a short read.
4. `CodeBlock` (75 lines) ships through `MdxContent` on article pages.
   The audit records 70 code blocks across 17 articles, and 2 articles
   have 0 code blocks. Check in Coverage whether `CodeBlock` bytes are
   unused on those 2 articles.
5. `BlogIndex` (245 lines) and `SearchPageContent` (88 lines) are
   page-specific and do not ship on article pages. Do not expect them in
   article Coverage results; if they appear there, that is a bundling
   defect worth reporting.
6. There is no `next/dynamic` import and no dynamic `import()` anywhere
   in `src/`. Nothing in the client bundle is code-split today, so every
   client component above loads eagerly on the pages that use it.
7. `lucide-react` is imported by named icon only in every component
   (`Menu`, `X`, `Moon`, `Sun`, `Check`, `Copy`, `Search`, `X`, and the
   seven `Callout` icons). No file imports the whole icon set, so icon
   tree-shaking is already in place; do not expect a large unused
   `lucide-react` chunk in Coverage.
8. No third-party analytics, tag manager, or chat script is loaded. The
   prefetch payloads, not third-party scripts, are the measured waste on
   home.

### Exact DevTools Coverage steps (for the real run)

Run this on the deployed or local production build, not on `next dev`:

1. Open an article page in Chrome or Edge.
2. Open DevTools (F12 or Ctrl+Shift+I), then open the Command Menu
   (Ctrl+Shift+P).
3. Type "Show Coverage" and press Enter. The Coverage drawer opens.
4. Click the reload icon in the Coverage drawer (or press Ctrl+R with the
   drawer open) so Coverage records the full page load.
5. Scroll the article to the bottom once, so below-fold code that runs on
   scroll is counted as used, then wait a few seconds.
6. Click a row to open a file, and sort the Coverage table by Unused Bytes
   (click the "Unused Bytes" column header).
7. Record, for each JavaScript file over 5 KB unused: file name, total
   bytes, unused bytes, and unused percent.
8. Repeat steps 4 to 7 on the home page and on one article with no code
   blocks, and compare the three runs.
9. Note: RSC prefetch payloads are not JavaScript files and do not appear
   in Coverage. Check them separately in the Network panel by filtering
   for `?_rsc=` requests and recording their transferred sizes before and
   after the `prefetch={false}` change.
10. File the Coverage numbers next to the budgets above. If a file shows
    more than 50 percent unused on an article read, open a follow-up item
    for it (first candidate: lazy-loading `SearchPalette`).

## How to keep this budget

- Before adding a client component, a font weight, an image, or a
  third-party script, estimate its transfer and request cost and check it
  against the table above.
- Before adding a `Link` to a list (article rows, related lists, search
  results), default to `prefetch={false}` unless the link is above the
  fold or is the single most likely next click.
- Re-measure home and one article page after any change to `layout.tsx`,
  `Header`, `SearchPalette`, `Particles`, `MdxContent`, or `ArticleRow`,
  and record the new numbers here with the date.
