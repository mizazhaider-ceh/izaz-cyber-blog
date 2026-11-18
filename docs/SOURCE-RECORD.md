# Source record: izaz.dev

This file is the project source record. It summarises the two sources the build is argued from: the master build prompt (the binding spec) and the reference study (the reference blog). It exists so a future worker can tell what was specified, what was studied, and what was deliberately not copied.

## 1. The master build prompt (summary)

The master prompt specifies a personal blog for Muhammad Izaz Haider, brand `izaz.dev`, tagline "Exploring technology. Understanding security. Building what matters." The brand mark is `$ izaz` with a small solid red cursor block.

Stack: Next.js App Router with TypeScript strict, React, Tailwind CSS, MDX content (gray-matter plus next-mdx-remote, remark-gfm, rehype-highlight), next/font with Space Grotesk headings, Instrument Sans body, and JetBrains Mono code, and Lucide icons. Content lives in `content/blog/` and `content/projects/`, independent of the UI. A client-side search index is built from the same MDX data. Theme uses a `data-theme` attribute with a pre-paint script and localStorage persistence.

Design tokens are exact. Light theme: warm paper background `#FFFCF0`, pure white `#FFFFFF`, surface `#F2F0E5`, borders `#E6E4D9` and `#DAD8CE`, near-black text `#100F0F`, secondary text `#222222`, muted `#6F6E69`, subtle `#878580`, red accent `#AF3029` with hover `#DE594C`, blue `#205EA6`, green `#66800B`, amber `#AD8301`, research purple `#5E409D`. Dark theme: background `#100F0F`, alt `#070708`, surface `#1C1B1A`, alt surface `#282726`, border `#403E3C`, primary text `#FFFCF0`, secondary `#CECDC3`, muted `#85847F`, red `#DE594C`, blue `#4385BE`, green `#879A39`, amber `#D0A215`. Red is an accent, never a background. Spacing uses only 4, 8, 12, 16, 20, 24, 32, 48, 64, 80, 96, and 120px. Radii are 4, 8, 10, and 12px. Container max 1200px, homepage about 1140px, article reading width 720 to 760px, about page 720px.

Routes in v1: home, About, Writing (blog index plus article pages), Projects (index plus detail pages), Search with a Ctrl+K palette, plus short honest `/disclosure` and `/privacy` pages and a branded 404. Research and Labs routes are out of v1, because there is not enough verified content to justify them. Projects is in, because real repos exist.

The homepage has a hero with the eyebrow "CYBERSECURITY · ARTIFICIAL INTELLIGENCE · ENGINEERING", a large name heading, one or two short paragraphs, a "Read the writing" pill button plus an "About me" underlined link, a thin separator, Selected writing as 3 to 5 editorial rows, and Topics as compact text links. The blog index groups rows by year, with a monospace date on the left, a bold title, and "N min read" on the right, plus a search input, category filter, and tag filter. Article pages carry reading time above the H1, a breadcrumb, category, subtitle, date, updated date, author, a 720 to 760px column, an in-flow table of contents box, tag pills, word count and date at the end, previous and next links, related articles, and a references section.

Particles are an original canvas implementation: small sparse grey dots plus a few red ones, very slow movement, no connecting lines, no gradients, no mouse following, pausing when hidden, respecting `prefers-reduced-motion`, with a static fallback. Code blocks must be readable in both themes with real syntax highlighting and a copy button on every block. Search must cover titles, descriptions, body, categories, and tags, not titles only.

Content rules from the prompt: real content only, never invent qualifications, job titles, achievements, certifications, vulnerability discoveries, awards, employment history, identifier numbers, severity assessments, vendor acknowledgements, rewards, research results, or publication statistics. Drafts must not be publicly accessible. No fake statistics, testimonials, comments, credentials, or stock photos. No Matrix rain, gradients, glassmorphism, or three-card layouts. Whitespace is intentional. The About page uses a neutral intentional portrait placeholder and does not publish the profile reference photo without explicit say-so. No generated hacker avatar. No newsletter backend: omit the form or label it future-ready, never fake a subscription. The document email is always `mizazhaiderceh@gmail.com`. Credit "Created by Muhammad Izaz Haider" appears on About only. No GitHub repo, no deploy, no push. Local build only.

Where the master prompt conflicts with a generic skill default, the master prompt wins. Recorded rulings: three fonts, not one; no gradients anywhere, including hero headings; the eyebrow line stays; no tagline-reveal, FAQ, proof, or testimonial sections; minimal nav (brand left, About, Writing, theme toggle right), not a floating nav.

## 2. The reference study (summary)

The reference is https://blog.redteamshell.com/, the Hugo blog of Fabrice K., studied live on 18 November 2026. Findings recorded in the parent brief:

- 22 articles, presented as editorial rows, not cards.
- A narrow reading column for articles.
- Near-static particles in the background: very slow, sparse, restrained.
- Minimal navigation: brand on the left, a small number of links, no heavy chrome.
- No search, no filters, and no progress bar on the reference.
- Code on the reference renders pale grey on light grey, which is a known defect. This build must avoid it: code blocks must be readable in both themes with real syntax highlighting.
- The reference uses an eyebrow line above the hero heading, which the master prompt keeps.

What this build takes from the reference: the restrained editorial philosophy (rows not cards, narrow reading column, minimal nav, near-static particles, whitespace as a design choice). What this build adds per the master prompt: real search (Ctrl+K palette plus a search page, over titles, descriptions, body, categories, and tags) and copy buttons on every code block. Both were absent from the reference and are required here.

What this build does not copy: the reference branding, text, images, or identity. No reference article text, no reference images, no reference name or mark, and no reference theme values appear in this repo. The palette, fonts, brand mark, and tagline are the master prompt's own, not the reference's. The reference was studied for structure and restraint only.

## 3. How this record is used

- The master prompt summary in section 1 is the binding spec. If a later decision conflicts with it, the prompt wins.
- The reference summary in section 2 is a study record, not a template. Nothing in it authorises copying reference content or identity.
- Content provenance for the seed articles and projects lives in `docs/CONTENT.md`, not here. This file records the spec and the study; that file records what is real in each article.
