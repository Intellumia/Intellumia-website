# intellumia.com: rules for every change

The site follows Intellumia strategy v5.0 and the Brand System v5.0.6 ("Brand System (current).md" in Drive, brand folder). The page itself is the approved mockup of 4 November 2026: Drive Intellumia/website/mockup/index-final.html (Brand System v5.0.5: the leaks diagram replaces the scene bands and the plant loop; v5.0.6: the new hero and the "Book a call" button), with its section list in "Website page copy (current).md" beside it. If this file and the Brand System or the mockup disagree, they win; say so in the pull request.

## The one-page rule

Until Intellumia has 5 to 10 paying clients, intellumia.com is **one page with one action, "Book a call"**, plus the Privacy notice. Nothing else is published.

- `docs/index.html` is the page. `docs/privacy/index.html` is Privacy. `docs/404.html` is the not-found page GitHub Pages serves at any unknown address (`noindex`, absolute paths only): "Page not found", "There is nothing at this address.", the headline "Where can AI make you money?" and "Go to intellumia.com" (approved by Sundeep, 3 November 2026; headline from v5.0.6).
- Every other HTML file under `docs/` is a redirect to `https://intellumia.com/`: a meta refresh to `/`, a canonical link to `https://intellumia.com/` and `noindex`. Never delete one: old links must keep landing on the page.
- Retired pages and assets live in `_archive/` at the repository root, outside `docs/`, so GitHub Pages never publishes them. Nothing is deleted; it is moved there.
- A new page, section, line or button needs Sundeep's written approval first.

## The words

The page carries the mockup's words and nothing else, in the mockup's order. `scripts/check_copy.py` holds every line and fails on any other line or any change of order, so a wording change goes into the page and the script in the same commit.

