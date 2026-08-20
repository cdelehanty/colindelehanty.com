# Plan 003: Align the public portfolio with Magnit/Apple wording

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report; do not improvise. When done, update the status row for this plan in
> `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c0e0c5d..HEAD -- src/content/work/rainbow-stage.mdx src/content/work/apple-campaigns.mdx src/content/about/info.mdx src/features/clients/schemas/data.ts src/pages/about.astro src/config/site.ts public/Colin_Delehanty_Resume.pdf`
> If an in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch,
> treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: `plans/001-restore-supported-vercel-builds.md`,
  `plans/002-add-deployment-verification.md`
- **Category**: docs
- **Planned at**: commit `c0e0c5d`, 2026-08-19

## Why this matters

Magnit's email says Apple should not be represented as the employer and gives
the format "Title @ Magnit Global (contractor at Apple Inc)." The current
Rainbow Stage and Apple Campaigns copy repeatedly says the work was commissioned
or contracted directly by Apple, and the About page displays Apple's logo in a
client carousel. Updating the relationship language while preserving accurate
project credit removes the employment implication.

## Current state

- `src/content/work/rainbow-stage.mdx:4-7` says "commissioned by Apple," sets
  `client: Apple`, and `role: Photographer`.
- `src/content/work/rainbow-stage.mdx:37-39` says "I worked with Apple."
- The operator confirmed the Rainbow Stage engagement was through Magnit Global.
- `src/content/work/apple-campaigns.mdx:4-7` says "Contracted by Apple" and
  `role: Photographer`; lines 34-41 say "I worked with Apple."
- On 2026-08-19, the operator confirmed that the 2014/2015 Apple Campaigns
  engagement was also through Magnit Global.
- `src/content/about/info.mdx:26-29` says Colin collaborated with leading brands
  like Apple.
- `src/features/clients/schemas/data.ts:41-47` supplies the Apple logo rendered
  on `/about` by `ClientSection`. The email only expressly bans the Apple logo in
  an Apple email signature, not a portfolio, but removing the logo is the
  conservative public-facing choice unless Marcom approves it.
- `src/pages/about.astro:17-19` and `src/config/site.ts:47-48` both link to an old
  Cloudinary resume. The operator explicitly directed reviewers to use the
  attached resume instead of this hosted file.
- The attached resume is outside the repo at
  `/Users/colindelehanty/Library/Containers/com.mimestream.Mimestream/Data/Library/Mail Downloads/Attachments/p183525/Colin_Delehanty_Resume.pdf`.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Search old claims | `rg -n "commissioned by Apple|Contracted by Apple|worked with Apple|collaborating.*Apple" src` | no matches after edits |
| Check | `npm run check` | exit 0 |
| Build | `npm run build` | exit 0 |
| Full gate | `npm run verify` | exit 0 |

## Scope

**In scope**:

- `src/content/work/rainbow-stage.mdx`
- `src/content/work/apple-campaigns.mdx`
- `src/content/about/info.mdx`
- `src/features/clients/schemas/data.ts`
- `src/pages/about.astro`
- `src/config/site.ts`
- `public/Colin_Delehanty_Resume.pdf` only after a corrected PDF is approved
- `plans/README.md` (status only)

**Out of scope**:

- Claiming that another Apple engagement used Magnit without confirmation
- Editing or using the old resume currently hosted at the website's View Resume
  URL
- Republishing, removing, or relicensing Apple project media
- Treating the email-signature logo rule as a blanket trademark ruling
- Dependency/framework/DNS changes

## Git workflow

- Branch: `advisor/003-marcom-copy`
- Suggested commit: `fix: clarify apple contract relationships`
- Keep this a content-only deployment; do not combine it with Plan 004.

## Steps

### Step 1: Correct the Magnit-backed Rainbow Stage relationship

In `src/content/work/rainbow-stage.mdx`, use:

```yaml
description: Through Magnit Global, I worked as a contract photographer supporting Apple Inc. on a two-month internal video project documenting the construction of the Rainbow Stage at Apple Park and its opening concert.
client: Magnit Global (contractor at Apple Inc.)
role: Contract Photographer
```

Start the body paragraph with:

```text
Through Magnit Global, I worked as a contract photographer supporting Apple Inc. to create a seamless time-lapse that combined the construction of the Rainbow Stage at Apple Park with the celebratory concert into one continuous sequence.
```

Keep the factual production details and frame/day counts unchanged.

**Verify**: `rg -n "Magnit Global \(contractor at Apple Inc\.\)|Contract Photographer" src/content/work/rainbow-stage.mdx` -> both phrases are present, and `rg -n "commissioned by Apple|I worked with Apple" src/content/work/rainbow-stage.mdx` -> no output.

### Step 2: Identify the Magnit relationship for Apple Campaigns

After the operator confirmed that the engagement was through Magnit Global,
change the frontmatter to:

```yaml
description: Through Magnit Global, I worked as a contract photographer supporting Apple Inc. on multiple launch productions, creating time-lapse sequences that showcased new iPhone and iPad camera capabilities.
client: Magnit Global (contractor at Apple Inc.)
role: Contract Photographer
```

Change the first body sentence to begin:

```text
Through Magnit Global, I worked as a contract photographer supporting Apple Inc. on multiple productions...
```

Preserve the remaining factual campaign details.

**Verify**: `rg -n "Contracted by Apple|I worked with Apple" src/content/work/apple-campaigns.mdx` -> no output; `rg -n "Magnit Global \(contractor at Apple Inc\.\)|contract photographer supporting Apple" src/content/work/apple-campaigns.mdx` -> both phrases are present.

### Step 3: Clarify the About-page relationship and logo

Replace the `src/content/about/info.mdx:26-29` wording with:

