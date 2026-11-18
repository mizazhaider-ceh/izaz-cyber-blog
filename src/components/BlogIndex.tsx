"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Post } from "@/lib/content";
import { stripMarkdown } from "@/lib/format";
import { topicMatchesTopicParam } from "@/lib/topics";
import { ArticleRow } from "./ArticleRow";

const PAGE_SIZE = 5;

interface BlogIndexProps {
  posts: Post[];
}

export function BlogIndex({ posts }: BlogIndexProps) {
  const searchParams = useSearchParams();
  const topicParam = searchParams.get("topic") ?? "";
  const tagParam = searchParams.get("tag") ?? "";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState(tagParam || "All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (tagParam) {
      setTag(tagParam);
    }
  }, [tagParam]);

  useEffect(() => {
    setPage(1);
  }, [query, category, tag, topicParam]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.frontmatter.category))).sort()],
    [posts],
  );
  const tags = useMemo(
    () =>
      ["All", ...Array.from(new Set(posts.flatMap((post) => post.frontmatter.tags))).sort()],
    [posts],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      const fm = post.frontmatter;
      if (topicParam) {
        const haystack = [fm.title, fm.description, fm.category, fm.tags.join(" "), post.content].join(" ");
        if (!topicMatchesTopicParam(topicParam, haystack)) {
          return false;
        }
      }
      if (category !== "All" && fm.category !== category) {
        return false;
      }
      if (tag !== "All" && !fm.tags.includes(tag)) {
        return false;
      }
      if (needle) {
        const haystack = [fm.title, fm.description, fm.category, fm.tags.join(" "), stripMarkdown(post.content)]
          .join(" ")
          .toLowerCase();
        if (!needle.split(/\s+/).every((word) => haystack.includes(word))) {
          return false;
        }
      }
      return true;
    });
  }, [posts, query, category, tag, topicParam]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pagePosts = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const grouped = useMemo(() => {
    const groups = new Map<string, Post[]>();
    for (const post of pagePosts) {
      const year = post.frontmatter.date.slice(0, 4);
      const list = groups.get(year) ?? [];
      list.push(post);
      groups.set(year, list);
    }
    return Array.from(groups.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [pagePosts]);

  const activeFilters = topicParam || query || category !== "All" || tag !== "All";

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setTag("All");
  }

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="blog-search" className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Search the writing
          </label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search titles, body, and tags"
            className="mt-2 w-full rounded-lg border border-border bg-background-pure px-4 py-3 text-base text-text-primary outline-none placeholder:text-text-subtle focus:border-secondary"
          />
        </div>
        <div>
          <label htmlFor="blog-category" className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Category
          </label>
          <select
            id="blog-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-background-pure px-4 py-3 text-base text-text-primary outline-none focus:border-secondary sm:w-auto"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="blog-tag" className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Tag
          </label>
          <select
            id="blog-tag"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-background-pure px-4 py-3 text-base text-text-primary outline-none focus:border-secondary sm:w-auto"
          >
            {tags.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {topicParam && (
        <p className="mt-8 text-sm text-text-muted">
          Topic: <span className="font-bold text-text-primary">{topicParam}</span>
          {" ("}
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          {") "}
          <Link href="/blog" className="text-secondary underline underline-offset-4 hover:text-primary">
            Clear topic
          </Link>
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-display text-xl font-bold text-text-primary">Nothing matches that yet.</p>
          <p className="mt-4 text-base leading-7 text-text-muted">
            {activeFilters
              ? "Try a different search word, or clear the filters below."
              : "No articles have been published yet. Check back soon."}
          </p>
          {activeFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-8 rounded-full border border-border px-6 py-2 font-mono text-sm text-text-primary transition-colors hover:border-primary hover:text-primary"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <>
          {grouped.map(([year, yearPosts]) => (
            <section key={year} aria-label={`Articles from ${year}`} className="mt-12">
              <div className="flex items-baseline gap-8">
                <h2 className="w-20 shrink-0 font-mono text-2xl font-bold text-text-primary">
                  {year}
                </h2>
                <ul className="min-w-0 flex-1">
                  {yearPosts.map((post) => (
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
              </div>
            </section>
          ))}
          <p className="mt-8 text-sm text-text-muted">
            Showing {pagePosts.length} of {filtered.length}{" "}
            {filtered.length === 1 ? "article" : "articles"}.
          </p>
          {pageCount > 1 && (
            <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className="rounded-full border border-border px-4 py-2 font-mono text-sm text-text-primary transition-colors enabled:hover:border-primary enabled:hover:text-primary disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  aria-current={pageNumber === currentPage ? "page" : undefined}
                  className={`rounded-full px-4 py-2 font-mono text-sm transition-colors ${
                    pageNumber === currentPage
                      ? "bg-primary text-[#fffcf0]"
                      : "border border-border text-text-primary hover:border-primary hover:text-primary"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === pageCount}
                onClick={() => setPage(currentPage + 1)}
                className="rounded-full border border-border px-4 py-2 font-mono text-sm text-text-primary transition-colors enabled:hover:border-primary enabled:hover:text-primary disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
