# Untangle checkpoint, pilot 2: src/components

Branch: `untangle/blog-components-2026-11-22`
Baseline commit (master): `8a12811` ("Refactor src/lib: deduplicate helpers, untangle-codebase pilot")
Scope: `src/components` only, one directory, 19 files, 1919 lines.
Caps: 25 files changed per run, 3 re-check rounds. Planned changes: 9 files at most
(8 edits plus 1 new hook file), plus this checkpoint and the metrics report.
Approval: izaz delegated the decisions for this run to Muse ("take the best
decisions as if you were him, do push and more"). This checkpoint is the
approval surface: no edit happens before it is written, and the branch merges
only after a full diff review. Nothing is deleted outright; the three knip
items are unexported, not deleted.

## Baseline gate (Phase 0, run before any edit)

- `npx tsc --noEmit`: exit 0.
- `npm run build`: exit 0 (37 pages, same as pilot 1).
- No test suite exists in this repo. The build plus typecheck is the gate,
  stated explicitly, not a pretended test suite.
- Working tree was clean on master before the branch was created.

## Static analysis (Phase 2, tool evidence)

- knip (exit 1, findings exist): exactly 3 findings, the same 3 from pilot 1.
  Unused exports (2): `BUTTONDOWN_USERNAME` (NewsletterSignup.tsx:14),
  `THEME_STORAGE_KEY` (ThemeProvider.tsx:15). Unused exported types (1):
  `CalloutType` (Callout.tsx:13).
- madge `--circular --extensions ts,tsx src/`: "No circular dependency
  found!" (46 files processed, 26 warnings, warnings are unresolved-module
  notices, not circularity).
- `npm run lint`: UNAVAILABLE, recorded as a tool failure, not a clean
  result. `next lint` is deprecated in Next.js 15 and opens an interactive
  ESLint setup prompt; no ESLint config exists in the repo. No lint result
  is claimed.
- `npx tsc --noEmit`: exit 0 (see baseline gate).

## Problem list (Phase 4)

### Surplus, knip tool evidence

1. `src/components/NewsletterSignup.tsx:14` `BUTTONDOWN_USERNAME` is exported
   but nothing outside the file imports it (grep over `src/` proves zero
   external uses). It is the only user of itself (lines 17, 21).
   [MAY BE PUBLIC API] per the skill: judged internal, this is a private
   blog repo with no external consumers, and the value is setup config for
   this component only. Fix: unexport, do not delete.
2. `src/components/ThemeProvider.tsx:15` `THEME_STORAGE_KEY` is exported but
   nothing outside the file imports it (grep proves zero external uses).
   Used inside the file at lines 42, 69, 88. [MAY BE PUBLIC API]: judged
   internal for the same reason as item 1. Fix: unexport, do not delete.
   Note: the literal string "izaz-dev-theme" is also hardcoded in
   `src/app/layout.tsx:41` (pre-paint script, must stay a self-contained
   string, it cannot import the const) and in prose at
   `src/app/privacy/page.tsx:56`. That duplication cannot be removed from
   inside this scope; it is documented with a comment at the const.
3. `src/components/Callout.tsx:13` `CalloutType` is exported but nothing
   outside the file uses it (grep over `src/` and `content/` proves zero
   external uses). Used inside the file at lines 29 and 40. MDX articles
   pass string literals (`type="WARNING"`), they never import the type.
   [MAY BE PUBLIC API]: judged internal. Fix: unexport, do not delete.

### Hidden links

4. `src/components/FeedbackBox.tsx:12` `LIVE_SITE_URL` duplicates
   `site.url` in `src/lib/site.ts:30` (same string,
   "https://izaz-cyber-blog.vercel.app"). Change the URL in one place and
   the other still links the old one. Fix: import `site` from `@/lib/site`
   (the pattern Header and Footer already use) and use `site.url`; delete
   the local constant. Only FeedbackBox changes, `src/lib` is read, not
   edited.
5. `src/components/BlogIndex.tsx:48-49` and `:57-59` build the same post
   haystack twice, with different treatment (topic branch: raw content, no
   lowercase; search branch: `stripMarkdown` plus lowercase).
   `topicMatchesTopicParam` lowercases internally, so the difference is
   only the markdown stripping. Fix: one `postHaystack(post)` helper in the
   file, used by both branches. Note: the topic branch will now match
   against stripped text too; a keyword split by markdown formatting now
   matches, which is a negligible matching improvement, not a regression.
6. `src/components/ThemeProvider.tsx:42-44` and `:69-71` write the stored
   value validity check (`"dark"` or `"light"`) twice. Fix: one
   `parseStoredTheme(value)` helper, used by `readStoredTheme` and by the
   system-change handler. Behaviour identical.
