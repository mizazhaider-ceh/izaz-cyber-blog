# Content record: izaz.dev seed articles and projects

This file records every article and project shipped in Task 2, where each fact came from, what is real, and what was deliberately left out and why. Rule for everything here: only verifiable facts from the five repo READMEs in `~/workspace/` and the verified facts list in `docs/PLAN.md`. Nothing invented, nothing guessed. Where a fact could not be verified, it was left out and is listed under "Left out" below.

## Articles

### 1. PenTrix VulnLab: building a deliberately vulnerable lab

- Slug: `pentrix-vulnlab-building-a-deliberately-vulnerable-lab`
- Date: 2026-10-20 (real build date from the plan)
- Category: Web Security. Featured: yes.
- Source: `~/workspace/pentrix-vulnlab/README.md`, plus the verified facts list in `docs/PLAN.md`.
- What is real: 201 challenges across 29 modules; Express and SQLite, plain CSS and JavaScript, no build step; `docker compose up --build`, `npm install`, `npm start`, `npm test`; compose binds to `127.0.0.1` only with healthcheck, dropped capabilities, capped CPU and memory; `SESSION_SECRET` behaviour; the verification rule (bare beacons, token replays, and visit-only claims earn nothing; a `400` with no flag); flags are randomly generated per install at first boot, no flag literal exists in any tracked file, only genuine exploits earn flags; Burp Suite first, Community edition clears all 201 challenges; 3 kill-chain scenarios (Shop Takeover, API Heist, Ghost in the CMS); 3 career paths (Zero to Web Pentester, API Hacker, Authentication Assassin); one file per challenge; `// VULN:` comments, 281 across the codebase; break-then-fix in active development with pilot coverage for SQL injection and XSS first; project layout as shown in the article.
- Left out: the version number. The verified facts list says v1.1.1, but the repo README does not state it and `package.json` in the workspace reads 1.0.0, so no version is claimed anywhere in the article or the project file. The regression suite size from the README was also left out, because the plan forbids test-pass counts and it was not in the verified facts list.

### 2. Writing my own Android binary XML parser, and the one-line bug that broke it

- Slug: `writing-my-own-android-binary-xml-parser`
- Date: 2026-10-28 (real build date from the plan; matches the "Real APK validation, added 2026-10-28" section of the repo test report)
- Category: Android Security. Featured: yes.
- Source: `~/workspace/apk-security-pipeline/README.md`, `~/workspace/apk-security-pipeline/TEST_REPORT.md`, and `~/workspace/apk-security-pipeline/apk_pipeline/axml.py` (read to confirm the fix).
- What is real: pure standard library Python, Python 3.10 or newer, no dependencies; own binary AXML parser and writer; the bug, that the parser read attributes from chunk start plus `attributeStart`, while the spec defines `attributeStart` relative to the end of the node header, with real toolchains storing 20, so attributes begin at chunk start plus header size plus 20, which is 36; the writer stored 36, which is why roundtrip tests stayed green; the fix (`base = pos + header_size + attr_start`) quoted verbatim from `axml.py`; verification against androguard as ground truth on three APKs, with the package, permission, and component counts quoted from the test report table; 4 regression tests added; scoring (start at 100, deduct 25 per Critical, 15 per High, 7 per Medium, 3 per Low, floor at 0; grades A 90+, B 75+, C 60+, D 40+, F below 40); exit codes 0 clean, 2 findings, 1 clean error; commands `python3 -m apk_pipeline scan samples/vulnerable.apk --static-only` and `python3 -m apk_pipeline scan my-test-app.apk --deep --explain`; deep mode tools (apktool, jadx, androguard); 4 Frida scripts and what each logs and never logs; 64 tests at v2.1.0.
- Left out: the name of the APK the bug was found on. The test report describes it only as a real APK run, so the article says "a real APK" and nothing more specific. The earlier suite size (42 tests at the time of the fix) was left out to avoid two conflicting counts; only the current 64 at v2.1.0 is used.

