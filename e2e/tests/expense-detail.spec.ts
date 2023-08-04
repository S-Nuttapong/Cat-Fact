import { expect, test } from '@playwright/test';
import { ExpenseCategory } from '../../src/shared/Apis';
import { TestUtils } from '../TestUtils';


test.describe('expense detail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  });

  test('Does not display expense detail table, when there is no expense', async ({ page }) => {
    expect(page.getByText('No expense details')).toBeTruthy()
    expect(await page.locator('table').isVisible()).toBe(false)
  })

  test('Displays expense detail table correctly, when add expense', async ({ page }) => {
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

