import {
  Box,
  Button,
  Card,
  Field,
  HStack,
  Icon,
  NumberInput,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  buildHarvestPayload,
  computeTotalEggs,
  eggSizeOptions,
  initialValues,
  type LogHarvestFormValues,
  useSubmitHarvest,
} from "./LogHarvestWorker";
import "../css/styles/LogHarvestPage.css";

const LogHarvestPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm<LogHarvestFormValues>({
    defaultValues: initialValues,
  });
  const counts = watch();
  const { submitHarvest, isPending } = useSubmitHarvest();

  const totalEggs = useMemo(() => computeTotalEggs(counts), [counts]);

  const onSubmit = (values: LogHarvestFormValues) => {
    const payload = buildHarvestPayload(values);
    submitHarvest(payload);
  };

  return (
    <Box className="log-harvest-page">
      <VStack className="log-harvest-container" align="stretch">
        <Button
          className="log-harvest-back-btn"
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

        <Stack className="log-harvest-header">
          <Text className="log-harvest-title">Log Harvest</Text>
          <Text className="log-harvest-subtitle">
            Enter the number of eggs harvested for each size today.
          </Text>
        </Stack>

        <Box as="form" id="log-harvest-form" onSubmit={handleSubmit(onSubmit)}>
          <Card.Root className="log-harvest-card">
            <Card.Body className="log-harvest-card-body">
              <Stack className="log-harvest-fields">
                {eggSizeOptions.map((size) => (
                  <Field.Root key={size.key}>
                    <Field.Label>{size.label}</Field.Label>
                    <Controller
                      control={control}
                      name={size.key}
                      render={({ field }) => (
                        <NumberInput.Root
                          className="log-harvest-number-input"
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
                            aria-label={`${size.label} egg count`}
                          />
                          <NumberInput.Control>
                            <NumberInput.IncrementTrigger />
                            <NumberInput.DecrementTrigger />
                          </NumberInput.Control>
                        </NumberInput.Root>
                      )}
                    />
                  </Field.Root>
                ))}

                <HStack className="log-harvest-total-row">
                  <Text className="log-harvest-total-label">Total Eggs</Text>
                  <Text className="log-harvest-total-value">{totalEggs}</Text>
                </HStack>
              </Stack>
            </Card.Body>
          </Card.Root>
        </Box>
      </VStack>

      <Box className="log-harvest-footer">
        <Box className="log-harvest-footer-inner">
          <Button
            className="log-harvest-save-btn"
            size="lg"
            type="submit"
            form="log-harvest-form"
            loading={isPending}
            aria-label="Save harvest record"
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LogHarvestPage;
