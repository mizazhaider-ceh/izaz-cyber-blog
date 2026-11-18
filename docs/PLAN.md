# izaz.dev Personal Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Muhammad Izaz Haider's personal cybersecurity, technology and engineering blog (brand izaz.dev) as a production-quality Next.js site, in the restrained editorial philosophy of the reference blog, with real content only.

**Architecture:** Next.js App Router + TypeScript strict + React + Tailwind CSS + MDX content (gray-matter + next-mdx-remote, remark-gfm, rehype-highlight). Content lives in content/blog/ and content/projects/, independent of UI. Client-side search index built from the same MDX data. Theme via data-theme attribute with a pre-paint script, localStorage persistence.

**Tech Stack:** Node v24.22.1, npm 10.9.4, Next.js 15 App Router, TypeScript strict, Tailwind CSS, MDX, next/font (Space Grotesk, Instrument Sans, JetBrains Mono), Lucide icons.

**Spec:** The master build prompt in the parent conversation (binding). Reference study findings are summarised in docs/SOURCE-RECORD.md (to be written by the content agent). This plan argues from the master prompt; where a skill's generic rule conflicts with the master prompt, the master prompt wins (see Rulings).

## Global Constraints

- NEVER use em dashes in any file or reply (commas, colons, parentheses instead).
- Exact palette, light: --background #FFFCF0, --background-pure #FFFFFF, --surface #F2F0E5, --surface-alt #FAFAFA, --surface-border #E6E4D9, --border #DAD8CE, --text-primary #100F0F, --text-secondary #222222, --text-muted #6F6E69, --text-subtle #878580, --primary #AF3029, --primary-hover #DE594C, --secondary #205EA6, --success #66800B, --warning #AD8301, --research #5E409D. Dark: --background #100F0F, --background-alt #070708, --surface #1C1B1A, --surface-alt #282726, --border #403E3C, --text-primary #FFFCF0, --text-secondary #CECDC3, --text-muted #85847F, --primary #DE594C, --secondary #4385BE, --success #879A39, --warning #D0A215. Red is an accent, never a background.
- Fonts: Space Grotesk headings, Instrument Sans body, JetBrains Mono code, via next/font with system fallbacks.
- Spacing scale only: 4, 8, 12, 16, 20, 24, 32, 48, 64, 80, 96, 120px. Radii: 4, 8, 10, 12px. Container max 1200px, homepage ~1140px, article reading width 720-760px, about 720px.
- Brand mark: "$ izaz" with a small solid red cursor block. Tagline: "Exploring technology. Understanding security. Building what matters."
- No Howest, university, course code, lecturer, or professor mention anywhere on the public site.
- No 269/269 figure or any test-pass counts. No 16.40/20 GPA anywhere (GPA only 16.74/20 weighted or 16.58/20 unweighted, and only where relevant).
- No bounty program names, report titles, IDs, endpoints, or reward amounts. Vulnerability categories only.
- Never disclose PenTrix flag storage. Approved sentence only: flags are randomly generated per install at first boot, no flag literal exists in any tracked file, only genuine exploits earn flags.
- Document email is always mizazhaiderceh@gmail.com, never stormbreaker9080.
- Credit "Created by Muhammad Izaz Haider" on About only.
- REAL CONTENT ONLY. Never invent qualifications, job titles, achievements, certifications, vulnerability discoveries, awards, employment history, CVE numbers, severity assessments, vendor acknowledgements, bug bounty rewards, research results, or publication statistics. Drafts must not be publicly accessible.
- No fake statistics, testimonials, comments, credentials, stock photos, Matrix rain, gradients, glassmorphism, purple-to-blue anything, three-card layouts, decorative badges. Whitespace is intentional.
- About page uses a neutral intentional portrait placeholder (do NOT publish ~/workspace/profile-images/user-profile-reference.jpg without izaz's say-so). No generated hacker avatar.
- No newsletter backend: omit the form or label it future-ready, never fake a subscription.
- Code blocks must be readable in both themes with real syntax highlighting (the reference's pale-grey-on-light-grey code is a known defect to avoid). Copy button on every code block.
- Particles: original canvas implementation, small sparse grey dots plus a few red, very slow movement, no connecting lines, no gradients, no mouse following, pauses when hidden, respects prefers-reduced-motion, static fallback.
- No GitHub repo, no deploy, no push. Local build only.

## Rulings (master prompt wins over generic skill defaults)

- Ruling: three fonts per the master prompt, not the landing-page-design "one typeface" rule.
- Ruling: no gradients anywhere, including the landing-page-design hero heading gradient (B5). Headings are solid text-primary.
- Ruling: the master prompt's eyebrow line stays, despite hallmark's no-eyebrow floor rule (the prompt is the binding spec and the reference uses the same eyebrow).
- Ruling: no tagline-reveal section (landing-page-design B11) and no FAQ/proof/testimonial sections; the master prompt's anti-slop rules forbid filler sections.
- Ruling: nav is the reference's minimal nav (brand left; About, Writing, theme toggle right), not the landing-page-design floating nav.
- Ruling: Research and Labs routes are OUT of v1 (not enough verified content to justify them). Projects route is IN (real repos exist). /disclosure and /privacy are IN as short honest pages.

## Review Focus

- A code block that renders pale text on a light background in either theme (the reference's exact defect) would ship unreadable code; every code block must be checked in both themes.
- A search that matches only titles would miss body content; search must cover titles, descriptions, body, categories, tags.
- A theme toggle that flashes the wrong theme on load or does not persist would break the first impression; the pre-paint script must run before first paint and localStorage must persist.
- An article date that is not the real build date, or a claim not in a repo README, would be invented content; every date and claim must trace to a real repo or the verified facts list.
- A mobile layout that overflows at 360px would fail the prompt's explicit 360px check; every page must be checked at 360px.

---

### Task 1: Scaffold and design system

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts` (or Tailwind v4 CSS-first setup), `src/app/globals.css`, `src/app/layout.tsx`, `src/lib/site.ts` (brand config, single file), `src/components/ThemeProvider.tsx`, `src/components/Particles.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/ThemeToggle.tsx`, `public/favicon.svg`, `README.md`, `docs/ARCHITECTURE.md`
- Test: `npm run build` passes, `npx tsc --noEmit` clean

**Interfaces:**
- Consumes: nothing (fresh project, no existing code; confirm and record this in ARCHITECTURE.md)
- Produces: design tokens in globals.css (exact palette above, light default, [data-theme="dark"] block), fonts via next/font, `site` config (name "Izaz Haider", brand "izaz.dev", tagline, email mizazhaiderceh@gmail.com, GitHub https://github.com/mizazhaider-ceh, LinkedIn https://www.linkedin.com/in/muhammad-izaz-haider-091639314/), Header/Footer components, Particles canvas, ThemeProvider with pre-paint inline script in layout.tsx

- [ ] **Step 1: Scaffold Next.js App Router + TypeScript strict + Tailwind, install gray-matter, next-mdx-remote, remark-gfm, rehype-highlight, lucide-react**
- [ ] **Step 2: Write globals.css with the exact token values above, spacing and radius tokens, focus-visible styles, selection colour, reduced-motion rules**
- [ ] **Step 3: Write layout.tsx with next/font fonts, pre-paint theme script (reads localStorage `izaz-dev-theme`, defaults to light, sets data-theme before paint), metadata base, skip link, Header, Footer, Particles**
- [ ] **Step 4: Write Header (sticky ~65px, hairline bottom border, brand "$ izaz" with red cursor block, links About, Writing, Projects, Search, theme toggle) and Footer (two centred small monospace lines: brand/links line and copyright line)**
- [ ] **Step 5: Write Particles canvas (sparse grey dots, a few red, very slow drift, requestAnimationFrame, IntersectionObserver + visibilitychange pause, prefers-reduced-motion renders static dots once, no lines, no gradients)**
- [ ] **Step 6: Write README.md (best-in-class, never scaffold-generic: what the site is, stack, how to run, how to publish an article, content rules, design tokens) and docs/ARCHITECTURE.md (fresh start, stack choice, file map, theme system, content pipeline, search design)**
- [ ] **Step 7: Run `npm run build` and `npx tsc --noEmit`; Expected: both pass, zero errors**
- [ ] **Step 8: Commit locally (git init, first commit "Scaffold izaz.dev blog with design system")**

### Task 2: Real content (MDX articles, About copy, Projects data, source records)

**Files:**
- Create: `content/blog/*.mdx` (4 or 5 articles), `content/projects/*.mdx` (one per real repo), `src/lib/content.ts` (frontmatter type + loader + reading-time computation + draft filter), `docs/CONTENT.md`, `docs/SOURCE-RECORD.md`
- Test: `npm run build` passes with all MDX rendering; grep audit for banned items returns zero

**Interfaces:**
- Consumes: design tokens and layout from Task 1 (no code changes, content files only)
- Produces: MDX files with frontmatter `{title, slug, description, date, updatedAt?, category, tags, author: "Muhammad Izaz Haider", readingTime (computed from word count at 200 wpm), coverImage?, draft: false, featured: boolean}`; content.ts exports `getAllPosts()`, `getPostBySlug(slug)`, `getAllProjects()`, `getProjectBySlug(slug)`, all excluding draft: true; docs/CONTENT.md and docs/SOURCE-RECORD.md

Verified facts the articles may use (only these, plus what is in the repo READMEs in ~/workspace/): CNSP with Merit; CSCB 2026 #1 Web Junior, #3 overall Junior, #3 Howestian, #26 of 806, 26 flags; Damno Solutions, Junior DevSecOps and AI Security Engineer, part-time Nov 2025-Jun 2026, remote, delivered 13 vulns, fixed 2 critical (RCE, SQLi); YesWeHack Bug Bounty Hunter, part-time Feb 2026-present; first year 60/60 credits, first attempt, no retakes; studied eJPT and eWPT via INE, does not yet hold either certificate. Repo facts: PenTrix-VulnLab (Express + SQLite, 201 challenges across 29 modules, v1.1.1, flags rule above); APK Security Pipeline (pure-stdlib Python CLI, own binary AXML parser and writer, deep mode apktool/jadx/androguard, 4 Frida scripts, scoring 100 minus critical 25 / high 15 / medium 7 / low 3, exit codes 0 clean / 2 findings / 1 clean error, 64 tests at v2.1.0, attributeStart bug found by izaz on his Windows clone on a graded APK and fixed, verified against androguard); PowerShell Academy (18 chapters, 61 lessons, 102 commands, 48 glossary terms, structured TypeScript content plus one generic lesson renderer, plain CSS, no command execution in the browser, live at powershell-academy-seven.vercel.app); AgentArsenal (353 top skills + 290 sub-skills = 643 files, 29 domains, 36 agents); 90DaysOfCyberSecurity (exactly 90 daily tasks in 10 phases plus career track).

Article seeds (4 or 5, each an honest first-person write-up of his actual build, real commands and code from the repos, dates = real build dates Oct-Nov 2026):
1. PenTrix-VulnLab: building a deliberately vulnerable lab (2026-10-20)
2. Writing my own Android binary XML parser, and the one-line bug that broke it (2026-10-28)
3. PowerShell Academy: 18 chapters, one renderer (2026-11-04)
4. AgentArsenal: 643 skills, one manifest (2026-10-27)
5. (optional) 90 days of cybersecurity: a plan you can actually follow (2026-10-20)

- [ ] **Step 1: Read the five repo READMEs in ~/workspace/ (pentrix-vulnlab, apk-security-pipeline, powershell-academy, agent-arsenal, 90days-cyber) and extract only verifiable facts, commands, and code**
- [ ] **Step 2: Write content.ts loader with the frontmatter type above, reading-time computation, draft exclusion, newest-first sorting**
- [ ] **Step 3: Write the 4 (or 5) MDX articles, each with honest first-person voice, real commands in code blocks, no invented experiment, no invented result, dates as listed above**
- [ ] **Step 4: Write one MDX file per real project (PenTrix-VulnLab, APK Security Pipeline, PowerShell Academy, AgentArsenal, 90DaysOfCyberSecurity) with problem, approach, stack, status, repo link, and the honest limits**
- [ ] **Step 5: Write docs/CONTENT.md (every article and project with its source, what is real, what was deliberately left out and why: Research, Labs, newsletter, any unverified claim) and docs/SOURCE-RECORD.md (the master prompt summary + the reference study summary from the parent brief, as the project source record)**
- [ ] **Step 6: Run the banned-item grep audit (em dash, 269/269, 16.40/20, Howest, university, course code, lecturer, professor, stormbreaker, bounty program names, CVE- numbers, invented stats); Expected: zero hits in content/ and src/**
- [ ] **Step 7: Commit locally ("Real content: seed articles and projects from verified repos")**

### Task 3: Pages (home, about, blog index, article template, projects, search)

**Files:**
- Create: `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx`, `src/app/search/page.tsx`, `src/components/SearchPalette.tsx` (Ctrl+K/Cmd+K, real search over titles, descriptions, body, categories, tags), `src/components/ArticleRow.tsx`, `src/components/CodeBlock.tsx` (copy button, language label, line numbers, readable in both themes), `src/components/TableOfContents.tsx` (static in-flow box), `src/components/Callout.tsx` (NOTE, TIP, WARNING, IMPORTANT, SECURITY FINDING, MITIGATION, ETHICAL CONSIDERATION), `src/app/disclosure/page.tsx`, `src/app/privacy/page.tsx`, `src/app/not-found.tsx`
- Test: `npm run build` passes; every route returns 200 in dev; search returns correct results for three test queries

**Interfaces:**
- Consumes: Task 1 layout/tokens/components, Task 2 content.ts and MDX
- Produces: all routes above; homepage (hero with eyebrow "CYBERSECURITY · ARTIFICIAL INTELLIGENCE · ENGINEERING", large name heading, 1-2 short paragraphs, "Read the writing" pill button + "About me" underlined link, thin separator, Selected writing 3-5 editorial rows, Topics as compact text links); blog index (rows grouped by year, monospace date left, bold title, "N min read" right, hairline/dashed separators, search input + category filter + tag filter, centred pill pagination if needed); article page (reading time above H1, breadcrumb, category, subtitle, date, updated date, author, 720-760px column, in-flow TOC box, tag pills, word count and date at end, previous/next links, related articles, references section); projects page (editorial rows, not cards); search page + Ctrl+K palette with real results and empty/no-results states

- [ ] **Step 1: Build CodeBlock (copy button with feedback, language label, line numbers, syntax highlighting readable in light and dark) and Callout (seven types, subtle colours and borders)**
- [ ] **Step 2: Build homepage per the spec above (hero, Selected writing rows from content.ts, Topics links, minimal footer already in layout)**
- [ ] **Step 3: Build About page (centred, large "About Me" title, neutral portrait placeholder with a clear label, short paragraphs from verified facts only, links to GitHub, LinkedIn, Projects, Writing, "Created by Muhammad Izaz Haider")**
- [ ] **Step 4: Build blog index (year-grouped rows, search input, category and tag filters, empty states) and article template (header, TOC, body, tags, word count, prev/next, related)**
- [ ] **Step 5: Build projects index and detail pages from content/projects/**
- [ ] **Step 6: Build search page + Ctrl+K palette (real index over titles, descriptions, body, categories, tags; results show title, category, excerpt, date; empty and no-results states; keyboard accessible)**
- [ ] **Step 7: Build /disclosure (responsible disclosure guidance, only test systems you own or have permission to test) and /privacy (short, honest), plus branded 404**
- [ ] **Step 8: Run `npm run build` and spot-check every route returns 200; Expected: build passes, all routes 200**
- [ ] **Step 9: Commit locally ("Pages: home, about, blog, article, projects, search")**

### Task 4: SEO, accessibility, performance

**Files:**
- Create/modify: `src/app/layout.tsx` (metadata, canonical, Open Graph, Twitter), `src/app/sitemap.ts`, `src/app/rss/route.ts` (or `src/app/feed.xml/route.ts`), `src/app/robots.ts`, `src/lib/jsonld.ts` (Person + Article structured data), `src/app/blog/[slug]/page.tsx` (per-article metadata + Article JSON-LD)
- Test: `npm run build` passes; sitemap.xml, robots.txt, feed.xml return 200 with correct entries; JSON-LD validates structurally (Person with no birthDate, no invented fields)

**Interfaces:**
- Consumes: Tasks 1-3
- Produces: metadata on every page, canonical URLs (base https://izaz.dev, clearly marked as the intended domain, not yet live), Open Graph + Twitter cards, Article JSON-LD per post, Person JSON-LD on About (name, url, sameAs GitHub + LinkedIn, no birthDate, no invented fields), sitemap, RSS feed, robots.txt

- [ ] **Step 1: Add metadata, canonical, Open Graph, Twitter to layout and per-page metadata**
- [ ] **Step 2: Add Person JSON-LD (About) and Article JSON-LD (article pages)**
- [ ] **Step 3: Add sitemap.ts, robots.ts, RSS route (all published posts, newest first)**
- [ ] **Step 4: Accessibility pass: skip link, visible focus, semantic landmarks, heading order, alt text, aria labels on theme toggle and search, colour contrast check on tokens**
- [ ] **Step 5: Run `npm run build`; check sitemap, robots, feed return 200; Expected: all pass**
- [ ] **Step 6: Commit locally ("SEO, structured data, RSS, sitemap, accessibility pass")**

### Task 5: QA, unslop, browser verification, fix pass

**Files:**
- Modify: whatever the verification finds (fix in place, re-verify)
- Test: Playwright at 1440, 1366, 1024, 768, 390, 360; 0 console errors, 0 horizontal overflow; unslop pass clean

**Interfaces:**
- Consumes: the finished site from Tasks 1-4
- Produces: verification evidence (widths checked, errors, overflow, fixes made) recorded in docs/QA-REPORT.md

- [ ] **Step 1: Start the production build locally (`npm run build && npm run start`), confirm it serves**
- [ ] **Step 2: Playwright screenshot pass at 1440, 1366, 1024, 768, 390, 360 on home, about, blog index, one article, projects, search: record console errors and horizontal overflow per width**
- [ ] **Step 3: View every screenshot; check hero proportions, article readability in both themes, dark mode, mobile nav, code block readability in both themes, particle rendering, reduced-motion behaviour**
- [ ] **Step 4: Run the unslop pass on the finished site; fix every FAIL**
- [ ] **Step 5: Functional checks: theme toggle persists across reload, Ctrl+K opens search and returns results, copy button copies code, pagination/filters work, all internal links land**
- [ ] **Step 6: Fix every inconsistency found, re-run the failing width, re-screenshot**
- [ ] **Step 7: Write docs/QA-REPORT.md with the evidence (widths, errors, overflow, fixes) and commit ("QA: browser verification and fixes")**
