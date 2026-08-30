import * as React from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardNavigation } from "./DashboardNavigation";
import { Inventory } from "./Inventory";
import { Orders } from "./Orders";
import { Overview } from "./Overview";
import { PharmacyDetails } from "./PharmacyDetails";
import type { TabKey } from "./pharmacist-types";

export function PharmacistDashboard() {
  const [tab, setTab] = React.useState<TabKey>("overview");
  const [online, setOnline] = React.useState(true);

  return (
    <div className="min-h-screen bg-page">
      <DashboardHeader />
      <div className="mx-auto flex max-w-[1536px] gap-5 px-4 py-5 lg:px-8">
        <DashboardNavigation tab={tab} onTabChange={setTab} />
        <main className="min-w-0 flex-1">
          <DashboardNavigation tab={tab} onTabChange={setTab} mobileOnly />
          {tab === "overview" && (
            <Overview online={online} setOnline={setOnline} onNavigate={setTab} />
          )}
          {tab === "inventory" && <Inventory />}
          {tab === "orders" && <Orders />}
          {tab === "pharmacy" && <PharmacyDetails online={online} setOnline={setOnline} />}
        </main>
      </div>
    </div>
  );
}
