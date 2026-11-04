#!/usr/bin/env python3
"""Copy and one-page checks for intellumia.com (strategy v5.0, Brand System v5.0.4).

Run before every pull request, from the repository root:

    python3 scripts/check_copy.py

Standard library only. Prints one line per check and exits 1 if any check fails.
The rules are in CLAUDE.md. The page is the approved mockup of 3 Nov 2026 (Drive Intellumia/website/
mockup/index.html); the lines below are the only words it may carry, in this order. To change a line,
change it here and on the page in the same commit, with Sundeep's approval. The plant band follows
mockup/index-motion.html (v5.0.4): a slow silent loop with a Pause button.
"""
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / 'docs'
SITE = 'https://intellumia.com/'
BOOKING = 'https://cal.com/intellumia/meetsk'
LINKEDIN = 'https://www.linkedin.com/in/kumarsundeep'

# ---------------------------------------------------------------------------------------------
# Approved lines (Brand System v5.0.6; the mockup index-final.html). Nothing else goes on the page.
# ---------------------------------------------------------------------------------------------
TITLE = 'Intellumia, the AI partner for owner-run businesses'
DESCRIPTION = ('Intellumia shows owner-run businesses where AI makes them money, runs the parts that do '
               'with named professionals signing off, and takes no vendor fees.')
BUTTON = 'Book a call'  # never 'Book a Map' (a Map is paid work priced in a proposal), never 'Talk to Sundeep' (v5.0.6)
CATEGORY = 'The AI partner for owner-run businesses'
HERO = 'Where can AI make you money?'  # v5.0.6; 'money' is the one vermilion word
HERO_LINE = 'We find it in your numbers. Then we run it for you.'
OLD_HERO = 'Where will AI make your business money? We will show you, then run it.'  # retired 4 Nov 2026
MEETING = ('In two to three weeks, starting from summaries of your own books, we show you the two or three '
                  'places AI would make your business the most money, and what each is worth. Then we run the '
                  'ones you choose.')
# The proof line left the hero in v5.0.6 ("Our rules" carries it).
NOTE = '30 minutes, by video. Nothing to prepare.'  # beside the hero and closing buttons
BAR_NOTE = '30 minutes, by video'
MAP_DRAWING_WIDE = ('[svg] Illustration of a Map: sixteen activities across sales, operations, finance and people, '
                    'each with a bar for what it is worth. Collections is the first move; passing on costs and '
                    'quality checks are the next moves.')
MAP_DRAWING_PHONE = ('[svg] Illustration of a Map, sales and finance shown: collections is the first move, '
                     'passing on costs the next.')
MAP_CAPTION = 'Illustration of a Map, not a client.'
WHO = 'For owner-run companies across India, where the owner decides and signs the cheque.'
INDUSTRIES = ['Construction, EPC and roads', 'Specialty and agro chemicals', 'Auto components',
              'Pharma and APIs', 'Hospitals and healthcare chains']
# The leaks diagram (Brand System v5.0.5): opens "Where it starts", from 900 px only. Read by its title and desc.
LEAKS_DRAWING = ('[svg] Where money leaks in an owner-run business | Illustration: a business drawn as five rooms, '
                 "plant and operations, finance, MIS and reporting, IT and vendors, and the owner's office. Money "
                 'drips out of each into a tray marked money lost every month. The finance leak is plugged as the '
                 'first move; the plant leak is marked as the next move.')
LEAKS_CAPTION = ('Illustration, not a client. Where money usually leaks in an owner-run business. Your Map finds '
                 'your leaks, puts a rupee figure on each, and names the one to plug first.')
# Every word drawn inside the leaks diagram, in order (pinned here rather than scanned for banned words:
# "Decisions that live in one head" uses "live" as a verb, not for a product).
LEAKS_WORDS = ['YOUR BUSINESS',
               '01', 'PLANT AND OPERATIONS', 'Costs rising faster', 'than prices', 'NEXT MOVE',
               '02', 'FINANCE', 'Cash stuck with', 'customers', 'FIRST MOVE', 'PLUGGED',
               '03', 'MIS AND REPORTING', 'Numbers late,', 'built by hand',
               '04', 'IT AND VENDORS', 'AI tools and renewals', 'nobody tracks',
               '05', "OWNER'S OFFICE", 'Decisions that live', 'in one head',
               'MONEY LOST EVERY MONTH']
FIRST_MOVE, NEXT_MOVE = 'First move', 'Next move'
DOORS = ['Where it starts', 'We start with your money. AI is how we do it.',
         '01', 'Plant and operations', NEXT_MOVE, 'Costs are up and you cannot pass them on.',
         'Your costliest process, done a better way, tested on your own past records before anyone changes how they work.',
         '02', 'Finance', FIRST_MOVE, 'Customers owe you more than they should.',
         'What is owed to you across your companies, sorted, and a steady routine to bring it in.',
         '03', 'MIS and reporting', 'You find out late, from numbers built by hand.', 'One page across every company you own.',
         '04', 'IT and vendors', 'Your staff already use AI tools, and vendors want renewals.',
         'AI in your business, listed and under your control.',
         '05', "Owner's office", 'A handover, a new chief executive, a sale or a listing.',
         'The decisions only you make, written down and tested.']
