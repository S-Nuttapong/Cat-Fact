import {
  Button,
  Center,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../../shared/apis";
import { ExpenseForm } from "./ExpenseForm";

export const AddExpense = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const api = useApi();
  const catFact = useQuery({
    queryFn: api.fetchCatFact,
    enabled: isOpen,
  });
  const addExpense = useMutation({
    mutationFn: api.addExpense,
    mutationKey: ["addExpense"],
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
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
            <ModalCloseButton size="sm" border="transparent" />
            <ModalBody pb={5}>
              <SimpleGrid
                columns={{ sm: 1, md: 2 }}
                columnGap={10}
                minChildWidth={300}
              >
                <ExpenseForm
                  onSubmit={async (data) => await addExpense.mutate(data)}
                />
                <Flex
                  flexDir="column"
                  justifyContent="start"
                  alignItems="start"
                  fontStyle="italic"
                  color="content.primary"
                >
                  <Text
                    m={0}
                    color="inherit"
                    fontWeight="bold"
                    fontSize="inherit"
                  >
                    Random cat fact:
                  </Text>
                  {catFact.isFetching ? (
                    <Center w="full">
                      <Spinner color="inherit" />
                    </Center>
                  ) : (
                    <Text mt={2} color="inherit" fontSize="inherit">
                      {catFact.data}
                    </Text>
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
