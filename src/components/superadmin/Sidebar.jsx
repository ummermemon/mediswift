import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserRound,
  Building2,
  Truck,
  Package,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { Chip } from "@heroui/react";

import logo from "../../assets/images/logo/horizontal/horizontal-erased.png";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/superadmin/dashboard" },
  { title: "Users", icon: Users, path: "/superadmin/users" },
  { title: "Doctors", icon: UserRound, path: "/superadmin/doctors", badge: "12" },
  { title: "Pharmacies", icon: Building2, path: "/superadmin/pharmacies" },
  { title: "Delivery Partners", icon: Truck, path: "/superadmin/delivery-partners" },
  { title: "Orders", icon: Package, path: "/superadmin/orders", badge: "28" },
  { title: "Reports", icon: FileText, path: "/superadmin/reports" },
  { title: "Settings", icon: Settings, path: "/superadmin/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white/90 backdrop-blur-md border-r-2 border-slate-200/80 flex flex-col sticky top-0 z-20 select-none shadow-sm">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100">
        <img
          src={logo}
          alt="MediSwift"
          className="h-8 w-auto object-contain opacity-95"
        />
        <div className="mt-2.5">
          <Chip
            size="sm"
            variant="flat"
            className="bg-[#028090]/10 text-[#028090] border border-[#028090]/30 text-[10px] font-normal tracking-wider uppercase px-2"
          >
            Superadmin Console
          </Chip>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-2">
          Overview
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-[#0B2545] text-white shadow-md font-normal"
                    : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      size={17}
                      className={isActive ? "text-cyan-300" : "text-slate-500"}
                      strokeWidth={1.75}
                    />
                    <span className={`text-xs ${isActive ? "font-normal" : "font-light"}`}>
                      {item.title}
                    </span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white font-normal"
                          : "bg-amber-50 text-amber-700 border border-amber-300/60 font-light"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Profile Mini Summary */}
      <div className="p-3 border-t-2 border-slate-100 bg-slate-50/50">
        <button className="flex w-full items-center gap-3 px-3 py-2 rounded-xl text-xs font-light text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors">
          <LogOut size={16} strokeWidth={1.75} />
          <span className="font-light">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}