HOW = ['How it works', 'A Map first. Then we run the parts that pay.',
       '1', 'Start here', 'Map', 'A review across the whole business, two to three weeks, for a fee agreed up front.',
       'Always paid, and the fee never depends on what you buy next.',
       '2', 'If you choose', 'Run', 'AI agents do the work, named professionals sign off, and you see the result every week.',
       'We connect, test on your past records, run in shadow beside your people, and switch on only with your '
       'sign-off, within 90 days.',
       '3', 'Alongside', 'Guide', 'Independent advice on your side, on AI, vendors and the board, with no fees from vendors.',
       "Covers AI policy and oversight, vendor choice and renewals, readiness for India's data protection duties, "
       'and a quarterly review of your Map.']
MAP_ITEMS = [
    'A one-page map of the money in your business.',
    'Two or three priced moves, with one named first move.',
    'A baseline for each move, measured on your own data.',
    'One working proof on your data for the first move.',
    'At least two ways to do each move, one of them not Intellumia.',
]
YOUR_TIME = ('Your time: about 20 to 40 hours of your staff across the two to three weeks. '
             'We agree it with you before we start.')
THE_MAP = ['The Map', 'Two to three weeks. Your numbers. Your choice.', MEETING,
           MAP_DRAWING_WIDE, MAP_DRAWING_PHONE, MAP_CAPTION, 'What the Map gives you', *MAP_ITEMS,
           YOUR_TIME, 'How the weeks run',
           'Start', 'Kick-off. We ask for summaries only, never all your books on day one.',
           'Week 1', 'Interviews with you and four to six heads of function. We find out what systems and data you have.',
           'Week 2', 'We value each move and test the top ones on your past records.',
           'Week 3', 'The readout, to you alone.']
RULES = ['Our rules', 'On your side of the table, in writing.',
         '01', 'Every move is valued in your numbers before you spend anything.',
         '02', 'You choose each move, in writing, from at least two ways to do it.',
         '03', 'We take no fees from vendors. No referral fees, no resale margins.',
         '04', 'Where we run the work, a named professional signs off.',
         '05', 'Your data stays in your environment, with models that neither keep nor train on it.',
         '06', 'Your data, your configuration and your running instance are yours, with the right to run it without us.']
PORTRAIT_ALT = 'Sundeep Kumar, Founder and CEO of Intellumia'
NAME = 'Sundeep Kumar, Founder & CEO'
FOUNDER = ('More than two decades at IBM and Microsoft helping large companies across Asia-Pacific change '
           "how they work, now on the owner's side. Based in India.")
LINKEDIN_TEXT = 'Sundeep on LinkedIn'
PERSON = ['[img] ' + PORTRAIT_ALT, 'Who you will work with',
          '“We will never tell you only Intellumia can solve it. What we build with you is yours.”',
          NAME, FOUNDER, LINKEDIN_TEXT]
QUESTION = 'Where does your business lose the most cash, days or margin today?'
PLATE = ['Start with one question', QUESTION, BUTTON, NOTE]
ADDRESS = 'Intellumia Pte. Ltd., 60 Paya Lebar Road, #06-28, Paya Lebar Square, Singapore 409051'
EMAIL = 'sundeep@intellumia.com'
SIGN_OFF = 'Intelligence, Illuminated.'
DESCRIPTOR = 'an AI-native product company, starting with service'  # Privacy only
NOT_FOUND = ['Page not found', 'There is nothing at this address.', HERO, 'Go to intellumia.com']

HEADER = ['[img] Intellumia', BUTTON]
FOOTER = ['[img] Intellumia', 'Working with owners across India.', ADDRESS, EMAIL, 'Privacy', SIGN_OFF]
BAR = [BAR_NOTE, BUTTON]
HERO_BLOCK = [CATEGORY, HERO, HERO_LINE, BUTTON, NOTE, LEAKS_DRAWING, LEAKS_CAPTION]  # centred; nothing else in it
HOME = (HEADER + HERO_BLOCK + [WHO, *INDUSTRIES] + DOORS + HOW + THE_MAP + RULES + PERSON + PLATE
        + FOOTER + BAR)
PAGE_404 = HEADER + NOT_FOUND + FOOTER

