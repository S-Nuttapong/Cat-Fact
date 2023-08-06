import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import { Expense, ExpenseCategory } from "./shared/apis";
import { MockApiProvider } from "./shared/test/MockApiProvider";
import { MockExpenseService } from "./shared/test/MockExpenseService";

const mockExpenseService = new MockExpenseService();
export class TestUtils {
  public addExpense(data: Omit<Expense, "id">) {
    const { category, amount, item } = data;
    fireEvent.click(screen.getByRole("button", { name: "Add Expense" }));
    if (category) {
      fireEvent.change(screen.getByRole("combobox", { name: "Category:" }), {
        target: { value: category },
      });
    }
    fireEvent.change(screen.getByPlaceholderText("Item name"), {
      target: { value: item },
    });
    fireEvent.change(screen.getByPlaceholderText("Item amount"), {
      target: { value: amount.toString() },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
  }

  public getRowContents(rowNumber?: number): string[] {
    if (rowNumber) {
      const rows = screen.getAllByRole("row");
      const cells = rows[rowNumber].querySelectorAll("td");
      return Array.from(cells).map((cell) => cell.textContent || "");
    }

    return [];
  }
}

describe("Add expense detail", () => {
  const testUtils = new TestUtils();

  it.only("Does not display expense detail table, when there is no expense added", () => {
    render(
      <MockApiProvider
        api={{
          ...mockExpenseService,
          fetchCatFact: async () => "blah blah blah",
        }}
      >
        <App />
      </MockApiProvider>
    );
    expect(screen.getByText("No expense details")).toBeTruthy();
    expect(screen.queryByRole("table")).not.toBeTruthy();
  });

  it("Add expense detail correctly", async () => {
    render(<App />);

    testUtils.addExpense({
      item: "FrenchFried",
      category: ExpenseCategory.Food,
      amount: 100,
    });
    testUtils.addExpense({
      item: "Chair",
      category: ExpenseCategory.Furniture,
      amount: 1000,
    });
    testUtils.addExpense({
      item: "Watch",
      category: ExpenseCategory.Accessory,
      amount: 500,
    });

    const headers = screen
      .getAllByRole("columnheader")
      .map((el) => el.textContent);
    expect(headers).toEqual(["", "Item", "Category", "Amount"]);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(3 + 1); // +1 for header row

    expect(testUtils.getRowContents(1)).toEqual([
      "",
      "FrenchFried",
      ExpenseCategory.Food,
      "100$",
    ]);
    expect(testUtils.getRowContents(2)).toEqual([
      "",
      "Chair",
      ExpenseCategory.Furniture,
      "1000$",
    ]);
    expect(testUtils.getRowContents(3)).toEqual([
      "",
      "Watch",
      ExpenseCategory.Accessory,
      "500$",
    ]);
  });
});
