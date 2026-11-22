/*
 * Single source of truth for site identity.
 * Every component reads brand, links, and navigation from here.
 * No other file should hardcode the name, email, or social URLs.
 */

const nav = [
  { label: "About", href: "/about" },
  { label: "Writing", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Search", href: "/search" },
] as const;

// Contact and profile URLs, each written once. Both the site fields below
// and the footer links read from here, so a changed URL cannot diverge.
const identity = {
  email: "mizazhaiderceh@gmail.com",
  github: "https://github.com/mizazhaider-ceh",
  linkedin: "https://www.linkedin.com/in/muhammad-izaz-haider-091639314/",
} as const;

export const site = {
  name: "Izaz Haider",
  fullName: "Muhammad Izaz Haider",
  brand: "izaz.dev",
  brandMark: "$ izaz",
  tagline: "Exploring technology. Understanding security. Building what matters.",
  description:
    "Personal blog of Muhammad Izaz Haider: cybersecurity, artificial intelligence, and engineering, written from real builds.",
  url: "https://izaz-cyber-blog.vercel.app",
  email: identity.email,
  github: identity.github,
  linkedin: identity.linkedin,
  nav,
  footerLinks: [
    ...nav,
    { label: "RSS", href: "/rss" },
    { label: "Changelog", href: "/changelog" },
    { label: "GitHub", href: identity.github },
    { label: "LinkedIn", href: identity.linkedin },
    { label: "Email", href: `mailto:${identity.email}` },
  ],
} as const;
