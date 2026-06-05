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
  ['No localStorage',         !/localStorage/.test(html)],
  ['No reverse geocoding domain', !/(nominatim|geocode|geocoding|mapbox)/i.test(connectSrc)],
  ['No new connect-src domains', connectSrc === 'https://api.open-meteo.com https://air-quality-api.open-meteo.com https://api.sunrise-sunset.org https://ipapi.co'],
  ['Map click handler',       /map\.on\('click', handleMapInspectionClick\)/.test(html)],
  ['Inspection generation counter', /let inspectionGeneration = 0/.test(html)],
  ['removeInspection function', /function removeInspection/.test(html)],
  ['Inspection overlay element', /id="inspection-overlay"/.test(html)],
  ['fetchAllCities only uses CITIES', /Promise\.allSettled\(CITIES\.map\(city => fetchCityData\(city\)\)\)/.test(html)],
];
let pass = 0, fail = 0;
tests.forEach(([name, result]) => {
  console.log((result ? '✅' : '❌') + ' ' + name);
  result ? pass++ : fail++;
});
console.log('\n' + (fail === 0 ? '✅' : '❌') + ' ' + pass + '/' + tests.length + ' tests passed');
process.exit(fail > 0 ? 1 : 0);