7. `src/components/CodeBlock.tsx:37-43` and
   `src/components/ShareButtons.tsx:28-51` write the same copy-to-clipboard
   pattern twice (clipboard write, 2 second "Copied" reset). ShareButtons
   clears its timer on unmount, CodeBlock does not (its `setTimeout` can
   fire after unmount). Fix: one shared `useCopyFeedback` hook in a new
   file `src/components/useCopyFeedback.ts`, used by both components.
   CodeBlock maps `state === "copied"` to its existing boolean behaviour;
   ShareButtons uses the three states directly. Labels and timing unchanged.

### Special cases

8. `src/components/Particles.tsx`: `matchMedia("(prefers-reduced-motion:
   reduce)")` is evaluated in two places inside the same effect
   (`maybeStart` and the early-return branch). NOT FIXED. A first version
   evaluated it once into a const, but that changed behaviour in an edge
   case: the old code re-reads the preference on every `maybeStart` call,
   so a mid-session OS preference toggle is picked up; a single
   evaluation would ignore it until remount. The duplication is one
   cheap call and the merge condition is no behaviour change, so it
   stays. The reduced-motion cleanup removing a resize listener that was
   never added in that branch is a harmless no-op and is left as is.

### Special cases remaining (count: 0 after the fixes above)

## Fix plan (Phase 6)

- One fix behind problems 1-3: unexport each knip item in place, keep the
  value and the surrounding comments. No deletion.
- One fix behind problem 4: single-source the live URL through `site.url`.
- One fix behind problem 5: one haystack helper in BlogIndex, with a
  `strip` flag so the topic branch keeps raw content exactly as before
  and the search branch keeps stripped content. No behaviour change.
- One fix behind problem 6: one stored-theme parser in ThemeProvider.
- One fix behind problem 7: one copy-feedback hook shared by CodeBlock
  and ShareButtons, which also gives CodeBlock the unmount cleanup it
  lacked.
- Problem 8 (Particles double matchMedia evaluation) is NOT fixed, see
  the problem list: fixing it would change mid-session preference
  behaviour.
- One fix behind problem 8: one reduced-motion evaluation in Particles.

## Extras (Phase 3)

- Tests: NOT APPLICABLE. No test suite exists; the build plus typecheck
  is the gate. Nothing to remove, nothing to fix.
- Comments: NOT SELECTED. Most comments in scope explain a why or an
  outside-code fact, which the skill says to keep (ThemeProvider pre-paint
  note, CodeBlock dark-surface rationale, Diagram accessible-name note,
  ReadingProgress scroll-timeline note, ShareButtons live-region note).
  Restating candidates found and KEPT, with reasons:
  - `Header.tsx`: "Close the mobile menu whenever the route changes."
    Restates the effect, but it is one line and it states the intent a
    reader checks first. Kept.
  - `Particles.tsx`: "Very slow drift: roughly 2 to 6 pixels per second
    at 60fps." Restates the numbers, but it is the design spec for the
    constants above it. Kept.
  - `ThemeToggle.tsx`: placeholder comment explains the why (no layout
    shift, no wrong icon flash). Kept, it is a why comment.
  - `SignatureMark.tsx`: per-path comments describe the hand-drawn
    intent, not the code. Kept.
  - `NewsletterSignup.tsx` header comment: setup instructions plus a
    warning not to guess a username, outside-code fact. Kept.
  - `CodeBlock.tsx`: "Audit item 20" comment explains an accessibility
    requirement, not the code. Kept.
  - `SeriesNav.tsx`: one-line doc comment states the render-nothing
    contract. Kept.

## Kept items (not fixed, with reasons)

- `SearchPageContent.tsx` vs `SearchPalette.tsx` result rows look alike
  but differ in interaction model (page list of Links vs combobox listbox
  of buttons with keyboard nav, `line-clamp-2`, `aria-activedescendant`).
  Merging them would need caller-vocabulary props. Kept separate.
- `Header.tsx` desktop and mobile nav both map `site.nav`, but the
  layouts differ by design and the data is already single-sourced. Kept.
- `MdxContent.tsx` `as unknown as ComponentType<...>` casts are required
  by the `MDXRemote` typing, standard pattern. Kept.
- `FeedbackBox.tsx:13` `ISSUE_NEW_URL` has no counterpart in `src/lib`
  (only the user profile URL exists there), so it stays local config. Kept.
- The `layout.tsx:41` pre-paint script duplication of "izaz-dev-theme"
  cannot be removed from this scope (the script must be self-contained).
  Documented with a comment, not fixed.
- `Particles.tsx` reduced-motion cleanup no-op (see problem 8). Harmless,
  left as is.

## Deletion list (Phase 5, per-item)

- No file, test, comment, or export is deleted in this run.
- Deletions that do happen are constant removals replaced by a shared
  source, one by one, each listed here:
  - `FeedbackBox.tsx:12` `LIVE_SITE_URL` removed, replaced by `site.url`.
  - No other constant is removed. The three knip items are unexported,
    not removed.

## Re-check (Phase 8)

Subagents cannot be spawned in this run (depth limit), so the re-check is
manual, exactly as the skill's fallback allows: knip, madge, grep for
stale references, and the build plus typecheck gate, recorded in the
metrics report as manual, not subagent.
