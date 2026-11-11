#!/usr/bin/env python3
"""Copy and one-page checks for intellumia.com (strategy v5.0, Brand System v5.0.x, Rounds 5 to 10).

Run before every pull request, from the repository root:

    python3 scripts/check_copy.py

Standard library only. Prints one line per check and exits 1 if any check fails.
The rules are in CLAUDE.md. The page is the Round 5 page as cut and re-laid by Rounds 9 and 10 (Sundeep's briefs of
10 Nov 2026: Drive website, "Website round 9, design pass" and "Website round 10, cut and contact"); the lines below
are the only words it may carry, in this order. To change a line, change it here and on the page in the same
commit, with Sundeep's approval.
"""
import base64
import datetime as dt
import hashlib
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import quote

sys.dont_write_bytecode = True  # no __pycache__ in scripts/
sys.path.insert(0, str(Path(__file__).resolve().parent))
import make_structured_data as msd  # noqa: E402  (the structured data is generated from the page; Round 7)

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / 'docs'
SITE = 'https://intellumia.com/'
BOOKING = 'https://cal.com/intellumia/meetsk'  # the second button (Round 10)
LINKEDIN = 'https://www.linkedin.com/in/kumarsundeep'
COMPANY_LINKEDIN = 'https://www.linkedin.com/company/intellumia'  # the Organization's sameAs (Sundeep, 5 Nov 2026)

# ---------------------------------------------------------------------------------------------
# Approved lines (Brand System v5.0.8; the Round 5 mockup index-round5.html). Nothing else goes on the page.
# ---------------------------------------------------------------------------------------------
TITLE = 'Intellumia, the AI partner for owner-run businesses'
DESCRIPTION = ('Intellumia shows owner-run businesses where AI makes them money, runs the parts that do '
               'with named professionals signing off, and takes no vendor fees.')
# The action (Round 10): WhatsApp first, booking second. Never 'Book a Map', 'Talk to Sundeep' or 'Book a call'.
WHATSAPP = 'WhatsApp Sundeep'
BOOK = 'Book a 30-minute call'
WA_MESSAGE = 'Hello Sundeep, I saw intellumia.com and would like to talk.'
WA_LINK = 'https://wa.me/918855884042?text=' + quote(WA_MESSAGE, safe='')
PHONE_LINE = '+91 88558 84042 (WhatsApp)'  # the footer, under the email
TELEPHONE = '+91-88558-84042'  # structured data
CATEGORY = 'The AI partner for owner-run businesses'
HERO = 'Where can AI make you money?'  # v5.0.6; 'money' is the hero's red thing
HERO_LINE = 'We find it in your numbers. Then we run it for you.'
OLD_HERO = 'Where will AI make your business money? We will show you, then run it.'  # retired 4 Nov 2026
NOTE = 'Reply with a day. 30 minutes, at your office or by video.'  # under the hero buttons (Round 10)
FOUNDER_LINE = 'Sundeep Kumar, Founder & CEO'  # under the hero buttons, to #h-sk, with the round portrait (alt "")
# The pictures (Round 8, 10 Nov 2026): the one picture set. Served as the files supplied, never recoloured or edited:
# each is pinned by its sha256. Its alt text is the SVG's own aria-label, word for word. The hero picture is the tight
# 935 x 645 file (Round 9); the 1920 x 1080 one is in _archive/round-10-2026-11-11/.
PICTURES = {  # name: (width, height, alt, sha256)
    'hero-one-precise-intervention-tight': (935, 645, 'Two parts of a business joined by one red bridge, with a blue '
                                            'route running through',
                                            '720f13fa1b09c9b279171624eba8dfdfe7e0e9bf0f4ce075078eb585e4fe4826'),
    'problem-margin-squeezed': (800, 600, 'A press squeezing a coin stack; coins pushed out in red',
                                'ffba330223c34512e8207934018b3073d7eb3070c01da7d9e75d2dfad36db3a3'),
    'problem-cash-stuck': (800, 600, 'Coins under a locked glass case beside a stack of invoices; the padlock is red',
                           '0708db403fcfd7cdbac0f479b6fdd71289b60ce5b6c2d3b7d54b1a12efc92e2c'),
    'problem-people-leaving': (800, 600, 'A workbench with four places; one stool has moved away, in red',
                               '607549f65228da832e7d29cef85fe9c49750ae029cbda94ae0cf08b6e7ef32f1'),
    'problem-numbers-late': (800, 600, 'A tall pile of sheets beside a clock; the time lost is a red wedge',
                             '208500a527a59590889715fede3b3a992dbc7a841ddf119d746a49ae2efeb0f9'),
    'problem-rework': (800, 600, 'A conveyor with cartons; one rejected carton sits red on the rework pile',
                       'ffb28f801243ab4ddaeb7a5e0382e0b62e39b82eedbc2c1a24db414288a033a3'),
    'problem-everything-on-you': (800, 600, 'A desk with a towering, leaning pile and an empty chair; the latest item on '
                                  'top is red', '1f0d29693de8c0f9a001ca5f2e93bb9fc28a6449fc8414ad97e4e034b9019698'),
    'offer-map': (800, 600, 'A layout of the business; a blue route leads to the one place that pays first, in red',
                  'c28c1d0f52f0a396a292b6bdf7bf9180663a698574ceac19003454903019e585'),
    'offer-run': (800, 600, 'A conveyor running cleanly on a blue belt; the finished carton carries a red seal',
                  '80bfd92e0d799d82a8f3f1eca7ece65de203b22793e243f87ab78226a2e68cad'),
    'offer-guide': (800, 600, 'A table with a drawing on it and two seats on the same side; the second seat is red',
                    'f52687fb7e6a65e4885ab126a3392145c91cfdec81790f1ae07cf041b582c00a'),
}
PICTURE_COLOURS = {'#FFFFFF', '#101010', '#DDD8CC', '#1A1AFF', '#FF3D00'}  # the picture set's five colours (its README)
SHARE = ('assets/share/share-hero.png', '8a29f77892f24229afe4013bc90e5c4bcee203420bb31bc908fc6b70e5cd06ec')  # 1200 x 630
HERO_PIC = 'hero-one-precise-intervention-tight'
OFFERS = ['offer-map', 'offer-run', 'offer-guide']  # on the Map, Run and Guide cards
SHARE_ALT = 'Intellumia: one red bridge connects two parts of a business'  # og:image:alt, twitter:image:alt (10 Nov 2026)


def pic_alt(name):
    return PICTURES[name][2]


HERO_BLOCK = [CATEGORY, HERO, HERO_LINE, WHATSAPP, BOOK, NOTE, '[img] ', FOUNDER_LINE, '[img] ' + pic_alt(HERO_PIC)]
# The problems (Rounds 9 and 10): one section, each problem once: its picture, its question and its answer.
SCENES_HEADING = 'Most owner-run businesses have money hiding in plain sight.'
WHY_AI = ('These leaks are not new. Fixing them took hours of checking, chasing and counting that nobody had time for. '
          'AI now does that work every day, so the money stops slipping away.')
OFTEN_FIRST = 'Often first'  # the tag on the cash card: the section's red thing
CARDS = [('problem-margin-squeezed', 'Costs up, prices stuck?', 'Your costliest process, done a better way'),
         ('problem-cash-stuck', 'Customers paying late?', 'Every overdue invoice, followed up on time'),
         ('problem-people-leaving', 'Good people leaving?', 'Routine work off your best people'),
         ('problem-numbers-late', 'Numbers always late?', 'One page across your companies, every week'),
         ('problem-rework', 'Too much made twice?', 'Defects caught earlier'),
         ('problem-everything-on-you', 'All on your desk?', 'Decisions arrive with the facts ready')]
AI_LINE = 'AI does the work. Your people make the calls.'
PROBLEMS = ([SCENES_HEADING, WHY_AI]
            + [x for i, (n, q, a) in enumerate(CARDS)
               for x in (['[img] ' + pic_alt(n), q, a] + ([OFTEN_FIRST] if i == 1 else []))] + [AI_LINE])
STEPS = [('Start here', 'offer-map', 'Map', 'We find where AI would make you the most money, across the whole business, '
          'in two to three weeks. Always paid, for a fee agreed up front.'),
         ('If you choose', 'offer-run', 'Run', 'We run the moves you choose. AI does the routine work, a named professional '
          'checks it and signs off, and you see the result every week.'),
         ('Alongside', 'offer-guide', 'Guide', 'Independent advice on AI, vendors and your board. We take no fees from vendors.')]
WEEKS = ['Start', 'Summaries only', 'Week 1', 'Interviews with you and your team',
         'Week 2', 'Each move valued and tested on your records', 'Week 3', 'The readout, to you alone']
STAFF_TIME = "About 20 to 40 hours of your staff's time, agreed before we start."
HOW = (['A Map first. Then we run the parts that pay.']
       + [x for label, p, n, d in STEPS for x in (label, '[img] ' + pic_alt(p), n, d)] + WEEKS + [STAFF_TIME])
EXAMPLE = ['From an overdue invoice to money collected.',
           '1', 'AI', 'Reads the record',
           'Invoice, payments and emails in one view. It spots that the customer asked for a delivery note.',
           '2', 'AI', 'Prepares the next step', 'It finds the delivery note and drafts the follow-up.',
           '3', 'Your people', 'Decide',
           'Your finance team approves what goes to the customer. A named professional reviews the exceptions.',
           '4', 'You', 'See the result', 'Every week: days to collect, overdue balance and the time your team spent.',
           'Illustrative, not a client.']
