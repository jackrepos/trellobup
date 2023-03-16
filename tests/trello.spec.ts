import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

/**
 * https://chat.openai.com/chat
 * write me a test in typescript with the package playwright.
 * go to the following link: https://trello.com/xxxx
 * click on the button with the content: Already have an account? Log in
 */

test.beforeEach(async ({ page }) => {
  // Go to the Trello login page
  await page.goto(config.trello.url);

  // Click the "Already have an account? Log in" button
  await page.click('button:has-text("Already have an account? Log in")');

  // Expect the URL to contain "login"
  expect(page.url()).toContain('login');

  // Expect the page to contain an input field with the name "user"
  const userInput = await page.$('input[name="user"]');
  // expect(userInput).not.toBeNull();

  // Enter the email address into the "user" input field
  await userInput?.type(config.trello.username);

  // Click the "Log in" button
  await page.click('input[type="submit"][id="login"]');

  // Expect to be redirected to the Atlassian login page
  expect(page.url()).toContain('atlassian.com/login');

  // Expect the page to contain an input field with the name "password"
  const passwordInput = await page.$('input[name="password"]');
  // expect(passwordInput).not.toBeNull();

  // Enter the password into the "password" input field
  await passwordInput?.type(config.trello.password);

  // Click the "Log in" button
  await page.click('button[id="login-submit"]');

  // Expect to be redirected back to the Trello personal board page
  expect(page.url()).toBe(config.trello.url);
});

test('Login page test', async ({ page }) => {
  // Go to the Trello login page
  await page.goto(config.trello.links.perso);

  await expect(page.locator('.board-canvas')).toHaveText("Prendre une pause toutes les 2h");
  // await expect(page.locator('.list-card-title')).toHaveText("Prendre une pause toutes les 2h");

});