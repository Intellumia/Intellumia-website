#!/usr/bin/env python3
"""Version every asset link on the published pages, so a changed file always gets a new address.

Why (10 Nov 2026, after Round 8): browsers and Cloudflare keep /assets/ files longer than the pages, so a returning
visitor got the new index.html with the old /assets/site.css still in their cache, and the hero rendered unstyled.
With ?v=<version> on every link, a page can only ever ask for the files it was built with.

Run it at every release, after scripts/make_structured_data.py and before scripts/make_fallback.py:

    python3 scripts/make_asset_versions.py

The version is the first 10 hexadecimal characters of the file's sha256. It is written into:
- every src, href, srcset and content attribute on the HTML pages under docs/ that points at a file under
  /assets/ or at the favicons (the stylesheet, the script, the pictures, the portraits, the wordmark, the font
  preload, the icons, and og:image and twitter:image);
- the url() of the fonts inside docs/assets/site.css, first, so that the stylesheet's own version covers them.
The structured data (JSON-LD) keeps plain addresses: it names files for search engines, not for a browser cache.
scripts/check_copy.py fails if any version does not match its file. Standard library only; running it twice
changes nothing.
"""
import hashlib
import re
import sys
from pathlib import Path

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / 'docs'
VERIFY_FILE = 'googlebe2efba1afc3cbe9.html'  # Search Console's file: its one line, never touched
LENGTH = 10
ASSET = r'/(?:assets/[^\s"\'()?#,]+|favicon\.ico|favicon\.svg|apple-touch-icon\.png)'
REF = re.compile(r'(?P<site>https://intellumia\.com)?(?P<path>' + ASSET + r')(?:\?v=[0-9a-f]*)?')
ATTR = re.compile(r'\b(src|href|srcset|content)="([^"]*)"')
CSS_URL = re.compile(r"url\('(?P<path>" + ASSET + r")(?:\?v=[0-9a-f]*)?'\)")


def version(path: str) -> str:
    """The first LENGTH hex characters of the sha256 of the file a site path points at."""
    f = DOCS / path.lstrip('/')
    if not f.is_file():
        sys.exit(f'make_asset_versions: {path} is linked but {f.relative_to(ROOT)} does not exist')
    return hashlib.sha256(f.read_bytes()).hexdigest()[:LENGTH]


def stamp(value: str) -> str:
    return REF.sub(lambda m: f"{m['site'] or ''}{m['path']}?v={version(m['path'])}", value)


def write_if_changed(f: Path, text: str) -> bool:
    if f.read_text() != text:
        f.write_text(text)
        return True
    return False


def main() -> None:
    changed = []
    css = DOCS / 'assets/site.css'
    if write_if_changed(css, CSS_URL.sub(lambda m: f"url('{m['path']}?v={version(m['path'])}')", css.read_text())):
        changed.append('docs/assets/site.css')
    links = 0
    for f in sorted(DOCS.rglob('*.html')):
        if f.name == VERIFY_FILE:
            continue
        text = f.read_text()
        links += sum(len(REF.findall(v)) for _, v in ATTR.findall(text))
        new = ATTR.sub(lambda m: f'{m[1]}="{stamp(m[2])}"' if REF.search(m[2]) else m[0], text)
        if write_if_changed(f, new):
            changed.append(f.relative_to(ROOT).as_posix())
    print(f'asset versions: {links} links on the pages, site.css {version("/assets/site.css")}; '
          + (f'updated {", ".join(changed)}' if changed else 'nothing to update'))


if __name__ == '__main__':
    main()
