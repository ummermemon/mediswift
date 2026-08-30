import { createFileRoute } from "@tanstack/react-router";
import { PharmacistDashboard } from "@/components/pharmacist/PharmacistDashboard";

export const Route = createFileRoute("/pharmacist")({
  component: PharmacistDashboard,
  head: () => ({
    meta: [
      { title: "Pharmacist Dashboard — MediSwift Partner Console" },
      {
        name: "description",
        content:
          "Manage medicine inventory, verify prescriptions, update order status and edit your pharmacy details from the MediSwift pharmacist dashboard.",
      },
      { property: "og:title", content: "Pharmacist Dashboard — MediSwift" },
      {
        property: "og:description",
        content: "Inventory, prescriptions, orders and pharmacy settings in one partner console.",
      },
    ],
  }),
});
