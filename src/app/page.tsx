import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { site } from "@/lib/site";
import { TOPICS } from "@/lib/topics";
import { ArticleRow } from "@/components/ArticleRow";

export const metadata: Metadata = {
  // Home is the one page where the root layout template is not applied
  // to the page title, so the full title is set explicitly here.
  title: {
    absolute: `${site.name} | ${site.brand}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} | ${site.brand}`,
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: `${site.name} | ${site.brand}`,
    description: site.description,
  },
};

export default function Home() {
  const posts = getAllPosts();
  const selected = posts.slice(0, 4);

  return (
    <div className="mx-auto max-w-[1140px] px-6">
      <section className="pb-16 pt-16 md:pb-24 md:pt-24">
        <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
          Cybersecurity &middot; Artificial Intelligence &middot; Engineering
        </p>
        <h1 className="mt-8 font-display text-5xl font-bold leading-tight text-text-primary md:text-7xl">
          Izaz Haider.
        </h1>
        <p className="mt-8 max-w-[720px] text-xl leading-8 text-text-secondary">
          I write about cybersecurity, offensive security, artificial intelligence, software
          engineering and the things I learn while researching, building and experimenting with
          technology.
        </p>
        <p className="mt-4 max-w-[720px] text-base leading-7 text-text-muted">
          {site.tagline} Every article here is written from something I actually built, tested, or
          broke myself.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <Link
            href="/blog"
            className="rounded-full bg-primary px-6 py-3 font-display text-base font-bold text-[#fffcf0] transition-colors hover:bg-primary-hover"
          >
            Read the writing
          </Link>
          <Link
            href="/about"
            className="text-base text-text-primary underline decoration-border underline-offset-8 transition-colors hover:text-primary"
          >
            About me
          </Link>
        </div>
      </section>

      <hr className="border-border" />

      <section className="py-16" aria-labelledby="selected-writing">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="selected-writing" className="font-display text-2xl font-bold text-text-primary">
            Selected writing
          </h2>
          <Link
            href="/blog"
            className="text-sm text-secondary underline underline-offset-4 transition-colors hover:text-primary"
          >
            View all writing
          </Link>
        </div>
        {selected.length === 0 ? (
          <p className="mt-8 text-base leading-7 text-text-muted">
            No articles published yet. Check back soon.
          </p>
        ) : (
          <ul className="mt-8">
            {selected.map((post) => (
              <ArticleRow
                key={post.frontmatter.slug}
                href={`/blog/${post.frontmatter.slug}`}
                date={post.frontmatter.date}
                title={post.frontmatter.title}
                readingTime={post.frontmatter.readingTime}
                category={post.frontmatter.category}
              />
            ))}
          </ul>
        )}
      </section>

      <hr className="border-border" />

      <section className="py-16" aria-labelledby="topics">
        <h2 id="topics" className="font-display text-2xl font-bold text-text-primary">
          Topics
        </h2>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
          {TOPICS.map((topic) => (
            <li key={topic.label}>
              <Link
                href={`/blog?topic=${encodeURIComponent(topic.label)}`}
                className="font-mono text-sm text-text-secondary underline decoration-border underline-offset-4 transition-colors hover:text-primary"
              >
                {topic.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
