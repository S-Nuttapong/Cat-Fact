import { nanoid } from 'nanoid';
import { Expense, IExpenseDetailServices } from '../apis';

export class MockExpenseService implements IExpenseDetailServices {
    private expenses: Expense[] = [];

    getExpenses = async () => {
        return this.expenses;
    }

    addExpense = async (expense: Omit<Expense, "id">) => {
        const newExpense = {
            ...expense,
            id: nanoid(),
        };
        this.expenses.push(newExpense);
        return this.expenses;
    }

    deleteExpense = async (expenseIds: string[]) => {
        this.expenses = this.expenses.filter((expense: Expense) => !expenseIds.includes(expense.id));
        return this.expenses;
    }
}
