# Untangle metrics, pilot 2: src/components

Branch: `untangle/blog-components-2026-11-22`
Baseline commit (master): `8a12811` ("Refactor src/lib: deduplicate helpers, untangle-codebase pilot")
Scope: `src/components` only, 19 files, 1919 lines before, 1951 lines after.
Caps: 25 files changed (used 9: 7 edited, 1 new, plus this report and the
checkpoint), 3 re-check rounds (used 1 manual round).
Re-check: MANUAL, not subagent. Subagents cannot be spawned in this run
(depth limit), so the Phase 8 re-check was done directly with the same
checks (knip, madge, grep for stale references, build plus typecheck gate).
No test suite exists in this repo; the build plus typecheck is the gate,
stated explicitly.

## Gate results, before and after

| Check | Before (master 8a12811) | After (branch) |
| --- | --- | --- |
| `npx tsc --noEmit` | exit 0 | exit 0 |
| `npm run build` | exit 0 | exit 0 |
| knip | exit 1, 3 findings | exit 0, 0 findings |
| madge `--circular --extensions ts,tsx src/` | no circular dependencies (46 files) | no circular dependencies (47 files) |
| `npm run lint` | unavailable, `next lint` deprecated, no ESLint config (tool failure, not a clean result) | same, not re-run, nothing to lint differently |

## Problems and fixes

1. `NewsletterSignup.tsx:14` `BUTTONDOWN_USERNAME` exported, zero external
   uses (grep). Fix: unexported in place. Lines 76 before, 76 after.
2. `ThemeProvider.tsx:15` `THEME_STORAGE_KEY` exported, zero external
   uses (grep). Fix: unexported in place, plus a comment noting the same
   key string is hardcoded in `src/app/layout.tsx:41` (pre-paint script,
   must stay self-contained) and in privacy page prose. Lines 106 before,
   113 after (comment plus `parseStoredTheme` helper).
3. `Callout.tsx:13` `CalloutType` exported, zero external uses (grep over
   `src/` and `content/`). Fix: unexported in place. Lines 59 before,
   59 after.
4. `FeedbackBox.tsx:12` `LIVE_SITE_URL` duplicated `site.url`
   (`src/lib/site.ts:30`). Fix: import `site` from `@/lib/site`, use
   `site.url`, local constant removed. Lines 105 before, 105 after.
5. `BlogIndex.tsx:48-49` and `:57-59` haystack built twice with different
   treatment. Fix: one `postHaystack(post, strip)` helper; the topic
   branch passes `strip=false` so it keeps raw content exactly as before,
   the search branch keeps stripped content. No behaviour change. Lines
   245 before, 248 after.
6. `ThemeProvider.tsx:42-44` and `:69-71` stored-value check written
   twice. Fix: one `parseStoredTheme(value)` helper. Lines included in
   item 2 count.
7. `CodeBlock.tsx` and `ShareButtons.tsx` copy-to-clipboard pattern
   written twice; CodeBlock had no unmount timer cleanup. Fix: one shared
   `useCopyFeedback` hook, new file `src/components/useCopyFeedback.ts`
   (44 lines), used by both. CodeBlock 92 before, 88 after. ShareButtons
   98 before, 80 after. Labels, timing (2 seconds), and failure behaviour
   unchanged.
8. `Particles.tsx` double `matchMedia` evaluation. NOT FIXED. A first
   version evaluated it once, but that would ignore a mid-session OS
   preference toggle until remount, which is a behaviour change. Left as
   is, documented in the checkpoint.

## Diff

Tracked files: 7 changed, 35 insertions, 47 deletions (`git diff --stat`).
New file: `src/components/useCopyFeedback.ts`, 44 lines.
Scope total: 1919 lines before, 1951 lines after (net +32, the hook file
accounts for +44, the edits themselves remove 12 lines).

| File | Before | After |
| --- | --- | --- |
| BlogIndex.tsx | 245 | 248 |
| Callout.tsx | 59 | 59 |
| CodeBlock.tsx | 92 | 88 |
| FeedbackBox.tsx | 105 | 105 |
| NewsletterSignup.tsx | 76 | 76 |
| ShareButtons.tsx | 98 | 80 |
| ThemeProvider.tsx | 106 | 113 |
| useCopyFeedback.ts (new) | 0 | 44 |

## Special cases remaining

Count: 1. The Particles double `matchMedia` evaluation (item 8 above),
kept deliberately to preserve mid-session preference behaviour.

## Items approved but not done

- None. Every fix in the checkpoint was applied except item 8, which is
  listed above as kept with its reason, not as approved-but-undone.

## Items kept with reasons

- SearchPageContent vs SearchPalette result rows: different interaction
  models (page list of Links vs combobox listbox), merging would need
  caller-vocabulary props.
- Header desktop and mobile nav: different layouts by design, data
  already single-sourced from `site.nav`.
- MdxContent `as unknown as ComponentType` casts: required by MDXRemote
  typing.
- `ISSUE_NEW_URL` in FeedbackBox: no counterpart in `src/lib`, stays
  local config.
- `layout.tsx:41` pre-paint script duplication of "izaz-dev-theme":
  cannot be removed from this scope, documented with a comment.
- Comments extra: not selected. The comments in scope explain why or
  outside-code facts; the restating candidates are listed in the
  checkpoint as kept.
- Tests extra: not applicable, no test suite exists.

## Deletions

No file, test, comment, or export was deleted. The three knip items were
unexported, not deleted. One constant (`LIVE_SITE_URL`) was removed and
replaced by `site.url`, its single source.

## Rollback

Delete the branch `untangle/blog-components-2026-11-22`; master is
untouched until the merge below.
