/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  testMatch: ['**/*.spec.js'],
  use: {
    browserName: 'chromium',
  },
};

module.exports = config;