# ---------------------------------------------------------------------------------------------
# Words that never appear on a published surface (case-insensitive, whole words).
# ---------------------------------------------------------------------------------------------
BANNED = {
    'brand never-list': ['AI-powered', 'harness', 'transformation', 'consultancy', 'solution', 'solutions',
                         'leverage', 'unlock', 'empower', 'revolutionary', 'game-changing', 'guaranteed',
                         'guarantee', 'journey', 'replace your team', 'retainer', 'pilot', 'PoC', 'the layer',
                         'cash cycle first', 'the judgement engine', 'an AI team does the work'],
    'prices and fee models': ['fixed', 'monthly', 'free', 'assessment', 'package', 'packages', 'plan', 'plans',
                              'rate card', 'tier', 'tiers', 'pricing', 'fee model', 'per month', 'per year',
                              'lakh', 'crore', 'INR', 'SGD', 'USD', 'Rs'],
    'retired terms (3 Nov 2026)': ['judgement engine', 'judgment engine', 'decision intelligence',
                                   'intelligence layer', 'Decision Sprint', '90-day build', 'Embed',
                                   'Sales Engine', 'Plant Engine', 'Cash Engine', 'owner-led', 'Rent the model',
                                   'research desk', "owner's brief", 'engine', 'engines'],
    'retired buttons and links ("Book a Map" and "Talk to Sundeep" above all)': [
        'Book a Map', 'Talk to Sundeep', 'See the Sales Engine work', 'Book 30 minutes', 'How we work',
        'brief@intellumia.com', OLD_HERO],
    'products described as existing': ['live', 'demo', 'demo opening soon', 'in build', 'opening soon',
                                       'sandbox', 'platform', 'module', 'modules'],
    'proof the business does not have yet': ['case study', 'case studies', 'testimonial', 'testimonials',
                                             'trusted by', 'results', 'our clients', 'clients include'],
    'fear, urgency, scarcity': ['hurry', 'act now', 'limited time', 'last chance', 'only a few',
                                'falling behind', 'left behind', "don't miss", 'before it is too late'],
    'forms, sign-ups and analytics': ['newsletter', 'subscribe', 'sign up', 'sign-up', 'analytics'],
    'American spelling': ['color', 'colors', 'center', 'centers', 'organization', 'organizations', 'organize',
                          'analyze', 'optimize', 'optimization', 'behavior', 'favorite', 'labor', 'honor',
                          'realize', 'recognize', 'prioritize', 'catalog', 'defense', 'fulfill', 'modeling',
                          'traveling', 'judgment'],
    'city for Sundeep': ['Mumbai', 'Delhi', 'New Delhi', 'Bengaluru', 'Bangalore', 'Pune', 'Chennai',
                         'Hyderabad', 'Kolkata', 'Gurgaon', 'Gurugram', 'Noida', 'Ahmedabad'],
}
# The seven brand tokens, plus the mockup's two tints: #2A2926 (near-ink second text) and #E6E6FF (words on
# ultramarine). In the page's Map drawing only: #EEEAE0 and #5252FF (the empty part of a worth bar).
# In the leaks drawing only: yellow #FFC800 for the money (the drops and the tray).
COLOURS = {'#FFFFFF', '#101010', '#1A1AFF', '#FF3D00', '#F3EFE6', '#DDD8CC', '#5E5B55', '#2A2926', '#E6E6FF'}
DRAWING_COLOURS = COLOURS - {'#FF3D00'} | {'#EEEAE0', '#5252FF'}
LEAKS_COLOURS = {'#101010', '#5E5B55', '#1A1AFF', '#FFC800'}
# Retired from the page (Brand System v5.0.5): the scene bands and the plant loop, kept in _archive/.
RETIRED = ['plant2-band', 'plant-loop', 'corridor', 'scene']
ASSETS = {'assets/site.css', 'assets/site.js', 'assets/social-preview.jpg', 'assets/intellumia-wordmark-ultramarine.svg',
          'assets/fonts/AnekLatin-latin.woff2', 'assets/fonts/AnekLatin-latinext.woff2', 'assets/fonts/OFL-Anek.txt',
          'assets/imagery/sundeep-portrait-2026_720.jpg', 'assets/imagery/sundeep-portrait-2026_890.jpg'}
EMOJI = re.compile('[\U0001F000-\U0001FAFF☀-➿️‍]')

# ---------------------------------------------------------------------------------------------
results = []


def check(name, ok, detail=''):
    results.append(ok)
    print(('PASS ' if ok else 'FAIL ') + name + ('' if ok or not detail else f'\n     {detail}'))


def norm(s):
    return re.sub(r'\s+', ' ', s.replace('’', "'").replace(' ', ' ')).strip()


