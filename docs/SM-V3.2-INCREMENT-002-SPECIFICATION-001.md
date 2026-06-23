Document ID: SM-V3.2-INCREMENT-002-SPECIFICATION-001

Title: Situation Monitor v3.2 Increment 002 Specification

Version: v0.1.0

Status: Draft

Product: Situation Monitor

Target Release: v3.2.0

Increment: 002

Created: 2026-06-23T00:30:00Z

Last Updated: 2026-06-23T00:30:00Z

Timezone: UTC

Related Specification:

SM-V3.2-SPECIFICATION-001

Related Decisions:

SM-V3.2-IMPLEMENTATION-DECISIONS-001

Previous Increment:

SM-V3.2-INCREMENT-001-IMPLEMENTATION-RECORD

Owner:

Jussi Mantynen

⸻

Change Log

v0.1.0

2026-06-23T00:30:00Z

Initial Increment 002 specification draft.

⸻

Purpose

Define the approved scope for Situation Monitor v3.2.0 Increment 002.

Increment 001 established persistent configurable city capability.

Increment 002 expands city-management functionality while preserving:

* Curated dashboard identity
* Approved governance boundaries
* Validation #002 integrity
* Existing v3.1.0 capabilities

⸻

Validation Context

Validation Activity:

Validation #002

Validation Target:

Governed Repeatability

Purpose:

Continue collection of evidence related to governed repeatability while maintaining product identity and regression protection.

Validation #002 does not attempt to validate:

* ATR
* Conductor
* Product Factory
* Operator Independence
* Scaled Repeatability

Both strengthening and weakening evidence remain valid outcomes.

⸻

Scope

Increment 002 delivers:

* Add configurable city
* Remove configurable city
* Restore default curated city set
* Duplicate city prevention
* Unsupported city handling
* Support for 0–3 configurable cities

while preserving:

* 11 curated cities
* Existing weather functionality
* Existing AQI functionality
* Existing map functionality
* Existing temporary inspection functionality

⸻

Functional Requirements

FR-002-001

User can add configurable cities.

FR-002-002

User can remove configurable cities.

FR-002-003

User can restore the default curated city configuration.

FR-002-004

Duplicate monitored-city entries are prevented.

FR-002-005

Unsupported city selections fail safely.

FR-002-006

Configurable city count supports:

0–3 configurable cities.

FR-002-007

Configured cities persist across refresh.

FR-002-008

The 11 curated cities remain visible and operational.

FR-002-009

User-configurable cities extend the dashboard but do not replace the curated dashboard.

⸻

Identity Protection Requirements

IPR-001

Situation Monitor remains a curated situation-awareness dashboard.

IPR-002

The 11 curated cities remain the primary experience.

IPR-003

User-configurable cities extend the experience but do not replace it.

IPR-004

The approved Beautiful Presentation objective remains preserved.

IPR-005

Increment 002 shall not transform Situation Monitor into a generic weather dashboard.

⸻

Acceptance Criteria

Functional Acceptance:

* User can add configurable cities.
* User can remove configurable cities.
* Duplicate city creation is prevented.
* Unsupported city selections do not break the dashboard.
* Default curated city configuration can be restored.
* Existing monitoring functionality remains operational.

Regression Acceptance:

* Existing weather functionality remains operational.
* Existing AQI functionality remains operational.
* Existing map functionality remains operational.
* Existing temporary inspection functionality remains operational.
* Existing validated user workflows remain operational.

Validation Acceptance:

* Governance workflow followed.
* Review chain completed.
* Approval chain completed.
* Validation evidence recorded.
* Regression evidence recorded.
* Human approval recorded.

⸻

Out Of Scope

* Cloud synchronization
* User accounts
* Authentication
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

Any excluded item requires explicit approval before implementation.

⸻

Regression Protection

Increment 002 shall not:

* Remove curated cities
* Replace curated dashboard identity
* Break weather functionality
* Break AQI functionality
* Break maps
* Break temporary inspection functionality
* Introduce unapproved API domains
* Introduce persistence beyond approved scope

⸻

Governance Requirements

Governed by:

* HARNESS
* Validation #002
* Approved implementation decisions
* Human approval authority

Human remains final approval authority.

Implementation shall not begin until Increment 002 scope is approved.

⸻

Evidence Requirements

Evidence shall be produced for:

* Review
* Validation
* Regression
* Approval
* Release
* Repeatability Assessment

Approval-critical artifacts must remain repository traceable.

⸻

Definition of Done

Increment 002 is complete when:

* Approved scope delivered
* Functional Acceptance passes
* Regression Acceptance passes
* Validation Acceptance passes
* Identity Protection passes
* Evidence collected
* Human approval granted
* Implementation record created

⸻

Open Questions

OQ-001

How are configurable cities represented in the UI?

OQ-002

How is restore-default behavior exposed?

OQ-003

What layout behavior is used at maximum city count?

OQ-004

Does Increment 002 strengthen or weaken governed repeatability evidence?

⸻

Expected Outcome

Increment 002 completes the approved city-management capability originally defined for Situation Monitor v3.2.0 while preserving product identity, governance integrity and regression protection.

Successful completion strengthens Validation #002 evidence without introducing unapproved scope expansion.

