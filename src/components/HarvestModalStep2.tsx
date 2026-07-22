import { Box, NumberInput, Presence, Text } from "@chakra-ui/react";

interface HarvestModalStep2Props {
  step: number;
  direction: "forward" | "back";
  eggSizeOptions: ReadonlyArray<{
    key: "small" | "medium" | "large";
    label: string;
  }>;

  eggCounts: Record<"small" | "medium" | "large", string>;

  onCountChange: (size: "small" | "medium" | "large", value: string) => void;
  totalEggs: number;
}

export function HarvestModalStep2({
  step,
  direction,
  eggSizeOptions,
  eggCounts,
  onCountChange,
  totalEggs,
}: HarvestModalStep2Props) {
  return (
    <Presence
      present={step === 2}
      unmountOnExit
      skipAnimationOnMount
      animationDuration="moderate"
      animationName={{
        _open:
          direction === "forward"
            ? "slide-from-right, fade-in"
            : "slide-from-left, fade-in",
        _closed:
          direction === "back"
            ? "slide-to-right, fade-out"
            : "slide-to-left, fade-out",
      }}
      position="absolute"
      inset="0"
    >
      <Box display="grid" gap="3">
        <Text>How many eggs did you harvest today?</Text>
        <Text fontSize="sm" color="fg.muted">
          Enter counts by egg size.
        </Text>

        {eggSizeOptions.map((size) => (
          <Box
            key={size.key}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="3"
          >
            <Text>{size.label}</Text>
            <NumberInput.Root
              min={0}
              step={1}
              value={eggCounts[size.key]}
              onValueChange={(details: { value: string }) =>
                onCountChange(size.key, details.value)
              }
              width="128px"
            >
              <NumberInput.Input placeholder="0" />
              <NumberInput.Control>
                <NumberInput.IncrementTrigger />
                <NumberInput.DecrementTrigger />
              </NumberInput.Control>
            </NumberInput.Root>
          </Box>
        ))}

        <Text fontSize="sm" color="fg.muted">
          Total: {totalEggs}
        </Text>
      </Box>
    </Presence>
  );
}
export default HarvestModalStep2;
