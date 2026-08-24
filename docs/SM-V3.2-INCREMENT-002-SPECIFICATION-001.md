Document ID: SM-V3.2-INCREMENT-002-SPECIFICATION-001

Title: Situation Monitor v3.2 Increment 002 Specification

Version: v0.2.0

Status: Approved / Implemented

Product: Situation Monitor

Target Release: v3.2.0

Increment: 002

Created: 2026-06-23T00:30:00Z

Last Updated: 2026-06-23T02:10:00Z

Timezone: UTC

Status Note:

Increment 002 was implemented in Situation Monitor v3.2.0. OD-001 controls this increment over the earlier 0-3 review recommendation. Default startup remains World Map + 11 curated cities + 0 configurable cities. The approved 2-6 configurable city range is the useful operating range, not a forced startup floor.

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

v0.2.0

2026-06-23T02:10:00Z

Updated OD-001 configurable city boundary.

Changed configurable city range from 0–3 to 2–6.

Added Dashboard Capacity Model.

Added Founder Validation Evidence.

Recorded OD-001 Resolution.

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
* Support for 2–6 configurable cities

while preserving:

* 11 curated cities
* Existing weather functionality
* Existing AQI functionality
* Existing map functionality
* Existing temporary inspection functionality

⸻

Dashboard Capacity Model

Minimum Configuration:

World Map

plus

2 monitored locations

equals

3 dashboard cells.

Default Configuration:

World Map

plus

11 curated cities

equals

12 dashboard cells.

Maximum Configuration:

World Map

plus

11 curated cities

plus

6 configurable cities

equals

18 dashboard cells.

The 18-cell maximum supports a visually balanced three-row layout on desktop and remains usable on validated mobile layouts.

⸻

OD-001 Resolution

Decision:

APPROVED

Decision Authority:

Founder Approval

Approved Dashboard Capacity:

Minimum:

Map + 2 monitored locations

Maximum:

Map + 11 curated cities + 6 configurable cities

Approved Configurable City Range:

2–6 configurable cities

Review Recommendation:

0–3 configurable cities

Final Founder Decision:

2–6 configurable cities

Rationale:

The primary useful scenario requires at least two monitored user locations, such as home and destination.

Founder usability validation confirmed that the maximum dashboard configuration remains readable and operational on:

* Desktop browser
* iPhone portrait
* iPhone landscape

⸻

Founder Validation Evidence

Founder validation confirmed that the proposed maximum capacity preserves usability across:

* Mac desktop browser
* iPhone portrait
* iPhone landscape

Observation:

The current default dashboard uses:

* World Map
* 11 curated cities

for a 12-cell layout.

The approved maximum uses:

* World Map
* 11 curated cities
* 6 configurable cities

for an 18-cell layout.

This preserves a balanced dashboard structure while supporting practical user scenarios.

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

2–6 configurable cities.

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
* Configurable city range supports 2–6 configurable cities.
* Maximum dashboard capacity supports 18 cells.

Regression Acceptance:

* Existing weather functionality remains operational.
* Existing AQI functionality remains operational.
* Existing map functionality remains operational.
* Existing temporary inspection functionality remains operational.
* Existing validated user workflows remain operational.
* Desktop usability remains acceptable at maximum capacity.
* iPhone portrait usability remains acceptable at maximum capacity.
* iPhone landscape usability remains acceptable at maximum capacity.

Validation Acceptance:

* Governance workflow followed.
* Review chain completed.
* Approval chain completed.
* Validation evidence recorded.
* Regression evidence recorded.
* Human approval recorded.
* OD-001 decision recorded.

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

Resolved Questions

OQ-001

How are configurable cities represented in the UI?

Resolution:

Configurable cities are added through the existing map temporary inspection + Save workflow and rendered as secondary configurable city cards. The curated 11-city dashboard remains primary.

OQ-002

How is restore-default behavior exposed?

Resolution:

The Reset control clears configurable city state and v1/v2 localStorage, returning the dashboard to the curated 11-city default.

OQ-003

What exact layout behavior is used at maximum city count?

Resolution:

Maximum capacity is 18 dashboard cells: World Map + 11 curated cities + 6 configurable cities. Desktop, iPhone portrait and iPhone landscape usability were validated.

OQ-004

Does Increment 002 strengthen or weaken governed repeatability evidence?

Resolution:

Increment 002 strengthened governed repeatability evidence. The outcome is recorded in ADR-006 and REGRESSION.md with smoke 29/29, Playwright 24/24 and three-device validation evidence.

⸻

Expected Outcome

Increment 002 completes the approved city-management capability originally defined for Situation Monitor v3.2.0 while preserving product identity, governance integrity and regression protection.

Successful completion strengthens Validation #002 evidence without introducing unapproved scope expansion.
