# Untangle metrics report, izaz-dev-blog, scope src/lib (Phase 9)

Branch: `untangle/blog-2026-11-22`
Baseline commit: `ffefaa5` (on `main`; working tree was clean, so no
separate baseline commit was created, per the skill's clean-tree rule)
Checkpoint: `CHECKPOINT.md` (Phases 0-5, plus a round 2 addendum)
Rollback: delete branch `untangle/blog-2026-11-22`; `main` untouched.
No merge, push, or deploy was done.

## Problems and fixes

| Problem | Before | Fix | After |
|---|---|---|---|
| P1 duplicated word count | `content.ts:48-55`, two copies of the tokenisation | F1: one `countWords` helper | `content.ts`, one helper, both call sites use it |
| P2 duplicated frontmatter mapping | `content.ts:74-88` and `:97-110`, same 7 fields twice | F2: one `baseFrontmatter` helper (now a `Pick<>` type, R5) | `content.ts`, one helper, both parsers spread it |
| P3 duplicated nav links | `site.ts:17-32`, nav repeated in footerLinks | F3: footerLinks derived from nav | `site.ts`, one nav list |
| P4 duplicated JSON-LD author | `jsonld.ts`, author object twice, context 3 times | F4: `personRef()` plus `SCHEMA_CONTEXT` (personJsonLd spreads it, R4) | `jsonld.ts`, one author object |
| P5 duplicated search mapping | `search.ts:21-43`, same 8-field object twice | F5: one `toSearchItem` mapper, scoring hoisted (F6) | `search.ts`, one mapper |
| P6 repeated lowercasing | `search.ts:66-77`, tags and title lowered twice | F5: hoisted into locals | `search.ts`, each lowered once |
| P7 unused exports [MAY BE PUBLIC API] | `getSeriesBySlug`, `getSeriesForPost` exported, no external importer | F6: unexported, not deleted | `series.ts`, module-private, still used internally |
| P8 unused exported types [MAY BE PUBLIC API] | `PostFrontmatter`, `ProjectFrontmatter` used only inside content.ts; `SiteConfig` used nowhere | F6: unexported, not deleted; `SiteConfig` deleted in round 2 (R2) once zero uses were proven | `content.ts`, `site.ts`, module-private |
| R1 footer extras hardcode URLs | `site.ts`, footer extras repeated github, linkedin, email | One `identity` const, site fields and footer links read from it | `site.ts`, each URL written once |
| R3 shared read lines | `content.ts`, parsePost and parseProject shared 3 lines | One `readMdx` helper | `content.ts`, one reader |
| R4 personJsonLd repeats name and url | `jsonld.ts`, 2 lines identical to personRef body | Spreads `personRef()` | `jsonld.ts`, no repeat |
| R5 type-shape duplication | `content.ts`, `search.ts`, return and helper types re-spelled fields | Both are now `Pick<>` types | `content.ts`, `search.ts` |

No function or type was deleted except `SiteConfig` (R2, zero uses,
proven by grep after it was made private). No test was deleted (no test
suite exists). No comment was deleted. No new public API was added.

## Files changed and lines

From `git diff ffefaa5 --stat` (tracked files only):

- 5 files changed, 133 insertions, 86 deletions
- `src/lib/content.ts`: 143 lines before, 160 after
- `src/lib/site.ts`: 38 before, 43 after
- `src/lib/jsonld.ts`: 68 before, 69 after
- `src/lib/search.ts`: 94 before, 118 after
- `src/lib/series.ts`: 108 before, 108 after
- Whole `src/lib` (9 files): 584 lines before, 631 after (net +47)

Honest note: lines went UP, not down. The helpers and their type
annotations cost more lines than the duplication they removed (search.ts
alone is +24, mostly the `toSearchItem` helper, its `Pick<>` type, and
the multi-line call sites). The win is structural, not fewer lines:
one word counter, one frontmatter mapper, one file reader, one search
mapper, one author object, one nav list, one identity block. The blog's
src/lib was already clean (no dead code beyond the unexports, no
wrappers in scope), so this pilot consolidates rather than shrinks.

Caps: files changed 5 of 25 allowed; re-check rounds used 1 subagent
round plus the round 2 fix pass, of 3 allowed.

## Test and build results

- Before: `npm run build` PASS, exit 0, 37/37 static pages;
  `npx tsc --noEmit` PASS, exit 0. No test script, no lint config.
- After round 1: `npx tsc --noEmit` exit 0; `npm run build` exit 0,
  37/37 static pages.
- After round 2: `npx tsc --noEmit` exit 0; `npm run build` exit 0,
  compiled successfully, 37/37 static pages.
- No test suite exists, so there is no test count to compare. Lint is
  not configured (`next lint` is deprecated), so no lint result is
  claimed.

## Static analysis after

- knip 6.47.0: zero unused exports and zero unused exported types in
  src/lib. The five in-scope findings are gone. Remaining knip findings
  are the three out-of-scope components items (`BUTTONDOWN_USERNAME`,
  `THEME_STORAGE_KEY`, `CalloutType`), untouched by design.
- madge 8.0.0 with `--extensions ts,tsx`: 9 files in src/lib, no
  circular dependency found. (First run without extensions processed 0
  files; that is not a result, and it was re-run properly.)
- eslint: could not run, no config in the repo. No result invented.
- Grep: zero references to the five unexported items outside src/lib.

## Special cases remaining (count: 0)

No special case of the kind the redesign removes remains in scope.
The EUR-style single-value `if` pattern does not occur in src/lib.

## Items approved but not done, and items kept with reasons

- N1 `jsonLdScript` (jsonld.ts:66): pass-through wrapper around
  `JSON.stringify`, kept because all three callers live in src/app,
  out of scope.
- N2: three knip findings in src/components, out of scope, not touched.
- N3: `getAllPosts()` re-reads and re-parses every MDX file on each
  call. No caching added: it would change behaviour in dev (stale
  content).
- Kept with reason: the five unexported items are kept as functions and
  types, only narrowed to module-private. `SiteConfig` is the one
  deletion, decided in round 2 after zero uses were proven.
- File-header comments in site.ts, metadata.ts, jsonld.ts, and
  changelog.ts are kept: they explain real whys, not restatements.

## Phase 8 re-check

- Round 1: subagent re-check (read-only). Verified all of F1-F6 correct
  with no behaviour change; found the five round 2 items (R1-R5 above).
  Checked and fine: the two parallel `.map` calls in buildSearchIndex
  (differ in kind, date, href; the object literal is now shared),
  `getSeriesPosition` re-reads once (N3), knip's remaining findings are
  the out-of-scope components items.
- Round 2: fixes applied directly, then re-verified with tsc, build,
  knip, and the unexport grep (all green, see above). No round 3 was
  needed.
