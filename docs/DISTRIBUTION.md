# Distribution: own the audience, cross-post excerpts, let analytics choose topics

Written: 2026-11-20. Covers audit items 41, 43 and 44 (section 8, Growth and
distribution). This file is process only. It creates no accounts, publishes
no posts, and changes no code. Every cross-post is done by the site owner,
in the owner's own logged-in accounts, following the steps below.

Status: NOT STARTED. No article has been cross-posted yet. The first
cross-post is pending the site owner. Nothing in this file claims a post,
an account, a result, or a date that does not exist.

## Prerequisites, in order

Do not start distribution until each prerequisite is true. Check them in
this order before the first cross-post.

1. Item 11 is done. The canonical URL points at the host that actually
   serves the site. Until that fix lands, cross-posting cannot consolidate
   search signals, so distribution waits.
2. Item 12 is done for the article being cross-posted. The article has its
   own 1200 by 630 OG card. The cross-post image comes from that card.
   An article with no OG card yet waits; do not substitute a random image.
3. Item 45 is done before the monthly analytics process in section 3
   starts. That process needs Search Console data, and Search Console data
   only exists after analytics and Search Console are set up. See
   `docs/SEARCH-CONSOLE.md` for the setup steps.

## The canonical URL, defined once

The canonical URL of an article is its live article URL on the host that
serves the site. It is the value of `site.url` plus the article path, for
example `https://izaz-cyber-blog.vercel.app/blog/<slug>` while the Vercel
host serves the site. When the site moves to its own domain, the canonical
URL moves with it in the same change, and every later cross-post uses the
new canonical URL. Never use a canonical URL for a host that does not serve
the site, and never use a different URL in the sitemap, the canonical tag,
and the cross-post link. Before cross-posting an article, open its live
page, confirm the canonical tag in the served HTML matches the URL you
are about to link to, and use that exact URL everywhere below.

## 1. Own the audience (audit item 41)

Rule, stated plainly: the full article lives only on the own domain. DEV,
Medium and LinkedIn carry excerpts that link back to it. Never publish a
full copy of an article anywhere else. Never cross-post without the
canonical back to the full article.

Why: the own site is the canonical home of the writing. A full copy on
another platform competes with it in search and splits the audience. An
excerpt with a canonical link sends readers and search signals home.

What this means in practice:

- The canonical post is published on the own site first. It is live and
  its canonical tag is verified before any excerpt goes out.
- Every cross-post is an excerpt, not the full article. An excerpt is the
  first 2 to 3 sections of the article, or about 300 words, whichever is
  shorter. It ends before the article's main worked content, so a reader
  who wants the rest has a reason to click through.
- Every excerpt ends with a link back to the full article, using the
  canonical URL defined above. The link text names the destination, for
  example: "Read the full article on izaz.dev" (with the link pointing at
  the live canonical URL, not at the own-domain name while that domain
  does not serve the site).
- Every excerpt that supports a canonical field carries one, pointing at
  the live article URL. See section 2 for the exact steps on DEV and
  Medium. LinkedIn has no canonical field, so the link back in the post
  text is the mechanism there.
- Never publish the full article on DEV, Medium or LinkedIn, even as a
  draft that is later edited down. Write the excerpt as an excerpt from
  the start.
- Never cross-post an article whose canonical is not yet fixed. If item 11
  is not done, the article waits.

## 2. Distribute: excerpts on DEV, Medium, LinkedIn (audit item 44)

Distribute one excerpt per new article, in this order: DEV first, then
LinkedIn, then Medium. Do all three for the same article on the same day,
so the excerpt does not drift out of date between platforms. Older
articles are distributed only after the new ones are covered, one per day
at most, and only if the article is still accurate.

### Per-article checklist

Copy this checklist for each article and tick each line as it is done.
Do not mark a line done before it is actually done.

- [ ] Article is live on the own site, and its canonical tag is verified
      in the served HTML.
- [ ] Excerpt written: first 2 to 3 sections, or about 300 words,
      whichever is shorter. The excerpt is self-contained and ends with
      a clear reason to read on.
- [ ] Link back added at the end of the excerpt, pointing at the live
      article URL (the canonical URL defined above).
- [ ] Image ready: the article's OG card from item 12 (1200 by 630).
      One image only, the article's own card. No stock image, no other
      article's card.
- [ ] DEV: excerpt posted, canonical URL set (steps below), link back
      present. Date posted: ________. DEV URL: ________.
- [ ] LinkedIn: excerpt posted with a short personal note (steps below),
      link back present. Date posted: ________. LinkedIn URL: ________.
- [ ] Medium: excerpt imported with canonical set (steps below), link
      back present. Date posted: ________. Medium URL: ________.
- [ ] All three cross-post URLs recorded in the log in section 4.

### Step 1: DEV

1. Open DEV in the owner's account and start a new post.
2. Paste the excerpt as the post body. Do not paste the full article.
3. Add the article's OG card as the cover image.
4. Add the link back at the end of the excerpt, pointing at the live
   article URL.
5. Set the canonical URL: open Settings for the post, find the canonical
   URL field, paste the live article URL exactly as verified above, and
   save. This is the step that tells search engines the own site is the
   original. Do not publish without it.
