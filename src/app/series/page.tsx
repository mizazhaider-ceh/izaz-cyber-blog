import type { Metadata } from "next";
import Link from "next/link";
import { getSeriesPosts, seriesList } from "@/lib/series";
import { site } from "@/lib/site";
import { ArticleRow } from "@/components/ArticleRow";

export const metadata: Metadata = {
  title: "Series",
  description:
    "Read the writing in order: grouped series on web security, AI security, Linux and systems, and building in public.",
  alternates: {
    canonical: "/series",
  },
  openGraph: {
    type: "website",
    url: `${site.url}/series`,
    title: `Series | ${site.brand}`,
    description:
      "Read the writing in order: grouped series on web security, AI security, Linux and systems, and building in public.",
  },
  twitter: {
    card: "summary",
    title: `Series | ${site.brand}`,
    description:
      "Read the writing in order: grouped series on web security, AI security, Linux and systems, and building in public.",
  },
};

export default function SeriesPage() {
  return (
    <div className="mx-auto max-w-[1140px] px-6 py-16 md:py-24">
      <h1 className="font-display text-5xl font-bold leading-tight text-text-primary md:text-6xl">
        Series
      </h1>
      <p className="mt-8 max-w-[720px] text-xl leading-8 text-text-secondary">
        Read the writing in order. Each series follows one topic from first principles to the
        work that builds on it.
      </p>
      <div className="mt-12 flex flex-col gap-12">
        {seriesList.map((series) => {
          const posts = getSeriesPosts(series.slug);
          return (
            <section key={series.slug} id={series.slug} aria-labelledby={`series-${series.slug}`}>
              <h2
                id={`series-${series.slug}`}
                className="font-display text-2xl font-bold text-text-primary"
              >
                <Link href={`/series#${series.slug}`} className="transition-colors hover:text-primary">
                  {series.title}
                </Link>
              </h2>
              <p className="mt-2 max-w-[720px] text-base leading-7 text-text-secondary">
                {series.description}
              </p>
              <p className="mt-2 font-mono text-xs text-text-muted">
                {posts.length} {posts.length === 1 ? "part" : "parts"}
              </p>
              <ol className="mt-6">
                {posts.map((post) => (
                  <ArticleRow
                    key={post.frontmatter.slug}
                    href={`/blog/${post.frontmatter.slug}`}
                    date={post.frontmatter.date}
                    title={post.frontmatter.title}
                    readingTime={post.frontmatter.readingTime}
                    category={post.frontmatter.category}
                  />
                ))}
              </ol>
            </section>
          );
        })}
      </div>
      <p className="mt-12 border-t border-border pt-8 text-base leading-7 text-text-secondary">
        Prefer the newest first?{" "}
        <Link href="/blog" className="text-primary transition-colors hover:underline">
          Browse all writing
        </Link>
        .
      </p>
    </div>
  );
}
