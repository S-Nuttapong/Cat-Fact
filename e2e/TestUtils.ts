import { Page } from '@playwright/test';
import { Expense } from '../src/shared/apis';


export class TestUtils {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Method to add an expense
    public async addExpense(data: Omit<Expense, 'id'>) {
        const { category, amount, item } = data;
        await this.page.getByRole('button', { name: 'Add Expense' }).click();
        if (category) {
            await this.page.getByRole('combobox', { name: 'Category:' }).selectOption(category);
        }
        await this.page.getByPlaceholder('Item name').fill(item);
        await this.page.getByPlaceholder('Item amount').fill(amount.toString());
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    public getRowContents(rowNumber?: number): Promise<string[]>;
    public getRowContents(): Promise<string[][]>;
    public async getRowContents(rowNumber?: number) {
        if (rowNumber) {
            const row = this.page.locator(`tr`).nth(rowNumber);
            return await row.locator('td').allTextContents();
        }

        const rows = await this.page.locator(`tr`).all();
        return (await Promise.all(rows.map(row => row.locator('td').allTextContents()))).slice(1);
    }
}
