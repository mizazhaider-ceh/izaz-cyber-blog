"use client";

import { Check, Copy, Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

/*
 * Share row for article pages (audit item 35).
 * Lightweight share links only: plain anchors to the X and LinkedIn
 * share dialogs, plus a copy-link button. No third-party widget
 * script is loaded anywhere on the page.
 *
 * The copy button follows the CodeBlock pattern: navigator.clipboard
 * with a visible "Copied" state that clears after two seconds, and
 * the button is never disabled, so a failed copy can be retried.
 * The confirmation is also announced through a role="status" region
 * outside the button, since a live region inside a button is not
 * reliably announced.
 */
export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  async function copyLink() {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    timerRef.current = window.setTimeout(() => setCopyState("idle"), 2000);
  }

  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const copyLabel = copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy link";

  return (
    <div className="share-buttons mt-12">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-muted">
        Share this article
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={xHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-6 items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs text-text-secondary transition-colors hover:border-primary hover:text-primary"
        >
          <span aria-hidden="true" className="font-sans text-sm font-bold leading-none">
            X
          </span>
          Share on X
        </a>
        <a
          href={linkedInHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-6 items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs text-text-secondary transition-colors hover:border-primary hover:text-primary"
        >
          <Linkedin className="h-4 w-4" aria-hidden="true" />
          Share on LinkedIn
        </a>
        <button
          type="button"
          onClick={copyLink}
          aria-label={copyLabel}
          className="inline-flex min-h-6 items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs text-text-secondary transition-colors hover:border-primary hover:text-primary"
        >
          {copyState === "copied" ? (
            <Check className="h-4 w-4 text-success" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          {copyLabel}
        </button>
        <span role="status" className="sr-only">
          {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : ""}
        </span>
      </div>
    </div>
  );
}
