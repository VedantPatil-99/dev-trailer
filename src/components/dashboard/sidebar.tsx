"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Film, LayoutDashboard, LogOut, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "My Videos", icon: Film },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-card border-border flex min-h-screen w-64 flex-col border-r p-6">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <div className="bg-accent text-accent-foreground flex h-8 w-8 items-center justify-center rounded-lg font-bold">
          D
        </div>
        <span className="text-lg font-bold">DevTrailer</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-2 transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <button className="text-muted-foreground hover:text-foreground hover:bg-secondary flex w-full items-center gap-3 rounded-lg px-4 py-2 transition-colors">
        <LogOut className="h-5 w-5" />
        <span className="text-sm font-medium">Log out</span>
      </button>
    </div>
  );
}