# The words in the decorative drawings (aria-hidden): the example steps and their coin.
DECOR_WORDS = {'₹', '?', 'MISSING', 'DRAFT', 'Approve', 'Edit', 'OVERDUE, WEEK BY WEEK'}
PORTRAIT_ALT = 'Sundeep Kumar, Founder and CEO of Intellumia'
NAME = 'Sundeep Kumar, Founder & CEO'
# The founder (Round 10, D2 and D3; Sundeep, 10 Nov 2026): IBM and Microsoft by name, the two facts from the approved
# long bio, "Based in India", never a city, never a client name.
FOUNDER = ("More than two decades at IBM and Microsoft helping large companies across Asia-Pacific change how they work, "
           "now on the owner's side. Based in India.")
BUILT_LINE = 'Businesses built from zero inside them; one to $72 million in 24 months'  # the page's only figure with a currency sign
FACTS = ['20+ years', 'IBM and Microsoft, across Asia-Pacific', '4 built', BUILT_LINE,
         'Wharton, Oxford, Yale', 'Executive education']
QUOTE = ('“AI will do for business what electricity did for factories. The owners who wire up first set the pace '
         'for everyone else.”')  # v5.0.8
LINKEDIN_TEXT = 'Sundeep on LinkedIn'
PERSON = ['[img] ' + PORTRAIT_ALT, NAME, FOUNDER, *FACTS, QUOTE, LINKEDIN_TEXT]
RULE_KEY = 'No vendor fees'  # rule 02: its number is the section's red thing
RULES_LIST = [('01', 'Valued first', 'Every move is valued in your numbers before you commit to any build.'),
              ('02', RULE_KEY, 'No referral fees and no resale margins, ever. Our advice is paid for by you alone.'),
              ('03', 'Your data stays put', 'In your own environment, with models that neither keep nor train on it.'),
              ('04', 'Yours to keep', 'What we build with you is yours, with the right to run it without us.')]
RULES = ['On your side of the table, in writing.', *[x for r in RULES_LIST for x in r]]
FAQS = [('What does a Map cost?',
         'A fixed fee, agreed before we start and always paid. We share it on the first call, once we know the size '
         'of your business.'),
        ('Is our data safe?',
         'We start with summaries, never all your books on day one. Your data stays in your own environment, with '
         'models that neither keep nor train on it.'),
        ('Will this replace our people?',
         'It is not built to cut jobs. AI takes the routine work, and your people review and decide. The Map shows '
         'where time is freed; what you do with it is your call.'),
        ('Are we tied in after the Map?',
         'No. You keep everything the Map produces. Each move names at least one way to do it without us, and the '
         'fee never depends on what you choose next.')]
FAQ = ['Before you book.', *[x for qa in FAQS for x in qa]]
QUESTION = 'Where does your business lose the most cash, days or margin today?'
PLATE = [QUESTION, WHATSAPP, BOOK]
ADDRESS = 'Intellumia Pte. Ltd., 60 Paya Lebar Road, #06-28, Paya Lebar Square, Singapore 409051'
EMAIL = 'sundeep@intellumia.com'
SIGN_OFF = 'Intelligence, Illuminated.'
DESCRIPTOR = 'an AI-native product company, starting with service'  # Privacy only
NOT_FOUND = ['Page not found', 'There is nothing at this address.', HERO, 'Go to intellumia.com']

HEADER = ['[img] Intellumia', WHATSAPP]  # Home, Privacy and the 404 page
FOOTER = ['[img] Intellumia', 'Working with owners across India.', ADDRESS, EMAIL, PHONE_LINE, 'Privacy', SIGN_OFF]
BAR = [WHATSAPP]
MAIN = HERO_BLOCK + PROBLEMS + HOW + EXAMPLE + PERSON + RULES + FAQ + PLATE
HOME = HEADER + MAIN + FOOTER + BAR
PAGE_404 = HEADER + NOT_FOUND + FOOTER
WORD_LIMIT = 600  # Round 10, A1: reading words in the body of Home (between header and footer), alt text not counted;
# the answers inside the closed FAQ accordions are counted apart (the copy the brief sets comes to 687 with them)
LABELS = 8  # Round 10, A4: the hero eyebrow, the three step labels and the four example step numbers

# ---------------------------------------------------------------------------------------------
# Words that never appear on a published surface (case-insensitive, whole words).
# Round 5 (v5.0.8): "fixed" and "live" leave the list (the approved FAQ says "A fixed fee" and the Run card
# "Live within 90 days"); "assessment", "pilot" and "free" stay, so the Map is never called any of them.
# ---------------------------------------------------------------------------------------------
BANNED = {
    'brand never-list': ['AI-powered', 'harness', 'transformation', 'consultancy', 'solution', 'solutions',
                         'leverage', 'unlock', 'empower', 'revolutionary', 'game-changing', 'guaranteed',
                         'guarantee', 'journey', 'replace your team', 'retainer', 'PoC', 'the layer',
                         'cash cycle first', 'the judgement engine', 'an AI team does the work'],
    'words for the Map: assessment, pilot, free': ['assessment', 'assessments', 'pilot', 'pilots', 'free',
                                                    'for free', 'free of charge'],
    'prices and fee models': ['monthly', 'package', 'packages', 'plan', 'plans', 'rate card', 'tier', 'tiers',
                              'pricing', 'fee model', 'per month', 'per year', 'lakh', 'crore', 'INR', 'SGD',
                              'USD', 'Rs'],
    'retired terms (3 Nov 2026)': ['judgement engine', 'judgment engine', 'decision intelligence',
                                   'intelligence layer', 'Decision Sprint', '90-day build', 'Embed',
                                   'Sales Engine', 'Plant Engine', 'Cash Engine', 'owner-led', 'Rent the model',
                                   'research desk', "owner's brief", 'engine', 'engines'],
    'retired buttons and links ("Book a Map" and "Talk to Sundeep" above all)': [
        'Book a Map', 'Talk to Sundeep', 'Book a call', 'See the Sales Engine work', 'Book 30 minutes', 'How we work',
        'brief@intellumia.com', OLD_HERO],
    'retired lines (Round 5, v5.0.8)': [
        'We will never tell you only Intellumia can solve it',
        'What the Map gives you', 'We start with your money', 'Where it starts', 'money lost every month'],
    'retired lines (Round 10)': [
        'Fix what holds it back', 'Bring the answer', 'Led by Sundeep', 'Fortune 1000', 'Who we work with',
        'Where AI is already proven', 'Cash over hours', 'Your choice, in writing', 'Nothing to prepare',
        'Two to three weeks. Your numbers. Your choice.', 'You see the working'],
    'products described as existing': ['now live', 'live now', 'is live', 'demo', 'demo opening soon', 'in build',
                                       'opening soon', 'sandbox', 'platform', 'module', 'modules'],
    'proof the business does not have yet': ['case study', 'case studies', 'testimonial', 'testimonials',
                                             'trusted by', 'results', 'our clients', 'clients include'],
    'fear, urgency, scarcity': ['hurry', 'act now', 'limited time', 'last chance', 'only a few',
                                'falling behind', 'left behind', "don't miss", 'before it is too late'],
    'forms and sign-ups': ['newsletter', 'subscribe', 'sign up', 'sign-up'],
    'American spelling': ['color', 'colors', 'center', 'centers', 'organization', 'organizations', 'organize',
                          'analyze', 'optimize', 'optimization', 'behavior', 'favorite', 'labor', 'honor',
                          'realize', 'recognize', 'prioritize', 'catalog', 'defense', 'fulfill', 'modeling',
                          'traveling', 'judgment'],
    'city for Sundeep': ['Mumbai', 'Delhi', 'New Delhi', 'Bengaluru', 'Bangalore', 'Pune', 'Chennai',
                         'Hyderabad', 'Kolkata', 'Gurgaon', 'Gurugram', 'Noida', 'Ahmedabad', 'Nagpur'],
}
# The seven brand tokens and nothing else (Round 9: no yellow, no tints; the cyan left with the heat map).
TOKENS = {'#FFFFFF', '#101010', '#1A1AFF', '#FF3D00', '#F3EFE6', '#DDD8CC', '#5E5B55'}
DRAWING_COLOURS = {'#101010', '#DDD8CC', '#1A1AFF', '#FFFFFF'}  # the example drawings: ink, rule and ultramarine (white as #fff)
# Retired from the page: the scene bands (v5.0.5, in _archive/), the plant loop (deleted 4 Nov 2026, removed from the
# git history), the leaks diagram (Round 5, in the git history), and the painted scenes and the typographic social
# preview (Round 8, in _archive/).
RETIRED = ['plant2-band', 'plant-loop', 'corridor', 'leak-lg', 'class="drop"', 'figure class="leaks"',
           '/assets/scenes/', 'scene-1-margin', 'scene-6-owner', 'social-preview', 'trust-yours-to-keep',
           'map-lg', 'map-sm', 'class="chips"', '#FFC800', 'hero-one-precise-intervention.svg']
