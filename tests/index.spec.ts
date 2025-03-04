import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

const baseURL = 'https://links.jonathan.com.ar';

describe('Index Page', () => {

  test.beforeAll(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('the page has a title', async ({ page }) => {
    await expect(page).toHaveTitle('Links');
  });

  test('the page has a heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '@jd-apprentice' })).toBeVisible();
  });

  test('the page has a toggle button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Toggle dark mode' })).toBeVisible();
  });

  test('the button toggles the theme', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: 'Toggle dark mode' });
    const themeIcon = page.getByRole('button', { name: 'Toggle dark mode' }).locator('i');
    await expect(themeIcon).toHaveClass('fas fa-moon');
    await themeToggle.click();
    await expect(themeIcon).toHaveClass('fas fa-sun');
  });

  test('the page displays the update date', async ({ page }) => {
    await expect(page.getByText('Last update:')).toBeVisible();
  });

  test('the page has a link to GitHub', async ({ page }) => {
    await expect(page.getByRole('link', { name: '@jd-apprentice' })).toHaveAttribute('href', 'https://github.com/jd-apprentice');
  });

  test('the page has a work section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '📦 Work' })).toBeVisible();
  });

  test('the page has a socials section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '👨‍💻 Socials' })).toBeVisible();
  });

  test('the page has a sites section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '🌐 Sites' })).toBeVisible();
  });

})


