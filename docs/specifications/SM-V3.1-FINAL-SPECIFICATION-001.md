Document ID: SM-V3.1-FINAL-SPECIFICATION-001

Version: v0.0.1

Status: Approved For Implementation

Product:

Situation Monitor

Current Release:

v3.0.0

Target Release:

v3.1

Date:

2026-06-04

# Product Vision

Situation Monitor is a Beautiful Environmental Situation Awareness Tool.

The product begins with 11 curated locations but is not limited to them.

The curated locations remain the primary experience.

Interactive exploration expands awareness without replacing curation.

# Strategic Decision

Approved Direction:

Option B

Environmental Situation Awareness Tool

Retained Principle:

Beautiful Presentation

The visual quality, simplicity and curated nature of the dashboard SHALL remain a core product characteristic.

# v3.1 Objective

Allow users to inspect environmental conditions anywhere on the map without changing the curated city model.

# Included Scope

* Map zoom
* Map pan
* Map click/tap interaction
* Temporary inspection marker
* Temporary inspection card
* Weather display
* AQI display
* Mobile support
* Loading feedback
* Removal of temporary inspection card

# Explicitly Excluded

* localStorage
* Saved cities
* Persistent city management
* User-configurable city list
* Favorites
* Forecasts
* Historical charts
* User profiles
* Backend services
* Paid APIs

These items belong to v3.2 or later.

# Product Rules

The 11 curated cities remain the primary dashboard.

Temporary locations are secondary inspection objects.

Temporary locations SHALL NOT become permanent.

Temporary locations SHALL disappear after refresh.

# UX Rules

The dashboard must remain visually clean.

Temporary locations must be visually distinguishable from curated cities.

The map remains the primary interaction surface.

User interaction flow:

Map
↓
Tap
↓
Inspect
↓
Dismiss

# Technical Rules

Preserve:

* Single-file HTML architecture
* Existing API providers
* Existing security model
* Existing CSP model
* Existing 11-city structure

Do Not:

* Modify the curated city model
* Introduce persistence
* Introduce backend dependencies
* Introduce authentication

# Regression Requirements

Must Pass:

* Smoke tests
* Existing city rendering
* Existing AQI logic
* Existing weather logic
* Existing map rendering
* Existing refresh cycle
* Mobile layouts
* Pre-commit validation

# Release Success Criteria

Users can inspect arbitrary locations.

The curated dashboard remains intact.

No regression is introduced.

Product identity remains preserved.

# Governance Decision

Architecture Review:

PASS

Repository Review:

PASS

Audit Review:

PASS

Challenge Review:

PASS

Decision:

Approved For Implementation
