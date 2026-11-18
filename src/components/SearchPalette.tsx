"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatDate } from "@/lib/format";
import { searchItems, type SearchItem } from "@/lib/search";

export function SearchPalette({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  const results = useMemo(() => searchItems(items, query), [items, query]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((wasOpen) => !wasOpen);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open ]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>("[data-active='true']");
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function goTo(href: string) {
    setOpen(false);
    router.push(href);
  }

  function onInputKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }
    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      goTo(results[activeIndex].href);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className="sr-only focus:not-sr-only focus:fixed focus:bottom-4 focus:right-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-text-primary"
      >
        Search
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24"
        >
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-[#100f0f] opacity-60"
          />
          <div className="relative w-full max-w-[720px] overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search articles and projects"
                aria-label="Search articles and projects"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="search-palette-results"
                aria-activedescendant={
                  results[activeIndex] ? `search-result-${activeIndex}` : undefined
                }
                className="w-full bg-transparent text-base text-text-primary outline-none placeholder:text-text-subtle"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="rounded-md p-1 text-text-muted transition-colors hover:text-text-primary"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {query.trim() === "" ? (
              <p className="px-4 py-8 text-center text-sm text-text-muted">
                Type to search titles, descriptions, body text, categories, and tags.
              </p>
            ) : results.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-text-muted">
                No results for &ldquo;{query.trim()}&rdquo;. Try a different word.
              </p>
            ) : (
              <ul
                id="search-palette-results"
                ref={listRef}
                role="listbox"
                aria-label="Search results"
                className="max-h-[320px] overflow-y-auto py-2"
              >
                {results.map((result, index) => (
                  <li key={result.href} id={`search-result-${index}`} role="option" aria-selected={index === activeIndex}>
                    <button
                      type="button"
                      data-active={index === activeIndex}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => goTo(result.href)}
                      className={`block w-full px-4 py-3 text-left transition-colors ${
                        index === activeIndex ? "bg-surface" : ""
                      }`}
                    >
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="font-display text-base font-bold text-text-primary">
                          {result.title}
                        </span>
                        {result.date && (
                          <span className="shrink-0 font-mono text-xs text-text-muted">
                            {formatDate(result.date)}
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block font-mono text-xs text-secondary">
                        {result.kind === "article" ? "Article" : "Project"}: {result.category}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-sm leading-6 text-text-muted">
                        {result.excerpt}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="border-t border-border px-4 py-2 font-mono text-xs text-text-subtle">
              Arrow keys to move, Enter to open, Escape to close.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
