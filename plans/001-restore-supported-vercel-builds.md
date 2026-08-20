# Plan 001: Restore supported Vercel builds on Node 22

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report; do not improvise. When done, update the status row for this plan in
> `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c0e0c5d..HEAD -- package.json package-lock.json .nvmrc vercel.json .gitignore astro.config.mjs src/features/gallery/components/mobile-carousel.tsx src/features/gallery/components/fullscreen-carousel.tsx`
> If an in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch,
> treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: migration
- **Planned at**: commit `c0e0c5d`, 2026-08-19

## Why this matters

Vercel currently marks Node.js 18 as discontinued and says a runtime upgrade is
required to create new builds. The current production deployment can continue
serving, but any new preview or production build is blocked. Pinning Node 22 in
the repo and correcting the framework preset makes the next build supported and
keeps local, preview, and production environments aligned.

## Current state

- Vercel Project Settings > Build and Deployment shows Node.js 18.x selected and
  disabled, with the warning "Please upgrade to create new builds."
- The same screen incorrectly identifies the Framework Preset as Create React
  App even though this is an Astro project.
- `package.json:1-14` has no `engines` or `packageManager` field.
- The repo has no `.nvmrc`, `.node-version`, or `vercel.json`.
- Local recon used Node `v22.19.0` and npm `10.9.3`.
- Vercel's supported runtime documentation states that a `package.json`
  `engines.node` value overrides the dashboard setting.
- Local validation discovered that `@astrojs/vercel/serverless@7.8.2` still
  emits a Node 18 function even when the build itself runs on Node 22. All 19
  current pages prerender successfully, so the existing Astro 4 static adapter
  is the smallest compatible fix.
- Dev startup also scans two unreachable prototype files,
  `mobile-carousel.tsx` and `fullscreen-carousel.tsx`, whose imports point to
  removed `_trash` modules. Neither file is imported by the live application.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Runtime | `node -v && npm -v` | Node 22.x; npm exits 0 |
| Install | `npm ci` | exit 0; lockfile unchanged |
| Build | `npm run build` | exit 0 and `dist/` created |
| Diff | `git diff --check` | exit 0, no output |

## Scope

**In scope** (the only files you should modify):

- `package.json`
- `package-lock.json` only if npm updates the root package metadata
- `.nvmrc` (create)
- `vercel.json` (create)
- `.gitignore`
- `astro.config.mjs`
- `src/features/gallery/components/mobile-carousel.tsx` (remove)
- `src/features/gallery/components/fullscreen-carousel.tsx` (remove)
- `plans/README.md` (status only)

**Out of scope**:

- Dependency version upgrades
- Live application and content files
- DNS changes
- Merging to or pushing directly to `main`

## Git workflow

- Branch: `advisor/001-node22-vercel-baseline`
- Use conventional commits, matching history such as
  `refactor: increase asset loader limit size`.
- Suggested commit: `chore: align vercel builds on node 22`
- Do not push, merge, or open a PR unless the operator instructs it.

## Steps

### Step 1: Pin the supported runtime

Add this top-level field to `package.json`:

```json
"engines": {
  "node": "22.x"
}
```

Create `.nvmrc` containing exactly:

```text
22
```

Run `npm install --package-lock-only --ignore-scripts` only if `npm ci` reports
that the lockfile root metadata does not match `package.json`; otherwise do not
rewrite the lockfile.

**Verify**: `node -e "const p=require('./package.json'); if(p.engines?.node!=='22.x') process.exit(1)" && test "$(cat .nvmrc)" = "22"` -> exit 0.

### Step 2: Put the framework preset under source control

