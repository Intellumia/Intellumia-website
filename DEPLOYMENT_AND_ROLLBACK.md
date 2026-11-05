# Deployment and rollback

## Production

- URL: <https://intellumia.com/>. `www` redirects to the apex domain, and HTTP redirects to HTTPS.
- Host: GitHub Pages, publishing `main` / `docs` as it stands (no build step).
- Repository: <https://github.com/Intellumia/Intellumia-website>.
- Custom domain: `docs/CNAME` (`intellumia.com`).
- DNS, email and the domain registrar are outside the website's scope and are never changed by a release.
- GitHub Pages cannot set response headers, so the security and referrer policies are set in each page's `<head>`.

## How a release goes out

1. Work on a branch and open a draft pull request into `main`. The pull request states its rollback point: the commit `main` is at before the merge.
2. Run the checks in `CLAUDE.md` (`scripts/make_fallback.py`, `scripts/check_copy.py`, then the browser checks at 360, 390, 768, 1100 and 1440 px and Lighthouse), and put the results and screenshots at 360 px and 1440 px in the pull request.
3. The brand studio does its brand check on the pull request; fixes go on the same branch, and the checks run again.
4. Sundeep merges, with a merge commit. Nobody else merges.
5. GitHub Pages runs "pages build and deployment" (about 30 seconds). Confirm the run succeeded for the merge commit.
6. Check the live site: the page and Privacy load, the header and footer are right, `/sitemap.xml` and `/robots.txt` are served, an old address (for example `/product/`) lands on the page, and an unknown path shows the 404 page.
7. The IndexNow workflow runs on the same push and pings Bing with the sitemap URLs. A failed ping does not affect the site.

## Rollback

Every release is a merge commit on `main`, so the quickest rollback is to revert it:

```bash
git revert -m 1 <merge commit>
git push origin main
```

GitHub Pages redeploys the previous site within a minute. Alternatively, restore `docs/` from the release's rollback point and push.

Last resort, if `docs/` is unusable: in the repository's Pages settings, switch the source from `main` / `docs` to `main` / root. That serves the fallback kept at the repository root: a copy of the page and Privacy, rebuilt from `docs/` by `scripts/make_fallback.py` with every release (white, since 3 Nov 2026). The root carries `.nojekyll`, so in that mode `_archive/` and `archive/` would also be reachable by address; nothing links to them.

## History rewrite (5 Nov 2026)

On Sundeep's word, the plant loop (`plant-loop.mp4`, `plant-loop.webm`, first in `docs/assets/imagery/`, then in `_archive/plant-band-2026-11-04/`) was removed from the git history.
- Only those four paths were removed, and only in the 49 commits from `08b01f2` (3 Nov 2026) to `main`. Every file at the tip of `main` is byte-identical: the tree is the same, `f53ea0d`.
- Those 49 commits have new ids. The release log below shows the new ones, and earlier commits keep theirs.
- `main` moved from `ba4f33b` to `4566ed3`.
- The full old-to-new map is in the Drive change note "2026-11-05 Change note: website, plant loop removed from the git history".

**The backup:** the old history is on the branch `backup/pre-history-rewrite-2026-11-05` (at `ba4f33b`), until Sundeep has it deleted. To undo the rewrite:

```bash
git push --force origin backup/pre-history-rewrite-2026-11-05:main
```

**Old clones:** a clone made before 5 Nov 2026 must not push. Re-clone, or run `git fetch origin && git reset --hard origin/main` on each branch.

**Still on GitHub:** the pull request pages #42 to #50 still show the old commits. GitHub keeps their refs until GitHub Support removes them.

## Release log

