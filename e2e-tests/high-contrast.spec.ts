import { test, expect } from '@playwright/test';

test.describe('High contrast mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('toggles with an accessible pressed state and retains focus', async ({ page }) => {
    const toggle = page.getByTestId('high-contrast-toggle');

    await toggle.focus();
    await toggle.press('Enter');

    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(toggle).toHaveAccessibleName('Disable high contrast mode');
    await expect(page.locator('html')).toHaveClass(/high-contrast/);
  });

  test('persists the preference after a page reload', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Enable high contrast mode' });

    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/high-contrast/);
    await page.reload();

    await expect(page.locator('html')).toHaveClass(/high-contrast/);
    await expect(page.getByRole('button', { name: 'Disable high contrast mode' }))
      .toHaveAttribute('aria-pressed', 'true');
  });
});
