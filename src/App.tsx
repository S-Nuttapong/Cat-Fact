import { Box, Flex } from "@chakra-ui/react";
import { ExpensesDetailTable } from "./ExpensesDetailTable";

function App() {
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
          <ExpensesDetailTable />
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
