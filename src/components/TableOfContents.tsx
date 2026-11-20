"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) {
      return;
    }

    const visible = new Set<string>();
    const pickActive = () => {
      for (const heading of headings) {
        if (visible.has(heading.id)) {
          setActiveId(heading.id);
          return;
        }
      }
      setActiveId(null);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }
        pickActive();
      },
      { rootMargin: "0px 0px -70% 0px" },
    );

    for (const element of elements) {
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }
  return (
    <nav
      aria-label="Table of contents"
      className="my-8 rounded-lg border border-border bg-surface px-6 py-4"
    >
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-muted">
        On this page
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li
              key={heading.id}
              className={heading.level === 3 ? "pl-4" : ""}
            >
              <Link
                href={`#${heading.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`block border-l-2 py-0.5 pl-3 text-sm leading-6 transition-colors hover:text-primary ${
                  isActive
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent text-text-secondary"
                }`}
              >
                {heading.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
