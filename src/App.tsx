import { Box, Center, Flex, HStack, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";
import { DeleteExpense } from "./modules/DeleteExpense";
import { AddExpense } from "./modules/add-expenses";
import {
  ExpenseDetailTable,
  useExpenseRowSelector,
} from "./modules/expense-detail-table";
import { useApi } from "./shared/apis";

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
  const api = useApi();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["expenses"],
    queryFn: api.getExpenses,
  });

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
