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
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../css/styles/LogExpensesPage.css";

const LogExpensesPage = () => {
  const navigate = useNavigate();
  return (
    <Box className="log-expenses-page">
      <VStack className="log-expenses-container" align="stretch">
        {/* Back Button */}
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

        <Box
          as="form"
          id="log-expenses-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <Card.Root className="log-expenses-card">
            <Card.Body className="log-expenses-card-body">
              <Stack className="log-expenses-fields">
                <Field.Root>
                  <Field.Label>Expense Name</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      defaultValue=""
                      aria-label="Select expense name"
                    >
                      <option value="" disabled>
                        Select expense type
                      </option>
                      <option value="feed">Feed</option>
                      <option value="other">Other</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Amount</Field.Label>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    aria-label="Expense amount"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Description</Field.Label>
                  <Input placeholder="Enter expense details" />
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
            aria-label="Submit expense record"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LogExpensesPage;
