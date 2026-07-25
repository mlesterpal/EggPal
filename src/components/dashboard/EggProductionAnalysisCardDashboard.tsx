import { Box, HStack, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

type EggSize = "S" | "M" | "L" | "XL";
type TrendDirection = "increase" | "decrease" | "none";

type EggSizeHistory = {
  size: EggSize;
  counts: number[];
};

type EggSizeSummary = {
  size: EggSize;
  currentCount: number;
  peakCount: number;
  direction: TrendDirection; // increase, decrease, none
  consecutiveDays: number;
  trendText: string; // text to display the trend
};

const eggSizeHistory: EggSizeHistory[] = [
  { size: "S", counts: [10, 11, 12, 14] },
  { size: "M", counts: [15, 18, 20] },
  { size: "L", counts: [22, 21, 19, 17, 17] },
  { size: "XL", counts: [7, 7, 7, 7] },
];

// delta = currentDayCount - previousDayCount
const resolveDirection = (deltas: number[]): TrendDirection => {
  // return the direction of the trend
  for (let i = deltas.length - 1; i >= 0; i -= 1) {
    if (deltas[i] > 0) return "increase";
    if (deltas[i] < 0) return "decrease";
  }
  return "none";
};

// count the consecutive days of the trend
const countConsecutiveDays = (deltas: number[], direction: TrendDirection) => {
  if (direction === "none") return 0;

  let days = 0;
  for (let i = deltas.length - 1; i >= 0; i -= 1) {
    const delta = deltas[i];
    const aligned = direction === "increase" ? delta >= 0 : delta <= 0; // if the direction is increase then when the delta become negative the aligned become false
    if (!aligned) break;
    days += 1; // it will add up the days if the delta is aligned with the direction
  }
  return days;
};

const summarizeEggSize = ({ size, counts }: EggSizeHistory): EggSizeSummary => {
  const currentCount = counts[counts.length - 1] ?? 0; // get the current count of the egg size
  const peakCount = counts.length > 0 ? Math.max(...counts) : 0; // get the peak count of the egg size
  if (counts.length < 2) {
    return {
      size,
      currentCount,
      peakCount,
      direction: "none",
      consecutiveDays: 0,
      trendText: "No change from previous days",
    };
  }

  // delta = currentDayCount - previousDayCount
  const deltas = counts.slice(1).map((count, index) => count - counts[index]); // calculate the delta for each day
  const direction = resolveDirection(deltas); // direction is whether the egg size is increasing or decreasing
  const consecutiveDays = countConsecutiveDays(deltas, direction);

  if (direction === "increase") {
    return {
      size,
      currentCount,
      peakCount,
      direction,
      consecutiveDays,
      trendText: `Increased for ${consecutiveDays} consecutive days`,
    };
  }

  if (direction === "decrease") {
    return {
      size,
      currentCount,
      peakCount,
      direction,
      consecutiveDays,
      trendText: `Decreased for ${consecutiveDays} consecutive days`,
    };
  }

  return {
    size,
    currentCount,
    peakCount,
    direction,
    consecutiveDays,
    trendText: "No change from previous days",
  };
};

const eggSizeSummary = eggSizeHistory.map(summarizeEggSize);

const EggProductionAnalysisCardDashboard = () => {
  return (
    <Stack gap={4}>
      <Text fontWeight="semibold">Egg Production Analysis</Text>

      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap={3}>
        {eggSizeSummary.map((item) => {
          const isIncrease = item.direction === "increase";
          const isDecrease = item.direction === "decrease";
          const trendColor = isIncrease
            ? "green.500"
            : isDecrease
              ? "red.500"
              : "fg.muted";
          const trendIcon = isIncrease
            ? FaArrowTrendUp
            : isDecrease
              ? FaArrowTrendDown
              : undefined;

          return (
            <Box
              key={item.size}
              borderWidth="1px"
              borderRadius="xl"
              borderColor="border.muted"
              bg="bg.panel"
              p={4}
              shadow="xs"
              transition="all 0.2s ease"
              _hover={{ shadow: "sm", borderColor: "border.subtle" }}
            >
              <HStack justify="space-between" mb={3}>
                <Text color="fg.muted" fontSize="sm">
                  Size {item.size}
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  Peak: {item.peakCount}
                </Text>
              </HStack>

              <Text fontSize="2xl" fontWeight="bold" lineHeight="1.2" mb={2}>
                {item.currentCount}
              </Text>

              <HStack color={trendColor} align="start">
                {trendIcon ? <Icon as={trendIcon} mt="1" /> : null}
                <Text fontSize="sm">{item.trendText}</Text>
              </HStack>
            </Box>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
};

export default EggProductionAnalysisCardDashboard;
