import {
  Checkbox,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
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
interface IExpenseDetailTable {
  isLoading?: boolean;
  isError?: boolean;
  rowSelector: ReturnType<typeof useExpenseRowSelector>;
  expenses: Expense[];
}

export const ExpenseDetailTable = (props: IExpenseDetailTable) => {
  const { isLoading, isError, rowSelector: row, expenses } = props;

  if (isLoading) return <Spinner color="content.primary" />;

  if (isError) return "An error has occurred.";

  if (isEmpty(expenses))
    return <Text color="content.guide">No expense details</Text>;

  return (
    <Table>
      <Thead>
        <Tr textTransform="capitalize">
          <Th>
            <Checkbox
              border="1px solid grey"
              isChecked={row.isAllSelected}
              onChange={row.selectAll}
            />
          </Th>
          <Th textTransform="inherit">Item</Th>
          <Th textTransform="inherit">Category</Th>
          <Th textTransform="inherit">Amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {expenses.map((expense) => (
          <Tr key={expense.id}>
            <Td>
              <Checkbox
                isChecked={row.isSelected(expense.id)}
                border="1px solid grey"
                onChange={row.select(expense.id)}
              />
            </Td>
            <Td>{expense.item}</Td>
            <Td>{expense.category}</Td>
            <Td>{expense.amount.toFixed(2)}$</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
