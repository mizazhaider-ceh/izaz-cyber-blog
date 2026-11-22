# Untangle checkpoint, izaz-dev-blog, scope src/lib (Phases 0-5)

STOP, no source edits have been made before this checkpoint.
Approval basis: the parent task explicitly authorised this pilot run on the
blog, on this branch only, with the full diff held for izaz's review before
any merge. No merge, no push, no deploy will happen from this run.

## 0. Safety setup (Phase 0)

- Branch: `untangle/blog-2026-11-22`, created from `ffefaa5`
  ("Fix: copy buttons a screen reader can tell apart (audit item 20)").
- Working tree was clean, so no new baseline commit was created. The
  baseline is the existing HEAD `ffefaa5` (recorded, not claimed as a new
  commit), per the skill's clean-tree rule.
- No work on `main`. Nothing has been pushed.

## Baseline test and build gate (Phase 0)

- `npm run build`: PASS, exit 0, compiled successfully, 37/37 static pages.
- `npx tsc --noEmit`: PASS, exit 0, no errors.
- `npm test`: NO TEST SCRIPT. The blog has no test suite, so the Tests
  extra is moot and the build plus typecheck is the gate.
- `npm run lint`: NOT CONFIGURED (`next lint` is deprecated and drops into
  an interactive setup prompt). Lint is not part of the gate, recorded as
  such, no lint result invented.

## 1. Scope and caps (Phase 1)

- Scope: ONE directory, `src/lib` (9 files, 584 lines). Whole-repo scope
  was NOT taken. `src/app`, `src/components`, and `content/` are out of
  scope and untouched.
- Caps: 25 files changed per run (expect 6), 3 re-check rounds.

## 2. Static analysis (Phase 2, tool evidence)

- knip 6.47.0 (full run, saved): no unused files, no unused dependencies.
  Unused exports (4): `BUTTONDOWN_USERNAME`
  (src/components/NewsletterSignup.tsx:14), `THEME_STORAGE_KEY`
  (src/components/ThemeProvider.tsx:15), `getSeriesBySlug`
  (src/lib/series.ts:62), `getSeriesForPost` (src/lib/series.ts:66).
  Unused exported types (4): `CalloutType` (src/components/Callout.tsx:13),
  `PostFrontmatter` (src/lib/content.ts:11), `ProjectFrontmatter`
  (src/lib/content.ts:26), `SiteConfig` (src/lib/site.ts:38).
  In-scope findings are P7 and P8 below. The three components findings
  are out of scope, noted as N2, not touched.
- madge 8.0.0: first run without extensions processed 0 files, which is
  NOT a result. Re-run with `--extensions ts,tsx` processed 9 files in
  src/lib: no circular dependency found (1 warning, warning text not
  emitted by the tool in this mode, recorded as-is, not interpreted).
  Whole-src run: 46 files, no circular dependency found.
- eslint: could not run, no eslint config in the repo. Recorded, no result
  invented.
- tsc 5.9.3: `--noEmit` exit 0, no errors (see baseline gate).

## 3. Extras (Phase 3)

- Comments extra: NOT selected. No restating comments were found in
  scope: the header comments in site.ts, metadata.ts, jsonld.ts, and
  changelog.ts explain real whys (single source of truth, audit item 13
  merge behaviour, verified-facts rule, how to add an entry). Nothing to
  delete.
- Tests extra: MOOT. The blog has no test suite.
- Approval surface for the items below is this checkpoint.

## 4. Problems (Phase 4)

- P1 `src/lib/content.ts:48-55`: `readingTimeMinutes` and `wordCount`
  both compute `text.trim().split(/\s+/).filter(Boolean).length`. Copies
  of logic, hidden link: change the tokenisation in one and the other
  silently diverges.
- P2 `src/lib/content.ts:74-88` and `:97-110`: `parsePost` and
  `parseProject` extract the same seven fields (title, slug, description,
  category, tags, draft, featured) with the same String, Boolean, and
  Array checks. Copies of logic.
- P3 `src/lib/site.ts:17-32`: `nav` (4 links) is repeated verbatim as the
  first 4 entries of `footerLinks`. Hidden link: add a page to nav and the
  footer silently diverges.
- P4 `src/lib/jsonld.ts:21-27` and `:38-44`: the author object
  (`@type Person`, name, url) is inlined twice, and `"@context":
  "https://schema.org"` is repeated three times. Copies of a value.
- P5 `src/lib/search.ts:21-43`: `buildSearchIndex` maps posts and projects
  with the same 8-field object, differing only in kind, href, and date.
  Copies of logic.
- P6 `src/lib/search.ts:66-77`: `item.tags.join(" ")` and
  `item.title.toLowerCase()` are each computed twice in the scoring pass.
  Needless recomputation.
- P7 `src/lib/series.ts:62,66` [MAY BE PUBLIC API]: `getSeriesBySlug` and
  `getSeriesForPost` are exported but have no importer outside series.ts.
  Grep confirms they are used only by `getSeriesPosts` and
  `getSeriesPosition` inside the same file. They may be public API, so
  they are NOT deleted. Proposed: unexport (module-private), behaviour
  unchanged.
