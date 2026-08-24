# Deployment and Rollback

**Current deployment state:** Static release candidate approved; production unchanged.

## Production baseline

- Primary URL: <https://intellumia.com/>
- Privacy URL: <https://intellumia.com/privacy.html>
- Host: GitHub Pages.
- Repository: <https://github.com/Intellumia/Intellumia-website>
- Deployment branch and folder: `main` / repository root.
- Current deployable commit: `5800aadbee507532a06789ae4e5993d75b5578ba`.
- Custom domain: `intellumia.com` through the repository `CNAME` file.
- `www` redirects to the apex domain and HTTP redirects to HTTPS.
- DNS remains outside the release scope and must not be changed.

The public files captured on 23 August 2026 remain under `baseline/production_2026-08-23/` with SHA-256 checksums. The Git commit above is the preferred rollback source.

## Approved release architecture

- GitHub Pages remains the production host.
- The authored project remains at the repository root.
- `npm run build` creates the public release artifact in `docs/`.
- The existing root holding page must remain intact while the release source is imported, so pushing the source does not itself change production.
- The final production action is changing the GitHub Pages publishing folder from `/root` to `/docs` on `main`.
- No DNS, email, analytics or privacy-system change is part of this release.

GitHub Pages does not allow project-defined response headers. Supported content-security and referrer controls are implemented in page metadata. The site remains static, has no form, analytics, third-party font, cookie or data store.

## Gate status

Completed:

1. Source repository, host, branch, domain file and current commit identified.
2. Founder approved the assembled page and accepted the current conversation experience on 24 August 2026.
3. Founder confirmed registered-office unit `#07-54`; no unverified UEN was introduced.
4. GitHub Pages retained as the approved host.
5. Exact static artifact built and reviewed at desktop and mobile sizes.
6. Lint, static-file, internal-link, metadata, accessibility and Lighthouse checks passed.
7. Current production commit and emergency file archive recorded.

Outstanding before production change:

1. Import the release source and `docs/` artifact into the repository without altering the existing root holding page.
2. Establish authorised GitHub write access in the deployment environment.
3. Obtain the approved social-preview image from Brand Studio when available. Until then, keep text Open Graph metadata and do not substitute a generic image.
4. Show the exact release candidate and ask the founder for confirmation immediately before changing GitHub Pages from `/root` to `/docs`.

## Deployment sequence

1. Fetch and verify `main` still points to the recorded production baseline or inspect any newer commit before proceeding.
2. Create a release branch from the current `main` state.
3. Add the authored source and generated `docs/` folder while preserving the root holding-page files.
4. Rebuild and rerun `npm run verify:release` from the release branch.
5. Review the exact local artifact and repository diff.
6. Merge or fast-forward the release source to `main`; confirm production is still serving the preserved root holding page.
7. Ask for the founder's final production confirmation.
8. Change only the GitHub Pages publishing folder from `/root` to `/docs`.
9. Verify production and record the deployed commit.

## Rollback plan

Preferred rollback is to change the GitHub Pages publishing folder back from `/docs` to `/root`. The preserved holding page should return without a source-code rollback.

If the root baseline is not intact, redeploy commit `5800aadbee507532a06789ae4e5993d75b5578ba`. The captured files in `baseline/production_2026-08-23/` remain the emergency restoration package.

After deployment, verify the apex URL, `www` redirect, HTTPS, `/privacy`, `/privacy.html`, conversation path, copy action, metadata, sitemap, robots file and missing-page behaviour. Roll back if a material legal, access, rendering or routing problem cannot be corrected immediately.
