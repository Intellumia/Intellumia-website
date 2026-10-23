# Intellumia website

The public website of Intellumia, served at <https://intellumia.com> by GitHub Pages from `main` / `docs`.

Intellumia is the judgement engine for owner-led businesses: it learns how your best people decide and runs those decisions on your data. You own it.

## What is here

| Path | What it is |
| --- | --- |
| `docs/` | The live site. Hand-written static HTML, one folder per page, sharing `docs/assets/site.css`. GitHub Pages publishes this folder as it stands: there is no build step. |
| `docs/CNAME` | The custom domain, `intellumia.com`. Do not change it. |
| `.github/workflows/indexnow.yml` | After each push to `main` that touches `docs/`, waits for the deploy and sends every sitemap URL to IndexNow (Bing). |
| `archive/next-app/` | The retired Phase 1 Next.js source (August 2026). Kept for the record; nothing builds from it. |
| `package.json`, `scripts/`, `public/` and the other root config files | Belong to the retired Next.js app. Do not run `npm run build`: it would try to regenerate `docs/` from the retired source. |
| `index.html`, `privacy.html`, `robots.txt`, `sitemap.xml` at the root | The holding page, kept as the last-resort fallback (see `DEPLOYMENT_AND_ROLLBACK.md`) and refreshed to the v2 brand on 23 Oct 2026. Not the live site. |

## Pages (v2, product-led)

| Route | Page |
| --- | --- |
| `/` | Home: the product named on the first screen, the living field, where owners start, the layer, how you start, why now, research, the close |
| `/product/` | The intelligence layer and its engines |
| `/sales-engine/` | The Sales Engine for real estate developers, with a static picture of the sandbox (demo opening soon) |
| `/industries/` | Industries index |
| `/industries/auto-components/`, `/industries/real-estate/`, `/industries/chemicals-and-pharma/` | Answer pages: question heading, short answer, three places, how we do it, FAQ |
| `/research/` | Our studies (publishing soon) and sourced market views |
| `/how-we-work/` | The method in four steps and the three stages: Decision Sprint, the 90-day build, Embed |
| `/about/` | Sundeep Kumar and the company |
| `/connect/` | Book 30 minutes (booking on cal.com/meetsk) |
| `/next-generation/` | For the next generation |
| `/point-of-view/` | Our published pieces. `noindex`, and not linked from the footer, until the first entry |
| `/privacy/` | Privacy notice |
| `404.html` | Page not found |

Redirects (meta refresh, `noindex`): `/how-it-works/` and `/lab/` to `/how-we-work/`; `/where-ai-works-today/` and its old entry pages to `/industries/` or the matching page.

## House rules for every page

These come from the Brand System (current) in Drive; it wins if anything here disagrees.

- Carbon ground (`#101010`) only. Signal lime for action only, violet for evidence and the tagline only.
- Anek only, from `docs/assets/fonts/`. No other typeface, no third-party fonts.
- Never words on an image: every picture sits in its own panel beside the text, with alt text that describes what is drawn.
- The name is written "Intellumia" with a capital I; only the logo is lower case. The legal entity stays "Intellumia Pte. Ltd.".
- British English, sentence case, no em dashes. No fees on the site: How we work shows each stage's duration and outcome only.
- Every number carries its source and evidence state ("Market evidence, not an Intellumia result", "Sample data. Illustration, not a client result").
- No scripts: each page sets a Content-Security-Policy with `script-src 'none'`. The only script tags are JSON-LD structured data.
- No cookies, analytics, tracking or forms. The owner's brief sign-up is an email link until a form endpoint is approved.

## Editing a page

- Each page is a complete HTML file. The header, footer and `<head>` are repeated on every page, so a change to navigation, the footer, the descriptor or the security policy must be made on every page in the same commit.
- Page titles end with "| Intellumia, an AI-native product company, starting with service" (Home uses the category line).
- Every page carries Organization structured data with the one company description above. Home adds WebSite; About and Book 30 minutes add Person; Product and the industry pages add FAQPage, whose answers must match the page word for word; the Industries pages add BreadcrumbList.
- A new indexable page also goes into `docs/sitemap.xml` and `docs/llms.txt`. When Point of view gets its first entry, remove its `noindex`, add it to both files and put it back in the footer on every page.

## Search and answer engines

- `docs/robots.txt` allows all crawlers and names Googlebot, Bingbot, OAI-SearchBot and PerplexityBot.
- `docs/sitemap.xml` lists every indexable page; `docs/llms.txt` summarises the company and links the pages.
- `docs/<key>.txt` is the IndexNow key file; `.github/workflows/indexnow.yml` uses it after each deploy.
- Google Search Console is verified, with the sitemap and homepage submitted, and Bing imports from Search Console (Sundeep, 22 Oct 2026).

## Checking a change locally

```bash
python3 -m http.server 8000 --directory docs
```

Open <http://localhost:8000>. This simple server does not serve `404.html` for unknown paths as GitHub Pages does.

Before a release, check at 390, 768, 1100 and 1440 px wide: every page loads with no sideways scroll, the menu works on phone and tablet, every internal link and redirect resolves, axe-core finds no WCAG 2.2 AA violations, Lighthouse stays at or near 100, and the text has no em dashes and no lower-case "intellumia" outside URLs and file names.

See `DEPLOYMENT_AND_ROLLBACK.md` before any change reaches `main`.
