# intellumia.com: rules for every change

The site follows Intellumia strategy v5.0 and the Brand System v5.0.1 ("Brand System (current).md" in Drive, brand folder). If this file and the Brand System disagree, the Brand System wins; say so in the pull request.

## The one-page rule

Until Intellumia has 5 to 10 paying clients, intellumia.com is **one page with one button, "Book a Map"**, plus the Privacy notice. Nothing else is published.

- `docs/index.html` is the page. `docs/privacy/index.html` is Privacy. `docs/404.html` is the not-found page GitHub Pages serves at any unknown address (`noindex`, absolute paths only): "Page not found", "There is nothing at this address.", the hero line, the button and "Go to intellumia.com" (approved by Sundeep, 3 November 2026).
- Every other HTML file under `docs/` is a redirect to `https://intellumia.com/`: a meta refresh to `/`, a canonical link to `https://intellumia.com/` and `noindex`. Never delete one: old links must keep landing on the page.
- Retired pages and assets live in `_archive/` at the repository root, outside `docs/`, so GitHub Pages never publishes them. Nothing is deleted; it is moved there.
- A new page, section, line or button needs Sundeep's written approval first.

## The words

The page carries the approved lines and nothing else, in this order. `scripts/check_copy.py` holds the exact text and fails on any other line, so a wording change goes into the page and the script in the same commit.

1. Header: the wordmark in ultramarine on the left, one button "Book a Map" on the right. No navigation.
2. Hero (Statement): "Where will AI make your business money? We will show you, then run it." Button: "Book a Map".
3. Proof line (Lead).
4. How it works (Body): the meeting statement, "In two to three weeks, ...".
5. Heading "What the Map gives you", the five items, then "Your time: about 20 to 40 hours of your staff, said up front."
6. Sundeep's black and white portrait, "Sundeep Kumar, Founder & CEO" and the founder line. "Based in India", never a city; never IBM figures or IBM client names.
7. The "Book a Map" button once more.
8. Footer: the registered address, sundeep@intellumia.com, Privacy, "Intelligence, Illuminated."

Title and og:title: "Intellumia, the AI partner for owner-run businesses". Description and og:description: the 25 words, "Intellumia shows owner-run businesses where AI makes them money, runs the parts that do with named professionals signing off, and takes no vendor fees." The descriptor "an AI-native product company, starting with service" appears on Privacy only.

Never on any published surface (page, Privacy, llms.txt, structured data):

- Any price, price range, tier or fee model, and the words fixed, monthly, free, pilot, assessment, retainer, package, plan, rate card.
- Client names or logos, case studies, results, testimonials, "trusted by".
- Run modules or engines by name; any platform described as existing; "live", "demo opening soon", "in build".
- AI-powered, harness, transformation, consultancy, solution, leverage, unlock, empower, revolutionary, game-changing, guaranteed, journey, replace your team, PoC, the layer, cash cycle first, the judgement engine, "an AI team does the work".
- Retired terms: judgement engine, decision intelligence, intelligence layer, Decision Sprint, 90-day build, Embed, Sales Engine, Plant Engine, Cash Engine, owner-led (now "owner-run"), "Rent the model", research desk, the owner's brief.
- Fear, urgency or scarcity; market statistics.
- Forms, newsletters, analytics, cookies, chat widgets, third-party scripts.
- Em dashes, emoji, italics, American spelling. British English, sentence case. "Intellumia" with a capital I in text; only the logo is lower case. "Map" is a name and is capitalised.

## The look

- Colours: white ground `#FFFFFF`, ink text `#101010`. Ultramarine `#1A1AFF` for the button and links only. Bone `#F3EFE6` for one panel only (the Map list). Rule `#DDD8CC` for hairlines, muted `#5E5B55` for second text. No dark mode, gradients or shadows.
- The one red thing: vermilion `#FF3D00` on the word "money" in the hero, at Statement size only. Never on the button or small text, and nowhere else.
- Logo: `docs/assets/intellumia-wordmark-ultramarine.svg` from Drive brand/logo, at least 96 px wide, clear space half its height, never on a photograph. Favicons: the ink tile with the white ll, from Drive brand/avatars and favicons.
- Type: Anek Latin only, self-hosted from `docs/assets/fonts/` with `OFL-Anek.txt` beside the files. Statement 650 width 80, 48 to 104 px. Heading 620, 32 to 60 px. Lead 600, 20 to 22 px. Body 400, 17 to 18 px. Label 600, capitals, +0.12em, 12 to 13 px. Tabular figures; emphasis by colour, never italics.
- Spacing from 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Corners: 0 for the portrait, 6 for buttons, 10 for the panel.
- The portrait is the only picture. No words on a picture, no living field, scenes or illustrations.
- Mobile first: design and check at 360 px first.

## The button

"Book a Map" opens <https://cal.com/meetsk> in a new tab (`target="_blank" rel="noopener"`). Never create accounts or change cal.com settings; Sundeep manages the event himself.

## Files

| Path | What it is |
| --- | --- |
| `docs/index.html`, `docs/privacy/index.html` | The page and Privacy, hand-written HTML. |
| `docs/assets/site.css` | The one stylesheet. |
| `docs/assets/social-preview.jpg` | 1200 x 630: white, the ultramarine wordmark, the hero line in ink, no red, no picture. |
| `docs/llms.txt`, `docs/robots.txt`, `docs/sitemap.xml` | The category line, the 25 words and the Map; every crawler allowed, AI crawlers named; Home and Privacy only. |
| `docs/<key>.txt` | The IndexNow key. `.github/workflows/indexnow.yml` pings the sitemap URLs after each deploy. |
| `index.html`, `privacy.html` at the root | The last-resort fallback, a copy of the page made by `scripts/make_fallback.py`. Never edit by hand. |
| `_archive/` | Retired pages, assets, fonts and the old fallback. Not published. |
| `archive/next-app/` and the root Next.js files | The retired Phase 1 app. Not published; never run `npm run build`. |

Each page sets a Content-Security-Policy with `script-src 'none'`; the only script tags are JSON-LD (Organization and Person on Home, Organization on Privacy, no offers or prices).

## Before every pull request

1. `python3 scripts/make_fallback.py` (keeps the root fallback in step with `docs/`).
2. `python3 scripts/check_copy.py`: all checks must pass. Paste the result into the pull request.
3. In a browser at 360, 390, 768, 1100 and 1440 px: no sideways scroll, Anek only, white ground, the one red word, every old URL lands on the page, an unknown address shows the 404 page, axe-core finds no WCAG 2.2 AA violations.
4. Lighthouse on Home and Privacy, mobile and desktop. Budgets: LCP 2.0 s, INP 150 ms (the page has no scripts; report Total Blocking Time as the lab stand-in), CLS 0.05, under 500 KB on first view.
5. Screenshots at 360 px and 1440 px in the pull request.

Then follow `DEPLOYMENT_AND_ROLLBACK.md`. Open pull requests as drafts. Sundeep merges; nobody else does.
