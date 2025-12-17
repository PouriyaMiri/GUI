import React from "react";

export default function Header({ userName = "JOHN SMITH", initials = "JS" }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-6">
      <div className="flex items-center gap-3">
        <div className="text-sm text-slate-500 font-medium">{userName}</div>
        <div className="h-10 w-10 rounded-full bg-indigo-600 text-white grid place-items-center font-semibold">
          {initials}
        </div>
      </div>
    </header>
  );
}
