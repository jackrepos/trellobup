import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

test.beforeEach(async ({ page }) => {
  // go to raindrop login page
  await page.goto(config.raindrop.url);

  // Expect the page to contain an input name "email"
  await expect(page.locator('input[name="email"]')).toBeVisible();

  // Expect the page to contain an input submit with the value "Sign in"
  await expect(page.locator('input[type="submit"][value="Sign in"]')).toBeVisible();

  // enter the email address into the "email" input field
  await page.fill('input[name="email"]', config.raindrop.username);

  // enter the password into the "password" input field
  await page.fill('input[name="password"]', config.raindrop.password);

  // click the "Sign in" button
  await page.click('input[type="submit"][value="Sign in"]');

  // wait for the page to load
  await page.waitForURL(config.raindrop.url);

  // expect to be redirected to the Raindrop.io settings page config.raindrop.url
  await expect(page.url()).toBe(config.raindrop.url);

  // expect the page to contain a link that contains the text "Create new"
  await expect(page.locator('a:has-text("Create new")')).toBeVisible();

});

test('Create backup', async ({ page }) => {
  // click the "Create new" link
  await page.click('a:has-text("Create new")');

  // wait for an alert success message to appear
  await page.getByText('Your new backup is being created').waitFor();

  // expect the page to contain a main div with the text "Your new backup is being created"
  await expect(page.getByText('Your new backup is being created')).toBeVisible();

});
