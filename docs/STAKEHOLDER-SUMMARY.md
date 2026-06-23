# Situation Monitor — Project Summary

**Date:** 2026-06-23
**Added in:** v3.2.0
**Author:** Jussi Mantynen

A real-time weather and air quality dashboard for 11 curated cities across 4 continents, with support for additional configurable monitoring locations.

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

- Green = good
- Yellow = moderate
- Orange = elevated
- Red = poor

---

## Why It Exists

This project is a working product and a documented example of human-governed AI-assisted software development.

The dashboard is genuinely useful. It is also a structured demonstration of how to direct AI implementation through governance, validation, testing and review.

The technical term for this structure is a **harness**.

See `docs/HARNESS.md` for the full explanation.

---

## Built How?

| | |
|-|-|
| **Developer** | Jussi Mantynen (jmantyne) |
| **Tools** | ChatGPT, Codex, Claude, Grok, HARNESS governance workflow, iOS, macOS, GitHub |
| **Duration** | May–June 2026 |
| **Starting point** | Blank page |
| **Ending point** | Production dashboard with automated tests, security controls, version management and a governed multi-model delivery pipeline |

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

The threat model, options considered, and implementation decisions are documented in `docs/ADR-004.md`.

---

## Known Limitations

| Limitation | Detail |
|------------|--------|
| Curated city set | 11 curated cities remain fixed; users can add 0–6 configurable monitoring locations |
| No historical data | Only shows current conditions; trend charts planned for future releases |
| Free API rate limits | Open-Meteo allows ~10 000 calls/day — sufficient for personal use |
| No offline mode | Requires internet connection for map tiles, weather data and fonts |
| IP geolocation accuracy | Home city detection uses IP location, which can be imprecise for VPN users |

---

## Governance Validation

Situation Monitor became the validation vehicle for the AI Development Platform governance model.

Validated releases:

| Release | Validation Outcome |
|----------|-------------------|
| **v3.1.0** | First successful end-to-end multi-model governance pipeline validation (ADR-005) |
| **v3.2.0** | Governed repeatability validation and human decision authority validation (ADR-006) |

The delivery pipeline used:

```text
Backlog
↓
Specification
↓
Implementation Decisions
↓
Multi-Model Review
↓
Human Synthesis
↓
Human Decision
↓
Implementation
↓
Automated Testing
↓
Cross-Device Validation
↓
Release
```

Human approval remained the final authority throughout the process.

---

## For Recruiters

This project demonstrates:

| Skill | Evidence |
|-------|---------|
| Product thinking | 11 curated cities, clear use cases, real user value |
| Engineering discipline | Automated tests, semantic versioning, security hardening |
| AI workflow literacy | Structured harness with documented failures and iterative improvement |
| Documentation quality | 6 Architecture Decision Records, backlog, reflection notes and validation artifacts |
| Quality process | 9 automated pre-commit checks; every change requires a regression entry |
| Human-governed AI delivery | Two successful multi-model governance validation cycles (ADR-005, ADR-006) |
| Cross-functional leadership | Product, architecture, governance, validation and release management combined into a single delivery model |

The AI implemented the code.

The human defined objectives, reviewed outcomes, made decisions and maintained quality control.

That division of responsibility — and the governance framework that enforces it — is the skill that matters.