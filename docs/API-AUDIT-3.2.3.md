# API audit — v3.2.3 candidate

Date: 2026-09-16 UTC. Status: in progress, not released.
Target baseline: 8d4426eb5d0610a875b367ca5c0308001ae44b27.
Conductor chain: SM-20260916-API-001.

## Observations and dependencies

| Dependency | Observation | Candidate treatment |
|---|---|---|
| Open-Meteo weather | HTTP 200, useful current fields; all 11 cards populated in Chromium baseline | Keep endpoint; finite readings, 12-second timeout, missing-data tests |
| Open-Meteo air quality | HTTP 200, useful current fields | Keep endpoint; partial/unknown status and failure tests |
| Sunrise-Sunset | HTTP 200 and status OK | Keep endpoint; explicit request timeout |
| ipapi.co | HTTP 429 RateLimited in separate approved live check | Existing timezone/default fallback retained; browser suite mocks rate limit |
| CARTO raster tiles | HTTP 200 and valid-sized PNG, but visually watermarked API KEY REQUIRED | Proven defect; replaced with OSM Standard on HTTP/HTTPS; file:// clearly disclosed |
| Leaflet JS/CSS (unpkg) | HTTP 200; existing SRI; map rendered | Keep pinned dependency; city cards continue if map library is unavailable |
| Google Fonts CSS/font files | CSS HTTP 200; browser rendered fonts | Optional appearance dependency; native CSS fallback remains |

Baseline map inspection produced real weather/AQI data. The defect concerns basemap content, not the entire map event or weather pipeline.

## Codex diagnosis dispositions

1. CARTO watermark: corrected by key-free OSM Standard for HTTP/HTTPS, consistent with ADR-002 and existing GitHub Pages deployment. Optional Human preference for CARTO remains open until final acceptance.
2. Missing data rendered green: corrected; incomplete scoring inputs now produce unknown.
3. Failed refresh advertises success: corrected; failed/partial update is explicit.
4. Success-only dependency tests: corrected with eight failure/recovery cases; single initial HTTP viewport visually verified with a clean OSM map.
5. ipapi limit: fallback retained and rate-limit case exercised; more detailed home-location provenance UI deferred from compatibility patch.
6. Leaflet failure stops bootstrap: corrected; environmental cards remain functional without Leaflet.
7. Meta frame-ancestors claim: unsupported meta directive removed; README corrected and historical ADR annotated.
8. Incomplete dependency inventory: recorded in this table.

## Current official references

- https://carto.com/basemaps/apikey/ — key now required, observed 2026-09-16 UTC.
- https://operations.osmfoundation.org/policies/tiles/ — direct OSM browser requests require an identifying Referer; do not promise file:// compatibility.
- https://open-meteo.com/en/docs
- https://open-meteo.com/en/docs/air-quality-api
- https://sunrise-sunset.org/api

These links support provider contracts; supplied live observations are distinct from independent model browsing. Read-only ATR workers inspect the source and supplied evidence, not live web services.

## Verification

29/29 structural tests; 32/32 Chromium browser tests. API responses in regression tests are mocked. Live checks and visual baseline reproduced the reported failure. Corrected map initial-viewport visual validation passed; final independent and Human review subsequently completed; see acceptance record below.

Provider implementation: https://tile.openstreetmap.org/{z}/{x}/{y}.png, no retina suffix, browser caching unchanged, strict-origin-when-cross-origin Referer policy, visible copyright attribution, no bulk/offline download. A tile failure gives a visible notice. Direct file opening sends no tile request. Browser tests use mocked OSM tiles.

Second candidate verification: 34/34 Chromium tests passed. Live OSM /0/0/0.png returned HTTP 200 and a 256x256 map; browser screenshot visibly has no API-key watermark. No browser page errors. API 200 probes at other tile coordinates were never accepted as contradicting the original visual failure. The first Claude attempt could not inspect code because it used unsupported git command prefixes; its error-bearing report was rejected, retained and scheduled for a fresh confined review.

## v3.2.3 — accepted API compatibility repair

The Human verified the local preview, reported that the correction works well and approved it. Sequential Codex diagnosis, Claude review, Grok challenge and final Claude recheck are complete. The final recheck confirmed all three Grok corrections with no actionable findings. Reviewed runtime commit: `bcd24818ac79c63c1610789f04fa1594dd3ad558`. This delivery update changes documentation only. GitHub publication and release tagging are separate from this acceptance record.

Verification: 29/29 structural checks and 40/40 Chromium tests (24 existing plus 16 new failure/recovery tests). Tests cover missing and malformed data, partial/failed refresh, request timeouts, Leaflet loss, overlapping requests, location fallback, map tile recovery and existing configurable-location behavior. Bounded live observations are separate from mocked tests. No physical-device or Safari certification is claimed.

The map now uses OSM Standard over HTTP/HTTPS with attribution and origin Referer. Direct file opening shows a basemap limitation notice. Missing data no longer implies healthy status or successful refresh. Named Helsinki fallback, stale-response protection and bounded IP lookup are included. Home-location provenance remains a deferred UI enhancement; external provider availability remains a dependency. See [ATR closure evidence](ATR-3.2.3-CLOSURE.json).
