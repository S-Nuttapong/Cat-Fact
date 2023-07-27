import axios from 'axios';
import { nanoid } from 'nanoid';

/**
 * Fetch random cat fact.
 * @return {Promise<string>}
 */
export const fetchCatFact = async (): Promise<string> => {
    try {
        const response = await axios.get('https://catfact.ninja/fact');
        return response.data.fact;
    } catch (error) {
        console.error(error);
        return "Sorry, we couldn't fetch a cat fact at the moment. Please try again later.";
    }
};

export enum ExpenseCategory {
    Food = "Food",
    Furniture = "Furniture",
    Accessory = "Accessory",
}

export interface Expense {
    id: string;
    item: string;
    category: ExpenseCategory;
    amount: number;
}

export interface IExpenseDetailServices {
    getExpenses: () => Promise<Expense[]>;
    addExpense: (expense: Expense) => Promise<Expense[]>;
    deleteExpense: (expenseIds: string[]) => Promise<Expense[]>;
}

export class LocalStorageRepository implements IExpenseDetailServices {
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

export const expenseServices = new LocalStorageRepository()
