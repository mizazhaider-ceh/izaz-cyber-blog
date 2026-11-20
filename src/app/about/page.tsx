import type { Metadata } from "next";
import Link from "next/link";
import { jsonLdScript, personJsonLd } from "@/lib/jsonld";
import { openGraphSite, rssFeedAlternate, twitterCard } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "About Muhammad Izaz Haider: security researcher, builder, and writer on cybersecurity, AI security, and engineering.",
  alternates: {
    canonical: "/about",
    ...rssFeedAlternate,
  },
  openGraph: {
    ...openGraphSite,
    type: "profile",
    url: `${site.url}/about`,
    title: `About Me | ${site.brand}`,
    description:
      "About Muhammad Izaz Haider: security researcher, builder, and writer on cybersecurity, AI security, and engineering.",
    images: [
      {
        url: `${site.url}/og/default.png`,
        width: 1200,
        height: 630,
        alt: `About Me | ${site.brand}`,
      },
    ],
  },
  twitter: {
    ...twitterCard,
    card: "summary_large_image",
    title: `About Me | ${site.brand}`,
    description:
      "About Muhammad Izaz Haider: security researcher, builder, and writer on cybersecurity, AI security, and engineering.",
    images: [`${site.url}/og/default.png`],
  },
};

export default function About() {
  return (
    <div className="mx-auto max-w-[68ch] px-6 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd()) }}
      />
      <h1 className="text-center font-display text-5xl font-bold leading-tight text-text-primary md:text-6xl">
        About Me
      </h1>

      {/* About image: character portrait by Vinur. on Pexels (Pexels License, free to use). Source: https://www.pexels.com/photo/moody-portrait-of-a-person-in-deep-thought-33138368/ . Not a photo of the author. Full record in docs/ABOUT-IMAGE.md. */}
      <figure className="mx-auto mt-12 w-fit text-center">
        <picture>
          <source srcSet="/images/about-character.webp" type="image/webp" />
          <img
            src="/images/about-character.jpg"
            alt="Character portrait: a figure in a dark leather jacket, hand in hair, face hidden in shadow against a moody teal background"
            width={480}
            height={720}
            className="h-auto w-48 rounded-xl border border-border object-cover"
          />
        </picture>
        <figcaption className="mt-4 font-mono text-xs text-text-muted">
          Character portrait by{" "}
          <Link
            href="https://www.pexels.com/photo/moody-portrait-of-a-person-in-deep-thought-33138368/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            Vinur. on Pexels
          </Link>
          .
        </figcaption>
      </figure>

      <div className="mt-12 space-y-6 text-base leading-8 text-text-secondary">
        <p>
          I am <strong className="text-text-primary">Muhammad Izaz Haider</strong>, a security
          researcher and builder. I learn by building things, breaking them, and writing down what
          actually happened, so the next person does not have to guess.
        </p>
        <p>
          I hold the <strong className="text-text-primary">CNSP with Merit</strong>. In the CSCB
          2026 competition I placed <strong className="text-text-primary">#1 Web Junior</strong>,{" "}
          <strong className="text-text-primary">#3 overall Junior</strong>, and{" "}
          <strong className="text-text-primary">#26 of 806</strong>, earning{" "}
          <strong className="text-text-primary">26 flags</strong>.
        </p>
        <p>
          From November 2025 to June 2026 I worked part-time, remotely, at{" "}
          <strong className="text-text-primary">Damno Solutions</strong> as a Junior DevSecOps and
          AI Security Engineer. There I delivered{" "}
          <strong className="text-text-primary">13 vulnerabilities</strong> and fixed{" "}
          <strong className="text-text-primary">2 critical ones, an RCE and a SQL injection</strong>.
        </p>
        <p>
          Since February 2026 I have worked part-time as a{" "}
          <strong className="text-text-primary">Bug Bounty Hunter on YesWeHack</strong>.
        </p>
        <p>
          In my first year of study I earned{" "}
          <strong className="text-text-primary">60 out of 60 credits, on the first attempt, with no
          retakes</strong>.
        </p>
        <p>
          I have studied the eJPT and eWPT courses through INE. I do not yet hold either
          certificate, and I am working towards them.
        </p>
        <p>
          My interests are cybersecurity, AI security, engineering, building things, and writing
          about what I learn. This blog is where that writing lives: notes from real builds, not
          theory copied from elsewhere.
        </p>
      </div>

      <nav aria-label="About links" className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4">
        <Link
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-sm text-secondary underline underline-offset-4 transition-colors hover:text-primary"
        >
          GitHub
        </Link>
        <Link
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-sm text-secondary underline underline-offset-4 transition-colors hover:text-primary"
        >
          LinkedIn
        </Link>
        <Link
          href="/projects"
          className="font-mono text-sm text-secondary underline underline-offset-4 transition-colors hover:text-primary"
        >
          Projects
        </Link>
        <Link
          href="/blog"
          className="font-mono text-sm text-secondary underline underline-offset-4 transition-colors hover:text-primary"
        >
          Writing
        </Link>
        <Link
          href={`mailto:${site.email}`}
          className="font-mono text-sm text-secondary underline underline-offset-4 transition-colors hover:text-primary"
        >
          Email
        </Link>
      </nav>

      <p className="mt-16 text-center font-mono text-xs text-text-muted">
        Created by Muhammad Izaz Haider
      </p>
    </div>
  );
}