### 3. PowerShell Academy: 18 chapters, one renderer

- Slug: `powershell-academy-18-chapters-one-renderer`
- Date: 2026-11-04 (real build date from the plan)
- Category: PowerShell. Featured: yes.
- Source: `~/workspace/powershell-academy/README.md`, plus the verified facts list in `docs/PLAN.md`.
- What is real: 18 chapters, 61 lessons, 102 commands, 48 glossary terms, 36 chapter quiz questions, 61 lesson knowledge checks, 194 static pages; six stages (Foundations, PowerShell Basics, Core Skills, Admin Power, Security Power, Projects); structured TypeScript content plus one generic lesson renderer; no hand written page file per lesson, no placeholder lessons; routes table as listed in the article; Next.js 14 App Router, React 18, TypeScript strict, plain CSS design system, dependency free PowerShell tokenizer; commands `npm install`, `npm run dev`, `npm run build`, `npm run start`, `npm test`, `npm run validate`; live at https://powershell-academy-seven.vercel.app/; the honesty rules (no lab tasks, no exam questions, original exercises and quiz questions, every example output labelled illustrative, nothing executes PowerShell code); 6 original SVG diagrams.
- Left out: the Vitest count from the README was left out, because the plan forbids test-pass counts and it was not in the verified facts list. Note for the pages agent: the Academy README deployment notes say the expansion commit had not been pushed yet and to verify a deployment before calling it live. The verified facts list in the plan states the Vercel URL as live, so the URL is used, but the live status should be re-checked before any claim is repeated outside this repo.

### 4. AgentArsenal: 643 skills, one manifest

- Slug: `agentarsenal-643-skills-one-manifest`
- Date: 2026-10-27 (real count date from the repo README)
- Category: AI Tooling. Featured: no.
- Source: `~/workspace/agent-arsenal/README.md`, plus the verified facts list in `docs/PLAN.md`.
- What is real: 353 skills plus 290 sub-skills equals 643 skill files, across 29 domains; 36 agents, 25 brains, 15 playbooks, 9 workflows, 47 CLI tools, 19 supported platforms, counted 26 October 2026; `arsenal-manifest.json` drives the installer, the docs site, and the Claude Code marketplace integration; scripts `derive_manifest.py`, `gen_readme_catalog.py`, `gen_marketplace.py`, `validate.py`, `score.py`, `bundle.py`; installer commands quoted verbatim (`./install.sh --platform claude-code --all`, `./install.sh --category web`, `./install.sh --version web-sqli@1.0.0`, `./install.sh --dry-run`); flags `--list`, `--list-skills`, `--search`, `--verify`, `--rollback`; 14 validation checks; scoring 0 to 100, merge needs 85 or higher under CI, built-in gate 70; 704 scored artifacts averaging 96.4 out of 100 with the lowest at 87; skills average 96.1, agents average 99.9 with the lowest at 95; sub-skills live at `skills/<domain>/<skill>/sub/<sub>/SKILL.md` under 124 parent skills, with the `web-sqli` split example.
- Left out: nothing material. The README is long, so only the facts needed for the manifest story were used; the full catalog and the comparison tables were not copied.

### 5. 90 days of cybersecurity, a plan you can actually follow

- Slug: `90-days-of-cybersecurity-a-plan-you-can-actually-follow`
- Date: 2026-10-20 (real build date from the plan)
- Category: Learning. Featured: no.
- Source: `~/workspace/90days-cyber/README.md`, plus the verified facts list in `docs/PLAN.md`.
- What is real: exactly 90 daily tasks in 10 phases plus the career track (days 91-95); the phase table with day ranges and outcomes as listed in the article; 1 to 2 hours a day; everything free, with a free tier or free alternative named per task; the phase 5 milestone (50 earned flags plus a written writeup); the PenTrix VulnLab as the home lab with 201 challenges across 29 modules; TryHackMe, HackTheBox, picoCTF, and OverTheWire Bandit as named in the README; the rules (go in order, track with checkboxes, build in public from phase 6 onward); the interactive site URL.
- Left out: the per-day task detail from the phase files was not copied. The article covers the plan at phase level only, because each phase file is a full day-by-day list and reproducing it would duplicate the repo. The career track is summarised, not reproduced.

