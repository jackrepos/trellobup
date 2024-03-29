import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

test.beforeEach(async ({ page }) => {
  // Go to the Trello login page
  await page.goto(config.trello.url);

  // Click the "Already have an account? Log in" button
  await page.click('button:has-text("Already have an account? Log in")');

  // Wait for the page to load the url
  await page.locator('input[type="text"][name="user"]').waitFor();

  // Expect the URL to contain "login"
  expect(page.url()).toContain('login');

  // Expect the page to contain an input field with the name "user"
  await expect(page.locator('input[type="text"][name="user"]')).toBeVisible();

  // enter the username into the "user" input field
  await page.fill('input[type="text"][name="user"]', config.trello.username);

  // Click the "Log in" button
  await page.click('input[type="submit"][id="login"]');

  // Wait for the page to load the url
  await page.locator('input[name="password"]').waitFor();

  // Expect to be redirected to the Atlassian login page
  expect(page.url()).toContain('atlassian.com/login');

  // Expect the page to contain an input field with the name "password"
  await expect(page.locator('input[name="password"]')).toBeVisible();

  // enter the password into the "password" input field
  await page.fill('input[name="password"]', config.trello.password);

  // Click the "Log in" button
  await page.click('button[id="login-submit"]');

  // Wait for the page to load the url
  await page.waitForURL(config.trello.url);

  // Expect to be redirected back to the Trello personal board page
  expect(page.url()).toBe(config.trello.url);
});

test('Go to Game Dev test', async ({ page }) => {
  // Go to the Trello "game dev" board
  await page.goto(config.trello.links.gamedev);

  // Expect the page to contain a h1 with the text "Game Dev"
  await expect(page.locator('h1')).toHaveText('Game Dev');

  // Save the page content to a file
  // const htmlContent = await page.content();
  // await fs.writeFile('output/gamedev.html', htmlContent, (err) => {
  //   if (err) throw err;
  //   console.log('The file has been saved!');
  // });

  // Take screenshot
  // await page.screenshot({ path: 'output/screenshot-gamedev.png' });

  // await expect(page.locator('.board-canvas')).toHaveText("Prendre une pause toutes les 2h");
  // await expect(page.locator('.list-card-title')).toHaveText("Prendre une pause toutes les 2h");

  // await page.getByRole('button', { name: 'Show menu' }).click();
  // await page.getByRole('link', { name: ' More' }).click();
  // await page.getByRole('link', { name: ' Print and export' }).click();
  // await page.getByRole('link', { name: 'Export as JSON' }).click();

});
