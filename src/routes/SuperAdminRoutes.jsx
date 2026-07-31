import { Routes, Route } from "react-router-dom";

import Login from "../pages/superadmin/Login";
import Dashboard from "../pages/superadmin/Dashboard";

export default function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}