# Intellumia website

The public website of Intellumia, served at <https://intellumia.com> by GitHub Pages from `main` / `docs`.

Intellumia, the AI partner for owner-run businesses. Intellumia shows owner-run businesses where AI makes them money, runs the parts that do with named professionals signing off, and takes no vendor fees.

Since 3 November 2026 (strategy v5.0) the site is **one page with one action, "Book a call"**, plus the Privacy notice, until Intellumia has 5 to 10 paying clients. The page follows the Round 5 mockup Sundeep approved on 4 November 2026 (Brand System v5.0.8: the centred hero with the founder line and six problem scenes, what we do about it, a worked example, the Map as a heat map, the rules as cards and the questions owners ask). Round 5 goes live only once the chartered accountant reviewer is engaged. The rules for every change are in [`CLAUDE.md`](CLAUDE.md).

## What is here

| Path | What it is |
| --- | --- |
| `docs/index.html` | The page. Hand-written static HTML; GitHub Pages publishes `docs/` as it stands, with no build step. |
| `docs/privacy/index.html` | The Privacy notice. |
| `docs/assets/` | `site.css` (the one stylesheet), `site.js` (the one script: the phone bottom bar), the ultramarine wordmark, the Anek fonts and their licence, the six problem scenes, Sundeep's portrait, the social preview. The heat map and the small drawings are inline SVG in the page. |
| `docs/404.html` | The not-found page, served at any unknown address. |
| Every other HTML file in `docs/` | A redirect to the page, so old links still land on intellumia.com. |
| `docs/CNAME` | The custom domain, `intellumia.com`. Do not change it. |
| `docs/llms.txt`, `docs/robots.txt`, `docs/sitemap.xml` | For answer engines and crawlers. The sitemap lists Home and Privacy only. |
| `.github/workflows/indexnow.yml` | After each push to `main` that touches `docs/`, waits for the deploy and sends the sitemap URLs to IndexNow (Bing). |
| `scripts/check_copy.py` | The copy and one-page checks. Run before every pull request. |
| `scripts/make_fallback.py` | Rebuilds the fallback at the root from `docs/`. |
| `index.html`, `privacy.html`, `favicon.*`, `apple-touch-icon.png`, `robots.txt`, `sitemap.xml` at the root | The last-resort fallback (see `DEPLOYMENT_AND_ROLLBACK.md`), a copy of the page. Not the live site. |
| `_archive/` | Retired pages and assets of the October 2026 site, the old fallback, the fonts that are not Anek, the corridor scene band (removed 3 Nov 2026), and the plant scene band and its loop (removed 4 Nov 2026). Kept for the record; not published. |
| `archive/next-app/`, `package.json`, `public/` and the other root config files | The retired Phase 1 Next.js app (August 2026). Not published; do not run `npm run build`. |

## Checking a change locally

```bash
python3 scripts/make_fallback.py
python3 scripts/check_copy.py
python3 -m http.server 8000 --directory docs
```

Open <http://localhost:8000> at 360 px wide first. This simple server does not serve `404.html` for unknown paths as GitHub Pages does. The full release checklist is in `CLAUDE.md`; see `DEPLOYMENT_AND_ROLLBACK.md` before any change reaches `main`.
