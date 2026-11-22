"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/*
 * Shared copy-to-clipboard feedback for CodeBlock and ShareButtons.
 * One place owns the clipboard write, the two second "Copied" reset,
 * and the timer cleanup on unmount, so the two copy buttons cannot
 * drift apart again. A failed copy reports "failed" instead of
 * pretending it worked; callers that only care about success can read
 * state === "copied" as a boolean.
 */
export type CopyState = "idle" | "copied" | "failed";

export function useCopyFeedback(resetMs = 2000) {
  const [state, setState] = useState<CopyState>("idle");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const copy = useCallback(
    async (text: string) => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      try {
        await navigator.clipboard.writeText(text);
        setState("copied");
      } catch {
        setState("failed");
      }
      timerRef.current = window.setTimeout(() => setState("idle"), resetMs);
    },
    [resetMs],
  );

  return { state, copy };
}
