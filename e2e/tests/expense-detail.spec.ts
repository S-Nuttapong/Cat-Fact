import { expect, test } from '@playwright/test';
import { ExpenseCategory } from '../../src/shared/Apis';
import testUtils from '../utils';


test.describe('expense detail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  });

  test('Does not display expense detail table, when there is no expense', ({ page }) => {
    expect(page.getByText('No expense details')).toBeTruthy()
    expect(page.locator('table')).toBeFalsy()
  })

  test('Displays expense detail table correctly, when add expense', async ({ page }) => {
    await testUtils.addExpense(page, { item: 'FrenchFried', category: ExpenseCategory.Food, amount: 100 });
    await testUtils.addExpense(page, { item: 'Chair', category: ExpenseCategory.Furniture, amount: 1000 });
    await testUtils.addExpense(page, { item: 'Watch', category: ExpenseCategory.Accessory, amount: 500 });

    const headers = await page.locator('th').allTextContents()
    expect(headers).toEqual(["", 'Item', 'Category', 'Amount'])

    const getRowTextContents = async (rowNumber: number) => {
      const row = page.locator(`tr`).nth(rowNumber)
      return await row.locator('td').allTextContents()
    }

    expect(await getRowTextContents(1)).toEqual(['', 'FrenchFried', ExpenseCategory.Food, '100$'])
    expect(await getRowTextContents(1)).toEqual(['', 'Chair', ExpenseCategory.Furniture, '1000$'])
    expect(await getRowTextContents(1)).toEqual(['', 'Watch', ExpenseCategory.Accessory, '500$'])
  })
});

