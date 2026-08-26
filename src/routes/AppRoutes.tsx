import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import DashboardPage from "../pages/DashboardPage";
import EggProductionPage from "../pages/EggProductionPage";
import FinancePage from "../pages/FinancePage";
import LogHarvestPage from "../pages/LogHarvestPage";
import UserHomePage from "../pages/UserHomePage";
import LogSalesPage from "../pages/LogSalesPage";
import LogExpensesPage from "../pages/LogExpensesPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserHomePage />} />
      <Route path="/log-harvest" element={<LogHarvestPage />} />
      <Route path="/log-sales" element={<LogSalesPage />} />
      <Route path="/log-expenses" element={<LogExpensesPage />} />
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/egg-production" element={<EggProductionPage />} />
        <Route path="/finance" element={<FinancePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
