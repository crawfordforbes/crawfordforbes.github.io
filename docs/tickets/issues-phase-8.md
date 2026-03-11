## [8.1] Add ESLint step to CI
## Title
[8.1] Add ESLint step to CI

## Summary
Add an `npm run lint` step to the existing typecheck workflow so lint failures block the CI check.

## Affected Files
- .github/workflows/typecheck.yml
- package.json

## Acceptance Criteria
- [ ] `.github/workflows/typecheck.yml` contains a step that runs `npm run lint`
- [ ] `package.json` exposes a `lint` script that the workflow can run
- [ ] Lint failures cause the typecheck workflow to fail on CI

## Context
[Phase 8 — CI Quality Gates](../ROADMAP.md#phase-8-ci-quality-gates)

---

## [8.2] Run tests before deploy-pages build
## Title
[8.2] Run tests before deploy-pages build

## Summary
Run `npm test -- --run` as a step in the `deploy-pages` workflow before the build step so failing tests block deployments.

## Affected Files
- .github/workflows/deploy-pages.yml
- package.json

## Acceptance Criteria
- [ ] `deploy-pages.yml` runs `npm test -- --run` before the build step
- [ ] A failing test run causes the deploy job to fail and prevents publishing
- [ ] Test step is documented in CI workflow comments or README

## Context
[Phase 8 — CI Quality Gates](../ROADMAP.md#phase-8-ci-quality-gates)

---

## [8.3] Add bundle-size gate to CI
## Title
[8.3] Add bundle-size gate to CI

## Summary
After `npm run build`, add a bundle-size check that asserts the main chunk remains below a documented threshold to catch accidental large imports.

## Affected Files
- .github/workflows/deploy-pages.yml
- package.json

## Acceptance Criteria
- [ ] The build workflow includes a size-check step that runs after `npm run build`
- [ ] The size-check enforces a maximum main-chunk size and fails CI when exceeded
- [ ] The chosen threshold is documented in the repo (workflow comment, README, or docs)

## Context
[Phase 8 — CI Quality Gates](../ROADMAP.md#phase-8-ci-quality-gates)

---