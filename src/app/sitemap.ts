import type { MetadataRoute } from "next";
import { getAllPosts, getAllProjects } from "@/lib/content";
import { site } from "@/lib/site";

/*
 * Sitemap: all published posts (newest first) and projects, plus the
 * static routes. The search page is intentionally left out: it is a
 * utility page with no indexable content of its own.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.frontmatter.slug}`,
    lastModified: post.frontmatter.updatedAt ?? post.frontmatter.date,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const projects = getAllProjects().map((project) => ({
    url: `${site.url}/projects/${project.frontmatter.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "weekly", priority: 1.0 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/disclosure`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.4 },
  ];

  return [...posts, ...projects, ...staticRoutes];
}
