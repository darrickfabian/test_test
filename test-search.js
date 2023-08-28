const { chromium } = require('playwright');

(async () => {
  // Launch a new browser instance
  const browser = await chromium.launch({
    headless: true  // Set headless to default
  });

  // Create a new browser context (similar to a new tab)
  const context = await browser.newContext();

  // Create a new page within the context
  const page = await context.newPage();

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

  // Close the browser context and the browser
  await context.close();
  await browser.close();
})();