import { SimpleGrid, VStack } from "@chakra-ui/react";
import EggSalesDataTable from "../components/finance/EggSalesDataTable";
import ExpensesDataTable from "../components/finance/ExpensesDataTable";

const FinancePage = () => {
  return (
    <VStack align="stretch" gap={4}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
        <EggSalesDataTable />
        <ExpensesDataTable />
      </SimpleGrid>
    </VStack>
  );
};

export default FinancePage;
