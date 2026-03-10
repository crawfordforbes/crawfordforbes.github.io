---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 4 — Hex Feature Improvements

## Title 
[4.1] Remove Unjustified Memoization in Hex Components

## Summary
`Hex.tsx` wraps every local variable in `useMemo` or `useCallback` — including trivial operations like string `.trim()` and plain object literals — and memos are stacked on already-memoized values ("double memoization"). `HexGridLayout.tsx` memoizes a props object being passed to a child that is already wrapped in `memo()`, making the outer `useMemo` redundant. Remove the memoization that has no measurable benefit; keep what is justified.

## Affected Files
- `src/features/hexes/Hex.tsx`
- `src/features/hexes/HexGridLayout.tsx`

## Acceptance Criteria
- [ ] `useMemo` wrapping trivial string `.trim()` call removed from `Hex.tsx`
- [ ] `useMemo` wrapping a plain CSS variables object literal removed from `Hex.tsx`
- [ ] Double-memoization (memo wrapping already-memoized value) removed from `Hex.tsx`
- [ ] `useMemo` for the props object passed to the `memo()`-wrapped `HexGrid` removed from `HexGridLayout.tsx`
- [ ] Hex grid renders correctly and visually unchanged after the cleanup
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 4](../ROADMAP.md#phase-4--hex-feature-improvements)

---

---
name: Cleanup Task
about: A scoped cleanup item tracked against the roadmap
---

## Phase
Phase 4 — Hex Feature Improvements

## Title
[4.2] Add Documentation to Hex Feature Files

## Summary
`hex-SVG-coords-converter.ts` is 800+ lines of hardcoded SVG coordinate mappings with no explanation of what the data is, where it comes from, or why it is static. `HexGridLayout.tsx` and `HexRow.tsx` implement a non-obvious layout model with no inline documentation. Add comments to make the intent clear to any engineer reading the code.

## Affected Files
- `src/utils/hex-SVG-coords-converter.ts`
- `src/features/hexes/HexGridLayout.tsx`
- `src/features/hexes/HexRow.tsx`

## Acceptance Criteria
- [ ] File-level comment added to `hex-SVG-coords-converter.ts` explaining what the coordinate table is, where the values come from, and why they are pre-computed static data
- [ ] Inline comments added to `HexGridLayout.tsx` explaining the layout model
- [ ] Inline comments added to `HexRow.tsx` explaining the layout model
- [ ] No logic changes — documentation only
- [ ] Build passes with no TypeScript errors

## Context
[docs/ROADMAP.md — Phase 4](../ROADMAP.md#phase-4--hex-feature-improvements)
