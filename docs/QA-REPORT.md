# QA Report: izaz.dev browser verification (Task 5)

Date: 2026-11-18. Verifier: QA subagent. Site: production build served locally on
`http://localhost:3100` (`npm run build && npm run start`, port 3100, server stopped
afterwards). Build: `npm run build` passes, 23 static pages generated, zero errors.
Playwright Chromium on this VM. Screenshots and raw results from the pass are in
`/tmp/izaz-qa/` (ephemeral; the evidence below is the durable record).

## 1. Contrast fix: primary button (the known Task 4 issue)

Problem: the home "Read the writing" button used warm-white `#FFFCF0` text on
primary. Light mode was fine, dark mode failed WCAG 2.2 AA.

| State | Before | Ratio | After | Ratio |
| --- | --- | --- | --- | --- |
| Light, resting | `#FFFCF0` on `#AF3029` | 6.23:1 | `#FFFCF0` on `#AF3029` | 6.23:1 |
| Light, hover | `#FFFCF0` on `#DE594C` | 3.62:1 (fail) | `#FFFCF0` on `#8E2620` | 8.35:1 |
| Dark, resting | `#FFFCF0` on `#DE594C` | 3.62:1 (fail) | `#100F0F` on `#DE594C` | 5.14:1 |
| Dark, hover | `#FFFCF0` on `#DE594C` | 3.62:1 (fail) | `#100F0F` on `#E86B5E` | 6.10:1 |

Fix: theme-aware button tokens added in `src/app/globals.css` (`--button-bg`,
`--button-text`, `--button-bg-hover`), exposed as `bg-button-bg`,
`text-button-text`, `hover:bg-button-bg-hover`. No palette token was changed;
the button style is the fix. The hover state in light mode was also failing
(3.62:1) and is fixed by the same change. Applied to the home button
(`src/app/page.tsx`), the 404 button (`src/app/not-found.tsx`), and the active
pagination pill (`src/components/BlogIndex.tsx`, same warm-white-on-primary
pair in dark mode). Selection colours were fixed the same way
(`--selection-bg` / `--selection-text`): light 6.23:1, dark 5.14:1.

Ratios computed with the WCAG relative luminance formula and confirmed in the
rendered dark-mode screenshot (coral button, dark ink text, clearly legible).

## 2. text-subtle audit

`text-subtle` (light 3.59:1 on paper) is used for real text in three places, so
those usages were changed to `text-muted` (light 4.97:1 on paper, 5.11:1 on
white; dark 5.11:1 on background, 4.59:1 on surface):

- `src/components/SearchPalette.tsx`: input placeholder, footer hint line.
- `src/components/BlogIndex.tsx`: search input placeholder.
- `src/components/SearchPageContent.tsx`: search input placeholder.

Left as-is: `src/components/Footer.tsx` separator slashes, which are
`aria-hidden="true"` decorative characters, not real text.

## 3. Screenshot pass: widths, console errors, overflow

Pages: home, about, blog index, article
(`/blog/writing-my-own-android-binary-xml-parser`), projects, search.
Widths: 1440, 1366, 1024, 768, 390, 360. Themes: light and dark.
Total: 72 page loads (6 pages x 6 widths x 2 themes).

Console errors: 0 on all 72 loads. Failed requests: 0 on all 72 loads.

Horizontal overflow (scrollWidth minus clientWidth):

| Width | Before fix | After fix |
| --- | --- | --- |
| 1440, 1366, 1024, 768 | 0 on every page, both themes | 0 |
| 390 | 166px on every page, both themes | 0 |
| 360 | 196px on every page, both themes | 0 |

Re-check after the fix: 36 combinations (6 pages x 3 widths x 2 themes at 390,
360, 768), all 0 overflow and 0 console errors.

Overflow cause and fix: the footer link line (`izaz.dev / About / Writing /
Projects / Search / GitHub / LinkedIn / Email`) was one unbreakable inline run
(JSX puts no whitespace between the link elements, so the browser had no line
break opportunity), measuring 556px wide on every page. Fixed in
`src/components/Footer.tsx` by making the line a wrapping flex row
(`flex flex-wrap items-baseline justify-center`), keeping each `/` separator
attached to its link.

## 4. Visual checks (every screenshot viewed)

- Home, light and dark at 1440: hero proportions good, eyebrow, large name
  heading, two intro paragraphs, pill button plus underlined "About me" link,
  "Selected writing" rows, "Topics" links. No dead band, no clipping.
- Article, light and dark at 1440: breadcrumb, category, large title, subtitle,
  author/date/reading time, in-flow "On this page" box, 720px reading column.
  Code blocks are dark surfaces with multicolour highlighting in both themes;
  the reference's pale-on-light defect is not present. Inline code chips are
  legible in both themes.
- About at 1440: centred "About Me", neutral "IH" portrait placeholder with
  the "A portrait will go here." label, verified-facts paragraphs.
- Blog index at 1440: year-grouped rows, search input, category and tag
  selects, "Showing N of N articles" line. Filter labels measured at 1440,
  1366, 1024, 768: "Category" and "Tag" render fully, not clipped.
