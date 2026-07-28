import React, { useState } from "react";
import { Card, Button, Chip, Separator, Link, Table } from "@heroui/react";
import {
  LayoutGrid,
  Package,
  Stethoscope,
  Building2,
  Truck,
  Users,
  ScrollText,
  Settings,
  Search,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardCheck,
  AlertTriangle,
  Menu as MenuIcon,
  X,
  Check,
  Ban,
} from "lucide-react";

/*
  HeroUI v3.2.2 API used here (verified against heroui.com/en/docs/react):
  - Card is compound: Card / Card.Header / Card.Title / Card.Description / Card.Content / Card.Footer
  - Button: variant is 'primary'|'secondary'|'tertiary'|'outline'|'ghost'|'danger', onPress (not onClick),
    isPending (not isLoading), isIconOnly for icon-only buttons.
  - Table is compound: Table > Table.ScrollContainer > Table.Content > Table.Header/Table.Body > Table.Column/Table.Row/Table.Cell
  - Separator replaces the old Divider.

  Navy is the admin accent (vs. green on the customer-facing app):
  navy #35507A · navy dark #22344C · navy pale #E4E9F0
  paper #F2F4EF · ink #1B1F1D · ink soft #56605A · stamp red #C24E30
*/

const NAV_ITEMS = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: Package, label: "Orders" },
  { icon: Stethoscope, label: "Doctors" },
  { icon: Building2, label: "Pharmacies" },
  { icon: Truck, label: "Delivery partners" },
  { icon: Users, label: "Customers" },
  { icon: ScrollText, label: "Audit log" },
  { icon: Settings, label: "Settings" },
];

const KPIS = [
  { label: "Orders today", value: "1,284", delta: "+8.2%", up: true, icon: Package },
  { label: "Pending doctor review", value: "37", delta: "+12", up: true, icon: ClipboardCheck, warn: true },
  { label: "Active pharmacies", value: "212", delta: "+3", up: true, icon: Building2 },
  { label: "Flagged orders", value: "5", delta: "-2", up: false, icon: AlertTriangle, warn: true },
];

const STATUS_STYLES = {
  "Doctor review": "bg-[#F5E3DC] text-[#C24E30]",
  "Pharmacy prep": "bg-[#E1EBE3] text-[#1F4A36]",
  "Out for delivery": "bg-[#E4E9F0] text-[#22344C]",
  Delivered: "bg-[#DDE3D8] text-[#56605A]",
  Flagged: "bg-[#C24E30] text-white",
};

const ORDERS = [
  { id: "4471", customer: "R. Sharma", status: "Doctor review", pharmacy: "Sunrise Pharmacy", placed: "2 min ago" },
  { id: "4470", customer: "A. Iyer", status: "Pharmacy prep", pharmacy: "Wellness Corner", placed: "9 min ago" },
  { id: "4469", customer: "P. Nair", status: "Out for delivery", pharmacy: "CityCare Pharmacy", placed: "24 min ago" },
  { id: "4468", customer: "S. Verma", status: "Flagged", pharmacy: "Sunrise Pharmacy", placed: "41 min ago" },
  { id: "4467", customer: "K. Rao", status: "Delivered", pharmacy: "Wellness Corner", placed: "1 hr ago" },
];

const APPROVALS = [
  { name: "Dr. Meera Joshi", role: "Doctor", detail: "MBBS · Reg. No. MH-88213" },
  { name: "GreenLeaf Pharmacy", role: "Pharmacy", detail: "License No. PH-4471-KA" },
  { name: "Arjun Patel", role: "Delivery partner", detail: "Bengaluru zone · Vehicle verified" },
];