## Batch 2: 12 new in-depth articles (2026-11-18)

Added 2026-11-18, all dated honestly 2026-11-18, all `featured: false`, all `draft: false`, each 3,500 to 4,800 words with 2 hand-built inline SVG diagrams (24 diagrams total). Total articles now 17. Sources were checked live (HTTP 200) before writing; every illustrative command output is labelled "Illustrative output:" in the article, or framed in prose as a teaching example. No topic needed the Frida fallback. The shared `Diagram` component (`src/components/Diagram.tsx`) was built once in this batch and reused by all 12 articles.

### 6. Understanding HTTP request smuggling

- Slug: `understanding-http-request-smuggling`. Category: Web Security.
- Sources: RFC 9110 (HTTP semantics), RFC 9112 (HTTP/1.1 message syntax), PortSwigger Web Security Academy request smuggling material.
- What is real: CL.TE, TE.CL, and TE.TE variants explained from the RFC definitions of Content-Length and chunked Transfer-Encoding; the CL.TE worked example is explicitly framed as a teaching example, not a payload to send anywhere; diagrams show the front-end/back-end desync and the CL.TE walkthrough.
- Left out: named 2025/2026 desync disclosures and vendor-specific incidents, not verified against a primary source; no real domain used as a target (example.com only).

### 7. Building a practical Linux security lab

- Slug: `building-a-practical-linux-security-lab`. Category: Linux.
- Sources: Ubuntu and Debian official documentation, GNU man pages.
- What is real: host-only virtual lab design, snapshot and isolation guidance, service hardening steps from official docs; diagrams show the lab topology and the hardening checklist flow.
- Left out: no lab step is presented as tested on his machine; the Day 4/5 exercises were trimmed, and the "first week" plan covers Days 1 to 3 only.

### 8. Exploring DNS enumeration

- Slug: `exploring-dns-enumeration`. Category: Network Security.
- Sources: RFC 1034, RFC 1035, RFC 1918, dig and host man pages.
- What is real: record types, zone transfer mechanics, and enumeration method from the RFCs and man pages; the example domain used is example.com with its documented address 93.184.216.34; diagrams show the DNS resolution chain and the enumeration workflow.
- Left out: no real domain was enumerated; no live query output is presented as his own run.

### 9. An introduction to LLM prompt injection

- Slug: `an-introduction-to-llm-prompt-injection`. Category: AI Security.
- Sources: OWASP GenAI pages and cheat sheets, MITRE ATLAS (home page and data repository).
- What is real: direct and indirect injection, the "everything in the context window is text" model, and defences from OWASP guidance; diagrams show where injected instructions enter and the defence layers.
- Left out: the EchoLeak case was left out (not verified against a primary source); the ATLAS deep link for AML.T0051 returns 404, so it is not cited, the technique ID is named in text from verified search results and the ATLAS repo only; the OWASP LLM Top 10 project page returns 404, only genai.owasp.org pages are cited.

### 10. Analyzing insecure authentication

- Slug: `analyzing-insecure-authentication`. Category: Web Security.
- Sources: OWASP Authentication Cheat Sheet, OWASP Session Management Cheat Sheet.
- What is real: credential stuffing, weak session handling, and MFA gaps explained from OWASP guidance; the Microsoft 99.9% MFA figure is included only as OWASP's attributed citation of Microsoft analysis, not as his own finding.
- Left out: no real login system was tested; all outputs are labelled illustrative.

