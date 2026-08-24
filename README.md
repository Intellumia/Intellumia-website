# Intellumia Website

**Phase:** 1 — client-first website and thesis depth  
**Status:** Phase 1 live in production from GitHub Pages `main` / `docs`  
**Canonical source:** This directory  
**Production URL:** <https://intellumia.com>

## Purpose

This is the canonical implementation layer for Intellumia's initial website. The homepage is designed around the visitor's business consequence, the point at which Intellumia may help and the route to a qualified conversation. The deeper Point of View route carries the company's future thesis, organisational-intelligence direction and bounded Intelligence Twin concept.

The website does not define company strategy or the brand system. It implements the current company and brand sources listed in `CONTENT_SOURCES.md`. The inactive, privacy-gated measurement design is recorded in `ANALYTICS_PLAN.md`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Client-first Phase 1 homepage |
| `/point-of-view` | Intellumia thesis, organisational intelligence and Intelligence Twin boundary |
| `/connect` | Device-independent conversation path with address copy and optional email-app opening |
| `/privacy` | Preserved current privacy statement |
| `/privacy.html` | Legacy production URL forwarding to `/privacy` |
| Any unmatched URL | Branded missing-page state |
| `/robots.txt` | Search crawler rules |
| `/sitemap.xml` | Production sitemap |
| `/manifest.webmanifest` | Basic web-app metadata |

## Local use

Requirements:

- Node.js 22.13 or later.
- npm.

Commands:

```bash
npm install
npm run dev
npm run build
npm run verify:release
npm run preview
npm run lint
```

`npm run build` creates the production-ready GitHub Pages artifact in `docs/`.
The source remains in `app/`; generated browser pages contain no Next.js or
React runtime. Only the small address-copy interaction loads JavaScript.

No environment variables, API keys or secrets are required. The site has no contact form, analytics, third-party fonts or client data store.

## Implementation boundaries

- The approved Instrument Sans, Instrument Serif and Recursive sources are self-hosted from `public/fonts/`; lossless WOFF2 web subsets derived from those sources are used at runtime, with the supplied SIL Open Font License notices retained under `public/fonts/licenses/`.
- Authoritative logo files are copied without alteration from the workspace `Logo/` directory.
- The primary conversation action opens the local `/connect` route so it does not depend on a configured mail client. Visitors can copy `connect@intellumia.com` into any email service; a clearly labelled `mailto:` option remains secondary.
- No contact form, message content or personal data is collected by the website.
- No analytics code is active. CTA links include a future-facing event name only; nothing is transmitted.
- No Open Graph image is included. Brand Studio must supply the production social-preview image.
- The registered-office unit `#07-54` was confirmed by the founder on 24 August 2026. No unverified UEN was added.
- The current `/privacy.html` URL remains available as a no-index static forward to `/privacy` so existing links do not break.
- GitHub Pages does not support project-defined response headers. The static pages include the supported browser-level content-security and referrer policies; server-only headers cannot be asserted by this host.

## Production safety

The existing holding page is preserved under `baseline/production_2026-08-23/` and in production repository commit `5800aad`. The live site remains unchanged. See `DEPLOYMENT_AND_ROLLBACK.md` before any staging or production action.

The completed local verification record and raw Lighthouse audits are under `qa/`.
