"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { formatDate } from "@/lib/format";
import { searchItems, type SearchItem } from "@/lib/search";

export function SearchPageContent({ items }: { items: SearchItem[] }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => searchItems(items, query), [items, query]);
  const searched = query.trim() !== "";

  return (
    <div>
      <label htmlFor="site-search" className="font-mono text-xs uppercase tracking-widest text-text-muted">
        Search articles and projects
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try pentrix, parser, manifest, or powershell"
        autoFocus
        className="mt-2 w-full rounded-lg border border-border bg-background-pure px-4 py-3 text-base text-text-primary outline-none placeholder:text-text-subtle focus:border-secondary"
      />
      <p className="mt-4 font-mono text-xs text-text-muted">
        Press Ctrl+K or Cmd+K anywhere on the site to open the quick search.
      </p>

      {!searched ? (
        <div className="py-16 text-center">
          <p className="font-display text-xl font-bold text-text-primary">Search the whole site.</p>
          <p className="mx-auto mt-4 max-w-[560px] text-base leading-7 text-text-muted">
            Search covers article titles, descriptions, body text, categories, and tags, and project
            titles, descriptions, and tags too.
          </p>
          <p className="mt-8 font-mono text-sm text-text-muted">
            {items.length} pages indexed.
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-display text-xl font-bold text-text-primary">
            No results for &ldquo;{query.trim()}&rdquo;.
          </p>
          <p className="mx-auto mt-4 max-w-[560px] text-base leading-7 text-text-muted">
            Try a single word from the article, a category such as Web Security, or a tag such as
            powershell.
          </p>
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-sm text-text-muted">
            {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{query.trim()}&rdquo;.
          </p>
          <ul className="mt-4">
            {results.map((result) => (
              <li key={result.href} className="border-b border-dashed border-border py-6 first:pt-0 last:border-b-0">
                <Link href={result.href} className="group block">
                  <span className="flex flex-wrap items-baseline justify-between gap-4">
                    <span className="font-display text-lg font-bold leading-7 text-text-primary transition-colors group-hover:text-primary">
                      {result.title}
                    </span>
                    {result.date && (
                      <time dateTime={result.date} className="font-mono text-xs text-text-muted">
                        {formatDate(result.date)}
                      </time>
                    )}
                  </span>
                  <span className="mt-1 block font-mono text-xs text-secondary">
                    {result.kind === "article" ? "Article" : "Project"}: {result.category}
                  </span>
                  <span className="mt-2 block text-base leading-7 text-text-muted">
                    {result.excerpt}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
