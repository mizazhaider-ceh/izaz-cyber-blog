import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { formatDate, slugify } from "@/lib/format";
import { articleJsonLd, jsonLdScript } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { ArticleRow } from "@/components/ArticleRow";
import { MdxContent } from "@/components/MdxContent";
import { TableOfContents, type TocHeading } from "@/components/TableOfContents";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Article not found" };
  }
  const fm = post.frontmatter;
  const url = `${site.url}/blog/${fm.slug}`;
  return {
    title: fm.title,
    description: fm.description,
    authors: [{ name: fm.author, url: site.url }],
    alternates: {
      canonical: `/blog/${fm.slug}`,
    },
    openGraph: {
      type: "article",
      url,
      title: `${fm.title} | ${site.brand}`,
      description: fm.description,
      authors: [fm.author],
      publishedTime: fm.date,
      modifiedTime: fm.updatedAt ?? fm.date,
      tags: fm.tags,
    },
    twitter: {
      card: "summary",
      title: `${fm.title} | ${site.brand}`,
      description: fm.description,
    },
  };
}

function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  for (const line of content.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (match) {
      const text = match[2].trim();
      headings.push({ id: slugify(text), text, level: match[1].length });
    }
  }
  return headings;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }
  const fm = post.frontmatter;
  const headings = extractHeadings(post.content);
  const allPosts = getAllPosts();
  const index = allPosts.findIndex((entry) => entry.frontmatter.slug === slug);
  const newer = index > 0 ? allPosts[index - 1] : null;
  const older = index >= 0 && index < allPosts.length - 1 ? allPosts[index + 1] : null;
  const related = allPosts
    .filter((entry) => entry.frontmatter.slug !== slug)
    .map((entry) => {
      const sameCategory = entry.frontmatter.category === fm.category ? 2 : 0;
      const sharedTags = entry.frontmatter.tags.filter((tag) => fm.tags.includes(tag)).length;
      return { entry, score: sameCategory + sharedTags };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.entry);

  return (
    <div className="mx-auto max-w-[1140px] px-6 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd(post)) }}
      />
      <article className="mx-auto max-w-[760px]">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-text-muted">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <Link href="/blog" className="transition-colors hover:text-primary">
            Writing
          </Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-text-secondary">
            {fm.category}
          </span>
        </nav>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-primary">
          {fm.category}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-text-primary md:text-5xl">
          {fm.title}
        </h1>
        <p className="mt-6 text-xl leading-8 text-text-secondary">{fm.description}</p>

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-8 font-mono text-xs text-text-muted">
          <span>{fm.author}</span>
          <span aria-hidden="true">|</span>
          <time dateTime={fm.date}>Published {formatDate(fm.date)}</time>
          {fm.updatedAt && (
            <>
              <span aria-hidden="true">|</span>
              <time dateTime={fm.updatedAt}>Updated {formatDate(fm.updatedAt)}</time>
            </>
          )}
          <span aria-hidden="true">|</span>
          <span>{fm.readingTime} min read</span>
        </div>

        <TableOfContents headings={headings} />

        <MdxContent source={post.content} />

        <div className="mt-12 flex flex-wrap gap-2" aria-label="Tags">
          {fm.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="rounded-full border border-border px-4 py-1 font-mono text-xs text-text-secondary transition-colors hover:border-primary hover:text-primary"
            >
              {tag}
            </Link>
          ))}
        </div>

        <p className="mt-12 border-t border-border pt-8 font-mono text-xs text-text-muted">
          {post.wordCount} words. Published {formatDate(fm.date)}
          {fm.updatedAt ? `, updated ${formatDate(fm.updatedAt)}` : ""}. Written by {fm.author}.
        </p>
      </article>

      {(newer || older) && (
        <nav aria-label="Previous and next articles" className="mx-auto mt-16 max-w-[760px] border-t border-border pt-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            {older ? (
              <Link href={`/blog/${older.frontmatter.slug}`} className="group max-w-[320px]">
                <span className="block font-mono text-xs uppercase tracking-widest text-text-muted">
                  Older
                </span>
                <span className="mt-2 block font-display text-base font-bold leading-6 text-text-primary transition-colors group-hover:text-primary">
                  {older.frontmatter.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link
                href={`/blog/${newer.frontmatter.slug}`}
                className="group max-w-[320px] sm:text-right"
              >
                <span className="block font-mono text-xs uppercase tracking-widest text-text-muted">
                  Newer
                </span>
                <span className="mt-2 block font-display text-base font-bold leading-6 text-text-primary transition-colors group-hover:text-primary">
                  {newer.frontmatter.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-writing" className="mx-auto mt-16 max-w-[760px] border-t border-border pt-8">
          <h2 id="related-writing" className="font-display text-2xl font-bold text-text-primary">
            Related writing
          </h2>
          <ul className="mt-8">
            {related.map((entry) => (
              <ArticleRow
                key={entry.frontmatter.slug}
                href={`/blog/${entry.frontmatter.slug}`}
                date={entry.frontmatter.date}
                title={entry.frontmatter.title}
                readingTime={entry.frontmatter.readingTime}
                category={entry.frontmatter.category}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
