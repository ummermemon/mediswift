import React from "react";
import { Bell, Search, ChevronDown, CheckCircle2 } from "lucide-react";
import { Avatar, Input, Chip } from "@heroui/react";

export default function Header() {
  const admin = JSON.parse(localStorage.getItem("superadmin"));

  return (
    <header className="px-8 pt-6 pb-2 space-y-4">
      {/* Top Navbar */}
      <div className="flex items-center justify-between">
        {/* Search Field with slightly firmer border */}
        <div className="w-72">
          <Input
            placeholder="Search platform..."
            size="sm"
            radius="lg"
            startContent={<Search size={16} className="text-slate-500" strokeWidth={1.75} />}
            classNames={{
              input: "text-xs font-light text-slate-600 placeholder:text-slate-400 placeholder:font-light",
              inputWrapper: "bg-white border-2 border-slate-200 shadow-sm hover:border-slate-300 focus-within:!border-[#028090]",
            }}
          />
        </div>

        {/* User Status Section */}
        <div className="flex items-center gap-4">
          <button className="relative p-2.5 rounded-xl bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <Bell size={17} strokeWidth={1.75} />
            <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          <div className="h-6 w-0.5 bg-slate-200" />

          {/* Profile Badge */}
          <div className="flex items-center gap-2.5 bg-white border-2 border-slate-200 p-1.5 pr-3 rounded-xl shadow-sm">
            <Avatar
              name={admin?.first_name?.charAt(0) || "S"}
              size="sm"
              className="bg-[#028090] text-white text-xs font-normal shadow-sm"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-normal text-[#0B2545]">
                {admin?.first_name || "Superadmin"}
              </p>
              <p className="text-[10px] font-light text-slate-400">System Admin</p>
            </div>
            <ChevronDown size={15} className="text-slate-500" strokeWidth={1.75} />
          </div>
        </div>
      </div>

      {/* Greeting Banner */}
      <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-light text-slate-400">Friday, July 31</p>
            <Chip
              size="sm"
              variant="flat"
              startContent={<CheckCircle2 size={13} className="text-emerald-600" strokeWidth={2} />}
              className="bg-emerald-50 text-emerald-700 text-[10px] font-light px-2 h-5 border border-emerald-200"
            >
              All nodes online
            </Chip>
          </div>
          <h1 className="text-xl font-normal text-[#0B2545] mt-1">
            Welcome back, {admin?.first_name || "Superadmin"}
          </h1>
          <p className="text-xs font-light text-slate-500 mt-0.5">
            Overview of doctor reviews, pharmacy fulfillments, and delivery dispatches today.
          </p>
        </div>
      </div>
    </header>
  );
}