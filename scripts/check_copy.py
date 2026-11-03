#!/usr/bin/env python3
"""Copy and one-page checks for intellumia.com (strategy v5.0, Brand System v5.0.1).

Run before every pull request, from the repository root:

    python3 scripts/check_copy.py

Standard library only. Prints one line per check and exits 1 if any check fails.
The rules are in CLAUDE.md; the approved lines below are the only words the page may carry.
To change a line, change it here and on the page in the same commit, with Sundeep's approval.
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

# ---------------------------------------------------------------------------------------------
# Approved lines (strategy v5.0; Brand System v5.0.1 section 6). Nothing else goes on the page.
# ---------------------------------------------------------------------------------------------
TITLE = 'Intellumia, the AI partner for owner-run businesses'
DESCRIPTION = ('Intellumia shows owner-run businesses where AI makes them money, runs the parts that do '
               'with named professionals signing off, and takes no vendor fees.')
BUTTON = 'Book a Map'
HERO = 'Where will AI make your business money? We will show you, then run it.'
PROOF = ('We price each move in your own numbers, name at least one way to do it that is not us, and take '
         'no fees from vendors. Where we run the work, a named professional signs off.')
HOW = ('In two to three weeks, starting from summaries of your own books, we show you the two or three '
       'places AI would make your business the most money, what each is worth, and at least one way to do '
       'each that is not us. Then we run the ones you choose, a named professional signs off, and you see '
       'the result every week.')
MAP_HEADING = 'What the Map gives you'
MAP_ITEMS = [
    'A one-page map of the money in your business.',
    'Two or three priced moves, with one named first move.',
    'A baseline for each move, measured on your own data.',
    'One working proof on your data for the first move.',
    'At least two ways to do each move, one of them not Intellumia.',
]
YOUR_TIME = 'Your time: about 20 to 40 hours of your staff, said up front.'
NAME = 'Sundeep Kumar, Founder & CEO'
FOUNDER = ('More than two decades at IBM and Microsoft helping large companies across Asia-Pacific change '
           "how they work, now on the owner's side. Based in India.")
ADDRESS = 'Intellumia Pte. Ltd., 60 Paya Lebar Road, #06-28, Paya Lebar Square, Singapore 409051'
EMAIL = 'sundeep@intellumia.com'
SIGN_OFF = 'Intelligence, Illuminated.'
DESCRIPTOR = 'an AI-native product company, starting with service'  # Privacy only
NOT_FOUND_LABEL = 'Page not found'
NOT_FOUND = 'There is nothing at this address.'
GO_HOME = 'Go to intellumia.com'

HEADER = ['[img] Intellumia', BUTTON]
FOOTER = [ADDRESS, EMAIL, 'Privacy', SIGN_OFF]
HOME = HEADER + [HERO, PROOF, HOW, MAP_HEADING, *MAP_ITEMS, YOUR_TIME,
                 '[img] Sundeep Kumar', NAME, FOUNDER] + FOOTER
PAGE_404 = HEADER + [NOT_FOUND_LABEL, NOT_FOUND, HERO, GO_HOME] + FOOTER

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
    'retired buttons and links': ['Talk to Sundeep', 'See the Sales Engine work', 'Book 30 minutes',
                                  'How we work', 'brief@intellumia.com'],
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
COLOURS = {'#FFFFFF', '#101010', '#1A1AFF', '#FF3D00', '#F3EFE6', '#DDD8CC', '#5E5B55'}
ASSETS = {'assets/site.css', 'assets/social-preview.jpg', 'assets/intellumia-wordmark-ultramarine.svg',
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
    """Reads a page into ordered text blocks plus the facts the checks need."""
    FLUSH = {'p', 'h1', 'h2', 'h3', 'li', 'a', 'div', 'section', 'header', 'footer', 'main', 'ul', 'ol',
             'nav', 'button', 'figcaption', 'title', 'body'}

    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.blocks, self.buf, self.stack = [], [], []
        self.meta, self.links, self.buttons, self.scripts, self.tags = {}, [], [], [], []
        self.title, self.fire, self.header_links, self.ld = '', [], [], []
        self.in_script = self.in_style = self.in_title = False
        self.feed(text)
        self.flush()

    def flush(self):
        t = norm(''.join(self.buf))
        if t:
            self.blocks.append(t)
        self.buf = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.tags.append((tag, a))
        cls = a.get('class', '').split()
        if tag in self.FLUSH:
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
        if tag not in ('img', 'meta', 'link', 'br', 'hr', 'input'):
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in self.FLUSH:
            self.flush()
        if tag == 'script':
            self.in_script = False
        if tag == 'style':
            self.in_style = False
        if tag == 'title':
            self.in_title = False
        if tag in self.stack:
            while self.stack and self.stack.pop() != tag:
                pass

    def handle_data(self, data):
        if self.in_script:
            if self.scripts and self.scripts[-1].get('type') == 'application/ld+json':
                self.ld.append(data)
            return
        if self.in_style:
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
    s = (DOCS / f).read_text()
    pg = Page(s)
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
check('docs/assets holds only what the page uses', set(published) == ASSETS,
      f'extra: {sorted(set(published) - ASSETS)}; missing: {sorted(ASSETS - set(published))}')

# ---------------------------------------------------------------------------------------------
# 2. Home carries the approved lines, in order, and nothing else.
# ---------------------------------------------------------------------------------------------
home = read(DOCS / 'index.html')
check('Home: every line is approved, in the approved order', home.blocks == HOME,
      '\n     '.join(f'{"OK " if i < len(HOME) and b == HOME[i] else "?? "}{b}' for i, b in enumerate(home.blocks)))
check('Home: title and og:title', norm(home.title) == TITLE and home.meta.get('og:title') == TITLE)
check('Home: meta description and og:description',
      home.meta.get('description') == DESCRIPTION and home.meta.get('og:description') == DESCRIPTION)
check('Home: social preview declared at 1200 x 630', home.meta.get('og:image') == SITE + 'assets/social-preview.jpg'
      and home.meta.get('og:image:width') == '1200' and home.meta.get('og:image:height') == '630')

# ---------------------------------------------------------------------------------------------
# 3. One button, everywhere the same; no navigation.
# ---------------------------------------------------------------------------------------------
privacy = read(DOCS / 'privacy/index.html')
for label, pg in (('Home', home), ('Privacy', privacy)):
    ok = len(pg.buttons) == 1 and all(b.get('href') == BOOKING and b.get('target') == '_blank'
                                      and 'noopener' in b.get('rel', '') and 'fab' in b.get('class', '').split()
                                      for b in pg.buttons)
    check(f'{label}: one floating "Book a Map" button, opening {BOOKING} in a new tab', ok,
          f'buttons: {pg.buttons}')
    check(f'{label}: header is the wordmark and the button, no navigation',
          [l.get('href') for l in pg.header_links] == ['/', BOOKING] and not any(t == 'nav' for t, _ in pg.tags))
    check(f'{label}: footer lines', pg.blocks[-4:] == FOOTER, f'footer: {pg.blocks[-4:]}')
check('Privacy: header lines', privacy.blocks[:2] == HEADER, f'header: {privacy.blocks[:2]}')
nf = read(DOCS / '404.html')
check('404: the approved lines, in order', nf.blocks == PAGE_404, f'{nf.blocks}')
check('404: noindex, title "Page not found | Intellumia"',
      nf.meta.get('robots') == 'noindex' and norm(nf.title) == 'Page not found | Intellumia')
check('404: one floating "Book a Map" button, opening the booking page in a new tab',
      len(nf.buttons) == 1 and 'fab' in nf.buttons[0].get('class', '').split() and all(b.get('href') == BOOKING and b.get('target') == '_blank'
                                   and 'noopener' in b.get('rel', '') for b in nf.buttons))
nf_src = (DOCS / '404.html').read_text()
check('404: every path is absolute, so it works at any address',
      not re.search(r'(?:href|src)="(?!/|https://|mailto:)', nf_src))

# ---------------------------------------------------------------------------------------------
# 4. Words: banned, retired, descriptor, dashes, emoji, italics.
# ---------------------------------------------------------------------------------------------
surfaces = {}
for f in html_files:
    pg = read(DOCS / f)
    texts = pg.blocks + [norm(pg.title)] + [v for k, v in pg.meta.items() if k in (
        'description', 'og:title', 'og:description', 'og:image:alt')]
    for ld in pg.ld:
        texts += ld_values(json.loads(ld))
    surfaces['docs/' + f] = '\n'.join(texts)
llms = (DOCS / 'llms.txt').read_text()
surfaces['docs/llms.txt'] = llms
for group, words in BANNED.items():
    hits = {f: words_found(t, words) for f, t in surfaces.items()}
    hits = {f: h for f, h in hits.items() if h}
    check(f'no {group}', not hits, f'{hits}')

desc_hits = [f for f, t in surfaces.items() if DESCRIPTOR.lower() in t.lower()]
check('the descriptor appears on Privacy only', set(desc_hits) <= {'docs/privacy/index.html'}, f'{desc_hits}')
all_text = '\n'.join(surfaces.values())
check('no em dashes', '—' not in all_text and ' -- ' not in all_text)
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
# 5. Colour, type and shape.
# ---------------------------------------------------------------------------------------------
hexes = {h.upper() for h in re.findall(r'#[0-9A-Fa-f]{6}\b', css)}
check('colours are the seven brand tokens only', hexes <= COLOURS, f'other colours: {hexes - COLOURS}')
check('no gradients, shadows or dark mode', not re.search(r'gradient|shadow|prefers-color-scheme', css, re.I))
check('vermilion is set once, on the .fire class only',
      css.count('#FF3D00') == 1 and css.count('var(--fire)') == 1 and '.fire{color:var(--fire)}' in css)
fire_ok = (len(home.fire) == 1 and 'h1' in home.fire[0] and privacy.fire == [] and nf.fire == []
           and all('class="fire"' not in (DOCS / f).read_text() for f in html_files if f not in pages))
check('one red thing: one word of the hero, at Statement size', fire_ok)
check('the hero is set in the Statement style', re.search(r'<h1 class="st">', (DOCS / 'index.html').read_text()) is not None)
families = set(re.findall(r'font-family:([^;}]+)', css))
check('Anek Latin is the only typeface', families <= {"'Anek Latin'", "'Anek Latin',sans-serif"}, f'{families}')
fonts = sorted(p.name for p in DOCS.rglob('*') if p.suffix in ('.woff', '.woff2', '.ttf', '.otf'))
check('only Anek font files are published, with the licence beside them',
      fonts == ['AnekLatin-latin.woff2', 'AnekLatin-latinext.woff2'] and (DOCS / 'assets/fonts/OFL-Anek.txt').exists(),
      f'{fonts}')
check('corners: 6 for buttons, 10 for the panel, 0 for the portrait',
      '.btn{' in css and 'border-radius:6px' in css and 'border-radius:10px' in css
      and set(re.findall(r'border-radius:(\d+)px', css)) <= {'6', '10', '0'})
check('the one button floats: fixed in the bottom right corner, the footer and focus kept clear of it',
      '.fab{position:fixed;right:16px;bottom:16px' in css and 'scroll-padding-bottom' in css
      and 'body:has(.fab) .ftr{padding-bottom' in css)
check('one Bone panel', (DOCS / 'index.html').read_text().count('class="panel"') == 1
      and css.count('var(--bone)') == 1)

# ---------------------------------------------------------------------------------------------
# 6. No forms, trackers or third-party scripts; structured data without offers or prices.
# ---------------------------------------------------------------------------------------------
blocked = {}
for f in html_files:
    pg = read(DOCS / f)
    bad = [t for t, _ in pg.tags if t in ('form', 'input', 'iframe', 'textarea', 'select', 'video', 'audio')]
    bad += [s_.get('src', 'inline script') for s_ in pg.scripts if s_.get('type') != 'application/ld+json']
    if bad:
        blocked[f] = bad
check('no forms, frames, chat widgets or scripts other than structured data', not blocked, f'{blocked}')
for label, pg in (('Home', home), ('Privacy', privacy)):
    csp = pg.meta.get('Content-Security-Policy', '')
    check(f"{label}: security policy blocks scripts (script-src 'none')", "script-src 'none'" in csp)
graph = json.loads(home.ld[0])['@graph'] if home.ld else []
org = next((g for g in graph if g.get('@type') == 'Organization'), {})
person = next((g for g in graph if g.get('@type') == 'Person'), {})
check('Home structured data: Organization with the 25 words, address and logo',
      org.get('legalName') == 'Intellumia Pte. Ltd.' and org.get('description') == DESCRIPTION
      and org.get('address', {}).get('postalCode') == '409051' and org.get('logo', '').endswith('.svg'))
check('Home structured data: Person, Sundeep Kumar, Founder & CEO',
      person.get('name') == 'Sundeep Kumar' and person.get('jobTitle') == 'Founder & CEO')
check('structured data has no offers or prices',
      not re.search(r'offer|price', ' '.join(home.ld + privacy.ld + nf.ld), re.I))

# ---------------------------------------------------------------------------------------------
# 7. The fallback at the repository root carries the same words as the live pages.
# ---------------------------------------------------------------------------------------------
for live, fb in (('index.html', 'index.html'), ('privacy/index.html', 'privacy.html')):
    check(f'fallback {fb} matches docs/{live} (run scripts/make_fallback.py if not)',
          read(ROOT / fb).blocks == read(DOCS / live).blocks)

print()
failed = results.count(False)
print(f'{len(results) - failed} passed, {failed} failed')
sys.exit(1 if failed else 0)