6. Check the preview: the excerpt reads as a complete short piece, the
   cover image shows, and the link back works. Then publish.
7. Record the DEV post URL and the date in the checklist and in the log.

### Step 2: LinkedIn

LinkedIn has no canonical URL field, so the link back in the post text
carries the whole job here. The excerpt plus the link is the full post.

1. Open LinkedIn in the owner's account and start a new post.
2. Write a short personal note, 2 to 4 sentences, in the owner's own
   words: what the article is about, and one thing learned or found
   while writing it. Do not copy the article introduction word for word
   as the note. The note is personal; the excerpt below it is the article.
3. Paste the excerpt below the note.
4. Attach the article's OG card image.
5. Paste the link back to the full article at the end of the post, using
   the live article URL. Check that the link preview, if LinkedIn shows
   one, points at the live article and not at any other host.
6. Publish, then record the LinkedIn post URL and the date in the
   checklist and in the log.

### Step 3: Medium

Medium sets the canonical automatically when a story is imported from
its canonical URL, so use Import story. Do not paste the excerpt as a
new Medium story, because a pasted story has no canonical back unless
one is added by hand, and the import route is the reliable one.

1. Open Medium in the owner's account.
2. Open Import story. Paste the live article URL (the canonical URL
   defined above) and import.
3. Medium imports the article and sets its canonical to the imported URL
   automatically. Verify this before publishing: open the story settings
   and confirm the canonical URL shown is the live article URL.
4. Edit the imported story down to the excerpt: keep the first 2 to 3
   sections, or about 300 words, and delete the rest. The imported full
   text must not stay. Confirm the link back to the full article is
   present at the end of the excerpt.
5. Set the cover image to the article's OG card.
6. Check the preview, then publish. Record the Medium story URL and the
   date in the checklist and in the log.

If Medium's import does not show the canonical URL, or shows a different
one, stop. Do not publish that story. Fix the canonical first (item 11),
then import again.

### What not to do

- Do not publish a full copy on any platform.
- Do not cross-post without the canonical back, and do not cross-post on
  LinkedIn without the link back in the post text.
- Do not use a different URL on different platforms for the same article.
  One article, one canonical URL, everywhere.
- Do not schedule cross-posts in advance from a tool. The owner posts
  each excerpt by hand, in the owner's own accounts.
- Do not invent engagement numbers, views, or results. The log records
  only what actually happened: dates and URLs.

## 3. Let analytics choose topics (audit item 43)

This process starts only after item 45 is live: analytics installed and
Search Console set up, with data actually being collected. Before that,
there is no Search Console data, so topic choice is guesswork, and this
section does not run. See `docs/SEARCH-CONSOLE.md` for setup.

On the first of each month, do the following. It takes one sitting, and
it decides the next article.

1. Open Google Search Console for the site property.
2. Open the Performance report. Set the date range to the previous full
   month.
3. List the top 10 search queries: the queries that brought the most
   clicks and impressions. Write them in the monthly log table below,
   in order, with their clicks and impressions.
4. List the top 10 articles: the pages with the most clicks. Write them
   in the monthly log table below, in order, with their clicks.
5. Read both lists together and pick the best query. The best query is
   the one that meets the most of these tests:
   - People already search for it, shown by real impressions and clicks,
     not by a guess.
   - The blog already has something to say about it, or the author can
     say something real about it from work actually done.
   - It is specific enough to answer in one article, not a whole topic.
   - It is not already fully answered by an existing article. If it is,
     the answer is to expand that article, not to write a second one
     that says the same thing.
6. Turn the chosen query into the next article, in one of two ways:
   - Expand the matching article: if an existing article already ranks
     for the query but does not answer it fully, add the missing section
     to that article, update its last-updated date, and record the
     expansion in the log. This is the default when a matching article
     exists.
   - Write a new article: if no existing article answers the query, write
     a new one on that query, following the normal publishing process.
     Record the new article's slug in the log.
7. Write the month's entry in the log table below before starting the
   article, so the decision is on record even if the article slips.
   Fill in the outcome (expanded article, or new article slug) when the
   work is done.

Do not pick a topic from a hunch, a trend list, or what other blogs are
writing. If the Search Console lists are empty or too thin to choose from,
say so in the log and repeat the review next month. An empty month is a
real result, not a reason to guess.

## 4. Monthly log

One row per month. Fill it in by hand. Leave a cell blank rather than
guessing a number.

### Monthly analytics log (item 43)

| Month | Top 10 search queries (with clicks) | Top 10 articles (with clicks) | Best query chosen | Action: expand or new article | Outcome |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

### Cross-post log (items 41 and 44)

One row per article cross-posted. Record the real URLs and dates only.

| Article slug | Canonical URL used | DEV URL and date | LinkedIn URL and date | Medium URL and date |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

## Sources

- Audit report, 20 Nov 2026: items 41, 43 and 44 in section 8, and item
  11 (canonical fix, prerequisite) and item 45 (analytics, prerequisite
  for the monthly process). The audit's "Best do" lines for these items
  cite Kent C. Dodds on owning the canonical post and distributing
  excerpts that link home.
- `docs/SEARCH-CONSOLE.md` in this repo: Search Console setup, which the
  monthly process in section 3 depends on.