### 11. Understanding Linux firewall rules

- Slug: `understanding-linux-firewall-rules`. Category: Linux.
- Sources: nftables wiki, Netfilter man pages, iptables documentation.
- What is real: nftables rule structure, chains, tables, and default-deny design from the official docs; diagrams show packet flow through the chains and a default-deny policy layout.
- Left out: the nft man page at man7.org returns 404, so the Netfilter man page is cited instead; no live firewall was configured as part of the article.

### 12. Building network reconnaissance automation

- Slug: `building-network-reconnaissance-automation`. Category: Network Security.
- Sources: Nmap Reference Guide (nmap.org/book/man.html), nmap.org, RFC 1918.
- What is real: port states, `-sS`, `-sT`, `-sV`, `-sC`, `-sn`, `-oA`, NSE categories, and `scanme.nmap.org`, all taken from the Nmap man page; diagrams show the scan pipeline and the output parsing flow.
- Left out: Nmap timing templates (`T0` to `T5`) were cut to stay in the word budget; the article uses the default timing instead.

### 13. Exploring reverse engineering fundamentals

- Slug: `exploring-reverse-engineering-fundamentals`. Category: Reverse Engineering.
- Sources: Ghidra site and repository, ELF man page (man7.org), PE format specification (Microsoft Learn).
- What is real: ELF and PE structure, static triage method, and the AXML offset bug told in prose, grounded in his real pipeline work (`apk_pipeline/axml.py`, verified against androguard) and the existing AXML article; diagrams show the ELF layout and the triage workflow.
- Left out: a Python code snippet for the AXML fix was not included, the fix is already documented with code in the existing AXML article; two long Reference URLs were converted to short display-text links because the bare URLs overflowed mobile by 32px.

### 14. Documenting a CTF investigation, CSCB 2026

- Slug: `documenting-a-ctf-investigation-cscb-2026`. Category: CTFs.
- Sources: none. The References section states this explicitly; the only facts are his own verified results.
- What is real: his verified results only, #1 Web Junior, #3 overall Junior, #26 of 806, 26 flags earned, stated once and repeated consistently; the rest of the article is method (preparation, the enumerate-hypothesize-test-document loop, note-taking, time management) and reflection. The results diagram shows only those four numbers.
- Left out: no challenge names, no challenge details, no flag values, no scores beyond the four verified results, no round dates, no team details, no illustrative outputs by design.

### 15. Understanding DevSecOps pipelines

- Slug: `understanding-devsecops-pipelines`. Category: DevSecOps.
- Sources: OWASP DevSecOps Guideline, GitHub Actions hardening docs, SLSA, NIST SP 800-218 (SSDF).
- What is real: pipeline stages, secret handling, dependency scanning, and provenance from the cited guidance; diagrams show the pipeline stages and the trust boundaries.
- Left out: no real pipeline of his was presented as the example; all outputs are labelled illustrative.

### 16. Practical API security testing

- Slug: `practical-api-security-testing`. Category: Web Security.
- Sources: OWASP API Security Top 10 2023, PortSwigger API testing material.
- What is real: the BOLA section is grounded in his real lab work (Flask notes API: detail endpoint with no ownership check versus update/delete with a 403 ownership check, owner-filtered list); diagrams show the API attack surface and the BOLA test flow.
- Left out: no real API was tested for the article; request/response examples are labelled illustrative.

### 17. Security considerations in AI-powered applications

- Slug: `security-considerations-in-ai-powered-applications`. Category: AI Security.
- Sources: OWASP LLM Top 10 2025, OWASP LLM Prompt Injection Prevention Cheat Sheet, MITRE ATLAS, NIST AI Risk Management Framework.
- What is real: the OWASP LLM Top 10 2025 list, prompt injection defences, and AI-specific data handling risks from the cited sources; diagrams show the AI application data flow and the control layers.
- Left out: two bare-URL References overflowed mobile (422px and 11px) and were converted to short-label markdown links; the ATLAS homepage failed in browser.open but returned 200 via curl, so it is cited; diagram D1 had 3 diagonal connectors, replaced with orthogonal elbows.

