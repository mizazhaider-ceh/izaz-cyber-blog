import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/content";
import { site } from "@/lib/site";
import { BlogIndex } from "@/components/BlogIndex";

export const metadata: Metadata = {
  title: "The Writing",
  description:
    "Technical notes, practical guides, research and observations from the world of cybersecurity and engineering.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: `${site.url}/blog`,
    title: `The Writing | ${site.brand}`,
    description:
      "Technical notes, practical guides, research and observations from the world of cybersecurity and engineering.",
  },
  twitter: {
    card: "summary",
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
      <div className="mt-12">
        <Suspense fallback={<p className="text-base text-text-muted">Loading articles.</p>}>
          <BlogIndex posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
