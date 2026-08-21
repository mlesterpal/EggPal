import {
  Box,
  Button,
  Card,
  Field,
  HStack,
  Icon,
  Input,
  NumberInput,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  buildLogSalesPayload,
  initialValues,
  type LogSalesFormValues,
  salesRows,
} from "./LogSalesWorker";
import "../css/styles/LogSalesPage.css";

const LogSalesPage = () => {
  const { control, handleSubmit } = useForm<LogSalesFormValues>({
    defaultValues: initialValues,
  });
  const navigate = useNavigate();
  const onSubmit = (data: LogSalesFormValues) => {
    const payload = buildLogSalesPayload(data);
    console.log(payload);
  };

  return (
    <Box className="log-sales-page">
      <VStack className="log-sales-container" align="stretch">
        <Button
          className="log-sales-back-btn"
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

        <Stack className="log-sales-header">
          <Text className="log-sales-title">Log Sales</Text>
          <Text className="log-sales-subtitle">
            Enter the number of eggs sold for each size today.
          </Text>
        </Stack>

        <Box as="form" id="log-sales-form" onSubmit={handleSubmit(onSubmit)}>
          <Card.Root className="log-sales-card">
            <Card.Body className="log-sales-card-body">
              <Stack className="log-sales-fields">
                {salesRows.map((row) => (
                  <Stack
                    key={row.id}
                    direction="row"
                    align="flex-start"
                    className="log-sales-row"
                  >
                    <Field.Root flex={1}>
                      <Field.Label>{row.label} Quantity</Field.Label>
                      <Controller
                        name={row.quantityName}
                        control={control}
                        render={({ field }) => (
                          <NumberInput.Root
                            className="log-sales-number-input"
                            min={0}
                            step={1}
                            value={field.value}
                            onValueChange={(details: { value: string }) =>
                              field.onChange(details.value)
                            }
                          >
                            <NumberInput.Input
                              inputMode="numeric"
                              placeholder="0"
                              aria-label={`${row.label} quantity`}
                            />
                            <NumberInput.Control>
                              <NumberInput.IncrementTrigger />
                              <NumberInput.DecrementTrigger />
                            </NumberInput.Control>
                          </NumberInput.Root>
                        )}
                      />
                    </Field.Root>

                    <Field.Root flex={1}>
                      <Field.Label>{row.label} Sales</Field.Label>
                      <Controller
                        name={row.salesName}
                        control={control}
                        render={({ field }) => (
                          <Input
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="0.00"
                            aria-label={`${row.label} sales amount`}
                          />
                        )}
                      />
                    </Field.Root>
                  </Stack>
                ))}
              </Stack>
            </Card.Body>
          </Card.Root>
        </Box>
      </VStack>

      <Box className="log-sales-footer">
        <Box className="log-sales-footer-inner">
          <Button className="log-sales-save-btn" size="lg" type="submit" form="log-sales-form">
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LogSalesPage;
