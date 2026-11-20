import Link from "next/link";
import { getSeriesPosition } from "@/lib/series";

/** Series navigation box for an article page. Renders nothing when the article is in no series. */
export function SeriesNav({ slug }: { slug: string }) {
  const position = getSeriesPosition(slug);
  if (!position) {
    return null;
  }
  const { series, index, total, prev, next } = position;
  return (
    <nav
      aria-label={`Series navigation, ${series.title}`}
      className="mt-8 rounded-lg border border-border bg-surface px-6 py-4"
    >
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-muted">
        Series
      </p>
      <p className="mt-2 font-display text-lg font-bold leading-7 text-text-primary">
        <Link href="/series" className="transition-colors hover:text-primary">
          {series.title}
        </Link>
      </p>
      <p className="mt-1 font-mono text-xs text-text-muted">
        Part {index + 1} of {total}
      </p>
      <div className="mt-4 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:justify-between">
        {prev ? (
          <Link href={`/blog/${prev.frontmatter.slug}`} className="group max-w-[320px]">
            <span className="block font-mono text-xs uppercase tracking-widest text-text-muted">
              Previous in series
            </span>
            <span className="mt-2 block text-base font-bold leading-6 text-text-primary transition-colors group-hover:text-primary">
              {prev.frontmatter.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/blog/${next.frontmatter.slug}`}
            className="group max-w-[320px] sm:text-right"
          >
            <span className="block font-mono text-xs uppercase tracking-widest text-text-muted">
              Next in series
            </span>
            <span className="mt-2 block text-base font-bold leading-6 text-text-primary transition-colors group-hover:text-primary">
              {next.frontmatter.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </div>
      <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-text-secondary">
        <Link href="/series" className="transition-colors hover:text-primary">
          View all series
        </Link>
      </p>
    </nav>
  );
}
