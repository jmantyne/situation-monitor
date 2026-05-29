# Situation Monitor

Real-time environmental dashboard for 11 cities across the world.
Built as a single self-contained HTML file — no build step, no server required.

## Architecture Decision Records

Design rationale and trade-offs are documented in [`docs/`](docs/):

| ADR | Decision |
|-----|----------|
| [ADR-001](docs/ADR-001.md) | Single-file HTML on iOS / cloud-native dev stack |
| [ADR-002](docs/ADR-002.md) | API selection — free, key-free, real-time data |
| [ADR-003](docs/ADR-003.md) | Automated regression testing — pre-commit hook + semver |
| [ADR-004](docs/ADR-004.md) | Security release — SRI, CSP, XSS audit, HTTPS |
| [ARCHITECTURE](docs/ARCHITECTURE.md) | Agentic workflow diagram + runtime data architecture (Mermaid) |
| [HARNESS](docs/HARNESS.md) | Show Me Your Harness — how the AI workflow harness was built |
| [BACKLOG](docs/BACKLOG.md) | Product roadmap — v3.0 interactive map, v3.1 configurable cities, v4.0+ native app |
| [REFLECTION](docs/REFLECTION.md) | What I learned — from VIC-20 to Holodeck in 4 days |
| [STAKEHOLDER-SUMMARY](docs/STAKEHOLDER-SUMMARY.md) | Non-technical project summary |

## Tests

```bash
# Structural smoke test — no browser needed, always available
npm test

# End-to-end Playwright tests — requires Chromium
npm install
npx playwright install chromium
npm run test:e2e
```

## How to open

Download `situation-monitor.html` and open it in any modern browser (Safari, Chrome, Firefox).
Requires an internet connection for map tiles, weather data and fonts.

## What it shows

Each city card displays:
- Local time (live clock, updates every second)
- UV index with colour-coded risk level
- Temperature °F / °C
- Relative humidity %
- Barometric pressure hPa with trend arrow ↑↓
- Wind direction, speed (mph · km/h · kts) and condition label (CALM / BREEZE / MOD / STRONG / GALE / STORM)
- Sunrise and sunset times (local)
- AQI (US), PM2.5 and NO₂

The world map shows a coloured pin per city based on avg(UV · AQI · Wind) score:

| Colour | Score | Meaning |
|--------|-------|---------|
| 🟢 Green | ≤ 0.4 | Good conditions |
| 🟡 Yellow | 0.5 – 1.4 | Moderate |
| 🟠 Orange | 1.5 – 2.4 | Elevated |
| 🔴 Red | ≥ 2.5 | Poor conditions |

## Cities (west → east)

| # | City | Time zone | UTC offset |
|---|------|-----------|-----------|
| 1 | 🇺🇸 Honolulu | Pacific/Honolulu | UTC−10 |
| 2 | 🇺🇸 San Jose | America/Los_Angeles | UTC−7/−8 |
| 3 | 🇺🇸 Tahoe City | America/Los_Angeles | UTC−7/−8 |
| 4 | 🇺🇸 New York | America/New_York | UTC−4/−5 |
| 5 | 🇬🇧 London | Europe/London | UTC+0/+1 |
| 6 | 🇫🇮 Tampere | Europe/Helsinki | UTC+2/+3 |
| 7 | 🇫🇮 Helsinki | Europe/Helsinki | UTC+2/+3 |
| 8 | 🇹🇷 Istanbul | Europe/Istanbul | UTC+3 |
| 9 | 🇰🇪 Nairobi | Africa/Nairobi | UTC+3 (no DST) |
| 10 | 🇦🇪 Dubai | Asia/Dubai | UTC+4 (no DST) |
| 11 | 🇦🇺 Sydney | Australia/Sydney | UTC+10/+11 |

## Data sources (all free, no API key required)

