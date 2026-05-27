// Structural smoke test — no browser required, runs with plain Node.js
// Usage: node tests/smoke.js
const fs = require('fs');
const html = fs.readFileSync('situation-monitor.html', 'utf8');
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
];
let pass = 0, fail = 0;
tests.forEach(([name, result]) => {
  console.log((result ? '✅' : '❌') + ' ' + name);
  result ? pass++ : fail++;
});
console.log('\n' + (fail === 0 ? '✅' : '❌') + ' ' + pass + '/' + tests.length + ' tests passed');
process.exit(fail > 0 ? 1 : 0);
