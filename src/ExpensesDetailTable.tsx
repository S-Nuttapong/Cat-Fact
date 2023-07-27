import {
  Td as BaseTd,
  Th as BaseTh,
  Tr as BaseTr,
  BoxProps,
  Checkbox,
  Spinner,
  Table,
  Tbody,
  Text,
  Thead,
} from "@chakra-ui/react";
import { ComponentType, PropsWithChildren } from "react";
import { isEmpty } from "remeda";
import { Expense } from "./Apis";
import type { useExpenseRowSelector } from "./useExpenseRowSelector";

interface IExpenseDetailTable {
  isLoading?: boolean;
  isError?: boolean;
  rowSelector: ReturnType<typeof useExpenseRowSelector>;
  expenses: Expense[];
}

type DefaultStyles = Pick<
  BoxProps,
  "borderWidth" | "borderColor" | "borderStyle"
>;

const tableStyles: DefaultStyles = {
  borderWidth: 1,
  borderColor: "border.primary",
  borderStyle: "solid",
};

const withDefaultTableStyles =
  <P extends DefaultStyles>(Component: ComponentType<P>) =>
  ({ children, ...props }: PropsWithChildren<P>) => {
    return (
      <Component {...tableStyles} {...(props as P)}>
        {children}
      </Component>
    );
  };
const Tr = withDefaultTableStyles(BaseTr);
const Th = withDefaultTableStyles(BaseTh);
const Td = withDefaultTableStyles(BaseTd);

export const ExpenseDetailTable = (props: IExpenseDetailTable) => {
  const { isLoading, isError, rowSelector: row, expenses } = props;

  if (isLoading) return <Spinner color="content.primary" />;

  if (isError) return "An error has occurred.";

  if (isEmpty(expenses))
    return <Text color="content.guide">No expense details</Text>;

  return (
    <Table borderColor="border.primary" borderWidth={1} borderStyle="solid">
      <Thead>
        <Tr textTransform="capitalize">
          {/*Hack(San): force column to fit the width of the checkbox, other semantic way like "fit-content", "auto" won't do because of it's nature being dynamic value*/}
          <Th width={0}>
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
