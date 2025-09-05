// Basic Playwright tests for the sorting visualizer

const { test, expect } = require('@playwright/test');

test.describe('Sorting Algorithm Visualizer', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the visualizer
    await page.goto('http://localhost:8001');
    
    // Wait for the page to load and initialize
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('Sorting Algorithm Visualizer');
  });

  test('should load the page with default settings', async ({ page }) => {
    // Check that main elements are present
    await expect(page.locator('#algorithm-select')).toBeVisible();
    await expect(page.locator('#array-size')).toBeVisible();
    await expect(page.locator('#speed')).toBeVisible();
    await expect(page.locator('#play-btn')).toBeVisible();
    
    // Check default values
    await expect(page.locator('#algorithm-select')).toHaveValue('bubble');
    await expect(page.locator('#size-value')).toContainText('50');
    await expect(page.locator('#speed-value')).toContainText('5');
  });

  test('should generate array and display elements', async ({ page }) => {
    // Click generate array button
    await page.click('#generate-btn');
    
    // Check that array elements are visible
    const arrayElements = page.locator('.array-element');
    await expect(arrayElements).toHaveCount(50); // Default size
    
    // Check that statistics are reset
    await expect(page.locator('#comparisons')).toContainText('0');
    await expect(page.locator('#swaps')).toContainText('0');
  });

  test('should change algorithm and update information', async ({ page }) => {
    // Change to Quick Sort
    await page.selectOption('#algorithm-select', 'quick');
    
    // Check that algorithm info updates
    await expect(page.locator('#time-complexity')).toContainText('O(n log n)');
    await expect(page.locator('#stable')).toContainText('No');
    await expect(page.locator('#in-place')).toContainText('Yes');
    
    // Check that pseudocode updates
    await expect(page.locator('#code-display')).toContainText('quickSort');
  });

  test('should adjust array size', async ({ page }) => {
    // Change array size to 20
    await page.fill('#array-size', '20');
    
    // Check that size display updates
    await expect(page.locator('#size-value')).toContainText('20');
    
    // Generate new array with new size
    await page.click('#generate-btn');
    
    // Check that array has correct number of elements
    const arrayElements = page.locator('.array-element');
    await expect(arrayElements).toHaveCount(20);
  });

  test('should start and control sorting', async ({ page }) => {
    // Change to smaller array for faster test
    await page.fill('#array-size', '10');
    await page.click('#generate-btn');
    
    // Start sorting
    await page.click('#play-btn');
    
    // Check that controls update appropriately
    await expect(page.locator('#play-btn')).toBeDisabled();
    await expect(page.locator('#pause-btn')).toBeEnabled();
    await expect(page.locator('#algorithm-select')).toBeDisabled();
    
    // Wait a moment and check that statistics update
    await page.waitForTimeout(1000);
    
    const comparisons = await page.locator('#comparisons').textContent();
    expect(parseInt(comparisons)).toBeGreaterThan(0);
  });

  test('should pause and reset sorting', async ({ page }) => {
    // Set up smaller array
    await page.fill('#array-size', '10');
    await page.selectOption('#algorithm-select', 'bubble');
    await page.click('#generate-btn');
    
    // Start sorting
    await page.click('#play-btn');
    await page.waitForTimeout(500);
    
    // Pause sorting
    await page.click('#pause-btn');
    
    // Check pause state
    await expect(page.locator('#play-btn')).toBeEnabled();
    await expect(page.locator('#pause-btn')).toBeDisabled();
    
    // Reset array
    await page.click('#reset-btn');
    
    // Check reset state
    await expect(page.locator('#comparisons')).toContainText('0');
    await expect(page.locator('#swaps')).toContainText('0');
    await expect(page.locator('#algorithm-select')).toBeEnabled();
  });

  test('should respond to keyboard shortcuts', async ({ page }) => {
    // Set up test
    await page.fill('#array-size', '10');
    await page.click('#generate-btn');
    
    // Test spacebar (play/pause)
    await page.keyboard.press('Space');
    await expect(page.locator('#play-btn')).toBeDisabled();
    
    await page.keyboard.press('Space');
    await expect(page.locator('#play-btn')).toBeEnabled();
    
    // Test R key (reset)
    await page.keyboard.press('KeyR');
    await expect(page.locator('#comparisons')).toContainText('0');
    
    // Test G key (generate)
    const initialArray = await page.locator('.array-element').first().textContent();
    await page.keyboard.press('KeyG');
    await page.waitForTimeout(100);
    // Array should potentially be different (unless very unlucky with random generation)
  });

  test('should display different data patterns', async ({ page }) => {
    // Test sorted pattern
    await page.selectOption('#data-type', 'sorted');
    await page.fill('#array-size', '10');
    await page.click('#generate-btn');
    
    // For small arrays with numbers visible, we could check if they're actually sorted
    // This is a basic smoke test that the pattern selection works
    await expect(page.locator('.array-element')).toHaveCount(10);
    
    // Test reverse pattern
    await page.selectOption('#data-type', 'reverse');
    await page.click('#generate-btn');
    await expect(page.locator('.array-element')).toHaveCount(10);
    
    // Test nearly sorted pattern
    await page.selectOption('#data-type', 'nearly');
    await page.click('#generate-btn');
    await expect(page.locator('.array-element')).toHaveCount(10);
  });

  test('should show keyboard shortcuts info', async ({ page }) => {
    // Check that keyboard shortcuts panel exists
    await expect(page.locator('.keyboard-shortcuts-info')).toBeVisible();
    
    // Check that it contains expected shortcuts
    await expect(page.locator('.shortcuts-list')).toContainText('Space');
    await expect(page.locator('.shortcuts-list')).toContainText('Play/Pause');
  });
});