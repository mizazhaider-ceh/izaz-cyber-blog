# Newsletter

Status: built, pending the user creating a Buttondown account and setting
the username. Until then the signup renders nothing on the home page, so
no dead form ever ships.

## What it is

- A plain HTML form on the home page, below the Topics section.
- It posts straight to Buttondown, so the blog needs no backend, no API
  key, and no database of its own.
- Frequency, stated honestly on the page: one email per new post, no more.
- Archive: the blog index at `/blog`. The signup links to it.
- No popup, no first-visit prompt, no subscriber numbers anywhere.
- Unsubscribe: one click from any email, built into Buttondown.

## Setup (about 5 minutes)

1. Create a free Buttondown account at https://buttondown.com
2. Note your Buttondown username. It is the name in your public
   Buttondown address, for example `buttondown.com/izaz` means the
   username is `izaz`.
3. Open `src/components/NewsletterSignup.tsx` and set
   `BUTTONDOWN_USERNAME` to that username. Do not guess one, and do
   not use anyone else's.
4. Check the home page. The signup section appears only once the
   username is set.

## Sending

After publishing a new post, send it from Buttondown. Either send the
post manually from the Buttondown dashboard after publishing, or set
up Buttondown's RSS-to-email option if it is included in your plan,
so new posts go out automatically. Do not promise readers an email
for a post that was never sent.

## Testing after setup

1. Set the username, then load the home page and confirm the signup
   section appears below Topics.
2. Subscribe with your own email address and confirm the Buttondown
   confirmation email arrives.
3. Confirm the confirmation opens in a new tab and the blog page
   stays open.
4. Confirm the unsubscribe link in a received email works.
5. Confirm the archive link in the signup goes to `/blog`.

## Changing provider later

Only two places know about Buttondown: the form action in
`src/components/NewsletterSignup.tsx` and this file. Swap the action
URL and the username constant, update this file, and the rest of the
site is untouched.

## What not to do

- Never ship the form with an empty or guessed username.
- Never add a popup, a slide-in, or an exit prompt.
- Never state a frequency the sending habit cannot keep, and never
  show subscriber counts.
