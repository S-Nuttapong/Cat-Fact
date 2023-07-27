import { ChangeEvent, useMemo, useState } from "react";
import { isEmpty } from "remeda";
import { Expense } from "./Apis";
import { IDeleteExpense } from "./DeleteExpense";

export const useExpenseRowSelector = (expenses: Expense[]) => {
  const [selectedExpenseIds, setSelectedExpenseIds] = useState(
    [] as IDeleteExpense["selectedExpenseIds"]
  );

  const allExpenseIds = useMemo(() => expenses.map((e) => e.id), [expenses]);

  const select = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const expenseIsSelected = event.target.checked;
    if (expenseIsSelected) {
      return setSelectedExpenseIds([...selectedExpenseIds, id]);
    }
    setSelectedExpenseIds(
      selectedExpenseIds.filter((expenseId) => expenseId !== id)
    );
  };

  const reset = () => {
    setSelectedExpenseIds([]);
  };

  const selectAll = (event: ChangeEvent<HTMLInputElement>) => {
    const expenseIsSelected = event.target.checked;
    if (expenseIsSelected) {
      return setSelectedExpenseIds(allExpenseIds);
    }
    reset();
  };

  const isAllSelected =
    !isEmpty(selectedExpenseIds) && allExpenseIds === selectedExpenseIds;

  const isSelected = (id: string) => selectedExpenseIds.includes(id);

  return {
    reset,
    selectAll,
    select,
    selectedExpenseIds,
    setSelectedExpenseIds,
    isAllSelected,
    isSelected,
  };
};
