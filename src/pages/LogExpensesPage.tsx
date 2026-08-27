import {
  Box,
  Button,
  Card,
  Field,
  HStack,
  Icon,
  Input,
  NativeSelect,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useGetExpenseCategories } from "../hooks/EggExpensesRepository";
import {
  buildLogExpensesPayload,
  canSubmitExpense,
  initialValues,
  type LogExpensesFormValues,
  useSubmitExpenses,
} from "./LogExpensesWorker";
import "../css/styles/LogExpensesPage.css";

const LogExpensesPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm<LogExpensesFormValues>({
    defaultValues: initialValues,
  });
  const values = watch();
  const { data: expenseCategories = [], isLoading: isCategoriesLoading } =
    useGetExpenseCategories();
  const { submitExpenses, isPending } = useSubmitExpenses();

  const isSubmitEnabled = useMemo(() => canSubmitExpense(values), [values]);

  const onSubmit = (data: LogExpensesFormValues) => {
    const payload = buildLogExpensesPayload(data);
    submitExpenses(payload);
  };

  return (
    <Box className="log-expenses-page">
      <VStack className="log-expenses-container" align="stretch">
        <Button
          className="log-expenses-back-btn"
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          aria-label="Go back to home page"
        >
          <HStack gap={2}>
            <Icon as={FaArrowLeft} />
            <Text>Back</Text>
          </HStack>
        </Button>

        <Stack className="log-expenses-header">
          <Text className="log-expenses-title">Log Expenses</Text>
          <Text className="log-expenses-subtitle">
            Enter the expenses for the day.
          </Text>
        </Stack>

        <Box as="form" id="log-expenses-form" onSubmit={handleSubmit(onSubmit)}>
          <Card.Root className="log-expenses-card">
            <Card.Body className="log-expenses-card-body">
              <Stack className="log-expenses-fields">
                <Field.Root>
                  <Field.Label>Expense Name</Field.Label>
                  <Controller
                    name="expenseName"
                    control={control}
                    render={({ field }) => (
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          value={field.value}
                          onChange={field.onChange}
                          aria-label="Select expense name"
                          _disabled={{ opacity: 1, cursor: "not-allowed" }}
                        >
                          <option value="" disabled>
                            {isCategoriesLoading
                              ? "Loading categories..."
                              : "Select expense type"}
                          </option>
                          {expenseCategories.map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    )}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Amount</Field.Label>
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="0.00"
                        aria-label="Expense amount"
                      />
                    )}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Description</Field.Label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter expense details"
                        aria-label="Expense description"
                      />
                    )}
                  />
                </Field.Root>
              </Stack>
            </Card.Body>
          </Card.Root>
        </Box>
      </VStack>

      <Box className="log-expenses-footer">
        <Box className="log-expenses-footer-inner">
          <Button
            className="log-expenses-submit-btn"
            size="lg"
            type="submit"
            form="log-expenses-form"
            loading={isPending}
            disabled={!isSubmitEnabled || isPending}
            aria-label="Submit expense record"
          >
            {isPending ? "Saving..." : "Submit"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LogExpensesPage;
