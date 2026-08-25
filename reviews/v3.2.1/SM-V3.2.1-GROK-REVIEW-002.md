# SM-V3.2.1-GROK-REVIEW-002

Document ID: SM-V3.2.1-GROK-REVIEW-002  
Repository: jmantyne/situation-monitor  
Branch audited: main  
HEAD at audit: 4abba723a755cea8af665bd5519e1f94ccbdfa43  
Latest tag: v3.2.1  
Role: Grok — Independent Challenger / Repository Truth Auditor  
Mode: Read-only re-audit  
Date: 2026-08-25  
Supersedes for this sprint: SM-V3.2.1-GROK-REVIEW-001 (same finding class; evidence refreshed after claimed Codex/Claude edits)

This is a review / evidence document. It is not authority.

---

## 0. Why this file exists

Human requested a re-run because Codex and Claude had apparently made changes. Grok re-read public `main` on 2026-08-25.

Result of the re-read: **no new commits after PR #21 (2026-08-24) are visible on GitHub `main`.** Open PRs: none relevant. `reviews/` still contains only `v3.2-increment-002/`. VERSION and package.json are still `3.2.0`.

If Codex/Claude edits exist, they are local, unpushed, or on another machine. They are not yet repository truth.

---

## 1. Executive result

**PASS WITH SIGNIFICANT FINDINGS**

Published tag: **v3.2.1** (2026-08-24, “Governance Baseline Sync”).  
Version-bearing files on `main`: **3.2.0**.

PR #21 synced Increment 002 governance records (ADR-006, specs, implementation records, README changelog through v3.2.0). It did **not** close the tag-vs-VERSION gap that v3.2.1 itself created.

---

## 2. What landed on main since June

| When | What | Effect on version truth |
|---|---|---|
| 2026-06-23 | PR #20 v3.2.0 Increment 002 release | Product version 3.2.0 |
| 2026-08-24 | d0a0286 + merge PR #21 | Docs/governance sync for Increment 002; README gained v3.1.0/v3.2.0 history and ADR-006 references |
| 2026-08-24 | Tag **v3.2.1** on 4abba72 | New published tag; VERSION/package.json not bumped |

Files touched in d0a0286 (the actual sync commit):

- AI-WORKFLOW.md
- README.md
- REGRESSION.md
- docs/ADR-006.md
- docs/ARCHITECTURE.md
- docs/SM-V3.2-IMPLEMENTATION-DECISIONS-001.md
- docs/SM-V3.2-INCREMENT-002-IMPLEMENTATION-RECORD.md
- docs/SM-V3.2-INCREMENT-002-SPECIFICATION-001.md
- docs/SM-V3.2-SPECIFICATION-001.md

Not touched in that commit: `VERSION`, `package.json`.

---

## 3. Current source-of-truth table (re-read 2026-08-25)

| Source | Declares | Status |
|---|---|---|
| Git tag / Releases | v3.2.1 | Latest published tag |
| VERSION | 3.2.0 | Stale vs tag |
| package.json | 3.2.0 | Stale vs tag |
| README.md latest changelog row | v3.2.0 (2026-06-23) | No v3.2.1 row |
| README.md ADR list | ADR-001 … ADR-006 present | ADR-006 is documented |
| docs/BACKLOG.md | Current version v3.2.0 | Stale vs tag |
| docs/STAKEHOLDER-SUMMARY.md | Added in v3.2.0; table ends at v3.2.0 | Stale vs tag |
| docs/ADR-006.md | Accepted; scoped to v3.2.0 Increment 002 | Content OK |
| reviews/ | only v3.2-increment-002/ | No v3.2.1 review folder on remote |
| Live Pages | dashboard loads; no UI version | Cannot confirm build from UI |

---

## 4. Findings after re-audit

### F-001 — Tag v3.2.1 != VERSION/package.json/README latest

- Class: Repository truth
- Severity: High
- Still present after PR #21
- Root cause: v3.2.1 was used as a docs-sync tag without a version-file policy. Either bump all version files to 3.2.1, or document “product 3.2.0 / docs tag 3.2.1”. Current repo does neither.
- Preventive mechanism: release incomplete unless tag == VERSION == package.json == README latest line (ADR-003 spirit).

### F-002 — ADR-006 is not missing on current main

- Class: Clarification, not a defect
- README changelog and ADR list include ADR-006.
- Earlier “README does not cover ADR-006” is stale relative to PR #21.
- Remaining gap is the missing **v3.2.1 history line**, not the missing ADR.

### F-003 — Status documents still stop at v3.2.0

- Class: Documentation
- Severity: Medium
- BACKLOG.md, STAKEHOLDER-SUMMARY.md

### F-004 — Codex/Claude changes not visible on remote main

- Class: Repository truth / process
- Severity: Medium (for this multi-model sprint)
- Impact: ChatGPT consolidation from GitHub `main` will not see unpushed local edits. Reviews written only in chat will not be in `reviews/`.
- Remediation: push or commit review artifacts before asking ChatGPT to consolidate from the repo.

### F-005 — Live UI still has no version marker

- Class: Observability
- Severity: Low
- Optional; do not mix into the mandatory sync unless scoped.

---

## 5. What improved since June (do not ignore)

PR #21 did real work:

- ADR-006 is in docs and referenced from README.
- Increment 002 specs/records/decisions were synchronized.
- Runtime model in docs: 12-cell default, 18-cell max, 0–6 configurable, v2 persistence, v1 migration.
- Regression evidence for Increment 002 is recorded.

The remaining defect is narrower than “docs are generally unsynced.” It is specifically: **the patch tag v3.2.1 is unpublished in the version files.**

---

## 6. Recommended consolidation steps

Keep this a version-truth patch. Do not open v3.3 / v4.0 / configurability expansion.

1. Choose one rule and apply it everywhere:
   - Preferred: bump VERSION, package.json, README latest line to **3.2.1** and label it docs/governance sync, no runtime change.
   - Alternative: keep product version 3.2.0 and add one explicit sentence that latest tag is v3.2.1 (docs-only).
2. Add README changelog row for v3.2.1.
3. Update BACKLOG.md and STAKEHOLDER-SUMMARY.md current version.
4. Reconcile REGRESSION.md header with the tag.
5. Commit review artifacts under `reviews/v3.2.1-baseline-sync/` before ChatGPT reads the repo.
6. Do not overwrite `reviews/v3.2-increment-002/*`.

---

## 7. Risk

- Governance / agent baseline: **Medium-High**
- Runtime product identity from this re-read: **Low** (no evidence v3.2.1 changed HTML behavior)

---

## 8. One-sentence conclusion

After re-reading `main` at 4abba72 / tag v3.2.1: Increment 002 governance records were synced, ADR-006 is present, and the published tag still does not match VERSION, package.json, or the README latest line.

---

## 9. Intended repository path

```
reviews/v3.2.1-baseline-sync/SM-V3.2.1-GROK-REVIEW-002.md
```

Do not replace:

```
reviews/v3.2-increment-002/SM-V3.2-INCREMENT-002-GROK-REVIEW-001.md
```
