# Plan 004: Upgrade Astro and migrate content collections

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report; do not improvise. When done, update the status row for this plan in
> `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c0e0c5d..HEAD -- package.json package-lock.json astro.config.mjs src/content/config.ts src/content.config.ts src/pages/work/'[...slug].astro' src/lib/fetchers.ts src/config/site.ts`
> Plan 001 is expected to change package metadata and `astro.config.mjs` to use
> the Astro 4 static adapter. Plan 002 adds verification tooling. Compare all
> other paths with "Current state"; an unexplained mismatch is a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: `plans/001-restore-supported-vercel-builds.md`,
  `plans/002-add-deployment-verification.md`
- **Category**: security
- **Planned at**: commit `c0e0c5d`, 2026-08-19

## Why this matters

The production dependency tree is from 2024. `npm audit --omit=dev` reports 28
vulnerabilities (3 low, 7 moderate, 17 high, 1 critical), including Astro,
Cloudinary, Vite/Rollup, `@vercel/nft`, and `tar`. Plan 001 removes the old
serverless output, but the framework and content collection APIs remain on the
unsupported Astro 4 generation. A staged framework migration removes those
unsupported APIs without risking the Marcom content release.

## Current state

- `package.json:16-34` pins the Astro 4 generation (`astro ^4.15.8`, lockfile
  `4.15.8`; `@astrojs/vercel ^7.8.2`, lockfile `7.8.2`; `cloudinary ^2.5.1`).
- `astro.config.mjs:6,23-30` imports `@astrojs/vercel/serverless`, sets
  `output: 'hybrid'`, enables adapter Web Analytics, and opts into experimental
  `contentLayer`.
- Astro v5 removed the `hybrid` mode and stabilized `contentLayer`; current
  releases no longer accept those options.
- `src/content/config.ts` mixes a legacy local work collection with the newer
  Cloudinary loader for archives.
- `src/pages/work/[...slug].astro:11,21` uses legacy `project.slug` and
  `project.render()`; current content collections use `project.id` and
  `render(project)`.
- Search found no `prerender = false`, middleware, API routes, actions,
  `Astro.request`, cookies, or request-time environment access.
- Vercel observability shows 0 function invocations; all route families are
  currently generated at build time.
- The build uses a remote Cloudinary asset loader, so a full clean build and
  media/route comparison are mandatory.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Clean install | `npm ci` | exit 0 |
| Check | `npm run check` | exit 0 |
| Build | `npm run build` | exit 0 |
| Audit | `npm audit --omit=dev` | zero high/critical, or documented upstream-only exceptions |
| Full gate | `npm run verify` | exit 0 |
| Search SSR | `rg -n "prerender\s*=\s*false|Astro\.(request|cookies)|APIRoute|middleware" src` | no output |

## Suggested executor toolkit

- Read the official Astro v5, v6, and v7 upgrade guides before changing versions.
- Use the current `@astrojs/vercel` integration documentation for the final
  adapter import; do not copy an older `/serverless` example.

## Scope

**In scope**:

- `package.json`
- `package-lock.json`
- `astro.config.mjs`
- `src/content/config.ts` (remove after migration)
- `src/content.config.ts` (create)
- `src/pages/work/[...slug].astro`
- Any `src/` file that fails solely because `CollectionEntry.slug` changed to
  `CollectionEntry.id` or `entry.render()` changed to `render(entry)`; enumerate
  each such file in the PR description
- `src/env.d.ts` if current Astro types require it
- `plans/README.md` (status only)

**Out of scope**:

- React 18-to-19 and Tailwind 3-to-4 migrations unless the current Astro adapter
  has a hard peer-dependency requirement
- Design, copy, project media, and Marcom changes
- DNS changes
- Blind `npm audit fix --force`
- New server-rendered routes or Vercel functions

## Git workflow

- Branch: `advisor/004-astro-static-upgrade`
- Use multiple reviewable commits:
  1. `chore: upgrade astro integrations`
  2. `refactor: migrate content collection api`
  3. `refactor: use static vercel output`
- Do not push or merge unless instructed.

## Steps

### Step 1: Capture a Node 22 baseline

From the completed Plan 002 branch state, run `npm ci`, `npm run verify`, and
`npm audit --omit=dev --json`. Save route counts and the URLs/IDs generated for
work and archive content in the PR description; do not commit audit output.

**Verify**: baseline build exits 0 and the known audit count is reproducible. If
the current build cannot be reproduced, stop before upgrading.

### Step 2: Upgrade Astro and official integrations together

Run the official Astro upgrade tool under Node 22 and migrate one major at a
time when prompted: v4 to v5, verify; v5 to v6, verify; v6 to the current v7,
verify. Upgrade the official MDX, React, sitemap, Tailwind, and Vercel
integrations as a compatible set. Upgrade `cloudinary` to a non-vulnerable
current 2.x release. Do not upgrade React or Tailwind majors merely because they
are available.