class Page(HTMLParser):
    """Reads a page into ordered text blocks plus the facts the checks need.
    A drawing with role="img" becomes one block, '[svg] ' and its label (its aria-label, or the title and desc it
    is labelled by, as 'title | desc'); decorative svg (aria-hidden) is skipped. The words drawn inside each
    labelled drawing are kept in self.drawings, as (label, [words])."""
    FLUSH = {'p', 'h1', 'h2', 'h3', 'li', 'a', 'div', 'section', 'header', 'footer', 'main', 'ul', 'ol',
             'nav', 'button', 'figure', 'figcaption', 'title', 'body', 'span'}
    KEEP_SPAN = {'fire', 'nw', 'sm-only'}  # spans inside a line: no break

    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.blocks, self.buf, self.stack = [], [], []
        self.meta, self.links, self.buttons, self.scripts, self.tags = {}, [], [], [], []
        self.title, self.fire, self.header_links, self.ld = '', [], [], []
        self.in_script = self.in_style = self.in_title = False
        self.svg = 0
        self.svg_part, self.svg_parts, self.svg_words, self.svg_block = None, {}, [], None
        self.drawings = []
        self.spans = []  # for each open span: does it break the line?
        self.feed(text)
        self.flush()

    def flush(self):
        t = norm(''.join(self.buf))
        if t:
            self.blocks.append(t)
        self.buf = []

    def breaks(self, tag, cls):
        return tag in self.FLUSH and not (tag == 'span' and self.KEEP_SPAN & set(cls))

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.tags.append((tag, a))
        cls = (a.get('class') or '').split()
        if tag == 'svg':
            if self.svg == 0 and a.get('role') == 'img':
                self.flush()
                self.blocks.append('[svg] ' + norm(a.get('aria-label', '')))
                self.svg_block, self.svg_parts, self.svg_words = len(self.blocks) - 1, {}, []
                self.svg_labelledby = (a.get('aria-labelledby') or '').split()
            self.svg += 1
        if self.svg:
            if tag == 'style':
                self.in_style = True
            if tag in ('title', 'desc', 'text'):
                self.svg_part = (tag, a.get('id', ''))
                self.svg_parts.setdefault(self.svg_part, '')
            return
        if tag == 'span':
            self.spans.append(self.breaks(tag, cls))
        if self.breaks(tag, cls):
            self.flush()
        if tag == 'img':
            self.flush()
            self.blocks.append('[img] ' + norm(a.get('alt', '')))
        if tag == 'meta':
            self.meta[a.get('name') or a.get('property') or a.get('http-equiv', '')] = a.get('content', '')
        if tag == 'link':
            self.links.append(a)
        if tag == 'a':
            if 'btn' in cls:
                self.buttons.append(a)
            if 'header' in self.stack:
                self.header_links.append(a)
        if tag == 'span' and 'fire' in cls:
            self.fire.append(list(self.stack))
        if tag == 'script':
            self.in_script = True
            self.scripts.append(a)
        if tag == 'style':
            self.in_style = True
        if tag == 'title':
            self.in_title = True
        if tag not in ('img', 'meta', 'link', 'br', 'hr', 'input', 'source'):
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag == 'style':
            self.in_style = False
        if self.svg:
            if tag in ('title', 'desc', 'text'):
                if tag == 'text' and self.svg_part:
                    self.svg_words.append(norm(self.svg_parts.pop(self.svg_part, '')))
                self.svg_part = None
            if tag == 'svg':
                self.svg -= 1
                if self.svg == 0 and self.svg_block is not None:
                    if self.svg_labelledby:
                        ids = {i: norm(t) for (k, i), t in self.svg_parts.items() if k in ('title', 'desc')}
                        self.blocks[self.svg_block] = '[svg] ' + ' | '.join(ids.get(i, '') for i in self.svg_labelledby)
                    self.drawings.append((self.blocks[self.svg_block], self.svg_words))
                    self.svg_block = None
            return
        if tag == 'span':
            if self.spans.pop() if self.spans else True:
                self.flush()
        elif tag in self.FLUSH:
            self.flush()
        if tag == 'script':
            self.in_script = False
        if tag == 'title':
            self.in_title = False
        if tag in self.stack:
            while self.stack and self.stack.pop() != tag:
                pass

    def handle_data(self, data):
        if self.svg and self.svg_part and not self.in_style:
            self.svg_parts[self.svg_part] += data
            return
        if self.svg or self.in_style:
            return
        if self.in_script:
            if self.scripts and self.scripts[-1].get('type') == 'application/ld+json':
                self.ld.append(data)
            return
        if self.in_title:
            self.title += data
            return
        if 'head' in self.stack:
            return
        self.buf.append(data)


def read(path):
    return Page(path.read_text())


def ld_values(node):
    """The words in structured data: every value except schema.org's own @type, @id and @context."""
    if isinstance(node, dict):
        return [v for k, x in node.items() if not k.startswith('@') for v in ld_values(x)]
    if isinstance(node, list):
        return [v for x in node for v in ld_values(x)]
    return [str(node)]


def words_found(text, words):
    hits = []
    for w in words:
        flags = 0 if w in ('PoC', 'INR', 'SGD', 'USD', 'Rs', 'Embed') else re.I
        if re.search(r'(?<![\w-])' + re.escape(w) + r'(?![\w-])', text, flags):
            hits.append(w)
    return hits


def sequence_report(got, want):
    return '\n     '.join(f'{"OK " if i < len(want) and b == want[i] else "?? "}{b}' for i, b in enumerate(got)) + (
        f'\n     (expected {len(want)} lines, found {len(got)})' if len(got) != len(want) else '')


# ---------------------------------------------------------------------------------------------
# 1. One page: Home and Privacy are the pages, 404.html is the not-found page; every other HTML file
#    is a redirect to Home.
# ---------------------------------------------------------------------------------------------
html_files = sorted(p.relative_to(DOCS).as_posix() for p in DOCS.rglob('*.html'))
pages = {'index.html', 'privacy/index.html', '404.html'}
check('docs/ has Home, Privacy and the not-found page', pages <= set(html_files), f'missing: {pages - set(html_files)}')
bad_stubs = []
for f in html_files:
    if f in pages:
        continue
    pg = read(DOCS / f)
    ok = (pg.meta.get('refresh') == '0; url=/' and pg.meta.get('robots') == 'noindex'
          and any(l.get('rel') == 'canonical' and l.get('href') == SITE for l in pg.links)
          and norm(pg.title) == TITLE and pg.blocks == ['intellumia.com'] and not pg.scripts)
    if not ok:
        bad_stubs.append(f)
check(f'every other HTML file is a redirect to {SITE} ({len(html_files) - len(pages)} files)',
      not bad_stubs, f'not a clean redirect: {bad_stubs}')

