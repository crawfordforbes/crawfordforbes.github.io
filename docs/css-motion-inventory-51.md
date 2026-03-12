# CSS Motion Inventory — Issue #51

Summary
-------
Audit of CSS files under `src/` that contain `transition`, `animation`, or `transform` declarations.

This inventory lists each matched file with a single representative line (file:line) showing a matched declaration.

Note: This is an audit-only change (no code edits to runtime files).

NOTE FOR REVIEWERS
------------------

Planned small commits by feature area (one commit per branch). Each commit
will add concise `@media (prefers-reduced-motion: reduce)` overrides for the
listed selectors in that feature's CSS so motions are disabled or replaced
with simple opacity/instant fallbacks.

- Branch: fix/issue-52-prefers-reduced-motion-animations
	- Files: `src/app/styles/animations.css`, `src/app/styles/core-styles.css`
	- Purpose: disable long-running keyframes (e.g. `titleGlow`, `loading`)

- Branch: fix/issue-52-prefers-reduced-motion-headers
	- Files: `src/components/panels/styles/hexHeader.css`, `src/components/panels/styles/hero.css`, `src/components/panels/styles/introPanel.css`
	- Purpose: stop `gradientAngleSpin` and related animated gradients. Note: introPanel gradients will remain but use a fixed 60deg angle under reduced-motion.

- Branch: fix/issue-52-prefers-reduced-motion-projects
	- Files: `src/features/projects/styles/projectResult.css`, `src/features/projects/styles/projectIndex.css`, `src/features/projects/styles/projectDetail.css`, `src/features/projects/styles/projectFilter.css`, `src/features/projects/styles/ProjectNotFound.css`, `src/features/projects/styles/splide.min.css`
	- Purpose: disable card hover animations, gradient spins, and slider transitions; replace with simple opacity or instant state changes.

- Branch: fix/issue-52-prefers-reduced-motion-global-ui
	- Files: `src/components/global/styles/badge.css`, `src/components/global/styles/nav.css`, `src/components/global/styles/optimized-image.css`, `src/components/global/styles/errorBoundary.css`
	- Purpose: remove hover scaling/transforms and color transition timing, disable loading keyframes for skeletons.

- Branch: fix/issue-52-prefers-reduced-motion-hexes
	- Files: `src/features/hexes/styles/hex.css`, `src/features/hexes/styles/hexSvgFills.css`, `src/features/hexes/styles/hexWrappers.css`
	- Purpose: disable hover scale, `titleGlow` on logo, and `transition: fill` animations.

Style notes applied across commits:
- `introPanel.css`: gradients will be fixed to a 60deg angle under reduced-motion.
- `titleGlow` fallback: use explicit text shadow instead of animation:
	`text-shadow: var(--shade-4) 1px 1px, var(--shade-4) -1px -1px, var(--shade-4) -1px 1px, var(--shade-4) 1px -1px;`

If this looks good I will create the first small branch and implement the changes.

Inventory
---------

- [src/components/panels/styles/hexHeader.css](src/components/panels/styles/hexHeader.css#L9): transform: translateX(-50%);
- [src/components/panels/styles/hexHeader.css](src/components/panels/styles/hexHeader.css#L76): animation: gradientAngleSpin 198s ease infinite;
- [src/features/projects/styles/projectResult.css](src/features/projects/styles/projectResult.css#L66): animation: gradientAngleSpin 36s ease infinite;
- [src/features/projects/styles/projectResult.css](src/features/projects/styles/projectResult.css#L70): transition: opacity var(--transition-rules-slow), filter var(--transition-rules-slow);
- [src/components/panels/styles/introPanel.css](src/components/panels/styles/introPanel.css#L34): transition: background-image var(--transition-rules);
- [src/features/projects/styles/projectIndex.css](src/features/projects/styles/projectIndex.css#L44): transition: opacity 320ms ease;
- [src/app/styles/shared-content.css](src/app/styles/shared-content.css#L11): transition: left 0.2s;
- [src/app/styles/animations.css](src/app/styles/animations.css#L8): @keyframes titleGlow (animation definitions)
- [src/components/panels/styles/textPanel.css](src/components/panels/styles/textPanel.css#L10): transition: max-height var(--transition-rules-slow);
- [src/components/panels/styles/hero.css](src/components/panels/styles/hero.css#L62): animation: titleGlow 16s ease infinite;
- [src/app/styles/vars.css](src/app/styles/vars.css#L92): --transition-rules: .3s ease-out;
- [src/app/styles/core-styles.css](src/app/styles/core-styles.css#L58): animation-duration: 0.01ms !important; (reduced-motion rule)
- [src/components/panels/styles/footer.css](src/components/panels/styles/footer.css#L35): transform: translateX(-50%);
- [src/components/global/styles/badge.css](src/components/global/styles/badge.css#L65): transition: color var(--transition-rules);
- [src/components/global/styles/errorBoundary.css](src/components/global/styles/errorBoundary.css#L158): transition: var(--transition-rules);
- [src/features/hexes/styles/hex.css](src/features/hexes/styles/hex.css#L117): transform: translateX(-50%);
- [src/features/hexes/styles/hexSvgFills.css](src/features/hexes/styles/hexSvgFills.css#L98): animation: titleGlow 16s ease infinite;
- [src/components/global/styles/nav.css](src/components/global/styles/nav.css#L38): transition: background-color var(--transition-rules), color var(--transition-rules);
- [src/components/global/styles/optimized-image.css](src/components/global/styles/optimized-image.css#L14): transform: translateZ(0); /* GPU acceleration */
- [src/features/hexes/styles/hexWrappers.css](src/features/hexes/styles/hexWrappers.css#L37): transform: scale(1.02);
- [src/app/routes/styles/NotFound.css](src/app/routes/styles/NotFound.css#L53): transition: all 0.2s ease;
- [src/features/projects/styles/projectDetail.css](src/features/projects/styles/projectDetail.css#L38): transition: background-color var(--transition-rules), color var(--transition-rules);
- [src/features/projects/styles/projectFilter.css](src/features/projects/styles/projectFilter.css#L38): transition: all var(--transition-rules);
- [src/features/projects/styles/ProjectNotFound.css](src/features/projects/styles/ProjectNotFound.css#L36): transition: all 0.2s ease;
- [src/features/projects/styles/splide.min.css](src/features/projects/styles/splide.min.css#L1): vendor CSS with `animation` / `transform` declarations (minified)
