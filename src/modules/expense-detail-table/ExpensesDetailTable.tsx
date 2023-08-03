import {
  Checkbox as BaseCheckbox,
  Td as BaseTd,
  Th as BaseTh,
  Tr as BaseTr,
  BoxProps,
  CheckboxProps,
  Spinner,
  Table,
  Tbody,
  Text,
  Thead,
} from "@chakra-ui/react";
import { isEmpty } from "remeda";
import { Expense } from "../../shared/Apis";
import { withDefaultStyles } from "../../shared/withDefaultStyles";
import type { useExpenseRowSelector } from "./useExpenseRowSelector";

interface IExpenseDetailTable {
  isLoading?: boolean;
  isError?: boolean;
  rowSelector: ReturnType<typeof useExpenseRowSelector>;
  expenses: Expense[];
}

type Attributes =
  | "borderWidth"
  | "borderColor"
  | "borderStyle"
  | "textTransform";

type DefaultStyles = Pick<BoxProps, Attributes>;

const tableStyles: DefaultStyles = {
  borderWidth: 2,
  borderColor: "border.primary",
  borderStyle: "solid",
  textTransform: "none",
};
const Tr = withDefaultStyles(BaseTr, tableStyles);
const Th = withDefaultStyles(BaseTh, tableStyles);
const Td = withDefaultStyles(BaseTd, tableStyles);
const Checkbox = withDefaultStyles(BaseCheckbox, {
  ...tableStyles,
  borderWidth: 1,
  borderStyle: "hidden",
  colorScheme: "teal",
} as Pick<CheckboxProps, Attributes | "colorScheme">);

export const ExpenseDetailTable = (props: IExpenseDetailTable) => {
  const { isLoading, isError, rowSelector: row, expenses } = props;

  if (isLoading) return <Spinner color="content.primary" />;

  if (isError) return <Text color="content.guide">An error has occurred.</Text>;

  if (isEmpty(expenses))
    return <Text color="content.guide">No expense details</Text>;

  return (
    <Table borderColor="border.primary" borderWidth={1} borderStyle="solid">
      <Thead>
        <Tr>
          {/*Hack(San): force column to fit the width of the checkbox, other semantic way like "fit-content", "auto" won't do because of it's nature being dynamic value*/}
          <Th width={0}>
            <Checkbox isChecked={row.isAllSelected} onChange={row.selectAll} />
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