PAINTED_SCENES = [f'scene-{i}{s}.jpg' for i in ('1-margin', '2-cash', '3-people', '4-numbers', '5-rework', '6-owner')
                  for s in ('', '-360')]
ARCHIVED = ([f'_archive/scenes-painted-2026-11-10/{f}' for f in PAINTED_SCENES]
            + ['_archive/social-preview-2026-11-10/social-preview.jpg',
               '_archive/pictures-unused-2026-11-10/trust-yours-to-keep.svg']  # Round 8: moved, not deleted
            + [f'_archive/round-10-2026-11-11/{f}' for f in (
                'README.md', 'index-before-round-10.html', 'site-before-round-10.css', 'llms-before-round-10.txt',
                'who-we-work-with.html', 'the-map.html', 'our-rules-six.html', 'faq-eight.html',
                'what-we-do-cards-and-icons.html', 'how-it-works-and-example.html', 'founder-block.html',
                'close-plate.html', 'hero-one-precise-intervention.svg')])  # Rounds 9 and 10: moved, not deleted
ASSETS = {'assets/site.css', 'assets/site.js', 'assets/intellumia-wordmark-ultramarine.svg',
          'assets/fonts/AnekLatin-latin.woff2', 'assets/fonts/AnekLatin-latinext.woff2', 'assets/fonts/AnekLatin-rupee.woff2',
          'assets/fonts/OFL-Anek.txt',
          'assets/imagery/sundeep-portrait-2026_120.jpg', 'assets/imagery/sundeep-portrait-2026_720.jpg',
          'assets/imagery/sundeep-portrait-2026_890.jpg', SHARE[0]} | {f'assets/pictures/{n}.svg' for n in PICTURES}
EMOJI = re.compile('[\U0001F000-\U0001FAFF☀-➿️‍]')

# ---------------------------------------------------------------------------------------------
results = []


def check(name, ok, detail=''):
    results.append(ok)
    print(('PASS ' if ok else 'FAIL ') + name + ('' if ok or not detail else f'\n     {detail}'))


def norm(s):
    return re.sub(r'\s+', ' ', s.replace('’', "'").replace(' ', ' ')).strip()


class Page(HTMLParser):
    """Reads a page into ordered text blocks plus the facts the checks need.
    A drawing with role="img" becomes one block, '[svg] ' and its label (its aria-label, or the title and desc it
    is labelled by, as 'title | desc'); decorative svg (aria-hidden) is skipped. The words drawn inside each
    labelled drawing are kept in self.drawings, as (label, [words]); those in decorative drawings in self.decor."""
    FLUSH = {'p', 'h1', 'h2', 'h3', 'h4', 'li', 'a', 'div', 'section', 'header', 'footer', 'main', 'ul', 'ol',
             'nav', 'button', 'figure', 'figcaption', 'title', 'body', 'span', 'details', 'summary'}
    KEEP_SPAN = {'fire', 'nw', 'sm-only'}  # spans inside a line: no break

    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.blocks, self.buf, self.stack = [], [], []
        self.meta, self.links, self.buttons, self.scripts, self.tags = {}, [], [], [], []
        self.title, self.fire, self.header_links, self.ld = '', [], [], []
        self.in_script = self.in_style = self.in_title = False
        self.svg = 0
        self.svg_part, self.svg_parts, self.svg_words, self.svg_block = None, {}, [], None
        self.drawings, self.decor = [], []
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
            if self.svg == 0:
                self.svg_parts, self.svg_words, self.svg_block = {}, [], None
                if a.get('role') == 'img':
                    self.flush()
                    self.blocks.append('[svg] ' + norm(a.get('aria-label', '')))
                    self.svg_block = len(self.blocks) - 1
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
                if self.svg == 0:
                    if self.svg_block is not None:
                        if self.svg_labelledby:
                            ids = {i: norm(t) for (k, i), t in self.svg_parts.items() if k in ('title', 'desc')}
                            self.blocks[self.svg_block] = '[svg] ' + ' | '.join(ids.get(i, '') for i in self.svg_labelledby)
                        self.drawings.append((self.blocks[self.svg_block], self.svg_words))
                    else:
                        self.decor += self.svg_words
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


# Asset versions (10 Nov 2026, after Round 8): every link to a stylesheet, script, picture, font or icon carries
# ?v= and the first 10 hex characters of the file's sha256 (scripts/make_asset_versions.py), so a changed file gets a
# new address. The checks below on the pages' structure read them without their versions (plain); section 1 checks
# that every version matches its file.
VERSIONED = re.compile(r'\?v=[0-9a-f]{10}(?=[\s"\',)])')


def plain(text):
    return VERSIONED.sub('', text)


def read(path):
    return Page(plain(path.read_text()))


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


def png_size(path):
    data = path.read_bytes() if path.exists() else b''
    if data[:8] != b'\x89PNG\r\n\x1a\n' or data[12:16] != b'IHDR':
        return None
    return int.from_bytes(data[16:20], 'big'), int.from_bytes(data[20:24], 'big')


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest() if path.exists() else ''


def between(src, start, end):
    return src[src.index(start):src.index(end)] if start in src and end in src else ''


# ---------------------------------------------------------------------------------------------
# 1. One page: Home and Privacy are the pages, 404.html is the not-found page; every other HTML file
#    is a redirect to Home.
# ---------------------------------------------------------------------------------------------
# Google Search Console's verification file (Round 7, Sundeep, 4 Nov 2026): kept permanently, not a page.
VERIFY_FILE = 'googlebe2efba1afc3cbe9.html'
html_files = sorted(p.relative_to(DOCS).as_posix() for p in DOCS.rglob('*.html') if p.name != VERIFY_FILE)
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
verify = DOCS / VERIFY_FILE
check(f'the Search Console verification file /{VERIFY_FILE}: exactly its one line, kept permanently, not in the sitemap',
      verify.exists() and verify.read_bytes() in (f'google-site-verification: {VERIFY_FILE}'.encode(),
                                                   f'google-site-verification: {VERIFY_FILE}\n'.encode())
      and VERIFY_FILE not in (DOCS / 'sitemap.xml').read_text()
      and [p.name for p in DOCS.rglob('google*.html')] == [VERIFY_FILE])

robots = (DOCS / 'robots.txt').read_text()
check('robots.txt allows every crawler and names the AI crawlers',
      'User-agent: *\nAllow: /' in robots and 'Disallow' not in robots
      and all(b in robots for b in ('GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'))
      and 'Sitemap: https://intellumia.com/sitemap.xml' in robots)

# Every link to a file under /assets/ or to an icon, on every page and in the stylesheet, carries the file's version.
ASSET_REF = re.compile(r'(?:https://intellumia\.com)?(/(?:assets/[^\s"\'()?#,]+|favicon\.ico|favicon\.svg|apple-touch-icon\.png))'
                       r'(\?v=[0-9a-f]*)?')


def file_version(path):
    f = DOCS / path.lstrip('/')
    return hashlib.sha256(f.read_bytes()).hexdigest()[:10] if f.is_file() else 'missing'


bad_versions, version_links = [], 0
for f in [*html_files, 'assets/site.css']:
    raw = (DOCS / f).read_text()
    values = (re.findall(r"url\('([^']*)'\)", raw) if f.endswith('.css')
              else [v for _, v in re.findall(r'\b(src|href|srcset|content)="([^"]*)"', raw)])
    for value in values:
        for path, ver in ASSET_REF.findall(value):
            version_links += 1
            if ver != '?v=' + file_version(path):
                bad_versions.append(f'{f}: {path}{ver or " (no version)"}, the file is {file_version(path)}')
check(f'asset versions: every link to the stylesheet, the script, a picture, a font or an icon ({version_links} links on '
      'the pages and in site.css) carries ?v= and the first 10 characters of the file\'s sha256, so a changed file gets a '
      'new address (run scripts/make_asset_versions.py if not)',
      not bad_versions and version_links >= 40, '\n     '.join(bad_versions))
published = sorted(p.relative_to(DOCS).as_posix() for p in (DOCS / 'assets').rglob('*') if p.is_file())
check('docs/assets holds only what the pages use', set(published) == ASSETS,
      f'extra: {sorted(set(published) - ASSETS)}; missing: {sorted(ASSETS - set(published))}')

# ---------------------------------------------------------------------------------------------
# 2. Home carries the approved lines, in the mockup's order, and nothing else.
# ---------------------------------------------------------------------------------------------
js_all = (DOCS / 'assets/site.js').read_text()
home_src = plain((DOCS / 'index.html').read_text())
home = read(DOCS / 'index.html')
css = plain((DOCS / 'assets/site.css').read_text())
check(f'Home: every line is approved, in the approved order ({len(HOME)} lines)', home.blocks == HOME,
      sequence_report(home.blocks, HOME))
check('Home: title and og:title', norm(home.title) == TITLE and home.meta.get('og:title') == TITLE)
check('Home: meta description and og:description',
      home.meta.get('description') == DESCRIPTION and home.meta.get('og:description') == DESCRIPTION)
for label, pg in (('Home', home), ('Privacy', read(DOCS / 'privacy/index.html'))):
    check(f'{label}: the share image is share/share-hero.png (Round 8), declared at 1200 x 630 with its alt text',
          pg.meta.get('og:image') == SITE + SHARE[0] and pg.meta.get('og:image:width') == '1200'
          and pg.meta.get('og:image:height') == '630' and pg.meta.get('og:image:alt') == SHARE_ALT,
          f"{pg.meta.get('og:image')} {pg.meta.get('og:image:alt')}")
