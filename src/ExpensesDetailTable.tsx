import {
  Checkbox,
  HStack,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ChangeEvent, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { isEmpty } from "remeda";
import { AddExpense } from "./AddExpenses";
import { Expense, expenseServices } from "./Apis";
import { DeleteExpense, IDeleteExpense } from "./DeleteExpense";

const useExpenseRowSelector = (expenses: Expense[]) => {
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

export const ExpensesDetailTable = () => {
  const { data, isLoading, isError } = useQuery(
    "expenses",
    expenseServices.getExpenses
  );
  const expenses = data ?? [];

  const row = useExpenseRowSelector(expenses);

  if (isLoading) return "Loading...";

  if (isError) return "An error has occurred.";

  return (
    <Stack spacing={10}>
      <HStack spacing={5}>
        <AddExpense />
        <DeleteExpense
          onSuccess={row.reset}
          selectedExpenseIds={row.selectedExpenseIds}
        />
      </HStack>

      {isEmpty(expenses) ? (
        <Text>No expense details</Text>
      ) : (
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
      )}
    </Stack>
  );
};