locs = re.findall(r'<loc>([^<]+)</loc>', (DOCS / 'sitemap.xml').read_text())
check('sitemap lists Home and Privacy only', locs == [SITE, SITE + 'privacy/'], f'sitemap has {locs}')

robots = (DOCS / 'robots.txt').read_text()
check('robots.txt allows every crawler and names the AI crawlers',
      'User-agent: *\nAllow: /' in robots and 'Disallow' not in robots
      and all(b in robots for b in ('GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'))
      and 'Sitemap: https://intellumia.com/sitemap.xml' in robots)

published = sorted(p.relative_to(DOCS).as_posix() for p in (DOCS / 'assets').rglob('*') if p.is_file())
check('docs/assets holds only what the pages use', set(published) == ASSETS,
      f'extra: {sorted(set(published) - ASSETS)}; missing: {sorted(ASSETS - set(published))}')

# ---------------------------------------------------------------------------------------------
# 2. Home carries the approved lines, in the mockup's order, and nothing else.
# ---------------------------------------------------------------------------------------------
home_src = (DOCS / 'index.html').read_text()
home = read(DOCS / 'index.html')
check(f'Home: every line is approved, in the approved order ({len(HOME)} lines)', home.blocks == HOME,
      sequence_report(home.blocks, HOME))
check('Home: title and og:title', norm(home.title) == TITLE and home.meta.get('og:title') == TITLE)
check('Home: meta description and og:description',
      home.meta.get('description') == DESCRIPTION and home.meta.get('og:description') == DESCRIPTION)
check('Home: social preview declared at 1200 x 630', home.meta.get('og:image') == SITE + 'assets/social-preview.jpg'
      and home.meta.get('og:image:width') == '1200' and home.meta.get('og:image:height') == '630')


def jpeg_size(path):
    data = path.read_bytes()
    i = 2
    while i < len(data):
        marker, length = data[i + 1], int.from_bytes(data[i + 2:i + 4], 'big')
        if marker in (0xC0, 0xC1, 0xC2):
            return int.from_bytes(data[i + 7:i + 9], 'big'), int.from_bytes(data[i + 5:i + 7], 'big')
        i += 2 + length
    return None


check('the social preview image is 1200 x 630, and its alt text is the headline on Home and Privacy (v5.0.6)',
      jpeg_size(DOCS / 'assets/social-preview.jpg') == (1200, 630)
      and home.meta.get('og:image:alt') == HERO and read(DOCS / 'privacy/index.html').meta.get('og:image:alt') == HERO,
      f"{jpeg_size(DOCS / 'assets/social-preview.jpg')} {home.meta.get('og:image:alt')}")
check('Home: the hero is centred and holds only the label, the headline, the line, the button and its note, then the leaks figure',
      '<section class="wrap heroC" id="hero">' in home_src and home.blocks[2:2 + len(HERO_BLOCK)] == HERO_BLOCK
      and '.heroC{display:block;text-align:center;' in (DOCS / 'assets/site.css').read_text()
      and 'text-wrap:balance}' in re.search(r'\.heroC \.proofA\{[^}]*\}', (DOCS / 'assets/site.css').read_text()).group(0),
      f'{home.blocks[2:2 + len(HERO_BLOCK)]}')
talk = sorted(p.relative_to(ROOT).as_posix() for p in list(DOCS.rglob('*')) + [ROOT / 'index.html', ROOT / 'privacy.html']
              if p.is_file() and p.suffix in ('.html', '.txt', '.xml', '.css', '.js', '.json')
              and re.search(r'talk to sundeep|where will ai make your business', p.read_text(errors='ignore'), re.I))
check('"Talk to Sundeep" and the old hero line appear nowhere on the site (the button reads "Book a call")', not talk, f'{talk}')

# ---------------------------------------------------------------------------------------------
# 3. The action: "Talk to Sundeep", always to the booking page, in a new tab.
#    Home: the header (wide screens), the hero, the closing plate and the phone bottom bar.
#    Privacy and the 404 page: the header button, at every width.
# ---------------------------------------------------------------------------------------------
privacy = read(DOCS / 'privacy/index.html')
nf = read(DOCS / '404.html')


def booking_ok(btns):
    return all(b.get('href') == BOOKING and b.get('target') == '_blank' and 'noopener' in (b.get('rel') or '')
               for b in btns)


home_btns = home.buttons
check(f'Home: "{BUTTON}" in the header, the hero, the closing plate and the bottom bar, each to {BOOKING} in a new tab',
      len(home_btns) == 4 and booking_ok(home_btns)
      and ['btn--inv' in (b.get('class') or '') for b in home_btns] == [False, False, True, False]
      and home_btns[3].get('tabindex') == '-1', f'{home_btns}')
check('Home: the bottom bar starts hidden (aria-hidden, out of the tab order) and the script shows it',
      '<div class="bar" id="bar" aria-hidden="true">' in home_src and 'id="hero"' in home_src and 'id="close"' in home_src)
