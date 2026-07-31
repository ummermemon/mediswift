import React from "react";
import Layout from "../../components/superadmin/Layout";
import {
  Users,
  UserCheck,
  Building2,
  PackageCheck,
  ArrowUpRight,
} from "lucide-react";
import { Card, Chip, Progress, Button } from "@heroui/react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Active Users",
      value: "24,892",
      change: "+12.5%",
      icon: Users,
      subtitle: "Patients & platform accounts",
    },
    {
      title: "Verified Doctors",
      value: "1,420",
      change: "+4.2%",
      icon: UserCheck,
      subtitle: "12 pending reviews",
    },
    {
      title: "Partner Pharmacies",
      value: "385",
      change: "+2.1%",
      icon: Building2,
      subtitle: "Across 18 regions",
    },
    {
      title: "Fulfilled Orders",
      value: "8,941",
      change: "+18.4%",
      icon: PackageCheck,
      subtitle: "99.2% success rate",
    },
  ];

  const pendingApprovals = [
    { id: "DOC-8821", name: "Dr. Sarah Jenkins", category: "Cardiology", time: "10m ago" },
    { id: "DOC-8822", name: "Dr. Rajesh Kumar", category: "General Physician", time: "25m ago" },
    { id: "PHARM-104", name: "Apollo Care Chemist", category: "Pharmacy Partner", time: "1h ago" },
  ];

  const recentPrescriptions = [
    { id: "RX-9012", patient: "Michael Scott", doctor: "Dr. A. Sharma", status: "Verified & Paid", amount: "$45.00" },
    { id: "RX-9011", patient: "Elena Rostova", doctor: "Pending Review", status: "In Verification", amount: "--" },
    { id: "RX-9010", patient: "David Miller", doctor: "Dr. S. Jenkins", status: "Processing Order", amount: "$120.50" },
  ];

  const platformGoals = [
    { label: "Doctor License Verifications", progress: 73, color: "primary" },
    { label: "Pharmacy Dispatch Speed", progress: 88, color: "success" },
    { label: "Monthly Platform Audits", progress: 42, color: "warning" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card
                key={idx}
                shadow="none"
                className="bg-white border-2 border-slate-200 p-4 rounded-2xl hover:border-slate-300 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-normal text-slate-400 uppercase tracking-wider">
                    {stat.title}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-100/80 text-[#028090]">
                    <Icon size={17} strokeWidth={1.75} />
                  </div>
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-xl font-normal text-[#0B2545]">{stat.value}</span>
                  <span className="inline-flex items-center text-xs font-light text-emerald-600">
                    {stat.change}
                    <ArrowUpRight size={13} strokeWidth={1.75} />
                  </span>
                </div>
                <p className="text-[11px] font-light text-slate-400 mt-1">{stat.subtitle}</p>
              </Card>
            );
          })}
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Table Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-slate-200 p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-normal text-[#0B2545]">
                  Recent Prescription Flow
                </h3>
                <p className="text-xs font-light text-slate-400 mt-0.5">
                  Live verification stream between doctors and pharmacy nodes.
                </p>
              </div>
              <Button
                size="sm"
                variant="light"
                className="text-xs font-light text-[#028090] h-8 px-2"
              >
                View all
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-slate-100 text-[11px] font-normal text-slate-400 uppercase tracking-wider">
                    <th className="pb-2.5">Rx ID</th>
                    <th className="pb-2.5">Patient</th>
                    <th className="pb-2.5">Doctor</th>
                    <th className="pb-2.5">Status</th>
                    <th className="pb-2.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-light">
                  {recentPrescriptions.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 font-normal text-[#0B2545]">{row.id}</td>
                      <td className="py-3 text-slate-500 font-light">{row.patient}</td>
                      <td className="py-3 text-slate-500 font-light">{row.doctor}</td>
                      <td className="py-3">
                        <Chip
                          size="sm"
                          variant="flat"
                          className={`text-[10px] font-light border h-5 px-2 ${
                            row.status === "Verified & Paid"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : row.status === "In Verification"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {row.status}
                        </Chip>
                      </td>
                      <td className="py-3 text-right font-normal text-slate-700">
                        {row.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Approvals & Goals */}
          <div className="space-y-6">
            {/* Approvals Box */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-normal text-[#0B2545]">
                  Pending Approvals
                </h3>
                <Chip size="sm" variant="flat" className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-light px-2 h-5">
                  3 pending
                </Chip>
              </div>

              <div className="space-y-2.5">
                {pendingApprovals.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50/80 border-2 border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-normal text-[#0B2545]">{item.name}</p>
                      <p className="text-[10px] font-light text-slate-400">
                        {item.category} • {item.time}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      radius="lg"
                      className="bg-[#0B2545] text-white text-[11px] font-light h-7 min-w-16"
                    >
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Operational Metrics */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 space-y-3.5 shadow-sm">
              <h3 className="text-sm font-normal text-[#0B2545] border-b border-slate-100 pb-2">
                Monthly Targets
              </h3>

              <div className="space-y-3">
                {platformGoals.map((goal, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-light">
                      <span className="text-slate-500">{goal.label}</span>
                      <span className="text-slate-400">{goal.progress}%</span>
                    </div>
                    <Progress
                      size="sm"
                      value={goal.progress}
                      color={goal.color}
                      aria-label={goal.label}
                      classNames={{
                        track: "bg-slate-100 h-1.5 border border-slate-200/50",
                        indicator: "h-1.5",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}