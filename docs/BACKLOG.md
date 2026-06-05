# Backlog — Situation Monitor

**Date:** 2026-05-29
**Current version:** v3.1.0
**Author:** Jussi Mantynen

---

## 🇬🇧 English

### Delivered — v3.0

**Harness example: CI, security, documentation, 3rd party review**

This release formalizes the project as a documented AI workflow harness example:

- GitHub Actions CI with required smoke test before merge
- Branch protection enforced on main
- 3rd party code review: 7 people (5 USA, 2 EU) + 4 AI analyzers — all findings fixed or documented
- Full documentation: HARNESS.md, ARCHITECTURE.md, STAKEHOLDER-SUMMARY.md, 4 ADRs
- Security hardened: CSP, SRI, XSS audit, no API keys, HTTPS

---

### Delivered — v3.1

**Temporary Inspection Overlay**

v3.1 delivered interactive map inspection without changing the curated 11-city dashboard model:

- User can zoom and pan freely
- Tapping any point on the map opens one temporary floating inspection overlay with live weather and AQI data for that location
- Temporary inspection marker appears on the map for the selected point
- Overlay can be dismissed
- Temporary inspection is runtime-only and disappears on refresh
- No saved cities, no `localStorage`, no backend, and no new API domains
- Example use case: tapping Cape Town during fire season to check air quality before a trip

ADR-005 records the governance validation outcome: v3.1 was the first Situation Monitor feature delivered through the full multi-model AI governance pipeline from backlog to release candidate.

---

### Nice to Have — v3.2

**User-configurable city list**

Currently the 11 cities are hardcoded — there is no way to add, remove, or replace them. A configurable city list would allow any user to build their own monitoring set:

- Add a city by name or by tapping the map
- Remove cities that are not relevant
- Persist the selection in `localStorage` so it survives page refresh

This is a meaningful step up in complexity: the pre-commit hook city count check (exactly 11) would need to be relaxed or replaced with a range check, and the grid layout would need to adapt to variable city counts.

---

### Future Vision — v4.0+

**Native iOS and Mac Desktop application**

The current web stack (single HTML file, free APIs, no server) is intentionally future-proof: all chosen APIs work equally well in a native app context. A v4.0 native application could offer:

- Home screen icon, offline caching, push notifications for threshold alerts
- Mac Desktop: menubar widget showing home city conditions at a glance
- iOS widget: glanceable UV + AQI for the home city on the lock screen

**Premium / paid API integrations**

The current stack uses free APIs exclusively. A paid tier could unlock:

- Higher refresh rates (sub-minute for wildfire or storm monitoring)
- Historical data and trend charts (24 h, 7 day)
- Forecast data (UV and AQI predictions for the next 48 h)
- Radar overlays on the map (precipitation, smoke plumes)

---

### Delivered Scope Boundary — v3.1 deferred configurable cities to v3.2

**Fixed city count of 11 — not configurable in v3.1**

The 11 cities remained deliberately chosen and fixed in v3.1. The layout was designed and tested specifically for a 15-inch MacBook Pro screen and an iPhone display — 11 cards fill the grid correctly on both. The author is personally interested in exactly these 11 locations.

Increasing the curated city count would have broken the 6-column desktop grid (currently 11 city cards + 1 map = 12 cells), required responsive layout rework, and diluted the focused, curated feel of the dashboard. v3.1 intentionally delivered temporary inspection only; configurable cities remain planned for v3.2.

---

## 🇫🇮 Suomi (alkuperäinen)

### Delivered — v3.1

**Väliaikainen inspektio-overlay**

v3.1 toimitti interaktiivisen kartta-inspektion muuttamatta kuratoitua 11 kaupungin dashboard-mallia:

- Käyttäjä voi zoomata ja liikuttaa karttaa vapaasti
- Koskemalla mitä tahansa kohtaa kartalla avautuu yksi väliaikainen kelluva inspektio-overlay, jossa näkyy kyseisen paikan reaaliaikainen sää ja ilmanlaatu
- Kartalle ilmestyy väliaikainen inspektiomarkkeri valittuun pisteeseen
- Overlayn voi sulkea
- Väliaikainen inspektio on vain ajonaikainen ja katoaa sivun päivityksessä
- Ei tallennettuja kaupunkeja, ei `localStorage`:a, ei backendia eikä uusia API-domaineja
- Esimerkki: Kapkaupungin koskeminen tulipalokauden aikana ilmanlaadun tarkistamiseksi ennen matkaa

ADR-005 kirjaa governance-validaation: v3.1 oli ensimmäinen Situation Monitor -ominaisuus, joka vietiin läpi koko monimalli-AI-governance-putkiston backlogista release candidateen.

---

### Nice to Have — v3.2

**Käyttäjän muokattava kaupunkilista**

Tällä hetkellä 11 kaupunkia on kovakoodattu — niitä ei voi lisätä, poistaa tai vaihtaa. Muokattava lista mahdollistaisi oman monitorointisetin rakentamisen:

- Kaupungin lisääminen nimen perusteella tai koskettamalla karttaa
- Tarpeettomien kaupunkien poistaminen
- Valinnan tallentaminen `localStorage`:iin sivun päivityksen yli

Tämä on merkittävä askel monimutkaisuudessa: pre-commit hookin kaupunkien lukumäärätarkistus (tasan 11) pitäisi korvata vaihteluvälitarkistuksella, ja grid-layout pitäisi adaptoida muuttuvalle kaupunkimäärälle.

---

### Future Vision — v4.0+

**Natiivi iOS- ja Mac Desktop -applikaatio**

Nykyinen web-stack on tarkoituksella future-proof: kaikki valitut APIt toimivat yhtä hyvin natiivissa app-kontekstissa. V4.0-natiivisovellus voisi tarjota:

- Kotinäyttöikoni, offline-välimuisti, push-ilmoitukset raja-arvojen ylittyessä
- Mac Desktop: menubar-widget joka näyttää kotikaupungin tilanteen yhdellä silmäyksellä
- iOS-widget: UV + AQI lukitusnäytöllä

**Maksulliset API-integraatiot**

Nykyinen stack käyttää yksinomaan ilmaisia APItä. Maksullinen taso voisi avata:

- Tiheämmän päivitysvälin (alle minuutti metsäpalo- tai myrskyseurannassa)
- Historiatiedot ja trendikaaviot (24 h, 7 vrk)
- Ennustedataa (UV ja AQI-ennuste seuraaville 48 tunnille)
- Tutkakerrokset kartalle (sade, savupilvet)

---

### Toimitettu scope-raja — v3.1 siirsi muokattavat kaupungit v3.2:een

**Kiinteä 11 kaupungin määrä — ei muutettavissa v3.1:ssä**

11 kaupunkia pysyi tarkoituksella valittuna ja kiinnitettynä v3.1:ssä. Layout on suunniteltu ja testattu nimenomaan 15" MacBook Pro -näytölle ja iPhone-näytölle — 11 korttia täyttää gridin oikein molemmissa. Minua kiinnostavat henkilökohtaisesti juuri nämä 11 paikkaa.

Kuratoitujen kaupunkien määrän kasvattaminen olisi rikkonut 6-sarakkeen desktop-gridin (tällä hetkellä 11 kaupunkikorttia + 1 kartta = 12 solua), vaatinut responsiivisen layoutin uudelleensuunnittelun ja hajottanut dashboardin harkitun, kuratoidun ilmeen. v3.1 toimitti tarkoituksella vain väliaikaisen inspektion; muokattavat kaupungit on suunniteltu v3.2:een.
