# Architecture — Situation Monitor

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

    style H fill:#001a4d,color:#4488ff,stroke:#0033aa
    style A fill:#10102e,color:#c0cfe8,stroke:#2a2a5a
    style HC fill:#0a1a0a,color:#00ff88,stroke:#004400
    style BL fill:#1a0505,color:#ff3355,stroke:#440000
    style CI fill:#0a1020,color:#ffd54f,stroke:#333300
    style LS fill:#0d0d1f,color:#4488ff,stroke:#2a2a5a
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
        FC["fetchCityData()\nPromise.allSettled"]
        RD["renderCityData()\nDOM update"]
        SC["Score functions\nuvScore · aqiScore · windScore"]
        MP["Leaflet map\ncircle markers"]
        CK["Clock tick\n1 s interval"]
    end

    subgraph UI["Browser UI"]
        CD["City cards × 11"]
        WM["World map"]
        LG["Legend bar"]
    end

    OM & AQ & SS -->|"every 5 min"| FC
    IP -->|"once on load"| FC
    CT -->|"tile requests"| MP
    FC --> RD
    RD --> SC
    SC --> RD
    RD --> CD
    MP --> WM
    CK --> CD
    CD & WM & LG --> UI
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

    style MODEL fill:#10102e,color:#c0cfe8,stroke:#2a2a5a
    style OUTPUT fill:#0a1a0a,color:#00ff88,stroke:#004400
    style HARNESS fill:#080816,color:#4488ff,stroke:#0033aa
```
