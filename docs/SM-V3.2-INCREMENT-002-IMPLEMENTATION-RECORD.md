Document ID: SM-V3.2-INCREMENT-002-IMPLEMENTATION-RECORD

Version: v1.0.0

Status: Implementation Record

Product:

Situation Monitor

Increment:

v3.2 Increment 002

Scope:

11 curated cities + 0-6 persistent configurable cities

Related Specification:

SM-V3.2-INCREMENT-002-SPECIFICATION-001 v0.2.0

Related ADR:

ADR-006

---

Findings

Increment 002 expanded the Increment 001 singleton configurable-city model into a bounded configurable-city collection.

The curated CITIES array remains fixed at 11 entries.

Configurable cities are stored separately from the curated city list.

Default startup remains World Map + 11 curated cities + 0 configurable cities.

Configurable cities are added through the existing map temporary inspection + Save workflow.

Temporary inspection remains separate from monitored configurable city behavior unless explicitly saved.

Each configurable city can be removed individually.

Restore default clears configurable city state and storage, returning to the 11 curated cities.

No geocoding was added.

No search box was added.

No new API domains were added.

---

Boundary Override

SM-V3.2-IMPLEMENTATION-DECISIONS-001 records the earlier 0-3 configurable-city boundary.

SM-V3.2-INCREMENT-002-SPECIFICATION-001 v0.2.0 records OD-001 founder approval for 2-6 configurable cities and controls Increment 002.

ADR-006 records the human-operator decision to raise the configurable ceiling from 3 to 6 based on cross-device usability evidence.

The approved 2-6 configurable city range is the useful operating range, not a forced startup floor.

Delivered behavior is:

Default:

World Map + 11 curated cities + 0 configurable cities

Maximum:

World Map + 11 curated cities + 6 configurable cities

Maximum dashboard capacity:

18 cells

---

Persistence

Increment 002 uses v2 persistence:

situation-monitor.configurableCities.v2

Increment 002 migrates valid legacy v1 storage:

situation-monitor.configurableCity.v1

Invalid persisted configurable city data fails closed to curated cities only.

Restore default clears both v1 and v2 configurable-city storage.

---

Duplicate Prevention

Duplicate identity is coordinate-based.

Latitude and longitude are rounded to 3 decimals for duplicate comparison.

The implementation rejects:

* configurable-to-configurable duplicates
* configurable-to-curated duplicates

Duplicate rejection does not modify the existing dashboard or storage.

---

Validation

Smoke validation:

PASS

Result:

29/29

Browser validation:

PASS

Result:

24/24

Manual validation:

Mac Desktop Browser:

PASS

iPhone Portrait:

PASS

iPhone Landscape:

PASS

---

Validated Coverage

The Increment 002 validation covered:

* curated CITIES count remains 11
* no new connect-src domains
* no reverse geocoding
* v2 persistence exists
* v1 migration works
* first configurable city save works
* saves up to 6 configurable cities
* seventh save is blocked safely
* duplicate configurable city save is rejected safely
* curated-coordinate duplicate save is rejected safely
* configurable cities persist after reload
* invalid stored data fails closed
* removing one configurable city works
* restore default returns to 11 curated cities
* temporary inspection remains separate unless saved
* desktop remains usable at 18 cells
* iPhone portrait remains usable at 18 cells
* iPhone landscape remains usable at 18 cells

---

Deviations

The earlier implementation decision boundary of 0-3 configurable cities was overridden by OD-001 in the Increment 002 specification.

No curated city was mutated, removed, reordered or replaced.

No unapproved product scope was added.

---

Increment 002 Closure Status

Increment 002 is implementation-complete and recorded as delivered in:

* REGRESSION.md
* ADR-006
* README.md
* AI-WORKFLOW.md
* docs/ARCHITECTURE.md

Current status:

Released.

Human confirmation:

Production status was confirmed by the Human Operator on 2026-08-25 during the v3.2.2 release-coherence correction.

The original release approval date was not reconstructed.

Historical release relationship:

* v3.2.0 delivered and validated Increment 002 runtime behavior.
* v3.2.1 synchronized the governance baseline without runtime changes.
* v3.2.2 corrected release identity, history and lifecycle-state coherence without runtime changes.