const AUDIT_LOG = [
  { actor: "you", action: "approved pharmacy \u201cWellness Corner\u201d", time: "6 min ago" },
  { actor: "S. Kapoor (admin)", action: "flagged order #4468 for review", time: "38 min ago" },
  { actor: "you", action: "suspended doctor account D-1042", time: "1 hr ago" },
  { actor: "R. Bhatt (admin)", action: "updated delivery zone for Pune", time: "3 hr ago" },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#22344C] text-white flex flex-col p-5 transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center font-mono text-sm">
              Rx
            </div>
            <p className="font-serif italic text-xl">MediSwift</p>
          </div>
          <button className="lg:hidden text-white/70" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                  item.active
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/60 hover:bg-white/5 hover:text-white/85"
                }`}
              >
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <Separator className="bg-white/10 my-4" />

        <div className="flex items-center gap-3 px-1">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-mono text-xs flex-shrink-0">
            SA
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">Superadmin</p>
            <p className="text-xs text-white/50 truncate">admin@mediswift.com</p>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}

function KpiCard({ kpi }) {
  const Icon = kpi.icon;
  const DeltaIcon = kpi.up ? ArrowUpRight : ArrowDownRight;
  return (
    <Card className="border border-[#DDE3D8] bg-white shadow-none">
      <Card.Content className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              kpi.warn ? "bg-[#F5E3DC] text-[#C24E30]" : "bg-[#E4E9F0] text-[#22344C]"
            }`}
          >
            <Icon size={17} />
          </div>
          <span
            className={`flex items-center gap-0.5 text-xs font-medium ${
              kpi.up ? "text-[#2F6B4F]" : "text-[#C24E30]"
            }`}
          >
            <DeltaIcon size={13} />
            {kpi.delta}
          </span>
        </div>
        <p className="text-2xl font-serif mb-1">{kpi.value}</p>
        <p className="text-sm text-[#56605A]">{kpi.label}</p>
      </Card.Content>
    </Card>
  );
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F2F4EF] text-[#1B1F1D] flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#F2F4EF]/90 backdrop-blur-md border-b border-[#DDE3D8]">
          <div className="flex items-center justify-between gap-4 px-5 sm:px-8 h-16">
            <div className="flex items-center gap-3 min-w-0">
              <button
                className="lg:hidden text-[#56605A]"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon size={22} />
              </button>
              <div>
                <h1 className="font-serif text-xl leading-none">Overview</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-white border border-[#DDE3D8] rounded-lg px-3 py-2 w-64">
                <Search size={15} className="text-[#8B9289] flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search orders, doctors, pharmacies…"
                  className="bg-transparent text-sm outline-none w-full placeholder:text-[#8B9289]"
                />
              </div>
              <button
                className="relative w-9 h-9 rounded-lg border border-[#DDE3D8] bg-white flex items-center justify-center text-[#56605A]"
                aria-label="Notifications"
              >
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#C24E30]" />
              </button>
              <div className="w-9 h-9 rounded-full bg-[#22344C] text-white flex items-center justify-center font-mono text-xs flex-shrink-0">
                SA
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 sm:px-8 py-8 max-w-[1400px] w-full mx-auto">
          {/* KPIs */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {KPIS.map((kpi) => (
              <KpiCard key={kpi.label} kpi={kpi} />
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Orders table */}
            <div className="lg:col-span-2">
              <Card className="border border-[#DDE3D8] bg-white shadow-none h-full">
                <Card.Header className="flex flex-row items-center justify-between px-5 pt-5 pb-0">
                  <div>
                    <Card.Title className="font-serif text-lg font-normal">
                      Orders needing attention
                    </Card.Title>
                    <Card.Description className="text-[#56605A] text-sm">
                      Newest first, across every pharmacy
                    </Card.Description>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#DDE3D8] text-[#1B1F1D]">
                    View all
                  </Button>
                </Card.Header>
                <Card.Content className="p-5">
                  <Table>
                    <Table.ScrollContainer>
                      <Table.Content aria-label="Orders needing attention">
                        <Table.Header>
                          <Table.Column>Order</Table.Column>
                          <Table.Column>Customer</Table.Column>
                          <Table.Column>Status</Table.Column>
                          <Table.Column>Pharmacy</Table.Column>
                          <Table.Column>Placed</Table.Column>
                        </Table.Header>
                        <Table.Body>
                          {ORDERS.map((order) => (
                            <Table.Row key={order.id} id={order.id}>
                              <Table.Cell className="font-mono text-xs text-[#8B9289]">
                                #{order.id}
                              </Table.Cell>
                              <Table.Cell className="text-sm">{order.customer}</Table.Cell>
                              <Table.Cell>
                                <span
                                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[order.status]}`}
                                >
                                  {order.status}
                                </span>
                              </Table.Cell>
                              <Table.Cell className="text-sm text-[#56605A]">
                                {order.pharmacy}
                              </Table.Cell>
                              <Table.Cell className="text-sm text-[#8B9289]">
                                {order.placed}
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table.Content>
                    </Table.ScrollContainer>
                  </Table>
                </Card.Content>
              </Card>
            </div>

            {/* Pending approvals */}
            <div>
              <Card className="border border-[#DDE3D8] bg-white shadow-none h-full">
                <Card.Header className="px-5 pt-5 pb-0">
                  <Card.Title className="font-serif text-lg font-normal">
                    Pending approvals
                  </Card.Title>
                  <Card.Description className="text-[#56605A] text-sm">
                    New sign-ups waiting on verification
                  </Card.Description>
                </Card.Header>
                <Card.Content className="p-5 flex flex-col gap-4">
                  {APPROVALS.map((item) => (
                    <div key={item.name} className="pb-4 border-b border-[#DDE3D8] last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <Chip className="bg-[#E4E9F0] text-[#22344C] text-[11px] flex-shrink-0">
                          {item.role}
                        </Chip>
                      </div>
                      <p className="text-xs text-[#8B9289] mb-3">{item.detail}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          className="bg-[#2F6B4F] flex-1"
                        >
                          <Check size={14} /> Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#DDE3D8] text-[#56605A] flex-1"
                        >
                          <Ban size={14} /> Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </Card.Content>
              </Card>
            </div>
          </div>

          {/* Audit log */}
          <Card className="border border-[#DDE3D8] bg-white shadow-none mt-6">
            <Card.Header className="px-5 pt-5 pb-0">
              <Card.Title className="font-serif text-lg font-normal">Recent activity</Card.Title>
              <Card.Description className="text-[#56605A] text-sm">
                A live feed of every administrator action
              </Card.Description>
            </Card.Header>
            <Card.Content className="p-5">
              <ul className="flex flex-col gap-3">
                {AUDIT_LOG.map((entry, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22344C] flex-shrink-0" />
                    <span className="text-[#56605A]">
                      <span className="text-[#1B1F1D] font-medium">{entry.actor}</span>{" "}
                      {entry.action}
                    </span>
                    <span className="ml-auto text-xs text-[#8B9289] flex-shrink-0">
                      {entry.time}
                    </span>
                  </li>
                ))}
              </ul>
            </Card.Content>
            <Card.Footer className="px-5 pb-5 pt-0">
              <Link href="#audit-log" className="text-sm text-[#22344C]">
                View full audit log
              </Link>
            </Card.Footer>
          </Card>
        </main>
      </div>
    </div>
  );
}