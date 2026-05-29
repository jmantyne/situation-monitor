# Backlog — Situation Monitor

**Date:** 2026-05-29
**Current version:** v2.8.1
**Author:** Jussi Mantynen

---

## 🇬🇧 English

### Must Have — v3.0

**Interactive map: zoom and tap to add any city**

The current map is read-only — pins are fixed to the 11 pre-configured cities and the zoom level is set automatically on load. The next meaningful step is to make the map interactive:

- User can zoom and pan freely
- Tapping any point on the map adds a temporary city card with live weather and AQI data for that location
- Example use case: tapping Cape Town during fire season to check air quality before a trip

This is the single most requested interaction pattern for a monitoring dashboard and would significantly increase the product's practical value without changing the core architecture.

---

### Nice to Have — v3.1

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

### Won't Do in v3.0 — deferred to v3.1

**Fixed city count of 11 — not configurable in v3.0**

The 11 cities are deliberately chosen and fixed for v3.0. The layout was designed and tested specifically for a 15-inch MacBook Pro screen and an iPhone display — 11 cards fill the grid correctly on both. The author is personally interested in exactly these 11 locations.

Increasing the city count would break the 6-column desktop grid (currently 11 city cards + 1 map = 12 cells), require responsive layout rework, and dilute the focused, curated feel of the dashboard. This constraint is a design decision for v3.0 — configurable cities are planned for v3.1.

---

## 🇫🇮 Suomi (alkuperäinen)

### Must Have — v3.0

**Interaktiivinen kartta: zoomaus ja kosketus mille tahansa kaupungille**

Nykyinen kartta on vain luku — pinit ovat kiinni 11 ennakkoon asetetussa kaupungissa ja zoom-taso asetetaan automaattisesti sivun latautuessa. Seuraava askel on tehdä kartasta interaktiivinen:

- Käyttäjä voi zoomata ja liikuttaa karttaa vapaasti
- Koskemalla mitä tahansa kohtaa kartalla saa kyseisen paikan reaaliaikaisen sääkortin
- Esimerkki: Kapkaupungin koskeminen tulipalokauden aikana ilmanlaadun tarkistamiseksi ennen matkaa

---

### Nice to Have — v3.1

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

### Tietoisesti jätetty pois v3.0:ssa — siirretty v3.1:een

**Kiinteä 11 kaupungin määrä — ei muutettavissa v3.0:ssa**

11 kaupunkia on tarkoituksella valittu ja kiinnitetty v3.0:aan. Layout on suunniteltu ja testattu nimenomaan 15" MacBook Pro -näytölle ja iPhone-näytölle — 11 korttia täyttää gridin oikein molemmissa. Minua kiinnostavat henkilökohtaisesti juuri nämä 11 paikkaa.

Kaupunkien määrän kasvattaminen rikkoisi 6-sarakkeen desktop-gridin (tällä hetkellä 11 kaupunkikorttia + 1 kartta = 12 solua), vaatisi responsiivisen layoutin uudelleensuunnittelun ja hajottaisi dashboardin harkitun, kuratoidun ilmeen. Tämä on v3.0:n designpäätös — muokattavat kaupungit on suunniteltu v3.1:een.

