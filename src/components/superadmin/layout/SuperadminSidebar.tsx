import * as React from "react";
import { PanelLeft, Plus } from "lucide-react";
import { superadminTabs, type SuperadminTabKey } from "./navigation";

type SuperadminSidebarProps = {
  activeTab: SuperadminTabKey;
  pendingDoctors: number;
  onTabChange: (tab: SuperadminTabKey) => void;
  onQueryReset: () => void;
};

export function SuperadminSidebar({
  activeTab,
  pendingDoctors,
  onTabChange,
  onQueryReset,
}: SuperadminSidebarProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <aside
      className={`superadmin-rail hidden shrink-0 flex-col border-x border-border lg:flex ${expanded ? "superadmin-rail-expanded w-[210px]" : "w-[52px] items-center"}`}
    >
      <div className="flex w-full items-center justify-between border-b border-border px-2 py-3">
        {expanded && (
          <div className="pl-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
              Workspace
            </p>
            <p className="mt-0.5 text-[11px] text-ink-soft">MediSwift operations</p>
          </div>
        )}
        <button
          type="button"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={expanded}
          title={expanded ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => setExpanded((value) => !value)}
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-md text-ink-soft hover:bg-brand-soft hover:text-brand ${expanded ? "ml-auto" : ""}`}
        >
          <PanelLeft className="h-4 w-4" />
        </button>
      </div>
      <div className={`flex w-full flex-col gap-1.5 py-4 ${expanded ? "px-2" : "items-center"}`}>
        {superadminTabs.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            title={label}
            aria-label={label}
            onClick={() => {
              onTabChange(key);
              onQueryReset();
            }}
            className={`flex h-9 items-center rounded-md text-left ${expanded ? "w-full gap-3 px-3" : "w-9 justify-center"} ${activeTab === key ? "bg-brand text-brand-foreground" : "text-ink-soft hover:bg-brand-soft hover:text-brand"}`}
          >
            <Icon className="h-4 w-4" />
            {expanded && <span className="text-[11px] font-medium">{label}</span>}
            {expanded && key === "doctors" && (
              <span className="ml-auto rounded bg-chart-4/20 px-1.5 py-0.5 text-[9px] font-semibold text-ink">
                {pendingDoctors}
              </span>
            )}
          </button>
        ))}
      </div>
      <button
        type="button"
        aria-label="Create new item"
        className={`mt-auto mb-4 grid h-8 place-items-center rounded-md border border-border text-ink-soft hover:border-brand hover:text-brand ${expanded ? "mx-2 w-[calc(100%-1rem)]" : "w-8"}`}
      >
        <Plus className="h-4 w-4" />
        {expanded && <span className="ml-2 text-[11px] font-medium">Create workspace item</span>}
      </button>
    </aside>
  );
}

export function SuperadminMobileNavigation({
  activeTab,
  onTabChange,
  onQueryReset,
}: Omit<SuperadminSidebarProps, "pendingDoctors">) {
  return (
    <div className="mb-4 flex gap-1.5 overflow-x-auto lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {superadminTabs.map(({ key, label, Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => {
            onTabChange(key);
            onQueryReset();
          }}
          className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium ${activeTab === key ? "gradient-brand text-brand-foreground shadow-pill" : "bg-card text-ink-soft shadow-soft"}`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}
