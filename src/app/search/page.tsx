import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts, getAllProjects } from "@/lib/content";
import { buildSearchIndex } from "@/lib/search";
import { SearchPageContent } from "@/components/SearchPageContent";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every article and project on izaz.dev.",
  alternates: {
    canonical: "/search",
  },
  // Search results pages carry no indexable content of their own.
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  const items = buildSearchIndex(getAllPosts(), getAllProjects());
  return (
    <div className="mx-auto max-w-[760px] px-6 py-16 md:py-24">
      <h1 className="font-display text-5xl font-bold leading-tight text-text-primary md:text-6xl">
        Search
      </h1>
      <p className="mt-8 text-xl leading-8 text-text-secondary">
        Search every article and project on this site.
      </p>
      <div className="mt-12">
        <Suspense fallback={<p className="text-base text-text-muted">Loading search.</p>}>
          <SearchPageContent items={items} />
        </Suspense>
      </div>
    </div>
  );
}
