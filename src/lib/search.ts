import type { Post, Project } from "./content";
import { stripMarkdown } from "./format";

export interface SearchItem {
  kind: "article" | "project";
  slug: string;
  href: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  body: string;
}

export interface SearchResult extends SearchItem {
  excerpt: string;
}

export function buildSearchIndex(posts: Post[], projects: Project[]): SearchItem[] {
  const postItems: SearchItem[] = posts.map((post) => ({
    kind: "article",
    slug: post.frontmatter.slug,
    href: `/blog/${post.frontmatter.slug}`,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    category: post.frontmatter.category,
    tags: post.frontmatter.tags,
    date: post.frontmatter.date,
    body: stripMarkdown(post.content),
  }));
  const projectItems: SearchItem[] = projects.map((project) => ({
    kind: "project",
    slug: project.frontmatter.slug,
    href: `/projects/${project.frontmatter.slug}`,
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    category: project.frontmatter.category,
    tags: project.frontmatter.tags,
    date: "",
    body: stripMarkdown(project.content),
  }));
  return [...postItems, ...projectItems];
}

function makeExcerpt(item: SearchItem, query: string): string {
  const haystack = `${item.description} ${item.body}`;
  const index = haystack.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) {
    return item.description;
  }
  const start = Math.max(0, index - 60);
  const end = Math.min(haystack.length, index + query.length + 120);
  const snippet = haystack.slice(start, end).trim();
  return `${start > 0 ? "..." : ""}${snippet}${end < haystack.length ? "..." : ""}`;
}

export function searchItems(items: SearchItem[], rawQuery: string): SearchResult[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) {
    return [];
  }
  const words = query.split(/\s+/).filter(Boolean);
  const scored = items
    .map((item) => {
      const haystack = [
        item.title,
        item.description,
        item.category,
        item.tags.join(" "),
        item.body,
      ]
        .join(" ")
        .toLowerCase();
      const titleHits = words.filter((word) =>
        item.title.toLowerCase().includes(word),
      ).length;
      const tagHits = words.filter((word) =>
        item.tags.join(" ").toLowerCase().includes(word),
      ).length;
      const allMatch = words.every((word) => haystack.includes(word));
      if (!allMatch) {
        return null;
      }
      const score = titleHits * 10 + tagHits * 5 + words.length;
      return { item, score };
    })
    .filter((entry): entry is { item: SearchItem; score: number } => entry !== null)
    .sort((a, b) => b.score - a.score || b.item.date.localeCompare(a.item.date));
  return scored.map(({ item }) => ({
    ...item,
    excerpt: makeExcerpt(item, query),
  }));
}