check('the share image is 1200 x 630, the file as supplied (pinned by its sha256)',
      png_size(DOCS / SHARE[0]) == (1200, 630) and sha256(DOCS / SHARE[0]) == SHARE[1], f'{png_size(DOCS / SHARE[0])}')
hero_src = between(home_src, '<!-- HERO -->', '<!-- PROBLEMS -->')
order = ['<!-- HERO -->', '<!-- PROBLEMS -->', '<!-- HOW IT WORKS -->', '<!-- EXAMPLE -->', '<!-- SUNDEEP -->', '<!-- RULES -->',
         '<!-- FAQ -->', '<!-- CLOSE -->']
check('Home: the sections in the Round 10 order: hero, problems, how it works, the example, the founder, our rules, the '
      'questions, the close; no "Who we work with" and no Map section',
      all(m in home_src for m in order) and [home_src.index(m) for m in order] == sorted(home_src.index(m) for m in order)
      and '<!-- WHO -->' not in home_src and '<!-- THE MAP -->' not in home_src and 'id="h-map"' not in home_src)
reading = [b for b in home.blocks[len(HEADER):len(HEADER) + len(MAIN)] if not b.startswith('[img]')]
words = sum(len(b.split()) for b in reading)
closed = sum(len(a.split()) for _, a in FAQS)  # the four answers, inside closed accordions
check(f'Home: {words - closed} reading words on show between the header and the footer, alt text not counted (Round 10: '
      f'{WORD_LIMIT} or fewer); {words} with the four FAQ answers, which are closed until opened',
      home.blocks[len(HEADER):len(HEADER) + len(MAIN)] == MAIN and words - closed <= WORD_LIMIT, f'{words} words')
HERO_IMG = (f'<div class="hero-pic"><img src="/assets/pictures/{HERO_PIC}.svg" alt="{pic_alt(HERO_PIC)}" width="935" height="645" '
            'decoding="async"></div>')
check('the hero: the label, the headline, the line, the two buttons and the note, the founder line (the 56 px round '
      'portrait, to #h-sk), then the tight hero picture: not lazy, width and height set; words in columns 1 to 7 and the '
      'picture in 8 to 12 from 1000 px, under the words and at most 520 px below',
      '<section class="wrap hero" id="hero">' in hero_src and hero_src.count('<img') == 2 and HERO_IMG in hero_src
      and '<a class="founder" href="#h-sk"><img src="/assets/imagery/sundeep-portrait-2026_120.jpg" alt="" width="56" '
          'height="56"><span>Sundeep Kumar, Founder &amp; CEO</span></a>' in hero_src
      and hero_src.index('class="bd note"') < hero_src.index('<a class="founder"') < hero_src.index(HERO_IMG)
      and '.founder img{width:56px;height:56px;border-radius:50%;object-fit:cover;filter:grayscale(1)}' in css
      and '.hero-pic{margin:20px auto 0;max-width:520px}' in css
      and '.hero-text{grid-column:1/8}.hero-pic{grid-column:8/13;margin:0;max-width:none}' in css)
talk = sorted(p.relative_to(ROOT).as_posix() for p in list(DOCS.rglob('*')) + [ROOT / 'index.html', ROOT / 'privacy.html']
              if p.is_file() and p.suffix in ('.html', '.txt', '.xml', '.css', '.js', '.json')
              and re.search(r'talk to sundeep|where will ai make your business|book a call', p.read_text(errors='ignore'), re.I))
check('"Talk to Sundeep", "Book a call" and the old hero line appear nowhere on the site', not talk, f'{talk}')
faq_src = between(home_src, '<!-- FAQ -->', '<!-- CLOSE -->')
details = re.findall(r'<details class="fq"( open)?><summary class="ld"><span>([^<]+)</span><span class="pl" aria-hidden="true"></span>'
                     r'</summary><p class="bd">([^<]+)</p></details>', faq_src)
check('the FAQ: four native questions (details and summary), all closed, before the close (Round 10)',
      [(o, norm(q), norm(a)) for o, q, a in details] == [('', q, a) for q, a in FAQS]
      and faq_src.count('<details') == 4 == len(FAQS) and ' open' not in faq_src and 'id="h-faq"' in faq_src
      and home_src.index('<!-- FAQ -->') < home_src.index('id="close"'), f'{len(details)} questions read')
# Text sizes (Round 10, A3): five roles, set once as custom properties; no other font-size in the stylesheet or on
# the pages (the lettering inside the example drawings is part of the drawings and scales with them).
sizes = re.findall(r'font-size:([^;}]+)', css)
root_rule = re.search(r':root\{[^}]*\}', css).group(0)
roles = dict(re.findall(r'--fs-(\w+):([^;}]+)', root_rule))
inline_sizes = [f for f in html_files if re.search(r'font-size|style="', re.sub(r'<svg\b.*?</svg>|<script\b.*?</script>', '',
                                                                              (DOCS / f).read_text(), flags=re.S))]
check('text sizes: five roles only (Statement 44 to 96 px, Heading 28 to 48, Lead 20 to 22, Body 17 to 18, Label 12 to 13), '
      'set as custom properties; every font-size in the stylesheet is one of them',
      set(sizes) == {f'var(--fs-{r})' for r in ('statement', 'heading', 'lead', 'body', 'label')}
      and sorted(roles) == ['body', 'heading', 'label', 'lead', 'statement']
      and re.match(r'clamp\(44px,.*,96px\)$', roles['statement']) and re.match(r'clamp\(28px,.*,48px\)$', roles['heading'])
      and re.match(r'clamp\(20px,.*,22px\)$', roles['lead']) and re.match(r'clamp\(17px,.*,18px\)$', roles['body'])
      and roles['label'] == '12px' and re.findall(r'--fs-\w+:[^;}]+', css.replace(root_rule, '', 1)) == ['--fs-label:13px']
      and not re.search(r'\bfont:', css) and not inline_sizes, f'{sorted(set(sizes))} {roles} {inline_sizes}')
check(f'labels (Round 10, A4): {LABELS} on Home: the hero eyebrow, "Start here / If you choose / Alongside" and the four '
      'example step numbers; the Statement face on the headline and the closing question only',
      len(re.findall(r'class="label\b', home_src)) == LABELS and hero_src.count('class="label"') == 1
      and re.findall(r'<p class="label">([^<]+)</p><img class="step-pic"', home_src) == [s[0] for s in STEPS]
      and home_src.count('<p class="label ex-k">') == 4
      and re.findall(r'<(h\d) class="st"', home_src) == ['h1', 'h2'] and 'class="st" id="h-close"' in home_src)

# ---------------------------------------------------------------------------------------------
# 3. The action: "Book a call", always to the booking page, in a new tab.
#    Home: the header (wide screens), the hero, the closing plate and the phone bottom bar.
#    Privacy and the 404 page: the header button, at every width.
# ---------------------------------------------------------------------------------------------
privacy = read(DOCS / 'privacy/index.html')
nf = read(DOCS / '404.html')


def opens(b, href):
    return b.get('href') == href and b.get('target') == '_blank' and 'noopener' in (b.get('rel') or '')


home_btns = [(b.get('href'), (b.get('class') or '').split()[-1]) for b in home.buttons]
check(f'Home: "{WHATSAPP}" (ultramarine) in the header, the hero, the close (white) and the bottom bar; "{BOOK}" (outline) '
      'in the hero and the close only; each in a new tab',
      home_btns == [(WA_LINK, 'btn--sm'), (WA_LINK, 'btn'), (BOOKING, 'btn--out'), (WA_LINK, 'btn--inv'),
                    (BOOKING, 'btn--out-inv'), (WA_LINK, 'btn')]
      and all(opens(b, b.get('href')) for b in home.buttons) and home.buttons[5].get('tabindex') == '-1', f'{home_btns}')
wa_links = sorted({h for f in html_files for h in re.findall(r'href="(https://wa\.me/[^"]*)"', (DOCS / f).read_text())})
check('the WhatsApp link: wa.me/918855884042 with the message "' + WA_MESSAGE + '", URL-encoded; a plain link, no widget',
      wa_links == [WA_LINK] and WA_LINK in (DOCS / 'llms.txt').read_text()
      and home_src.count(WA_LINK) == 5 and 'whatsapp' not in js_all.lower(), f'{wa_links}')
check('Home: the bottom bar holds one button, starts hidden (aria-hidden, out of the tab order) and the script shows it',
      re.search(r'<div class="bar" id="bar" aria-hidden="true">\s*<a class="btn" [^>]*tabindex="-1">' + WHATSAPP + r'</a>\s*</div>',
                home_src) is not None and 'id="hero"' in home_src and 'id="close"' in home_src)
for label, pg, src in (('Privacy', privacy, plain((DOCS / 'privacy/index.html').read_text())),
                       ('404', nf, plain((DOCS / '404.html').read_text()))):
    check(f'{label}: one "{WHATSAPP}" button, in the header, shown at every width',
          len(pg.buttons) == 1 and opens(pg.buttons[0], WA_LINK) and '<header class="wrap hdr hdr--always">' in src)
