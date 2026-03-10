---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 2 — Analytics Simplification

## Title
[2.1] Replace AnalyticsManager with Minimal GA4 Module

## Summary
`src/utils/analytics.ts` is a 400-line `AnalyticsManager` class containing event queuing, performance tracking, error tracking, GTM helpers, and Sentry integration — almost none of which is used. Replace it with a minimal ~30-line GA4 module that only does what is actually needed: initialize GA4 and track pageviews.

## Affected Files
- `src/utils/analytics.ts` (rewrite)
- `src/app/Main.tsx` (update call-sites)

## Acceptance Criteria
- [ ] `src/utils/analytics.ts` replaced with a module of ~30 lines or fewer
- [ ] Rewritten module exports `initialize()` and `trackPageView()`
- [ ] GA4 measurement ID preserved in the rewritten module
- [ ] `AnalyticsManager` class removed
- [ ] Event queue removed
- [ ] `trackError` removed
- [ ] `trackPerformance` removed
- [ ] GTM helpers removed
- [ ] Sentry hooks removed
- [ ] Call-sites in `src/app/Main.tsx` updated to use the new module API
- [ ] No other files import symbols that no longer exist
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 2](../ROADMAP.md#phase-2--analytics-simplification)
