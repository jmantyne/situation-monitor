# Situation Monitor — Project Summary

**Date:** 2026-05-29
**Current version:** v2.12.0
**Author:** Jussi Mantynen

A real-time weather and air quality dashboard for 11 cities across 4 continents.
Built as a single HTML file. No server, no login, no cost to run.

**Live:** https://jmantyne.github.io/situation-monitor/situation-monitor.html

---

## What It Shows

Each city card updates every 5 minutes with:

- Temperature (°F / °C)
- UV index with sun protection guidance
- Humidity, barometric pressure and wind speed
- Air quality: AQI, PM2.5, NO₂
- Sunrise and sunset times in local time

A world map shows coloured pins per city based on current conditions:
green = good, yellow = moderate, orange = elevated, red = poor.

---

## Why It Exists

This project is a working product and a documented example of
AI-assisted software development.

The dashboard is genuinely useful. It is also a structured demonstration
of how to direct an AI coding assistant effectively:

- What rules to set
- What to verify automatically
- How to learn from each mistake

The technical term for this structure is a **harness**.
See [`docs/HARNESS.md`](HARNESS.md) for the full explanation.

---

## Built How?

| | |
|-|-|
| **Developer** | Jussi Mantynen (jmantyne) |
| **Tools** | Claude AI (coding assistant), iPhone (primary device) |
| **Duration** | 4 days, May 2026 |
| **Starting point** | Blank page |
| **Ending point** | Production dashboard with automated tests, security controls, version management |

---

## Technical Summary (plain language)

| What | How |
|------|-----|
| No installation needed | Open the HTML file in any browser |
| Free data | Weather and air quality from public APIs — no subscriptions |
| No account | No login, no tracking |
| Works on any device | Mac, Windows, iPhone, Android |
| Auto-refreshes | Fresh data every 5 minutes |
| Secure | CSP and SRI prevent unauthorised content injection |

---

## Security

This project was designed with security as an explicit requirement, not an afterthought.

| Control | Status | Detail |
|---------|--------|--------|
| **No API keys** | ✅ | All 5 data sources are free and key-free. There are no credentials in the codebase — and no credentials to expose. |
| **Content Security Policy (CSP)** | ✅ | Browser-enforced policy locks all network calls to 4 known domains. No other connections are possible. |
| **Subresource Integrity (SRI)** | ✅ | Leaflet.js and CSS are SHA-256 verified. If the CDN is tampered with, the browser blocks the load. |
| **XSS audit** | ✅ | All dynamic content uses numbers and hardcoded strings — no user input is ever inserted into the DOM. |
| **HTTPS** | ✅ | GitHub Pages enforces HTTPS — encrypted transport only. |

The threat model, options considered, and implementation decisions are documented in [`docs/ADR-004.md`](ADR-004.md).

---

## Known Limitations

| Limitation | Detail |
|------------|--------|
| Fixed city list | 11 cities are hardcoded; configurable cities planned for v3.1 |
| No historical data | Only shows current conditions; trend charts planned for v3.0+ |
| Free API rate limits | Open-Meteo allows ~10 000 calls/day — sufficient for personal use |
| No offline mode | Requires internet connection for map tiles, weather data, and fonts |
| IP geolocation accuracy | Home city detection uses IP location, which can be imprecise for VPN users |

---

## For Recruiters

This project demonstrates:

| Skill | Evidence |
|-------|---------|
| Product thinking | 11 curated cities, clear use cases, real user value |
| Engineering discipline | Automated tests, semantic versioning, security hardening |
| AI workflow literacy | Structured harness with documented failures and iterative improvement |
| Documentation quality | 4 Architecture Decision Records, backlog, reflection notes, fail log |
| Quality process | 9 automated pre-commit checks; every change requires a regression entry |

The AI did the coding. The human directed, reviewed, and maintained quality control.
That division of responsibility — and the harness that enforces it — is the skill that matters.
