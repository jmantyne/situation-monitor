SM-V3.2-SPECIFICATION-001

Title: Situation Monitor v3.2 Specification
Version: v0.2.0
Status: Completed / Superseded by Increment 002 closure artifacts
Product: Situation Monitor
Target Release: v3.2
Validation Activity: Validation #002
Validation Target: Governed Repeatability
Owner: Jussi Mantynen

Closure Note:

Situation Monitor v3.2 was delivered through Increment 001 and Increment 002. This parent specification remains the v3.2 umbrella specification. Final delivery and validation closure are recorded in SM-V3.2-INCREMENT-002-SPECIFICATION-001, SM-V3.2-INCREMENT-002-IMPLEMENTATION-RECORD, ADR-006 and REGRESSION.md.

# 1. Purpose

This specification defines the approved scope, requirements, acceptance criteria, governance requirements, and validation requirements for Situation Monitor v3.2.

The specification serves two purposes:

1. Product Specification
2. Validation #002 Evidence Instrument

Product Success and Validation Success shall be evaluated separately.

# 2. Validation Context

Validation Activity: Validation #002

Validation Target: Governed Repeatability

Validation Vehicle: Situation Monitor v3.2

Purpose:

Determine whether the approved governance model can successfully execute a second comparable product delivery cycle.

Validation #002 does not attempt to validate:

* ATR
* Conductor
* Product Factory
* Operator Independence
* Scaled Repeatability

Both strengthening and weakening evidence are valid outcomes.

# 3. Scope Statement

Situation Monitor v3.2 delivers:

A user-configurable monitored city list that allows users to:

* Add monitored cities
* Remove monitored cities
* Persist configured city lists
* Operate with a variable city count

while preserving:

* Product identity
* Security posture
* Governance model
* Validation model

# 4. Exclusion Boundary

Out of Scope:

* Cloud synchronization
* User accounts
* Authentication
* Paid API integrations
* Forecast functionality
* Historical trend functionality
* Radar overlays
* Alert systems
* Native iOS functionality
* Native macOS functionality
* ATR concepts
* Conductor concepts
* Product Factory concepts
* Cross-device synchronization
* Major UI redesign

Any excluded item requires a new proposal and explicit approval.

# 5. User Stories

US-001: Add monitored city

US-002: Remove monitored city

US-003: Persist configured city list across refresh

US-004: Support variable monitored city count

US-005: Preserve existing monitoring functionality

US-006: Preserve default curated city list

# 6. Functional Requirements

FR-001 User can add a monitored city.

FR-002 User can remove a monitored city.

FR-003 Configured city list persists across refresh.

FR-004 Variable city count is supported.

FR-005 Default curated city list remains available.

FR-006 Weather functionality continues for active monitored cities.

FR-007 AQI functionality continues for active monitored cities.

FR-008 Time and clock functionality continues for active monitored cities.

FR-009 Map functionality continues for active monitored cities.

FR-010 Home-city behavior continues to function.

FR-011 Duplicate monitored-city entries are prevented.

FR-012 Unsupported or invalid city selections are handled safely.

FR-013 User can restore the default curated city list.

FR-014 Approved city count range shall be defined before implementation completion.

# 7. Non-Functional Requirements

NFR-001 Existing security posture is preserved.

NFR-002 No backend required.

NFR-003 No authentication required.

NFR-004 No paid APIs required.

NFR-005 No unapproved API domains introduced.

NFR-006 Previously validated Mac Desktop Browser experience remains valid.

NFR-007 Previously validated iPhone Portrait experience remains valid.

NFR-008 Previously validated iPhone Landscape experience remains valid.

NFR-009 Desktop usability remains acceptable within approved city-count range.

NFR-010 Mobile usability remains acceptable within approved city-count range.

NFR-011 Curated monitoring identity is preserved.

NFR-012 Compatible with Validation #002 governance model.

# 8. Regression Protection Requirements

RPR-001 Default curated city list loads correctly.

RPR-002 Existing weather data renders correctly.

RPR-003 Existing AQI data renders correctly.

RPR-004 Existing monitoring fields render correctly.

RPR-005 Existing map functions correctly.

RPR-006 Temporary inspection overlay functions correctly.

RPR-007 Temporary inspection remains separate from monitored-city behavior unless explicitly approved.

RPR-008 Existing refresh cycle functions correctly.

RPR-009 Security posture remains intact.

RPR-010 Smoke tests updated and passing.

RPR-011 Playwright tests updated and passing.

RPR-012 Pre-commit validation updated and passing.

RPR-013 No unintended API domains introduced.

RPR-014 No persistence beyond approved scope introduced.

RPR-015 Previously validated Mac Desktop Browser experience remains valid.

RPR-016 Previously validated iPhone Portrait experience remains valid.

RPR-017 Previously validated iPhone Landscape experience remains valid.

RPR-018 Previously validated user workflows remain valid unless explicitly changed through approved scope.

# 9. Acceptance Criteria

## 9.1 Functional Acceptance

* User can add monitored cities.
* User can remove monitored cities.
* Configured city list persists across refresh.
* Variable city count works.
* Default curated list remains available.
* Existing monitored-city functionality remains operational.
* Duplicate entries prevented.
* Invalid city selections handled safely.

## 9.2 Regression Acceptance

