"use client";

import { useEffect, useState } from "react";

type Vote = "yes" | "no";

interface FeedbackBoxProps {
  slug: string;
  title: string;
}

const LIVE_SITE_URL = "https://izaz-cyber-blog.vercel.app";
const ISSUE_NEW_URL = "https://github.com/mizazhaider-ceh/izaz-cyber-blog/issues/new";

function storageKey(slug: string): string {
  return `izaz-dev-feedback-${slug}`;
}

export function FeedbackBox({ slug, title }: FeedbackBoxProps) {
  const [vote, setVote] = useState<Vote | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey(slug));
      if (stored === "yes" || stored === "no") {
        setVote(stored);
      }
    } catch {
      // Private browsing can block localStorage. Voting still works
      // for this visit, it just is not remembered.
    }
  }, [slug]);

  function handleVote(nextVote: Vote) {
    setVote(nextVote);
    try {
      window.localStorage.setItem(storageKey(slug), nextVote);
    } catch {
      // See above: the vote still counts for this visit.
    }
  }

  const articleUrl = `${LIVE_SITE_URL}/blog/${slug}`;
  const issueUrl =
    `${ISSUE_NEW_URL}?title=${encodeURIComponent(`Correction: ${title}`)}` +
    `&body=${encodeURIComponent(
      `Article: ${articleUrl}\n\nWhat is wrong:\n\nWhat it should say:`,
    )}`;

  return (
    <section
      aria-labelledby="feedback-heading"
      className="mx-auto mt-16 max-w-[760px] border-t border-border pt-8"
    >
      <h2
        id="feedback-heading"
        className="font-display text-2xl font-bold text-text-primary"
      >
        Was this helpful?
      </h2>
      {vote === null ? (
        <div className="mt-6 flex gap-4" role="group" aria-label="Was this helpful?">
          <button
            type="button"
            aria-pressed="false"
            onClick={() => handleVote("yes")}
            className="rounded-full border border-border px-5 py-2 font-mono text-sm text-text-secondary transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Yes
          </button>
          <button
            type="button"
            aria-pressed="false"
            onClick={() => handleVote("no")}
            className="rounded-full border border-border px-5 py-2 font-mono text-sm text-text-secondary transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            No
          </button>
        </div>
      ) : (
        <p role="status" className="mt-6 text-base leading-7 text-text-secondary">
          {vote === "yes"
            ? "Thanks, glad it helped."
            : "Thanks, that helps me improve it."}
        </p>
      )}
      <p className="mt-6 text-sm leading-6 text-text-secondary">
        Spotted a mistake?{" "}
        <a
          href={issueUrl}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline underline-offset-4 transition-colors hover:text-primary-hover"
        >
          Report an error
        </a>{" "}
        on GitHub, the issue opens pre-filled with this article.
      </p>
      <p className="mt-4 font-mono text-xs leading-5 text-text-muted">
        Your vote is stored only in this browser, so you can vote once per
        article. Nothing is sent anywhere.
      </p>
    </section>
  );
}
