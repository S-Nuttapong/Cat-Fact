import { describe, it, vi } from "vitest";
import { IExpenseDetailServices } from "../../shared/apis";
import { MockApiProvider, render } from "../../shared/testing";
import { AddExpense } from "./AddExpenses";

const stubAddExpense: IExpenseDetailServices["addExpense"] = vi.fn(
  async (e) => [{ ...e, id: "" }]
);

describe("AddExpense", () => {
  it("displays error for empty item field", async () => {
    const { user, ...screen } = render(
      <MockApiProvider api={{ addExpense: stubAddExpense }}>
        <AddExpense />
      </MockApiProvider>
    );

    await user.click(screen.getByRole("button", { name: /Add Expense/i }));
    await user.click(screen.getByRole("button", { name: /Submit/i }));

    expect(await screen.findByText("Item is required")).toBeInTheDocument();
    expect(await screen.findByText("Amount is required")).toBeInTheDocument();
    expect(stubAddExpense).not.toBeCalled();
  });

  it("displays error for invalid item characters", async () => {
    const { user, ...screen } = render(
      <MockApiProvider api={{ addExpense: stubAddExpense }}>
        <AddExpense />
      </MockApiProvider>
    );

    await user.click(screen.getByRole("button", { name: /Add Expense/i }));
    await user.type(screen.getByPlaceholderText("Item name"), "Item@123!");
    await user.click(screen.getByRole("button", { name: /Submit/i }));

    expect(
      await screen.findByText("Item cannot include special characters.")
    ).toBeInTheDocument();
    expect(stubAddExpense).not.toBeCalled();
  });

  it("displays error for invalid amount value", async () => {
    const { getByRole, getByPlaceholderText, findByText, user } = render(
      <MockApiProvider api={{ addExpense: stubAddExpense }}>
        <AddExpense />
      </MockApiProvider>
    );

    await user.click(getByRole("button", { name: /Add Expense/i }));
    await user.type(getByPlaceholderText("Item amount"), "invalidAmount");

    await user.click(getByRole("button", { name: /Submit/i }));

    expect(
      await findByText("Amount must be a valid number")
    ).toBeInTheDocument();
    expect(stubAddExpense).not.toBeCalled();
  });

  it("displays error for negative amount value", async () => {
    const { getByRole, getByPlaceholderText, findByText, user } = render(
      <MockApiProvider api={{ addExpense: stubAddExpense }}>
        <AddExpense />
      </MockApiProvider>
    );

    await user.click(getByRole("button", { name: /Add Expense/i }));
    await user.type(getByPlaceholderText("Item amount"), "-100");

    await user.click(getByRole("button", { name: /Submit/i }));

    expect(
      await findByText("Amount must be a positive number")
    ).toBeInTheDocument();
    expect(stubAddExpense).not.toBeCalled();
  });

  it.todo(
    "called addExpense mutation correctly, when users submit valid expense detail"
  );
});
