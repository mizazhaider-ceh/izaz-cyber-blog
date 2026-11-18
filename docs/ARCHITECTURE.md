# Architecture: izaz.dev

## Fresh start

This is a fresh project. When Task 1 started, the directory contained only `docs/PLAN.md` and the empty folders `content/blog/` and `content/projects/`. There was no existing code, no framework, no package manager state, no prior design system, and nothing to migrate or preserve. Every file in the repo was created from the plan, in this task, except `docs/PLAN.md` itself. That matters for review: there are no hidden legacy decisions to work around.

## Stack choice

**Next.js 15 App Router with TypeScript strict, React 19, Tailwind CSS v4.**

- App Router fits a content site: file-based routes, per-page metadata, static rendering of MDX articles by default, and no client JavaScript needed for reading pages.
- TypeScript strict catches frontmatter and component contract mistakes at build time instead of in the browser.
- Tailwind v4 is CSS-first: design tokens live as plain CSS custom properties in `src/app/globals.css` and are exposed to utilities through `@theme inline`. There is no separate `tailwind.config.ts` to drift out of sync with the CSS, which matches the plan's allowance for a v4 CSS-first setup.
- MDX is `gray-matter` for frontmatter plus `next-mdx-remote` for rendering, with `remark-gfm` for tables and task lists and `rehype-highlight` for syntax highlighting. Content stays as plain files, independent of the UI, so articles can be edited, reviewed, and versioned without touching components.
- `next/font` loads Space Grotesk, Instrument Sans, and JetBrains Mono with system fallbacks and no external font requests at runtime.
- `lucide-react` supplies the few icons the shell needs (theme toggle, mobile menu). No icon font, no emoji icons.

Installed versions at scaffold time: Next.js 15.5.29, React 19.3.1, Tailwind CSS 4.3.5, TypeScript 5.9.3, gray-matter 4.0.3, next-mdx-remote 5.0.0, remark-gfm 4.0.1, rehype-highlight 7.0.2, lucide-react 0.544.0. Node v24.22.1, npm 10.9.4.

## File map

```
package.json            # Scripts: dev, build, start. No lint script wiring beyond Next defaults.
next.config.mjs         # reactStrictMode on. Nothing else yet.
postcss.config.mjs      # @tailwindcss/postcss, required by Tailwind v4.
tsconfig.json           # strict, bundler module resolution, @/* maps to ./src/*.
src/app/layout.tsx      # Root layout: fonts, metadata, pre-paint theme script,
                        # skip link, ThemeProvider, Particles, Header, main, Footer.
src/app/page.tsx        # Minimal home placeholder. Full homepage is Task 3.
src/app/globals.css     # All design tokens, base styles, focus styles, selection,
                        # reduced-motion rules, highlight.js token colours.
src/lib/site.ts         # Single brand config: name, brand, tagline, email,
                        # GitHub, LinkedIn, nav links, footer links.
src/components/ThemeProvider.tsx  # Theme state, localStorage persistence.
src/components/ThemeToggle.tsx    # Sun/Moon button, inert placeholder until mounted.
src/components/Particles.tsx      # Original canvas particle field.
src/components/Header.tsx         # Sticky 65px header, brand mark, nav, mobile menu.
src/components/Footer.tsx         # Two centred small monospace lines.
public/favicon.svg      # Dark square, "$" in warm white, red cursor block.
content/blog/           # Empty. Owned by Task 2.
content/projects/       # Empty. Owned by Task 2.
docs/PLAN.md            # Binding plan for all five tasks.
docs/ARCHITECTURE.md    # This file.
README.md               # What the site is, how to run it, how to publish, content rules.
```

## Theme system

The theme is a `data-theme` attribute (`light` or `dark`) on `<html>`. All colour tokens are CSS custom properties defined in `:root` for light and overridden under `[data-theme="dark"]`. Tailwind utilities such as `bg-background` or `text-text-muted` resolve through `@theme inline` to those variables, so switching the attribute repaints the whole site with no class changes and no JavaScript-driven style recalculation per component.

Three parts prevent a flash of the wrong theme:

