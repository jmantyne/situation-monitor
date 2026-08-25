# Situation Monitor v3.2.1 — Claude Release Coherence Review 001

**Review date:** 2026-08-25
**Reviewer role:** Documentation and governance audit (Claude Code / Opus 4.8)
**Repository state reviewed:** `main` at `28c35e1` (parent `4abba72`, tagged `v3.2.1`); version stamps read at HEAD
**Mode:** Read-only analysis, except creation of this review artifact

---

## Bottom line

v3.2.1 is a **governance/documentation-sync release that failed to synchronize its own release identity.** The delivered product is coherent; the release **record** is not: the `v3.2.1` tag exists only in Git, while every in-repo version marker still reads **3.2.0** and no changelog / regression row explains that v3.2.1 exists.

Separately, the **"README is missing ADR-006"** symptom that triggered this round was a **stale-baseline artifact** (a v3.2.0 checkout), not a production defect — in v3.2.1 the README references ADR-006 correctly.

**Overall: Product PASS · Release-record coherence FAIL.**

---

## 1. Baseline & method — review the right tree first

This is the finding most likely to distort the multi-model round, so it comes first.

- At the start of this review the local checkout was `main @ 21c004b` = **v3.2.0**, **2 commits behind** `origin/main` (v3.2.1). It was synced during the session and is now `main @ 28c35e1` (v3.2.1 + Codex's review, ahead 1).
- **Proof that baseline choice changes the findings:** `README@v3.2.0` contains **0** references to ADR-006; `README@v3.2.1` contains **3**. The v3.2.1 sync commit is exactly where the ADR-006 link was added.
- **Therefore:** "README doesn't cover ADR-006" is true only against v3.2.0. It is already fixed in production v3.2.1.
- **Action for the round:** pin all four reviewers to **`v3.2.1` (`4abba72`)**. (Now satisfied locally.) When consolidating, tag each incoming finding with the baseline it was found against and drop anything already green in production.

---

## 2. CR-1 — High — v3.2.1 release identity is recorded nowhere inside the repository

At the `v3.2.1` tag, every in-repo version marker still declares **3.2.0**:

| Artifact | Declared value |
|---|---|
| `VERSION` | `3.2.0` |
| `package.json` `"version"` | `3.2.0` |
| `README.md` version history | latest row **v3.2.0** (no v3.2.1) |
| `README.md` "AI Governance Validation" table | lists v3.1.0, v3.2.0 only |
| `AI-WORKFLOW.md` version history | latest row **v3.2.0** (no v3.2.1) |
| `REGRESSION.md` | latest entry **v3.2.0 Increment 002** |
| `docs/BACKLOG.md` current version | `v3.2.0` |
| `situation-monitor.html` (deployed app) | no version string at all |

**Effect:** v3.2.1 is invisible from inside the repository. A reader who sees the v3.2.1 GitHub release and opens the repo finds a codebase that uniformly claims 3.2.0, with nothing explaining the difference. This undermines the stated role of `VERSION` as a GitHub-independent source of version truth.

*(Independent convergence: this matches Codex F-001 in `SM-V3.2.1-CODEX-RELEASE-COHERENCE-REVIEW-001.md`. Two independent reviews reaching the same table raises confidence.)*

---

## 3. CR-2 — High (decision) — the versioning intent behind v3.2.1 is undocumented

The v3.2.1 commit was a **docs/governance sync with no application change** (the app HTML has no version; VERSION stayed 3.2.0). That leaves two internally-consistent end states; the repo currently sits in the inconsistent middle:

- **Option A — app-version = deployed-artifact version (recommended).** The app did not change, so `VERSION`/`package.json` may correctly stay **3.2.0**; v3.2.1 is a **documentation/governance patch tag**. Fix: add a **v3.2.1 row** to the README history, the AI-WORKFLOW history, a REGRESSION note, and BACKLOG's current-version — each stating "records/governance sync only; application unchanged at 3.2.0." Then write this (currently implicit) patch-tag policy into `AI-WORKFLOW.md`.
- **Option B — every release tag = a VERSION bump.** Bump `VERSION` + `package.json` to **3.2.1** and add the changelog rows.

What must not remain is the current state: a release tag with **no** corresponding in-repo record. **Recommendation: Option A**, because it matches this repo's semver discipline (app version tracks the deployed artifact) and avoids a false functional bump.

---

## 4. CR-3 — Medium — this is a recurring failure mode; close it with the gate that already exists

The README version history itself documents repeated past occurrences of VERSION ↔ changelog ↔ package.json drift, previously fixed reactively by manual audits:

- v2.9.1, v2.10.2, v2.10.3, v2.14.1 — "version history synced across README and AI-WORKFLOW" / "full version audit"
- v3.0.2 "VERSION corrected after dev branch sync issue"; v3.0.3 "VERSION loop documented"
- v2.5.0 / v2.6.0 — "package.json version synced" / "package.json sync in hook"

It has recurred at v3.2.1 — and, notably, the v3.2.1 release was *itself* the sync release that left its own stamps and changelog unsynced.

**Preventive mechanism (reuse existing controls; add no new tooling).** The repo already ships a pre-commit hook (`.githooks/`) that historically enforced package.json sync and still runs file-size / duplicate-city checks, plus a CI smoke workflow. Extend one of them to assert, on tag/release:
1. `VERSION` == `package.json` version, **and**
2. the current release tag has a matching row in **both** the README and AI-WORKFLOW version histories.

Fail the commit/release otherwise. This makes the existing gate cover the observed release-documentation failure mode instead of introducing a new process.

*(Independent convergence with Codex F-004: existing controls validate product structure, not release coherence.)*

---

## 5. Not defects (to prevent false positives during consolidation)

- **`docs/ADR-006.md` "Product version: v3.2.0"** is **correct** — ADR-006 records the v3.2.0 Increment 002 decision and must not be bumped to 3.2.1.
- **README missing ADR-006** — already fixed in v3.2.1 (only appears missing on a stale v3.2.0 checkout; see §1).
- **0–6 configurable locations** (not the older 0–3) is the intended, delivered ceiling per OD-001 / ADR-006 — consistent across app, tests, spec, README; not a defect.
- **Doc headers "Added in: v2.x"** (ARCHITECTURE v2.10.0, HARNESS v2.6.0) — intentionally stable "Added in" labels, not current-version stamps.

## 6. Minor / optional (low priority)

- **"11 curated cities" vs "default 12 cells"**: README's headline says 11 curated cities while the desktop layout table says "default 12 cells, maximum 18 cells." Likely intentional (grid capacity ≠ city count) but reads inconsistently; worth one clarifying line.
- **App carries no in-artifact version marker** (`situation-monitor.html`): deployed version is discoverable only via the `VERSION` file or the Git tag. Pre-existing observability gap, not v3.2.1-specific.

---

## 7. Cross-review note (transparency for the synthesis)

I formed §1–§6 independently (against the repository state), then read the already-filed `SM-V3.2.1-CODEX-RELEASE-COHERENCE-REVIEW-001.md`.

- **Convergence:** my CR-1 ≙ Codex F-001 (version desync); my CR-3 preventive ≙ Codex F-004 (controls don't check release coherence). Independent agreement — treat as high-confidence.
- **Coverage Codex adds that I did not independently assess:** Codex F-002 (release-status contradiction across README vs `SM-V3.2-INCREMENT-002-IMPLEMENTATION-RECORD.md` "Ready for human review" vs REGRESSION "manual review still required") and Codex F-003 (`ARCHITECTURE.md` / `HARNESS.md` still describe a single-model workflow, not the ADR-006 multi-model governance model). Recommend the synthesis carry these as Codex-originated and verify them.
- **Coverage I add that Codex did not:** the stale-baseline diagnosis (§1) that explains why the ADR-006 symptom appeared at all, plus the recurrence history and the explicit Option A/B decision framing.

---

## Overall Assessment

- **Product implementation:** PASS
- **Release-record coherence:** FAIL (v3.2.1 identity absent from every in-repo marker)
- **Documentation baseline at v3.2.1:** PASS with material findings (release identity/version)

**Recommended consolidation order**
1. Pin all reviewers to `v3.2.1` (`4abba72`) and drop stale-baseline false positives (e.g. ADR-006). 
2. Decide the meaning of the v3.2.1 tag (Option A recommended vs B).
3. Apply the chosen option: add the missing v3.2.1 records (README, AI-WORKFLOW, REGRESSION, BACKLOG; VERSION/package.json only under Option B).
4. Write the patch-tag / versioning policy into `AI-WORKFLOW.md`.
5. Extend the existing pre-commit hook / CI with the release-coherence assertions (CR-3).
6. (From Codex) reconcile release-status wording and the ARCHITECTURE/HARNESS governance model.

## Confidence & limitations

- **Confidence: High** — all findings grounded in Git refs and file contents read at explicit commits (`v3.2.0`, `v3.2.1`/`4abba72`, HEAD `28c35e1`).
- Read-only; only this artifact was created. Scope was documentation / version / release-record coherence, not application runtime, security, or test validity (covered by the Increment 002 functional review set).
- Human remains final authority.
