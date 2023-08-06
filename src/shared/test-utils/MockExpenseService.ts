import { nanoid } from 'nanoid';
import { Expense, IExpenseDetailServices } from '../apis/interface';

export class MockExpenseService implements IExpenseDetailServices {
    private expenses: Expense[] = [];

    async getExpenses(): Promise<Expense[]> {
        return this.expenses;
    }

    async addExpense(expense: Omit<Expense, "id">): Promise<Expense[]> {
        const newExpense = {
            ...expense,
            id: nanoid(),
        };
        this.expenses.push(newExpense);
        return this.expenses;
    }

    async deleteExpense(expenseIds: string[]): Promise<Expense[]> {
        this.expenses = this.expenses.filter((expense: Expense) => !expenseIds.includes(expense.id));
        return this.expenses;
    }
}