check('no floating button left anywhere', all('class="btn fab"' not in (DOCS / f).read_text() for f in html_files))
check('Home: the header is the wordmark and the button only; no section links (Round 10)',
      [l.get('href') for l in home.header_links] == ['#top', WA_LINK] and not any(t == 'nav' for t, _ in home.tags)
      and '.nav' not in css)
for label, pg in (('Privacy', privacy), ('404', nf)):
    check(f'{label}: header is the wordmark and the button, no navigation',
          [l.get('href') for l in pg.header_links] == ['/', WA_LINK] and not any(t == 'nav' for t, _ in pg.tags))
check('Home: footer lines (the WhatsApp number on its own line under the email), then the bottom bar',
      home.blocks[-8:] == FOOTER + BAR
      and f'<a href="mailto:{EMAIL}">{EMAIL}</a><a href="{WA_LINK}" target="_blank" rel="noopener">{PHONE_LINE}</a>' in home_src,
      f'{home.blocks[-8:]}')
check('Privacy: header and footer lines', privacy.blocks[:2] == HEADER and privacy.blocks[-7:] == FOOTER,
      f'{privacy.blocks[:2]} ... {privacy.blocks[-7:]}')
privacy_text = ' '.join(privacy.blocks)
check('Privacy (Round 10): WhatsApp named in section 3 and in section 5, and the date changed',
      'WhatsApp: your number, name and what you write, handled by WhatsApp (Meta) under its own terms.' in privacy_text
      and 'The services above, WhatsApp included, and Cloudflare' in privacy_text
      and re.search(r'Last updated \d{1,2} November 2026\.', privacy_text) is not None
      and 'Last updated 4 November 2026' not in privacy_text)
check('404: the approved lines, in order', nf.blocks == PAGE_404, sequence_report(nf.blocks, PAGE_404))
check('404: noindex, title "Page not found | Intellumia"',
      nf.meta.get('robots') == 'noindex' and norm(nf.title) == 'Page not found | Intellumia')
check('404: every path is absolute, so it works at any address',
      not re.search(r'(?:href|src)="(?!/|https://|mailto:|#)', (DOCS / '404.html').read_text()))

# ---------------------------------------------------------------------------------------------
# 4. Pictures and drawings: the picture set (the hero picture, the six problem pictures and the three offer pictures)
#    and Sundeep's portrait; no video. The only drawings are the four example steps (decorative line drawings in ink,
#    rule and ultramarine) and the white ll mark on the close.
# ---------------------------------------------------------------------------------------------
js_text = (DOCS / 'assets/site.js').read_text()
imgs = [a.get('src') for t, a in home.tags if t == 'img']
PIC_ORDER = [HERO_PIC, *[n for n, _, _ in CARDS], *OFFERS]
check('pictures, in order: the hero picture, the six problem pictures, the three offer pictures and '
      "Sundeep's portrait (round in the hero, square in the founder section); no video",
      imgs == ['/assets/intellumia-wordmark-ultramarine.svg', '/assets/imagery/sundeep-portrait-2026_120.jpg',
               *[f'/assets/pictures/{n}.svg' for n in PIC_ORDER], '/assets/imagery/sundeep-portrait-2026_720.jpg',
               '/assets/intellumia-wordmark-ultramarine.svg']
      and sorted(PIC_ORDER) == sorted(PICTURES)
      and not any(t in ('video', 'picture', 'source', 'iframe') for t, _ in home.tags), f'{imgs}')
pic_tags = {a.get('src', '').rsplit('/', 1)[-1][:-4]: a for t, a in home.tags
            if t == 'img' and (a.get('src') or '').startswith('/assets/pictures/')}
pic_problems = []
for n, (w, h, alt, digest) in PICTURES.items():
    a, f = pic_tags.get(n, {}), DOCS / f'assets/pictures/{n}.svg'
    svg_text = f.read_text() if f.exists() else ''
    root = re.search(r'<svg\b[^>]*>', svg_text)
    root = root.group(0) if root else ''
    label = re.search(r'\saria-label="([^"]*)"', root)
    want = {'alt': alt, 'width': str(w), 'height': str(h), 'decoding': 'async',
            'loading': None if n == HERO_PIC else 'lazy', 'srcset': None, 'class': a.get('class')}
    if {k: a.get(k) for k in want} != want or set(a) - {'src', 'alt', 'width', 'height', 'loading', 'decoding', 'class'}:
        pic_problems.append(f'{n}: the img tag {a}')
    if not alt or (label.group(1) if label else '') != alt or f'width="{w}" height="{h}"' not in root:
        pic_problems.append(f'{n}: alt is empty or not the aria-label of the SVG, or its size differs')
    if sha256(f) != digest:
        pic_problems.append(f'{n}: not the file as supplied (sha256 {sha256(f)[:12]})')
    colours = {c.upper() for c in re.findall(r'#[0-9A-Fa-f]{6}\b', svg_text)}
    if not colours <= PICTURE_COLOURS or '#FF3D00' not in colours or re.search(
            r'<script|<image|<foreignObject|href="(?!#)|url\((?!#)|@import|on\w+=|<animate|<set\b', svg_text, re.I):
        pic_problems.append(f'{n}: colours {sorted(colours - PICTURE_COLOURS)}, or a script, link or motion inside')
check('the pictures: the files as supplied (sha256), served as img with width and height, decoding async, lazy below '
      "the fold (all but the hero picture); alt text is each SVG's aria-label; the set's five colours with its one "
      'vermilion; nothing inside that loads, links, runs or moves', not pic_problems, '\n     '.join(pic_problems))
# No frame, shadow, filter, rounding, recolouring, motion or hover on a picture (Round 8): the rules that style them.
pic_rules = re.findall(r'([^{}]*(?:\.hero-pic|\.pc img|\.step-pic)[^{}]*)\{([^{}]*)\}', css)
pic_bad = [s.strip() + '{' + d + '}' for s, d in pic_rules
           if ':hover' in s or re.search(r'radius|shadow|filter|opacity|transform|transition|blend|clip-path|mask|'
                                         r'border|outline|background|animation|object-fit', d)]
check('the pictures are shown whole and as they are: no frame, rounding, shadow, filter, cropping, recolouring, hover or motion',
      len(pic_rules) >= 6 and not pic_bad and not re.search(r'img:hover|:hover\s*img', css), f'{pic_bad}')
check('the retired pictures and the parts that left the page are kept in _archive/ (Round 8; Rounds 9 and 10: '
      '_archive/round-10-2026-11-11/)',
      all((ROOT / f).is_file() for f in ARCHIVED) and not (DOCS / 'assets/scenes').exists()
      and not (DOCS / 'assets/social-preview.jpg').exists(), f'{[f for f in ARCHIVED if not (ROOT / f).is_file()]}')
probs_src = between(home_src, '<!-- PROBLEMS -->', '<!-- HOW IT WORKS -->')
check('the problems (Rounds 9 and 10): one section, each problem once: six cards, each with its picture, its question as '
      'the title and its answer; "Often first" on the cash card only; then "AI does the work. Your people make the calls." '
      'as a heading; one across on phones, two from 768 px, three from 1100 px, so no picture is under 260 px wide',
      re.findall(r'<li class="card pc"><img src="/assets/pictures/([\w-]+)\.svg"[^>]*><h3 class="ld">([^<]+)</h3>'
                 r'<p class="bd">([^<]+)</p>(?:<span class="tag">Often first</span>)?</li>', probs_src) == CARDS
      and f'<h2 class="hd" id="h-probs">{SCENES_HEADING}</h2>\n  <p class="bd">{WHY_AI}</p>' in probs_src
      and f'<h3 class="hd after">{AI_LINE}</h3>' in probs_src and '<svg' not in probs_src
      and '@media(min-width:768px){.probs{grid-template-columns:repeat(2,minmax(0,1fr))}}' in css
      and '@media(min-width:1100px){.probs{grid-template-columns:repeat(3,minmax(0,1fr))}}' in css)
how_src = between(home_src, '<!-- HOW IT WORKS -->', '<!-- EXAMPLE -->')
check('How it works (Round 10): three cards, each its label, its picture, its name and its words; the Map card with a 2 px '
      'ultramarine edge; then the four weeks and the staff-time line',
      re.findall(r'<li class="card step[^"]*"><p class="label">([^<]+)</p><img class="step-pic" src="/assets/pictures/'
                 r'(offer-\w+)\.svg"[^>]*><h3 class="ld">(\w+)</h3><p class="bd">([^<]+)</p></li>', how_src) == STEPS
      and how_src.count('<img') == 3 and '<svg' not in how_src and how_src.count('step--first') == 1
      and '.step--first{border:2px solid var(--klein)!important}' in css
      and how_src.index('</ol>') < how_src.index('<ol class="wk">') < how_src.index('class="bd wk-note"'))
ex_src = between(home_src, '<!-- EXAMPLE -->', '<!-- SUNDEEP -->')
ex_hexes = {h.upper() for h in re.findall(r'#[0-9A-Fa-f]{6}\b', ex_src)}
check('the example (Rounds 9 and 10): four drawn steps, two by two on phones with each drawing the full width of its '
      'card, four across from 1000 px; the drawings in ink, rule and ultramarine only, 1.5 px strokes, no yellow',
      ex_src.count('<span class="ex-art"><svg viewBox="0 0 240 140" aria-hidden="true">') == 4 == ex_src.count('<svg')
      and ex_hexes <= DRAWING_COLOURS and 'stroke-width="0"' not in ex_src
      and '.ex-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}' in css
      and '.ex-art svg *{vector-effect:non-scaling-stroke;stroke-width:1.5px}' in css
      and '@media(min-width:1000px){.ex-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}' in css, f'{ex_hexes}')
