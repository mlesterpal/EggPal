import {
  Badge,
  Box,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";

type MarketMetric = {
  title: "Profit" | "Sales" | "Expenses";
  value: string;
  changePercent: number;
  isIncrease: boolean;
};

const marketMetrics: MarketMetric[] = [
  { title: "Profit", value: "$28,450", changePercent: 8.1, isIncrease: true },
  { title: "Sales", value: "$96,320", changePercent: 5.4, isIncrease: true },
  { title: "Expenses", value: "$67,870", changePercent: 3.2, isIncrease: false },
];

const MarketAnalysisCardDashboard = () => {
  return (
    <Stack gap={4}>
      <Text fontWeight="semibold">Market Analysis</Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
        {marketMetrics.map((metric) => (
          <Box
            key={metric.title}
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
                {metric.title}
              </Text>
              <Link
                href="#"
                fontSize="xs"
                color="fg.muted"
                textDecoration="none"
                _hover={{ color: "fg.default" }}
              >
                <HStack gap={1}>
                  <Text>View Details</Text>
                  <Icon as={FiExternalLink} boxSize={3.5} />
                </HStack>
              </Link>
            </HStack>

            <Text fontSize="2xl" fontWeight="bold" lineHeight="1.2" mb={3}>
              {metric.value}
            </Text>

            <Badge
              colorPalette={metric.isIncrease ? "green" : "red"}
              px={2}
              py={1}
              borderRadius="md"
            >
              <HStack gap={1}>
                <Icon as={metric.isIncrease ? FaArrowTrendUp : FaArrowTrendDown} />
                <Text fontSize="xs">
                  {metric.isIncrease ? "+" : "-"}
                  {metric.changePercent}% vs last month
                </Text>
              </HStack>
            </Badge>
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default MarketAnalysisCardDashboard;