- Projects at 1440: editorial rows with status on the right, no cards.
- Search at 1440: input, hint line, "10 pages indexed" empty state.
- Mobile nav at 390: hamburger opens a clean stacked menu (About, Writing,
  Projects, Search); theme toggle stays visible. Mobile home at 390 and 360,
  light and dark: hero, button, and rows all fit, no overflow after the fix.
- Particles: sparse grey dots plus a few red, no connecting lines, no
  distraction, in both themes.
- Reduced motion: emulated `prefers-reduced-motion` at 1440, light and dark.
  Hero heading visible (opacity 1), particles canvas present with static dots,
  nothing hidden. Confirmed by computed style and screenshot.

## 5. Functional checks (all passed)

- Theme toggle persists: light to dark on click, `localStorage`
  `izaz-dev-theme` stores `dark`, still dark after reload.
- Ctrl+K: opens the search palette; typing "parser" returns the AXML parser
  article and the APK Security Pipeline project; Enter navigates to the
  article page.
- Copy button: 3 code blocks on the AXML article, each with a Copy button.
  With clipboard permission granted, clicking flips the label to "Copied" and
  the clipboard contains the code text (verified: starts with the
  attributeStart comment). Note: without clipboard permission the browser
  denies clipboard access and the label stays "Copy"; that is a browser
  permission outcome, not a site bug.
- Blog filters: searching "powershell" gives "Showing 1 of 1 article";
  category "Android Security" gives "Showing 1 of 1 article".
- Topic links: home topic link `/blog?topic=Offensive%20Security` lands on the
  blog index showing "Topic: Offensive Security (4 articles)".
- Internal links: 33 internal links crawled across all pages (including
  `/blog?tag=...` and `/blog?topic=...` variants, project pages, disclosure,
  privacy); 0 broken (all return under 400).
- SEO routes: `/sitemap.xml` 200, `/robots.txt` 200, `/rss` 200.

## 6. Unslop pass

Direction: product is a personal cybersecurity and engineering blog for one
author; character is restrained, editorial, warm; world is warm paper, ink,
and one red accent; moments are the dark code blocks and the "$ izaz" brand
mark; signature is the small solid red cursor block after the brand.

Audit against `references/signs.md` (full list checked):

- Surfaces and colour: no gradients (only comments saying so), no glows, no
  colour washes, no glass, hairline borders, three text roles, one accent.
  Pass.
- Type: Space Grotesk bold headings and mono uppercase labels are the
  reference editorial style the master prompt mandates; the plan's rulings
  keep the eyebrow and the three fonts, so these are deliberate brand choices,
  not fails. No negative tracking on small text, no italic emphasis. Pass.
- Icons: lucide only, no emoji anywhere in `src/`. Pass.
- Spacing: arbitrary values found are only plan-specified container widths
  (720, 760, 1140, 1200px) and the palette max height; all other spacing is on
  the 4px scale. Pass.
- Copy: no exclamation marks, no greeting headline, no hype words in UI copy
  ("unlocks" in the PenTrix article describes scenario stages literally).
  Pass.
- Components: the pill button is plan-specified; pagination pills match it.
  No badges, no glowing counts, no stat cards, no charts. Pass.
- Hero: left-aligned, one primary plus one secondary action, no floating
  blobs, no parallax. Pass.
- Motion: no `animate-pulse`, `animate-ping`, `hover:scale`, or
  `transition-all` in `src/`. Pass.

Fails found and fixed by this pass:

1. Code block language label leaked the highlighter class: every code block
   showed "hljs language-python" (and similar) instead of the language.
   Cause: rehype-highlight adds an `hljs` class to the `code` element, and
   `src/components/MdxContent.tsx` stripped only a leading `language-`.
   Fix: pick the `language-*` token out of the class list. Verified after
   rebuild on all five articles: labels are now `bash`, `python`, `text`
   (PenTrix: bash, bash, bash, text; AXML: python, bash, bash; Academy:
   text, bash, bash, bash, bash; AgentArsenal: six bash; 90 Days: no code
   blocks).
2. Footer overflow at 390/360 (see section 3).
3. Button contrast (see section 1).
4. `text-subtle` on real text (see section 2).

No other unslop fails. No design changes were made beyond these fixes; the
palette, type, layout, and content are unchanged.

## 7. Banned-item grep audit

Command: `grep -rInE $'\u2014|269/269|16\.40/20|Howest|university|lecturer|professor|stormbreaker|CVE-' src/ content/` (the first alternative is the em dash character, written as a Unicode escape so this file contains no literal em dash)

Result: zero hits in `src/` and `content/`. The same pattern over `docs/`
matches only `docs/PLAN.md` (5 lines), where the plan itself names the banned
items as rules; that is the binding plan, not site content. No em dash
character anywhere in `src/`, `content/`, or `docs/`. Email used on the site
is `mizazhaiderceh@gmail.com` only (`src/lib/site.ts`).

## 8. Fixes made in this task (summary)

1. `src/app/globals.css`: theme-aware button tokens (`--button-bg`,
   `--button-text`, `--button-bg-hover`) and selection tokens; placeholders
   and hint text moved from `text-subtle` to `text-muted` in the components
   below.
