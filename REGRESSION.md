# Regression Testing — Situation Monitor

Run these checks after every change before committing.
Test on all three layouts: Mac desktop, iPhone landscape, iPhone portrait.

## Automated checks (static analysis)

| Check | Result |
|-------|--------|
| 11 cities in CITIES array | ✅ honolulu · san-jose · tahoe · new-york · london · turku · tampere · helsinki · istanbul · dubai · sydney |
| Cards generated dynamically | ✅ |
| API endpoints present | ✅ open-meteo.com · air-quality-api.open-meteo.com · sunrise-sunset.org · ip-api.com |
| Media queries | ✅ portrait (≤500px) + landscape (≤900px) |
| Legend rows | ✅ 3 rows |
| Score functions | ✅ uvScore · aqiScore · windScore |
| degToCompass function | ✅ |

## Visual checks — v1.0 (2026-05-27)

| Check | Result |
|-------|--------|
| Mac desktop layout | ✅ |
| iPhone portrait layout | ✅ |
| iPhone landscape layout | ✅ |
| Map renders without artefacts | ✅ |
| Home city pink border | ✅ |
| Map pin click → card scroll | ✅ |
| Legend 3 rows centred | ✅ |

**Findings:** None — **Decision: ✅ APPROVED v1.0**

## Known limitations (not bugs)

- Hover tooltips do not work on touch screens — by design
- ip-api.com home detection may fail on `file://` — works on HTTPS
- Dubai is the only city with no DST (UTC+4 always)
