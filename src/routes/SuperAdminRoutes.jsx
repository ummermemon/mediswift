import { Routes, Route } from "react-router-dom";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";

export default function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}