Document ID: SM-V3.2-IMPLEMENTATION-DECISIONS-001

Version: v1.0.0

Status: Accepted / Partially Superseded by OD-001

Product: Situation Monitor

Target Release: v3.2

Related Specification:

SM-V3.2-SPECIFICATION-001

Related Validation:

Validation #002

Validation Target:

Governed Repeatability

Owner:

Jussi Mantynen

---

Status Note:

Decisions 001-008 were the pre-recorded implementation boundaries for v3.2. Decision 002B recorded the original 0-3 configurable-city boundary. Increment 002 later introduced OD-001 in SM-V3.2-INCREMENT-002-SPECIFICATION-001 v0.2.0, raising the delivered configurable-city ceiling to 6 based on founder validation evidence. The delivered Increment 002 behavior is governed by the Increment 002 specification, ADR-006 and SM-V3.2-INCREMENT-002-IMPLEMENTATION-RECORD.

---

# Purpose

Record implementation decisions required before v3.2 implementation begins.

The purpose of this document is to:

* Prevent implementation-by-assumption
* Protect approved scope
* Protect product identity
* Preserve Validation #002 evidence integrity
* Reduce regression risk

This document records implementation decisions.

It does not contain implementation details.

---

# Decision 001

## Persistence Boundary

### Approved Decision

Persist city-list configuration only.

### Included

* Configured monitored city list

### Explicitly Excluded

* User profiles
* Favorites
* Saved sets
* Cloud synchronization
* Cross-device synchronization
* Accounts
* Authentication state
* Personal preferences unrelated to monitored cities

### Reason

Matches approved v3.2 scope.

Protects product identity.

Minimizes regression surface.

Prevents transition toward v4.0 capabilities.

---

# Decision 002A

## Composition Boundary

### Approved Decision

The 11 curated cities remain the primary and permanent dashboard experience.

User-configurable cities extend the experience.

User-configurable cities do not replace curated cities.

### Reason

Protects the approved product identity.

Preserves comparability with v3.1.

Maintains the curated monitoring model.

---

# Decision 002B

## City Count Boundary

### Approved Decision

Minimum monitored city count:

11

Maximum monitored city count:

14

Composition:

11 curated cities

plus

0–3 configurable cities

### Dependency

This decision is valid only under Decision 002A Composition Boundary.

### Reason

Preserves product identity.

Provides meaningful new capability.

Maintains a bounded regression surface.

Preserves Validation #002 comparability.

---

# Decision 003

## Default Curated List Recovery

### Approved Decision

The default curated city list shall remain recoverable.

A user shall be able to return to the original curated city configuration.

### Reason

The curated city model remains the primary experience.

Protects the original Situation Monitor concept.

---

# Decision 004

## Duplicate City Rule

### Approved Decision

A monitored city may appear only once in the monitored-city list.

Duplicate determination shall be based on resolved city identity.

Display name alone shall not determine duplication.

### Reason

Prevents duplicate monitoring cards.

Provides predictable behavior.

Creates objective validation criteria.

---

# Decision 005

## Unsupported City Behavior

### Approved Decision

Unsupported city selections shall fail safely.

Unsupported city selections shall not affect:

* Existing monitored cities
* Existing user configuration
* Existing dashboard functionality

### Reason

Protects stability.

Protects existing user configuration.

Provides predictable failure behavior.

---

# Decision 006

## Identity Protection Boundary

### Approved Decision

The 11 curated cities remain the primary experience.

User-configurable cities extend the experience but do not replace it.

Situation Monitor remains a curated situation-awareness dashboard.

### Reason

Protect Beautiful Presentation.

Protect curated dashboard identity.

Avoid transition toward generic monitoring products.

---

# Decision 007

## Layout Protection Boundary

### Approved Decision

Layout adaptation is permitted.

Major UI redesign is not permitted.

Variable city count support shall not introduce a new dashboard model.

### Reason

Variable city count is approved.

Major UI redesign is explicitly excluded.

Protects layout continuity.

---

# Decision 008

## Temporary Inspection Separation

### Approved Decision

Temporary inspection remains separate from monitored-city behavior.

A temporary inspection location does not become a monitored city unless explicitly added through an approved city-add action.

### Reason

Preserves v3.1 behavior.

Creates a clear separation between temporary exploration and persistent monitoring.

Protects product identity.

---

# Validation Impact

These decisions establish:

* Scope boundaries
* Identity boundaries
* Layout boundaries
* Persistence boundaries
* Validation boundaries

before implementation begins.

This supports Validation #002 by ensuring implementation behavior is governed by pre-recorded decisions rather than post-hoc interpretation.

Implementation execution shall record founder involvement observations required by Validation #002.

---

# Resolved Questions

OQ-001

Do implementation results support these decisions?

Resolution:

Yes, with one recorded boundary override. Implementation results supported the persistence, composition, recovery, duplicate, unsupported behavior, identity, layout and temporary-inspection separation decisions. Decision 002B's 0-3 configurable-city boundary was later superseded by OD-001 for Increment 002 delivery.

---

OQ-002

Did any decision require modification during implementation?

Resolution:

Yes. Decision 002B required modification. OD-001 raised the configurable-city ceiling from 3 to 6 after founder validation confirmed the 18-cell dashboard remained usable on desktop, iPhone portrait and iPhone landscape.

---

OQ-003

What implementation observations were recorded during execution?

Resolution:

Implementation observations are recorded in ADR-006, REGRESSION.md and SM-V3.2-INCREMENT-002-IMPLEMENTATION-RECORD. Key observations include singleton-to-collection migration, v2 persistence, v1 migration, coordinate duplicate identity and preservation of temporary inspection separation.

---

OQ-004

Did any decision create unexpected regression risk?

Resolution:

No unresolved unexpected regression risk remained after validation. Increment 002 regression evidence records smoke 29/29, Playwright 24/24 and desktop, iPhone portrait and iPhone landscape validation.

---

OQ-005

How are configurable cities represented within the approved composition model?

Resolution:

Configurable cities are represented as secondary saved map-inspection cards appended to the curated 11-city dashboard. Curated cities remain primary, fixed and recoverable through Reset.

---

# Change Log

v1.0.0

Implementation decision set approved.

Includes:

* Persistence Boundary
* Composition Boundary
* City Count Boundary
* Default Curated List Recovery
* Duplicate City Rule
* Unsupported City Behavior
* Identity Protection Boundary
* Layout Protection Boundary
* Temporary Inspection Separation

Validation #002 alignment confirmed.

Ready for GitHub review, commit, PR, and merge.
