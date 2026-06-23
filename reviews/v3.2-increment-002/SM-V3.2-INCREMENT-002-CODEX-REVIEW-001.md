Read-only review completed. I did not modify or create files.

**1. Scope Alignment**

Increment 002 is broadly aligned with the v3.2 scope and decisions: it preserves `11 curated + 0-3 configurable cities`, matching [decisions/SM-V3.2-IMPLEMENTATION-DECISIONS-001.md](/Users/jmantyne/Projects/Situation-Monitor/situation-monitor/decisions/SM-V3.2-IMPLEMENTATION-DECISIONS-001.md:104) and the increment spec’s scope in [docs/SM-V3.2-INCREMENT-002-SPECIFICATION-001.md](/Users/jmantyne/Projects/Situation-Monitor/situation-monitor/docs/SM-V3.2-INCREMENT-002-SPECIFICATION-001.md:90).

Main alignment gap: the spec still leaves three implementation-critical questions open: UI representation, restore-default exposure, and max-count layout behavior in [docs/SM-V3.2-INCREMENT-002-SPECIFICATION-001.md](/Users/jmantyne/Projects/Situation-Monitor/situation-monitor/docs/SM-V3.2-INCREMENT-002-SPECIFICATION-001.md:288). Those should be resolved before implementation because the decision doc explicitly exists to prevent implementation-by-assumption.

**2. Implementation Risks**

Highest risk is model ambiguity: current Increment 001 implementation supports one saved coordinate point, not a multi-city management model. The code has `let configurableCity = null`, one `CONFIGURABLE_CITY_ID`, and one storage key in [situation-monitor.html](/Users/jmantyne/Projects/Situation-Monitor/situation-monitor/situation-monitor.html:991). Saving a second point replaces the first in [situation-monitor.html](/Users/jmantyne/Projects/Situation-Monitor/situation-monitor/situation-monitor.html:1464).

Duplicate prevention is underspecified. The decision requires duplicate detection by resolved city identity, not display name, but Increment 002 does not define how identity is resolved for map-selected coordinate points or supported city selections.

Unsupported city handling is also underspecified. If “unsupported city” means arbitrary user-entered city names, that implies geocoding or a supported-city catalog. Geocoding domains are currently excluded by the smoke test in [tests/smoke.js](/Users/jmantyne/Projects/Situation-Monitor/situation-monitor/tests/smoke.js:22).

**3. Regression Risks**

The architecture still documents `City cards x 11` in [docs/ARCHITECTURE.md](/Users/jmantyne/Projects/Situation-Monitor/situation-monitor/docs/ARCHITECTURE.md:73), while Increment 002 allows up to 14 monitored cards. That is acceptable as an implementation evolution, but it means layout and documentation need coordinated updates.

The harness guardrail says city count equals 11 in [docs/HARNESS.md](/Users/jmantyne/Projects/Situation-Monitor/situation-monitor/docs/HARNESS.md:66). If the pre-commit hook still enforces that literally against total rendered city definitions, Increment 002 may be blocked or tempt a weakening of a historic guardrail.

Temporary inspection separation is a sensitive regression point. The decision says temporary inspection must remain separate unless explicitly added through an approved add action. The current save button converts inspection into persistent config. Increment 002 should clarify whether that remains the add path or whether a new city-management UI owns add/remove.

**4. Product Identity Risks**

Medium identity risk. The spec says configurable cities extend but do not replace the curated dashboard in [docs/SM-V3.2-INCREMENT-002-SPECIFICATION-001.md](/Users/jmantyne/Projects/Situation-Monitor/situation-monitor/docs/SM-V3.2-INCREMENT-002-SPECIFICATION-001.md:147), and the decision doc reinforces the 11 curated cities as primary in [decisions/SM-V3.2-IMPLEMENTATION-DECISIONS-001.md](/Users/jmantyne/Projects/Situation-Monitor/situation-monitor/decisions/SM-V3.2-IMPLEMENTATION-DECISIONS-001.md:82).

The risk is UX drift: if adding cities becomes free-form search, restore controls, duplicate messages, unsupported-city errors, and list management can make the app feel like a generic weather dashboard. The implementation should make the 11 curated cities visually and structurally primary, with configurable cities clearly secondary.

**5. Missing Acceptance Criteria**

Missing or too vague:

- Exact add mechanism: map-save, city picker, typed input, or supported catalog.
- Exact supported-city definition and unsupported-city failure behavior.
- Duplicate identity rule examples: curated duplicate, configurable duplicate, near-identical coordinate point, same city with different label.
- Max count behavior at 14 cards: what happens on fourth add attempt.
- Restore default semantics: does it clear all configurable cities only, reset corrupted storage, remove inspection state, or all of the above.
- Persistence migration from Increment 001 `situation-monitor.configurableCity.v1`.
- Layout acceptance for desktop, iPhone portrait, and iPhone landscape at 11, 12, 13, and 14 cards.
- Explicit time/clock acceptance, which exists in baseline v3.2 FR-008 in [docs/specifications/SM-V3.2-SPECIFICATION-001.md](/Users/jmantyne/Projects/Situation-Monitor/situation-monitor/docs/specifications/SM-V3.2-SPECIFICATION-001.md:111) but is absent from Increment 002 acceptance.

**6. Required Test Updates**

Smoke tests need to move from single-city assertions to bounded list assertions. Current smoke checks expect one `CONFIGURABLE_CITY_ID`, one storage key, and one display helper in [tests/smoke.js](/Users/jmantyne/Projects/Situation-Monitor/situation-monitor/tests/smoke.js:21).

Playwright needs new coverage for:

- 0, 1, 2, and 3 configurable cities.
- Fourth add attempt fails safely.
- Duplicate curated city prevented.
- Duplicate configurable city prevented.
- Unsupported city fails without changing existing config.
- Restore default clears configurable cities and returns to 11 curated cards.
- Reload persists multiple configurable cities.
- Existing Increment 001 temporary inspection tests still pass.
- Desktop, portrait, and landscape visual/layout checks at 14 cards.

Existing Playwright tests currently encode “second save replaces existing configurable city” in [tests/situation-monitor.spec.js](/Users/jmantyne/Projects/Situation-Monitor/situation-monitor/tests/situation-monitor.spec.js:213), which conflicts with Increment 002’s 0-3 configurable city target.

**7. Recommended Increment 002 Implementation Order**

1. Resolve the three open questions in the increment spec before code starts.
2. Define the configurable-city data model and storage migration path from Increment 001.
3. Add tests first for 0-3 count, duplicate prevention, unsupported failure, restore default, and persistence.
4. Refactor current single `configurableCity` state into a bounded configurable city list.
5. Implement add/remove/restore behavior with curated cities immutable.
6. Update map markers, clocks, fetch cycle, and card rendering to use `CITIES + configurableCities`.
7. Validate temporary inspection remains separate and only creates monitored cities through the approved add action.
8. Update smoke, Playwright, architecture/regression documentation, and pre-commit expectations.
9. Run automated and manual desktop/portrait/landscape validation and record evidence.

**8. Risk Level**

Medium-high.

The scope is coherent and well bounded, but implementation risk is elevated because the spec leaves key UI/data-model behavior open while the current code and tests are explicitly single-configurable-city. I would not start implementation until UI representation, restore semantics, supported-city identity, and max-layout behavior are approved.
