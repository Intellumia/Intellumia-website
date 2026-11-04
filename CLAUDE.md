# intellumia.com: rules for every change

The site follows Intellumia strategy v5.0 and the Brand System v5.0.8 ("Brand System (current).md" in Drive, brand folder). The page itself is the approved Round 5 mockup of 4 November 2026: Drive Intellumia/website/mockup/index-round5.html (the same file is `reference-mockup.html` in `round5-assets.zip` beside it), built piece by piece and approved by Sundeep; the pieces and their approvals are in Drive website "Website round 5 (current).md", and the paste text in "Website brief (current).md", Round 5. If this file and the Brand System or the mockup disagree, they win; say so in the pull request.

**Before go-live:** Round 5 merges only after the chartered accountant reviewer is engaged, because the Run card promises that a named professional checks the work and signs off. Sundeep approves the merge.

## The one-page rule

Until Intellumia has 5 to 10 paying clients, intellumia.com is **one page with one action, "Book a call"**, plus the Privacy notice. Nothing else is published.

- `docs/index.html` is the page. `docs/privacy/index.html` is Privacy. `docs/404.html` is the not-found page GitHub Pages serves at any unknown address (`noindex`, absolute paths only): "Page not found", "There is nothing at this address.", the headline "Where can AI make you money?" and "Go to intellumia.com" (approved by Sundeep, 3 November 2026; headline from v5.0.6).
- Every other HTML file under `docs/` is a redirect to `https://intellumia.com/`: a meta refresh to `/`, a canonical link to `https://intellumia.com/` and `noindex`. Never delete one: old links must keep landing on the page.
- Retired pages and assets live in `_archive/` at the repository root, outside `docs/`, so GitHub Pages never publishes them. Nothing is deleted; it is moved there. (The leaks diagram of Rounds 4 and 4b was inline in the page, so it lives in the git history.)
- A new page, section, line or button needs Sundeep's written approval first.

## The words

The page carries the mockup's words and nothing else, in the mockup's order. `scripts/check_copy.py` holds every line and fails on any other line or any change of order, so a wording change goes into the page and the script in the same commit.

1. Header: the ultramarine wordmark; on wide screens (1000 px up) five links to the sections, How it works (`#h-how`), The Map (`#h-map`), Our rules (`#h-rules`), About (`#h-sk`) and FAQ (`#h-faq`); then the "Book a call" button (from 900 px, see The action). Phones keep the clean header: the wordmark only.
2. Hero, centred: the Label "The AI partner for owner-run businesses"; the Statement "Where can AI make you money?" with "money" in vermilion; the line "We find it in your numbers. Then we run it for you." (`text-wrap: balance`); the button and its note "30 minutes, by video. Nothing to prepare."; the founder line, a small round black-and-white portrait and "Led by Sundeep, Founder & CEO", linking to `#h-sk`, centred on phones; then the "Sound familiar?" panel: the six problem scenes, each labelled with its question (Costs up, prices stuck? / Customers paying late? / Good people leaving? / Numbers always late? / Too much made twice? / All on your desk?), and the caption "Where money quietly leaks in most owner-run businesses."
3. Who we work with: "Owners, promoters and the leaders they trust, in businesses everywhere, who want AI to show up in their numbers."; "Where AI is already proven" with six chips (Customer service; Finance and accounting; Sales and marketing; Supply chain and inventory; Plant operations and quality; Claims, compliance and documents) and the muted "in every industry".
4. What we do about it: "AI does the work. Your people make the calls." and six compact cards in the order of the scenes, each with its drawing, the scene's question in grey and a short answer. The cash card carries the "Often first" tag.
5. How it works: "A Map first. Then we run the parts that pay."; the Map, Run and Guide cards; then "One example, step by step", "From an overdue invoice to money collected.", four drawn steps (AI reads the record; AI prepares the next step; your people decide; you see the result) and "Illustrative, not a client."
6. The Map: the heading only ("Two to three weeks. Your numbers. Your choice."); the heat map at full width (eight areas, 32 activities, cyan by money at stake, moves 2 and 3 in full cyan, the first move, Collections, in vermilion; Sales and Finance only below 600 px; both inline SVG labelled for screen readers) with the caption "Illustration of a Map, not a client."; "Every move answers four questions" (What could it make you? What would it cost? What needs to be true? How will we measure it?); "You see the working. You choose the moves."; the four-step timeline (Start, Week 1, Week 2, Week 3); and "About 20 to 40 hours of your staff's time, agreed before we start." No "What the Map gives you" list and no meeting statement.
7. Our rules: "On your side of the table, in writing." and six cards, each with its drawing, number, title and line: 01 Valued first, 02 Cash over hours, 03 Your choice, in writing, 04 No vendor fees, 05 Your data stays put, 06 Yours to keep.
8. Sundeep: the black and white portrait (alt "Sundeep Kumar, Founder and CEO of Intellumia"), "Who you will work with", his quote "AI will do for business what electricity did for factories. The owners who wire up first set the pace for everyone else." (v5.0.8), "Sundeep Kumar, Founder & CEO", "Two decades making technology pay for Fortune 1000 companies. Now on the owner's side." (v5.0.8) and "Sundeep on LinkedIn" (the same profile is `sameAs` on the Person in the structured data). Never a city; never IBM figures or IBM client names. The trust line ("We will never tell you only Intellumia can solve it. ...") left the website in v5.0.8; Our rules 03 and 06 say the same.
9. FAQ, before the close: "Questions owners ask", "Before you book." and six questions as native `details` and `summary`, the first one open: Do we need to know where AI fits first? / What does a Map cost? / Will it work with our systems? / Is our data safe? / Will this replace our people? / Are we tied in after the Map?
10. The close: the ultramarine plate with "Start with one question", the question "Where does your business lose the most cash, days or margin today?", "Bring the answer. Leave knowing where AI could pay.", the white button and its note "30 minutes, by video. Nothing to prepare." Nothing else.
11. Footer: the wordmark, "Working with owners across India.", the ACRA-registered address, sundeep@intellumia.com, Privacy, "Intelligence, Illuminated."

