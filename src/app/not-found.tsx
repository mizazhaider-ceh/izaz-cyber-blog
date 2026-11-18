import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32">
      <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
        404
      </p>
      <h1 className="mt-8 font-display text-5xl font-bold leading-tight text-text-primary md:text-6xl">
        Nothing here.
      </h1>
      <p className="mx-auto mt-8 max-w-[560px] text-xl leading-8 text-text-secondary">
        This page does not exist, or it moved. The writing and the projects are still here.
      </p>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
        <Link
          href="/"
          className="rounded-full bg-primary px-6 py-3 font-display text-base font-bold text-[#fffcf0] transition-colors hover:bg-primary-hover"
        >
          Back home
        </Link>
        <Link
          href="/blog"
          className="text-base text-text-primary underline decoration-border underline-offset-8 transition-colors hover:text-primary"
        >
          Read the writing
        </Link>
      </div>
    </div>
  );
}
