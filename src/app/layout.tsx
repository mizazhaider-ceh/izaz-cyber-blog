import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Particles } from "@/components/Particles";
import { SearchPalette } from "@/components/SearchPalette";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getAllPosts, getAllProjects } from "@/lib/content";
import { openGraphSite, rssFeedAlternate, twitterCard } from "@/lib/metadata";
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
 * validates it against the two allowed values, and a stored value
 * always wins. With no stored value it follows the OS preference via
 * window.matchMedia("(prefers-color-scheme: dark)").
 */
const themeScript = `(function(){function os(){try{return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}catch(e){return "light";}}try{var s=window.localStorage.getItem("izaz-dev-theme");var t=(s==="dark"||s==="light")?s:os();document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme",os());}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.brand}`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  // Canonical base is the live host https://izaz-cyber-blog.vercel.app.
  alternates: {
    canonical: "/",
    ...rssFeedAlternate,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  // themeColor lives in the viewport export below (Next.js 15
  // deprecates the metadata field), light #FFFCF0, dark #100F0F.
  openGraph: {
    ...openGraphSite,
    type: "website",
    url: site.url,
    title: `${site.name} | ${site.brand}`,
    description: site.description,
  },
  twitter: {
    ...twitterCard,
    title: `${site.name} | ${site.brand}`,
    description: site.description,
  },
};

// Browser chrome colour per OS theme. The media queries follow the OS
// preference, not a manual toggle override.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFCF0" },
    { media: "(prefers-color-scheme: dark)", color: "#100F0F" },
  ],
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
        <meta name="color-scheme" content="light dark" />
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
          <main id="main-content" tabIndex={-1} className="relative">
            {children}
          </main>
          <Footer />
          <SearchPalette items={searchItems} />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
