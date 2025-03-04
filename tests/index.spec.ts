// https://playwright.dev/docs/test-retries#reuse-single-page-between-tests

import { test, expect, type Page } from '@playwright/test';
import { describe } from 'node:test';

const baseURL = 'https://links.jonathan.com.ar';

test.describe.configure({ mode: 'serial' });

let page: Page;

describe('Index Page', () => {

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(baseURL);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('the page has a title', async () => {
    await expect(page).toHaveTitle('Links');
  });

  test('the page has a heading', async () => {
    await expect(page.getByRole('heading', { name: '@jd-apprentice' })).toBeVisible();
  });

  test('the page has a toggle button', async () => {
    await expect(page.getByRole('button', { name: 'Toggle dark mode' })).toBeVisible();
  });

  test('the button toggles the theme', async () => {
    const themeToggle = page.getByRole('button', { name: 'Toggle dark mode' });
    const themeIcon = page.getByRole('button', { name: 'Toggle dark mode' }).locator('i');
    await expect(themeIcon).toHaveClass('fas fa-moon');
    await themeToggle.click();
    await expect(themeIcon).toHaveClass('fas fa-sun');
  });

  test('the page displays the update date', async () => {
    await expect(page.getByText('Last update:')).toBeVisible();
  });

  test('the page has a link to GitHub', async () => hasLink('@jd-apprentice', 'https://github.com/jd-apprentice'));
  test('the page has a link to linkedin', async () => hasLink('LinkedIn', 'https://www.linkedin.com/in/jgmd/'));
  test('the page has a work section', async () => hasSection('📦 Work'));
  test('the page has a socials section', async () => hasSection('👨‍💻 Socials'));
  test('the page has a sites section', async () => hasSection('🌐 Sites'));

})

async function hasLink(name: string, link: string) {
  await expect(page.getByRole('link', { name })).toHaveAttribute('href', link);
}

async function hasSection(name: string) {
  await expect(page.getByRole('heading', { name })).toBeVisible();
}