| Date | Release | Merge commit | Rollback point |
| --- | --- | --- | --- |
| 15 Oct 2026 | Site v2 on Brand System v1.3.2 (#25, #26) | `28aa145` | `273f367` |
| 17 Oct 2026 | Wordmark, Brand System v1.4.1 (#27); zip removed (#28) | `4ab5bd7`, `30f093f` | `28aa145` |
| 18 Oct 2026 | intellumia.com v3, direction C (#29) | `5db5e55` | `30f093f` |
| 20 Oct 2026 | Brand v1.5: Anek only, Intellumia in text, five steps (#30) | `176067c` | `5db5e55` |
| 21 to 22 Oct 2026 | Release v1.5 Phase 1 and 2, Hairline art (#31, #32, #33) | `c36d78a`, `c01ff92`, `309e679` | `176067c` |
| 23 Oct 2026 | intellumia.com v2, product-led (#34) | `87b4797` | `309e679` |
| 27 Oct 2026 | Registered address: 60 Paya Lebar Road, #06-28 Paya Lebar Square (direct commits) | `dd28b4b`, `0fbcfe0` | `87b4797` |
| 30 Oct 2026 | Website blockers closed (time commitment, brief address, privacy approved); voice check complete (#35) | `126c548` | `b46f985` |
| 31 Oct 2026 | One floating "Talk to Sundeep" button replaces every booking button (#36) | `881e7ca` | `f6261c1` |
| 3 Nov 2026 | intellumia.com is one page on strategy v5.0: one button, Book a Map; Privacy; a new 404 page; every retired address redirects to the page (#37) | `1b0327f` | `9c7b35e` |
| 3 Nov 2026 | Book a Map points at cal.com/intellumia/meetsk; cal.com/meetsk had stopped working (#39) | `f381a0e` | `d8e9fb3` |
| 3 Nov 2026 | One floating "Book a Map" button on every page, in place of three (#40) | `d94135d` | `f381a0e` |
| 3 Nov 2026 | Brand System v5.0.2: the button reads "Talk to Sundeep"; the Map named; new time line; the close; LinkedIn (#41) | `b2c367e` | `6fe9506` |
| 3 Nov 2026 | The one page from the approved mockup (Brand System v5.0.4): who we work with, where it starts, how it works, the Map, our rules, Sundeep and the close; the plant band as a slow loop with its Pause button, and the corridor band; the phone bottom bar (#42) | `fc3ee2d` | `98f18de` |
| 4 Nov 2026 | The corridor scene band removed on Sundeep's word; its files moved to `_archive/corridor-band-2026-11-03/` (#43) | `ae29f08` | `8f1089b` |
| 4 Nov 2026 | Round 4, Brand System v5.0.5: the leaks diagram opens "Where it starts" (from 900 px); department labels and First move / Next move tags on the door stories; the plant band and its loop removed, their files moved to `_archive/plant-band-2026-11-04/` (#44) | `fba8df4` | `277b916` |
| 4 Nov 2026 | Rounds 4b and 5, Brand System v5.0.6 to v5.0.8: "Book a call" everywhere and the centred hero; then the full page built piece by piece: header links, the founder line, "Sound familiar?" with six problem scenes, what we do about it, a worked example, the Map as a heat map, the rules as cards, the FAQ and the new close; four red things, never two on one screen; no decorative motion; the leaks diagram removed. Merged on Sundeep's approval; he lifted the condition to wait for the chartered accountant reviewer (#45) | `b8da955` | `98dcbca` |
| 4 Nov 2026 | The plant loop (`plant-loop.mp4`, `plant-loop.webm`) deleted from `_archive/plant-band-2026-11-04/` on Sundeep's word, the band's still pictures kept; the LinkedIn address confirmed; no change to the published site (#46) | `1c65ce3` | `1737e71` |
| 4 Nov 2026 | Round 6: the scenes panel's heading ("Most owner-run businesses have money hiding in plain sight.") and caption ("Fix what holds it back, and it is yours to claim.") in place of "Sound familiar?"; the paragraph under "What we do about it"; "Who we work with" after it; two FAQ questions (eight in all) (#47) | `889865f` | `e6e6536` |
| 4 Nov 2026 | Round 7, no visible change: the Google Search Console verification tag; structured data written from the page by `scripts/make_structured_data.py` (WebSite, WebPage, FAQPage, Service with Map, Run and Guide, Organization additions; no prices); og:locale and Twitter tags; sitemap lastmod; `/.well-known/security.txt` (#48) | `e189196` | `163e0e2` |
| 5 Nov 2026 | Round 7b: the Search Console verification file (`/googlebe2efba1afc3cbe9.html`); Cloudflare Web Analytics (cookie-free) on Home, Privacy and 404, added by an inline loader in the head after load and first paint, allowed by its hash; Privacy says so in plain words; a metric-matched fallback font, so the Anek swap no longer moves the page (#49) | `c205c3f` | `88b518d` |
| 5 Nov 2026 | Round 7c, no visible change: the Organization's sameAs is the company LinkedIn page (linkedin.com/company/intellumia); the one sales contact keeps the site's email, adds the booking link and stays in English, no separate Hindi contact (#50) | `d6d43a3` | `cc0bdbf` |

Add a row for every merge to `main` that changes `docs/`.
