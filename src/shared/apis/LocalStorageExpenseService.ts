import { nanoid } from 'nanoid';
import { Expense, IExpenseDetailServices } from './interface';

export class LocalStorageExpenseService implements IExpenseDetailServices {
    getExpenses = async (): Promise<Expense[]> => {
        const expenses = localStorage.getItem('expenses');
        return expenses ? JSON.parse(expenses) : []
    }

    addExpense = async (expense: Omit<Expense, "id">) => {
        const expenses = await this.getExpenses();
        expenses.push({
            ...expense,
            id: nanoid(),
        });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        return expenses
    }

    deleteExpense = async (expenseIds: string[]) => {
        const expenses = await this.getExpenses();
        const remainingExpenses = expenses.filter((expense: Expense) => !expenseIds.includes(expense.id));
        localStorage.setItem('expenses', JSON.stringify(remainingExpenses));
        return remainingExpenses
    }
}