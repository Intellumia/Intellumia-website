#!/usr/bin/env python3
"""Write the structured data (JSON-LD) of Home and Privacy, and the sitemap dates, from the pages themselves.

Run at every release, before scripts/make_fallback.py and scripts/check_copy.py:

    python3 scripts/make_structured_data.py               # release date: today (UTC)
    python3 scripts/make_structured_data.py --date 2026-11-04

Standard library only. The FAQPage carries the eight questions and answers word for word from the page's
FAQ, and the service catalogue carries the one-line descriptions of Map, Run and Guide from "How it works",
so the structured data can never drift from what a reader sees (Round 7, Sundeep, 4 Nov 2026). The home
page's dateModified and its sitemap lastmod are the release date; Privacy's lastmod is the date its file
last changed. No offers and no prices, anywhere.
"""
import argparse
import datetime as dt
import html
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / 'docs'
SITE = 'https://intellumia.com/'
ORG_ID, PERSON_ID, WEBSITE_ID, WEBPAGE_ID, FAQ_ID, SERVICE_ID = (
    SITE + '#organization', SITE + '#sundeep-kumar', SITE + '#website', SITE + '#webpage', SITE + '#faq',
    SITE + '#service')
TITLE = 'Intellumia, the AI partner for owner-run businesses'
DESCRIPTION = ('Intellumia shows owner-run businesses where AI makes them money, runs the parts that do with named '
               'professionals signing off, and takes no vendor fees.')
EMAIL = 'sundeep@intellumia.com'
INDIA = {'@type': 'Country', 'name': 'India'}
SERVICE_TYPE = 'AI advisory and delivery for owner-run businesses'
KNOWS_ABOUT = ['Artificial intelligence', 'Business process automation', 'Accounts receivable', 'Cost and margin',
               'Operations']
LANGUAGES = ['English']  # Hindi only once Sundeep confirms it
LD_RE = re.compile(r'<script type="application/ld\+json">.*?</script>', re.S)


def text(s):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s))).strip()


def faq_from_page(page):
    """The FAQ exactly as the page shows it: (question, answer) pairs, in order."""
    faq = page[page.index('<!-- FAQ -->'):page.index('<!-- CLOSE -->')]
    pairs = re.findall(r'<details class="fq"(?: open)?><summary><span>(.*?)</span>.*?</summary><p>(.*?)</p></details>',
                       faq, re.S)
    return [(text(q), text(a)) for q, a in pairs]


def steps_from_page(page):
    """Map, Run and Guide with their one-line descriptions from "How it works"."""
    how = page[page.index('<!-- HOW IT WORKS -->'):page.index('<div class="ex">')]
    return [(text(n), text(d)) for n, d in
            re.findall(r'<h3 class="h3">(.*?)</h3><p class="bd">(.*?)</p>', how, re.S)]


def organization(with_founder=True):
    org = {
        '@type': 'Organization', '@id': ORG_ID,
        'additionalType': 'https://schema.org/ProfessionalService',
        'name': 'Intellumia', 'legalName': 'Intellumia Pte. Ltd.', 'url': SITE,
        'logo': SITE + 'assets/intellumia-wordmark-ultramarine.svg',
        'description': DESCRIPTION, 'email': EMAIL,
        'address': {'@type': 'PostalAddress', 'streetAddress': '60 Paya Lebar Road, #06-28, Paya Lebar Square',
                    'addressLocality': 'Singapore', 'postalCode': '409051', 'addressCountry': 'SG'},
        'areaServed': INDIA,
        'knowsAbout': KNOWS_ABOUT,
        'contactPoint': {'@type': 'ContactPoint', 'contactType': 'sales', 'email': EMAIL,
                         'availableLanguage': LANGUAGES, 'areaServed': INDIA},
    }
    if with_founder:
        org['founder'] = {'@id': PERSON_ID}
    return org


