// https://playwright.dev/docs/test-retries#reuse-single-page-between-tests

import { test, expect, type Page } from '@playwright/test';
import { describe } from 'node:test';
import { baseURL, type Role } from './utils';

test.describe.configure({ mode: 'serial' });

let page: Page;

describe('Homepage - Index', () => {

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(baseURL);
  });

  test.afterAll(async () => await page.close());

  test('the page has a title', async () => await expect(page).toHaveTitle('Links'));
  test('the page has a heading', async () => hasSection('heading', '@jd-apprentice'));
  test('the page has a toggle button', async () => hasSection('button', 'Toggle dark mode'));

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
  test('the page has a work section', async () => hasSection('heading', '📦 Work'));
  test('the page has a socials section', async () => hasSection('heading', '👨‍💻 Socials'));
  test('the page has a sites section', async () => hasSection('heading', '🌐 Sites'));

})

async function hasLink(name: string, link: string) {
  await expect(page.getByRole('link', { name })).toHaveAttribute('href', link);
}

async function hasSection(section: Role, name: string) {
  await expect(page.getByRole(section, { name })).toBeVisible();
}