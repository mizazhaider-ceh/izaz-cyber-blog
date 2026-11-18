# Content Plan 2: 12 in-depth articles with diagrams

> For agentic workers: implement task by task, in batches. Batch A first (articles 1-3), verified before B, C, D start in parallel. Every article researched from official docs before writing, cited in a References section. No invented facts anywhere.

**Goal:** Add 12 new in-depth articles (total 5 to 17), each 2,500-4,500 words, with 2 own hand-built inline SVG diagrams each (24 total), researched from primary sources, real content only.

**Architecture:** MDX files in `content/blog/`, rendered by `src/components/MdxContent.tsx` (MDXRemote RSC, remark-gfm, rehype-highlight). Diagrams are inline SVG inside a shared `Diagram` figure component (built in Task 0), using the blog CSS variables so dark mode works.

**Tech stack:** Next.js 15, TypeScript strict, React 19, Tailwind v4, next-mdx-remote 6.0.0.

**Spec:** parent task brief (content coordinator brief, 2026-11-18). Frontmatter schema in `src/lib/content.ts` (title, slug, description, date, category, tags, author "Muhammad Izaz Haider", draft false, featured boolean; readingTime is computed from content at 200 wpm, never stored).

## Global Constraints

- All 12 articles dated honestly `2026-11-18`. Never stagger dates.
- `featured: false` on all 12 new articles.
- NEVER use em dashes in any file (commas, colons, parentheses instead).
- NO Howest, university, course code, lecturer, or professor mention anywhere.
- NO 269/269 figure or test-pass counts. NO 16.40/20 GPA anywhere.
- NO bounty program names, report titles, IDs, endpoints, or reward amounts.
- NEVER disclose PenTrix flag storage (approved sentence only: flags are randomly generated per install at first boot, no flag literal exists in any tracked file, only genuine exploits earn flags).
- NO invented CVE numbers, vulnerability confirmations, severity assessments, vendor acknowledgements, bug bounty rewards, research results, statistics, or command outputs.
- Every illustrative output labelled `Illustrative output:`.
- Distinguish what he actually built/tested (real projects and labs already in the repo and docs) from conceptual/illustrative material.
- Voice: intelligent, curious, technical, clear, human, honest, confident without arrogance, educational without sounding like a textbook. First person only for his real experience; neutral explanatory voice for concept explainers. Never call him a world-leading expert or elite hacker.
- Categories and tags from the existing taxonomy (`src/lib/topics.ts`, existing article categories) where they fit.
- Diagrams: own hand-built inline SVG in blog design tokens only. Never lecture slide images, never stock images, never generated hacker art. Every SVG rendered and viewed in a real browser (Playwright) at 1440px and 390px before handover: no clipped text, no overlapping labels, no overflow.
- Diagram craft rules (from diagram-design skill, adapted to inline SVG in MDX): max 9 nodes per diagram, max 12 arrows, accent (red) on at most 2 elements, orthogonal connectors only (right-angle elbows, no diagonals), arrow labels on opaque masks with a 6-10px gap from the stroke, no overlapping strokes, 4px grid, no shadows, no gradients, no glow. Every `<svg>` has `role="img"` and `aria-labelledby` with unique `<slug>-title` / `<slug>-desc` ids, `<title>` first child. SVG sits in a horizontal-scroll wrapper on small screens (`overflow-x: auto`, `min-width` = viewBox width). Text in Space Grotesk (headings/labels) and JetBrains Mono (technical sublabels only: ports, commands, URLs). Blog CSS variables for all fills/strokes so both themes work: `--background`, `--surface`, `--border`, `--text-primary`, `--text-secondary`, `--text-muted`, `--primary`, `--secondary`, `--success`, `--warning`, `--research`.
- MDX SVG gotcha: JSX needs camelCase attributes (`strokeWidth`, `fontFamily`, `textAnchor`, `clipPath`). No `{` or `}` inside SVG text without escaping. No raw `class` attribute (use `className`).
- Research before writing: verify every technical claim against an official source (OWASP, RFC, Microsoft Learn, man pages, vendor docs) with `browser.search` / `browser.open`, and cite it in the article References section. If a claim cannot be verified, leave it out and note it in the batch report.

## Review Focus

- A diagram that looks right in source but clips text or overlaps labels at 390px (render-check every diagram at both widths, fix, re-check).
- An invented number or finding slipping into an explainer (every number needs a source or the label "Illustrative output:").
- A date other than 2026-11-18 on a new article (all 12 are written now).
- A CSCB 2026 detail beyond the four verified facts (see article 9).
- An em dash, institution name, or banned figure in any new file (grep audit before push).

