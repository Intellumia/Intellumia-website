# Brief for Claude Code: ship the new intellumia.com as a pull request

Repo: Intellumia/Intellumia-website (GitHub Pages serves main / docs at intellumia.com; DNS at IONOS is untouched).

## What to do
1. Create branch `site-v2-brand-1-3-2` from main. Record the current main commit in the PR as the rollback point.
2. Replace the contents of `docs/` with the `docs/` folder in this package. Keep `docs/CNAME` (intellumia.com) and `.nojekyll`.
3. The new site is plain static HTML with no JavaScript. Do NOT run `npm run build` afterwards: it would overwrite `docs/` with the old Next.js export. Move `app/` and the Next config to `archive/next-app/` in the same PR so nobody rebuilds the old site by accident.
4. Old URLs: `/about/` redirects to `/connect/`. `/connect/`, `/how-it-works/`, `/lab/`, `/point-of-view/` and `/privacy/` keep their paths. New: `/where-ai-works-today/`, `/sales-engine/`.
5. Open the PR with: the screenshots in `screenshots/`, the release checklist from the intellumia-website skill, and the rollback commit. Do not merge. Sundeep approves and merges.

## Already checked before handover (15 Oct 2026)
- Copy check (em dashes, banned words, American spelling, price hooks): clean on all pages.
- Every page loads (200) at 1440 px and 390 px with no sideways scrolling; 404 page works.
- No third-party requests: fonts self-hosted (Anek Latin with width axis, Mukta), no analytics, no cookies, CSP blocks scripts.
- Per page: title, description, canonical, Open Graph and social preview image, JSON-LD (Organization everywhere, WebSite on home, Person on /connect/), sitemap.xml, robots.txt, llms.txt.
- Brand System v1.3.2: plain v2.2 lockups, Carbon and Warm Light grounds, lime for action only, violet for thesis and evidence only, approved living field, Hairline stills, threshold plate with the exact mark, official icons.

## After merge
Check intellumia.com on a phone and a laptop, submit sitemap.xml in Google Search Console, and run Lighthouse on the home page (targets: performance 95+, accessibility 100).
