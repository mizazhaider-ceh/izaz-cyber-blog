"use client";

import { useEffect, useRef } from "react";

/*
 * Reading progress bar for article pages (audit item 30).
 * CSS-only in browsers with scroll-driven animations: the bar is driven
 * by animation-timeline: scroll() in globals.css. This component only
 * adds a JavaScript fallback, and only when the browser does not support
 * scroll timelines (checked with CSS.supports). No scroll-timeline
 * polyfill is used, per the modern-web-guidance scroll-progress-indicator
 * guide. The bar is decorative, so it is aria-hidden and never
 * intercepts pointer events.
 */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (CSS.supports("animation-timeline", "scroll()")) {
      return;
    }
    const bar = barRef.current;
    if (!bar) {
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  return <div ref={barRef} className="reading-progress" aria-hidden="true" />;
}
