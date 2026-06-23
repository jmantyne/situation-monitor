Oikein — minun ChatGPT-review puuttui. Tallenna tämä tiedostoon:

reviews/v3.2-increment-002/SM-V3.2-INCREMENT-002-ARCHITECTURE-REVIEW-001.md

Perustuu saatavilla oleviin tiedostoihin: Increment 002 spec, v3.2 spec, implementation decisions ja Increment 001 record.  

Document ID: SM-V3.2-INCREMENT-002-ARCHITECTURE-REVIEW-001

Title: Situation Monitor v3.2 Increment 002 Architecture Review

Version: v0.1.0

Status: Draft

Product: Situation Monitor

Target Release: v3.2.0

Increment: 002

Review Role: Architecture Review

Reviewer: ChatGPT

Created: 2026-06-23T00:45:00Z

Last Updated: 2026-06-23T00:45:00Z

Timezone: UTC

Reviewed Artifact:

SM-V3.2-INCREMENT-002-SPECIFICATION-001

Compared Against:

* SM-V3.2-SPECIFICATION-001
* SM-V3.2-IMPLEMENTATION-DECISIONS-001
* SM-V3.2-INCREMENT-001-IMPLEMENTATION-RECORD

Not Fully Available In This Review Context:

* docs/ARCHITECTURE.md
* docs/HARNESS.md
* REGRESSION.md
* tests/smoke.js
* tests/situation-monitor.spec.js
* situation-monitor.html

⸻

1. Scope Alignment

Result:

PASS WITH OBSERVATIONS

Increment 002 scope aligns with the approved v3.2 direction.

The specification correctly preserves:

* 11 curated cities
* 0–3 configurable cities
* Curated dashboard identity
* Persistence boundary
* Temporary inspection separation
* No cloud sync
* No accounts
* No authentication
* No major UI redesign

The Increment 002 specification correctly expands from Increment 001, which delivered one persistent configurable city, toward the approved city-management model.

No obvious scope expansion was detected.

⸻

2. Implementation Risks

Risk Level:

MEDIUM

Primary implementation risks:

1. Add/remove behavior may accidentally mutate the curated city list.
2. Configurable city persistence may overwrite or conflict with existing Increment 001 persistence behavior.
3. Restore-default behavior may be ambiguous unless it clearly resets configurable city state without altering the canonical curated list.
4. UI controls for adding/removing cities may introduce layout complexity.
5. Unsupported city handling may be difficult if city resolution logic is not clearly bounded.
6. Duplicate prevention requires stable city identity, not display-name comparison alone.

Architectural recommendation:

Keep curated cities and configurable cities as separate data structures.

The rendered dashboard may combine them, but the source model should remain separated.

⸻

3. Regression Risks

Risk Level:

MEDIUM

Main regression risks:

* Existing 11 curated city cards fail to render.
* Weather/AQI/time/map behavior breaks for curated cities.
* Temporary inspection becomes confused with persistent city behavior.
* Local storage schema changes break existing Increment 001 users.
* Mobile layout becomes crowded at 14 total cities.
* Restore-default behavior removes too much state.

Regression protection should focus on:

* Default startup
* Existing curated city behavior
* Increment 001 persistent city behavior
* Add city
* Remove city
* Restore default
* Duplicate city rejection
* Unsupported city rejection
* Maximum city count behavior

⸻

4. Product Identity Risks

Risk Level:

LOW TO MEDIUM

The specification explicitly protects product identity.

The largest identity risk is not the written scope.

The largest identity risk is implementation drift.

Specifically:

* If configurable cities dominate the UI, the product may feel generic.
* If curated cities become removable, the product identity weakens.
* If add-city behavior becomes open-ended, Situation Monitor may become a generic weather dashboard.
* If the map/search interaction becomes primary, the curated dashboard model weakens.

Identity protection recommendation:

The 11 curated cities should remain visually and structurally primary.

Configurable cities should be presented as additions, not replacements.

⸻

5. Missing Acceptance Criteria

The current acceptance criteria are directionally correct but should be strengthened before implementation.

Recommended additions:

AC-002-001

The system shall not allow more than 3 configurable cities.

AC-002-002

The system shall not allow configurable city additions to remove or replace the 11 curated cities.

AC-002-003

Restore default shall restore the original curated configuration and remove configurable city additions unless explicitly decided otherwise.

AC-002-004

Duplicate detection shall use resolved city identity, not display name alone.

AC-002-005

Unsupported city selection shall preserve existing dashboard state.

AC-002-006

Existing Increment 001 persisted configurable city data shall either migrate safely or remain compatible.

AC-002-007

At maximum city count, dashboard layout shall remain usable on:

* Mac desktop browser
* iPhone portrait
* iPhone landscape

⸻

6. Required Test Updates

Required smoke test updates:

* Confirm default curated city count remains 11.
* Confirm adding one configurable city works.
* Confirm adding up to three configurable cities works.
* Confirm adding a fourth configurable city is blocked.
* Confirm removing configurable city works.
* Confirm restore default works.
* Confirm duplicate city is rejected.
* Confirm unsupported city does not break dashboard.

Required Playwright test updates:

* Add-city workflow.
* Remove-city workflow.
* Restore-default workflow.
* Persistence across refresh.
* Duplicate prevention.
* Unsupported city handling.
* Maximum city count rendering.
* Temporary inspection remains separate from monitored-city persistence.

Manual validation updates:

* Mac desktop browser
* iPhone portrait
* iPhone landscape

⸻

7. Recommended Increment 002 Implementation Order

Recommended order:

1. Preflight repository context verification.
2. Read and confirm current Increment 001 persistence implementation.
3. Identify existing curated city source model.
4. Preserve curated city list as immutable canonical baseline.
5. Create configurable city state model supporting 0–3 entries.
6. Implement add-city behavior.
7. Implement duplicate prevention.
8. Implement unsupported city safe-failure behavior.
9. Implement remove configurable city behavior.
10. Implement restore-default behavior.
11. Update persistence logic.
12. Update rendering logic for 11 + 0–3 city composition.
13. Update smoke tests.
14. Update Playwright tests.
15. Run regression validation.
16. Record implementation observations.
17. Create Increment 002 implementation record.

⸻

8. Risk Level

Overall Risk Level:

MEDIUM

Reason:

Increment 002 touches user-facing behavior, persistence, rendering, validation, and regression surface.

However, risk remains manageable because:

* Scope is bounded.
* Maximum configurable city count is limited to 3.
* Curated cities remain primary.
* Increment 001 already established persistence groundwork.
* No backend, account, cloud sync, paid API, or major redesign is included.

⸻

Architecture Review Conclusion

Increment 002 is architecturally valid and aligned with the approved v3.2.0 direction.

The specification is suitable for continued review.

Implementation should not begin until missing acceptance criteria and test expectations are either accepted as additions or explicitly deferred.

Recommended Status:

APPROVED FOR REVIEW CHAIN

Not yet approved for implementation.
