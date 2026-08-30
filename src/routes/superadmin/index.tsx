import { createFileRoute } from "@tanstack/react-router";
import { SuperadminDashboard } from "@/components/superadmin/SuperadminDashboard";

export const Route = createFileRoute("/superadmin/")({
  component: SuperadminDashboard,
});
