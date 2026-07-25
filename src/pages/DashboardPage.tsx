import { SimpleGrid, VStack } from "@chakra-ui/react";
import EggProductionBySizeDashboard from "../components/dashboard/EggProductionBySizeDashboard";
import EggProductionAnalysisCardDashboard from "../components/dashboard/EggProductionAnalysisCardDashboard";
import HarvestTodayDashboard from "../components/dashboard/HarvestTodayDashboard";
import MarketAnalysisCardDashboard from "../components/dashboard/MarketAnalysisCardDashboard";

const DashboardPage = () => {
  return (
    <VStack align="stretch" gap={4}>
      <MarketAnalysisCardDashboard />
      <SimpleGrid
        columns={{ base: 1, md: undefined }} // if mobile show the items in column else show the items in row
        gridTemplateColumns={{ base: "1fr", md: "auto minmax(0, 1fr)" }} // 1fr on base makes takes the full width of the container and md makes the items in row
        gap={3}
        alignItems="start"
      >
        <HarvestTodayDashboard />
        <EggProductionAnalysisCardDashboard />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, sm: 2, xl: 2 }} gap={3}>
        <EggProductionBySizeDashboard />
      </SimpleGrid>
    </VStack>
  );
};

export default DashboardPage;