def home_graph(page, date):
    faq = faq_from_page(page)
    steps = steps_from_page(page)
    assert len(faq) == 8 and [n for n, _ in steps] == ['Map', 'Run', 'Guide'], (len(faq), steps)
    return {'@context': 'https://schema.org', '@graph': [
        organization(),
        {'@type': 'Person', '@id': PERSON_ID, 'name': 'Sundeep Kumar', 'jobTitle': 'Founder & CEO',
         'worksFor': {'@id': ORG_ID}, 'image': SITE + 'assets/imagery/sundeep-portrait-2026_720.jpg',
         'sameAs': ['https://www.linkedin.com/in/kumarsundeep']},
        {'@type': 'WebSite', '@id': WEBSITE_ID, 'name': 'Intellumia', 'url': SITE, 'publisher': {'@id': ORG_ID},
         'inLanguage': 'en-GB'},
        {'@type': 'WebPage', '@id': WEBPAGE_ID, 'url': SITE, 'name': TITLE, 'description': DESCRIPTION,
         'inLanguage': 'en-GB', 'isPartOf': {'@id': WEBSITE_ID}, 'about': {'@id': ORG_ID}, 'dateModified': date},
        {'@type': 'FAQPage', '@id': FAQ_ID, 'url': SITE + '#h-faq', 'name': 'Questions owners ask',
         'inLanguage': 'en-GB', 'isPartOf': {'@id': WEBPAGE_ID},
         'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}}
                        for q, a in faq]},
        {'@type': 'Service', '@id': SERVICE_ID, 'name': SERVICE_TYPE, 'serviceType': SERVICE_TYPE,
         'provider': {'@id': ORG_ID}, 'areaServed': INDIA, 'url': SITE + '#h-how',
         'hasOfferCatalog': {'@type': 'OfferCatalog', 'name': 'Map, Run and Guide',
                             'itemListElement': [{'@type': 'Service', 'name': n, 'description': d} for n, d in steps]}},
    ]}


def privacy_graph():
    org = organization(with_founder=False)
    org['disambiguatingDescription'] = 'An AI-native product company, starting with service.'  # Privacy only
    return {'@context': 'https://schema.org', '@graph': [org]}


def as_script(graph):
    body = json.dumps(graph, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
    return '<script type="application/ld+json">' + body + '</script>'


def last_changed(path, release):
    """The date a file last changed: the release date if it has uncommitted changes, else its last commit's date."""
    rel = path.relative_to(ROOT).as_posix()
    dirty = subprocess.run(['git', 'status', '--porcelain', '--', rel], cwd=ROOT, capture_output=True, text=True).stdout
    if dirty.strip():
        return release
    out = subprocess.run(['git', 'log', '-1', '--format=%cs', '--', rel], cwd=ROOT, capture_output=True, text=True)
    return out.stdout.strip() or release


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--date', default=dt.datetime.now(dt.timezone.utc).date().isoformat(),
                    help='release date, YYYY-MM-DD (default: today, UTC)')
    date = dt.date.fromisoformat(ap.parse_args().date).isoformat()

    home_path, privacy_path = DOCS / 'index.html', DOCS / 'privacy/index.html'
    home = home_path.read_text()
    new_home = LD_RE.sub(lambda m: as_script(home_graph(home, date)), home, count=1)
    home_path.write_text(new_home)
    privacy = privacy_path.read_text()
    privacy_path.write_text(LD_RE.sub(lambda m: as_script(privacy_graph()), privacy, count=1))

    sitemap = DOCS / 'sitemap.xml'
    sm = sitemap.read_text()
    sm = re.sub(r'(<loc>https://intellumia\.com/</loc><lastmod>)[^<]*', r'\g<1>' + date, sm)
    sm = re.sub(r'(<loc>https://intellumia\.com/privacy/</loc><lastmod>)[^<]*',
                r'\g<1>' + last_changed(privacy_path, date), sm)
    sitemap.write_text(sm)
    print(f'structured data and sitemap written (release date {date})')


if __name__ == '__main__':
    main()
