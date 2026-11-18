import { getAllPosts } from "@/lib/content";
import { site } from "@/lib/site";

/*
 * RSS 2.0 feed at /rss (chosen route; also linked from the layout
 * metadata as application/rss+xml). All published posts, newest first.
 */

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(): Response {
  const posts = getAllPosts();
  const newest = posts[0];
  const lastBuildDate = newest
    ? new Date(`${newest.frontmatter.date}T00:00:00Z`).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const fm = post.frontmatter;
      const url = `${site.url}/blog/${fm.slug}`;
      const pubDate = new Date(`${fm.date}T00:00:00Z`).toUTCString();
      return [
        "    <item>",
        `      <title>${escapeXml(fm.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <description>${escapeXml(fm.description)}</description>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    `    <title>${escapeXml(site.brand)}</title>`,
    `    <link>${escapeXml(site.url)}</link>`,
    `    <description>${escapeXml(site.tagline)}</description>`,
    "    <language>en</language>",
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(feed, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
