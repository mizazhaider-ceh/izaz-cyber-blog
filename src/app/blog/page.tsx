import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/content";
import { openGraphSite, rssFeedAlternate, twitterCard } from "@/lib/metadata";
import { site } from "@/lib/site";
import { BlogIndex } from "@/components/BlogIndex";

export const metadata: Metadata = {
  title: "The Writing",
  description:
    "Technical notes, practical guides, research and observations from the world of cybersecurity and engineering.",
  alternates: {
    canonical: "/blog",
    ...rssFeedAlternate,
  },
  openGraph: {
    ...openGraphSite,
    type: "website",
    url: `${site.url}/blog`,
    title: `The Writing | ${site.brand}`,
    description:
      "Technical notes, practical guides, research and observations from the world of cybersecurity and engineering.",
  },
  twitter: {
    ...twitterCard,
    title: `The Writing | ${site.brand}`,
    description:
      "Technical notes, practical guides, research and observations from the world of cybersecurity and engineering.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-[1140px] px-6 py-16 md:py-24">
      <h1 className="font-display text-5xl font-bold leading-tight text-text-primary md:text-6xl">
        The Writing
      </h1>
      <p className="mt-8 max-w-[720px] text-xl leading-8 text-text-secondary">
        Technical notes, practical guides, research and observations from the world of cybersecurity
        and engineering.
      </p>
      <p className="mt-6 text-base leading-7 text-text-secondary">
        Prefer to read in order?{" "}
        <Link href="/series" className="text-primary transition-colors hover:underline">
          Browse by series
        </Link>
        .
      </p>
      <div className="mt-12">
        <Suspense fallback={<p className="text-base text-text-muted">Loading articles.</p>}>
          <BlogIndex posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
