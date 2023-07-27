import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  chakra,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { FieldError, useForm } from "react-hook-form";
import { z } from "zod";
import { Expense, ExpenseCategory } from "./Apis";

const categories = Object.values(ExpenseCategory);

const expenseSchema = z.object({
  item: z
    .string()
    .nonempty({ message: "Item is required" })
    .regex(/^[a-zA-Z0-9 ]*$/, "Item cannot include special characters."),
  category: z.enum(["Food", "Furniture", "Accessory"]),
  amount: z
    .string()
    .nonempty({ message: "Amount is required" })
    .refine((value) => !isNaN(Number(value)), {
      message: "Amount must be a valid number",
    })
    .refine((value) => Number(value) > 0, {
      message: "Amount must be a positive number",
    }),
});

interface IExpenseForm {
  onSubmit: (data: Omit<Expense, "id">) => Promise<void>;
}

interface IFormContainer {
  error?: FieldError;
  children: ReactNode;
  label: string;
}

const FormField = ({ error, label, children }: IFormContainer) => (
  <FormControl isInvalid={!!error}>
    <Box w="full">
      <HStack alignItems="baseline">
        <FormLabel w={90}>{`${label}:`}</FormLabel>
        <Flex w="full">{children}</Flex>
      </HStack>
      <HStack>
        <Box w={105} />
        <Flex w="full">
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </Flex>
      </HStack>
    </Box>
  </FormControl>
);

export const ExpenseForm = ({ onSubmit }: IExpenseForm) => {
  const { register, handleSubmit, formState } = useForm<Omit<Expense, "id">>({
    resolver: zodResolver(expenseSchema),
  });

  const { errors, isSubmitting } = formState;

  return (
    <chakra.form
      w="100%"
      onSubmit={handleSubmit((d) =>
        onSubmit({ ...d, amount: Number(d.amount) })
      )}
      id="expense-form"
    >
      <Stack w="100%" spacing={5}>
        <FormField label="Item" error={errors.item}>
          <Input
            {...register("item")}
            type="text"
            borderColor="border.form"
            borderWidth={2}
            placeholder="Item name"
          />
        </FormField>
        <FormField label="Category" error={errors.category}>
          <Select
            {...register("category")}
            w="full"
            borderColor="border.form"
            borderWidth={2}
          >
            {categories.map((category) => (
              <option key={category} color="content">
                {category}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Amount" error={errors.amount}>
          <Input
            {...register("amount")}
            type="text"
            borderColor="border.form"
            borderWidth={2}
            placeholder="Item amount"
          />
        </FormField>
        <Flex justifyContent="end">
          <Button
            variant="primary"
            id="expense-form"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Flex>
      </Stack>
    </chakra.form>
  );
};