Title and og:title: "Intellumia, the AI partner for owner-run businesses". og:image:alt: the headline, "Where can AI make you money?". Description and og:description: the 25 words, "Intellumia shows owner-run businesses where AI makes them money, runs the parts that do with named professionals signing off, and takes no vendor fees." The descriptor "an AI-native product company, starting with service" appears on Privacy only. `docs/llms.txt` repeats the page in its own words: the hero, Sound familiar?, who we work with, what we do about it, Map, Run, Guide and the example, the Map, the rules, Sundeep, the FAQ and the close.

Never on any published surface (page, Privacy, llms.txt, structured data):

- Any price, price figure, price range or tier. The Map is always paid: "for a fee agreed up front" and the FAQ's "A fixed fee, agreed before we start and always paid" are the approved ways to say so. Never call the Map an assessment, a pilot or free, and never the words monthly, retainer, package, plan or rate card. The rupee sign appears only as a coin in the drawings, never beside a figure.
- Client names or logos, case studies, results, testimonials, "trusted by", invented numbers. Every example is marked as an illustration, not a client.
- Run modules or engines by name; any platform described as existing; "now live", "demo opening soon", "in build". ("Live within 90 days, and only with your sign-off" on the Run card is approved: it is about a client's move.)
- AI-powered, harness, transformation, consultancy, solution, leverage, unlock, empower, revolutionary, game-changing, guaranteed, journey, replace your team, PoC, the layer, cash cycle first, the judgement engine, "an AI team does the work".
- Retired terms: judgement engine, decision intelligence, intelligence layer, Decision Sprint, 90-day build, Embed, Sales Engine, Plant Engine, Cash Engine, owner-led (now "owner-run"), "Rent the model", research desk, the owner's brief. Retired lines: the trust line, the IBM founder line, "What the Map gives you", "Where it starts".
- Fear, urgency or scarcity; market statistics.
- Forms, newsletters, analytics, cookies, chat widgets, third-party scripts.
- "Book a Map" as a button label or anywhere else: a Map is paid work priced in a proposal, and the button opens a 30-minute call.
- "Talk to Sundeep" as a label, or anywhere (since v5.0.6 the button reads "Book a call"), and the retired hero line "Where will AI make your business money? We will show you, then run it."
- Em dashes, emoji, italics, American spelling. British English, sentence case. "Intellumia" with a capital I in text; only the logo is lower case. "Map" is a name and is capitalised.

## The look

The mockup's CSS lives in `docs/assets/site.css`, the one stylesheet: the rules the page uses, in the mockup's order. Keep its breakpoints (600, 700, 768, 800, 900, 1000 and 1100 px) and sizes. The mockup's inline styles are classes in the stylesheet, and its inset shadow on the "Your people" step is a 2 px border (same look, no shadow).

- Colours: white ground `#FFFFFF`, ink `#101010`, ultramarine `#1A1AFF` for buttons, links, the first step, the closing plate and the drawings' lines. Bone `#F3EFE6` for the Map figure, the industry chips, the step drawings and the How it works and Our rules bands. Rule `#DDD8CC`, muted `#5E5B55`. The mockup's two tints: `#2A2926` for second text and `#E6E6FF` for small words on ultramarine. In the drawings, yellow `#FFC800` for money (the coins). In the heat map only, the cyan scale `#E0F8FF`, `#99E6FF` and `#00C2FF` by money at stake. No dark mode, gradients or shadows.
- Red, vermilion `#FF3D00`, one red thing per screen (Brand System v5.0.7): exactly four on the page, placed so that no two share a screen: the hero word "money" (Statement size), the "Often first" tag on the cash card, the Map's first move (Collections, with its key) and the title of rule 04, "No vendor fees". Nothing else is red: never a button, the plate, Privacy or the 404 page. The social preview carries the same red word.
- Logo: `docs/assets/intellumia-wordmark-ultramarine.svg`, at least 96 px wide, never on a photograph. Favicons: the ink tile with the white ll.
- Type, Anek Latin only, self-hosted from `docs/assets/fonts/` with `OFL-Anek.txt` beside the files: Statement 650 width 80, 48 to 96 px in the centred hero (the plate's question 34 to 64 px); Heading 620, 30 to 52 px; Lead 600, 19 to 22 px; Body 400, 17 to 18 px; Label 600, capitals, +0.12em, 12 to 13 px. Tabular figures; emphasis by colour or weight, never italics.
- Corners: 6 for buttons, chips, tags and the scenes; 10 for panels and cards; round for the small portrait and the numbers; 0 for the portrait in "Who you will work with".
- Pictures: the six problem scenes in the hero (`docs/assets/scenes/`, 720 px as supplied, with a 360 px copy of each for small slots, `loading="lazy"`, width and height set, alt text from the mockup) and Sundeep's portrait (round in the hero from a 120 px copy, square further down). No scene bands and no video; the plant and corridor bands and the plant loop are kept in `_archive/`.
- Drawings: the heat map, the six card drawings, the four example steps and the six rule drawings are inline SVG. The heat map is labelled for screen readers; the others are decorative (`aria-hidden`) because the words beside them carry the meaning.
- Motion: none. No animation anywhere on the site and no video. The phone bar's 0.2 s slide and smooth scrolling to the page's own sections come from the mockup, and reduced motion removes both.
- No sticky section heads.
- Mobile first: check at 360 px first.

## The action

"Book a call" opens <https://cal.com/intellumia/meetsk>, Sundeep's 30-minute cal.com event, in a new tab (`target="_blank" rel="noopener"`). Its note: "30 minutes, by video. Nothing to prepare." beside the hero and closing buttons; "30 minutes, by video" in the phone bar. Never link `cal.com/meetsk`: that username is no longer Sundeep's. Never create accounts or change cal.com settings; Sundeep manages the event himself.

- On the page it appears in the header (from 900 px only), in the hero, and on the closing plate (white button).
- On phones (below 900 px), a white bottom bar with "30 minutes, by video" and the button appears only after the hero (with its scenes) has scrolled away, and hides while the closing plate is on screen. It starts hidden (`aria-hidden`, out of the tab order) and has no slide for reduced motion. `scroll-padding-bottom` keeps a focused link from hiding under it.
- On Privacy and the 404 page there is no bar and no section links: the header button shows at every width (`hdr--always`).
- No other button, and no floating button. The header links and the founder line are links to sections, not buttons.

## Script

`docs/assets/site.js` is the only script, loaded by the page alone (`script-src 'self'` in its security policy; Privacy, the 404 page and the redirects keep `script-src 'none'`). It runs the bottom bar and nothing else: no addresses, no storage, no tracking. Without it the bar stays hidden. The FAQ needs no script (native `details`).

## Files

| Path | What it is |
| --- | --- |
| `docs/index.html`, `docs/privacy/index.html`, `docs/404.html` | The page, Privacy and the not-found page, hand-written HTML. |
| `docs/assets/site.css`, `docs/assets/site.js` | The one stylesheet and the one script. |
| `docs/assets/scenes/` | The six problem scenes from `round5-assets.zip` (720 px, as supplied) and a 360 px copy of each. |
| `docs/assets/imagery/` | Sundeep's portrait (720 and 890 px, and a 120 px copy for the round portrait in the hero). |
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
3. In a browser at 360, 390, 768, 1100 and 1440 px: no sideways scroll, Anek only, white ground, the four red things and never two on one screen, the header links from 1000 px, the action where The action puts it, the bottom bar's show and hide, the scenes and their questions, the heat map (Sales and Finance only below 600 px), the FAQ opening and closing, nothing animating, every old URL lands on the page, an unknown address shows the 404 page, axe-core finds no WCAG 2.2 AA violations.
4. Lighthouse on Home and Privacy, mobile and desktop. Budgets: LCP 2.0 s on mobile, INP 150 ms (report Total Blocking Time as the lab stand-in), CLS 0.05, under 500 KB on first view (the scenes load their 360 px copies in small slots; the portrait further down is lazy).
5. Screenshots of the whole page at 360 px and 1440 px in the pull request.

Then follow `DEPLOYMENT_AND_ROLLBACK.md`. Open pull requests as drafts. Sundeep merges; nobody else does.
