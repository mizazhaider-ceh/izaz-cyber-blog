import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const BLOG_DIR = path.join(CONTENT_DIR, "blog");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");

const WORDS_PER_MINUTE = 200;

export interface PostFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  author: "Muhammad Izaz Haider";
  readingTime: number;
  coverImage?: string;
  draft: false;
  featured: boolean;
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  status: string;
  repo: string;
  draft: false;
  featured: boolean;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  wordCount: number;
}

export interface Project {
  frontmatter: ProjectFrontmatter;
  content: string;
}

function readingTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function readMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .sort();
}

function parsePost(filePath: string): Post | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  if (data.draft === true) {
    return null;
  }
  const frontmatter: PostFrontmatter = {
    title: String(data.title),
    slug: String(data.slug),
    description: String(data.description),
    date: String(data.date),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    category: String(data.category),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: "Muhammad Izaz Haider",
    readingTime: readingTimeMinutes(content),
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    draft: false,
    featured: Boolean(data.featured),
  };
  return { frontmatter, content, wordCount: wordCount(content) };
}

function parseProject(filePath: string): Project | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  if (data.draft === true) {
    return null;
  }
  const frontmatter: ProjectFrontmatter = {
    title: String(data.title),
    slug: String(data.slug),
    description: String(data.description),
    category: String(data.category),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    status: String(data.status),
    repo: String(data.repo),
    draft: false,
    featured: Boolean(data.featured),
  };
  return { frontmatter, content };
}

function byNewestFirst(a: Post, b: Post): number {
  return b.frontmatter.date.localeCompare(a.frontmatter.date);
}

/** All published posts, newest first. Drafts are never returned. */
export function getAllPosts(): Post[] {
  return readMdxFiles(BLOG_DIR)
    .map((file) => parsePost(path.join(BLOG_DIR, file)))
    .filter((post): post is Post => post !== null)
    .sort(byNewestFirst);
}

/** One published post by slug, or null when it does not exist or is a draft. */
export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((post) => post.frontmatter.slug === slug) ?? null;
}

/** All published projects. Drafts are never returned. */
export function getAllProjects(): Project[] {
  return readMdxFiles(PROJECTS_DIR)
    .map((file) => parseProject(path.join(PROJECTS_DIR, file)))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
}

/** One published project by slug, or null when it does not exist or is a draft. */
export function getProjectBySlug(slug: string): Project | null {
  return (
    getAllProjects().find(
      (project) => project.frontmatter.slug === slug,
    ) ?? null
  );
}