1. Header: the ultramarine wordmark, and the "Book a call" button on wide screens (see The action). No navigation.
2. Hero, centred, and nothing else in it: the Label "The AI partner for owner-run businesses"; the Statement "Where can AI make you money?" with "money" as the one red word; the line "We find it in your numbers. Then we run it for you." (`text-wrap: balance`); the button and its note "30 minutes, by video. Nothing to prepare."; then, directly under it and inside the hero section, the leaks figure (from 900 px only, see The look), so its top shows on a laptop's first screen. The proof line is not in the hero: "Our rules" carries it.
3. Who we work with: "For owner-run companies across India, where the owner decides and signs the cheque." and the five industries.
4. Where it starts: the five door stories, each with its department label (Plant and operations, Finance, MIS and reporting, IT and vendors, Owner's office), the owner's situation and what we give. Finance carries the "First move" tag and Plant and operations the "Next move" tag, at every width.
5. How it works: Map (start here), Run (if you choose), Guide (alongside).
6. The Map: the meeting statement ("In two to three weeks, starting from summaries of your own books, ..."), the Map drawing (four columns on wide screens, two on phones, both inline SVG with a label for screen readers, up to 760 px wide) and its caption "Illustration of a Map, not a client.", what it gives you, "Your time: about 20 to 40 hours of your staff across the two to three weeks. We agree it with you before we start.", and how the weeks run.
7. Our rules: six rules.
8. Sundeep: the black and white portrait (alt "Sundeep Kumar, Founder and CEO of Intellumia"), "Who you will work with", the trust line as his quote, "Sundeep Kumar, Founder & CEO", the founder line, and "Sundeep on LinkedIn" (the same profile is `sameAs` on the Person in the structured data). "Based in India", never a city; never IBM figures or IBM client names.
9. The close: the ultramarine plate with "Start with one question", the opening question "Where does your business lose the most cash, days or margin today?", the white button and its note "30 minutes, by video. Nothing to prepare."
10. Footer: the wordmark, "Working with owners across India.", the ACRA-registered address, sundeep@intellumia.com, Privacy, "Intelligence, Illuminated."

Title and og:title: "Intellumia, the AI partner for owner-run businesses". og:image:alt: the headline, "Where can AI make you money?". Description and og:description: the 25 words, "Intellumia shows owner-run businesses where AI makes them money, runs the parts that do with named professionals signing off, and takes no vendor fees." The descriptor "an AI-native product company, starting with service" appears on Privacy only. `docs/llms.txt` repeats the page in its own words: who we work with, where it starts, Map, Run, Guide, the Map, the rules and Sundeep.

Never on any published surface (page, Privacy, llms.txt, structured data):

- Any price, price range, tier or fee model, and the words fixed, monthly, free, pilot, assessment, retainer, package, plan, rate card. ("For a fee agreed up front" is the approved way to say the Map is paid.)
- Client names or logos, case studies, results, testimonials, "trusted by", invented numbers.
- Run modules or engines by name; any platform described as existing; "live", "demo opening soon", "in build".
- AI-powered, harness, transformation, consultancy, solution, leverage, unlock, empower, revolutionary, game-changing, guaranteed, journey, replace your team, PoC, the layer, cash cycle first, the judgement engine, "an AI team does the work".
- Retired terms: judgement engine, decision intelligence, intelligence layer, Decision Sprint, 90-day build, Embed, Sales Engine, Plant Engine, Cash Engine, owner-led (now "owner-run"), "Rent the model", research desk, the owner's brief.
- Fear, urgency or scarcity; market statistics.
- Forms, newsletters, analytics, cookies, chat widgets, third-party scripts.
- "Book a Map" as a button label or anywhere else: a Map is paid work priced in a proposal, and the button opens a 30-minute call.
- "Talk to Sundeep" anywhere (since v5.0.6 the button reads "Book a call"), and the retired hero line "Where will AI make your business money? We will show you, then run it."
- Em dashes, emoji, italics, American spelling. British English, sentence case. "Intellumia" with a capital I in text; only the logo is lower case. "Map" is a name and is capitalised.

## The look

The mockup's CSS lives in `docs/assets/site.css`, the one stylesheet. Keep its breakpoints (600, 768, 900, 1000 and 1100 px) and sizes.

- Colours: white ground `#FFFFFF`, ink `#101010`, ultramarine `#1A1AFF` for buttons, links, the first step and the closing plate. Bone `#F3EFE6` for the Map figure, the industry chips and the How it works and Our rules bands. Rule `#DDD8CC`, muted `#5E5B55`. The mockup's two tints: `#2A2926` for second text and `#E6E6FF` for small words on ultramarine; in the Map drawing only, `#EEEAE0` and `#5252FF` for the empty part of a worth bar; in the leaks drawing only, yellow `#FFC800` for the money (the drops and the tray). No dark mode, gradients or shadows.
- The one red thing: vermilion `#FF3D00` on the word "money" in the hero, at Statement size only (and the same word on the social preview image). Never on a button, small text or the plate, and nowhere else.
- Logo: `docs/assets/intellumia-wordmark-ultramarine.svg`, at least 96 px wide, never on a photograph. Favicons: the ink tile with the white ll.
- Type, Anek Latin only, self-hosted from `docs/assets/fonts/` with `OFL-Anek.txt` beside the files: Statement 650 width 80, 48 to 96 px in the centred hero (the plate's question 34 to 64 px); Heading 620, 30 to 52 px; Lead 600, 19 to 22 px; Body 400, 17 to 18 px; Label 600, capitals, +0.12em, 12 to 13 px. Tabular figures; emphasis by colour, never italics.
- Corners: 0 for pictures, 6 for buttons, chips and the move tags, 10 for the Map figure, the leaks panel and the step cards.
- Pictures: Sundeep's portrait only. No scene bands and no video on the website (Brand System v5.0.5: the house scenes are for decks and LinkedIn); the plant and corridor bands and the plant loop are kept in `_archive/`.
- The leaks diagram (Brand System v5.0.5; v5.0.6 moves it into the hero, directly under the button): the business as five rooms, money dripping from each into "Money lost every month", finance plugged as the first move, plant marked as the next move. An inline SVG labelled by its `title` and `desc`, on the bone panel, with the caption "Illustration, not a client. Where money usually leaks in an owner-run business. ...". Shown from 900 px, hidden below, where the door stories carry the same departments and tags.
- Motion: one animation, the leaks drawing's drops falling, by the CSS inside the drawing and only under `prefers-reduced-motion: no-preference`; everyone else sees the drops still. No video and no other animation anywhere. The phone bar's slide and smooth scrolling to the top come from the mockup, and reduced motion removes both.
- The section head of "Our rules" is sticky from 1000 px; "Where it starts" is not.
- Mobile first: check at 360 px first.

## The action

"Book a call" opens <https://cal.com/intellumia/meetsk>, Sundeep's 30-minute cal.com event, in a new tab (`target="_blank" rel="noopener"`). Its note: "30 minutes, by video. Nothing to prepare." beside the hero and closing buttons; "30 minutes, by video" in the phone bar. Never link `cal.com/meetsk`: that username is no longer Sundeep's. Never create accounts or change cal.com settings; Sundeep manages the event himself.

- On the page it appears in the header (from 900 px only), in the hero, and on the closing plate (white button).
- On phones (below 900 px), a white bottom bar with "30 minutes, by video" and the button appears only after the hero has scrolled away, and hides while the closing plate is on screen. It starts hidden (`aria-hidden`, out of the tab order) and has no slide for reduced motion. `scroll-padding-bottom` keeps a focused link from hiding under it.
- On Privacy and the 404 page there is no bar: the header button shows at every width (`hdr--always`).
- No other button, and no floating button.

## Script

`docs/assets/site.js` is the only script, loaded by the page alone (`script-src 'self'` in its security policy; Privacy, the 404 page and the redirects keep `script-src 'none'`). It runs the bottom bar and nothing else: no addresses, no storage, no tracking. Without it the bar stays hidden. The leaks drawing needs no script.

## Files

| Path | What it is |
| --- | --- |
| `docs/index.html`, `docs/privacy/index.html`, `docs/404.html` | The page, Privacy and the not-found page, hand-written HTML. |
| `docs/assets/site.css`, `docs/assets/site.js` | The one stylesheet and the one script. |
| `docs/assets/imagery/` | Sundeep's portrait (720 and 890 px). |
| `docs/assets/social-preview.jpg` | 1200 x 630: white, the ultramarine wordmark, the headline "Where can AI make you money?" in ink with "money" in vermilion, no picture. The earlier one is in `_archive/`. |
| `docs/llms.txt`, `docs/robots.txt`, `docs/sitemap.xml` | The page in words for answer engines; every crawler allowed, AI crawlers named; Home and Privacy only. |
| `docs/<key>.txt` | The IndexNow key. `.github/workflows/indexnow.yml` pings the sitemap URLs after each deploy. |
| `index.html`, `privacy.html` at the root | The last-resort fallback, a copy of the page made by `scripts/make_fallback.py`. Never edit by hand. |
| `_archive/` | Retired pages, assets (the scene bands and the plant loop among them), fonts and the old fallback. Not published. |
| `archive/next-app/` and the root Next.js files | The retired Phase 1 app. Not published; never run `npm run build`. |

Structured data (JSON-LD): Organization and Person on Home, Organization on Privacy, no offers or prices.

## Before every pull request

1. `python3 scripts/make_fallback.py` (keeps the root fallback in step with `docs/`).
2. `python3 scripts/check_copy.py`: all checks must pass. Paste the result into the pull request.
3. In a browser at 360, 390, 768, 1100 and 1440 px: no sideways scroll, Anek only, white ground, the one red word, the action where The action puts it, the bottom bar's show and hide, the leaks figure from 900 px and hidden below, the drops falling and still for reduced motion, the door tags at every width, every old URL lands on the page, an unknown address shows the 404 page, axe-core finds no WCAG 2.2 AA violations.
4. Lighthouse on Home and Privacy, mobile and desktop. Budgets: LCP 2.0 s on mobile, INP 150 ms (report Total Blocking Time as the lab stand-in), CLS 0.05, under 500 KB on first view (the portrait is the only picture, below the fold and lazy).
5. Screenshots of the whole page at 360 px and 1440 px in the pull request.

Then follow `DEPLOYMENT_AND_ROLLBACK.md`. Open pull requests as drafts. Sundeep merges; nobody else does.