- P8 `src/lib/content.ts:11,26` and `src/lib/site.ts:38`
  [MAY BE PUBLIC API]: `PostFrontmatter` and `ProjectFrontmatter` are
  exported but used only inside content.ts; `SiteConfig` is used nowhere
  at all (grep across src). They may be public API, so they are NOT
  deleted. Proposed: unexport (module-private), behaviour unchanged.
  The real public types `Post` and `Project` stay exported.

Noted, not fixed:

- N1 `src/lib/jsonld.ts:66`: `jsonLdScript` is a pass-through wrapper
  around `JSON.stringify`, but all three callers live in src/app, which
  is out of scope. Kept, noted for a future wider run.
- N2: knip findings outside scope (`BUTTONDOWN_USERNAME`,
  `THEME_STORAGE_KEY`, `CalloutType` in src/components). Not touched.
- N3: `getAllPosts()` re-reads and re-parses every MDX file on each call,
  and `getPostBySlug`, `getSeriesPosts`, and the search pages call it
  repeatedly. Adding a cache would change behaviour in dev (stale
  content), so no caching is added in this run.
- N4: `getAllPosts` sorts posts by date string with localeCompare, and
  `getAllProjects` sorts by title. No change: both are the intended
  orders, not a defect.

Kept with reasons (checked, not changed):

- `priceForMarket`-style case: none in scope.
- `getSeriesBySlug` and `getSeriesForPost` are kept as functions, only
  unexported (P7). `PostFrontmatter`, `ProjectFrontmatter`, and
  `SiteConfig` are kept as types, only unexported (P8).
- File-header comments in site.ts, metadata.ts, jsonld.ts, and
  changelog.ts are kept: they explain real whys, not restatements.

## 5. Fix plan (Phase 6)

- F1 (P1): one `countWords(text)` helper in content.ts; both
  `readingTimeMinutes` and `wordCount` use it.
- F2 (P2): one `baseFrontmatter(data)` helper in content.ts returning
  the seven shared fields; `parsePost` adds date, updatedAt, author,
  readingTime, coverImage; `parseProject` adds status, repo.
- F3 (P3): `footerLinks` is derived from `nav` plus the extras (RSS,
  Changelog, GitHub, LinkedIn, Email) in site.ts.
- F4 (P4): one `personRef()` helper and one shared `@context` value in
  jsonld.ts; `websiteJsonLd` and `articleJsonLd` use them.
- F5 (P5, P6): one shared `toSearchItem` mapper in search.ts for posts
  and projects; scoring hoists `tagsJoined` and `titleLower` into locals.
- F6 (P7, P8): unexport the five items listed above (two functions, three
  types). No function or type is deleted. No caller changes needed: grep
  confirms no external importer exists for any of them.

## 6. Per-item change list (approval surface)

Code changes: F1, F2, F3, F4, F5 (all inside src/lib, 5 files:
content.ts, site.ts, jsonld.ts, search.ts, series.ts).
Visibility changes only: `getSeriesBySlug`, `getSeriesForPost`,
`PostFrontmatter`, `ProjectFrontmatter`, `SiteConfig` (unexport, not
delete). No test deletions (no test suite). No comment deletions.
No changes to src/app, src/components, or content/.

## 7. Round 2, after the Phase 8 re-check (2026-11-22)

The re-check reviewer verified all of F1-F6 correct with no behaviour
change, and found five more items. All five were fixed in this round,
still inside src/lib, still on this branch:

- R1 (site.ts): the footer extras hardcoded the GitHub URL, LinkedIn
  URL, and mailto email that duplicate `site.github`, `site.linkedin`,
  and `site.email` (the same hidden-link kind as P3, F3 fixed only
  half). Fix: one `identity` const holds the three values; both the
  site fields and the footer links read from it.
- R2 (site.ts): `SiteConfig` had zero uses anywhere once unexported, so
  it became private dead code. Decision: deleted. It was kept through
  the checkpoint out of public-API caution; the re-check proved zero
  uses, and as a now-private type it is dead code.
- R3 (content.ts): `parsePost` and `parseProject` still shared three
  lines (read file, parse with gray-matter, draft check). Fix: one
  `readMdx` helper returning the frontmatter and content, or null for
  a draft.
- R4 (jsonld.ts): `personJsonLd` still inlined `name` and `url`
  identical to the `personRef()` body. Fix: it spreads `personRef()`.
- R5 (content.ts, search.ts): `baseFrontmatter` re-spelled its seven
  shared fields and `SearchableFrontmatter` re-spelled five fields
  already on `SearchItem`. Fix: both are now `Pick<>` types over the
  interfaces they mirror.

Round 2 verification: `tsc --noEmit` exit 0, `npm run build` exit 0
with 37/37 static pages, knip shows zero unused exports or types in
src/lib (only the three out-of-scope components findings remain),
grep finds zero references to the five unexported items outside src/lib.
Final diff: 5 files, 133 insertions, 86 deletions. No second re-check
round was needed: the reviewer said no round 3 is expected after this
verification, and it was done directly.
