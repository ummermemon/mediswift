import { createFileRoute } from "@tanstack/react-router";
import { SuperadminLogin } from "@/components/superadmin/SuperadminLogin";

export const Route = createFileRoute("/superadmin/login")({
  component: SuperadminLogin,
  head: () => ({
    meta: [
      { title: "Superadmin Login — MediSwift" },
      {
        name: "description",
        content: "Secure sign in for the MediSwift Superadmin operations workspace.",
      },
    ],
  }),
});
