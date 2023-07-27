import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { expenseServices, fetchCatFact } from "./Apis";
import { ExpenseForm } from "./ExpenseForm";

export const AddExpense = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  const catFact = useQuery("catFact", fetchCatFact, { enabled: isOpen });

  const addExpenseMutation = useMutation(expenseServices.addExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries("expenses");
      onClose();
    },
  });

  return (
    <>
      <Button onClick={onOpen} variant="primary">
        Add Expense
      </Button>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Expenses</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={5}>
              <SimpleGrid
                columns={{ sm: 1, md: 2 }}
                columnGap={10}
                minChildWidth={300}
              >
                <ExpenseForm
                  onSubmit={async (data) =>
                    await addExpenseMutation.mutate(data)
                  }
                />
                <Flex
                  flexDir="column"
                  justifyContent="start"
                  alignItems="start"
                >
                  <Text m={0}>Random cat fact:</Text>
                  {catFact.isFetching ? (
                    <Spinner />
                  ) : (
                    <Text mt={2}>{catFact.data}</Text>
                  )}
                </Flex>
              </SimpleGrid>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
