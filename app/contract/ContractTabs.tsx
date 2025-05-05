// File: components/ContractTabs.tsx
"use client";

import { Building2, User2 } from "lucide-react";

export default function ContractTabs({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: "company" | "personal";
  setSelectedTab: (value: "company" | "personal") => void;
}) {
  return (
    <div className="flex justify-center gap-6 text-white text-xl font-semibold border-b border-gray-700 pb-4">
      <button
        className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 hover:bg-amber-500/10 ${
          selectedTab === "company"
            ? "text-amber-500 bg-amber-500/10"
            : "text-white"
        }`}
        onClick={() => setSelectedTab("company")}
      >
        <Building2 className="w-5 h-5" /> Байгууллага
      </button>
      <button
        className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 hover:bg-amber-500/10 ${
          selectedTab === "personal"
            ? "text-amber-500 bg-amber-500/10"
            : "text-white"
        }`}
        onClick={() => setSelectedTab("personal")}
      >
        <User2 className="w-5 h-5" /> Хувь хүн
      </button>
    </div>
  );
}
