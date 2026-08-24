# Architecture — Situation Monitor

**Date:** 2026-05-29
**Added in:** v2.10.0
**Author:** Jussi Mantynen

Two diagrams: the agentic development workflow, and the runtime data architecture.

---

## Agentic Development Workflow

How this project is built and maintained — the harness in motion.

```mermaid
flowchart TD
    H["👤 Human\nDirector · TPM · PM · BDM"]
    A["🤖 Claude\nAI Model"]
    CH["💻 Code Change\nsituation-monitor.html"]
    HC["🔒 Pre-commit Hook\n9 automated checks"]
    BL["❌ Commit Blocked\nfix required"]
    RG["📋 REGRESSION.md\ndocument the change"]
    VB["📦 VERSION bump\nsemver · auto"]
    CI["⚙️ GitHub Actions CI\nsmoke test on every push"]
    LS["🌐 Live Site\nGitHub Pages"]

    H -->|"task + constraints"| A
    A -->|"implements"| CH
    CH -->|"git commit"| HC
    HC -->|"check fails"| BL
    BL -->|"corrected"| A
    HC -->|"all 9 pass"| RG
    RG -->|"staged together"| VB
    VB -->|"push"| CI
    CI -->|"✅ green"| LS
    LS -->|"observe · learn · iterate"| H

    style H fill:#1565c0,color:#ffffff,stroke:#0d47a1
    style A fill:#6a1b9a,color:#ffffff,stroke:#4a148c
    style HC fill:#2e7d32,color:#ffffff,stroke:#1b5e20
    style BL fill:#c62828,color:#ffffff,stroke:#b71c1c
    style CI fill:#f57f17,color:#000000,stroke:#e65100
    style LS fill:#0277bd,color:#ffffff,stroke:#01579b
```

**The harness is the path between Human and Live Site.**
Every step that is not the model is part of the harness.

---

## Runtime Data Architecture

How the live dashboard fetches and displays data.

```mermaid
flowchart LR
    subgraph APIs["External APIs (free, no key)"]
        OM["☁️ Open-Meteo\nweather · UV · wind · pressure"]
        AQ["💨 Open-Meteo AQI\npm2.5 · no₂ · us_aqi"]
        SS["☀️ Sunrise-Sunset.org\nrise · set times"]
        IP["📍 ipapi.co\nhome city detection"]
        CT["🗺️ CartoDB\nmap tiles"]
    end

    subgraph APP["situation-monitor.html (single file)"]
        CF["Configurable city state\nv2 localStorage · v1 migration"]
        FC["fetchCityData()\nPromise.allSettled"]
        RD["renderCityData()\nDOM update"]
        SC["Score functions\nuvScore · aqiScore · windScore"]
        MP["Leaflet map\ncircle markers"]
        CK["Clock tick\n1 s interval"]
    end

    subgraph UI["Browser UI"]
        CD["City cards\n11 curated + 0–6 configurable"]
        TI["Temporary inspection overlay"]
        WM["World map"]
        LG["Legend bar"]
    end

    OM & AQ & SS -->|"every 5 min"| FC
    IP -->|"once on load"| FC
    CT -->|"tile requests"| MP
    CF --> FC
    CF --> RD
    FC --> RD
    RD --> SC
    SC --> RD
    RD --> CD
    RD --> TI
    MP --> WM
    CK --> CD
    CD & TI & WM & LG --> UI
```

---

## Harness Components Map

How the harness wraps the model.

```mermaid
flowchart TD
    subgraph HARNESS["Harness"]
        PW["📄 AI-WORKFLOW.md\nPrompts · Rules · Memory"]
        HC["🔒 .githooks/pre-commit\nVerification · Guardrails"]
        RG["📋 REGRESSION.md\nObservability · History"]
        FL["📝 Fail Log\nRecovery · Rules added"]
        CI["⚙️ GitHub Actions CI\nContinuous verification"]
    end

    MODEL["🤖 Claude\nModel"]
    OUTPUT["✅ Reliable Output"]

    PW -->|"guides"| MODEL
    MODEL -->|"code"| HC
    HC -->|"blocks failures"| FL
    FL -->|"new rules"| PW
    HC -->|"passes"| RG
    RG -->|"history"| PW
    CI -->|"independent check"| OUTPUT
    HC -->|"local check"| OUTPUT

    style MODEL fill:#6a1b9a,color:#ffffff,stroke:#4a148c
    style OUTPUT fill:#2e7d32,color:#ffffff,stroke:#1b5e20
    style HARNESS fill:#e8f0fe,color:#1a237e,stroke:#3949ab
```
