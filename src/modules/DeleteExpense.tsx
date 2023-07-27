import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isEmpty } from "remeda";
import { Expense, expenseServices } from "../shared/Apis";

export interface IDeleteExpense {
  selectedExpenseIds: Expense["id"][];
  onSuccess?: (expenses: Expense[]) => void;
}

export const DeleteExpense = (props: IDeleteExpense) => {
  const { selectedExpenseIds, onSuccess } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const deleteSelectedExpenseIds = async () =>
    await expenseServices.deleteExpense(selectedExpenseIds);

  const deleteExpense = useMutation({
    mutationFn: deleteSelectedExpenseIds,
    mutationKey: ["deleteExpense"],
    onSuccess: (expenses) => {
      queryClient.invalidateQueries(["expenses"]);
      onClose();
      onSuccess?.(expenses);
    },
  });

  return (
    <>
      <Button
        onClick={onOpen}
        variant="outline"
        isDisabled={isEmpty(selectedExpenseIds)}
      >
        Delete Expense
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You are deleting the expenses detail</ModalHeader>
          <ModalCloseButton size="sm" border="transparent" />
          <ModalBody>
            <Text> Do you really want to delete the selected expenses?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="primary"
              mr={3}
              onClick={async () => await deleteExpense.mutate()}
            >
              Confirm
            </Button>
            <Button
              variant="outline"
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
