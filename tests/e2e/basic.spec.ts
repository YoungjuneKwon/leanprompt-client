import { test, expect } from '@playwright/test';

test.describe('Basic App Loading', () => {
  test('should load the page', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check if the root element exists
    const root = await page.locator('#root');
    await expect(root).toBeVisible();
  });

  test('should have correct page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/LeanPrompt Client Demo/);
  });
});