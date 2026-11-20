import { Children, isValidElement, type ReactNode } from "react";

interface DiagramProps {
  title?: string;
  caption?: string;
  children: ReactNode;
}

/*
 * Figure wrapper for hand-built inline SVG diagrams inside MDX articles.
 * The SVG scales to the figure width (width 100%, height auto) so a
 * diagram reflows on a 390px phone instead of scrolling sideways inside
 * the figure; overflow-x-auto stays as a safety net only. SVG internals
 * use the blog CSS variables (var(--background), var(--text-primary),
 * var(--primary)...) so diagrams follow both themes.
 *
 * Accessible name: most MDX diagrams already name their own SVG with
 * role="img" and aria-labelledby pointing at a nested title and desc.
 * When a diagram arrives without its own accessible name, the wrapper
 * gets role="img" and an aria-label from the title prop (falling back
 * to the caption), so the diagram is still perceivable without sight.
 * The wrapper never adds a second name on top of one the SVG already
 * has, so screen readers announce each diagram exactly once.
 */
export function Diagram({ title, caption, children }: DiagramProps) {
  const accessibleName = title ?? caption ?? "Diagram";
  const elementChildren = Children.toArray(children).filter(isValidElement);
  const singleChild = elementChildren.length === 1 ? elementChildren[0] : null;
  const childProps = (singleChild?.props ?? {}) as {
    "aria-label"?: string;
    "aria-labelledby"?: string;
  };
  const childAlreadyNamed = Boolean(
    childProps["aria-label"] ?? childProps["aria-labelledby"],
  );

  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-surface">
      {title ? (
        <p className="border-b border-border px-6 pt-4 font-mono text-xs font-medium uppercase tracking-widest text-text-muted">
          {title}
        </p>
      ) : null}
      <div className="overflow-x-auto px-6 py-6">
        <div
          className="[&>svg]:mx-auto [&>svg]:block [&>svg]:h-auto [&>svg]:w-full [&>svg]:max-w-full"
          role={childAlreadyNamed ? undefined : "img"}
          aria-label={childAlreadyNamed ? undefined : accessibleName}
        >
          {children}
        </div>
      </div>
      {caption ? (
        <figcaption className="border-t border-border px-6 py-3 text-sm leading-6 text-text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
