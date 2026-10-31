# Deployment and rollback

## Production

- URL: <https://intellumia.com/>. `www` redirects to the apex domain, and HTTP redirects to HTTPS.
- Host: GitHub Pages, publishing `main` / `docs` as it stands (no build step).
- Repository: <https://github.com/Intellumia/Intellumia-website>.
- Custom domain: `docs/CNAME` (`intellumia.com`).
- DNS, email and the domain registrar are outside the website's scope and are never changed by a release.
- GitHub Pages cannot set response headers, so the security and referrer policies are set in each page's `<head>`.

## How a release goes out

1. Work on a branch and open a draft pull request into `main`. The pull request states its rollback point: the commit `main` is at before the merge.
2. Run the checks in `README.md` at 390, 768, 1100 and 1440 px, and put the results and desktop and phone screenshots in the pull request.
3. The brand studio does its brand check on the pull request; fixes go on the same branch, and the checks run again.
4. Sundeep merges, with a merge commit. Nobody else merges.
5. GitHub Pages runs "pages build and deployment" (about 30 seconds). Confirm the run succeeded for the merge commit.
6. Check the live site: the pages load, the header and footer are right, `/sitemap.xml` and `/robots.txt` are served, and an unknown path shows the 404 page.
7. The IndexNow workflow runs on the same push and pings Bing with the sitemap URLs. A failed ping does not affect the site.

## Rollback

Every release is a merge commit on `main`, so the quickest rollback is to revert it:

```bash
git revert -m 1 <merge commit>
git push origin main
```

GitHub Pages redeploys the previous site within a minute. Alternatively, restore `docs/` from the release's rollback point and push.

Last resort, if `docs/` is unusable: in the repository's Pages settings, switch the source from `main` / `docs` to `main` / root. That serves the holding page kept at the repository root (Carbon, refreshed on 23 Oct 2026), with its own privacy page and a link to book 30 minutes.

## Release log

| Date | Release | Merge commit | Rollback point |
| --- | --- | --- | --- |
| 15 Oct 2026 | Site v2 on Brand System v1.3.2 (#25, #26) | `28aa145` | `273f367` |
| 17 Oct 2026 | Wordmark, Brand System v1.4.1 (#27); zip removed (#28) | `4ab5bd7`, `30f093f` | `28aa145` |
| 18 Oct 2026 | intellumia.com v3, direction C (#29) | `5db5e55` | `30f093f` |
| 20 Oct 2026 | Brand v1.5: Anek only, Intellumia in text, five steps (#30) | `176067c` | `5db5e55` |
| 21 to 22 Oct 2026 | Release v1.5 Phase 1 and 2, Hairline art (#31, #32, #33) | `c36d78a`, `c01ff92`, `309e679` | `176067c` |
| 23 Oct 2026 | intellumia.com v2, product-led (#34) | `87b4797` | `309e679` |
| 27 Oct 2026 | Registered address: 60 Paya Lebar Road, #06-28 Paya Lebar Square (direct commits) | `dd28b4b`, `0fbcfe0` | `87b4797` |
| 30 Oct 2026 | Website blockers closed (time commitment, brief address, privacy approved); voice check complete (#35) | `126c548` | `b46f985` |
| 31 Oct 2026 | One floating "Talk to Sundeep" button replaces every booking button (#36) | `881e7ca` | `f6261c1` |

Add a row for every merge to `main` that changes `docs/`.
