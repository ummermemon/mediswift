import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/superadmin")({
  component: () => <Outlet />,
  head: () => ({
    meta: [
      { title: "Superadmin Console — MediSwift" },
      {
        name: "description",
        content:
          "Manage doctors, pharmacies, delivery partners, products, categories and patients from the MediSwift superadmin console.",
      },
    ],
  }),
});