for label, pg, src in (('Privacy', privacy, (DOCS / 'privacy/index.html').read_text()),
                       ('404', nf, (DOCS / '404.html').read_text())):
    check(f'{label}: one "{BUTTON}" button, in the header, shown at every width',
          len(pg.buttons) == 1 and booking_ok(pg.buttons) and '<header class="wrap hdr hdr--always">' in src)
check('no floating button left anywhere', all('class="btn fab"' not in (DOCS / f).read_text() for f in html_files))
for label, pg, links in (('Home', home, ['#top', BOOKING]), ('Privacy', privacy, ['/', BOOKING]), ('404', nf, ['/', BOOKING])):
    check(f'{label}: header is the wordmark and the button, no navigation',
          [l.get('href') for l in pg.header_links] == links and not any(t == 'nav' for t, _ in pg.tags))
check('Home: footer lines, then the bottom bar', home.blocks[-8:] == FOOTER + BAR, f'{home.blocks[-8:]}')
check('Privacy: header and footer lines', privacy.blocks[:2] == HEADER and privacy.blocks[-6:] == FOOTER,
      f'{privacy.blocks[:2]} ... {privacy.blocks[-6:]}')
check('404: the approved lines, in order', nf.blocks == PAGE_404, sequence_report(nf.blocks, PAGE_404))
check('404: noindex, title "Page not found | Intellumia"',
      nf.meta.get('robots') == 'noindex' and norm(nf.title) == 'Page not found | Intellumia')
check('404: every path is absolute, so it works at any address',
      not re.search(r'(?:href|src)="(?!/|https://|mailto:|#)', (DOCS / '404.html').read_text()))

# ---------------------------------------------------------------------------------------------
# 4. Pictures and drawings (Brand System v5.0.5): the portrait is the only picture; no scene bands,
#    no video. The leaks diagram opens "Where it starts" from 900 px; its drops are the one animation,
#    and only for readers who have not asked for reduced motion.
# ---------------------------------------------------------------------------------------------
css_text = (DOCS / 'assets/site.css').read_text()
js_text = (DOCS / 'assets/site.js').read_text()
imgs = [a.get('src') for t, a in home.tags if t == 'img']
check('the portrait is the only picture: no scene bands, no video, no other image',
      imgs == ['/assets/intellumia-wordmark-ultramarine.svg', '/assets/imagery/sundeep-portrait-2026_720.jpg',
               '/assets/intellumia-wordmark-ultramarine.svg']
      and not any(t in ('video', 'picture', 'source') for t, _ in home.tags), f'{imgs}')
published_files = [f for f in DOCS.rglob('*') if f.is_file()]
retired_hits = sorted({w for f in published_files for w in RETIRED
                       if w in f.name or (f.suffix in ('.html', '.css', '.js', '.txt', '.xml')
                                          and w in f.read_text(errors='ignore'))})
check('the scene bands and the plant loop stay retired (in _archive/): nothing published refers to them',
      not retired_hits, f'{retired_hits}')
doors_src = home_src[home_src.index('aria-labelledby="h-doors"'):home_src.index('<!-- HOW IT WORKS -->')]
hero_src = home_src[home_src.index('<!-- HERO -->'):home_src.index('<!-- WHO -->')]
leaks_src = re.search(r'<figure class="leaks".*?</figure>', hero_src, re.S)
leaks_src = leaks_src.group(0) if leaks_src else ''
check('the leaks figure sits directly under the hero, inside it, on the bone panel, inline SVG with its title and desc (v5.0.6)',
      bool(leaks_src) and hero_src.index('<span class="note">') < hero_src.index('<figure class="leaks" aria-label="Where money leaks">')
      and hero_src.rstrip().endswith('</figure>\n</section>') and home_src.count('<figure class="leaks"') == 1
      and '<figure class="leaks"' not in doors_src
      and '<svg class="leak-lg" viewBox="0 0 1200 460" role="img" aria-labelledby="leak-t leak-d">' in leaks_src
      and '<title id="leak-t">' in leaks_src and '<desc id="leak-d">' in leaks_src
      and '.leaks{margin:0 0 56px;background:var(--bone);border-radius:10px;padding:24px}' in css_text)
check('the leaks figure: hidden below 900 px, shown from 900 px',
      '.leaks{display:none}\n@media(min-width:900px){.leaks{display:block;padding:40px}}' in css_text)
leaks_drawing = [w for label, w in home.drawings if label == LEAKS_DRAWING]
check("the leaks drawing carries the mockup's words only, in order",
      leaks_drawing == [LEAKS_WORDS], f'{leaks_drawing}')
leaks_hexes = {h.upper() for h in re.findall(r'#[0-9A-Fa-f]{6}\b', leaks_src)}
check('the leaks drawing: ink, muted, ultramarine, and yellow #FFC800 for the money; no red',
      leaks_hexes <= LEAKS_COLOURS and '#FFC800' in leaks_hexes, f'{leaks_hexes - LEAKS_COLOURS}')
check('the door stories carry their department; First move on Finance and Next move on Plant, at every width',
      doors_src.count('<span class="dept"><span class="label muted">') == 5
      and doors_src.count('<span class="dtag is-first">First move</span>') == 1
      and doors_src.count('<span class="dtag">Next move</span>') == 1
      and '.dtag{' in css_text and not re.search(r'@media[^{]*\{[^}]*\.dtag\{display:none', css_text))
