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
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
            <Link
              href={`#${heading.id}`}
              className="text-sm leading-6 text-text-secondary transition-colors hover:text-primary"
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
