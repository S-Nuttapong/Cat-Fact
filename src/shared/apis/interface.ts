
export enum ExpenseCategory {
    Food = "Food",
    Furniture = "Furniture",
    Accessory = "Accessory"
}

export interface Expense {
    id: string;
    item: string;
    category: ExpenseCategory;
    amount: number;
}

export interface IExpenseDetailServices {
    getExpenses: () => Promise<Expense[]>;
    addExpense: (expense: Omit<Expense, "id">) => Promise<Expense[]>;
    deleteExpense: (expenseIds: string[]) => Promise<Expense[]>;
}

export type FetchCatFact = () => Promise<string>

export interface Api extends IExpenseDetailServices {
    fetchCatFact: FetchCatFact
}