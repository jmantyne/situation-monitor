# Backlog — Situation Monitor

**Date:** 2026-06-23
**Current version:** v3.2.2
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

### Delivered — v3.2

**Configurable City Capability**

v3.2 delivered configurable monitoring locations through two governed increments.

#### Increment 001

Established the first persistent configurable city:

- Save a map inspection as a monitored location
- Persistent storage across refresh
- Temporary inspection remains separate from monitored locations
- Curated 11-city dashboard preserved

#### Increment 002

Expanded the configurable-city model into a bounded collection:

- Add configurable cities from map inspection
- Remove configurable cities individually
- Restore default dashboard
- Duplicate prevention
- Unsupported-selection fail-safe behavior
- v2 persistence model
- Legacy v1 migration support
- Dashboard capacity model

Delivered dashboard capacity:

- Default: Map + 11 curated cities = 12 cells
- Maximum: Map + 11 curated cities + 6 configurable cities = 18 cells

Validation completed on:

- Desktop Safari
- iPhone Portrait
- iPhone Landscape

ADR-006 records the governance validation outcome: Increment 002 became the second successful end-to-end validation of the multi-model AI governance delivery pipeline and confirmed human decision authority over review consensus.

---

### Candidate Future Capability

**User-Managed Curated Set**

Current model:

- 11 curated cities remain fixed
- User adds 0–6 configurable cities

Future evaluation:

Allow users to:

- Reduce curated cities
- Replace curated cities
- Customize the monitored city set

Potential capacity model:

- Minimum: Map + 2 monitored locations
- Maximum: User-defined monitored set

Origin:

Identified during v3.2 Increment 002 validation.

Status:

Deferred.

Not part of v3.2.

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

Increasing the curated city count would have broken the 6-column desktop grid (11 city cards + 1 map = 12 cells), required responsive layout rework, and diluted the focused, curated feel of the dashboard. v3.1 intentionally delivered temporary inspection only; configurable cities were deferred to v3.2 and delivered in v3.2 Increment 001 and Increment 002.

---

## 🇫🇮 Suomi (alkuperäinen)

### Toimitettu — v3.1

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

### Toimitettu — v3.2

**Käyttäjän muokattavat seurantapaikat**

v3.2 toimitti muokattavat seurantapaikat kahdessa hallitussa incrementissä.

#### Increment 001

Perusti ensimmäisen pysyvän muokattavan kaupungin:

- Kartta-inspektion voi tallentaa seurattavaksi paikaksi
- Tallennus säilyy sivun päivityksen yli
- Väliaikainen inspektio pysyy erillään seurattavista paikoista
- Kuratoitu 11 kaupungin dashboard säilyi muuttumattomana

#### Increment 002

Laajensi muokattavan kaupungin mallin rajatuksi kokoelmaksi:

- Muokattavia kaupunkeja voi lisätä kartta-inspektiosta
- Muokattavia kaupunkeja voi poistaa yksitellen
- Dashboardin voi palauttaa oletustilaan
- Duplikaatit estetään
- Tukemattomat valinnat epäonnistuvat turvallisesti
- v2-persistenssimalli
- Vanhan v1-arvon migraatiotuki
- Dashboardin kapasiteettimalli

Toimitettu dashboard-kapasiteetti:

- Oletus: kartta + 11 kuratoitua kaupunkia = 12 solua
- Maksimi: kartta + 11 kuratoitua kaupunkia + 6 muokattavaa kaupunkia = 18 solua

Validointi tehtiin:

- Desktop Safari
- iPhone Portrait
- iPhone Landscape

ADR-006 kirjaa governance-validaation: Increment 002 oli toinen onnistunut päästä päähän -validointi monimalli-AI-governance-putkelle ja vahvisti ihmisoperaattorin päätösvallan review-konsensuksen yli.

---

### Tuleva kyvykkyysehdokas

**Käyttäjän hallitsema kuratoitu setti**

Nykyinen malli:

- 11 kuratoitua kaupunkia pysyy kiinteänä
- Käyttäjä lisää 0–6 muokattavaa kaupunkia

Tuleva arviointi:

Mahdollista käyttäjälle:

- Kuratoitujen kaupunkien vähentäminen
- Kuratoitujen kaupunkien korvaaminen
- Oman seurattavan kaupunkisetin muokkaaminen

Mahdollinen kapasiteettimalli:

- Minimi: kartta + 2 seurattavaa paikkaa
- Maksimi: käyttäjän määrittelemä seurantajoukko

Alkuperä:

Tunnistettu v3.2 Increment 002 -validoinnin aikana.

Status:

Siirretty myöhempään arviointiin.

Ei osa v3.2:ta.

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

11 kaupunkia pysyi tarkoituksella valittuna ja kiinnitettynä v3.1:ssä. Layout oli suunniteltu ja testattu nimenomaan 15" MacBook Pro -näytölle ja iPhone-näytölle — 11 korttia täytti gridin oikein molemmissa. Minua kiinnostavat henkilökohtaisesti juuri nämä 11 paikkaa.

Kuratoitujen kaupunkien määrän kasvattaminen olisi rikkonut 6-sarakkeen desktop-gridin (11 kaupunkikorttia + 1 kartta = 12 solua), vaatinut responsiivisen layoutin uudelleensuunnittelun ja hajottanut dashboardin harkitun, kuratoidun ilmeen. v3.1 toimitti tarkoituksella vain väliaikaisen inspektion; muokattavat kaupungit siirrettiin v3.2:een ja toimitettiin v3.2 Increment 001:ssä ja Increment 002:ssa.
