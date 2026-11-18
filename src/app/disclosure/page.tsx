import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Responsible Disclosure",
  description:
    "How to report a security issue responsibly, and what I ask of anyone testing systems.",
  alternates: {
    canonical: "/disclosure",
  },
  openGraph: {
    type: "website",
    url: `${site.url}/disclosure`,
    title: `Responsible Disclosure | ${site.brand}`,
    description:
      "How to report a security issue responsibly, and what I ask of anyone testing systems.",
  },
};

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-16 md:py-24">
      <h1 className="font-display text-5xl font-bold leading-tight text-text-primary md:text-6xl">
        Responsible Disclosure
      </h1>
      <div className="mt-12 space-y-6 text-base leading-8 text-text-secondary">
        <p>
          I take security seriously, and I welcome reports from people who find real issues in
          things I have built. A few ground rules apply.
        </p>
        <p>
          <strong className="text-text-primary">Only test systems you own or have permission to
          test.</strong> Never test a system you do not own, and never test a live service without
          the owner&apos;s written permission. Testing without permission is not research, it is
          unauthorised access.
        </p>
        <p>
          <strong className="text-text-primary">Do not harm the system or its users.</strong> Do
          not delete data, change data, lock people out, or disrupt a service to prove a point. A
          proof of concept that stops at demonstrating the issue is enough.
        </p>
        <p>
          <strong className="text-text-primary">How to report.</strong> Send a clear written
          report to{" "}
          <Link
            href={`mailto:${site.email}`}
            className="text-secondary underline underline-offset-4 transition-colors hover:text-primary"
          >
            {site.email}
          </Link>
          . Describe what you found, where you found it, the steps to reproduce it, and what you
          think the impact is. Include screenshots or logs if they help, and keep any sensitive
          details out of public posts until the issue is fixed.
        </p>
        <p>
          <strong className="text-text-primary">What happens next.</strong> I will read the
          report, confirm the issue, and work on a fix. I ask that you give reasonable time for a
          fix before disclosing anything publicly, and that you do not share the details with
          anyone else in the meantime.
        </p>
        <p>
          The deliberately vulnerable labs on this site exist so people can practise exploitation
          legally, on their own machines. They are the place to test attacks, not someone
          else&apos;s live system.
        </p>
      </div>
    </div>
  );
}
