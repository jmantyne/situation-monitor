# AI-WORKFLOW.md — Situation Monitor

This file documents the AI-assisted development workflow, session memory,
version history, and process decisions for the Situation Monitor project.

---

## Setup — run this immediately after cloning

```bash
git config core.hooksPath .githooks
```

The hook lives in `.githooks/pre-commit` — it travels with the repo but must be activated manually.

---

## Mandatory process — before every commit

**Always follow this order. No exceptions.**

1. Make code changes
2. **Run regression checks** (bash commands below)
3. Record results in `REGRESSION.md` as a new version entry
4. Update `README.md` version history
5. Update `CLAUDE.md` version table
6. Commit everything together — hook validates automatically

**Regression automated checks:**
```bash
FILE=situation-monitor.html
grep -o "{ id: '[^']*'" $FILE | wc -l
grep -o "{ id: '[^']*'" $FILE | sort | uniq -d
grep "function uvScore\|function aqiScore\|function windScore\|function degToCompass" $FILE
grep "max-width.*orientation" $FILE
wc -c < $FILE
```

---

## Version history

| Version | Date | Change |
|---------|------|--------|
| v1.0 | 2026-05-27 | Initial release — 11 cities, Leaflet map, all APIs, responsive layouts |
| v1.0.1 | 2026-05-27 | Turku → Nairobi (Kenya, UTC+3 no DST), HUM dry colour #88ccff |
| v1.0.2 | 2026-05-27 | Pre-commit hook: file size + duplicate city ID checks |
| v1.0.3 | 2026-05-27 | windLabel function: CALM/BREEZE/MOD/STRONG/GALE/STORM after wind speed; data-row gap 4→2px |
| v1.0.4 | 2026-05-27 | windLabel returns {text,cls}; wind-calm #88ccff CSS; coloured wind condition labels |
| v2.0.0 | 2026-05-27 | API 5 min refresh; RISE/SET grey; landscape 4-col grid+legend; semver VERSION file; English-only; Finnish regression check |
| v2.0.5 | 2026-05-27 | RISE/SET icon ☀☽ and label amber #ffd54f; time values remain grey #c0cfe8 |
| v2.0.6 | 2026-05-27 | Fix: sun-time reverted to grey; CLAUDE.md version table added (missed in v2.0.5) |
| v2.1.0 | 2026-05-27 | Security release: SRI, CSP, XSS audit, secret scanning, HTTPS docs, RELEASE_LEVEL hook |
| v2.1.1 | 2026-05-27 | Hotfix: JS SRI hash corrected (training data had wrong value; user verified via curl on Mac) |
| v2.2.0 | 2026-05-27 | Documentation: ADR-001–004 added to docs/; README updated with ADR table and version history |
| v2.3.2 | 2026-05-27 | Product backlog added to docs/BACKLOG.md; README + CLAUDE.md updated |
| v2.3.4 | 2026-05-27 | Project reflection added to docs/REFLECTION.md; README + CLAUDE.md updated |
| v2.4.4 | 2026-05-27 | Smoke test 13/13 verified on physical Mac hardware; REGRESSION.md updated |
| v2.4.5 | 2026-05-27 | CLAUDE.md renamed to AI-WORKFLOW.md; pre-commit hook reference updated |
| v2.5.0 | 2026-05-28 | Fix: r.ok check before r.json() in fetchCityData; npm test wired to real tests; package.json version synced |
| v2.5.1 | 2026-05-28 | Fix: vendor name removed from REGRESSION.md v2.5.0 heading |
| **v2.6.0** | **2026-05-29** | **Fix: playwright.config.js; pre-commit hook syncs package.json; ip-api.com → ipapi.co (HTTPS); docs/HARNESS.md; docs/STAKEHOLDER-SUMMARY.md; Known Limitations in README** |
| v2.7.0 | 2026-05-29 | Style: author name standardized to "Jussi Mantynen (jmantyne)" in package.json and STAKEHOLDER-SUMMARY.md |
| v2.8.0 | 2026-05-29 | Style: (jmantyne) handle removed from internal docs |
| v2.8.1 | 2026-05-29 | Docs: HARNESS.md upgraded — Martin Fowler as primary source, isoratas.fi secondary |
| **v2.9.0** | **2026-05-29** | **Docs: backlog reversion — v3.0/v3.1/v4.0+; README and STAKEHOLDER-SUMMARY updated** |
| v2.9.1 | 2026-05-29 | Docs: version history synced across README and AI-WORKFLOW.md |
| **v2.10.0** | **2026-05-29** | **Feat: GitHub Actions CI (.github/workflows/ci.yml) + docs/ARCHITECTURE.md (3 Mermaid diagrams)** |
| v2.10.1 | 2026-05-29 | Docs: Security section added to STAKEHOLDER-SUMMARY.md |
| v2.10.2 | 2026-05-29 | Docs: version history synced across README and AI-WORKFLOW.md (v2.9.1–v2.10.1) |
| **v2.11.0** | **2026-05-29** | **Docs: full version audit — v2.10.2 entries added to all history files; BACKLOG.md current version corrected; REGRESSION.md catches up v2.7.0–v2.11.0** |

---

## Fail log — errors and fixes

