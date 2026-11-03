# intellumia.com: rules for every change

The site follows Intellumia strategy v5.0 and the Brand System v5.0.4 ("Brand System (current).md" in Drive, brand folder). The page itself is the approved mockup of 3 November 2026: Drive Intellumia/website/mockup/index-motion.html (the same as index.html except the plant band), with its section list in "Website page copy (current).md" beside it. If this file and the Brand System or the mockup disagree, they win; say so in the pull request.

## The one-page rule

Until Intellumia has 5 to 10 paying clients, intellumia.com is **one page with one action, "Talk to Sundeep"**, plus the Privacy notice. Nothing else is published.

- `docs/index.html` is the page. `docs/privacy/index.html` is Privacy. `docs/404.html` is the not-found page GitHub Pages serves at any unknown address (`noindex`, absolute paths only): "Page not found", "There is nothing at this address.", the hero line and "Go to intellumia.com" (approved by Sundeep, 3 November 2026).
- Every other HTML file under `docs/` is a redirect to `https://intellumia.com/`: a meta refresh to `/`, a canonical link to `https://intellumia.com/` and `noindex`. Never delete one: old links must keep landing on the page.
- Retired pages and assets live in `_archive/` at the repository root, outside `docs/`, so GitHub Pages never publishes them. Nothing is deleted; it is moved there.
- A new page, section, line or button needs Sundeep's written approval first.

## The words

The page carries the mockup's words and nothing else, in the mockup's order. `scripts/check_copy.py` holds every line and fails on any other line or any change of order, so a wording change goes into the page and the script in the same commit.

1. Header: the ultramarine wordmark, and the "Talk to Sundeep" button on wide screens (see The action). No navigation.
2. Hero: the Label "The AI partner for owner-run businesses"; the Statement "Where will AI make your business money? We will show you, then run it." with "money" as the one red word; the short meeting statement; the proof line; the button and its note "30 minutes, by video. We start with your numbers, not with AI."; the Map drawing (four columns on wide screens, two on phones, both inline SVG with a label for screen readers) and its caption, "Illustration of a Map, not a client. ...".
3. Who we work with: "For owner-run companies across India, where the owner decides and signs the cheque." and the five industries.
4. The plant scene band: a slow silent loop, with its Pause button.
5. Where it starts: the five door stories, each an owner's situation and what we give.
6. How it works: Map (start here), Run (if you choose), Guide (alongside).
7. The Map: what it gives you, "Your time: about 20 to 40 hours of your staff across the two to three weeks. We agree it with you before we start.", and how the weeks run.
8. Our rules: six rules.
9. The corridor scene band.
10. Sundeep: the black and white portrait (alt "Sundeep Kumar, Founder and CEO of Intellumia"), "Who you will work with", the trust line as his quote, "Sundeep Kumar, Founder & CEO", the founder line, and "Sundeep on LinkedIn" (the same profile is `sameAs` on the Person in the structured data). "Based in India", never a city; never IBM figures or IBM client names.
11. The close: the ultramarine plate with "Start with one question", the opening question "Where does your business lose the most cash, days or margin today?", the white button and its note.
12. Footer: the wordmark, "Working with owners across India.", the ACRA-registered address, sundeep@intellumia.com, Privacy, "Intelligence, Illuminated."

Title and og:title: "Intellumia, the AI partner for owner-run businesses". Description and og:description: the 25 words, "Intellumia shows owner-run businesses where AI makes them money, runs the parts that do with named professionals signing off, and takes no vendor fees." The descriptor "an AI-native product company, starting with service" appears on Privacy only. `docs/llms.txt` repeats the page in its own words: who we work with, Map, Run, Guide, the Map, the rules and Sundeep.

Never on any published surface (page, Privacy, llms.txt, structured data):

- Any price, price range, tier or fee model, and the words fixed, monthly, free, pilot, assessment, retainer, package, plan, rate card. ("For a fee agreed up front" is the approved way to say the Map is paid.)
- Client names or logos, case studies, results, testimonials, "trusted by", invented numbers.
- Run modules or engines by name; any platform described as existing; "live", "demo opening soon", "in build".
- AI-powered, harness, transformation, consultancy, solution, leverage, unlock, empower, revolutionary, game-changing, guaranteed, journey, replace your team, PoC, the layer, cash cycle first, the judgement engine, "an AI team does the work".
- Retired terms: judgement engine, decision intelligence, intelligence layer, Decision Sprint, 90-day build, Embed, Sales Engine, Plant Engine, Cash Engine, owner-led (now "owner-run"), "Rent the model", research desk, the owner's brief.
- Fear, urgency or scarcity; market statistics.
- Forms, newsletters, analytics, cookies, chat widgets, third-party scripts.
- "Book a Map" as a button label or anywhere else: a Map is paid work priced in a proposal, and the button opens a 30-minute call.
- Em dashes, emoji, italics, American spelling. British English, sentence case. "Intellumia" with a capital I in text; only the logo is lower case. "Map" is a name and is capitalised.

## The look

The mockup's CSS lives in `docs/assets/site.css`, the one stylesheet. Keep its breakpoints (600, 768, 900, 1000 and 1100 px) and sizes.

