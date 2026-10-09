import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SuperadminDashboard } from "@/components/superadmin/SuperadminDashboard";

export const Route = createFileRoute("/superadmin/")({
  component: () => (
    <ProtectedRoute>
      <SuperadminDashboard />
    </ProtectedRoute>
  ),
});