---

## Task 0: Diagram component (coordinator, before Batch A)

**Files:**
- Create: `src/components/Diagram.tsx`
- Modify: `src/components/MdxContent.tsx` (register `Diagram` in the components map)
- Verify: `npm run build`, `npx tsc --noEmit`, Playwright render of one article page using it at 1440px and 390px.

**Interface:**
- `Diagram({ title, caption, children })`: renders a `<figure>` with an optional title line, children (the inline `<svg>`) inside an `overflow-x: auto` wrapper, and a `<figcaption>` with the caption. Styling in blog tokens (surface background, hairline border, 12px radius). Title in mono uppercase small, caption in muted small text.
- Articles use it as: `<Diagram title="..." caption="...">` + inline `<svg>` + `</Diagram>`.

## Task 1: Batch A, articles 1-3 (first specialist, verified before B/C/D)

### Article 1: Understanding HTTP request smuggling
- Slug: `understanding-http-request-smuggling`. Category: Web Security. Tags: `["http", "request-smuggling", "web-security", "owasp"]`.
- Angle: how two servers disagreeing about where one request ends turns one request into two, why it matters, and how to think about it defensively. Concept explainer, neutral voice.
- Research: RFC 9112 (Content-Length and Transfer-Encoding), OWASP request smuggling material, PortSwigger Web Security Academy request smuggling pages.
- Diagrams (2): (a) sequence diagram, client to front-end to back-end, showing a CL.TE desync where the back-end reads a second hidden request out of the first; (b) comparison diagram of the four variants (CL.TE, TE.CL, TE.TE, CL.CL) as four lanes with what each server sees.
- Must not: invent a vulnerable vendor, a CVE, or a real incident with specifics. Any example request is labelled illustrative.

### Article 2: Building a practical Linux security lab
- Slug: `building-a-practical-linux-security-lab`. Category: Linux. Tags: `["linux", "lab", "virtualization", "hardening"]`.
- Angle: a lab you can actually build this weekend, from hardware and virtualization choices to a small network of attacker, victim, and firewall machines, with the safety rules that keep it isolated. Mix of his real lab habits (PenTrix as the home lab, Docker, VM snapshots) and general guidance, clearly separated.
- Research: vendor docs for the virtualization stack used, man pages where cited, OWASP lab guidance.
- Diagrams (2): (a) deployment diagram, host machine to hypervisor to three VMs (attacker, victim, firewall/router) on an isolated host-only network, with the internet boundary marked; (b) process diagram, build order from install to first snapshot.
- Must not: present any lab step as tested if it was not run. Commands are standard, verifiable commands; outputs labelled illustrative.

### Article 3: Exploring DNS enumeration
- Slug: `exploring-dns-enumeration`. Category: Network Security. Tags: `["dns", "enumeration", "reconnaissance", "networking"]`.
- Angle: what DNS actually reveals about an organisation, from records to zone transfers to brute forcing, and what the defender sees on the other side. Concept explainer with real commands.
- Research: RFC 1034 and 1035 (record types, zone transfers), OWASP and standard enumeration references.
- Diagrams (2): (a) data flow diagram of a DNS query through resolver, root, TLD, authoritative server; (b) tree diagram of record types (A, AAAA, MX, TXT, NS, SOA, CNAME, SRV) and what each one reveals to an enumerator.
- Must not: enumerate a real domain as an example. All example domains are `example.com` or clearly fictional.

## Task 2: Batch B, articles 4-6

### Article 4: An introduction to LLM prompt injection
- Slug: `an-introduction-to-llm-prompt-injection`. Category: AI Security. Tags: `["llm", "prompt-injection", "ai-security", "agents"]`.
- Angle: why instructions and data share one channel in LLMs, what direct and indirect injection look like, and what actually helps (and what does not). Concept explainer, neutral voice.
- Research: OWASP Top 10 for LLM Applications (prompt injection entry), MITRE ATLAS, vendor security docs.
- Diagrams (2): (a) architecture diagram, user to app to model, with system prompt, retrieved data, and tool calls, showing where injected instructions enter; (b) flowchart, direct injection vs indirect injection paths.
- Must not: invent a model vulnerability, a real incident, or a jailbreak transcript. Examples are short, clearly illustrative prompts.

