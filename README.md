# izaz.dev

Personal blog of **Muhammad Izaz Haider**: cybersecurity, artificial intelligence, and engineering, written from real builds. No invented achievements, no filler sections, no noise. Whitespace is intentional.

Live domain (intended, not yet deployed): **https://izaz.dev**

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 App Router, React 19 |
| Language | TypeScript, strict mode |
| Styling | Tailwind CSS v4, CSS-first tokens in `src/app/globals.css` |
| Content | MDX in `content/blog/` and `content/projects/`, parsed with `gray-matter` and rendered with `next-mdx-remote`, `remark-gfm`, `rehype-highlight` |
| Fonts | `next/font`: Space Grotesk (headings), Instrument Sans (body), JetBrains Mono (code) |
| Icons | `lucide-react` |
| Theme | `data-theme` attribute on `<html>`, pre-paint script, `localStorage` persistence |
| Runtime | Node v24.22.1, npm 10.9.4 |

## How to run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, must pass clean
npm run start    # serve the production build
npx tsc --noEmit # type check, must pass clean
```

No environment variables are needed. No database, no CMS, no newsletter backend. Content is plain files in this repo.

## How to publish an article

1. Create `content/blog/<slug>.mdx` with this frontmatter:

```yaml
---
title: "Article title"
slug: "article-slug"
description: "One honest sentence about what the reader will learn."
date: "2026-11-18"
category: "Security"
tags: ["android", "frida"]
author: "Muhammad Izaz Haider"
draft: false
featured: false
---
```

2. Write the article in Markdown with GitHub Flavoured Markdown (tables, task lists, footnotes all work). Code blocks get real syntax highlighting and a copy button automatically.
3. `date` is the real build date of the work described, never a made-up date. `readingTime` is computed from word count at 200 words per minute, never typed by hand.
4. Set `draft: true` while writing. Drafts are never publicly accessible. Flip to `false` only when the article is verified.
5. Run `npm run build` and check the article renders in both themes before committing.

Projects work the same way in `content/projects/<slug>.mdx`, one file per real repo, with problem, approach, stack, status, repo link, and honest limits.

## Content rules (binding)

These come from the project plan and are not optional:

- **Real content only.** Never invent qualifications, job titles, achievements, certifications, vulnerability discoveries, awards, employment history, CVE numbers, severity assessments, vendor acknowledgements, bug bounty rewards, research results, or publication statistics.
- **No Howest, university, course code, lecturer, or professor mention** anywhere on the public site.
- **No 269/269 figure or any test-pass counts.** No 16.40/20 GPA anywhere. GPA only as 16.74/20 weighted or 16.58/20 unweighted, and only where relevant.
- **No bounty program names, report titles, IDs, endpoints, or reward amounts.** Vulnerability categories only.
- **Flag storage is never disclosed.** The only approved sentence: flags are randomly generated per install at first boot, no flag literal exists in any tracked file, only genuine exploits earn flags.
- **Contact email is always `mizazhaiderceh@gmail.com`.** Never any other address.
- **Credit reads "Created by Muhammad Izaz Haider"**, on About only.
- **No fake statistics, testimonials, comments, credentials, or stock photos.** No Matrix rain, no gradients, no glassmorphism, no purple-to-blue anything, no three-card layouts, no decorative badges.
- **No newsletter backend.** The form is omitted, never faked.
- **No em dashes** in any file. Use commas, colons, or parentheses instead.
- **About page uses a neutral intentional portrait placeholder.** Never publish the reference photo without explicit approval. No generated hacker avatar.

## Design tokens

Exact palette, defined once in `src/app/globals.css` as CSS custom properties and exposed to Tailwind through `@theme inline`. Light is the default.

| Token | Light | Dark |
| --- | --- | --- |
| `--background` | `#FFFCF0` | `#100F0F` |
| `--background-pure` | `#FFFFFF` | `#100F0F` |
| `--surface` | `#F2F0E5` | `#1C1B1A` |
| `--surface-alt` | `#FAFAFA` | `#282726` |
| `--surface-border` | `#E6E4D9` | `#403E3C` |
| `--border` | `#DAD8CE` | `#403E3C` |
| `--text-primary` | `#100F0F` | `#FFFCF0` |
| `--text-secondary` | `#222222` | `#CECDC3` |
| `--text-muted` | `#6F6E69` | `#85847F` |
| `--text-subtle` | `#878580` | `#85847F` |
| `--primary` (red accent) | `#AF3029` | `#DE594C` |
| `--primary-hover` | `#DE594C` | `#DE594C` |
| `--secondary` | `#205EA6` | `#4385BE` |
| `--success` | `#66800B` | `#879A39` |
| `--warning` | `#AD8301` | `#D0A215` |
| `--research` | `#5E409D` | `#9D8BD0` |

Red is an accent, never a background. Headings are solid `--text-primary`, never gradient text.

- **Fonts:** Space Grotesk headings, Instrument Sans body, JetBrains Mono code, with system fallbacks.
- **Spacing scale only:** 4, 8, 12, 16, 20, 24, 32, 48, 64, 80, 96, 120px. No other spacing values.
- **Radii only:** 4, 8, 10, 12px.
- **Widths:** container max 1200px, homepage about 1140px, article column 720 to 760px, About 720px.
- **Code blocks:** always a dark surface in both themes, with bright multicolour highlighting. Pale text on light grey is a known defect of the reference blog and is deliberately avoided here.
- **Particles:** original canvas, small sparse grey dots plus a few red, very slow drift, no connecting lines, no gradients, no mouse following. Pauses when the page is hidden, renders static dots once under `prefers-reduced-motion`.

## Project structure

```
izaz-dev-blog/
  content/
    blog/        # MDX articles (Task 2)
    projects/    # MDX project pages (Task 2)
  docs/
    PLAN.md          # Binding implementation plan
    ARCHITECTURE.md  # Stack choice, file map, theme system, pipelines
  public/
    favicon.svg
  src/
    app/
      layout.tsx     # Fonts, pre-paint theme script, Header, Footer, Particles
      page.tsx       # Home (full version in Task 3)
      globals.css    # Design tokens, base styles, highlight.js colours
    components/
      Header.tsx / Footer.tsx / ThemeProvider.tsx / ThemeToggle.tsx / Particles.tsx
    lib/
      site.ts        # Single brand config file
```

## Status

- Task 1 (scaffold and design system): done.
- Task 2 (real content): next, owned by the content agent.
- Task 3 (pages), Task 4 (SEO and accessibility), Task 5 (QA and browser verification): planned in `docs/PLAN.md`.

No GitHub repo, no deploy, no push. Local build only until izaz says otherwise.
