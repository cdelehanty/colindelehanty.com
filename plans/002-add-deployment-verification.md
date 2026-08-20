# Plan 002: Add repeatable deployment verification

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report; do not improvise. When done, update the status row for this plan in
> `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c0e0c5d..HEAD -- package.json package-lock.json README.md .github/workflows/verify.yml`
> Plan 001 is expected to change `package.json` and `package-lock.json`; confirm
> its Node 22 pin exists. Any other mismatch is a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: `plans/001-restore-supported-vercel-builds.md`
- **Category**: tests
- **Planned at**: commit `c0e0c5d`, 2026-08-19

## Why this matters

The repo has no CI workflow, Astro-aware type check, tests, or useful deployment
runbook. A December 2024 production build failed because a dynamic route lacked
`getStaticPaths()`, and the problem was discovered only after Vercel built it.
Automated checks plus a preview checklist keep invalid content/routes away from
the production alias and make rollback predictable.

## Current state

- `package.json:5-13` contains `build`, `build-local`, and `tsc`, but no `check`,
  `verify`, test, or lint script.
- `tsc` alone does not validate `.astro` templates.
- `README.md:1-3` is only "# Notes / Hello World."
- There is no `.github/` workflow.
- The failed deployment for commit `8712fc4` reported that
  `src/pages/archives/[slug].astro` lacked `getStaticPaths()`; commit `98873cc`
  removed that route and the next deployment succeeded.
- Git integration already publishes Vercel status/comments for commits and pull
  requests.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Install | `npm ci` | exit 0 |
| Astro check | `npm run check` | exit 0, no errors |
| Build | `npm run build` | exit 0 |
| Combined gate | `npm run verify` | check and build both pass |
| Formatting check | `git diff --check` | exit 0, no output |

## Scope

**In scope**:

- `package.json`
- `package-lock.json`
- `.github/workflows/verify.yml` (create)
- `README.md`
- `plans/README.md` (status only)

**Out of scope**:

- Application and content files under `src/`
- Astro/framework major upgrades
- Vercel DNS and domain changes
- Automatic production promotion

## Git workflow

- Branch: `advisor/002-deployment-verification`
- Suggested commit: `ci: verify astro builds before deployment`
- Do not push or change repository branch-protection settings unless instructed.

## Steps

### Step 1: Add an Astro-aware validation command

Install `@astrojs/check` as a development dependency using npm. Add scripts:

```json
"check": "astro check",
"verify": "npm run check && npm run build"
```

Keep the existing Vercel build command (`astro build --remote`) unchanged.

**Verify**: `npm run check` -> exit 0. Fix only validation errors that are
unambiguously local and behavior-preserving; otherwise stop and report them.

### Step 2: Add the pull-request verification workflow

Create `.github/workflows/verify.yml` that runs on pull requests and pushes to
`main`, uses `actions/checkout`, `actions/setup-node` with Node 22 and npm cache,
then runs `npm ci` and `npm run verify`.

The remote Cloudinary content loader must receive its required public cloud-name
configuration through a GitHub repository variable, not a hard-coded secret. If
the current build succeeds without that variable, do not add one.

**Verify**: inspect the YAML with a YAML parser if available, then push only to a
non-production branch when authorized. The `verify` job must complete green.

### Step 3: Replace the placeholder README with an operating runbook

Document:

- required Node major and `npm ci`, `npm run dev`, `npm run verify` commands;
- that `main` is the production branch and pull requests create previews;
- the six smoke-test routes from Plan 001;
- where the public Cloudinary variable is configured (name only, no secret);
- how to inspect Vercel build/runtime logs;
- the Hobby-plan rollback limit: only the immediately previous production
  deployment can be instantly restored;
- a release rule: never combine DNS changes, framework migrations, and content
  compliance edits in one production event.

**Verify**: `rg -n "Node 22|npm run verify|Preview|rollback|Cloudinary" README.md` ->
at least one match for each term.

### Step 4: Require the gate before merging

After the workflow passes on a branch, configure the GitHub `main` branch (if
the account/repo plan supports it) to require the `verify` status check and a
Vercel preview result before merge. This is an external manual step.

**Verify**: open a test pull request and confirm both checks appear. Do not merge
the test pull request merely to verify settings.

## Test plan

- Deliberately validate that `npm run check` reads `.astro` and MDX-backed routes.
- Clean install and full remote-content build on Node 22 in GitHub Actions.
- One authorized test pull request that produces both a green CI check and a
  `Ready` Vercel preview.

## Done criteria

- [ ] `npm run verify` passes locally under Node 22.
- [ ] The workflow passes from a clean GitHub runner.
- [ ] README contains the deployment, preview, smoke-test, and rollback runbook.
- [ ] A pull request exposes both CI and Vercel preview checks.
- [ ] No application/content behavior changed.
- [ ] `plans/README.md` status row updated.

## STOP conditions

Stop and report if:

- Plan 001 is incomplete or Node 18 is still used by Vercel.
- `astro check` produces existing errors requiring broad source edits.
- GitHub Actions cannot access a build-required remote-content setting.
- The repo/account cannot require checks; document the limitation rather than
  changing repository visibility or billing.

## Maintenance notes

- Any future route, dependency, or content-loader change must keep `verify`
  green and receive a preview smoke test.
- Do not use `npm audit fix --force` in CI; dependency migrations require review.

