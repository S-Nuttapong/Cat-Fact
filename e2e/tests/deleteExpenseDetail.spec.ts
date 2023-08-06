import { expect, test } from '@playwright/test';
import { ExpenseCategory } from '../../src/shared/apis';
import { TestUtils } from '../TestUtils';


test.describe('Delete expense detail', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        const testUtils = new TestUtils(page)
        await testUtils.addExpense({ item: 'FrenchFried', category: ExpenseCategory.Food, amount: 100 });
        await testUtils.addExpense({ item: 'Chair', category: ExpenseCategory.Furniture, amount: 1000 });
        await testUtils.addExpense({ item: 'Watch', category: ExpenseCategory.Accessory, amount: 500 });
    });

    test('Disables the delete expense button when no expense in the table is being selected', async ({ page }) => {
        const deleteBtbn = page.getByRole('button', { name: 'Delete Expense' })
        expect(await deleteBtbn.isDisabled()).toBe(true)
    })

    test('Deletes single expense item correctly', async ({ page }) => {
        const testUtils = new TestUtils(page)
        const expectedRows = [['', 'Chair', ExpenseCategory.Furniture, '1000$']];
        expect(await testUtils.getRowContents()).toHaveLength(3)
        expect(await testUtils.getRowContents()).toEqual(expect.arrayContaining(expectedRows));

        await page.getByRole('cell', { name: 'Select Chair' }).locator('span').click();
        await page.getByRole('button', { name: 'Delete Expense' }).click();
        await page.getByRole('button', { name: 'Confirm' }).click();

        expect(await testUtils.getRowContents()).toHaveLength(2)
        expect(await testUtils.getRowContents()).toEqual(expect.not.arrayContaining(expectedRows));
    })

    test('Deletes multiple expenses item correctly', async ({ page }) => {
        const testUtils = new TestUtils(page)
        const expectedRows = [['', 'Chair', ExpenseCategory.Furniture, '1000$'], ['', 'FrenchFried', ExpenseCategory.Food, '100$']]
        expect(await testUtils.getRowContents()).toHaveLength(3)
        expect(await testUtils.getRowContents()).toEqual(expect.arrayContaining(expectedRows));

        await page.getByRole('cell', { name: 'Select Chair' }).locator('span').click();
        await page.getByRole('cell', { name: 'Select FrenchFried' }).locator('span').click();
        await page.getByRole('button', { name: 'Delete Expense' }).click();
        await page.getByRole('button', { name: 'Confirm' }).click();

        expect(await testUtils.getRowContents()).toEqual(expect.not.arrayContaining(expectedRows));
        expect(await testUtils.getRowContents()).toEqual([['', 'Watch', ExpenseCategory.Accessory, '500$']])
    })

    test('Expense detail table disappears, when deleting until table is out of item', async ({ page }) => {
        const testUtils = new TestUtils(page)
        expect(await testUtils.getRowContents()).toHaveLength(3)

        const expectedRow = ['', 'Chair', ExpenseCategory.Furniture, '1000$'];
        expect(await testUtils.getRowContents()).toEqual(expect.arrayContaining([expect.arrayContaining(expectedRow)]));

        await page.getByRole('cell', { name: 'Select Chair' }).locator('span').click();
        await page.getByRole('cell', { name: 'Select FrenchFried' }).locator('span').click();
        await page.getByRole('button', { name: 'Delete Expense' }).click();
        await page.getByRole('button', { name: 'Confirm' }).click();
        expect(await testUtils.getRowContents()).toHaveLength(1)

        await page.getByRole('cell', { name: 'Select Watch' }).locator('span').click();
        await page.getByRole('button', { name: 'Delete Expense' }).click();
        await page.getByRole('button', { name: 'Confirm' }).click();

        expect(page.getByText('No expense details')).toBeTruthy()
        expect(await page.locator('table').isVisible()).toBe(false)
    })

    test('Expense detail table disappears, when selecting all expenses and delete', async ({ page }) => {
        expect(await page.locator('table').isVisible()).toBe(true)

        await page.getByRole('cell', { name: 'Select all expenses' }).locator('span').click();
        await page.getByRole('button', { name: 'Delete Expense' }).click();
        await page.getByRole('button', { name: 'Confirm' }).click();

        expect(page.getByText('No expense details')).toBeTruthy()
        expect(await page.locator('table').isVisible()).toBe(false)
    })
});
