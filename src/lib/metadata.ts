import type { Metadata } from "next";
import { site } from "./site";

/*
 * Shared metadata pieces (audit item 13).
 * Next.js page metadata objects REPLACE the layout's objects instead of
 * merging them, so a page that sets its own openGraph silently drops the
 * layout's siteName, locale and RSS alternate. Every page that defines
 * metadata must spread these shared pieces back in. The parallel OG
 * agent owns the images keys; do not add images here.
 */

// RSS feed alternate, shared by the layout and every page.
export const rssFeedAlternate: NonNullable<Metadata["alternates"]> = {
  types: {
    "application/rss+xml": "/rss",
  },
};

// Site identity for Open Graph, shared by the layout and every page.
export const openGraphSite: { siteName: string; locale: string } = {
  siteName: site.brand,
  locale: "en_US",
};

// Summary card, shared by the layout and every page with a twitter object.
export const twitterCard: { card: "summary" } = {
  card: "summary",
};
