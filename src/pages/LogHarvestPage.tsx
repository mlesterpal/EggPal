import {
  Box,
  Button,
  Card,
  HStack,
  Icon,
  NumberInput,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type EggSizeKey = "S" | "M" | "L" | "XL" | "Cracked";

type HarvestCounts = Record<EggSizeKey, string>;

//ReadonlyArray is a type that is used to create a readonly array
const eggSizeOptions: ReadonlyArray<{ key: EggSizeKey; label: string }> = [
  { key: "S", label: "Small (S)" },
  { key: "M", label: "Medium (M)" },
  { key: "L", label: "Large (L)" },
  { key: "XL", label: "Extra Large (XL)" },
  { key: "Cracked", label: "Cracked" },
];

const initialCounts: HarvestCounts = {
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
  const [counts, setCounts] = useState<HarvestCounts>(initialCounts);

  // usememo if other component changes if nothing changed on counts then it will not re-render
  const totalEggs = useMemo(
    () =>
      eggSizeOptions.reduce(
        (total, size) => total + sanitizeCount(counts[size.key]),
        0,
      ),
    [counts],
  );

  //onCountChange is a function that is used to update the counts of the eggs for specific size
  const onCountChange = (size: EggSizeKey, value: string) => {
    setCounts((prev) => ({
      ...prev,
      [size]: value,
    }));
  };

  const handleSave = () => {
    //payload is a object that contains the harvest date, counts, and total eggs
    const payload = {
      harvestDate: new Date().toISOString(),
      counts: {
        S: sanitizeCount(counts.S),
        M: sanitizeCount(counts.M),
        L: sanitizeCount(counts.L),
        XL: sanitizeCount(counts.XL),
        Cracked: sanitizeCount(counts.Cracked),
      },
      totalEggs,
    };

    console.log("Harvest record (UI-only):", payload);
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

        <Card.Root borderWidth="1px" borderColor="border.muted">
          <Card.Body p={{ base: 4, md: 5 }}>
            <Stack gap={4}>
              {eggSizeOptions.map((size) => (
                <Stack key={size.key} gap={2}>
                  <Text fontWeight="medium">{size.label}</Text>
                  <NumberInput.Root
                    min={0}
                    step={1}
                    value={counts[size.key]}
                    onValueChange={(details: { value: string }) =>
                      onCountChange(size.key, details.value)
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
                </Stack>
              ))}

              <HStack justify="space-between" pt={2}>
                <Text color="fg.muted">Total Eggs</Text>
                <Text fontWeight="semibold">{totalEggs}</Text>
              </HStack>
            </Stack>
          </Card.Body>
        </Card.Root>
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
            onClick={handleSave}
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
