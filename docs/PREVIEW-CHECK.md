# Preview deployments per PR, noindexed

Audit item 51. The Vercel project is git-connected and auto-deploys
from master, so every pull request should get its own preview URL,
but no PR flow has been exercised yet and preview noindex was not
verified on a live preview.

## Status

**Configuration verified, live preview check pending a real PR.**
No test PR was opened from here: this task had no git push access,
and no Vercel dashboard access. The procedure below is the handoff
for the first real PR.

## What was verified from the repo side (20 Nov 2026)

1. `next.config.mjs` contains only `reactStrictMode: true`. It has
   no `headers()`, no redirects, no rewrites, and nothing that
   disables preview deployments or changes robots headers.
2. There is no `vercel.json` in the repo, so no repo setting can
   disable git deployments, silence the Vercel GitHub integration,
   or override preview behaviour.
3. `src/app/robots.ts` allows `/` for every user agent. That is the
   production `robots.txt`, not a preview control: the preview
   noindex header is added by Vercel at platform level, not by
   this file, so the allow rule does not undo it.
4. Vercel's documented default, checked 20 Nov 2026 in the Vercel
   Environments docs: Vercel adds an `X-Robots-Tag: noindex`
   response header to every preview deployment automatically, and
   to production deployments opened through their unique deployment
   URL. Search engines that support `noindex`, such as Google,
   leave those pages out of their results.
5. The one exception to that default does not apply here: Vercel
   omits the header when a custom domain is assigned to a
   non-production branch. This blog has no custom domain on any
   branch (the live host is the `vercel.app` URL, and `izaz.dev`
   is not live yet), so previews should carry the header.

Note on branch name: the audit text for this item says "merging to
main", but this repo deploys from `master` (see `.github/workflows/ci.yml`,
which runs on push to `master`). The procedure below uses `master`.

## Test PR procedure

1. Create a branch off `master`, for example `test/preview-check`.
2. Make one small, visible change, for example one word in a docs
   file. Do not change site content for this test.
3. Push the branch and open a pull request against `master`.
4. Wait for the Vercel bot to comment on the PR with the preview
   URL. It looks like
   `https://izaz-dev-blog-git-test-preview-check-<team>.vercel.app`
   (the exact suffix varies). If no comment appears within a few
   minutes, check the Vercel dashboard, Deployments, for a failed
   build on that branch before assuming previews are off.
5. Open the preview URL in a browser and confirm the test change
   is visible.
6. Check the noindex header from a terminal:

   ```sh
   curl -sI <preview-url> | grep -i "x-robots-tag"
   ```

   Expected output:

   ```text
   x-robots-tag: noindex
   ```

   Also confirm the status line is `HTTP/2 200`.
7. Confirm production does NOT carry the header, so the check is
   meaningful and not just a site-wide header:

   ```sh
   curl -sI https://izaz-cyber-blog.vercel.app | grep -i "x-robots-tag"
   ```

   Expected output: nothing.
8. Merge the PR, confirm the production deployment succeeds in the
   Vercel dashboard, and confirm the live site still returns 200.
9. Record the result here: preview URL, the exact header line seen,
   and the date. Then this item is done.

## If the header is missing

- First check whether the preview URL is a custom domain. A custom
  domain on a branch gets no automatic header, so use the plain
  `vercel.app` preview URL instead.
- If the plain preview URL has no header, check the Vercel
  dashboard under the project Settings for anything that changes
  deployment or header behaviour, and do not merge the PR until
  the cause is found: an indexed preview can outrank production.
- If `curl` returns 401 or a login page instead of the site, the
  project has Deployment Protection (Vercel Authentication) on.
  That blocks crawlers too, so the preview is still not indexed,
  but the header cannot be checked with plain `curl`. In that case
  check the response headers in a browser while logged in to
  Vercel (DevTools, Network tab, click the document request,
  look at Response Headers), and record that the check was done
  in the browser, not with `curl`.
