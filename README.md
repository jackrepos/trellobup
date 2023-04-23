# trellobup

A playwright script to back up trello

## Run tests

<https://playwright.dev/docs/running-tests>

<https://playwright.dev/docs/locators#locate-by-css-or-xpath>

<https://playwright.dev/docs/writing-tests>

<https://playwright.dev/docs/locators>

```
npx playwright test
npx playwright test --headed
npx playwright show-report
npx playwright test raindrop.spec.ts --headed
npx playwright test raindrop.spec.ts --debug
npx playwright test trello.spec.ts --debug
```

## Installation

Create files `config.json` and `.env`.

Run the following commands.

```
npm install
```

## Todo

Record tests for trello page using the debuger.

I can not save page with shortcuts, and I can not export since I need a browser plugin that is not in debug mode.
I can use fs to write the html content into a file, but for trello the page is ok but the next second it show error 404.
So I need to find a way to disable javascript on the page.
