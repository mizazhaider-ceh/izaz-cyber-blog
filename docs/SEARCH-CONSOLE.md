# Google Search Console setup for izaz.dev

Status: PENDING. Only the site owner can do this, because it needs signing
in to Google Search Console with the account that owns the site and proving
ownership. No agent can do it.

Why: Search Console is the only source of real field data for Core Web
Vitals (audit items 6 and 45). Vercel Speed Insights measures the same
metrics in the field, but Search Console reports them per URL at the 75th
percentile, separately for mobile and desktop, which is the pass bar:
LCP 2.5 seconds or less, INP 200 ms or less, CLS 0.1 or less.

## Step 1: Add the property

1. Go to https://search.google.com/search-console and sign in with the
   Google account that owns the site.
2. Click Add property.
3. Choose the URL prefix property type and enter the live host,
   `https://izaz-cyber-blog.vercel.app`, then click Continue. This is the
   host that actually serves visitors today, so this is the property that
   collects field data now.
4. Later, when the brand domain `https://izaz.dev` goes live and serves
   the site, add it as a second property and verify it the same way, so
   field data follows the site to its final domain.

## Step 2: Verify ownership

For the Vercel host property, use the HTML tag method. DNS verification
is not available for a `vercel.app` subdomain, because that DNS is not
yours to edit.

Option A, HTML tag (use this for the Vercel host):

1. In Search Console, choose the HTML tag verification method and copy
   the meta tag Google shows.
2. Add that meta tag to the `<head>` of the site (in `src/app/layout.tsx`)
   and deploy. Do not remove the tag afterwards, or verification lapses.
3. Click Verify in Search Console.

Option B, DNS TXT record (use this later, for `izaz.dev` only):

1. In Search Console, choose the DNS record verification method and copy
   the TXT record value Google shows.
2. Sign in to the DNS provider where `izaz.dev` is registered.
3. Add a TXT record for `@` (the root domain) with the value Google gave
   you. Do not change any existing records.
4. Wait for the record to propagate, then click Verify in Search Console.
   DNS changes can take minutes to a few hours to be visible.

## Step 3: Submit the sitemap

1. In the property, open Sitemaps in the left menu.
2. Enter `sitemap.xml` as the sitemap URL. The full URL is
   `https://izaz-cyber-blog.vercel.app/sitemap.xml`.
3. Click Submit. Search Console will report how many URLs were discovered.
4. When the `izaz.dev` property is added later, submit its sitemap too:
   `https://izaz.dev/sitemap.xml`.

## Step 4: Wait for field data

1. The Core Web Vitals report in the Experience section fills in only
   after enough real visits have been recorded. Expect no data for the
   first days, and a stable report after about 28 days of traffic.
2. Check the report separately for mobile and desktop. The pass bar is
   LCP 2.5 seconds or less, INP 200 ms or less, CLS 0.1 or less, at the
   75th percentile.
3. Vercel Speed Insights (already installed) shows the same metrics
   sooner, in the Vercel dashboard, and can be used while Search Console
   data is still collecting.

## What this does not need

No cookie banner is needed for this setup. Search Console itself sets no
tracking on visitors, and the site analytics (Vercel Web Analytics and
Speed Insights) is cookieless, as stated on the Privacy page.
