import { Routes, Route, Navigate } from "react-router-dom";

import SuperAdminRoutes from "./routes/SuperAdminRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />

      <Route path="/superadmin/*" element={<SuperAdminRoutes />} />
    </Routes>
  );
}

export default App;