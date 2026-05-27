// Situation Monitor — Playwright test suite
// Run: npx playwright test
// Install: npm install -D @playwright/test && npx playwright install chromium

import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE_URL = 'file://' + path.resolve(__dirname, '../situation-monitor.html');

test.describe('Situation Monitor', () => {

  test('page loads and title is correct', async ({ page }) => {
    await page.goto(FILE_URL);
    await expect(page).toHaveTitle('Situation Monitor');
  });

  test('all 11 city cards are present', async ({ page }) => {
    await page.goto(FILE_URL);
    const ids = ['honolulu','san-jose','tahoe','new-york','london',
                 'tampere','helsinki','istanbul','nairobi','dubai','sydney'];
    for (const id of ids) {
      await expect(page.locator(`#card-${id}`)).toBeVisible();
    }
  });

  test('Zulu clock is visible and ticking', async ({ page }) => {
    await page.goto(FILE_URL);
    const clock = page.locator('#zulu-time');
    const t1 = await clock.textContent();
    await page.waitForTimeout(1100);
    const t2 = await clock.textContent();
    expect(t1).not.toBe(t2);
  });

  test('map element is present', async ({ page }) => {
    await page.goto(FILE_URL);
    await expect(page.locator('#map')).toBeVisible();
  });

  test('legend bar is visible', async ({ page }) => {
    await page.goto(FILE_URL);
    await expect(page.locator('#legend-bar')).toBeVisible();
  });

});