* No approved v3.1 capability is lost.
* Dashboard remains usable.
* Monitoring functions remain operational.
* Security assumptions remain valid.
* Regression tests pass.
* Previously validated desktop and mobile experiences remain valid.
* Previously validated workflows remain valid.

## 9.3 Validation Acceptance

* Governance workflow followed.
* Review chain completed.
* Approval chain completed.
* Implementation decisions recorded before implementation.
* Validation evidence collected.
* Regression evidence collected.
* Human findings recorded.
* AI findings recorded.
* Final repeatability assessment produced.

## 9.4 Identity Preservation

* Product remains a curated situation-awareness dashboard.
* Default curated city list remains part of the product.
* Product does not become a generic weather dashboard.
* Situation Monitor identity remains recognizable.

# 10. Governance Requirements

## 10.1 Governance Context

Governed by:

* HARNESS v0.0.7
* VALIDATION-MATURITY-MODEL-001 v0.0.2
* DOCUMENT-AUTHORITY-INDEX
* Validation #002

Human remains final approval authority.

## 10.2 Change Classification

Change Validation Category shall be declared before execution begins.

## 10.3 Participant Assignments

Production, review, validation, challenge, and approval roles shall be assigned before execution begins.

Self-validation is not permitted.

## 10.4 Approval Gates

AG-001 Specification Approval

AG-002 Implementation Approval

AG-003 Pre-Commit Approval

AG-004 Release Approval

## 10.5 Evidence Requirements

Evidence shall be produced for:

* Review
* Validation
* Regression
* Approval
* Release
* Repeatability Assessment

## 10.6 Approval Readiness Chain

Request
→ Artifact
→ Review
→ Evidence
→ Human Decision
→ Repository Record

Missing links block approval.

## 10.7 Traceability

Approval-critical artifacts must be repository-traceable and survive session changes.

# 11. Definition of Done

v3.2 is complete when:

* Approved scope delivered
* Functional Acceptance passes
* Regression Acceptance passes
* Validation Acceptance passes
* Identity Preservation passes
* Governance Requirements satisfied
* Evidence collected
* Human approval granted
* Release artifacts recorded
* Validation #002 evidence package exists

# 12. Success Criteria

* Approved scope delivered
* Users can configure monitored city list
* Configuration persists
* Existing capabilities continue to function
* Governance workflow executed successfully
* Validation evidence collected
* Product assessment completed
* Validation assessment completed

# 13. Failure Criteria

* Approved scope not delivered
* Regression requirements fail
* Governance evidence missing
* Approval chain broken
* Validation chain broken
* Scope expansion without approval
* Traceability requirements not satisfied
* Validation evidence insufficient for assessment
* Previously validated user experiences broken without approval

# 14. Evidence Requirements

ER-001 Approved Scope Artifact

ER-002 Review Artifacts

ER-003 Validation Artifacts

ER-004 Regression Evidence

ER-005 Approval Records

ER-006 Release Evidence

ER-007 Repeatability Assessment

ER-008 Platform-History Update

ER-009 Metrics Collection

ER-010 Founder Involvement Observations

# 15. Metrics Collection

The following metrics shall be recorded:

* Review findings count
* Human findings count
* AI findings count
* Rework count
* Approval iterations
* Scope deviations
* Governance anomalies

# 16. Founder Involvement Observations

Record:

* Activities performed by Jussi
* Activities performed by the platform
* Activities requiring human synthesis
* Activities that could not be delegated

# 17. Validation #002 Declaration

Validation #002 exists to collect evidence that strengthens or weakens the Governed Repeatability hypothesis.

Product Success and Validation Success shall be assessed separately.

# 18. Product Assessment

Question:

Did v3.2 succeed as a product release?

Assessment completed at release.

# 19. Validation Assessment

Question:

Did v3.2 strengthen or weaken Governed Repeatability evidence?

Assessment completed at release.

# 20. Resolved Questions

* Does v3.2 strengthen repeatability evidence?

  Resolved: Yes. ADR-006 records that v3.2 strengthened governed repeatability evidence by running the multi-model governance pipeline end-to-end a second time on a harder data-model migration.

* What governance observations were recorded?

  Resolved: ADR-006 records the governance observations: role-defined and model-agnostic pipeline structure, human decision authority over review consensus, HARNESS as an active governance step and Occam's Razor as a documentation-governance principle.

* What operational-awareness observations were recorded?

  Resolved: Increment 002 delivered configurable monitoring locations while preserving the curated Situation Monitor identity. ADR-006 and BACKLOG.md record the future user-managed curated set as a deliberately deferred capability.

* What founder-dependency observations were recorded?

  Resolved: ADR-006 records that delivery remained human-coordinated end to end. Validation #002 confirmed governed repeatability in a one-operator model; it did not validate automated coordination or operator independence.

* What evidence remains missing for future maturity advancement?

  Resolved: ATR, Conductor, Product Factory, Operator Independence and Scaled Repeatability remain explicitly out of scope for Validation #002 and remain future maturity targets.

# 21. Change Log

v0.2.1

* Closure status recorded after v3.2 Increment 002 delivery
* Open Questions resolved through ADR-006, REGRESSION.md and Increment 002 implementation record
* Parent specification retained as umbrella specification, not final implementation record

v0.2.0

* First complete draft generated
* Gap Analysis findings incorporated
* Metrics collection added
* Founder involvement observations added
* Default curated list recovery added
* Product and Validation assessments separated
