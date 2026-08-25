# Situation Monitor v3.2.1 - Codex Release Coherence Review 001

**Review date:** 2026-08-25  
**Reviewer role:** Repository / implementation review  
**Repository state reviewed:** `main` at `4abba723a755cea8af665bd5519e1f94ccbdfa43`, tagged `v3.2.1`  
**Mode:** Read-only analysis, except for creation of this review artifact

---

## Scope

This review examined the published `v3.2.1` repository state, including the
application, tests, release metadata, release history, ADRs, specifications,
implementation records, governance documents, and existing Increment 002 review
artifacts.

The purpose is to establish whether the published repository presents one
coherent account of the production release and its governance baseline.

## Validation Performed

| Check | Result | Evidence |
|---|---|---|
| Published tag identified | PASS | `v3.2.1` points to `4abba723` |
| Structural smoke test | PASS | `npm test` completed 29/29 |
| Playwright result | Not rerun | Published evidence records 24/24; this review did not independently rerun it |
| Product behaviour baseline | Consistent | Application, tests, Increment 002 record, and ADR-006 agree on 11 curated + 0-6 configurable locations |

## Important Correction To The Initial Assumption

`README.md` is not missing ADR-006. It links to ADR-006 and accurately describes
the v3.2.0 Increment 002 configurable-city capability.

The actual defect is a **v3.2.1 release-identity and release-status coherence
gap**, not an absent ADR reference.

## Findings

### F-001 - High - v3.2.1 tag and repository-declared release version disagree

**What is wrong**

The repository is tagged `v3.2.1`, but its internally declared product version
remains `3.2.0`:

| Artifact | Declared value |
|---|---|
| `VERSION` | `3.2.0` |
| `package.json` | `3.2.0` |
| `README.md` version history | latest entry `v3.2.0` |
| `AI-WORKFLOW.md` version history | latest entry `v3.2.0` |
| `REGRESSION.md` test history | latest entry `v3.2.0 Increment 002` |
| `docs/BACKLOG.md` current version | `v3.2.0` |

**Why it happened**

The existing hook synchronizes `VERSION` and `package.json` during a commit.
The `v3.2.1` tag was subsequently created without a release-coherence check that
compares the tag to those repository declarations and release-history entries.

**What permits recurrence**

The CI workflow runs the product smoke test only. Neither CI nor the hook checks
the Git tag, release metadata, documentation history, regression history, or
backlog current-version field as one release contract.

**Impact**

Human readers, downstream reviewers, and AI agents can reasonably reach different
conclusions about which release is in production. This undermines the stated role
of `VERSION` as a GitHub-independent source of version truth.

**Required consolidation decision**

Decide whether `v3.2.1` is:

1. a production patch release;
2. a documentation/governance release; or
3. an incorrectly created tag for the v3.2.0 state.

Only after that decision can the correct release identity be synchronized.

### F-002 - High - Release status is internally contradictory

**What is wrong**

The following artifacts describe different states for the same v3.2 Increment
002 delivery:

| Artifact | Status presented |
|---|---|
| `README.md` | validation completed; device validation passed |
| `docs/ADR-006.md` | accepted, validated historical outcome |
| `REGRESSION.md` | automated validation passed; manual human review still required for release approval |
| `docs/SM-V3.2-INCREMENT-002-IMPLEMENTATION-RECORD.md` | Ready for human review |

The later `v3.2.1` tag does not contain a release note or regression record that
resolves this status difference.

**Why it happened**

Delivery evidence, release-readiness evidence, and release declaration are held
in separate artifacts without an explicit final-status owner or reconciliation
step.

**What permits recurrence**

The mandatory workflow requires a regression entry, README history update, and
workflow history update, but it does not require a final release-status assertion
to agree across all release-facing documents.

**Impact**

This is a governance and auditability defect: a production tag can coexist with
documents saying that approval is still pending.

### F-003 - Medium - Architecture and harness documents no longer represent ADR-006 governance

**What is wrong**

ADR-006 defines the v3.2 pipeline as role-defined, multi-model, and subject to
explicit human decision authority. It names Architecture, Repository /
Implementation, Audit, Independent Challenge, and Human Operator roles.

`docs/ARCHITECTURE.md` and `docs/HARNESS.md` still principally describe a
single-model Claude workflow. They do not show the multi-model review chain,
human synthesis, explicit Open Decision handling, or the role-defined and
model-agnostic operating model documented by ADR-006.

**Why it happened**

ADR-006 was added as delivery evidence, but the earlier explanatory architecture
and harness documents were not treated as dependent current-state views.

**What permits recurrence**

There is no declared relationship that says which current-state documents must be
reviewed when an ADR changes the active governance model.

**Impact**

An AI agent following `ARCHITECTURE.md` or `HARNESS.md` can infer an obsolete
single-model process, bypassing the actual v3.2 governance sequence.

### F-004 - Medium - Existing controls validate product structure, not release coherence

**What is wrong**

The 29 smoke checks protect the application well: curated city count, persistence
schema, migration, bounded configurable-city behaviour, and related product
boundaries are structurally covered. The published 24 Playwright tests cover
important runtime behaviour.

Neither test set, the pre-commit hook, nor CI verifies release coherence.

**Why it happened**

The harness evolved around observed application defects. It does not yet encode
the observed release-documentation failure mode.

**What permits recurrence**

A tag can be created for a commit whose metadata, histories, and approval status
describe a different version.

**Impact**

The product can be technically valid while the published release record is not
auditable as one consistent unit.

## What Is Coherent

- The delivered product boundary is consistent across code, tests, specification,
  implementation record, README, and ADR-006: 11 curated cities remain primary;
  0-6 configurable locations are stored separately; default startup contains no
  configurable locations.
- No evidence of a new API domain, reverse geocoding, search UI, or mutation of
  the curated city list was found.
- `npm test` passed 29/29 against the reviewed tag.
- The earlier 0-3 boundary is explicitly superseded for Increment 002 by OD-001
  and ADR-006; the delivered 0-6 ceiling is consistently recorded in the
  product-facing v3.2 materials.

## Consolidation Order For Human Decision

1. Establish the authoritative meaning and approval state of tag `v3.2.1`.
2. Reconcile release identity and status across the release-facing metadata and
   histories.
3. Reconcile `ARCHITECTURE.md` and `HARNESS.md` with the accepted ADR-006
   governance model, while retaining historical single-model context only where
   it is clearly labelled as historical.
4. Decide the smallest release-coherence control that prevents a Git tag from
   diverging from repository version and approval truth.
5. Re-run the relevant automated and manual release validation only after the
   intended release state is unambiguous.

## Overall Assessment

**Product implementation:** PASS

**Release-record coherence:** FAIL

**Governance-document coherence:** PASS WITH MATERIAL FINDINGS

The repository supports the delivered v3.2 configurable-city product, but the
published v3.2.1 tag does not yet provide a coherent, self-identifying production
release record.

Human remains final authority.
