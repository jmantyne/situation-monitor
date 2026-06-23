I'll review the Increment 002 specification against all the reference documents. Let me start by reading all the files in parallel.

The files aren't at the expected paths. Let me explore the actual directory structure.

The files are under the `situation-monitor/` subdirectory. Let me read them all in parallel.

Now let me read the remaining reference files in parallel.

Now the regression doc, tests, and the HTML implementation.

Now let me read the HTML implementation to understand the current state of the code.

Let me read the rest of the HTML to understand the configurable city add/remove/save logic.

Let me read the pre-commit hook — it's a core governance gate referenced by RPR-012 and the harness, critical for regression analysis.

I've now read the Increment 002 spec, both parent governance documents, the Increment 001 record, architecture/harness docs, the regression log, both test suites, the live `situation-monitor.html`, the pre-commit hook, and the backlog. Here is the read-only review.

---

## Bottom line

Increment 002 is **scope-coherent with its parent spec and decisions, but it is not yet implementable as written.** The headline gap: Increment 001 shipped a **single** configurable city (a singleton object, one fixed ID, one storage slot), and Increment 002 requires **0–3** configurable cities. That is a data-model and persisted-schema change, and at least one existing Playwright test asserts the *opposite* of the new requirement. Four open questions (plus one open decision) gate implementation. **Overall risk: MEDIUM.**

---

## 1. Scope alignment

**Aligned:**
- Increment 002's six scope items (add / remove / restore-default / duplicate-prevention / unsupported-handling / 0–3 configurable) map cleanly onto parent [SM-V3.2-SPECIFICATION-001.md](situation-monitor/docs/specifications/SM-V3.2-SPECIFICATION-001.md) FR-001, FR-002, FR-013, FR-011, FR-012, FR-004.
- The count boundary is consistent: Increment 002 "0–3 configurable" + "11 curated preserved" = the 11–14 range fixed in [SM-V3.2-IMPLEMENTATION-DECISIONS-001.md](situation-monitor/decisions/SM-V3.2-IMPLEMENTATION-DECISIONS-001.md) Decision 002B, and satisfies the parent's deferred FR-014 ("count range defined before completion").
- Identity Protection (IPR-001…005) restates Decisions 002A/006 faithfully. Out-of-scope and Regression-Protection lists match the parent exclusion boundary.

**Misalignments / scope seams to resolve:**
- **Singleton → collection is not stated.** The spec never acknowledges that Increment 001 delivered exactly one configurable city ([situation-monitor.html:991](situation-monitor/situation-monitor.html), `let configurableCity = null;`) and that 002 must convert it to a bounded collection. This is the central implementation reality and it is invisible in the spec.
- **The "add" mechanism is undefined** (OQ-001). The only existing add path is *Save-from-inspection* ([situation-monitor.html:1464](situation-monitor/situation-monitor.html)). FR-002-001 says "add configurable cities" generically; the backlog mentions "by name **or** by tapping the map." This fork has outsized downstream impact (see §4) and is unresolved.
- **"Duplicate determination by resolved city identity" (Decision 004) is ill-defined for map points.** Configurable cities are raw coordinates named "Saved Point" with no resolved identity — there is no geocoding (and none is permitted). "Resolved city identity" has no operational meaning for a lat/lon click. Decisions even flag this as open (OQ-005). Without an equality rule (coordinate rounding? nearest curated city?), FR-002-004 is not objectively testable.
- **No traceability matrix.** Increment 002 renumbers requirements (FR-002-00x) without mapping back to parent FR-00x. Given the parent's heavy traceability emphasis (§10.7, ER-001), this is a governance nit worth closing.

---

## 2. Implementation risks

| # | Risk | Detail |
|---|------|--------|
| R1 | **Data-model migration** | `configurableCity` singleton → bounded array (≤3). Touches `allDisplayCities()` ([:1118](situation-monitor/situation-monitor.html)), `setConfigurableCity` ([:1471](situation-monitor/situation-monitor.html)), `saveInspectionAsConfigurableCity` ([:1464](situation-monitor/situation-monitor.html)), `removeConfigurableCity` ([:1485](situation-monitor/situation-monitor.html)). |
| R2 | **Fixed ID collision** | `CONFIGURABLE_CITY_ID = 'configurable-city'` is a single constant ([:994](situation-monitor/situation-monitor.html)). All DOM IDs (`card-`, `uv-`, `clk-`, `mapMarkers[id]`) derive from it. Three cities need unique IDs or every DOM binding and the marker map collide. |
| R3 | **Persisted-schema break** | Storage holds one `{lat,lon}` under `…configurableCity.v1` ([:995](situation-monitor/situation-monitor.html)). Moving to an array needs a schema/version bump **and** backward-compatible read of the legacy single-object value, or every Increment-001 user silently loses their saved city. |
| R4 | **Duplicate-equality ambiguity** | No equality rule exists today (impossible with one city). Decision 004 forbids name-based dedup but map points have no other identity. Implementation-by-assumption risk — exactly what the decisions doc exists to prevent. |
| R5 | **"Unsupported city" is undefined** | With no geocoding, "unsupported selection" can only mean out-of-range coords or API failure. If add-by-name/catalog is chosen instead, this becomes a whole new resolution + failure surface. Blocked on OQ-001. |
| R6 | **XSS via user labels** | `buildCityCard` interpolates `city.name`/`city.flag` through `innerHTML` ([:1193](situation-monitor/situation-monitor.html)). Safe today (hardcoded "Saved Point"/"◆"). If 002 lets users name cities, this is a stored-XSS vector. The v3.1 overlay deliberately used `textContent` for this reason — the card builder does not. |
| R7 | **CSP is a hard constraint on the feature** | connect-src is pinned to 4 domains ([:10](situation-monitor/situation-monitor.html)) and asserted exactly in smoke. Any name→coordinate geocoding needs a new domain → blocked by NFR-005/RPR-013. The harness already biases OQ-001 toward **map-based add**. |
| R8 | **Multi-city UTC clocks** | Configurable cities hardcode `tz:'UTC'` ([:1133](situation-monitor/situation-monitor.html)). One saved point was tolerable; three saved points all reading UTC (not local) is a more visible UX limitation. Timezone lookup is out of scope, so this is accepted-but-amplified. |

