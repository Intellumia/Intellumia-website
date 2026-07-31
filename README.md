# intellumia.com

Static corporate landing page for Intellumia Pte. Ltd. Built for GitHub Pages —
no build step, no framework, no dependencies.

---

## Outstanding

- **UEN** is not yet on the page. When you have it, replace the `Entity type`
  card in the Company details section of `index.html` with a `UEN` card. Keeping
  the count at six preserves the 3×2 grid.
- **Registered office** currently reads `#07-54`. Confirm this matches the unit
  on the ACRA filing — a third-party registry lists `#06-28`, so one of the two
  is stale.

---

## Deploy

Served from **Settings → Pages → Deploy from a branch → `main` / `/ (root)`**.
Pushing to `main` redeploys automatically, usually within a minute.

To work on it locally:

```bash
git clone https://github.com/Intellumia/website.git
cd website
python3 -m http.server 8000   # then open http://localhost:8000
```

### Custom domain

Apex domain `intellumia.com`, DNS at **Ionos**.

| Type | Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `intellumia.github.io` |

**Do not touch the MX or TXT records** — the domain carries live Google
Workspace email. The apex previously pointed at Framer (`31.43.160.6`,
`31.43.161.6`) with `www` on `sites.framer.app`; those were replaced.

Once DNS resolves, tick **Enforce HTTPS** in Settings → Pages. GitHub redirects
`www` → apex automatically.

---

## What's here

```
index.html                 the page — all CSS inline, zero JavaScript
privacy.html               PDPA-aligned privacy statement
*.woff2                    self-hosted fonts (52 KB total)
favicon.svg                logomark on brand green
apple-touch-icon.png       180×180
og.png                     1200×630 social share card
robots.txt  sitemap.xml    basic SEO
CNAME  .nojekyll           GitHub Pages config
```

Everything sits at the repo root — no subdirectories — so files can be managed
through the GitHub web UI without losing paths.

Total page weight is roughly **90 KB**, most of it fonts. No JavaScript, no
third-party requests, no cookies, no analytics — which is also why the privacy
statement can honestly say the site collects nothing.

---

## Design decisions worth knowing

**Dark green base.** Not a stylistic preference — a contrast requirement.
Every brand accent fails WCAG AA as text on white (`#D4B480` is 1.75:1,
`#D0ED5F` is 1.17:1). On `#0F1D0A` they pass comfortably: cream text hits
15.5:1, sand 8.9:1, lime 13.3:1. The palette was built for a dark surface.

**Self-hosted fonts.** Manrope, Merriweather Italic and IBM Plex Mono are all
SIL OFL 1.1, subset to Latin and served from the repo root. No Google Fonts
request — faster, and it avoids the third-party-transfer question that has
caused problems for European sites.

**Glass Graphic rebuilt in CSS.** The exported SVGs use `<foreignObject>` with
`backdrop-filter`, which doesn't render reliably in browsers (Safari in
particular). The hero texture is plain CSS gradients instead.

**No illustrated icons.** The brand icon set — lotus, brain, cradled orb —
reads as consumer wellbeing. Wrong register for a page whose job is
credibility with investors and compliance officers. Those icons belong on a
product site.

**No stock photography.** Stock model photos are a credibility cost with
exactly the audience this page is for.

**Every claim on the page is true today.** No metrics, no testimonials, no
"trusted by", no roadmap, no thesis section. When the post-pivot narrative
firms up, the natural place for it is a new section between `01 — Company`
and `02 — What we're building`.

---

## Accessibility

- All text passes WCAG AA; body copy and headings pass AAA
- Skip link, visible focus rings, semantic landmarks, labelled SVGs
- `prefers-reduced-motion` respected
- Works with JavaScript disabled (there is none)
