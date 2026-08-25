# Show Me Your Harness — How I Built One

**Date:** 2026-05-29
**Added in:** v2.6.0
**Author:** Jussi Mantynen

This document describes the harness built around Situation Monitor
and how it illustrates the harness engineering framework emerging in 2026.

---

## What Is a Harness?

Martin Fowler formalized the key distinction in April 2026:

> **Agent = Model + Harness**

The model is an AI participant (initially Claude; later multiple role-assigned models). The harness is everything built around it:
prompts, rules, verification steps, error history, and recovery paths.

Without a harness, an AI model is a capable tool that can fail silently.
With a harness, it becomes a reliable component in a sustained workflow.

This framing has since been adopted across the industry — LangChain, academic
research, and independent engineering blogs including the Finnish-language
"Näytä harnessisi" (isoratas.fi, May 2026), which brought it to this project's attention.

**Further reading:**
- Martin Fowler: [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html)
- arXiv: [AI Harness Engineering: A Runtime Substrate for Foundation-Model Software Agents](https://arxiv.org/html/2605.13357v1)

---

## How This Harness Came to Be

Situation Monitor was not designed with a harness in mind.
It grew iteratively: each time the model made a mistake, a new rule was added.
Each rule that held became part of the harness.

This is the natural lifecycle of a practical harness:

1. Model makes a mistake
2. Human notices it
3. Human adds a rule or check
4. Rule is encoded in the harness
5. That specific mistake cannot recur

After five days and 30+ commits, the harness had 9 automated checks,
a fail log with 8 documented errors, and a regression history spanning every version.

---

## Harness Components in This Project

| Harness Component | Implementation |
|-------------------|----------------|
| **Prompts & Rules** | `AI-WORKFLOW.md` — mandatory process, versioning scheme, city list, lessons learned |
| **Verification** | `.githooks/pre-commit` — 9 automated checks before every commit |
| **Guardrails** | Commit is rejected if any check fails |
| **Memory & Context** | `REGRESSION.md` — full QA history across sessions |
| **Observability** | Version history in `README.md`, `AI-WORKFLOW.md`, `VERSION` file |
| **Recovery** | Fail log in `AI-WORKFLOW.md` — each error added a new rule |
| **Independent review** | Role-based ChatGPT, Codex, Claude Code and Grok review artifacts |
| **Release coherence** | Tag, VERSION, package version, histories, evidence and Human-approved status must agree |

---

## The Nine Guardrails

The pre-commit hook runs these checks every time `situation-monitor.html` is staged:

| # | Check | Why It Exists |
|---|-------|---------------|
| 1 | City count = 11 | Model started removing cities without being asked |
| 2 | All required city IDs present | Catches renames that break DOM bindings |
| 3 | API endpoint URLs present | Ensures network dependencies weren't silently removed |
| 4 | Score functions present | Core business logic cannot be accidentally deleted |
| 5 | Portrait media query present | Responsive layout cannot be accidentally removed |
| 6 | REGRESSION.md staged | Forces documentation of every change |
| 7 | File size < 200 000 bytes | Single-file architecture; prevents accidental bloat |
| 8 | No duplicate city IDs | JS silently uses the second definition — breaks rendering |
| 9 | No Finnish characters (ä/ö) | Model reintroduced Finnish text in an English-only public repo |

Checks #8 and #9 exist because the model made those exact mistakes.

---

## Concrete Examples from the Fail Log

### 1. Wrong SRI Hash (v2.1.0 → v2.1.1)

**What happened:** The model provided a Subresource Integrity (SRI) hash for
Leaflet.js from training data. The hash was wrong. The live site broke — Leaflet
would not load.

**How it was caught:** The human tested the live site after deployment.

**What the harness learned:** SRI hashes must be verified against the live CDN,
not trusted from training data. `AI-WORKFLOW.md` now includes an explicit
verification command:
```bash
curl -s https://unpkg.com/leaflet@1.9.4/dist/leaflet.js | openssl dgst -sha256 -binary | openssl base64 -A
```
The expected hash is recorded. The lesson is permanent.

**Rule added:** "Never trust SRI hashes from training data — always verify via curl."

---

### 2. Finnish Characters Reappeared

**What happened:** The project converted from Finnish to English at v2.0.0. In a
later session, the model reintroduced Finnish text (ä/ö characters) in
`situation-monitor.html` without noticing the English-only policy.

**How it was caught:** The human noticed text in Finnish during a review.

**What the harness learned:** Language consistency across sessions cannot rely on
the model's memory. An automated check was added to the pre-commit hook.

**Rule added:** Pre-commit check #9 — any ä/ö character in the HTML file
blocks the commit.

---

### 3. Sunset Colour Changed Without Being Asked (v2.0.5 → v2.0.6)

**What happened:** The specification was to change the sunrise/sunset *icon and
label* colour. The model also changed the time *value* colour — a change not in
the spec.

**How it was caught:** Regression review; the REGRESSION.md entry documented
what had changed.

**What the harness learned:** Scope creep can happen silently. The REGRESSION.md
history makes it observable: if a value changes that was not in the spec, it is
visible in the record.

**Rule added:** "Do not change sun-time colour unless explicitly asked."
Documented in the AI-WORKFLOW.md fail log.

---

## What the Human Decided vs What Claude Implemented

| Decision | Owner |
|----------|-------|
| Which 11 cities to monitor | Human |
| Layout: 6-column grid, map top-left | Human |
| Use free, key-free APIs only | Human |
| Semantic versioning (v2.0.0+) | Human |
| Which bugs warranted a hotfix | Human |
| When a change was out of scope | Human |
| HTML structure and CSS | Claude |
| API fetch and response parsing | Claude |
| Error handling and fallbacks | Claude |
| Score functions (UV, AQI, wind) | Claude |
| Tooltip content and ranges | Claude |
| Pre-commit hook logic | Claude |
| Architecture Decision Records | Claude (human reviewed and approved) |

The human directed. AI participants implemented and reviewed within assigned roles. The harness enforced quality.

---

## What This Demonstrates

A harness is not a prompt. It is a system.

This harness emerged from practice, not from a design document.
Each failure added a rule. Each rule reduced the probability of that failure
recurring. The cumulative effect of those rules is a harness that makes
AI-assisted development reliable enough to maintain a live public site from
a phone.

The model is powerful. The harness is why it is dependable.

---

## Current Multi-Model Governance Evolution (v3.2.2)

The original single-model harness remains important historical context, but it is no longer the
complete current operating model. Situation Monitor v3.1.0 and v3.2.0 exercised a role-based,
multi-model governance chain:

```text
Human objective
→ Architecture and governance reasoning
→ Repository and execution analysis
→ Documentation and governance audit
→ Independent challenge
→ Synthesis
→ Human decision
→ Implementation and validation
→ Release coherence
→ Human release approval
```

The v3.2.1 post-release review demonstrated that correct individual artifacts do not guarantee a
coherent release. The v3.2.2 response adds the following permanent release invariant:

```text
tag = VERSION = package version = release-history entry
```

Release evidence and lifecycle status must identify the same release, and only the Human Operator
may approve the Released state. Documentation-only patches use the same release identity and state
explicitly that runtime behavior is unchanged.

---

## 🇫🇮 Suomi

### Mikä on harness?

Martin Fowler formalisoi kaavan huhtikuussa 2026:

> **Agent = Model + Harness**

Malli on tekoäly (Claude). Harness on kaikki mallin ympärille rakennettu:
promptit, säännöt, tarkistukset, virhehistoria ja palautumisreitit.
Suomenkielinen artikkeli "Näytä harnessisi" (isoratas.fi, toukokuu 2026)
toi tämän ajattelutavan tämän projektin kontekstiin.

Ilman harnessea malli on tehokas mutta epäluotettava työkalu.
Harnessilla siitä tulee luotettava osa pidempää työnkulkua.

### Miten tämän projektin harness rakentui

Situation Monitor ei syntynyt harness-suunnitelmana. Se kasvoi iteraationa:
jokainen virhe lisäsi säännön, ja jokainen sääntö tuli osaksi harnessea.

Viiden päivän ja 30+ commitin jälkeen harness sisälsi 9 automaattista
tarkistusta, fail login jossa oli 8 dokumentoitua virhettä ja regressiohistorian
joka kattoi jokaisen version.

### Harness-komponentit

| Harness-komponentti | Toteutus tässä projektissa |
|---------------------|---------------------------|
| Promptit ja säännöt | `AI-WORKFLOW.md` |
| Verifiointi | `.githooks/pre-commit` |
| Guardrailit | 9 automaattista tarkistusta — commit hylätään jos jokin epäonnistuu |
| Muisti ja konteksti | `REGRESSION.md` |
| Havaittavuus | Versiohistoria, VERSION-tiedosto |
| Palautuminen | Fail log AI-WORKFLOW.md:ssä |

### Mitä ihminen päätti, mitä Claude toteutti

Ihminen päätti arkkitehtuurin ja rajoitteet: 11 kaupunkia, ilmaiset APIt,
yksittäinen HTML-tiedosto. Claude toteutti teknisen toteutuksen, dokumentaation
ja pre-commit hookin. Harness varmisti, ettei Claude voinut hiljaisesti rikkoa
ihmisen päätöksiä.

### Tärkein oppi

Harness ei ole lista sääntöjä. Se on evoluutioprosessi: virheiden kautta
syntynyt järjestelmä, joka muistaa kaikki ne tilanteet joissa malli epäonnistui.
