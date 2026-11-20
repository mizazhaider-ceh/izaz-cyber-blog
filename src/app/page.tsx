import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { jsonLdScript, personJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { openGraphSite, rssFeedAlternate, twitterCard } from "@/lib/metadata";
import { site } from "@/lib/site";
import { TOPICS } from "@/lib/topics";
import { ArticleRow } from "@/components/ArticleRow";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SignatureMark } from "@/components/SignatureMark";

export const metadata: Metadata = {
  // Home is the one page where the root layout template is not applied
  // to the page title, so the full title is set explicitly here.
  title: {
    absolute: `${site.name} | ${site.brand}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
    ...rssFeedAlternate,
  },
  openGraph: {
    ...openGraphSite,
    type: "website",
    url: site.url,
    title: `${site.name} | ${site.brand}`,
    description: site.description,
    images: [
      {
        url: `${site.url}/og/default.png`,
        width: 1200,
        height: 630,
        alt: `${site.name} | ${site.brand}`,
      },
    ],
  },
  twitter: {
    ...twitterCard,
    card: "summary_large_image",
    title: `${site.name} | ${site.brand}`,
    description: site.description,
    images: [`${site.url}/og/default.png`],
  },
};

export default function Home() {
  const posts = getAllPosts();
  const featured = posts.filter((post) => post.frontmatter.featured);

  return (
    <div className="mx-auto max-w-[1140px] px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd()) }}
      />
      <section className="pb-16 pt-16 md:pb-24 md:pt-24">
        <SignatureMark size={44} className="mb-8 text-text-primary" />
        <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
          Cybersecurity &middot; Artificial Intelligence &middot; Engineering
        </p>
        <h1 className="mt-8 font-display text-5xl font-bold leading-tight text-text-primary md:text-7xl">
          Izaz Haider.
        </h1>
        <p className="mt-8 max-w-[720px] text-xl leading-8 text-text-secondary">
          I write about cybersecurity, offensive security, and artificial intelligence, from
          things I have actually built, tested, or broken.
        </p>
        <p className="mt-4 max-w-[720px] text-base leading-7 text-text-secondary">
          CSCB 2026: #1 Web Junior, #3 overall Junior, #26 of 806, with 26 flags. CNSP with
          Merit.
        </p>
        <p className="mt-4 max-w-[720px] text-base leading-7 text-text-muted">
          Currently building this blog, izaz.dev, and VulnNotes, a mobile security project due
          December 2026.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <Link
            href="/blog"
            className="rounded-full bg-button-bg px-6 py-3 font-display text-base font-bold text-button-text transition-colors hover:bg-button-bg-hover"
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

      <section className="py-16" aria-labelledby="start-here">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="start-here" className="font-display text-2xl font-bold text-text-primary">
            Start here
          </h2>
          <Link
            href="/blog"
            className="text-sm text-secondary underline underline-offset-4 transition-colors hover:text-primary"
          >
            View all writing
          </Link>
        </div>
        {featured.length === 0 ? (
          <p className="mt-8 text-base leading-7 text-text-muted">
            No articles published yet. Check back soon.
          </p>
        ) : (
          <ul className="mt-8">
            {featured.map((post) => (
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
                prefetch={false}
                className="font-mono text-sm text-text-secondary underline decoration-border underline-offset-4 transition-colors hover:text-primary"
              >
                {topic.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <NewsletterSignup />
    </div>
  );
}
