import { Page } from '@playwright/test';
import { Expense } from "../src/shared/Apis";

const addExpense = async (page: Page, data: Omit<Expense, "id">) => {
    const { category, amount, item } = data
    await page.getByRole('button', { name: 'Add Expense' }).click();
    if (category) {
        await page.getByRole('combobox', { name: 'Category:' }).selectOption(category);
    }
    await page.getByPlaceholder('Item name').fill(item);
    await page.getByPlaceholder('Item amount').fill(amount.toString());
    await page.getByRole('button', { name: 'Submit' }).click();
}

export default {
    addExpense
}