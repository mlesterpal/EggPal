import { Box, HStack, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { useGetHarvestAnalysisSummary } from "../../hooks/EggHarvestRepository";

type TrendDirection = "increase" | "decrease" | "none";

type EggSizeSummary = {
  size: string;
  currentCount: number;
  peakCount: number;
  direction: TrendDirection; // increase, decrease, none
  consecutiveDays: number;
  trendText: string; // text to display the trend
};

const defaultEggSizeSummary: EggSizeSummary[] = [
  {
    size: "S",
    currentCount: 0,
    peakCount: 0,
    direction: "none",
    consecutiveDays: 0,
    trendText: "No change from previous days",
  },
  {
    size: "M",
    currentCount: 0,
    peakCount: 0,
    direction: "none",
    consecutiveDays: 0,
    trendText: "No change from previous days",
  },
  {
    size: "L",
    currentCount: 0,
    peakCount: 0,
    direction: "none",
    consecutiveDays: 0,
    trendText: "No change from previous days",
  },
  {
    size: "XL",
    currentCount: 0,
    peakCount: 0,
    direction: "none",
    consecutiveDays: 0,
    trendText: "No change from previous days",
  },
  {
    size: "Cracked",
    currentCount: 0,
    peakCount: 0,
    direction: "none",
    consecutiveDays: 0,
    trendText: "No change from previous days",
  },
];

const parseTrend = (
  trendText: string,
): { direction: TrendDirection; consecutiveDays: number } => {
  const normalized = trendText.toLowerCase();
  const dayMatch = trendText.match(/(\d+)/);
  const consecutiveDays = dayMatch ? Number.parseInt(dayMatch[1], 10) : 0;

  if (normalized.includes("increasing")) {
    return { direction: "increase", consecutiveDays };
  }
  if (normalized.includes("decreasing")) {
    return { direction: "decrease", consecutiveDays };
  }
  return { direction: "none", consecutiveDays };
};

const EggProductionAnalysisCardDashboard = () => {
  const {
    data: analysisSummary,
    isLoading,
    isError,
  } = useGetHarvestAnalysisSummary();

  const eggSizeSummary = useMemo(() => {
    if (isLoading || isError || !analysisSummary || analysisSummary.length === 0) {
      return defaultEggSizeSummary;
    }

    return analysisSummary.map((item) => {
      const trend = parseTrend(item.trend);

      return {
        size: item.size,
        currentCount: item.currentCount,
        peakCount: item.peak,
        direction: trend.direction,
        consecutiveDays: trend.consecutiveDays,
        trendText: item.trend,
      } satisfies EggSizeSummary;
    });
  }, [analysisSummary, isError, isLoading]);

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
