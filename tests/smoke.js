// Structural smoke test — no browser required, runs with plain Node.js
// Usage: node tests/smoke.js
const fs = require('fs');
const html = fs.readFileSync('situation-monitor.html', 'utf8');
const csp = html.match(/Content-Security-Policy" content="([^"]+)"/)?.[1] || '';
const connectSrc = csp.match(/connect-src ([^;]+);/)?.[1] || '';
const tests = [
  ['Page title',              /<title>Situation Monitor<\/title>/.test(html)],
  ['11 cities in CITIES array', (html.match(/{ id: '/g)||[]).length === 11],
  ['Zulu clock element',      /id="zulu-time"/.test(html)],
  ['Map element',             /id="map"/.test(html)],
  ['Legend bar',              /id="legend-bar"/.test(html)],
  ['Leaflet SRI CSS',         /integrity="sha256-p4Nx/.test(html)],
  ['Leaflet SRI JS',          /integrity="sha256-20nQ/.test(html)],
  ['CSP meta tag',            /Content-Security-Policy/.test(html)],
  ['uvScore function',        /function uvScore/.test(html)],
  ['windLabel function',      /function windLabel/.test(html)],
  ['5-minute API refresh',    /5 \* 60 \* 1000/.test(html)],
  ['Portrait media query',    /max-width.*orientation: portrait/.test(html)],
  ['No Finnish characters',   !/(ä|ö|Ä|Ö)/.test(html)],
  ['Bounded configurable city maximum', /MAX_CONFIGURABLE_CITIES = 6/.test(html)],
  ['V2 configurable city persistence', /CONFIGURABLE_CITIES_STORAGE_KEY/.test(html) && /situation-monitor\.configurableCities\.v2/.test(html)],
  ['Legacy v1 migration support', /LEGACY_CONFIGURABLE_CITY_STORAGE_KEY/.test(html) && /situation-monitor\.configurableCity\.v1/.test(html)],
  ['Bounded localStorage persistence', /localStorage\.setItem/.test(html) && /localStorage\.removeItem/.test(html)],
  ['No reverse geocoding domain', !/(nominatim|geocode|geocoding|mapbox)/i.test(connectSrc)],
  ['No new connect-src domains', connectSrc === 'https://api.open-meteo.com https://air-quality-api.open-meteo.com https://api.sunrise-sunset.org https://ipapi.co'],
  ['Map click handler',       /map\.on\('click', handleMapInspectionClick\)/.test(html)],
  ['Inspection generation counter', /let inspectionGeneration = 0/.test(html)],
  ['removeInspection function', /function removeInspection/.test(html)],
  ['Inspection overlay element', /id="inspection-overlay"/.test(html)],
  ['Inspection save button',   /id="inspection-save"/.test(html)],
  ['Configurable city id prefix', /CONFIGURABLE_CITY_ID_PREFIX = 'configurable-city-'/.test(html)],
  ['Coordinate duplicate identity', /function coordinateIdentity/.test(html) && /toFixed\(3\)/.test(html)],
  ['Restore default control', /id="restore-default"/.test(html) && /function restoreDefaultConfiguration/.test(html)],
  ['Display city boundary helper', /function allDisplayCities\(\)/.test(html)],
  ['fetchAllCities uses bounded display cities', /Promise\.allSettled\(allDisplayCities\(\)\.map\(city => fetchCityData\(city\)\)\)/.test(html)],
];
let pass = 0, fail = 0;
tests.forEach(([name, result]) => {
  console.log((result ? '✅' : '❌') + ' ' + name);
  result ? pass++ : fail++;
});
console.log('\n' + (fail === 0 ? '✅' : '❌') + ' ' + pass + '/' + tests.length + ' tests passed');
process.exit(fail > 0 ? 1 : 0);