After each major, run `npm run check` and `npm run build`; commit only after both
pass. Read that major's guide and address only documented breaking changes.

**Verify**: `npm ls astro @astrojs/vercel @astrojs/mdx @astrojs/react @astrojs/sitemap @astrojs/tailwind cloudinary` -> exit 0 with no invalid peer dependencies.

### Step 3: Migrate content collections to the current API

Move `src/content/config.ts` to `src/content.config.ts` and use:

- `defineCollection` from `astro:content`;
- `z` from `astro/zod`;
- `glob` from `astro/loaders` for work MDX files, with pattern
  `**/*.(md|mdx)` and base `./src/content/work`;
- the existing `cldAssetsLoader` for archives, preserving folder `archives` and
  limit `1000`.

In every work-entry consumer, replace legacy `.slug` with `.id`. In
`src/pages/work/[...slug].astro`, import `render` from `astro:content` and replace
`project.render()` with `render(project)`. Preserve existing public route slugs;
the generated route set must exactly match the baseline.

Remove the stabilized `experimental.contentLayer` flag.

**Verify**: `rg -n "\.slug\b|\.render\(\)|contentLayer" src astro.config.mjs` -> no legacy collection matches (ignore unrelated component prop names only after manually verifying them); `npm run verify` -> exit 0.

### Step 4: Preserve static output and Vercel Analytics

Keep Astro output static/default and do not add any `prerender = false` exports.
Migrate the Astro 4 static adapter import to the current supported equivalent.
Use the current `@astrojs/vercel` adapter only if it is still needed for Vercel
Web Analytics; otherwise add the supported `@vercel/analytics/astro` component
to the root layout before removing the adapter. Do not ship a deployment that
silently loses existing Web Analytics.

The target result must not generate a Vercel function for page rendering. Do
not add custom build/output settings to Vercel.

**Verify**: `npm run verify` -> exit 0; inspect build output and the preview's
Functions/Observability view -> all pages are prerendered and page-rendering
function count/invocations remain zero; Web Analytics requests still succeed.

### Step 5: Resolve security findings deliberately

Run `npm audit --omit=dev`. For each remaining high/critical finding, identify
the owning direct dependency and whether the vulnerable code ships to the
browser, runs only during build, or remains in a server function. Update within
compatible majors when possible. Do not use `--force`.

If a high/critical advisory has no compatible fix, document the package,
advisory, reachability, and upstream issue in the PR; it is a STOP condition for
production promotion if the vulnerable code is reachable at request time.

**Verify**: `npm audit --omit=dev` -> no reachable high/critical findings; `npm run verify` -> exit 0.

### Step 6: Compare and promote the preview

Deploy a preview and compare `/`, `/work`, all category routes, every project
slug, `/archives`, `/about`, sitemap, metadata, Cloudinary images, Vimeo embeds,
client-side carousels, and the resume link against current production. Confirm
the home route does not regress from the existing Speed Insights baseline.

Promote/merge only after the preview is accepted. Keep the prior production
deployment available for Hobby-plan instant rollback.

**Verify**: route-set comparison has no missing/extra public URLs; all smoke
routes return HTTP 200; Vercel build/runtime logs contain no errors; Analytics
and Speed Insights still receive data.

## Test plan

- Clean Node 22 install and validation after each Astro major migration.
- Exact baseline-vs-preview route and content-entry ID comparison.
- Build-time Cloudinary loader check for all archive assets.
- Browser smoke tests for hydration-heavy client components and embedded media.
- `npm audit --omit=dev` reachability review.
- Vercel preview confirmation that no page-rendering function is emitted.

## Done criteria

- [ ] Current supported Astro and compatible official integrations are installed.
- [ ] Work and archive collections use the current Content Layer API.
- [ ] Public route slugs and media content match the baseline.
- [ ] All pages are prerendered; no request-time page function is deployed.
- [ ] Web Analytics and Speed Insights continue working.
- [ ] No reachable high/critical production advisory remains undocumented.
- [ ] `npm run verify` passes locally and in CI.
- [ ] Preview smoke tests pass before production promotion.
- [ ] `plans/README.md` status row updated.

## STOP conditions

Stop and report if:

- Baseline `npm run verify` cannot be reproduced on Node 22.
- The Cloudinary loader or MDX collection changes IDs or drops entries.
- Any route actually requires request-time rendering.
- The upgrade requires React 19, Tailwind 4, or a visual redesign.
- A reachable high/critical advisory has no fix.
- Web Analytics cannot be preserved with a static build.
- The preview differs materially from production or produces runtime errors.

## Maintenance notes

- Keep framework upgrades separate from public copy releases.
- Run `npm outdated` and `npm audit --omit=dev` periodically, but review updates
  rather than applying forced fixes.
- If a future feature introduces on-demand rendering, document the route and
  re-evaluate the Vercel adapter/function configuration explicitly.
