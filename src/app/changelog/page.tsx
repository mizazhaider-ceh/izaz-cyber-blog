import type { Metadata } from "next";
import { changelog } from "@/lib/changelog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "What changed on izaz.dev and when: site launches, fixes, and new features, listed by date.",
  alternates: {
    canonical: "/changelog",
  },
  openGraph: {
    type: "website",
    url: `${site.url}/changelog`,
    title: `Changelog | ${site.brand}`,
    description:
      "What changed on izaz.dev and when: site launches, fixes, and new features, listed by date.",
  },
};

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-16 md:py-24">
      <h1 className="font-display text-5xl font-bold leading-tight text-text-primary md:text-6xl">
        Changelog
      </h1>
      <p className="mt-6 text-base leading-8 text-text-secondary">
        What changed on this site and when. One entry per deploy, newest first, with real dates
        only.
      </p>
      <div className="mt-12 space-y-12">
        {changelog.map((entry) => (
          <section key={entry.date} aria-labelledby={`changelog-${entry.date}`}>
            <h2
              id={`changelog-${entry.date}`}
              className="font-mono text-sm text-text-muted"
            >
              <time dateTime={entry.date}>{entry.date}</time>
            </h2>
            <h3 className="mt-2 font-display text-2xl font-bold text-text-primary">
              {entry.title}
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-text-secondary">
              {entry.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
