const { test, expect } = require('@playwright/test');
const path = require('node:path');
const FILE_URL = 'file://' + path.resolve(__dirname, '../situation-monitor.html');
const weather = { current: { temperature_2m: 21, relative_humidity_2m: 45, uv_index: 1, surface_pressure: 1012, wind_speed_10m: 3, wind_direction_10m: 90 } };
const air = { current: { us_aqi: 20, pm2_5: 2, pm10: 4, nitrogen_dioxide: 2, ozone: 10 } };
const sun = { status: 'OK', results: { sunrise: '2026-09-16T06:00:00Z', sunset: '2026-09-16T18:00:00Z' } };
async function setup(page, failures = {}) {
  await page.route('https://ipapi.co/**', r => r.fulfill({ status: 429, json: { error: true, reason: 'RateLimited' } }));
  for (const [id, pattern, payload] of [
    ['weather','https://api.open-meteo.com/**',weather],
    ['air','https://air-quality-api.open-meteo.com/**',air],
    ['sun','https://api.sunrise-sunset.org/**',sun]
  ]) await page.route(pattern, r => {
    const failure = failures[id];
    if (failure === 'abort') return r.abort();
    if (failure === 'invalid') return r.fulfill({ contentType: 'application/json', body: '{broken' });
    if (failure === 'empty') return r.fulfill({ json: { current: { uv_index: 'bad' } } });
    if (failure) return r.fulfill({ status: failure, json: { error: true } });
    return r.fulfill({ json: payload });
  });
}
for (const failure of [429, 500, 'abort', 'invalid', 'empty']) {
  test(`unavailable data stays unknown for ${failure} and recovers`, async ({page}) => {
    const failures = {weather:failure,air:failure,sun:failure};
    await setup(page,failures); await page.goto(FILE_URL);
    await expect(page.locator('#refresh-info')).toHaveText('Refresh failed - data unavailable');
    await expect(page.locator('#card-san-jose')).toHaveAttribute('data-status','unknown');
    expect(await page.evaluate(()=>lastUpdated)).toBeNull();
    for(const key of Object.keys(failures)) delete failures[key];
    await page.evaluate(()=>fetchAllCities());
    await expect(page.locator('#refresh-info')).toContainText('Updated');
    await expect(page.locator('#card-san-jose')).toHaveAttribute('data-status','green');
  });
}
test('one missing scoring source is disclosed as unknown and partial',async({page})=>{
  await setup(page,{air:500});await page.goto(FILE_URL);
  await expect(page.locator('#refresh-info')).toContainText('Partial update');
  await expect(page.locator('#card-san-jose')).toHaveAttribute('data-status','unknown');
  expect(await page.evaluate(()=>cityData['san-jose'].weather.temp)).toBe(21);
});
test('Leaflet unavailable does not stop city data or clocks',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await setup(page);await page.route('https://unpkg.com/**',r=>r.abort());await page.goto(FILE_URL);
  await expect(page.locator('#map')).toContainText('Map unavailable');
  await expect(page.locator('#refresh-info')).toContainText('Updated');
  await expect(page.locator('#card-san-jose')).toContainText('69.8');
  expect(errors).toEqual([]);
});
test('hung environmental request times out rather than hanging refresh',async({page})=>{
  await setup(page);await page.goto(FILE_URL);
  await page.evaluate(async()=>{
    const original=window.fetch;
    window.fetch=(_url,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError'))));
    const oldTimeout=window.setTimeout;
    window.setTimeout=(fn,delay,...args)=>oldTimeout(fn,delay===12000?10:delay,...args);
    try { await fetchAllCities(); } finally {window.fetch=original;window.setTimeout=oldTimeout;}
  });
  await expect(page.locator('#refresh-info')).toHaveText('Refresh failed - data unavailable');
});
test('file opening makes no OSM requests and discloses basemap limitation',async({page})=>{
  let requests=0;await setup(page);
  await page.route('https://tile.openstreetmap.org/**',r=>{requests++;return r.abort();});
  await page.goto(FILE_URL);
  await expect(page.locator('#map-notice')).toContainText('Open the web version');
  expect(requests).toBe(0);
  await expect(page.locator('#map-attr')).toContainText('OpenStreetMap contributors');
});
test('HTTP mode requests OSM with real origin Referer and displays tile failure',async({page})=>{
  const fs=require('node:fs');let requests=[];
  await setup(page);
  await page.route('http://127.0.0.1:49199/app.html',r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(path.resolve(__dirname,'../situation-monitor.html'),'utf8')}));
  await page.route('https://tile.openstreetmap.org/**',r=>{requests.push({url:r.request().url(),referer:r.request().headers().referer});return r.fulfill({status:503,body:'Unavailable'});});
  await page.goto('http://127.0.0.1:49199/app.html');
  await expect(page.locator('#map-notice')).toContainText('Basemap unavailable');
  expect(requests.length).toBeGreaterThan(0);
  expect(requests.every(r=>r.referer==='http://127.0.0.1:49199/' && !r.url.includes('@2x'))).toBeTruthy();
  await expect(page.locator('#refresh-info')).toContainText('Updated');
});