## Projects

One MDX file per real repo in `content/projects/`, each with problem, approach, stack, status, repo link, and honest limits. Frontmatter: title, slug, description, category, tags, status, repo URL, draft false, featured flag.

| File | Repo | Status in frontmatter |
| --- | --- | --- |
| `pentrix-vulnlab.mdx` | https://github.com/mizazhaider-ceh/PenTrix-VulnLab | Active |
| `apk-security-pipeline.mdx` | https://github.com/mizazhaider-ceh/apk-security-pipeline | Active, v2.1.0 |
| `powershell-academy.mdx` | https://github.com/mizazhaider-ceh/powershell-academy | Live |
| `agentarsenal.mdx` | https://github.com/mizazhaider-ceh/agent-arsenal | Active |
| `90days-of-cybersecurity.mdx` | https://github.com/mizazhaider-ceh/90DaysOfCyberSecurity | Complete |

Repo URLs follow the `github.com/mizazhaider-ceh/<repo>` pattern shown in the READMEs (explicit clone or link URLs in the PenTrix, APK, and 90 Days READMEs; the Academy and AgentArsenal URLs follow the same owner and repo names as their workspace directories).

## What was deliberately left out, and why

- Research route: out of v1 per the plan rulings. There is not enough verified research content to justify a Research section, so no research article was written and no research claims appear anywhere.
- Labs route: out of v1 per the plan rulings. The labs are described inside the project files and articles where they are real repos, not as a separate Labs section.
- Newsletter: no backend exists, so no newsletter form, no signup copy, and no subscriber numbers appear anywhere. Nothing fakes a subscription.
- About copy: not part of Task 2. The About page is Task 3 work for the pages agent, using verified facts only.
- Grades, scores, and counts that could not be verified: the PenTrix version number (see article 1 note), all test-pass counts except the APK 64 tests at v2.1.0 which the plan explicitly lists as verified, and the Academy Vitest count. No GPA figure appears anywhere.
- Employment, certifications, and competition results from the verified facts list (CNSP with Merit, CSCB 2026 results, Damno Solutions role, YesWeHack role, first year credits, eJPT and eWPT study): not used in these five articles, because none of the five articles is about them. They belong on the About page (Task 3), not forced into build write-ups.
- No institution or staff mentions anywhere, per the plan. No bounty program names, report titles, IDs, endpoints, or reward amounts. No vulnerability identifiers, no severity assessments of real findings, no vendor acknowledgements, no invented statistics, testimonials, or credentials.

## Loader

`src/lib/content.ts` reads MDX files from `content/blog/` and `content/projects/` with gray-matter. It exports `getAllPosts()`, `getPostBySlug(slug)`, `getAllProjects()`, and `getProjectBySlug(slug)`. All four exclude `draft: true` and return newest first for posts. Reading time is computed from word count at 200 words per minute, with a minimum of 1 minute, and is not stored in frontmatter. Frontmatter in the MDX files carries `draft: false` and `featured` as written; the loader enforces the draft exclusion at read time.

## Audit

A grep audit was run over `content/` and `src/lib/content.ts` for the banned items listed in `docs/PLAN.md` (em dash character, the banned figure pair, the GPA figure, institution and staff names, the wrong email local part, and vulnerability identifier prefixes). Result: zero hits. The full audit output is reported back to the parent agent with the Task 2 handover. Note: gray-matter was not installed in this workspace at the time of writing (the scaffold agent owns `package.json` and dependencies), so frontmatter was verified with a dependency-free parser script instead, and the pages agent owns the full `npm run build` check.

## Batch 2 audit (2026-11-18)

