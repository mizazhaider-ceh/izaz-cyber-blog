import { getAllPosts, type Post } from "@/lib/content";

export interface Series {
  slug: string;
  title: string;
  description: string;
  slugs: string[];
}

export const seriesList: Series[] = [
  {
    slug: "web-security",
    title: "Web security",
    description:
      "Attack and defence fundamentals: DNS and recon, HTTP request smuggling, authentication, APIs, and reverse engineering.",
    slugs: [
      "exploring-dns-enumeration",
      "building-network-reconnaissance-automation",
      "understanding-http-request-smuggling",
      "analyzing-insecure-authentication",
      "practical-api-security-testing",
      "exploring-reverse-engineering-fundamentals",
    ],
  },
  {
    slug: "ai-security",
    title: "AI security",
    description:
      "Securing systems that include a model, from prompt injection to application design and the pipelines that ship them.",
    slugs: [
      "an-introduction-to-llm-prompt-injection",
      "security-considerations-in-ai-powered-applications",
      "understanding-devsecops-pipelines",
    ],
  },
  {
    slug: "linux-and-systems",
    title: "Linux and systems",
    description:
      "Building and hardening the systems underneath: a Linux lab and firewall rules, an Android parser, and a PowerShell teaching site.",
    slugs: [
      "building-a-practical-linux-security-lab",
      "understanding-linux-firewall-rules",
      "writing-my-own-android-binary-xml-parser",
      "powershell-academy-18-chapters-one-renderer",
    ],
  },
  {
    slug: "building-in-public",
    title: "Building in public",
    description:
      "Projects and plans built in the open, from a 90 day study plan to a vulnerable lab, a skills library, and a CTF investigation.",
    slugs: [
      "90-days-of-cybersecurity-a-plan-you-can-actually-follow",
      "pentrix-vulnlab-building-a-deliberately-vulnerable-lab",
      "agentarsenal-643-skills-one-manifest",
      "documenting-a-ctf-investigation-cscb-2026",
    ],
  },
];

function getSeriesBySlug(seriesSlug: string): Series | null {
  return seriesList.find((series) => series.slug === seriesSlug) ?? null;
}

function getSeriesForPost(slug: string): Series | null {
  return seriesList.find((series) => series.slugs.includes(slug)) ?? null;
}

/** Posts of a series, in series order. Unknown slugs are skipped. */
export function getSeriesPosts(seriesSlug: string): Post[] {
  const series = getSeriesBySlug(seriesSlug);
  if (!series) {
    return [];
  }
  const bySlug = new Map(getAllPosts().map((post) => [post.frontmatter.slug, post]));
  return series.slugs
    .map((slug) => bySlug.get(slug))
    .filter((post): post is Post => post !== undefined);
}

export interface SeriesPosition {
  series: Series;
  index: number;
  total: number;
  prev: Post | null;
  next: Post | null;
}

/** Position of a post inside its series, or null when it is in no series. */
export function getSeriesPosition(slug: string): SeriesPosition | null {
  const series = getSeriesForPost(slug);
  if (!series) {
    return null;
  }
  const posts = getSeriesPosts(series.slug);
  const index = posts.findIndex((post) => post.frontmatter.slug === slug);
  if (index < 0) {
    return null;
  }
  return {
    series,
    index,
    total: posts.length,
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
