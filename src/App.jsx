import { Routes, Route, Navigate } from "react-router-dom";

import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />

      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}

export default App;