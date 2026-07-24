import { VStack } from "@chakra-ui/react";
import EggProductionBySizeDashboard from "../components/dashboard/EggProductionBySizeDashboard";
import HarvestTodayDashboard from "../components/dashboard/HarvestTodayDashboard";

const DashboardPage = () => {
  return (
    <VStack align="stretch" gap={4}>
      <HarvestTodayDashboard />
      <EggProductionBySizeDashboard />
    </VStack>
  );
};

export default DashboardPage;