motion_src = [(f, (DOCS / f).read_text()) for f in html_files] + [('assets/site.css', css_text)]
keyframes = [(f, k) for f, t in motion_src for k in re.findall(r'@keyframes\s+([\w-]+)', t)]
animations = [f for f, t in motion_src if re.search(r'animation(?:-name)?\s*:', t)]
check('motion: one animation, the drops falling, inside the leaks drawing, only under prefers-reduced-motion: no-preference',
      keyframes == [('index.html', 'fall')] and animations == ['index.html']
      and all(re.search(r'animation', block) is None
              for block in re.split(r'@media \(prefers-reduced-motion:no-preference\)\{[^@]*?\}\}', leaks_src))
      and '@media (prefers-reduced-motion:no-preference){.drip .drop{animation:fall 2.7s linear infinite}' in leaks_src
      and leaks_src.count('class="drop"') == 12, f'{keyframes} {animations}')
check('no video and no other motion: transitions only on the phone bar, no GIFs, no script-driven motion',
      not any('<video' in (DOCS / f).read_text() for f in html_files)
      and re.findall(r'transition:[^;}]+', css_text) == ['transition:transform .2s ease', 'transition:none']
      and not any(p.suffix in ('.gif', '.mp4', '.webm') for p in DOCS.rglob('*'))
      and not re.search(r'video|animate|requestAnimationFrame|scene', js_text))
check('the portrait: alt text, width and height, lazy',
      re.search(rf'<img src="/assets/imagery/sundeep-portrait-2026_720\.jpg"[^>]+width="720" height="720" '
                rf'alt="{PORTRAIT_ALT}" loading="lazy"', home_src) is not None)

# ---------------------------------------------------------------------------------------------
# 5. Words: banned, retired, descriptor, dashes, emoji, italics.
# ---------------------------------------------------------------------------------------------
surfaces = {}
for f in html_files:
    pg = read(DOCS / f)
    texts = pg.blocks + [norm(pg.title)] + [v for k, v in pg.meta.items() if k in (
        'description', 'og:title', 'og:description', 'og:image:alt')]
    for ld in pg.ld:
        texts += ld_values(json.loads(ld))
    texts += [norm(a.get('aria-label', '')) for _, a in pg.tags if a.get('aria-label')]
    surfaces['docs/' + f] = '\n'.join(texts)
surfaces['docs/llms.txt'] = (DOCS / 'llms.txt').read_text()
for group, words in BANNED.items():
    hits = {f: words_found(t, words) for f, t in surfaces.items()}
    hits = {f: h for f, h in hits.items() if h}
    check(f'no {group}', not hits, f'{hits}')

published_text = [p for p in DOCS.rglob('*') if p.is_file() and p.suffix in ('.html', '.txt', '.xml', '.css', '.js', '.json')]
old_link = [p.relative_to(ROOT).as_posix() for p in published_text + [ROOT / 'index.html', ROOT / 'privacy.html']]
old_link = [f for f in old_link if 'cal.com/meetsk' in (ROOT / f).read_text()]
check('no link to cal.com/meetsk is left (the booking page is cal.com/intellumia/meetsk)', not old_link, f'{old_link}')
desc_hits = [f for f, t in surfaces.items() if DESCRIPTOR.lower() in t.lower()]
check('the descriptor appears on Privacy only', set(desc_hits) <= {'docs/privacy/index.html'}, f'{desc_hits}')
all_text = '\n'.join(surfaces.values())
check('no em dashes', '—' not in all_text and ' -- ' not in all_text
      and all('—' not in p.read_text() for p in published_text))
check('no emoji', not EMOJI.search(all_text))
check('no market statistics (no per cent signs)', not re.search(r'%|per ?cent', all_text, re.I))
check('no price figures (no currency signs)', not re.search(r'[₹$€£]|S\$', all_text))
lower_name = [f for f, t in surfaces.items() if re.search(r'(?<![\w@./-])intellumia(?![\w.@/-])', t)]
check('"Intellumia" is capitalised in text', not lower_name, f'{lower_name}')
check('"owner-run", never "owner-led"', 'owner-led' not in all_text.lower())
css = (DOCS / 'assets/site.css').read_text()
italic = [f for f in html_files if re.search(r'<(em|i|cite)[\s>]', (DOCS / f).read_text())]
check('no italics', 'italic' not in css.lower() and not italic, f'italic markup in {italic}')

# ---------------------------------------------------------------------------------------------
# 6. Colour, type and shape.
# ---------------------------------------------------------------------------------------------
hexes = {h.upper() for h in re.findall(r'#[0-9A-Fa-f]{6}\b', css)}
check('stylesheet colours: the seven brand tokens and the mockup tints only', hexes <= COLOURS,
      f'other colours: {hexes - COLOURS}')
page_src = re.sub(r'<script.*?</script>|<figure class="leaks".*?</figure>', '', home_src, flags=re.S)
drawing = {h.upper() for h in re.findall(r'#[0-9A-Fa-f]{6}\b', page_src)}
check('page colours outside the leaks drawing (the Map drawing): no red, brand tokens and the drawing tints only',
      drawing <= DRAWING_COLOURS, f'other colours: {drawing - DRAWING_COLOURS}')