---

## 3. Regression risks

- **Pre-commit hook depends on a structural coincidence.** Checks #1 (count==11) and #8 (dup IDs) grep `{ id: '…'` ([/.githooks/pre-commit:60,115](situation-monitor/.githooks/pre-commit)). Configurable cities are built via `createConfigurableCity` (multi-line, `id: CONFIGURABLE_CITY_ID`, no quoted literal), so they're invisible to the hook — which is *why* Increment 001 passed. **002 must keep the curated `CITIES` array as exactly 11 single-line quoted literals and must not author configurable cities as `{ id: '…'` literals.** A naive `CITIES.push(...)` breaks the build.
- **Playwright test contradicts the new requirement.** `saving a second inspection replaces the existing configurable city` ([spec.js:213](situation-monitor/tests/situation-monitor.spec.js)) asserts count stays **12** and the city is *replaced*. Under 002 a second save must **add** (→13). This test must be inverted, not just extended.
- **Brittle smoke string-matches will break by design:** `CONFIGURABLE_CITY_ID = 'configurable-city'` ([smoke.js:29](situation-monitor/tests/smoke.js)), the `…configurableCity.v1` key ([:30](situation-monitor/tests/smoke.js)), and the exact `Promise.allSettled(allDisplayCities()...)` string ([:32](situation-monitor/tests/smoke.js)) all assume the singleton. A schema bump or refactor flips them red. RPR-010/011/012 anticipate this, but it is guaranteed work.
- **Hard-coded count assertions.** Multiple Playwright tests assert exactly 12 cards / `#card-configurable-city` (singular, unique). With ≤3 cities these selectors are no longer unique and counts span 11–14.
- **Visual/grid regression is uncaught by automation.** Desktop is `repeat(6,1fr)` ([:115](situation-monitor/situation-monitor.html)): 11+map = 12 = clean 2×6. At max (14+map = 15) the third row holds 3 cards — degraded but not broken. No static check or test catches layout/aesthetic regression; only the 3-layout manual validation does (as in the Increment 001 record).
- **In-flight render after removal.** `fetchCityData → renderCityData` is null-guarded ([:1655](situation-monitor/situation-monitor.html)), so removing a city mid-fetch is *probably* safe, but add/remove churn across 3 cities widens this window.

---

## 4. Product identity risks

- **The OQ-001 design choice IS the identity decision.** Map-tap-then-Save keeps configurable cities tethered to the curated world-map exploration metaphor and preserves identity. A free-text "search any city" box is the single fastest route to violating IPR-005 ("shall not become a generic weather dashboard"). The spec leaves this open; it should be closed *toward map-based add*, which also satisfies R6/R7 for free.
- **Beautiful Presentation (IPR-004) degrades at max count.** The 6×2 grid is part of the curated aesthetic; 15 cells half-fills a third row. This is OQ-003, unresolved. Real but bounded.
- **Visual differentiation must be preserved.** Configurable cards today are clearly distinct: blue border, cyan name, "SAVED" badge, remove button ([:279, 325, 353](situation-monitor/situation-monitor.html)). Maintaining this at 3 cities keeps the curated 11 visually primary (IPR-002). Good existing foundation.
- **Restore-default is a strong identity safeguard** (FR-002-003 / Decision 003) — always recoverable to the curated 11. Keep it prominent.

---

## 5. Missing acceptance criteria

The Increment 002 Acceptance Criteria omit several testable conditions that its own FRs and the parent require:

