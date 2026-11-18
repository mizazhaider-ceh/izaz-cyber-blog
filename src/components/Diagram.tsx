import type { ReactNode } from "react";

interface DiagramProps {
  title?: string;
  caption?: string;
  children: ReactNode;
}

/*
 * Figure wrapper for hand-built inline SVG diagrams inside MDX articles.
 * The SVG keeps its natural width (min 640px) and scrolls horizontally
 * inside the figure on small screens, so the page itself never overflows
 * and diagram text stays readable. SVG internals use the blog CSS
 * variables (var(--background), var(--text-primary), var(--primary)...)
 * so diagrams follow both themes.
 */
export function Diagram({ title, caption, children }: DiagramProps) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-surface">
      {title ? (
        <p className="border-b border-border px-6 pt-4 font-mono text-xs font-medium uppercase tracking-widest text-text-muted">
          {title}
        </p>
      ) : null}
      <div className="overflow-x-auto px-6 py-6 [&>svg]:mx-auto [&>svg]:block [&>svg]:h-auto [&>svg]:min-w-[640px] [&>svg]:w-full">
        {children}
      </div>
      {caption ? (
        <figcaption className="border-t border-border px-6 py-3 text-sm leading-6 text-text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
