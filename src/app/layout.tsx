import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Particles } from "@/components/Particles";
import { SearchPalette } from "@/components/SearchPalette";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getAllPosts, getAllProjects } from "@/lib/content";
import { buildSearchIndex } from "@/lib/search";
import { site } from "@/lib/site";
import "./globals.css";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

/*
 * Pre-paint theme script. Runs before first paint so the page never
 * flashes the wrong theme. Reads localStorage key "izaz-dev-theme",
 * validates it against the two allowed values, defaults to light.
 */
const themeScript = `(function(){try{var s=window.localStorage.getItem("izaz-dev-theme");var t=(s==="dark"||s==="light")?s:"light";document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.brand}`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  // Canonical base is the intended domain https://izaz.dev, not yet live.
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.brand,
    title: `${site.name} | ${site.brand}`,
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: `${site.name} | ${site.brand}`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Search index built at build time from the same MDX content the
  // pages use, so the Ctrl+K palette can never drift from the site.
  const searchItems = buildSearchIndex(getAllPosts(), getAllProjects());
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background font-sans text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-text-primary"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Particles />
          <Header />
          <main id="main-content" className="relative">
            {children}
          </main>
          <Footer />
          <SearchPalette items={searchItems} />
        </ThemeProvider>
      </body>
    </html>
  );
}