- Colours: white ground `#FFFFFF`, ink `#101010`, ultramarine `#1A1AFF` for buttons, links, the first step and the closing plate. Bone `#F3EFE6` for the Map figure, the industry chips and the How it works and Our rules bands. Rule `#DDD8CC`, muted `#5E5B55`. The mockup's two tints: `#2A2926` for second text and `#E6E6FF` for small words on ultramarine; in the Map drawing only, `#EEEAE0` and `#5252FF` for the empty part of a worth bar. No dark mode, gradients or shadows.
- The one red thing: vermilion `#FF3D00` on the word "money" in the hero, at Statement size only. Never on a button, small text or the plate, and nowhere else.
- Logo: `docs/assets/intellumia-wordmark-ultramarine.svg`, at least 96 px wide, never on a photograph. Favicons: the ink tile with the white ll.
- Type, Anek Latin only, self-hosted from `docs/assets/fonts/` with `OFL-Anek.txt` beside the files: Statement 650 width 80, 46 to 80 px (the plate's question 34 to 64 px); Heading 620, 30 to 52 px; Lead 600, 19 to 22 px; Body 400, 17 to 18 px; Label 600, capitals, +0.12em, 12 to 13 px. Tabular figures; emphasis by colour, never italics.
- Corners: 0 for pictures, 6 for buttons and chips, 10 for the Map figure and the step cards.
- Pictures: Sundeep's portrait and the two scene bands only. The bands are decorative (`alt=""`, width and height set, `loading="lazy"`), served as WebP (768 px and full width) with the JPG as fallback, and carry no words but the plant band's Pause button.
- The plant band (Brand System v5.0.4): `plant-loop` (9.5 s, silent, seamless; WebM, and MP4 for Safari) in `<video autoplay muted loop playsinline preload="none" aria-hidden="true">`, at the video's own shape (1280:548) so nothing shifts. Its still, `plant2-band` (1600 x 685), is the poster and the only thing shown for reduced motion or without the script. Nothing of the band loads until it is within 100 px of the screen, so it never counts toward the first view. The small white Pause button, bottom right, reads "Play" once paused, with its label updated ("Pause the animation" / "Play the animation", WCAG 2.2.2).
- No other motion anywhere: no animations, no other video; the only transition is the phone bar's slide, which reduced motion removes.
- The section heads of "Where it starts" and "Our rules" are sticky from 1000 px.
- Mobile first: check at 360 px first.

## The action

"Talk to Sundeep" opens <https://cal.com/intellumia/meetsk>, the cal.com event "Talk to Sundeep (30 minutes)", in a new tab (`target="_blank" rel="noopener"`). Never link `cal.com/meetsk`: that username is no longer Sundeep's. Never create accounts or change cal.com settings; Sundeep manages the event himself.

- On the page it appears in the header (from 900 px only), in the hero, and on the closing plate (white button).
- On phones (below 900 px), a white bottom bar with "30 minutes with Sundeep" and the button appears only after the hero has scrolled away, and hides while the closing plate is on screen. It starts hidden (`aria-hidden`, out of the tab order) and has no slide for reduced motion. `scroll-padding-bottom` keeps a focused link from hiding under it.
- On Privacy and the 404 page there is no bar: the header button shows at every width (`hdr--always`).
- No other button, and no floating button.

## Script

`docs/assets/site.js` is the only script, loaded by the page alone (`script-src 'self'` in its security policy; Privacy, the 404 page and the redirects keep `script-src 'none'`). It runs the bottom bar and the plant loop (it sets the poster and the video only near the screen, rests the loop off screen, and works the Pause button) and nothing else: no addresses, no storage, no tracking. Without it the bar stays hidden and the plant band shows its still.

## Files

| Path | What it is |
| --- | --- |
| `docs/index.html`, `docs/privacy/index.html`, `docs/404.html` | The page, Privacy and the not-found page, hand-written HTML. |
| `docs/assets/site.css`, `docs/assets/site.js` | The one stylesheet and the one script. |
| `docs/assets/imagery/` | The portrait, the two scene bands (JPG and WebP) and the plant loop (WebM and MP4). |
| `docs/assets/social-preview.jpg` | 1200 x 630: white, the ultramarine wordmark, the hero line in ink, no red, no picture. |
| `docs/llms.txt`, `docs/robots.txt`, `docs/sitemap.xml` | The page in words for answer engines; every crawler allowed, AI crawlers named; Home and Privacy only. |
| `docs/<key>.txt` | The IndexNow key. `.github/workflows/indexnow.yml` pings the sitemap URLs after each deploy. |
| `index.html`, `privacy.html` at the root | The last-resort fallback, a copy of the page made by `scripts/make_fallback.py`. Never edit by hand. |
| `_archive/` | Retired pages, assets, fonts and the old fallback. Not published. |
| `archive/next-app/` and the root Next.js files | The retired Phase 1 app. Not published; never run `npm run build`. |

Structured data (JSON-LD): Organization and Person on Home, Organization on Privacy, no offers or prices.

## Before every pull request

1. `python3 scripts/make_fallback.py` (keeps the root fallback in step with `docs/`).
2. `python3 scripts/check_copy.py`: all checks must pass. Paste the result into the pull request.
3. In a browser at 360, 390, 768, 1100 and 1440 px: no sideways scroll, Anek only, white ground, the one red word, the action where The action puts it, the bottom bar's show and hide, the plant loop's late load, play, Pause and reduced motion, every old URL lands on the page, an unknown address shows the 404 page, axe-core finds no WCAG 2.2 AA violations.
4. Lighthouse on Home and Privacy, mobile and desktop. Budgets: LCP 2.0 s on mobile, INP 150 ms (report Total Blocking Time as the lab stand-in), CLS 0.05, under 500 KB on first view (the scenes and the loop are below the fold and lazy).
5. Screenshots of the whole page at 360 px and 1440 px in the pull request.

Then follow `DEPLOYMENT_AND_ROLLBACK.md`. Open pull requests as drafts. Sundeep merges; nobody else does.
