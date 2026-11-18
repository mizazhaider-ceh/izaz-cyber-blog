import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this site collects, which is nothing beyond a saved theme preference.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    url: `${site.url}/privacy`,
    title: `Privacy | ${site.brand}`,
    description: "What this site collects, which is nothing beyond a saved theme preference.",
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
          This site does not track you. There is no analytics, no advertising, no tracking pixel,
          and no third party script collecting your behaviour.
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
