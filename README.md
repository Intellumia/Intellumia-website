# intellumia.com

Static site for Intellumia Pte. Ltd. Built for GitHub Pages — no build step,
no framework, no dependencies.

**Current state: placeholder.** Intellumia is under new direction and this
site is being rebuilt from scratch. `index.html` is a holding page (logo,
one-line message, contact, legal particulars) until the new site replaces it.
The previous page — the Anthrie/Egrysa parent-company page — has been
retired; see git history if you need to reference it.

---

## Outstanding

- **UEN** is not yet on the page. When you have it, add a `<div><dt>UEN</dt>
  <dd>…</dd></div>` to the `.particulars` list in the footer of `index.html`.
  That grid is four columns on desktop, so a fifth item wraps — either drop
  `Entity type` or accept the wrap.
- **Registered office** currently reads `#07-54`. Confirm this matches the unit
  on the ACRA filing — a third-party registry lists `#06-28`, so one of the two
  is stale.
- **Rebuild** — new site TBD once the new direction firms up.

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
index.html                 holding page — all CSS inline, zero JavaScript
                           logo, one message, contact, legal particulars
privacy.html               PDPA-aligned privacy statement
manrope-var.woff2          self-hosted fonts
plexmono-500.woff2
favicon.svg                logomark on brand green
apple-touch-icon.png       180×180
robots.txt  sitemap.xml    basic SEO
CNAME  .nojekyll           GitHub Pages config
```

Everything sits at the repo root — no subdirectories — so files can be managed
through the GitHub web UI without losing paths.

No JavaScript, no third-party requests, no cookies, no analytics — which is
also why the privacy statement can honestly say the site collects nothing.

---

## Design decisions worth knowing

**Dark green base.** Not a stylistic preference — a contrast requirement.
Every brand accent fails WCAG AA as text on white (`#D4B480` is 1.75:1). On
`#0F1D0A` it passes comfortably: cream text hits 15.5:1, sand 8.9:1. The
palette was built for a dark surface, and is kept here as a visual bridge
until the new brand direction lands.

**Self-hosted fonts.** Manrope and IBM Plex Mono are SIL OFL 1.1, subset to
Latin and served from the repo root. No Google Fonts request — faster, and it
avoids the third-party-transfer question that has caused problems for
European sites.

**No illustrated icons, no stock photography.** Same reasoning as before the
rebuild — kept for continuity while the new site is designed.

---

## Accessibility

- All text passes WCAG AA; body copy and headings pass AAA
- Skip link, visible focus rings, semantic landmarks, labelled SVGs
- `prefers-reduced-motion` respected
- Works with JavaScript disabled (there is none)
