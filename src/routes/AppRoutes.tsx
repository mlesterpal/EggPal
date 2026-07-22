import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import DashboardPage from "../pages/DashboardPage";
import EggProductionPage from "../pages/EggProductionPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="egg-production" element={<EggProductionPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
