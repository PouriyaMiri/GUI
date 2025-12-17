import React from "react";
import { Home, LayoutDashboard, Award, Bell, HelpCircle, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ active = "Dashboard" }) {
  return (
    <aside className="w-[280px] bg-indigo-800 text-white flex flex-col">
      <div className="h-16 flex items-center gap-3 px-5 border-b border-white/10">
        <Menu className="h-5 w-5 opacity-90" />
        <div className="text-2xl tracking-wide font-semibold">BUILDCHAIN</div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <SideItem to="/home" icon={<Home />} label="Home" active={active === "Home"} />
        <SideItem to="/dashboard" icon={<LayoutDashboard />} label="Dashboard" active={active === "Dashboard"} />
        <SideItem to="/certificates" icon={<Award />} label="Certificates" active={active === "Certificates"} />
        <SideItem to="/notifications" icon={<Bell />} label="Notifications" active={active === "Notifications"} />
        <SideItem to="/help" icon={<HelpCircle />} label="Help" active={active === "Help"} />

      </nav>

      <div className="p-5 border-t border-white/10">
        <div className="grid grid-cols-2 gap-3 items-center">
          <div className="h-20 rounded-xl bg-white/10 flex items-center justify-center text-xs">
            BUILDCHAIN LOGO
          </div>
          <div className="h-20 rounded-xl bg-white/10 flex items-center justify-center text-xs">
            Funded by EU
          </div>
        </div>
      </div>
    </aside>
  );
}

function SideItem({ icon, label, active, to }) {
  return (
    <Link
      to={to}
      className={[
        "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition",
        active ? "bg-white/10" : "hover:bg-white/10",
      ].join(" ")}
    >
      <span className="opacity-95">{icon}</span>
      <span className="text-xl font-medium">{label}</span>
    </Link>
  );
}