### Article 5: Analyzing insecure authentication
- Slug: `analyzing-insecure-authentication`. Category: Web Security. Tags: `["authentication", "sessions", "web-security", "owasp"]`.
- Angle: how authentication actually breaks in real apps, from credential handling to session management to brute force and lockout design, and how to test each part. Grounded in OWASP and in his real PenTrix work (the lab's auth modules) where relevant.
- Research: OWASP Authentication Cheat Sheet, OWASP Top 10 broken authentication material, RFC 9110 (auth), session guidance.
- Diagrams (2): (a) sequence diagram of a login session lifecycle (credential check, session issue, validation, logout) with the attack point at each step marked; (b) diagram of the common failure modes grouped by where they live (credential storage, transport, session, lockout).
- Must not: invent a breached service or a real credential leak. No real passwords anywhere, even as examples (use `REDACTED` or clearly fake placeholders).

### Article 6: Understanding Linux firewall rules
- Slug: `understanding-linux-firewall-rules`. Category: Linux. Tags: `["linux", "firewall", "nftables", "iptables", "networking"]`.
- Angle: how a packet actually travels through nftables/iptables chains, how to read and write rules that do what you mean, and the mistakes that leave a door open. Real commands, verified against man pages.
- Research: nftables wiki, iptables and nft man pages, kernel packet flow documentation.
- Diagrams (2): (a) flowchart of the packet path (PREROUTING, INPUT/FORWARD/OUTPUT, POSTROUTING) with where each chain decides; (b) layer stack of defense layers (host firewall, network firewall, service binding, application auth).
- Must not: claim a rule was tested if it was not. Example rules are minimal and standard; outputs labelled illustrative.

## Task 3: Batch C, articles 7-9

### Article 7: Building network reconnaissance automation
- Slug: `building-network-reconnaissance-automation`. Category: Network Security. Tags: `["network", "reconnaissance", "automation", "nmap", "scripting"]`.
- Angle: turning manual recon into a repeatable pipeline, from discovery to port scan to service enumeration to a report a human can act on, with the ethics and scope rules built in. Draws on his real automation work (APK pipeline patterns, scripting) where relevant, clearly separated from general guidance.
- Research: nmap documentation, standard recon methodology references.
- Diagrams (2): (a) process diagram of the pipeline stages (scope, discovery, port scan, service enumeration, reporting); (b) data flow diagram showing one stage's output feeding the next.
- Must not: scan any real target as an example. All targets are `127.0.0.1`, RFC 1918 addresses, or `scanme.nmap.org` (the documented example host) where the docs use it.

### Article 8: Exploring reverse engineering fundamentals
- Slug: `exploring-reverse-engineering-fundamentals`. Category: Reverse Engineering. Tags: `["reverse", "binary", "ghidra", "assembly"]`.
- Angle: how to start reading a binary you did not write, from triage to static analysis to dynamic checks, and what each tool is actually for. Grounded in his real AXML parser and APK pipeline work where relevant.
- Research: Ghidra documentation, standard RE references, ELF/PE format documentation.
- Diagrams (2): (a) process diagram of the RE workflow (triage, static analysis, dynamic analysis, verify); (b) diagram of a binary's anatomy (headers, sections, entry point) as a layer stack or block diagram.
- Must not: reverse engineer a real commercial binary as the example. Examples use his own APK pipeline binaries or clearly labelled illustrative snippets.

### Article 9: Documenting a CTF investigation, CSCB 2026
- Slug: `documenting-a-ctf-investigation-cscb-2026`. Category: CTFs. Tags: `["ctf", "cscb", "writeup", "competition"]`.
- Angle: how he approaches a CTF as an investigation, preparation, method, note-taking, time management, and what the results mean. First person, his real experience.
- VERIFIED FACTS ONLY, the complete allowed fact set: CSCB 2026, #1 Web Junior, #3 overall Junior, #26 of 806, 26 flags earned. NOTHING else about the event may be stated as fact: no challenge names, no challenge details, no flag values, no scores, no dates of rounds, no team details, no tool claims beyond what he generally uses. The article is about method and what the result reflects, not a challenge walkthrough.
- Diagrams (2): (a) investigation loop diagram (enumerate, hypothesize, test, document, repeat) as a cycle; (b) results figure showing only the four verified numbers, labelled as his CSCB 2026 results.
- Must not: invent any challenge, any flag, any category result, or any timeline detail.

## Task 4: Batch D, articles 10-12

### Article 10: Understanding DevSecOps pipelines
- Slug: `understanding-devsecops-pipelines`. Category: DevSecOps. Tags: `["devsecops", "pipeline", "ci", "automation"]`.
- Angle: where security checks actually belong in a pipeline, what each check catches, and what happens when one fails, with a realistic pipeline as the worked example. Concept explainer with a real pipeline shape.
- Research: OWASP DevSecOps guidance, vendor CI documentation, SAST/SCA/DAST references.
- Diagrams (2): (a) process diagram of a pipeline with security gates (commit, SAST, dependency scan, build, image scan, deploy, DAST) and the fail action at each gate; (b) loop diagram of the shift-left feedback loop (finding to developer to fix to retest).
- Must not: invent a company pipeline or a breach prevented. The example pipeline is a generic, labelled illustrative shape.

### Article 11: Practical API security testing
- Slug: `practical-api-security-testing`. Category: Web Security. Tags: `["api", "testing", "web-security", "owasp"]`.
- Angle: how to test an API properly, from discovery to authentication and authorisation to input handling to business logic, with a method you can repeat. Grounded in OWASP API Security Top 10 and in his real PenTrix API modules where relevant.
- Research: OWASP API Security Top 10, OWASP API testing guidance.
- Diagrams (2): (a) architecture diagram of client to API gateway to services, with the test points marked; (b) flowchart of the testing methodology (discover, authenticate, authorise, fuzz inputs, test logic, report).
- Must not: test a real public API as the example. All examples use a local lab API or clearly illustrative endpoints.

### Article 12: Security considerations in AI-powered applications
- Slug: `security-considerations-in-ai-powered-applications`. Category: AI Security. Tags: `["ai-security", "llm", "agents", "secure-design"]`.
- Angle: what changes when an application has a model inside it, from data handling to tool use to output trust, and how to design the boundaries before the model does something you did not plan. Concept explainer, neutral voice.
- Research: OWASP Top 10 for LLM Applications, MITRE ATLAS, vendor AI security guidance.
- Diagrams (2): (a) architecture diagram of an AI app data flow with trust boundaries (user input, retrieved data, model, tools, outputs); (b) layer stack of defense in depth for LLM apps (input validation, retrieval controls, tool permissions, output handling, monitoring).
- Must not: invent a model vulnerability, a real incident, or a vendor failure. Examples are generic and labelled illustrative.

## Verification (per batch, before the next batch starts)

1. `npm run build` clean, `npx tsc --noEmit` clean.
2. Playwright: home, blog index, and every new article in the batch at 1440px and 390px, light and dark where relevant: 0 console errors, 0 overflow, every diagram rendered and viewed (no clipped text, no overlapping labels), code blocks readable, copy buttons work.
3. Banned-item grep over `content/blog/` and any changed `src/`: zero em dashes, zero 269/269, zero 16.40/20, zero Howest/university/course/lecturer/professor mentions, zero stormbreaker, zero CVE- strings, zero invented statistics (spot check numbers against sources).
4. Commit in small logical batches (one commit per 2-3 articles, clear messages). Push to BOTH remotes only after that batch is verified.
5. Final: unslop pass over the new articles (content slop: generic filler, hype words, unverified claims, repetitive structure), update `docs/CONTENT.md` with the new articles and what was left out, live check of `https://izaz-cyber-blog.vercel.app/blog` listing the new articles and one new article returning 200.

## Ledger

- Ruling: Batch A runs first and alone, so the Diagram component pattern and the article quality bar are proven before B, C, D start in parallel. The brief says each batch is verified before the next starts; the first batch is the pattern-setting one, so it gets the strict reading, and B/C/D run in parallel only after A is verified, which is what the brief's "batches of 3-4 per specialist" implies.
- Ruling: diagram-design skill's first-diagram style-guide gate is satisfied by the parent brief itself, which pins the blog's exact tokens (warm paper, red accent, Space Grotesk/Instrument Sans/JetBrains Mono). No user question is asked; the skill's default palette is never used.
- Ruling: readingTime is computed by the loader at 200 wpm and never stored in frontmatter, so specialists do not write it; the "real reading time" requirement is met by the loader.
- Ruling: Task 0's visual render check rides on Batch A article 1 (the first article using Diagram), verified at 1440px and 390px before B/C/D start. A throwaway test article would have polluted the blog index, so the first real article is the verification vehicle instead. Build and tsc for Task 0 were run clean before Batch A was spawned.