2. `src/app/page.tsx`, `src/app/not-found.tsx`: primary buttons use the
   button tokens.
3. `src/components/BlogIndex.tsx`: active pagination pill uses the button
   tokens; search placeholder uses `text-muted`.
4. `src/components/SearchPalette.tsx`, `src/components/SearchPageContent.tsx`:
   placeholders and the palette hint line use `text-muted`.
5. `src/components/Footer.tsx`: footer link line wraps (flex, wrap).
6. `src/components/MdxContent.tsx`: code language parsed from the class list,
   so labels show `python`, `bash`, `text` instead of `hljs language-...`.

No design tokens were changed, no article MDX body was changed, no verified
fact was changed. Files changed: 8, 36 insertions, 12 deletions.

## 9. What was not checked

- The live domain `https://izaz.dev` is not live and was not checked; all
  checks are against the local production build.
- The PowerShell Academy live URL claim was not re-verified (out of scope for
  Task 5; noted in `docs/CONTENT.md`).
- Clipboard copy was verified with clipboard permission granted in Playwright;
  a real browser grants it on user gesture, so this matches real use.
- Screenshots in `/tmp/izaz-qa/` are ephemeral and will not persist with the
  repo; this report is the durable evidence.

## 10. Reduced-motion pass (audit item 22)

Date: 2026-11-20. Scope: `prefers-reduced-motion` handling across the site.

### 10.1 Defect found and fixed

`src/app/globals.css` contained the global hack the audit forbids: a
`prefers-reduced-motion: reduce` block setting `animation-duration: 0.01ms
!important`, `animation-iteration-count: 1 !important`, and
`transition-duration: 0.01ms !important` on `*`, `*::before`, and `*::after`.
Per the modern-web-guidance `motion` guide, a near-zero global duration can
make animations more jarring, so it was removed. Replaced with narrow,
case-by-case handling: `scroll-behavior: auto` on `html` under reduced
motion, and `animation: none` plus `display: none` on `.reading-progress`
(the site's only CSS animation). No `!important` remains in the
reduced-motion rules. The unlayered `scroll-behavior: auto` rule wins over
the `scroll-behavior: smooth` rule inside `@layer base` without it.

### 10.2 Motion inventory (full grep of `src/`)

- Particles canvas (`src/components/Particles.tsx`): the only JavaScript
  motion. Verified in source: under reduced motion it draws the dots once
  and never starts the animation loop; otherwise it pauses when the page
  is hidden (`visibilitychange`) and when the canvas scrolls out of view
  (`IntersectionObserver`, threshold 0). No code change needed.
- Reading progress bar (`src/components/ReadingProgress.tsx`,
  `src/app/globals.css`): CSS scroll-driven animation
  (`animation-timeline: scroll()`) plus a JavaScript fallback that sets
  `transform: scaleX(...)`. Under reduced motion the bar is hidden
  (`display: none`) and its animation is set to `none`, so the fallback
  transform has nothing visible to move. The bar is decorative
  (`aria-hidden="true"`), so hiding it removes no content.
- Smooth scrolling: `scroll-behavior: smooth` on `html` only. The search
  palette `scrollIntoView({ block: "nearest" })` sets no behaviour, so it
  follows the CSS value and becomes instant under reduced motion.
- Transitions: every `transition-*` in `src/` is `transition-colors`
  (colour-only hover and focus feedback). Per the `motion` guide these stay
  enabled; only spatial movement, scaling, rotation, or persistent
  animations are disabled. No element is scaled, translated, or rotated.
- No parallax, no keyframes other than `reading-progress-grow`, no
  `animate-pulse`, `animate-ping`, or `transition-all` in `src/`.
- Content never hidden: no element starts at `opacity: 0` or depends on an
  animation reaching its end state, so turning motion off cannot leave
  content invisible. (Earlier QA, section 4, confirmed the hero heading
  renders at opacity 1 with reduced motion emulated.)

### 10.3 Reduced-motion checklist (run on every future QA pass)

1. Emulate `prefers-reduced-motion: reduce` in the browser (DevTools
   rendering tab) at desktop and mobile widths, light and dark themes.
2. Confirm the hero heading and all page content are visible (opacity 1,
   nothing left at an intermediate state).
3. Confirm the particles canvas shows static dots and the dots never move
   (watch for at least 5 seconds).
4. Confirm the reading progress bar does not appear on article pages.
5. Confirm anchor and Table of Contents jumps are instant, with no smooth
   scrolling.
6. Confirm hover and focus colour changes still work (links, buttons,
   theme toggle); reduced motion must not remove focus indicators.
7. Scroll the article page, switch tabs, and scroll the canvas out of view;
   confirm no animation resumes while reduced motion is on.
8. Grep `src/` for `animation`, `@keyframes`, `transition-`,
   `requestAnimationFrame`, and `parallax` after any new feature lands;
   any new motion must be added to the inventory above with its
   reduced-motion handling.
9. Never reintroduce a global `animation-duration: 0.01ms` rule; handle
   each new animation case by case, in its own rule.