| Version | Date | Fail | Fix |
|---------|------|------|-----|
| v1.0.1 | 2026-05-27 | Regression checks skipped before commit | Run retroactively, separate commit |
| v1.0.2 | 2026-05-27 | Pre-commit hook not executable | Fixed chmod +x in separate commit |
| v2.0.0 | 2026-05-27 | Change 5 (Finnish→English) applied to .md files but no explicit audit shown for situation-monitor.html — hook check #9 passed but process was opaque | Fixed: full line-by-line audit run post-commit, all clean, documented in REGRESSION.md v2.0.1 |
| v2.0.0 | 2026-05-27 | SET icon 🌙 remained orange after colour change — emoji colour cannot be overridden by CSS `color` property | Fixed v2.0.3: replaced 🌙 with ☽ (text char U+263D); added color:#c0cfe8 to .sun-icon |
| v2.0.5 | 2026-05-27 | sun-time (time values) changed to orange without being asked — spec was icon+label only | Fixed v2.0.6: sun-time reverted to #c0cfe8 grey |
| v2.0.5 | 2026-05-27 | CLAUDE.md version table not updated — skipped in hotfix commit | Fixed v2.0.6: version table updated |
| v2.1.0 | 2026-05-27 | JS SRI hash wrong — sourced from training data, not verified against live CDN; site broken | Fixed v2.1.1: correct hash from user curl verification on Mac |
| v2.2.0 | 2026-05-27 | README and CLAUDE.md not updated when ADR-001–004 were added to docs/ — user had to point it out | Fixed v2.2.1: README ADR table and version history updated |
| v2.3.1 | 2026-05-27 | README and CLAUDE.md not updated when BACKLOG.md was added — same process error repeated | Fixed v2.3.3: BACKLOG added to README docs table and version history; fail log updated |
| v2.5.x | 2026-05-29 | npm test broken: Playwright ReferenceError: require is not defined in ES module scope | Fixed v2.6.0: added playwright.config.js with explicit testDir/testMatch; split npm test from npm run test:e2e |
| v2.5.x | 2026-05-29 | package.json version (2.4.6) out of sync with VERSION (2.5.2) | Fixed v2.6.0: pre-commit hook now syncs package.json automatically |
| v2.5.x | 2026-05-29 | ip-api.com returns HTTP 403 on HTTPS — free plan doesn't support SSL | Fixed v2.6.0: replaced with ipapi.co (free, HTTPS, returns latitude/longitude/timezone) |

---

## Cities — expected state (v1.0.2+)

Order: west → east. 11 cities.

| id | Name | Timezone | lon |
|----|------|----------|-----|
| honolulu | Honolulu 🇺🇸 | Pacific/Honolulu | -157.86 |
| san-jose | San Jose 🇺🇸 | America/Los_Angeles | -121.89 |
| tahoe | Tahoe City 🇺🇸 | America/Los_Angeles | -120.15 |
| new-york | New York 🇺🇸 | America/New_York | -74.01 |
| london | London 🇬🇧 | Europe/London | -0.13 |
| tampere | Tampere 🇫🇮 | Europe/Helsinki | 23.76 |
| helsinki | Helsinki 🇫🇮 | Europe/Helsinki | 24.94 |
| istanbul | Istanbul 🇹🇷 | Europe/Istanbul | 28.98 |
| nairobi | Nairobi 🇰🇪 | Africa/Nairobi | 36.82 |
| dubai | Dubai 🇦🇪 | Asia/Dubai | 55.27 |
| sydney | Sydney 🇦🇺 | Australia/Sydney | 151.21 |

**Notes:**
- Dubai: only city with no DST (UTC+4 always) — use for UTC offset logic testing
- Nairobi: no DST (UTC+3 always) — same offset as Istanbul but different continent
- Honolulu is always first (westernmost)

---

## Pre-commit hook — what it checks

Hook location: `.githooks/pre-commit`. Runs when `situation-monitor.html` is staged.

| # | Check | Value |
|---|-------|-------|
| 0 | Version bump | reads VERSION file, minor bump if >1 file changed, patch if 1 |
| 1 | City count | exactly 11 |
| 2 | All IDs present | see list above |
| 3 | API endpoints | open-meteo · air-quality-api · sunrise-sunset · ip-api |
| 4 | Score functions | uvScore · aqiScore · windScore · degToCompass |
| 5 | Media queries | portrait + landscape |
| 6 | REGRESSION.md staged | required |
| 7 | File size | < 200 000 bytes |
| 8 | No duplicate IDs | — |
| 9 | No Finnish (ä/ö) in HTML | public repo must be English only |

---

## Data sources

| Data | API |
|------|-----|
| Weather, UV, wind, pressure | api.open-meteo.com |
| AQI, PM2.5, NO2 | air-quality-api.open-meteo.com |
| Sunrise / sunset | api.sunrise-sunset.org |
| Home city (IP) | ipapi.co (replaced ip-api.com v2.6.0 — free HTTPS endpoint) |
| Map tiles | CartoDB Voyager (Leaflet) |

---

## Lessons learned — do not repeat

### File content gets corrupted on GitHub web editor rename
- Always verify RAW content before publishing when renaming in GitHub web UI
- Use: `https://raw.githubusercontent.com/jmantyne/situation-monitor/main/situation-monitor.html`

### Duplicate CITIES definition
- Never define the CITIES array twice — JS silently uses the second one

### GitHub Pages URL
- Live URL: `https://jmantyne.github.io/situation-monitor/situation-monitor.html`
- Pages configured: branch `main` / `/(root)`

### Versioning scheme (from v2.0.0 onwards)
- Use semantic versioning: MAJOR.MINOR.PATCH stored in VERSION file
- Single change committed → patch bump (x.y.Z)
- Multiple changes committed together → minor bump (x.Y.0)
- Major bump (X.0.0) → manual edit of VERSION for breaking changes
- Version managed by pre-commit hook, independent of GitHub

---

## Notes

- 2026-05-27: Repo created — migrated from Harjoittelu/docs/ to standalone public repo
- 2026-05-27: index.html experiment failed (wrong content) — reverted to situation-monitor.html
- 2026-05-27: v2.0.0 — all documentation converted from Finnish to English; semver introduced
