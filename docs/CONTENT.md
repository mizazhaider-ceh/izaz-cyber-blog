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
