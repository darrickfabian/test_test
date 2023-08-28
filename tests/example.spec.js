// @ts-check
const { test, expect } = require('@playwright/test');

test('Google', async ({ page }) => {
  // Navigate to the Google homepage
  await page.goto('https://www.google.com');

  // Type a search query in the search input field
  await page.fill('textarea[name="q"]', 'Playwright testing');

  // Press the "Enter" key to perform the search
  await page.press('textarea[name="q"]', 'Enter');

  // Wait for the search results to load
  await page.waitForSelector('#search');

  // Get the title of the search results page
  const pageTitle = await page.title();

  // Verify that the title contains the search query
  if (pageTitle.includes('Playwright testing')) {
    console.log('Test passed: Search results page title is correct');
  } else {
    console.error('Test failed: Search results page title is incorrect');
  }
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