1. **Persistence across refresh** — FR-002-007 requires it; parent §9.1 includes it; it is the Increment-001 capability being *extended* — yet it is absent from Functional Acceptance.
2. **Count-boundary enforcement** — no criterion that a 4th configurable city (15th total) is rejected. This is the core "bounded regression surface" guarantee (Decision 002B) and has no measurable acceptance.
3. **Duplicate equality rule** — "duplicate prevented" with no definition of *what equals what*. Not objectively testable (ties to R4/OQ-005).
4. **"Unsupported selection" definition** — no statement of what an unsupported selection is, so "fails safely" can't be verified (ties to R5).
5. **Backward-compatible storage migration** — no criterion that a legacy single-object saved city survives the upgrade (ties to R3).
6. **Responsive validation at max count** — parent NFR-009/010 + RPR-015/016/017 require all three layouts to stay valid, but 002 never names "validated at 14 cities on desktop/portrait/landscape," which is precisely the highest-risk visual case (OQ-003).
7. **Curated-set invariance** — "configurable do not replace curated" (FR-002-009/IPR-003) is prose, not an acceptance check (e.g., "11 curated remain after any add/remove/restore").

---

## 6. Required test updates

**Smoke ([tests/smoke.js](situation-monitor/tests/smoke.js)):**
- Update `CONFIGURABLE_CITY_ID` and storage-key assertions for the new ID scheme / schema version.
- Keep `11 cities in CITIES array`, `No new connect-src domains`, `No reverse geocoding domain` unchanged (these are the identity/security locks).
- Add presence checks for a max-count constant (e.g. `MAX_CONFIGURABLE_CITIES = 3`), the duplicate-prevention helper, the add helper, and the restore-default helper.

**Playwright ([tests/situation-monitor.spec.js](situation-monitor/tests/situation-monitor.spec.js)):**
- **Invert** `saving a second inspection replaces…` → second save **adds** (12→13).
- **Add:** third save →14; fourth save **blocked** at 14 (max enforced).
- **Add:** duplicate prevention (save same resolved identity twice → one card, count unchanged).
- **Add:** restore-default (1–3 configurable → restore → 11 curated, storage cleared).
- **Add:** unsupported-selection handling (per the chosen add mechanism).
- **Update** `persistent configurable city reloads from storage` + `invalid persistent city data fails closed` for the array schema, **plus a legacy single-object migration test**.
- Parametrize all hard-coded `12`/`#card-configurable-city` assertions for 11–14 and unique per-city IDs.
- Extend the two mobile overlay tests to assert layout integrity at the **14-city** maximum.

**Pre-commit hook ([.githooks/pre-commit](situation-monitor/.githooks/pre-commit)) — RPR-012:**
- Decide explicitly (as the backlog predicted): **keep** check #1==11 as a curated-set lock (recommended) and **add** a separate bound for configurable cities, rather than relaxing #1 to a range. Document the decision either way.

**[REGRESSION.md](situation-monitor/REGRESSION.md):** add a v3.2-Increment-002 entry with 3-layout manual validation at 11/12/13/14, plus duplicate/unsupported/restore/migration evidence.

---

## 7. Recommended Increment 002 implementation order

1. **Close the open questions first (gating).** OQ-001 add-mechanism (recommend **map-save only** — satisfies CSP, XSS, and identity in one stroke), OQ-002 restore UX, OQ-003 max-count layout, and Decisions OQ-005 + the duplicate-equality rule. The spec is *Draft*; the decisions doc forbids implementation-by-assumption. This is AG-001.
2. **Record a decisions addendum:** data model (bounded array, max 3), ID scheme, storage schema v2 + legacy-v1 read path, duplicate-equality definition.
3. **Encode the new contract in tests/harness before implementing** (max-count, duplicate, restore, migration as executable checks). Make the hook decision concrete.
4. **Implement the collection model + persistence migration**, leaving the curated `CITIES` array byte-for-byte intact (protects hook #1/#8 and smoke).
5. **Add (from inspection Save):** append → enforce max → enforce duplicate.
6. **Remove-by-id** and **restore-default** (clear all configurable → 11 curated).
7. **Duplicate prevention + unsupported fail-safe.**
8. **Layout adaptation** for 12–15 cells; verify Beautiful Presentation at max; no redesign (Decision 007).
9. **Security pass:** render any user-supplied label via `textContent`; confirm CSP unchanged.
10. **Full regression:** smoke + Playwright green, pre-commit pass, 3-layout manual validation at each count, evidence + REGRESSION.md + Increment 002 implementation record, human approval (AG-002/003/004).

---

## 8. Risk level

**MEDIUM.**

- *Downgrades toward LOW–MEDIUM* if OQ-001 is resolved to **map-save-only with no geocoding** (fixes R5/R6/R7 and the main identity risk at once) and the storage migration is handled with explicit backward-compat.
- *Upgrades toward HIGH* if **add-by-name / a city catalog** is introduced — that pulls in geocoding (new domain, CSP conflict), user-text XSS surface, and the strongest "generic weather dashboard" identity pressure.

The mitigating factors are real: bounded count (max 14), no new domains, single-file architecture, a mature 9-check hook, and a proven multi-model governance pipeline. The elevating factors are the singleton→collection migration, the persisted-schema break, an existing test that asserts the inverse of the new behavior, and four unresolved design questions. Net: manageable, but not low until the open questions are closed and the test contract is rewritten.

No files were modified or created.
