import { tabs } from "./pharmacist-data";
import type { TabKey } from "./pharmacist-types";

export function DashboardNavigation({
  tab,
  onTabChange,
  mobileOnly = false,
}: {
  tab: TabKey;
  onTabChange: (tab: TabKey) => void;
  mobileOnly?: boolean;
}) {
  return (
    <>
      {!mobileOnly && (
        <aside className="hidden w-[210px] shrink-0 lg:block">
          <nav className="sticky top-[76px] space-y-1 rounded-xl bg-card p-2 shadow-card">
            {tabs.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => onTabChange(key)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[12.5px] font-medium transition-colors ${
                  tab === key
                    ? "gradient-brand text-brand-foreground shadow-pill"
                    : "text-ink-soft hover:bg-brand-soft hover:text-brand"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </nav>
        </aside>
      )}
      {mobileOnly && (
        <div className="mb-4 flex gap-1.5 overflow-x-auto lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium ${
                tab === key
                  ? "gradient-brand text-brand-foreground shadow-pill"
                  : "bg-card text-ink-soft shadow-soft"
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
