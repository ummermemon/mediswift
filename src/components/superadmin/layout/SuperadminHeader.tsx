import * as React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronDown, KeyRound, LogOut, Store, UserRound } from "lucide-react";
import logo from "@/assets/superadmin-logo.png";
import { superadminTabs, type SuperadminTabKey } from "./navigation";

type SuperadminHeaderProps = {
  activeTab: SuperadminTabKey;
  onTabChange: (tab: SuperadminTabKey) => void;
  onQueryReset: () => void;
};

export function SuperadminHeader({ activeTab, onTabChange, onQueryReset }: SuperadminHeaderProps) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const notificationsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const closeMenus = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!profileRef.current?.contains(target)) setProfileOpen(false);
      if (!notificationsRef.current?.contains(target)) setNotificationsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", closeMenus);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenus);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1536px] items-center gap-4 px-4 py-2 lg:px-8">
        <Link to="/" className="superadmin-logo-wrap flex shrink-0 items-center gap-2">
          <img
            src={logo}
            alt="MediSwift"
            className="superadmin-logo h-10 w-10 object-contain"
            width={64}
            height={64}
          />
        </Link>
        <nav className="hidden items-center gap-5 self-stretch lg:flex" aria-label="Workspace">
          {superadminTabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                onTabChange(key);
                onQueryReset();
              }}
              className={`relative self-stretch px-0.5 text-[11px] font-medium ${activeTab === key ? "text-ink" : "text-ink-soft hover:text-ink"}`}
            >
              {label.replace(" & categories", "")}
              {activeTab === key && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand" />}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/"
            className="hidden items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[11px] font-medium text-ink hover:border-brand hover:text-brand sm:flex"
          >
            <Store className="h-3.5 w-3.5" />
            Visit store
          </Link>
          <div ref={notificationsRef} className="relative">
            <button
              type="button"
              aria-expanded={notificationsOpen}
              aria-haspopup="menu"
              aria-label="Open notifications"
              onClick={() => {
                setNotificationsOpen((open) => !open);
                setProfileOpen(false);
              }}
              className="relative grid h-10 w-10 place-items-center rounded-lg border border-border text-ink-soft hover:bg-brand-soft hover:text-brand"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-destructive px-0.5 text-[9px] font-semibold text-destructive-foreground">
                3
              </span>
            </button>
            {notificationsOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-40 mt-2 w-72 rounded-lg border border-border bg-card p-1.5 shadow-card"
              >
                <div className="flex items-center justify-between px-3 py-2">
                  <p className="text-[12px] font-semibold text-ink">Notifications</p>
                  <span className="text-[10px] text-ink-soft">3 new</span>
                </div>
                {[
                  { title: "2 doctor registrations await review", time: "5 min ago" },
                  { title: "Apollo Corner submitted an application", time: "18 min ago" },
                  { title: "Paracetamol 650mg is low in stock", time: "32 min ago" },
                ].map(({ title, time }) => (
                  <button
                    key={title}
                    type="button"
                    role="menuitem"
                    onClick={() => setNotificationsOpen(false)}
                    className="flex w-full items-start gap-2 rounded-md px-3 py-2 text-left hover:bg-brand-soft"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span>
                      <span className="block text-[11.5px] text-ink">{title}</span>
                      <span className="mt-0.5 block text-[10px] text-ink-soft">{time}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div ref={profileRef} className="relative">
            <button
              type="button"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              aria-label="Open profile menu"
              onClick={() => {
                setProfileOpen((open) => !open);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5 text-left hover:bg-brand-soft"
            >
              <img
                src="https://i.pravatar.cc/96?img=12"
                alt="Ummer Memon"
                className="h-8 w-8 rounded-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  event.currentTarget.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <span className="hidden h-8 w-8 place-items-center rounded-full bg-brand-soft text-[11px] font-semibold text-brand">
                UM
              </span>
              <div className="hidden leading-tight sm:block">
                <p className="text-[12px] font-medium text-ink">Ummer Memon</p>
                <p className="text-[10px] text-ink-soft">SUPERADMIN</p>
              </div>
              <ChevronDown
                aria-hidden="true"
                className={`hidden h-4 w-4 text-ink-soft transition-transform sm:block ${profileOpen ? "rotate-180" : ""}`}
              />
            </button>
            {profileOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full z-40 mt-2 w-48 rounded-lg border border-border bg-card p-1.5 shadow-card"
              >
                {[
                  { label: "Edit Profile", Icon: UserRound },
                  { label: "Change Password", Icon: KeyRound },
                  { label: "Logout", Icon: LogOut },
                ].map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setProfileOpen(false);
                      if (label === "Logout") {
                        localStorage.removeItem("token");
                        navigate({ to: "/superadmin/login" });
                      }
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[12px] text-ink hover:bg-brand-soft hover:text-brand"
                  >
                    <Icon aria-hidden="true" className="h-3.5 w-3.5" /> {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