- Banned-item grep over all 12 new articles (em dash, Howest, university, lecturer, professor, stormbreaker, CVE-, 269/269, 16.40/20): zero hits. The only "magic" matches are the technical terms ELF magic bytes and AXML magic number.
- Unslop pass: no hype or filler words found (supercharge, seamless, unlock, revolutionize, game-changing, delve, tapestry, ever-evolving, embark, leverage, moreover, furthermore, "it is important to note" all absent). Each article has 9 to 13 H2 sections, 3 to 4 callouts, 2 diagrams, and code blocks where the topic needs them.
- Verification: `npm run build` clean, `npx tsc --noEmit` clean, 32 static routes (20 plus 12 new). Playwright on home, blog index, and 9 new articles at 1440px and 390px: 0 console errors, 0px overflow, diagrams rendered and viewed, copy buttons present. Dark mode spot-checked on the CSCB article via the site's localStorage theme key.
- Left out of Batch 2 as a whole: named 2025/2026 desync disclosures and vendor-specific incidents (not verified against a primary source), the EchoLeak case, and Nmap timing templates T0 to T5 (word budget). No topic needed the Frida fallback.

## Pre-publish checklist

Check every item below before any article goes live. These rules come from the site audit of 20 Nov 2026 (items 7 and 8) and apply the day an image exists on the site.

### LCP image rules (audit item 7)

- The hero image, or whichever image is the Largest Contentful Paint (LCP) element, gets `fetchpriority="high"` and is never lazy-loaded. Do not put `loading="lazy"` on it.
- The hero image must be discoverable in the initial HTML: a plain `img` tag, or `next/image` with `priority`, served in the first response. Never load it only after JavaScript runs.
- Every other image on the page is lazy-loaded with `loading="lazy"`.
- Today the site has no photographic hero image, so LCP is text and nothing is broken. Apply this rule the day a hero or article image is added.

### Explicit image dimensions (audit item 8)

- Every `img` carries `width` and `height` attributes, or a CSS `aspect-ratio`, so the browser reserves the space before the image loads and text is not pushed down.
- Keep the local result at CLS 0 on home and article pages (measured locally; diagrams are SVGs in fixed containers).
- Re-verify CLS after OG images are added, since OG images are the usual CLS source. Target: CLS 0.1 or less.

## Publishing schedule and formats

The 11 batch articles of 18 Nov 2026 share one date and one shape (about 4,300 to 4,700 words, exactly 4 diagrams each, each rendering as "23 min read"). That reads as one upload, not a body of work. From now on, publish on a real schedule and vary the format. Never backdate an article to fake a history.

### Schedule

- Cadence: one article every 1 to 2 weeks, starting 20 Nov 2026 forward.
- Publish dates are real publish dates only. An article dated 20 Nov 2026 or later was published on that date.
- If a week is missed, the schedule slips forward. Do not fill the gap with a backdated post.
- Planned slots live in `docs/CONTENT-CALENDAR.md`. A slot moves from planned to published only when the article is live.

### Format taxonomy

Four formats, one line each. Pick the format before writing, and let it set the length and shape.

- **Deep dive**: a long explainer of one topic, grounded in primary sources, with diagrams and worked examples.
- **Short note**: a brief post, one idea, one finding, or one fix, readable in a few minutes.
- **Lab log**: a dated record of something actually built, run, or broken, with real commands and real output.
- **Teardown**: a close look at one real system, file, or mechanism, taken apart piece by piece to show how it works.

## Audit implementation, 20 Nov 2026 (all 53 items)

The outstanding-audit of 20 Nov 2026 listed 53 items. All 53 were implemented the same day by 30 specialized agents, merged and verified by the coordinator. Build clean, tsc clean, 37 static routes, Playwright on home, blog index, 3 articles, about, search, series and changelog at 1440px and 390px: 0 horizontal overflow, 1 H1 per page, dark mode toggle works, copy buttons work (verified with clipboard permissions granted), search for a body-only word returns 1 result, TOC scroll-spy 5 of 5 headings. legacy-scan on src: 0 findings. Banned-item grep over content/ and src/: zero hits.