test('invalid solar times produce partial refresh',async({page})=>{
  await setup(page);
  await page.route('https://api.sunrise-sunset.org/**',r=>r.fulfill({json:{status:'OK',results:{sunrise:'invalid',sunset:null}}}));
  await page.goto(FILE_URL);
  await expect(page.locator('#refresh-info')).toContainText('Partial update');
  expect(await page.evaluate(()=>cityData['san-jose'].sun.sunrise)).toBeNull();
});
test('unrecognized timezone falls back to Helsinki after location failure',async({page})=>{
  await setup(page);await page.goto(FILE_URL);
  await page.evaluate(()=>{cityByTimezone=()=>null;useDefault();});
  expect(await page.evaluate(()=>homeCityId)).toBe('helsinki');
});
test('unknown home status has a neutral border',async({page})=>{
  await setup(page,{air:500});await page.goto(FILE_URL);
  await expect(page.locator('#refresh-info')).toContainText('Partial update');
  await page.evaluate(()=>markHome(CITIES.find(c=>c.id==='san-jose')));
  await expect(page.locator('#card-san-jose')).toHaveCSS('border-top-color','rgb(135, 148, 170)');
});

test('older refresh failure cannot replace a newer successful batch',async({page})=>{
 await setup(page);await page.goto(FILE_URL);await expect(page.locator('#refresh-info')).toContainText('Updated');
 const result=await page.evaluate(async()=>{
  const original=fetchEnvironmentalData;const pending=[];
  fetchEnvironmentalData=()=>new Promise(resolve=>pending.push(resolve));
  const older=fetchAllCities();fetchEnvironmentalData=original;
  await fetchAllCities();const banner=document.getElementById('refresh-info').textContent;
  pending.forEach(resolve=>resolve({weather:null,air:null,sun:null}));await older;
  return {banner,after:document.getElementById('refresh-info').textContent,temp:cityData['san-jose'].weather?.temp};
 });
 expect(result.temp).toBe(21);expect(result.after).toBe(result.banner);
});
test('denied GPS and hung IP request reach named fallback',async({page})=>{
 await setup(page);await page.addInitScript(()=>{
  navigator.geolocation.getCurrentPosition=(_success,failure)=>failure({code:1});
  const realFetch=window.fetch;window.fetch=(url,options)=>String(url).includes('ipapi.co')?new Promise((resolve,reject)=>options.signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')))):realFetch(url,options);
  const timer=window.setTimeout;window.setTimeout=(fn,ms,...args)=>timer(fn,ms===12000?50:ms,...args);
  const original=Intl.DateTimeFormat;Intl.DateTimeFormat=function(...args){const format=new original(...args);format.resolvedOptions=()=>({timeZone:'Unrecognized/Zone'});return format;};
 });
 await page.goto(FILE_URL);await expect.poll(()=>page.evaluate(()=>homeCityId)).toBe('helsinki');
});
test('basemap notice clears when a later tile succeeds',async({page})=>{
 const fs=require('node:fs');await setup(page);
 await page.route('http://127.0.0.1:49199/app.html',r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(path.resolve(__dirname,'../situation-monitor.html'),'utf8')}));
 await page.route('https://tile.openstreetmap.org/**',r=>r.fulfill({status:503,body:'Unavailable'}));
 await page.goto('http://127.0.0.1:49199/app.html');await expect(page.locator('#map-notice')).toBeVisible();
 await page.route('https://tile.openstreetmap.org/**',r=>r.fulfill({contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aL1sAAAAASUVORK5CYII=','base64')}));
 await page.evaluate(()=>map.eachLayer(layer=>{if(layer instanceof L.TileLayer)layer.redraw();}));
 await expect(page.locator('#map-notice')).toBeHidden();
});