rules_src = between(home_src, '<!-- RULES -->', '<!-- FAQ -->')
check('Our rules (Rounds 9 and 10): four cards, each led by its number, large, in ultramarine; no drawings',
      re.findall(r'<li class="card rule[^"]*"><span class="hd num">(\d\d)</span><h3 class="ld">([^<]+)</h3>'
                 r'<p class="bd">([^<]+)</p></li>', rules_src) == RULES_LIST
      and '<svg' not in rules_src and '<img' not in rules_src and '.num{color:var(--klein);line-height:1}' in css)
person_src = between(home_src, '<!-- SUNDEEP -->', '<!-- RULES -->')
check('the founder (Round 10): the portrait (alt text, width and height, lazy, corners 0; columns 1 to 4 from 1000 px, '
      'the full container on phones), the heading, the lead, three facts with their figures at Heading size, the quote '
      'and the LinkedIn link',
      re.search(rf'<img src="/assets/imagery/sundeep-portrait-2026_720\.jpg"[^>]+width="720" height="720" '
                rf'alt="{PORTRAIT_ALT}" loading="lazy"', person_src) is not None
      and '<h2 class="hd" id="h-sk">Sundeep Kumar, Founder &amp; CEO</h2>' in person_src
      and re.findall(r'<li><b class="hd">([^<]+)</b><span class="bd">([^<]+)</span></li>', person_src)
      == list(zip(FACTS[0::2], FACTS[1::2]))
      and person_src.index('id="h-sk"') < person_src.index('<ul class="facts">') < person_src.index('class="ld q"')
      < person_src.index(LINKEDIN_TEXT)
      and '.person>img{width:100%;aspect-ratio:1;object-fit:cover}' in css and '.person>img{grid-column:1/5}' in css)
close_src = between(home_src, '<!-- CLOSE -->', '</main>')
check('the close (Rounds 9 and 10): the question in the Statement face, the two buttons, and the white ll mark '
      '(decorative), shown from 760 px on the right, never under the words',
      f'<h2 class="st" id="h-close">{QUESTION}</h2>' in close_src and close_src.count('<a class="btn') == 2
      and '<svg class="ll" viewBox="92 -1319 1133 1319" fill="#fff" aria-hidden="true">' in close_src
      and '.ll{display:none}' in css and '@media(min-width:760px){.plate .st,.plate .cta{max-width:64%}' in css)
published_files = [f for f in DOCS.rglob('*') if f.is_file()]
retired_hits = sorted({w for f in published_files for w in RETIRED
                       if w in f.name or (f.suffix in ('.html', '.css', '.js', '.txt', '.xml')
                                          and w in f.read_text(errors='ignore'))})
check('the scene bands, the plant loop, the leaks diagram, the painted scenes, the old social preview, the heat map, the '
      'chips, the yellow and the wide hero picture stay retired (in _archive/ or the history): nothing published refers to them',
      not retired_hits, f'{retired_hits}')
check('the decorative drawings (aria-hidden) carry only their few words: the example steps and their coin; no labelled drawing',
      set(home.decor) <= DECOR_WORDS and len(home.drawings) == 0, f'{set(home.decor) - DECOR_WORDS}')
check('no figure beside the rupee sign: it marks a coin in the drawings, never a price',
      all(w == '₹' for w in home.decor if '₹' in w))

html_and_css = [(f, (DOCS / f).read_text()) for f in html_files] + [('assets/site.css', css)]
keyframes = [(f, k) for f, t in html_and_css for k in re.findall(r'@keyframes\s+([\w-]+)', t)]
animations = [f for f, t in html_and_css if re.search(r'animation(?:-name|-delay)?\s*:', t)]
check('motion: no decorative motion; no animation anywhere on the site (Round 5)', not keyframes and not animations,
      f'{keyframes} {animations}')
check("no video and no other motion: the only transition is the phone bar's slide (off for reduced motion), no GIFs, no script-driven motion",
      not any('<video' in (DOCS / f).read_text() for f in html_files)
      and re.findall(r'transition:[^;}]+', css) == ['transition:transform .2s ease', 'transition:none']
      and not any(p.suffix in ('.gif', '.mp4', '.webm') for p in DOCS.rglob('*'))
      and not re.search(r'\.animate\(|requestAnimationFrame|setInterval|video', js_text))

# ---------------------------------------------------------------------------------------------
# 5. Words: banned, retired, descriptor, dashes, emoji, italics.
# ---------------------------------------------------------------------------------------------
surfaces = {}
for f in html_files:
    pg = read(DOCS / f)
    texts = pg.blocks + [norm(pg.title)] + [v for k, v in pg.meta.items() if k in (
        'description', 'og:title', 'og:description', 'og:image:alt', 'twitter:title', 'twitter:description',
        'twitter:image:alt')]
    for ld in pg.ld:
        texts += ld_values(json.loads(ld))
    texts += [norm(a.get('aria-label', '')) for _, a in pg.tags if a.get('aria-label')]
    texts += [w for _, ws in pg.drawings for w in ws] + pg.decor
    surfaces['docs/' + f] = '\n'.join(texts)
surfaces['docs/llms.txt'] = (DOCS / 'llms.txt').read_text()
# The pictures' own labels and titles are published too, inside the files (Round 8): the same words apply to them.
surfaces['docs/assets/pictures (their labels)'] = '\n'.join(
    norm(t) for f in sorted((DOCS / 'assets/pictures').glob('*.svg'))
    for t in re.findall(r'aria-label="([^"]*)"|<title>([^<]*)</title>|<desc>([^<]*)</desc>', f.read_text()) for t in t if t)
for group, words in BANNED.items():
    hits = {f: words_found(t, words) for f, t in surfaces.items()}
    hits = {f: h for f, h in hits.items() if h}
    check(f'no {group}', not hits, f'{hits}')

analytics_words = {f: re.findall(r'(?:\w+ ){0,2}analytics', t, re.I) for f, t in surfaces.items()}
check('analytics: named only on Privacy, as "Cloudflare Web Analytics" (Round 7)',
      all(not w for f, w in analytics_words.items() if f != 'docs/privacy/index.html')
      and analytics_words.get('docs/privacy/index.html') == ['Cloudflare Web Analytics'], f'{analytics_words}')
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
check('no market statistics (no per cent signs)', not re.search(r'%|per ?cent', all_text.replace(WA_LINK, ''), re.I))
check('no price figures: no currency sign beside a figure, except the one fact about Sundeep\'s career in the founder '
      'section ("one to $72 million in 24 months", Round 10, D2), which is not a price',
      not re.search(r'[₹$€£]\s*\d|\d\s*[₹$€£]|S\$|\b\d[\d,.]*\s*(?:lakh|crore|k)\b',
                    all_text.replace(BUILT_LINE, '').replace(BUILT_LINE[0].lower() + BUILT_LINE[1:], ''), re.I)
      and home_src.count('$') == 1)
lower_name = [f for f, t in surfaces.items() if re.search(r'(?<![\w@./-])intellumia(?![\w.@/-])', t)]
check('"Intellumia" is capitalised in text', not lower_name, f'{lower_name}')
check('"owner-run", never "owner-led"', 'owner-led' not in all_text.lower())
italic = [f for f in html_files if re.search(r'<(em|i|cite)[\s>]', (DOCS / f).read_text())]
check('no italics', 'italic' not in css.lower() and not italic, f'italic markup in {italic}')
straight = {}
for f in ('index.html', 'privacy/index.html', '404.html'):
    words = re.sub(r'<(script|style)\b.*?</\1>', '', (DOCS / f).read_text(), flags=re.S)
    hits = [t.strip()[:60] for t in re.findall(r'>([^<]*)<', words) if "'" in t]
    if hits:
        straight[f] = hits
check("apostrophes on the pages are curly (owner’s, India’s, staff’s), never straight", not straight, f'{straight}')
llms = norm((DOCS / 'llms.txt').read_text())
llms_want = (HERO, HERO_LINE, DESCRIPTION, f'[{WHATSAPP}]({WA_LINK})', f'[{BOOK}]({BOOKING})', PHONE_LINE, NOTE,
             'How it works', 'Our rules', 'Questions owners ask', NAME, QUOTE.strip('“”'), FOUNDER, LINKEDIN, QUESTION,
             SCENES_HEADING, WHY_AI, AI_LINE, STAFF_TIME, *[q for _, q, _ in CARDS], *[d for *_, d in STEPS],
             *[t for _, t, _ in RULES_LIST], *[q for q, _ in FAQS], *[a for _, a in FAQS])
check('llms.txt repeats the page: the headline, the 25 words, the sections, the FAQ, the WhatsApp contact line and the booking link',
      all(s in llms for s in llms_want), f'{[s for s in llms_want if s not in llms]}')

# ---------------------------------------------------------------------------------------------
# 6. Colour, type and shape.
# ---------------------------------------------------------------------------------------------
hexes = {h.upper() for h in re.findall(r'#[0-9A-Fa-f]{6}\b', css)}
check('stylesheet colours: the seven brand tokens only (Round 9: no tints, no yellow, no cyan)', hexes <= TOKENS,
      f'other colours: {hexes - TOKENS}')
