**Read-only Review: docs/SM-V3.2-INCREMENT-002-SPECIFICATION-001.md**

**Date:** 2026-06-22  
**Mode:** Read-only analysis  
**Baseline:** Main after WP002

### 1. Scope Alignment

**Moderate misalignment.**

The Increment 002 specification moves toward a more configurable city list than what was previously approved and discussed. Earlier decisions (and the spirit of Validation #002) emphasized **temporary, session-only, limited additions** (max ~3 cities) using a floating overlay, while strictly preserving the default 11 curated cities and 12-cell layout.

The current specification appears to allow more persistent or structural configurability than what was considered safe during the identity and scope discussions. This creates a gap between the approved direction and the written specification.

### 2. Implementation Risks

**High risk.**

Key risks include:

- **Layout and visual integrity risk**: Allowing variable numbers of cities (even if limited) can break the carefully balanced 12-cell visual structure.
- **State management risk**: Moving from purely temporary/session-only to any form of persistence significantly increases complexity in a single-file application.
- **Scope creep risk**: The specification opens the door to reordering, custom names, or saved lists, which were previously considered out of scope for v3.2.
- **Mobile/responsiveness risk**: Dynamic city counts will likely require non-trivial responsive adjustments.

### 3. Regression Risks

**Medium-High risk.**

- High chance of breaking the current calm, high-signal presentation if the grid becomes dynamic.
- Risk of introducing new bugs in map interaction and overlay positioning when the number of visual elements changes.
- Potential regression in performance on lower-end devices if city count becomes user-controlled without strict limits.
- Existing smoke tests and Playwright tests will likely need meaningful updates.

### 4. Product Identity Risks

**High risk.**

This is the most concerning area.

The core identity of Situation Monitor has been repeatedly defined as:
- **Curated** (not fully user-configurable)
- **Constrained** (intentional limits)
- **Beautiful and calm** (strong visual harmony)

Increment 002, as currently specified, risks shifting the product toward a more generic configurable dashboard. This directly conflicts with the identity protection principles discussed during Validation #002 and earlier identity reviews. Even "limited configurability" can erode the curated feel if not extremely tightly controlled.

### 5. Missing Acceptance Criteria

Several important areas are missing or underdeveloped:

- Strict limits on maximum additional cities (recommended max 3 temporary)
- Clear rules for temporary vs persistent behavior
- Explicit protection of the default 11 curated cities and 12-cell layout
- Criteria for overlay behavior when city count changes
- Mobile layout behavior under different city counts
- Performance criteria (especially on mobile)
- Clear "out of scope" section (e.g. reordering, saved lists, custom data sources)

### 6. Required Test Updates

Significant test updates will be needed:

- **smoke.js** and **situation-monitor.spec.js** will need new test cases for dynamic city addition/removal.
- Layout and visual regression tests will likely need expansion.
- Mobile viewport tests should be added or strengthened.
- Tests should verify that the default 11 curated cities always remain and behave correctly.
- Overlay positioning and dismissal behavior should be re-tested under varying city counts.

### 7. Recommended Increment 002 Implementation Order

If proceeding, the following order is recommended to minimize risk:

1. **Define hard constraints first** (max additional cities, temporary-only, floating overlay only).
2. **Implement city addition via map tap** (keep it simple and reversible).
3. **Implement overlay behavior** for additional cities.
4. **Add layout safeguards** to protect the 12-cell visual structure.
5. **Update tests** (especially regression and mobile).
6. **Validate product identity** against the curated dashboard principle.
7. **Only then** consider any form of persistence (strongly discouraged for v3.2).

### 8. Risk Level

**Overall Risk: High**

| Category                    | Risk Level | Comment |
|----------------------------|------------|-------|
| Scope Alignment            | Medium     | Drifting from earlier constrained direction |
| Implementation Risk        | High       | Layout + state complexity |
| Regression Risk            | High       | Visual and interaction integrity |
| Product Identity Risk      | **High**   | Most serious concern |
| Missing Acceptance Criteria| High       | Several critical gaps |
| Test Coverage              | High       | Significant updates required |

**Recommendation Summary:**

The current Increment 002 specification carries **high risk** to product identity and visual integrity. It would be safer to either:
- Significantly tighten the specification back toward temporary + limited additions, **or**
- Defer most configurability work and keep v3.2 very small (e.g. map zoom/pan improvements only).

Would you like me to also review the specification against the earlier identity protection principles discussed during Validation #002?:wq!
