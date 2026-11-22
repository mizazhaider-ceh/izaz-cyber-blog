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

type SearchableFrontmatter = Pick<
  SearchItem,
  "slug" | "title" | "description" | "category" | "tags"
>;

/** One search item from either a post or a project frontmatter. */
function toSearchItem(
  kind: SearchItem["kind"],
  fm: SearchableFrontmatter,
  date: string,
  href: string,
  body: string,
): SearchItem {
  return {
    kind,
    slug: fm.slug,
    href,
    title: fm.title,
    description: fm.description,
    category: fm.category,
    tags: fm.tags,
    date,
    body,
  };
}

export function buildSearchIndex(posts: Post[], projects: Project[]): SearchItem[] {
  const postItems: SearchItem[] = posts.map((post) =>
    toSearchItem(
      "article",
      post.frontmatter,
      post.frontmatter.date,
      `/blog/${post.frontmatter.slug}`,
      stripMarkdown(post.content),
    ),
  );
  const projectItems: SearchItem[] = projects.map((project) =>
    toSearchItem(
      "project",
      project.frontmatter,
      "",
      `/projects/${project.frontmatter.slug}`,
      stripMarkdown(project.content),
    ),
  );
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
      const titleLower = item.title.toLowerCase();
      const tagsJoined = item.tags.join(" ").toLowerCase();
      const haystack = [
        titleLower,
        item.description,
        item.category,
        tagsJoined,
        item.body,
      ]
        .join(" ")
        .toLowerCase();
      const titleHits = words.filter((word) =>
        titleLower.includes(word),
      ).length;
      const tagHits = words.filter((word) =>
        tagsJoined.includes(word),
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
