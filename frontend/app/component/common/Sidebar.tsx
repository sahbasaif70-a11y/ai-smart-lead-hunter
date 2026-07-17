"use client";
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ScanLine,
  FileText,
  Users,
  PieChart,
  Settings,
  LogOut,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error("Error parsing user data");
      }
    }
  }, []);

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/dashboard" },
    { name: "Scan", icon: <ScanLine size={18} />, href: "/scan" },
    { name: "Records", icon: <FileText size={18} />, href: "/records" },
    { name: "Contacts", icon: <Users size={18} />, href: "/contacts" },
    { name: "Analytics", icon: <PieChart size={18} />, href: "/analytics" },
    { name: "Settings", icon: <Settings size={18} />, href: "/settings" },
  ];

  const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/");
  };

  return (
    <>
      {/* --- SIDEBAR Overlay for Mobile --- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#020617] border-r border-white/5 p-6 flex flex-col justify-between
        transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          <div className="flex justify-between items-center mb-10 px-2 lg:block">
            <Link href="/" className="text-xl font-bold text-white tracking-widest uppercase">SCAN<span className="text-cyan-400">VAULT</span></Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-600/20">
              <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Alex'}`} alt="Avatar" />
              </div>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold leading-tight truncate max-w-[140px]">{user?.name || "User"}</h4>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Active Member</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  pathname === item.href
                  ? "bg-blue-600/10 text-blue-500 border border-blue-600/20"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500 transition-all text-sm font-medium uppercase tracking-widest">
          <LogOut size={18} />
          Log out
        </button>
      </aside>
    </>
  );
}
