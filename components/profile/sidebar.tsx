"use client";

import type React from "react";

import { Home, FileText, Image, Settings, Users, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center mb-8 px-2">
        <div className="w-8 h-8 rounded-full bg-primary mr-2"></div>
        <h1 className="text-xl font-bold">Blog Admin</h1>
      </div>

      <nav className="space-y-1">
        <SidebarItem icon={<Home size={20} />} label="Dashboard" active />
        <SidebarItem icon={<FileText size={20} />} label="Posts" />
        <SidebarItem icon={<Image size={20} />} label="Media" />
        <SidebarItem icon={<Users size={20} />} label="Users" />
        <SidebarItem icon={<BarChart size={20} />} label="Analytics" />
        <SidebarItem icon={<Settings size={20} />} label="Settings" />
      </nav>

      <div className="mt-auto pt-4">
        <Button variant="outline" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Account Settings
        </Button>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start",
        active && "bg-gray-100 dark:bg-gray-700"
      )}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </Button>
  );
}
