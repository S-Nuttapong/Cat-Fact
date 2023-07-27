import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { Expense, expenseServices } from "./Apis";

export interface IDeleteExpense {
  selectedExpenseIds: Expense["id"][];
  onSuccess?: (expenses: Expense[]) => void;
}

export const DeleteExpense = (props: IDeleteExpense) => {
  const { selectedExpenseIds, onSuccess } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const deleteExpense = useMutation(
    async () => expenseServices.deleteExpense(selectedExpenseIds),
    {
      onSuccess: (expenses) => {
        queryClient.invalidateQueries("expenses");
        onClose();
        onSuccess?.(expenses);
      },
    }
  );

  return (
    <>
      <Button onClick={onOpen} isDisabled={selectedExpenseIds.length === 0}>
        Delete Expense
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Expenses</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Do you really want to delete the selected expenses?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={async () => await deleteExpense.mutate()}
            >
              Confirm
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              isDisabled={deleteExpense.isLoading}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
