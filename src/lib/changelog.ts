// Public changelog for izaz.dev.
// Read by src/app/changelog/page.tsx, which renders it at /changelog.
//
// How to add an entry (one per deploy):
// 1. Add a new object at the TOP of the list (newest first).
// 2. Use the real deploy date in YYYY-MM-DD form. Never backdate.
// 3. Keep each item to one short line describing a change a reader can see:
//    a page added, a fix shipped, a feature turned on. No traffic numbers,
//    no revenue figures, no invented stats.
// 4. Keep the list honest: only changes that actually shipped in that deploy.

export type ChangelogEntry = {
  date: string;
  title: string;
  items: string[];
};

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-11-20",
    title: "Audit fixes shipped: 53 items",
    items: [
      "Site audit completed (53 items) and all fixes shipped: canonical domain, metadata, OG images, favicon, security headers, analytics, series, reading progress, scroll-spy TOC, share and print, feedback box, and the About portrait.",
      "All 17 articles updated with honest source notes, outbound source links, and internal links. Five new diagrams added where articles had none.",
      "Public changelog page added at /changelog, so site changes are listed by date.",
      "Pre-publish image rules written into docs/CONTENT.md: hero image gets fetchpriority high and is never lazy-loaded, every image carries width and height, CLS re-verified after OG images are added.",
      "Real publishing schedule and format taxonomy written into docs/CONTENT.md, with a content calendar in docs/CONTENT-CALENDAR.md. No backdating.",
      "Newsletter signup built but hidden until a Buttondown account is connected; uptime monitor and Search Console verification still need the site owner.",
    ],
  },
  {
    date: "2026-11-18",
    title: "Blog launched with 17 articles",
    items: [
      "Site created and launched: 17 articles (5 seed articles plus 12 new in-depth articles), project pages, search, RSS feed, and sitemap.",
      "All 12 new articles dated honestly 2026-11-18, each with 2 hand-built inline SVG diagrams. The 5 seed articles shipped without diagrams; diagrams were added to them on 2026-11-20.",
      "Vercel Web Analytics and Speed Insights enabled: cookieless page views and Core Web Vitals, no personal data collected.",
    ],
  },
];
