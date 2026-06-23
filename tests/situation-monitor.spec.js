// Situation Monitor — Playwright test suite
// Run: npx playwright test
// Install: npm install -D @playwright/test && npx playwright install chromium

const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file://' + path.resolve(__dirname, '../situation-monitor.html');
const CITY_IDS = ['honolulu','san-jose','tahoe','new-york','london',
                  'tampere','helsinki','istanbul','nairobi','dubai','sydney'];

const weatherPayload = (temp, uv = 6.2, wind = 28) => ({
  current: {
    temperature_2m: temp,
    relative_humidity_2m: 47,
    uv_index: uv,
    surface_pressure: 1012,
    wind_speed_10m: wind,
    wind_direction_10m: 225
  }
});

const airPayload = (aqi = 87) => ({
  current: {
    us_aqi: aqi,
    pm2_5: 14.6,
    pm10: 23.4,
    nitrogen_dioxide: 31.2,
    ozone: 78.1
  }
});

const sunPayload = {
  status: 'OK',
  results: {
    sunrise: '2026-06-04T04:00:00+00:00',
    sunset: '2026-06-04T20:00:00+00:00'
  }
};

async function mockApis(page, options = {}) {
  let inspectionMode = false;
  let staleWeatherCount = 0;
  let releaseFirstWeather;
  const firstWeatherReleased = new Promise(resolve => { releaseFirstWeather = resolve; });

  await page.route('https://api.open-meteo.com/**', async route => {
    if (inspectionMode && options.staleWeather) {
      staleWeatherCount += 1;
      if (staleWeatherCount === 1) {
        await firstWeatherReleased;
        await route.fulfill({ json: weatherPayload(5.5, 1.1, 8) });
        return;
      }
      await route.fulfill({ json: weatherPayload(31.2, 9.4, 55) });
      return;
    }
    await route.fulfill({ json: weatherPayload(21.4) });
  });

  await page.route('https://air-quality-api.open-meteo.com/**', async route => {
    await route.fulfill({ json: airPayload(87) });
  });

  await page.route('https://api.sunrise-sunset.org/**', async route => {
    await route.fulfill({ json: sunPayload });
  });

  await page.route('https://ipapi.co/**', async route => {
    await route.fulfill({ json: { timezone: 'America/Los_Angeles', latitude: 37.3382, longitude: -121.8863 } });
  });

  return {
    enableInspectionMode: () => { inspectionMode = true; },
    releaseFirstWeather: () => releaseFirstWeather()
  };
}

async function openApp(page, options) {
  const api = await mockApis(page, options);
  await page.goto(FILE_URL);
  await expect(page.locator('#map')).toBeVisible();
  return api;
}

async function openAppWithLegacyStoredCity(page, city) {
  await page.addInitScript(value => {
    localStorage.setItem('situation-monitor.configurableCity.v1', JSON.stringify(value));
  }, city);
  return openApp(page);
}

async function openAppWithStoredConfigurableCities(page, cities) {
  await page.addInitScript(value => {
    localStorage.setItem('situation-monitor.configurableCities.v2', JSON.stringify(value));
  }, cities);
  return openApp(page);
}

async function clickMap(page, x = 90, y = 90) {
  await page.locator('#map').click({ position: { x, y } });
}

async function saveMapPoint(page, lat, lon) {
  await page.evaluate(({ lat, lon }) => {
    map.fire('click', { latlng: L.latLng(lat, lon) });
  }, { lat, lon });
  await expect(page.locator('#inspection-overlay')).toBeVisible();
  await page.locator('#inspection-save').click();
}

const MAX_CONFIGURABLE_POINTS = [
  [10.0, 10.0],
  [20.0, 20.0],
  [30.0, 30.0],
  [40.0, 40.0],
  [50.0, 50.0],
  [60.0, 60.0],
];

const STORED_CONFIGURABLE_CITIES = [
  { lat: 35.0, lon: 139.0 },
  { lat: 48.8, lon: 2.3 },
  { lat: -23.5, lon: -46.6 },
  { lat: 19.4, lon: -99.1 },
  { lat: 1.3, lon: 103.8 },
  { lat: 64.1, lon: -21.9 },
];

