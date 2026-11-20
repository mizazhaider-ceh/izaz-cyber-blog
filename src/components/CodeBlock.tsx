"use client";

import { Check, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  children?: ReactNode;
}

/*
 * Code blocks always use the dark surface from globals.css, in both
 * themes, with bright multicolour highlighting. Light text on a dark
 * surface stays readable in light and dark mode alike.
 *
 * Line numbers live in a gutter column next to the code. The gutter
 * and the code share the same font size and line height, and the code
 * never wraps, so each number stays aligned with its line. When the
 * MDX renderer supplies highlighted code as children, that markup is
 * kept as-is, so syntax highlighting is preserved.
 */
export function CodeBlock({ code, language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const cleanCode = code.replace(/\n$/, "");
  const lineCount = cleanCode.split("\n").length;
  // Audit item 20: each copy button names the block it copies, so a
  // screen reader can tell seventeen "Copy" buttons apart. The visible
  // text stays "Copy" / "Copied", and the accessible name includes it
  // exactly, plus the language when one is known.
  const languageLabel = language
    ? language.charAt(0).toUpperCase() + language.slice(1)
    : null;
  const copyLabel = copied
    ? languageLabel
      ? `Copied ${languageLabel} code`
      : "Copied"
    : languageLabel
      ? `Copy ${languageLabel} code`
      : "Copy code";

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#2a2825] bg-[#171614] text-[#e8e6df]">
      <div className="flex items-center justify-between border-b border-[#2a2825] px-4 py-2">
        <span className="font-mono text-xs text-[#a8a49b]">
          {language ? language : "code"}
        </span>
        <button
          type="button"
          onClick={copyCode}
          aria-label={copyLabel}
          className="inline-flex min-h-6 items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs text-[#e8e6df] transition-colors hover:bg-[#2a2825] focus-visible:outline-2 focus-visible:outline-[#4385be]"
        >
          {copied ? (
            <Check className="h-4 w-4 text-[#a5d6a7]" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
        <span role="status" className="sr-only">
          {copied ? "Copied" : ""}
        </span>
      </div>
      <div className="flex">
        <div
          aria-hidden="true"
          className="select-none py-4 pl-4 pr-2 text-right font-mono text-xs leading-6 text-[#6b6862]"
        >
          {Array.from({ length: lineCount }, (_, index) => (
            <span key={index} className="block">
              {index + 1}
            </span>
          ))}
        </div>
        <pre className="m-0 min-w-0 flex-1 overflow-x-auto whitespace-pre rounded-none border-0 bg-transparent p-4 pl-2 text-sm leading-6">
          {children ?? <code className="bg-transparent p-0">{cleanCode}</code>}
        </pre>
      </div>
    </div>
  );
}
