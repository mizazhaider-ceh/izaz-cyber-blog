import type { Metadata } from "next";
import { openGraphSite, rssFeedAlternate, twitterCard } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this site collects: cookieless page views and Web Vitals, plus a saved theme preference.",
  alternates: {
    canonical: "/privacy",
    ...rssFeedAlternate,
  },
  openGraph: {
    ...openGraphSite,
    type: "website",
    url: `${site.url}/privacy`,
    title: `Privacy | ${site.brand}`,
    description: "What this site collects: cookieless page views and Web Vitals, plus a saved theme preference.",
  },
  twitter: {
    ...twitterCard,
    title: `Privacy | ${site.brand}`,
    description: "What this site collects: cookieless page views and Web Vitals, plus a saved theme preference.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-16 md:py-24">
      <h1 className="font-display text-5xl font-bold leading-tight text-text-primary md:text-6xl">
        Privacy
      </h1>
      <div className="mt-12 space-y-6 text-base leading-8 text-text-secondary">
        <p>
          This site uses two cookieless analytics tools from Vercel, Web Analytics and Speed
          Insights. Web Analytics counts page views so I can see which articles people read.
          Speed Insights measures Core Web Vitals, the load time, responsiveness and layout
          stability of each page, so I can see which pages are slow and fix them. Neither tool
          sets a cookie, and neither collects personal data.
        </p>
        <p>
          <strong className="text-text-primary">What I will not do.</strong> No session replay,
          no cross-site tracking, no fingerprinting, and no personal data in analytics. Vercel
          Analytics hashes your IP address and discards it, so visits cannot be tied back to
          you. There is no advertising, no tracking pixel, and no third party script collecting
          your behaviour.
        </p>
        <p>
          <strong className="text-text-primary">Opting out.</strong> There is no opt-out to
          switch on, because there is nothing to opt out of: the analytics above is cookieless
          and collects no personal data. If you still prefer not to be counted, your
          browser&apos;s tracking protection or a content blocker will block the analytics
          requests.
        </p>
        <p>
          The only thing stored in your browser is your theme preference, light or dark, saved in
          localStorage under the key <code>izaz-dev-theme</code>. It never leaves your device, and
          deleting it simply returns the site to the light theme.
        </p>
        <p>
          No cookies are set beyond that theme preference. No account exists, no login is offered,
          and nothing you type into the search box is sent anywhere: search runs entirely in your
          browser, over content shipped with the site.
        </p>
        <p>
          If you email me, your email address and message are used only to read and reply to your
          message. Nothing is shared with anyone else.
        </p>
      </div>
    </div>
  );
}