```text
Building on his documentary filmmaking experience, Colin expanded his portfolio through contract projects supporting brands including Apple Inc. and Airbnb, using time-lapse photography to showcase new products and experiences.
```

Remove the Apple item at `src/features/clients/schemas/data.ts:44-47` from the
logo rotation unless written Marcom approval explicitly covers public portfolio
logo use. Do not delete the remote Cloudinary asset; it may be used elsewhere.

**Verify**: `rg -n "collaborating.*Apple|about/apple\.svg" src/content/about/info.mdx src/features/clients/schemas/data.ts` -> no output.

### Step 4: Publish only the corrected attached resume

Before touching either resume link, obtain an approved corrected PDF derived
from the attached local file, not the website's current Cloudinary PDF. At a
minimum, the experience text must identify Magnit Global as the employer/vendor
and Apple Inc. as the contractor placement; any project title should use
`Contract Photographer`, not wording that implies Apple full-time employment.

After approval:

1. Copy the corrected file to `public/Colin_Delehanty_Resume.pdf`.
2. Add one `resume` URL property to `siteConfig.links` (update the TypeScript type
   if required), using `/Colin_Delehanty_Resume.pdf`.
3. Make both `src/pages/about.astro` and the footer entry in `src/config/site.ts`
   use that one value rather than two hard-coded Cloudinary URLs.

If the corrected PDF is not yet approved, leave both existing links unchanged
and report this step as blocked; do not publish the attached file as-is.

**Verify**: `rg -n "ColinDelehanty_Resume\.pdf|res\.cloudinary\.com.*Resume" src` -> no output after the approved replacement; `test -f public/Colin_Delehanty_Resume.pdf` -> exit 0.

### Step 5: Verify generated copy and metadata in a preview

Run the full gate and create an authorized Vercel preview. Inspect both Apple
project pages, `/about`, social/meta descriptions in page source, and the resume
download. Because work frontmatter feeds Open Graph and Twitter descriptions,
the old direct-Apple claims must not remain in generated metadata.

**Verify**: all named pages return HTTP 200; view-source search finds the new
wording and no old wording; the resume opens and is the approved corrected PDF.

## Test plan

- Exact-string searches for all old direct-employment/direct-contract phrases.
- `npm run verify` under Node 22.
- Vercel preview inspection at desktop and mobile widths for project headers,
  client grid spacing after logo removal, and resume download.
- Inspect title/description/Open Graph/Twitter metadata for both project pages.

## Done criteria

- [ ] Rainbow Stage names Magnit Global and says contractor at Apple Inc.
- [ ] Apple Campaigns names Magnit Global and says contractor at Apple Inc.
- [ ] About copy uses contract-project language.
- [ ] Apple logo is removed from the client rotation unless written approval is documented.
- [ ] The hosted resume is replaced only with an approved correction of the attached PDF.
- [ ] `npm run verify` and preview smoke tests pass.
- [ ] No framework, dependency, DNS, or Vercel runtime change is mixed into this release.
- [ ] `plans/README.md` status row updated.

## STOP conditions

Stop and report if:

- Anyone asks the executor to attribute another Apple engagement to Magnit
  without confirmation.
- The corrected attached resume is not approved or cannot be located.
- Removing the Apple logo breaks the client carousel layout and requires a
  component redesign; report it for a separate UI change.
- Public display rights for the internal Rainbow Stage video are questioned.
  The Marcom email does not answer that separate confidentiality/licensing issue.
- Any verification or preview route fails twice.

## Maintenance notes

- Use `Contract Photographer`, not `Independent Contract Photographer`, unless
  a legal document specifically requires the latter.
- Portfolio credit can name Apple Inc. as the supported company/client context;
  it must not present Apple as the employer.
- Keep the approved resume in the repo or use a versioned asset URL so the site
  and resume cannot silently drift apart.

## Verification record — 2026-08-19

- Website copy implemented in commit `31c2da9` on
  `advisor/003-marcom-copy`.
- Vercel preview reached Ready at
  `https://colindelehanty-73gwhdpci-colin-delehanty.vercel.app`.
- Vercel built 19 static pages with Node 22 and `@astrojs/vercel/static`.
- Browser smoke tests passed for `/`, `/work`, `/about`, `/archives`,
  `/work/rainbow-stage`, and `/work/apple-campaigns`.
- Preview metadata contains the new contract wording; the old direct-Apple
  claims are absent. The About page no longer loads `about/apple.svg`, and the
  four-tile client layout remains intact.
- The protected Rainbow Stage Vimeo embed still requires its password.
- Local `npm run build` passed. The planned `npm run verify` script does not
  exist because Plan 002 is still pending. The existing `npm run tsc` also
  fails on the repository's pre-existing TypeScript/Astro configuration mismatch;
  neither issue was changed in this content-only branch.
- Step 4 was cleared on 2026-08-19. The operator supplied and approved the
  corrected, versioned Cloudinary PDF at
  `https://res.cloudinary.com/dzsswr2ti/image/upload/v1787202081/ColinDelehanty_Resume.pdf`.
  Both pages were rendered and inspected, the Magnit/Apple wording was verified,
  and both website resume links were updated to that immutable version.
- The final preview reached Ready at
  `https://colindelehanty-4xt05zerl-colin-delehanty.vercel.app`. Both About-page
  resume links resolve to the corrected PDF, which returns HTTP 200 with
  `Content-Type: application/pdf`.
- Production deployment `dpl_3r1pDx1JttP2j5ryoUeTWtBt5kAH` reached Ready from
  main commit `f83794a`. Browser checks on `https://www.colindelehanty.com`
  passed for `/`, `/work`, `/about`, `/archives`, `/work/rainbow-stage`, and
  `/work/apple-campaigns`; both project pages contain the approved wording and
  neither contains the old direct-Apple claims.
