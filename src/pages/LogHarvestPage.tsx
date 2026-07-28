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
import type { EggHarvestPayload } from "../entity/payload/EggHarvestPayload";
import { useLogHarvest } from "../hooks/EggHarvestRepository";
import { toaster } from "../components/ui/toaster";

type EggSizeKey = "S" | "M" | "L" | "XL" | "Cracked";

type LogHarvestFormValues = Record<EggSizeKey, string>;

//ReadonlyArray is a type that is used to create a readonly array
// eggSizeOptions used to display the egg size options in the form as label and key
const eggSizeOptions: ReadonlyArray<{ key: EggSizeKey; label: string }> = [
  { key: "S", label: "Small (S)" },
  { key: "M", label: "Medium (M)" },
  { key: "L", label: "Large (L)" },
  { key: "XL", label: "Extra Large (XL)" },
  { key: "Cracked", label: "Cracked" },
];

const initialValues: LogHarvestFormValues = {
  S: "0",
  M: "0",
  L: "0",
  XL: "0",
  Cracked: "0",
};

//sanitize means to check if the value is a number and if it is not a number then return 0
// it run when user computing the total eggs and when user save is clicked
const sanitizeCount = (value: string) => {
  const parsed = Number.parseInt(value, 10); //base 10 example if the value is "123" then parsed will be 123 if the base is 100 then parsed will be 12300
  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) return 0; // isInfinite example is 1/0 is infinite
  return Math.max(0, parsed);
};

const LogHarvestPage = () => {
  const navigate = useNavigate();
  // the purpose of control is exmaple: if the user type 123 in the S field then the value will be 123 and if the user type 123 in the M field then the value will be 123 and if the user type 123 in the L field then the value will be 123 and if the user type 123 in the XL field then the value will be 123 and if the user type 123 in the Cracked field then the value will be 123
  const { control, handleSubmit, watch } = useForm<LogHarvestFormValues>({
    defaultValues: initialValues,
  });
  const counts = watch(); // watch purpose is to watch the changes in the form and update the total eggs
  const { mutate, isPending } = useLogHarvest(); //useLogHarvest is a hook that is used to log the harvest

  const totalEggs = useMemo(
    () =>
      eggSizeOptions.reduce(
        (total, size) => total + sanitizeCount(counts[size.key] ?? "0"),
        0,
      ),
    [counts],
  );

  const onSubmit = (values: LogHarvestFormValues) => {
    const payload: EggHarvestPayload = {
      HarvestDate: new Date().toISOString(),
      S: sanitizeCount(values.S),
      M: sanitizeCount(values.M),
      L: sanitizeCount(values.L),
      XL: sanitizeCount(values.XL),
      Cracked: sanitizeCount(values.Cracked),
      TotalEggs: totalEggs,
    };

    mutate(payload, {
      onSuccess: (message) => {
        toaster.create({
          type: "success",
          title: "Harvest saved",
          description: message || "Harvest record saved successfully.",
        });
        navigate("/");
      },
      onError: (error) => {
        toaster.create({
          type: "error",
          title: "Unable to save harvest",
          description: error.message || "Please try again.",
        });
      },
    });
  };

  return (
    <Box
      minH="100dvh"
      bg="bg"
      px={{ base: 4, md: 6 }}
      py={{ base: 6, md: 8 }}
      pb={{ base: 24, md: 8 }}
    >
      <VStack maxW="640px" mx="auto" align="stretch" gap={6}>
        <Button
          alignSelf="flex-start"
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

        <Stack gap={2}>
          <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
            Log Harvest
          </Text>
          <Text color="fg.muted">
            Enter the number of eggs harvested for each size today.
          </Text>
        </Stack>

        <Box as="form" id="log-harvest-form" onSubmit={handleSubmit(onSubmit)}>
          <Card.Root borderWidth="1px" borderColor="border.muted">
            <Card.Body p={{ base: 4, md: 5 }}>
              <Stack gap={4}>
                {eggSizeOptions.map((size) => (
                  <Field.Root key={size.key}>
                    <Field.Label>{size.label}</Field.Label>
                    <Controller
                      control={control}
                      name={size.key} //size.key example: S, M, L, XL, Cracked
                      render={({ field }) => (
                        <NumberInput.Root
                          min={0}
                          step={1}
                          value={field.value}
                          onValueChange={
                            (details: { value: string }) =>
                              field.onChange(details.value) //field.onChange is a function that is used to change the value of the field
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

                <HStack justify="space-between" pt={2}>
                  <Text color="fg.muted">Total Eggs</Text>
                  <Text fontWeight="semibold">{totalEggs}</Text>
                </HStack>
              </Stack>
            </Card.Body>
          </Card.Root>
        </Box>
      </VStack>

      <Box
        position={{ base: "fixed", md: "static" }}
        left="0"
        right="0"
        bottom="0"
        zIndex="docked"
        bg="bg"
        borderTopWidth={{ base: "1px", md: "0" }}
        borderColor="border.muted"
        px={{ base: 4, md: 0 }}
        py={{ base: 3, md: 0 }}
      >
        <Box maxW="640px" mx="auto">
          <Button
            size="lg"
            w="full"
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
