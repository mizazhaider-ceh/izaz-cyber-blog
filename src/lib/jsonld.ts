import type { Post } from "./content";
import { site } from "./site";

/*
 * Structured data (schema.org JSON-LD).
 * Only verified facts go here: name, site URL, the two public profiles,
 * and a job title that fairly describes verified facts (study plus
 * hands-on security work). No birthDate, no invented fields.
 */

const SCHEMA_CONTEXT = "https://schema.org";

/** The author object shared by every JSON-LD document on the site. */
function personRef(): Record<string, unknown> {
  return {
    "@type": "Person",
    name: site.fullName,
    url: site.url,
  };
}

export function personJsonLd(): Record<string, unknown> {
  return {
    "@context": SCHEMA_CONTEXT,
    ...personRef(),
    description: site.tagline,
    jobTitle: "Cybersecurity student and researcher",
    sameAs: [site.github, site.linkedin],
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    name: site.brand,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    author: personRef(),
  };
}

export function articleJsonLd(post: Post): Record<string, unknown> {
  const fm = post.frontmatter;
  const url = `${site.url}/blog/${fm.slug}`;
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Article",
    headline: fm.title,
    description: fm.description,
    author: personRef(),
    datePublished: fm.date,
    dateModified: fm.updatedAt ?? fm.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

/*
 * Small helper component contract: pages render JSON-LD with a plain
 * script tag and JSON.stringify, so no extra component is needed.
 * Keep this helper here so every page serialises the same way.
 */
export function jsonLdScript(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}
