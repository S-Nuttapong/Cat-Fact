import { expect, test } from '@playwright/test';
import { ExpenseCategory } from '../../src/shared/apis';
import { TestUtils } from '../TestUtils';

test.describe('Add expense detail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  });

  test('Does not display expense detail table, when there is no expense added', async ({ page }) => {
    expect(page.getByText('No expense details')).toBeTruthy()
    expect(await page.locator('table').isVisible()).toBe(false)
  })

  test('Add expense detail correctly', async ({ page }) => {
    const testUtils = new TestUtils(page)
    await testUtils.addExpense({ item: 'FrenchFried', category: ExpenseCategory.Food, amount: 100 });
    await testUtils.addExpense({ item: 'Chair', category: ExpenseCategory.Furniture, amount: 1000 });
    await testUtils.addExpense({ item: 'Watch', category: ExpenseCategory.Accessory, amount: 500 });

    const headers = await page.locator('th').allTextContents()
    expect(headers).toEqual(["", 'Item', 'Category', 'Amount'])
    expect(await testUtils.getRowContents()).toHaveLength(3)
    expect(await testUtils.getRowContents(1)).toEqual(['', 'FrenchFried', ExpenseCategory.Food, '100$'])
    expect(await testUtils.getRowContents(2)).toEqual(['', 'Chair', ExpenseCategory.Furniture, '1000$'])
    expect(await testUtils.getRowContents(3)).toEqual(['', 'Watch', ExpenseCategory.Accessory, '500$'])
  })
});

