/*
 * Single source of truth for site identity.
 * Every component reads brand, links, and navigation from here.
 * No other file should hardcode the name, email, or social URLs.
 */

export const site = {
  name: "Izaz Haider",
  fullName: "Muhammad Izaz Haider",
  brand: "izaz.dev",
  brandMark: "$ izaz",
  tagline: "Exploring technology. Understanding security. Building what matters.",
  description:
    "Personal blog of Muhammad Izaz Haider: cybersecurity, artificial intelligence, and engineering, written from real builds.",
  url: "https://izaz.dev",
  email: "mizazhaiderceh@gmail.com",
  github: "https://github.com/mizazhaider-ceh",
  linkedin: "https://www.linkedin.com/in/muhammad-izaz-haider-091639314/",
  nav: [
    { label: "About", href: "/about" },
    { label: "Writing", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "Search", href: "/search" },
  ],
  footerLinks: [
    { label: "About", href: "/about" },
    { label: "Writing", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "Search", href: "/search" },
    { label: "GitHub", href: "https://github.com/mizazhaider-ceh" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-izaz-haider-091639314/" },
    { label: "Email", href: "mailto:mizazhaiderceh@gmail.com" },
  ],
} as const;

export type SiteConfig = typeof site;
