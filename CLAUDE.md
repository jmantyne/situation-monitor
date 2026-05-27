# CLAUDE.md — Situation Monitor

Tämä tiedosto on Claude Coden automaattinen muistio.
Lue tämä aina session alussa. Älä koskaan poista vanhoja versioita tai merkintöjä.

---

## 🔧 ASENNUS — tee tämä heti kloonauksen jälkeen

```bash
git config core.hooksPath .githooks
```

Hook on `.githooks/pre-commit` — se siirtyy gitin mukana mutta aktivointi pitää tehdä käsin.

---

## ⛔ PAKOLLINEN PROSESSI — ENNEN JOKAISTA COMMITIA

**Järjestys on aina tämä. Ei poikkeuksia.**

1. Tee koodimuutokset
2. **Aja regressiotestit** (alla olevat bash-komennot)
3. Kirjaa tulokset `REGRESSION.md`:ään uutena versioentriana
4. Päivitä `README.md` versiohistoria
5. Päivitä `CLAUDE.md` versiotaulukko
6. Commitoi kaikki yhdessä — hook tarkistaa automaattisesti

**Regression automaattiset tarkistukset:**
```bash
FILE=situation-monitor.html
grep -o "{ id: '[^']*'" $FILE | wc -l
grep -o "{ id: '[^']*'" $FILE | sort | uniq -d
grep "function uvScore\|function aqiScore\|function windScore\|function degToCompass" $FILE
grep "max-width.*orientation" $FILE
wc -c < $FILE
```

---

## Versionhallinta

| Versio | Päivämäärä | Muutos |
|--------|------------|--------|
| v1.0 | 2026-05-27 | Initial release — 11 cities, Leaflet map, all APIs, responsive layouts |
| v1.01 | 2026-05-27 | Turku → Nairobi (Kenya, UTC+3 no DST), HUM dry colour #88ccff |
| v1.02 | 2026-05-27 | Pre-commit hook: file size + duplicate city ID checks |
| v1.03 | 2026-05-27 | windLabel function: CALM/BREEZE/MOD/STRONG/GALE/STORM after wind speed; data-row gap 4→2px |
| v1.04 | 2026-05-27 | windLabel returns {text,cls}; wind-calm #88ccff CSS; BREEZE=uv-low, MOD=uv-mod, STRONG=uv-high, GALE=uv-vhigh, STORM=uv-extr |

---

## Fail-loki — virheet ja korjaukset

| Versio | Päivämäärä | Fail | Korjaus |
|--------|------------|------|---------|
| v1.01 | 2026-05-27 | Regressiotestit unohdettiin ajaa ennen commitia | Ajettiin jälkikäteen, erillinen commit |

---

## Kaupungit — odotettu tila (v1.02+)

Järjestys länsi → itä. 11 kaupunkia.

| id | Nimi | Aikavyöhyke | lon |
|----|------|-------------|-----|
| honolulu | Honolulu 🇺🇸 | Pacific/Honolulu | -157.86 |
| san-jose | San Jose 🇺🇸 | America/Los_Angeles | -121.89 |
| tahoe | Tahoe City 🇺🇸 | America/Los_Angeles | -120.15 |
| new-york | New York 🇺🇸 | America/New_York | -74.01 |
| london | London 🇬🇧 | Europe/London | -0.13 |
| tampere | Tampere 🇫🇮 | Europe/Helsinki | 23.76 |
| helsinki | Helsinki 🇫🇮 | Europe/Helsinki | 24.94 |
| istanbul | Istanbul 🇹🇷 | Europe/Istanbul | 28.98 |
| nairobi | Nairobi 🇰🇪 | Africa/Nairobi | 36.82 |
| dubai | Dubai 🇦🇪 | Asia/Dubai | 55.27 |
| sydney | Sydney 🇦🇺 | Australia/Sydney | 151.21 |

**Huomiot:**
- Dubai: ainoa kaupunki ilman kesäaikaa (UTC+4 aina) — käytä UTC-logiikan testaukseen
- Nairobi: ei DST (UTC+3 aina) — sama offset kuin Istanbul mutta eri manner
- Honolulu on aina ensimmäinen (läntisin)

---

## Pre-commit hook — mitä tarkistaa

Hook sijaitsee `.githooks/pre-commit`. Ajaa kun `situation-monitor.html` on stagessa.

| # | Tarkistus | Arvo |
|---|-----------|------|
| 1 | Kaupunkien määrä | täsmälleen 11 |
| 2 | Kaikki id:t läsnä | ks. lista yllä |
| 3 | API-endpointit | open-meteo · air-quality-api · sunrise-sunset · ip-api |
| 4 | Score-funktiot | uvScore · aqiScore · windScore · degToCompass |
| 5 | Media queryt | portrait + landscape |
| 6 | REGRESSION.md stagessa | pakollinen |
| 7 | Tiedostokoko | < 200 000 bytes |
| 8 | Ei duplikaatti-id:tä | — |

---

## Data sources

| Data | API |
|------|-----|
| Sää, UV, tuuli, paine | api.open-meteo.com |
| AQI, PM2.5, NO₂ | air-quality-api.open-meteo.com |
| Aurinko nousu/lasku | api.sunrise-sunset.org |
| Kotikaupunki (IP) | ip-api.com |
| Karttapohjat | CartoDB Voyager (Leaflet) |

---

## Opitut virheet — älä toista

### Tiedoston sisältö menee pieleen nimeämisessä
- Kun nimeät tiedoston GitHubissa web-editorilla, tarkista RAW-sisältö ennen julkaisua
- Käytä aina: `https://raw.githubusercontent.com/jmantyne/situation-monitor/main/situation-monitor.html`

### Duplikaatti CITIES-määrittely
- Älä koskaan määrittele CITIES-arrayta kahdesti — JS käyttää jälkimmäistä hiljaa

### GitHub Pages URL
- Live-osoite: `https://jmantyne.github.io/situation-monitor/situation-monitor.html`
- Pages konfiguroitu: branch `main` / `/(root)`

---

## Muistiinpanot

- 2026-05-27: Repo luotu — siirretty Harjoittelu/docs/ -kansiosta omaksi julkiseksi repoksi
- 2026-05-27: index.html kokeilu epäonnistui (väärä sisältö) — palattiin situation-monitor.html nimeen