test.describe('Situation Monitor', () => {

  test('page loads and title is correct', async ({ page }) => {
    await openApp(page);
    await expect(page).toHaveTitle('Situation Monitor');
  });

  test('all 11 city cards are present', async ({ page }) => {
    await openApp(page);
    for (const id of CITY_IDS) {
      await expect(page.locator(`#card-${id}`)).toBeVisible();
    }
  });

  test('Zulu clock is visible and ticking', async ({ page }) => {
    await openApp(page);
    const clock = page.locator('#zulu-time');
    const t1 = await clock.textContent();
    await page.waitForTimeout(1100);
    const t2 = await clock.textContent();
    expect(t1).not.toBe(t2);
  });

  test('map element is present', async ({ page }) => {
    await openApp(page);
    await expect(page.locator('#map')).toBeVisible();
  });

  test('legend bar is visible', async ({ page }) => {
    await openApp(page);
    await expect(page.locator('#legend-bar')).toBeVisible();
  });

  test('clicking the map opens a temporary inspection overlay with loading feedback', async ({ page }) => {
    const api = await openApp(page, { staleWeather: true });
    api.enableInspectionMode();
    await clickMap(page);
    await expect(page.locator('#inspection-overlay')).toBeVisible();
    await expect(page.locator('#inspection-coords')).toContainText(/[NS] \d+\.\d{3}, [EW] \d+\.\d{3}/);
    await expect(page.locator('#inspection-status')).toContainText(/loading/i);
    api.releaseFirstWeather();
  });

  test('mocked weather and AQI responses render in the inspection overlay', async ({ page }) => {
    const api = await openApp(page);
    api.enableInspectionMode();
    await clickMap(page);
    await expect(page.locator('#inspection-temp')).toContainText('70.5°F / 21.4°C');
    await expect(page.locator('#inspection-aqi')).toHaveText('87');
    await expect(page.locator('#inspection-pm25')).toHaveText('14.6');
    await expect(page.locator('#inspection-no2')).toHaveText('31.2');
  });

  test('dismiss removes the temporary inspection overlay', async ({ page }) => {
    const api = await openApp(page);
    api.enableInspectionMode();
    await clickMap(page);
    await expect(page.locator('#inspection-overlay')).toBeVisible();
    await page.locator('#inspection-dismiss').click();
    await expect(page.locator('#inspection-overlay')).toBeHidden();
  });

  test('a second map click replaces the first temporary inspection', async ({ page }) => {
    const api = await openApp(page);
    api.enableInspectionMode();
    await clickMap(page, 70, 70);
    await expect(page.locator('#inspection-overlay')).toBeVisible();
    const firstCoords = await page.locator('#inspection-coords').textContent();
    await clickMap(page, 170, 120);
    const secondCoords = await page.locator('#inspection-coords').textContent();
    expect(secondCoords).not.toBe(firstCoords);
    await expect(page.locator('#inspection-overlay')).toHaveCount(1);
  });

  test('stale first inspection response cannot overwrite the second inspection', async ({ page }) => {
    const api = await openApp(page, { staleWeather: true });
    api.enableInspectionMode();
    await clickMap(page, 70, 70);
    await clickMap(page, 170, 120);
    await expect(page.locator('#inspection-temp')).toContainText('88.2°F / 31.2°C');
    api.releaseFirstWeather();
    await page.waitForTimeout(200);
    await expect(page.locator('#inspection-temp')).toContainText('88.2°F / 31.2°C');
  });

  test('temporary inspection does not become a twelfth curated city card', async ({ page }) => {
    const api = await openApp(page);
    api.enableInspectionMode();
    await clickMap(page);
    await expect(page.locator('.city-card')).toHaveCount(11);
    for (const id of CITY_IDS) {
      await expect(page.locator(`#card-${id}`)).toBeVisible();
    }
  });

  test('saving an inspection creates one persistent configurable city card', async ({ page }) => {
    const api = await openApp(page);
    api.enableInspectionMode();
    await saveMapPoint(page, 12.345, 67.89);
    await expect(page.locator('.city-card')).toHaveCount(12);
    await expect(page.locator('#card-configurable-city-1')).toBeVisible();
    await expect(page.locator('#card-configurable-city-1 .card-name')).toHaveText('Saved Point 1');
    await expect(page.locator('#card-configurable-city-1 .home-badge')).toHaveText('SAVED');
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('situation-monitor.configurableCities.v2')));
    expect(saved).toHaveLength(1);
    expect(saved[0]).toHaveProperty('lat');
    expect(saved[0]).toHaveProperty('lon');
  });

  test('configurable cities reload from v2 storage', async ({ page }) => {
    await openAppWithStoredConfigurableCities(page, STORED_CONFIGURABLE_CITIES.slice(0, 2));
    await expect(page.locator('.city-card')).toHaveCount(13);
    await expect(page.locator('#card-configurable-city-1')).toBeVisible();
    await expect(page.locator('#card-configurable-city-2')).toBeVisible();
    await expect(page.locator('#temp-configurable-city-1')).toContainText('70.5°F / 21.4°C');
  });

  test('legacy v1 configurable city migrates to v2 storage', async ({ page }) => {
    await openAppWithLegacyStoredCity(page, { lat: 35.0, lon: 139.0 });
    await expect(page.locator('.city-card')).toHaveCount(12);
    await expect(page.locator('#card-configurable-city-1')).toBeVisible();
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('situation-monitor.configurableCities.v2')));
    expect(saved).toHaveLength(1);
    expect(saved[0].lat).toBe(35.0);
    expect(saved[0].lon).toBe(139.0);
  });

  test('saving inspections appends up to six configurable cities', async ({ page }) => {
    const api = await openApp(page);
    api.enableInspectionMode();
    for (let i = 0; i < MAX_CONFIGURABLE_POINTS.length; i += 1) {
      await saveMapPoint(page, MAX_CONFIGURABLE_POINTS[i][0], MAX_CONFIGURABLE_POINTS[i][1]);
      await expect(page.locator('.city-card')).toHaveCount(12 + i);
      await expect(page.locator(`#card-configurable-city-${i + 1}`)).toBeVisible();
    }
    await expect(page.locator('.city-card')).toHaveCount(17);
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('situation-monitor.configurableCities.v2')));
    expect(saved).toHaveLength(6);
  });

  test('seventh configurable city save is blocked safely', async ({ page }) => {
    const api = await openAppWithStoredConfigurableCities(page, STORED_CONFIGURABLE_CITIES);
    api.enableInspectionMode();
    await expect(page.locator('.city-card')).toHaveCount(17);
    await saveMapPoint(page, -12.3, 77.7);
    await expect(page.locator('.city-card')).toHaveCount(17);
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('situation-monitor.configurableCities.v2')));
    expect(saved).toHaveLength(6);
  });

  test('duplicate configurable city save is rejected safely', async ({ page }) => {
    const api = await openApp(page);
    api.enableInspectionMode();
    await saveMapPoint(page, 12.345, 67.89);
    await expect(page.locator('.city-card')).toHaveCount(12);
    await saveMapPoint(page, 12.345, 67.89);
    await expect(page.locator('.city-card')).toHaveCount(12);
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('situation-monitor.configurableCities.v2')));
    expect(saved).toHaveLength(1);
  });

  test('duplicate curated city coordinate is rejected safely', async ({ page }) => {
    await openApp(page);
    const result = await page.evaluate(() => {
      const before = localStorage.getItem('situation-monitor.configurableCities.v2');
      const allowed = canAddConfigurableCity({ lat: 21.3069, lon: -157.8583 });
      return { before, allowed, count: document.querySelectorAll('.city-card').length };
    });
    expect(result.allowed).toBe(false);
    expect(result.before).toBeNull();
    expect(result.count).toBe(11);
  });

  test('removing the configurable city restores the 11 curated city boundary', async ({ page }) => {
    await openAppWithStoredConfigurableCities(page, STORED_CONFIGURABLE_CITIES.slice(0, 2));
    await expect(page.locator('.city-card')).toHaveCount(13);
    await page.locator('#card-configurable-city-1 .config-remove').click();
    await expect(page.locator('.city-card')).toHaveCount(12);
    await expect(page.locator('#card-configurable-city-1')).toBeVisible();
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('situation-monitor.configurableCities.v2')));
    expect(saved).toHaveLength(1);
  });

  test('invalid persistent city data fails closed to curated cities only', async ({ page }) => {
    await openAppWithStoredConfigurableCities(page, [{ lat: 999, lon: 139.0 }]);
    await expect(page.locator('.city-card')).toHaveCount(11);
    await expect(page.locator('[id^="card-configurable-city-"]')).toHaveCount(0);
    for (const id of CITY_IDS) {
      await expect(page.locator(`#card-${id}`)).toBeVisible();
    }
  });

  test('restore default returns to 11 curated cities and clears storage', async ({ page }) => {
    await openAppWithStoredConfigurableCities(page, STORED_CONFIGURABLE_CITIES.slice(0, 3));
    await expect(page.locator('.city-card')).toHaveCount(14);
    await page.locator('#restore-default').click();
    await expect(page.locator('.city-card')).toHaveCount(11);
    await expect(page.locator('[id^="card-configurable-city-"]')).toHaveCount(0);
    const saved = await page.evaluate(() => ({
      v2: localStorage.getItem('situation-monitor.configurableCities.v2'),
      v1: localStorage.getItem('situation-monitor.configurableCity.v1')
    }));
    expect(saved.v2).toBeNull();
    expect(saved.v1).toBeNull();
  });

  test('desktop remains usable at 18 dashboard cells', async ({ page }) => {
    await openAppWithStoredConfigurableCities(page, STORED_CONFIGURABLE_CITIES);
    await expect(page.locator('#map')).toBeVisible();
    await expect(page.locator('.city-card')).toHaveCount(17);
    await expect(page.locator('#card-honolulu')).toBeVisible();
    await expect(page.locator('#card-configurable-city-6')).toBeVisible();
  });

  test('mobile portrait overlay does not hide the map or curated city grid', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const api = await openAppWithStoredConfigurableCities(page, STORED_CONFIGURABLE_CITIES);
    api.enableInspectionMode();
    await clickMap(page, 120, 80);
    await expect(page.locator('#inspection-overlay')).toBeVisible();
    await expect(page.locator('#map')).toBeVisible();
    await expect(page.locator('#card-honolulu')).toBeVisible();
    await expect(page.locator('#card-configurable-city-6')).toBeVisible();
  });

  test('mobile landscape overlay does not hide the map or legend', async ({ page }) => {
    await page.setViewportSize({ width: 844, height: 390 });
    const api = await openAppWithStoredConfigurableCities(page, STORED_CONFIGURABLE_CITIES);
    api.enableInspectionMode();
    await clickMap(page, 120, 80);
    await expect(page.locator('#inspection-overlay')).toBeVisible();
    await expect(page.locator('#map')).toBeVisible();
    await expect(page.locator('#legend-bar')).toBeVisible();
    await expect(page.locator('#card-configurable-city-6')).toBeVisible();
  });

});
