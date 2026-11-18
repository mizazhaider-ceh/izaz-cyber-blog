import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import {
  Children,
  isValidElement,
  type ComponentType,
  type ReactNode,
} from "react";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { slugify } from "@/lib/format";

function textFromChildren(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(textFromChildren).join("");
  }
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return textFromChildren(props.children);
  }
  return "";
}

function PreBlock({ children }: { children?: ReactNode }) {
  const codeElement = Children.toArray(children).find(
    (child): child is React.ReactElement<{ className?: string; children?: ReactNode }> =>
      isValidElement(child),
  );
  if (!codeElement) {
    return <pre>{children}</pre>;
  }
  const className = codeElement.props.className ?? "";
  const language = className.replace(/^language-/, "") || undefined;
  const code = textFromChildren(codeElement.props.children);
  return (
    <div className="my-8">
      <CodeBlock code={code} language={language}>
        {codeElement}
      </CodeBlock>
    </div>
  );
}

function heading(level: 2 | 3) {
  const Tag = `h${level}` as "h2" | "h3";
  const HeadingComponent = ({ children }: { children?: ReactNode }) => {
    const text = textFromChildren(children);
    const id = slugify(text);
    const className =
      level === 2
        ? "mb-4 mt-12 scroll-mt-24 font-display text-2xl font-bold leading-8 text-text-primary"
        : "mb-4 mt-8 scroll-mt-24 font-display text-xl font-bold leading-7 text-text-primary";
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  };
  return HeadingComponent;
}

const components: Record<string, ComponentType<Record<string, unknown>>> = {
  pre: PreBlock as ComponentType<Record<string, unknown>>,
  Callout: Callout as unknown as ComponentType<Record<string, unknown>>,
  h2: heading(2) as ComponentType<Record<string, unknown>>,
  h3: heading(3) as ComponentType<Record<string, unknown>>,
  p: (({ children }: { children?: ReactNode }) => (
    <p className="mb-6 text-base leading-8 text-text-secondary">{children}</p>
  )) as ComponentType<Record<string, unknown>>,
  a: (({ href, children }: { href?: string; children?: ReactNode }) => {
    const external = href ? /^https?:\/\//.test(href) : false;
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="text-secondary underline decoration-border underline-offset-4 transition-colors hover:text-primary"
      >
        {children}
      </a>
    );
  }) as ComponentType<Record<string, unknown>>,
  ul: (({ children }: { children?: ReactNode }) => (
    <ul className="mb-6 list-disc space-y-2 pl-6 text-base leading-7 text-text-secondary marker:text-text-muted">
      {children}
    </ul>
  )) as ComponentType<Record<string, unknown>>,
  ol: (({ children }: { children?: ReactNode }) => (
    <ol className="mb-6 list-decimal space-y-2 pl-6 text-base leading-7 text-text-secondary marker:text-text-muted">
      {children}
    </ol>
  )) as ComponentType<Record<string, unknown>>,
  li: (({ children }: { children?: ReactNode }) => (
    <li className="leading-7">{children}</li>
  )) as ComponentType<Record<string, unknown>>,
  blockquote: (({ children }: { children?: ReactNode }) => (
    <blockquote className="my-8 border-l-4 border-border pl-6 text-base italic leading-8 text-text-muted">
      {children}
    </blockquote>
  )) as ComponentType<Record<string, unknown>>,
  hr: (() => <hr className="my-12 border-border" />) as ComponentType<Record<string, unknown>>,
  table: (({ children }: { children?: ReactNode }) => (
    <div className="my-8 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-left text-sm leading-6 text-text-secondary">
        {children}
      </table>
    </div>
  )) as ComponentType<Record<string, unknown>>,
  th: (({ children }: { children?: ReactNode }) => (
    <th className="border-b border-border bg-surface px-4 py-3 font-display font-bold text-text-primary">
      {children}
    </th>
  )) as ComponentType<Record<string, unknown>>,
  td: (({ children }: { children?: ReactNode }) => (
    <td className="border-b border-border px-4 py-3 align-top">{children}</td>
  )) as ComponentType<Record<string, unknown>>,
};

/*
 * Server component: renders MDX with the next-mdx-remote RSC entry
 * point, remark-gfm for tables and task lists, rehype-highlight for
 * syntax highlighting. Code blocks render through CodeBlock (client)
 * for the copy button, language label, and line numbers.
 */
export async function MdxContent({ source }: { source: string }) {
  return (
    <div className="[&>*:first-child]:mt-0">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
          },
        }}
        components={components}
      />
    </div>
  );
}
