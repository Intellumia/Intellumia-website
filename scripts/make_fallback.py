#!/usr/bin/env python3
"""Rebuild the last-resort fallback (index.html and privacy.html at the repository root) from docs/.

The fallback is served only if the Pages source is ever switched from main/docs to main/root
(see DEPLOYMENT_AND_ROLLBACK.md). It must carry the same words as the live page, so run this
after every change to docs/index.html, docs/privacy/index.html or docs/assets/site.css:

    python3 scripts/make_fallback.py

From the root, assets live under docs/assets/, so paths are rewritten and the stylesheet is
inlined with its font paths made relative.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / 'docs'
NOTE = ('<!-- Fallback copy of docs/{src}, made by scripts/make_fallback.py. Served only if the Pages source '
        'is switched to main/root (DEPLOYMENT_AND_ROLLBACK.md). Do not edit by hand. -->\n')


def build(src: str, out: str, extra_head: str = '') -> None:
    html = (DOCS / src).read_text()
    css = (DOCS / 'assets/site.css').read_text().replace("url('/assets/", "url('docs/assets/")
    # The stylesheet link carries its version (?v=..., scripts/make_asset_versions.py); the fallback inlines the file.
    html, n = re.subn(r'<link rel="stylesheet" href="/assets/site\.css(?:\?v=[0-9a-f]+)?">', lambda m: '<style>\n' + css + '</style>', html)
    assert n == 1, f'{src}: the stylesheet link was not found'
    for a, b in [
        ('"/assets/', '"docs/assets/'),            # href, src and the first srcset entry
        (', /assets/', ', docs/assets/'),          # later srcset entries
        ('https://intellumia.com/assets/', 'https://intellumia.com/docs/assets/'),
        ('href="/favicon.ico', 'href="favicon.ico'),     # the icons keep their ?v= versions
        ('href="/favicon.svg', 'href="favicon.svg'),
        ('href="/apple-touch-icon.png', 'href="apple-touch-icon.png'),
        ('href="/privacy/"', 'href="privacy.html"'),
    ]:
        html = html.replace(a, b)
    html = html.replace('<head>\n', '<head>\n' + NOTE.format(src=src) + extra_head, 1)
    (ROOT / out).write_text(html)
    print('wrote', out)


build('index.html', 'index.html')
build('privacy/index.html', 'privacy.html', '<meta name="robots" content="noindex,follow">\n')