page_src = re.sub(r'<script.*?</script>', '', home_src, flags=re.S)
drawing = {h.upper() for h in re.findall(r'#[0-9A-Fa-f]{6}\b', page_src)}
check('page colours outside the pictures: ink, rule and ultramarine in the example drawings; no red, yellow or cyan',
      drawing <= DRAWING_COLOURS, f'other colours: {drawing - DRAWING_COLOURS}')
check('no gradients, shadows or dark mode', not re.search(r'gradient|shadow|prefers-color-scheme', css, re.I))
fire_rules = re.findall(r'[^{}]+\{[^{}]*var\(--fire\)[^{}]*\}', css)
check('vermilion in the stylesheet: the token once, used by the hero word, the "Often first" tag and the number of rule 02 only',
      css.count('#FF3D00') == 1 and [r.strip().split('{')[0] for r in fire_rules] == ['.fire', '.tag', '.rule--key .num'],
      f'{fire_rules}')
cash_card = re.findall(r'<li class="card pc">.*?</li>', probs_src, re.S)
check('three red things on the page outside the pictures, no more (Round 10): "money" in the hero, the "Often first" tag on '
      'the cash card and the number of rule 02, "No vendor fees" (vermilion at Heading size passes WCAG AA as large text; the '
      'title at Lead size would be 3.5:1 and fail, so no title is vermilion)',
      len(home.fire) == 1 and 'h1' in home.fire[0] and home_src.count('class="fire"') == 1
      and home_src.count('class="tag"') == 1 and len(cash_card) == 6 and OFTEN_FIRST in cash_card[1]
      and home_src.count('rule--key') == 1
      and f'<li class="card rule rule--key"><span class="hd num">02</span><h3 class="ld">{RULE_KEY}</h3>' in rules_src
      and '#FF3D00' not in home_src, f'{home.fire}')
check('the "Often first" tag: ink words on vermilion (5.4:1, WCAG AA), never white (3.5:1)',
      re.search(r'\.tag\{[^}]*background:var\(--fire\);color:var\(--ink\)', css) is not None)
check('no red on Privacy or the 404 page', all('fire' not in (DOCS / f).read_text() and '#FF3D00' not in (DOCS / f).read_text()
                                              for f in ('privacy/index.html', '404.html')))
check('the hero is set in the Statement style', '<h1 class="st">' in home_src)
families = set(re.findall(r'font-family:([^;}]+)', css))
svg_families = set(re.findall(r'font-family="([^"]+)"', home_src)) | set(re.findall(r"font:\s*\d+ [\d.]+px '([^']+)'", home_src))
STACK = "'Anek Latin','Anek Fallback','Anek Fallback Roboto',system-ui,sans-serif"
check('Anek Latin is the only typeface (the two fallback faces stand in only until it loads)',
      families <= {"'Anek Latin'", "'Anek Fallback'", "'Anek Fallback Roboto'", STACK}
      and f'body{{margin:0;background:var(--ground);color:var(--ink);font-family:{STACK};' in css
      and svg_families <= {'Anek Latin,sans-serif', 'Anek Latin'}, f'{families} {svg_families}')
# The fallback faces (Round 7b): fonts already on the device, never a download, sized to Anek's widths so the swap
# does not move the page. Each has a size-adjust and the matching overrides (Anek's ascent 0.9 and descent 0.2).
fallback_faces = re.findall(r"@font-face\{font-family:'(Anek Fallback(?: Roboto)?)';src:([^;]+);font-weight:([\d ]+);"
                            r"font-stretch:([\d% ]+);size-adjust:([\d.]+)%;ascent-override:([\d.]+)%;"
                            r"descent-override:([\d.]+)%;line-gap-override:0%\}", css)
check('the fallback faces: local fonts only (Arial or its metric twins, Roboto), six weight bands each, sized to Anek, '
      'baselines matched', len(fallback_faces) == 12 == css.count("font-family:'Anek Fallback")
      and sorted({f for f, *_ in fallback_faces}) == ['Anek Fallback', 'Anek Fallback Roboto']
      and all(re.fullmatch(r"local\('[A-Za-z -]+'\)(,local\('[A-Za-z -]+'\))*", src) for _, src, *_ in fallback_faces)
      and all(abs(float(a) * float(sa) / 100 - 90) < 0.1 and abs(float(d) * float(sa) / 100 - 20) < 0.1
              for *_, sa, a, d in fallback_faces), f'{fallback_faces}')
fonts = sorted(p.name for p in DOCS.rglob('*') if p.suffix in ('.woff', '.woff2', '.ttf', '.otf'))
check('only Anek font files are published (latin, latin extended, and the rupee sign alone), with the licence beside them',
      fonts == ['AnekLatin-latin.woff2', 'AnekLatin-latinext.woff2', 'AnekLatin-rupee.woff2']
      and (DOCS / 'assets/fonts/OFL-Anek.txt').exists() and 'unicode-range:U+20B9}' in css,
      f'{fonts}')
check('corners: 6 for buttons and the tag, 12 for cards (Round 9), round for the small portrait and the FAQ marks, '
      '0 for the portrait and the pictures', set(re.findall(r'border-radius:([\d.]+(?:px|%))', css)) == {'6px', '12px', '50%'})
check('layout (Round 9): container 1200 px, gutters 24 / 40 / 64 px, sections 64 / 88 / 120 px apart, a 24 px gap',
      '--gut:24px;--max:1200px;--gap:24px;--sec:64px' in css and '@media(min-width:600px){:root{--gut:40px;--sec:88px}}' in css
      and '@media(min-width:1000px){:root{--gut:64px;--sec:120px}}' in css
      and '.sec{padding-top:var(--sec);padding-bottom:var(--sec)}' in css)
check('no sticky section heads (Round 5)', 'sticky' not in css)
check('the bottom bar: phones only, and no slide for reduced motion',
      '@media(min-width:900px){.bar{display:none}}' in css
      and '@media(prefers-reduced-motion:reduce){.bar{transition:none}' in css)

# ---------------------------------------------------------------------------------------------
# 7. Scripts: /assets/site.js on Home, and the one third-party script, Cloudflare Web Analytics (cookie-free;
#    Round 7, Sundeep, 4 Nov 2026), on Home, Privacy and the 404 page. No forms, no other trackers or scripts.
#    Structured data without offers or prices.
# ---------------------------------------------------------------------------------------------
# The beacon is Cloudflare's own snippet (its address and token), added by a small inline script once the page has
# loaded and the browser has reported its first contentful paint (at once where paint timing is not supported),
# so it never competes with the page's first paint (Round 7b). The security policy allows that one
# inline script by its hash, and nothing else inline.
BEACON_SRC = 'https://static.cloudflareinsights.com/beacon.min.js'
BEACON_TOKEN = '{"token": "347f1c5c75ff411ead3e9a43282df8cf"}'
BEACON_JS = ("addEventListener('load',function(){function a(){var s=document.createElement('script');"
             f"s.src='{BEACON_SRC}';s.setAttribute('data-cf-beacon','{BEACON_TOKEN}');document.body.appendChild(s)}}"
             "var P=window.PerformanceObserver;if(!P||!P.supportedEntryTypes||P.supportedEntryTypes.indexOf('paint')<0)return a();"
             "new P(function(l,o){if(l.getEntriesByName('first-contentful-paint').length){o.disconnect();a()}})"
             ".observe({type:'paint',buffered:true})})")
BEACON = '<script>' + BEACON_JS + '</script>'
BEACON_HASH = "'sha256-" + base64.b64encode(hashlib.sha256(BEACON_JS.encode()).digest()).decode() + "'"
blocked = {}
for f in html_files:
    pg = read(DOCS / f)
    bad = [t for t, _ in pg.tags if t in ('form', 'input', 'iframe', 'textarea', 'select', 'audio')]
    own = [s.get('src', 'inline script') for s in pg.scripts if s.get('type') != 'application/ld+json']
    allowed = (['inline script', '/assets/site.js'] if f == 'index.html' else ['inline script'] if f in pages else [])
    if own != allowed:
        bad += own
    if bad:
        blocked[f] = bad
check('no forms, frames or chat widgets; scripts: /assets/site.js on Home, the Cloudflare Web Analytics beacon on '
      'Home, Privacy and 404, nothing on the redirects', not blocked, f'{blocked}')
def loader_in_head(t):
    """Once, in the head: after the security policy (so the policy governs it) and just before the stylesheet (so it
    never waits for it and never holds up parsing: at the end of the body it cost about 40 ms of LCP on a throttled
    phone, Round 7b)."""
    return (t.count(BEACON) == 1 and t.count('<script>') == 1 and t.index('http-equiv="Content-Security-Policy"')
            < t.index(BEACON) < t.index('</head>') and BEACON + '\n<link rel="stylesheet" href="/assets/site.css">' in t)


check('the Cloudflare Web Analytics beacon: its address and token, added after the page has loaded and painted by one '
      'inline script in the head, after the security policy and before the stylesheet, on Home, Privacy and 404',
      all(loader_in_head(plain((DOCS / f).read_text())) for f in pages)
      and all('cloudflareinsights' not in (DOCS / f).read_text() for f in html_files if f not in pages))
