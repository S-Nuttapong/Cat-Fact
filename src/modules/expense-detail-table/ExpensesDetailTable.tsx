import {
  Checkbox as BaseCheckbox,
  Td as BaseTd,
  Th as BaseTh,
  Tr as BaseTr,
  BoxProps,
  Spinner,
  Table,
  Tbody,
  Text,
  Thead,
} from "@chakra-ui/react";
import { isEmpty } from "remeda";
import { Expense } from "../../shared/apis";
import type { useExpenseRowSelector } from "./useExpenseRowSelector";
import { withDefaultProps } from "./withDefaultProps";

interface IExpenseDetailTable {
  isLoading?: boolean;
  isError?: boolean;
  rowSelector: ReturnType<typeof useExpenseRowSelector>;
  expenses: Expense[];
}

type DefaultStyles = Pick<
  BoxProps,
  "borderWidth" | "borderColor" | "borderStyle" | "textTransform"
>;

const defaultStyles: DefaultStyles = {
  borderWidth: 2,
  borderColor: "border.primary",
  borderStyle: "solid",
  textTransform: "none",
};

const Tr = withDefaultProps(BaseTr, defaultStyles);
const Th = withDefaultProps(BaseTh, defaultStyles);
const Td = withDefaultProps(BaseTd, defaultStyles);
const Checkbox = withDefaultProps(BaseCheckbox, {
  ...defaultStyles,
  borderWidth: 1,
  borderStyle: "hidden",
  colorScheme: "teal",
});

export const ExpenseDetailTable = (props: IExpenseDetailTable) => {
  const { isLoading, isError, rowSelector: row, expenses } = props;

  if (isLoading) return <Spinner color="content.primary" />;

  if (isError) return <Text color="content.guide">An error has occurred.</Text>;

  if (isEmpty(expenses))
    return <Text color="content.guide">No expense details</Text>;

  return (
    <Table {...defaultStyles} borderWidth={1}>
      <Thead>
        <Tr>
          <Th width={0}>
            <Checkbox
              isChecked={row.isAllSelected}
              onChange={row.selectAll}
              aria-label="Select all expenses"
            />
          </Th>
          <Th>Item</Th>
          <Th>Category</Th>
          <Th>Amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {expenses.map((expense) => (
          <Tr
            key={expense.id}
            bg={row.isSelected(expense.id) ? "teal.50" : "transparent"}
          >
            <Td>
              <Checkbox
                isChecked={row.isSelected(expense.id)}
                onChange={row.select(expense.id)}
                aria-label={`Select ${expense.item}`}
              />
            </Td>
            <Td>{expense.item}</Td>
            <Td>{expense.category}</Td>
            <Td>{Math.round(expense.amount)}$</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