| Data | Source |
|------|--------|
| Weather, UV, pressure, wind | [Open-Meteo](https://open-meteo.com) |
| Air quality (AQI, PM2.5, NO₂) | [Open-Meteo AQI](https://air-quality-api.open-meteo.com) |
| Sunrise / sunset | [Sunrise-Sunset.org](https://sunrise-sunset.org) |
| Home city detection | [ipapi.co](https://ipapi.co) |
| Map tiles | [CartoDB Voyager](https://carto.com) |

## Security (v2.1.0)

| Feature | Status | Detail |
|---------|--------|--------|
| Subresource Integrity (SRI) | ✅ | Leaflet CSS + JS integrity-verified via SHA-256 |
| Content Security Policy (CSP) | ✅ | `connect-src` locks API calls to known domains; `frame-ancestors 'none'` blocks clickjacking |
| XSS audit | ✅ | All `innerHTML` uses numbers or hardcoded strings — no user input inserted |
| Secret scanning | ✅ | GitHub automatic scanning active (public repo); no API keys in codebase |
| HTTPS | ✅ | GitHub Pages enforces HTTPS |

### Privacy note

Home city detection uses [ipapi.co](https://ipapi.co) — your IP address is sent to this service once on page load to determine the nearest city. No other personal data is transmitted. All other APIs receive only coordinates (lat/lon), not identity.

### SRI hash verification

To verify the Leaflet SRI hashes locally (run on Mac/Linux):

```bash
curl -s https://unpkg.com/leaflet@1.9.4/dist/leaflet.css | openssl dgst -sha256 -binary | openssl base64 -A
curl -s https://unpkg.com/leaflet@1.9.4/dist/leaflet.js  | openssl dgst -sha256 -binary | openssl base64 -A
```

Expected (from official Leaflet 1.9.4 release):
- CSS: `p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=`
- JS: `20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=`

## Known Limitations

| Limitation | Detail |
|------------|--------|
| Fixed city list | 11 cities are hardcoded; configurable cities planned for v3.0 |
| No historical data | Shows current conditions only; trend charts planned for v3.0+ |
| Free API rate limits | Open-Meteo allows ~10 000 calls/day — sufficient for personal use |
| No offline mode | Requires internet connection for map tiles, weather data, and fonts |
| IP geolocation accuracy | Home city detection uses IP location; imprecise behind VPN |

## Layouts

| Device | Orientation | Layout |
|--------|-------------|--------|
| Mac / desktop | — | 6-column grid, map top-left |
| iPhone | Landscape | Map left panel, cards scroll horizontally |
| iPhone | Portrait | Map full width top, cards 2-column, scrolls down |

## Version history

| Version | Date | Change |
|---------|------|--------|
| v0.1 | 2026-05-21 | Initial world clock |
| v0.2 | 2026-05-21 | Real-time clock, GPS, dark Orbitron theme |
| v0.3 | 2026-05-23 | Add Honolulu (UTC−10) |
| v0.4 | 2026-05-24 | README updated |
| v0.5 | 2026-05-24 | Blue Zulu bar, flags, amber UTC offset |
| v0.6 | 2026-05-26 | Situation Monitor: 11 cities, Leaflet map, APIs |
| v0.7 | 2026-05-27 | Polish: tooltips, pressure+wind, legend 3 rows, responsive layouts |
| **v1.0** | **2026-05-27** | **First production release — regression tested, no findings** |
| v1.01 | 2026-05-27 | Turku → Nairobi (Kenya), HUM dry colour #88ccff |
| v1.02 | 2026-05-27 | Pre-commit hook: file size + duplicate city ID checks |
| v1.0.3 | 2026-05-27 | Wind condition label after speed value (CALM/BREEZE/MOD/STRONG/GALE/STORM) |
| v1.0.4 | 2026-05-27 | Wind condition label coloured: CALM=#88ccff, BREEZE=green, MOD=yellow, STRONG=orange, GALE=red, STORM=purple |
| v2.0.0 | 2026-05-27 | API 5 min refresh; RISE/SET grey; landscape 4-col grid+legend; semver VERSION file; English-only codebase; Finnish regression check |
| v2.0.3 | 2026-05-27 | Hotfix: SET ☽ icon still orange — emoji CSS colour override impossible; replaced 🌙→☽ (text char) |
| v2.0.5 | 2026-05-27 | RISE/SET icon ☀☽ and label RISE/SET amber #ffd54f; time values remain grey |
| v2.0.6 | 2026-05-27 | Fix: sun-time reverted to grey #c0cfe8; CLAUDE.md version table missing from v2.0.5 |
| v2.1.1 | 2026-05-27 | Hotfix: JS SRI hash corrected — wrong hash broke Leaflet load; correct hash verified via curl |
| v2.2.0 | 2026-05-27 | Documentation: 4 Architecture Decision Records (ADR-001–004) added to docs/ |
| v2.3.2 | 2026-05-27 | Product backlog added to docs/BACKLOG.md — roadmap v2.4 through v3.0+ |
| v2.3.4 | 2026-05-27 | Project reflection added to docs/REFLECTION.md |
| v2.4.4 | 2026-05-27 | Smoke test 13/13 verified on physical Mac hardware (Node.js v18.20.8) |
| v2.4.5 | 2026-05-27 | CLAUDE.md renamed to AI-WORKFLOW.md for clarity |
| v2.4.6 | 2026-05-27 | Pre-commit hook updated for AI-WORKFLOW.md filename |
| **v2.5.0** | **2026-05-28** | **Fix: r.ok check before r.json(); npm test wired to real tests; package.json version synced** |
| v2.5.1 | 2026-05-28 | Fix: vendor name removed from REGRESSION.md heading |
| **v2.6.0** | **2026-05-29** | **Fix: Playwright config, package.json sync in hook, ip-api.com → ipapi.co; docs: HARNESS.md, STAKEHOLDER-SUMMARY.md, Known Limitations** |
| v2.7.0 | 2026-05-29 | Style: author name standardized to "Jussi Mantynen (jmantyne)" in package.json and STAKEHOLDER-SUMMARY.md |
| v2.8.0 | 2026-05-29 | Style: (jmantyne) handle removed from internal docs BACKLOG.md and REFLECTION.md |
| v2.8.1 | 2026-05-29 | Docs: HARNESS.md references upgraded — Martin Fowler primary, isoratas.fi secondary |
| **v2.9.0** | **2026-05-29** | **Docs: backlog reversion — v3.0 interactive map, v3.1 configurable cities, v4.0+ native app** |
