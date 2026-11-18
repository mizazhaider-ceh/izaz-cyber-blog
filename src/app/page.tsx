import { site } from "@/lib/site";

/*
 * Minimal home placeholder for Task 1.
 * The full homepage (hero, Selected writing, Topics) is built in Task 3.
 */
export default function Home() {
  return (
    <section className="mx-auto max-w-[1140px] px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
        Cybersecurity &middot; Artificial Intelligence &middot; Engineering
      </p>
      <h1 className="mt-8 font-display text-5xl font-bold leading-tight text-text-primary md:text-6xl">
        {site.name}
      </h1>
      <p className="mt-8 max-w-[720px] text-xl leading-8 text-text-secondary">
        {site.tagline}
      </p>
    </section>
  );
}
