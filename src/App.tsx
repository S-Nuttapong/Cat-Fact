import { Box, Center, Flex, HStack, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useQuery } from "react-query";
import { AddExpense } from "./AddExpenses";
import { expenseServices } from "./Apis";
import { DeleteExpense } from "./DeleteExpense";
import { ExpenseDetailTable } from "./ExpensesDetailTable";
import { useExpenseRowSelector } from "./useExpenseRowSelector";

interface IAppLayout {
  children: ReactNode;
}

const AppLayout = ({ children }: IAppLayout) => {
  return (
    <Box w="100vw" h="100vh">
      <Flex justifyContent="center" pt={120} w="full" h="full">
        <Box
          maxW={1000}
          maxH={500}
          p={10}
          w="full"
          h="full"
          border="2px"
          borderColor="gray.300"
        >
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

const App = () => {
  const { data, isLoading, isError } = useQuery(
    "expenses",
    expenseServices.getExpenses
  );

  const expenses = data ?? [];

  const row = useExpenseRowSelector(expenses);

  return (
    <AppLayout>
      <Stack spacing={10}>
        <HStack spacing={5}>
          <AddExpense />
          <DeleteExpense
            onSuccess={row.reset}
            selectedExpenseIds={row.selectedExpenseIds}
          />
        </HStack>
        <Center>
          <ExpenseDetailTable
            rowSelector={row}
            expenses={expenses}
            isLoading={isLoading}
            isError={isError}
          />
        </Center>
      </Stack>
    </AppLayout>
  );
};

export default App;