Create `vercel.json`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "astro"
}
```

Do not add build, install, output-directory, function, or route overrides.

**Verify**: `node -e "const v=require('./vercel.json'); if(v.framework!=='astro') process.exit(1)"` -> exit 0.

### Step 3: Remove the Node 18 server-function output

In `astro.config.mjs`, replace the serverless adapter import with
`@astrojs/vercel/static` and change `output` from `hybrid` to `static`. Preserve
the existing Web Analytics option. Do not upgrade Astro or the adapter in this
plan.

**Verify**: `npm run build` -> exit 0, output reports `static` and
`@astrojs/vercel/static`; `test ! -d .vercel/output/functions` -> exit 0. The
build must not print the old warning that Vercel will use Node 18.

### Step 4: Remove unreachable files that break dev dependency scanning

Delete only `src/features/gallery/components/mobile-carousel.tsx` and
`src/features/gallery/components/fullscreen-carousel.tsx`. Both import removed
`@/_trash/*` modules, neither has a live importer, and the production build does
not include them.

**Verify**: `rg -n "mobile-carousel|fullscreen-carousel|@/_trash" src` -> no
live import matches; a fresh `npm run dev -- --host 127.0.0.1 --port 4321`
starts without unresolved-dependency errors.

### Step 5: Reproduce the production build locally

Use Node 22, run `npm ci`, then run `npm run build`. Do not run `npm audit fix`
or upgrade packages as part of this plan.

**Verify**: `test -d dist && test -f dist/index.html` -> exit 0.

### Step 6: Change Vercel's dashboard runtime without deploying production

In Vercel Project Settings > Build and Deployment:

1. Change Node.js Version from 18.x to 22.x.
2. Confirm the Framework Preset resolves to Astro after the branch containing
   `vercel.json` is built.
3. Leave build, install, and output-directory overrides disabled.

This setting affects future builds; it does not replace the current production
deployment.

**Verify**: Create a branch/preview deployment and inspect its build log. It must
show Node 22.x, detect Astro, complete `npm run build`, and reach `Ready`. Do not
promote it yet.

### Step 7: Smoke-test the preview

Open the preview URL and test `/`, `/work`, `/about`, `/archives`,
`/work/rainbow-stage`, and `/work/apple-campaigns`. Confirm each returns a page,
project media begins loading, About shows the client grid, and the resume link
still resolves. Check the preview's build and runtime logs for warnings/errors.

**Verify**: every named URL returns HTTP 200 and the Vercel deployment remains
`Ready` with no error-level runtime logs.

## Test plan

- Clean install using the committed lockfile under Node 22.
- Full remote-content Astro build with the same `npm run build` used by Vercel.
- Preview smoke test of all top-level route families and both Apple project pages.
- Confirm no production domain was reassigned during testing.

## Done criteria

- [ ] `package.json` pins Node `22.x`.
- [ ] `.nvmrc` contains `22`.
- [ ] `vercel.json` declares the `astro` framework and no other overrides.
- [ ] Astro uses the static Vercel adapter and emits no functions.
- [ ] Dev startup has no unresolved `_trash` or `lucide-react` dependency errors.
- [ ] `npm ci` and `npm run build` exit 0 under Node 22.
- [ ] A Vercel preview deployment is `Ready` and all smoke-test routes pass.
- [ ] No dependency versions, content copy, DNS, or production aliases changed.
- [ ] `plans/README.md` status row updated.

## STOP conditions

Stop and report if:

- `npm ci` or the current lockfile fails under Node 22.
- The build requires a missing Cloudinary credential or environment variable.
- Vercel still selects Node 18 after both `engines.node` and the dashboard setting
  are set to 22.x.
- The preview attempts to replace the production alias automatically.
- Fixing the static build appears to require a framework or dependency upgrade;
  those changes belong in Plan 004.

## Maintenance notes

- Keep `engines.node`, `.nvmrc`, and Vercel Project Settings on the same major.
- Node 22 is deliberate: current Astro major migrations require Node 22.12 or
  newer, and Vercel currently supports the 22.x line.
- A failed build does not validate source changes, but it also should not replace
  the current production deployment. Always inspect the preview before promotion.