### What changed

- SEO: canonical, sitemap, robots and OG URLs now point at the live host https://izaz-cyber-blog.vercel.app (izaz.dev is not live). Metadata merge fixed (RSS alternate, og:site_name, og:locale on every page). WebSite JSON-LD added. Favicon ICO plus apple-touch-icon rendered from the `$` mark. RSS link in the footer.
- OG cards: 18 PNGs at 1200x630 (17 articles plus default), in the blog's own look, wired into every page's metadata.
- Identity: hand-drawn SVG `$izaz` signature mark in the header and hero; hero copy rewritten from verified facts only (CSCB 2026, CNSP with Merit).
- Dark mode: first visit follows the OS preference, stored value wins, theme-color per theme, color-scheme meta.
- Typography: article and About prose narrowed to 68ch.
- Diagrams: component no longer forces a 640px minimum width (verified at 390px, no overflow), accessible names added without double-announcing.
- Performance: font-size-adjust added, prefetch disabled on below-fold lists, performance budget in docs/PERFORMANCE-BUDGET.md.
- Analytics: Vercel Web Analytics and Speed Insights enabled; privacy page rewritten to state the cookieless analytics honestly.
- Content: all 17 articles got updatedAt 2026-11-20, an honesty note (explainer vs build log), outbound source links (every URL curl-checked 200 before linking), and 3 to 4 internal links each. Five new diagrams added where articles had none (90-day plan, AgentArsenal, PenTrix flag flow, PSA content flow, AXML file layout). Two runnable Python samples added (CSCB scoreboard summary, AI injection allowlist), both executed and matching the article output.
- Features: 4 series with index page and prev/next nav, reading progress bar, scroll-spy TOC, share buttons plus print stylesheet, feedback box (localStorage vote only, nothing sent), newsletter component (hidden until a Buttondown username is set), About character portrait (Pexels, Vinur., free license, credited).
- Trust: security.txt, security headers (CSP, HSTS 31536000, nosniff, Referrer-Policy), CI workflow with Lighthouse thresholds, weekly link check, changelog page linked from the footer.
- Accessibility: contrast measured in both themes (one failing pair fixed: light text-subtle 3.59:1 to 4.69:1), skip link target made focusable, 5 suppressed focus indicators restored, reduced-motion global hack removed.

### What was left out, and why

- Newsletter sending: the component is built but renders nothing until the author creates a free Buttondown account and sets BUTTONDOWN_USERNAME. No account was created, no form that goes nowhere ships. Setup in docs/NEWSLETTER.md.
- Uptime monitor: no account created (needs the author's login). Exact free UptimeRobot setup in docs/UPTIME.md.
- Search Console verification: needs the site owner to prove ownership. Steps in docs/SEARCH-CONSOLE.md.
- Social card debuggers (Facebook Sharing Debugger, X Card Validator): need the deployed site. Steps in docs/OG-CHECKLIST.md.
- Live preview noindex check: needs a real PR. Procedure in docs/PREVIEW-CHECK.md.
- Cross-posting to DEV, Medium and LinkedIn: process only, in docs/DISTRIBUTION.md. Posting needs the author's logged-in accounts.
- Two link corrections made during merge (verified against the authenticated GitHub API): the AgentArsenal repo link now uses the exact case https://github.com/mizazhaider-ceh/AgentArsenal; the PowerShell Academy repo link was removed from References because that repo is private and returns 404 to every public reader, while the live site link stays.
- One CSS fix made during merge: long URLs in article links now wrap (article a, overflow-wrap anywhere). A 366px URL in the Linux lab article overflowed the page by 24px at 390px; after the fix, overflow is 0 on all checked articles.
