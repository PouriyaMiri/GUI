import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Notifications() {
  return (
    <div className="h-screen w-screen bg-slate-100 overflow-hidden">
      <div className="flex h-full">
        <Sidebar active="Notifications" />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-6">
            <div className="max-w-[1400px] mx-auto bg-white border border-slate-200 rounded-2xl p-6">
              Notifications
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