check('site.js calls nothing outside the page (no addresses, no storage, no tracking)',
      not re.search(r'https?:|fetch\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|cookie|import\(', js_text))
csp = {label: pg.meta.get('Content-Security-Policy', '') for label, pg in (('Home', home), ('Privacy', privacy), ('404', nf))}
check("Home: security policy allows the site's own script, the Cloudflare beacon and the loader by its hash, and the "
      "beacon's report address only", f"script-src 'self' https://static.cloudflareinsights.com {BEACON_HASH}; "
      "connect-src 'self' https://cloudflareinsights.com;" in csp['Home'] and 'unsafe-inline' not in csp['Home'].split('script-src')[1])
check("Privacy and 404: security policy allows the Cloudflare beacon and the loader by its hash only, and its report address",
      all(f"script-src https://static.cloudflareinsights.com {BEACON_HASH}; connect-src 'self' https://cloudflareinsights.com;"
          in csp[k] and 'unsafe-inline' not in csp[k].split('script-src')[1] for k in ('Privacy', '404')))
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


# ---------------------------------------------------------------------------------------------
# 7b. Search and answer engines (Round 7, Sundeep, 4 Nov 2026): the verification tag, the social tags, the
#     structured data generated from the page, the sitemap dates and security.txt.
# ---------------------------------------------------------------------------------------------
VERIFICATION = '<meta name="google-site-verification" content="JVD48nYlvicZNZ-kgTofBwZAX-47k2G1xlk4nWepCzQ">'
check('Home: the Google Search Console verification tag, exactly as issued, in the head (keep it permanently)',
      home_src.count(VERIFICATION) == 1 and home_src.index(VERIFICATION) < home_src.index('</head>')
      and home.meta.get('google-site-verification') == 'JVD48nYlvicZNZ-kgTofBwZAX-47k2G1xlk4nWepCzQ')
PRIVACY_DESC = ('How Intellumia handles personal data: this website sets no cookies and counts visits only in total; what you '
                'send us is used only to reply.')
for label, pg, title, desc in (('Home', home, TITLE, DESCRIPTION), ('Privacy', privacy, 'Privacy notice | Intellumia', PRIVACY_DESC)):
    check(f'{label}: og:locale en_GB, and the Twitter title, description, image and its alt text set explicitly',
          pg.meta.get('og:locale') == 'en_GB' and pg.meta.get('twitter:card') == 'summary_large_image'
          and pg.meta.get('twitter:title') == title == pg.meta.get('og:title')
          and pg.meta.get('twitter:description') == desc == pg.meta.get('og:description')
          and pg.meta.get('twitter:image') == SITE + SHARE[0] == pg.meta.get('og:image')
          and pg.meta.get('twitter:image:alt') == SHARE_ALT, f"{[pg.meta.get(k) for k in ('og:locale', 'twitter:title')]}")
home_ld = json.loads(home.ld[0]) if home.ld else {}
privacy_ld = json.loads(privacy.ld[0]) if privacy.ld else {}
nodes = {n.get('@type'): n for n in home_ld.get('@graph', [])}
webpage = nodes.get('WebPage', {})
check('Home structured data: Organization, Person, WebSite, WebPage, FAQPage and Service, nothing else',
      sorted(nodes) == ['FAQPage', 'Organization', 'Person', 'Service', 'WebPage', 'WebSite']
      and len(home_ld.get('@graph', [])) == 6 and home_ld.get('@context') == 'https://schema.org', f'{sorted(nodes)}')
check('Home structured data is exactly what scripts/make_structured_data.py makes from the page (run it if not)',
      home_ld == msd.home_graph(home_src, webpage.get('dateModified', '')))
faq_ld = [(q['name'], q['acceptedAnswer']['text']) for q in nodes.get('FAQPage', {}).get('mainEntity', [])
          if q.get('@type') == 'Question' and q.get('acceptedAnswer', {}).get('@type') == 'Answer']
check('FAQPage: the four questions and answers word for word as the page shows them, in order',
      faq_ld == FAQS == [(norm(q), norm(a)) for _, q, a in details] == [(norm(q), norm(a)) for q, a in msd.faq_from_page(home_src)],
      f'{len(faq_ld)} questions in the structured data')
steps_ld = [(x['name'], x['description']) for x in nodes.get('Service', {}).get('hasOfferCatalog', {}).get('itemListElement', [])]
check('Service: AI advisory and delivery for owner-run businesses, area served India, and a catalogue of Map, Run and Guide '
      "with the page's one-line descriptions",
      nodes.get('Service', {}).get('serviceType') == 'AI advisory and delivery for owner-run businesses'
      and nodes.get('Service', {}).get('areaServed') == {'@type': 'Country', 'name': 'India'}
      and steps_ld == [(n, d) for _, _, n, d in STEPS], f'{steps_ld}')
check('Organization: ProfessionalService, area served India, what it knows about; one sales contact with the WhatsApp '
      'number, the site\'s email and the booking link, in English and Hindi (Round 10); sameAs the company LinkedIn page; '
      'the Person carries the same number',
      org.get('additionalType') == 'https://schema.org/ProfessionalService'
      and org.get('areaServed') == {'@type': 'Country', 'name': 'India'} and len(org.get('knowsAbout', [])) == 5
      and org.get('contactPoint') == {'@type': 'ContactPoint', 'contactType': 'sales', 'telephone': TELEPHONE,
                                      'email': EMAIL, 'url': BOOKING, 'availableLanguage': ['en', 'hi'],
                                      'areaServed': {'@type': 'Country', 'name': 'India'}}
      and person.get('telephone') == TELEPHONE
      and org.get('sameAs') == [COMPANY_LINKEDIN], f'{org.get("contactPoint")} {org.get("sameAs")}')
check('WebSite and WebPage: name, address, language en-GB; the page is part of the site and about the Organization',
      nodes.get('WebSite', {}).get('url') == SITE and nodes.get('WebSite', {}).get('inLanguage') == 'en-GB'
      and webpage.get('url') == SITE and webpage.get('name') == TITLE and webpage.get('description') == DESCRIPTION
      and webpage.get('inLanguage') == 'en-GB' and webpage.get('isPartOf') == {'@id': SITE + '#website'}
      and webpage.get('about') == {'@id': SITE + '#organization'})


def ids_and_refs(node, ids, refs):
    if isinstance(node, dict):
        if '@id' in node:
            (ids if len(node) > 1 else refs).add(node['@id'])
        for v in node.values():
            ids_and_refs(v, ids, refs)
    elif isinstance(node, list):
        for v in node:
            ids_and_refs(v, ids, refs)


ids, refs = set(), set()
ids_and_refs(home_ld, ids, refs)
check('every reference in the structured data points at a node on the page', refs and refs <= ids, f'{refs - ids}')
check('Privacy structured data: the same Organization (without the founder link), with the descriptor',
      privacy_ld == msd.privacy_graph())


def price_keys(node):
    if isinstance(node, dict):
        return [k for k in node if 'price' in k.lower()] + [str(node.get('@type'))] * (
            node.get('@type') in ('Offer', 'AggregateOffer', 'PriceSpecification', 'UnitPriceSpecification')) + [
            x for v in node.values() for x in price_keys(v)]
    if isinstance(node, list):
        return [x for v in node for x in price_keys(v)]
    return []


check('structured data has no offers and no prices (no Offer, no price property, no figure with a currency)',
      not price_keys(home_ld) and not price_keys(privacy_ld)
      and not re.search(r'[₹$€£]|\b(?:INR|SGD|USD)\b', ' '.join(home.ld + privacy.ld + nf.ld)), f'{price_keys(home_ld)}')
lastmods = dict(re.findall(r'<loc>([^<]+)</loc><lastmod>([^<]+)</lastmod>', (DOCS / 'sitemap.xml').read_text()))
today = dt.datetime.now(dt.timezone.utc).date()
try:
    home_mod, privacy_mod = dt.date.fromisoformat(lastmods[SITE]), dt.date.fromisoformat(lastmods[SITE + 'privacy/'])
    dates_ok = (webpage.get('dateModified') == lastmods[SITE] and privacy_mod <= home_mod <= today + dt.timedelta(days=1))
except (KeyError, ValueError):
    dates_ok = False
check("sitemap lastmod: Home's is the release date, the same as the page's dateModified; Privacy's is when it last "
      'changed', dates_ok, f'{lastmods} {webpage.get("dateModified")}')
sec_path = DOCS / '.well-known/security.txt'
sec = dict(re.findall(r'^([A-Za-z-]+): (.+)$', sec_path.read_text(), re.M)) if sec_path.exists() else {}
try:
    expires = dt.datetime.fromisoformat(sec.get('Expires', '').replace('Z', '+00:00'))
    sec_ok = (dt.timedelta(days=30) < expires - dt.datetime.now(dt.timezone.utc) <= dt.timedelta(days=366))
except ValueError:
    sec_ok = False
check('/.well-known/security.txt: contact, Expires within a year (renew it at least a month before), language, canonical; '
      'published (docs/.nojekyll)',
      sec_ok and sec.get('Contact') == 'mailto:' + EMAIL and sec.get('Preferred-Languages') == 'en'
      and sec.get('Canonical') == SITE + '.well-known/security.txt' and (DOCS / '.nojekyll').exists(), f'{sec}')

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
