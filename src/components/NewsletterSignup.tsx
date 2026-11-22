"use client";

// Newsletter signup, wired to Buttondown (audit item 34).
//
// How to turn it on:
// 1. Create a free Buttondown account at https://buttondown.com
// 2. Put your Buttondown username in BUTTONDOWN_USERNAME below.
// 3. That is all. The form posts straight to Buttondown, no API key
//    and no backend of ours is needed.
//
// Until the username is set, this component renders nothing, so a
// dead form can never ship. Do not put a guessed username here.
// See docs/NEWSLETTER.md for the full setup notes.
const BUTTONDOWN_USERNAME = "";

export function NewsletterSignup() {
  if (!BUTTONDOWN_USERNAME) {
    return null;
  }

  const action = `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`;

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="border-t border-border py-16"
    >
      <h2
        id="newsletter-heading"
        className="font-display text-2xl font-bold text-text-primary"
      >
        Get new posts by email
      </h2>
      <p className="mt-4 max-w-[720px] text-base leading-7 text-text-secondary">
        One email per new post, no more. No spam, and every email has a
        one-click unsubscribe link.
      </p>
      <form
        action={action}
        method="post"
        target="_blank"
        className="mt-8 flex max-w-[720px] flex-col gap-4 sm:flex-row"
      >
        <input type="hidden" name="embed" value="1" />
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="newsletter-email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          className="min-w-0 flex-1 rounded-full border border-border bg-surface px-5 py-3 text-base text-text-primary placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-button-bg px-6 py-3 font-display text-base font-bold text-button-text transition-colors hover:bg-button-bg-hover"
        >
          Subscribe
        </button>
      </form>
      <p className="mt-4 text-sm leading-6 text-text-muted">
        Prefer to browse first? Read past posts in the{" "}
        <a
          href="/blog"
          className="text-secondary underline underline-offset-4 transition-colors hover:text-primary"
        >
          archive
        </a>
        .
      </p>
    </section>
  );
}
