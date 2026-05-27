# Situation Monitor

Real-time environmental dashboard for 11 cities across the world.
Built as a single self-contained HTML file — no build step, no server required.

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
| Home city detection | [ip-api.com](https://ip-api.com) |
| Map tiles | [CartoDB Voyager](https://carto.com) |

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
