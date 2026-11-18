import Link from "next/link";
import { formatDate } from "@/lib/format";

interface ArticleRowProps {
  href: string;
  date: string;
  title: string;
  readingTime?: number;
  category?: string;
}

export function ArticleRow({ href, date, title, readingTime, category }: ArticleRowProps) {
  return (
    <li className="border-b border-border py-6 first:pt-0 last:border-b-0">
      <Link href={href} className="group grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 sm:grid-cols-[120px_1fr_auto] sm:items-baseline sm:gap-x-6">
        <time
          dateTime={date}
          className="font-mono text-xs text-text-muted sm:text-sm"
        >
          {formatDate(date)}
        </time>
        <span className="col-span-2 font-display text-lg font-bold leading-7 text-text-primary transition-colors group-hover:text-primary sm:col-span-1">
          {title}
        </span>
        <span className="col-span-2 flex items-center gap-3 font-mono text-xs text-text-muted sm:col-span-1">
          {category && <span>{category}</span>}
          {readingTime !== undefined && <span>{readingTime} min read</span>}
        </span>
      </Link>
    </li>
  );
}
