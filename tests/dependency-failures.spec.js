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
