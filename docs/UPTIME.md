# Uptime monitoring for izaz.dev

Audit item 48. The weekly link check is automated in
`.github/workflows/link-check.yml`. Uptime monitoring needs an account
on an outside service, so it cannot be created from this repo. The
steps below are the exact setup for a free UptimeRobot monitor.

## Status

**Not created yet.** No UptimeRobot account exists for this blog yet.
The monitor itself is pending izaz creating the account and following
the steps below. Nothing in this file is a live monitor, it is the
setup procedure only.

## Free plan facts

Checked 20 Nov 2026 against UptimeRobot's own pricing and help pages:
the free plan covers 50 monitors, checks every 5 minutes, sends email
alerts, and needs no credit card. One monitor is enough for this blog.

## Setup steps

1. Go to https://uptimerobot.com and click Sign Up Free.
2. Create the account with izaz's email and verify it through the
   confirmation email UptimeRobot sends.
3. Log in to the UptimeRobot dashboard.
4. Click **Add New Monitor** (or the **+** button, then Add New Monitor).
5. Fill in the monitor exactly as follows:

   | Field | Value |
   | --- | --- |
   | Monitor Type | HTTP(s) |
   | Friendly Name | izaz.dev blog (production) |
   | URL (or IP) | https://izaz-cyber-blog.vercel.app |
   | Monitoring Interval | 5 minutes |
   | Monitor Timeout | 30 seconds (the default) |
   | HTTP Method | GET (the default) |

6. Click **Create Monitor**.
7. Wait a few minutes. The monitor status should change to Up. If it
   shows Down at once, open https://izaz-cyber-blog.vercel.app in a
   browser first: if the site loads there, re-check the URL typed into
   the monitor for a typo before changing anything else.
8. Add an alert contact so a downtime email actually arrives:
   go to **Alert Contacts**, add **Email**, enter
   mizazhaiderceh@gmail.com, confirm it, then open the monitor,
   go to **Alert Contacts** on the monitor, and tick that email
   contact on. A monitor with no alert contact watches silently.
9. Optional second monitor, same steps, for one article page, to
   catch a broken article route even when the home page is up:
   Friendly Name `izaz.dev blog (article)`, URL
   https://izaz-cyber-blog.vercel.app/blog/building-a-practical-linux-security-lab,
   interval 5 minutes.

## When it alerts

1. Open the live site in a browser. If it loads, the alert may be a
   short Vercel hiccup: wait for the next check (5 minutes) and see
   whether UptimeRobot reports Up again on its own.
2. If the site is really down, check the Vercel dashboard for the
   project deployment status and the latest deployment log.
3. Fix what the link check and the deploy log point to, then confirm
   the monitor is Up again. Do not delete the monitor after an alert,
   a deleted monitor loses its history.

## Related automation

- Weekly broken link check: `.github/workflows/link-check.yml`,
  Mondays 08:00 UTC against the same live URL.
- CI with Lighthouse thresholds: `.github/workflows/ci.yml` and
  `lighthouserc.json` (audit item 50).