1. `layout.tsx` sets `data-theme="light"` on `<html>` and adds `suppressHydrationWarning`, because the script below may change the attribute before React hydrates.
2. An inline script in `<head>` runs before first paint. It reads `localStorage` key `izaz-dev-theme`, accepts only `light` or `dark`, defaults to `light`, and sets `data-theme`. It is wrapped in try/catch so blocked storage still yields light.
3. `ThemeProvider` is a client component that syncs its React state with the stored value on mount and persists every toggle to `localStorage`. The visible theme is already correct from step 2; the provider only aligns the toggle icon. `ThemeToggle` renders a same-size inert placeholder until the provider reports mounted, so no wrong icon flashes and the header never shifts.

Dark tokens are the exact values from the plan, including the lighter red `#DE594C` used as primary in dark mode so the accent stays readable on the near-black background.

## Content pipeline (Task 2 builds on this)

Content lives in `content/blog/` and `content/projects/` as `.mdx` files with frontmatter. The planned loader (`src/lib/content.ts`, Task 2) reads each file with `gray-matter`, computes `readingTime` from word count at 200 words per minute, sorts newest first, and excludes any file with `draft: true`. Drafts are never publicly accessible. Rendering uses `next-mdx-remote` with `remark-gfm` and `rehype-highlight`, so GitHub Flavoured Markdown and fenced code blocks work out of the box.

Frontmatter contract (from the plan):

```ts
{
  title: string;
  slug: string;
  description: string;
  date: string;        // real build date of the work described
  updatedAt?: string;
  category: string;
  tags: string[];
  author: "Muhammad Izaz Haider";
  readingTime: number; // computed, never typed by hand
  coverImage?: string;
  draft: boolean;
  featured: boolean;
}
```

Dates and claims must trace to a real repo README or the verified facts list in the plan. Nothing is invented to fill a gap.

## Search design (Task 3 builds on this)

Search is client-side over the same MDX data the pages use, so it can never drift from the published articles. The planned design:

- One index built at build time from every published post and project: title, description, body text, category, and tags. Search must match body content, not titles only.
- A search page (`/app/search/page.tsx`) with a text input, category filter, and tag filter, plus a `Ctrl+K` / `Cmd+K` palette (`SearchPalette.tsx`) available from anywhere.
- Results show title, category, excerpt, and date. Empty and no-results states are explicit, not blank.
- No search backend, no analytics, no tracking. The index ships with the site and runs entirely in the browser.

## Pages and routes (Task 3)

Routes planned in the layout shell, with the header already linking to them: `/` home, `/about`, `/blog`, `/blog/[slug]`, `/projects`, `/projects/[slug]`, `/search`, `/disclosure`, `/privacy`, plus a branded 404. Research and Labs routes are out of v1 by plan ruling: not enough verified content justifies them yet.

## Accessibility and performance notes

- Skip link to `#main-content` is the first focusable element, visible on focus.
- Visible `:focus-visible` outline in secondary blue with a 2px offset, on every interactive element.
- Theme toggle and mobile menu button carry `aria-label` and `aria-expanded` where applicable. The mobile menu closes on route change.
- Particles respect `prefers-reduced-motion` (static dots, drawn once) and pause on `visibilitychange` and when scrolled out of view. A global reduced-motion rule in `globals.css` also collapses animation and transition durations.
- Code blocks use a dark surface with bright highlighting in both themes, so code is readable in light and dark. This is a deliberate fix for the reference blog's pale-on-light code defect.
- Fonts are self-hosted through `next/font`. No external requests are needed to render a page. Particles are a single canvas with at most 56 dots and one `requestAnimationFrame` loop, paused whenever it cannot be seen.
- Every page must be checked at 360px width with zero horizontal overflow (Task 5).

## What this task deliberately did not do

- No article or project content: `content/blog/` and `content/projects/` are untouched and still empty. Another agent owns them in Task 2.
- No full homepage, About, blog index, article template, search, disclosure, or privacy pages: those are Task 3, built on this shell.
- No SEO extras (sitemap, RSS, JSON-LD): Task 4.
- No GitHub repo, no push, no deploy. Local build only, per the plan.