check('no gradients, shadows or dark mode', not re.search(r'gradient|shadow|prefers-color-scheme', css, re.I))
check('vermilion is set once, on the .fire class only',
      css.count('#FF3D00') == 1 and css.count('var(--fire)') == 1 and '.fire{color:var(--fire)}' in css)
fire_ok = (len(home.fire) == 1 and 'h1' in home.fire[0] and privacy.fire == [] and nf.fire == []
           and all('class="fire"' not in (DOCS / f).read_text() for f in html_files if f != 'index.html'))
check('one red thing: "money" in the hero, at Statement size', fire_ok)
check('the hero is set in the Statement style', '<h1 class="st">' in home_src)
families = set(re.findall(r'font-family:([^;}]+)', css))
check('Anek Latin is the only typeface', families <= {"'Anek Latin'", "'Anek Latin',system-ui,sans-serif"}, f'{families}')
fonts = sorted(p.name for p in DOCS.rglob('*') if p.suffix in ('.woff', '.woff2', '.ttf', '.otf'))
check('only Anek font files are published, with the licence beside them',
      fonts == ['AnekLatin-latin.woff2', 'AnekLatin-latinext.woff2'] and (DOCS / 'assets/fonts/OFL-Anek.txt').exists(),
      f'{fonts}')
check('corners: 6 for buttons and chips, 10 for panels and cards, 0 for pictures',
      set(re.findall(r'border-radius:(\d+)px', css)) <= {'6', '10'})
check('the head of "Our rules" is sticky on wide screens; "Where it starts" is not (v5.0.5)',
      '.split>.sec-head{margin-bottom:0;position:sticky;top:32px}' in css
      and home_src.count('class="wrap sec split"') == 1
      and '<section class="wrap sec" aria-labelledby="h-doors">' in home_src
      and '<div class="wrap sec split">\n <div class="sec-head">\n <p class="label">Our rules</p>' in home_src)
check('the bottom bar: phones only, and no slide for reduced motion',
      '@media(min-width:900px){.bar{display:none}}' in css
      and '@media(prefers-reduced-motion:reduce){.bar{transition:none}' in css)

# ---------------------------------------------------------------------------------------------
# 7. Scripts: only /assets/site.js, on Home. No forms, trackers or third-party scripts.
#    Structured data without offers or prices.
# ---------------------------------------------------------------------------------------------
blocked = {}
for f in html_files:
    pg = read(DOCS / f)
    bad = [t for t, _ in pg.tags if t in ('form', 'input', 'iframe', 'textarea', 'select', 'audio')]
    own = [s for s in pg.scripts if s.get('type') != 'application/ld+json']
    if f == 'index.html':
        own = [s for s in own if s.get('src') != '/assets/site.js']
    bad += [s.get('src', 'inline script') for s in own]
    if bad:
        blocked[f] = bad
check('no forms, frames, chat widgets or scripts; Home loads /assets/site.js only', not blocked, f'{blocked}')
js = (DOCS / 'assets/site.js').read_text()
check('site.js calls nothing outside the page (no addresses, no storage, no tracking)',
      not re.search(r'https?:|fetch\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|cookie|import\(', js))
csp = {label: pg.meta.get('Content-Security-Policy', '') for label, pg in (('Home', home), ('Privacy', privacy), ('404', nf))}
check("Home: security policy allows only the site's own script (script-src 'self')", "script-src 'self';" in csp['Home'])
check("Privacy and 404: security policy blocks all scripts (script-src 'none')",
      "script-src 'none'" in csp['Privacy'] and "script-src 'none'" in csp['404'])
graph = json.loads(home.ld[0])['@graph'] if home.ld else []
org = next((g for g in graph if g.get('@type') == 'Organization'), {})
person = next((g for g in graph if g.get('@type') == 'Person'), {})
check('Home structured data: Organization with the 25 words, address and logo',
      org.get('legalName') == 'Intellumia Pte. Ltd.' and org.get('description') == DESCRIPTION
      and org.get('address', {}).get('postalCode') == '409051' and org.get('logo', '').endswith('.svg'))
check('Home structured data: Person, Sundeep Kumar, Founder & CEO, sameAs his LinkedIn profile',
      person.get('name') == 'Sundeep Kumar' and person.get('jobTitle') == 'Founder & CEO'
      and person.get('sameAs') == [LINKEDIN])
check('the LinkedIn link goes to the profile in the structured data',
      f'<a href="{LINKEDIN}" target="_blank" rel="noopener">{LINKEDIN_TEXT}</a>' in home_src)
check('structured data has no offers or prices',
      not re.search(r'offer|price', ' '.join(home.ld + privacy.ld + nf.ld), re.I))

# ---------------------------------------------------------------------------------------------
# 8. The fallback at the repository root carries the same words as the live pages.
# ---------------------------------------------------------------------------------------------
for live, fb in (('index.html', 'index.html'), ('privacy/index.html', 'privacy.html')):
    check(f'fallback {fb} matches docs/{live} (run scripts/make_fallback.py if not)',
          read(ROOT / fb).blocks == read(DOCS / live).blocks)

print()
failed = results.count(False)
print(f'{len(results) - failed} passed, {failed} failed')
sys.exit(1 if failed else 0)
