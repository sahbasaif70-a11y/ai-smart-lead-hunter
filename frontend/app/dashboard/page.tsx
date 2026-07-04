"use client";
import React, { useState } from "react";
import { 
  LayoutDashboard, 
  ScanLine, 
  FileText, 
  Users, 
  PieChart, 
  Settings, 
  LogOut, 
  MoreVertical,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, active: true },
    { name: "Scan", icon: <ScanLine size={18} /> },
    { name: "Records", icon: <FileText size={18} /> },
    { name: "Contacts", icon: <Users size={18} /> },
    { name: "Analytics", icon: <PieChart size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <main className="min-h-screen bg-[#020617] flex font-sans overflow-x-hidden">
      
      {/* --- SIDEBAR Overlay for Mobile --- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- 1. SIDEBAR --- */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#020617] border-r border-white/5 p-6 flex flex-col justify-between
        transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          <div className="flex justify-between items-center mb-10 px-2 lg:block">
            <div className="text-xl font-bold text-white tracking-widest uppercase">SCAN<span className="text-cyan-400">VAULT</span></div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5">
              <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" />
              </div>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold leading-tight">Alex Morgan</h4>
              <p className="text-gray-500 text-[10px]">Sales Manager</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href="#"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  item.active 
                  ? "bg-blue-600/10 text-blue-500 border border-blue-600/20" 
                  : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        <button className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-400 transition-all text-sm font-medium">
          <LogOut size={18} />
          Log out
        </button>
      </aside>

      {/* --- 2. MAIN CONTENT --- */}
      <section className="flex-grow p-4 md:p-8 lg:p-10 w-full overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 md:mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400"
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-2xl md:text-3xl font-bold text-white font-space tracking-tight">Dashboard</h1>
              <p className="text-gray-500 text-xs md:text-sm mt-1">Welcome back, Alex! 👋</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all shadow-lg shadow-blue-600/20">
              <Plus size={18} className="hidden xs:block" /> Quick Scan
            </button>
            <button className="p-2 md:p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* TOP STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          <StatCard title="Total Documents" value="24,892" change="+12.5%" type="up" color="#3b82f6" />
          <StatCard title="OCR Accuracy" value="99.9%" change="+2.1%" type="up" color="#10b981" />
          <StatCard title="Avg. Scan Time" value="0.8s" change="-0.2s" type="down" color="#ef4444" />
          
          <div className="bg-[#0f172a]/40 border border-white/5 rounded-3xl p-5 md:p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-2">Storage Used</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white">68.4 <span className="text-xs text-gray-500">GB</span></h3>
              <p className="text-gray-600 text-[10px] mt-1">of 200 GB</p>
            </div>
            <CircularProgress percentage={34} />
          </div>
        </div>

        {/* BOTTOM SECTION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          <RecentScans />
          <ActivityTimeline />

          {/* STORAGE OVERVIEW */}
          <div className="lg:col-span-1 bg-[#0f172a]/40 border border-white/5 rounded-[32px] p-6 md:p-8 flex flex-col items-center justify-between text-center">
             <h4 className="font-bold text-white text-sm self-start mb-6">Storage Overview</h4>
             
             <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-white/5 stroke-current" strokeWidth="2.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-blue-500 stroke-current" strokeWidth="2.5" strokeDasharray="34, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-white">34%</span>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Used</span>
                </div>
             </div>

             <div className="w-full mt-6">
                <p className="text-gray-400 text-xs font-bold mb-4">68.4 GB <span className="text-gray-600 font-normal">/ 200 GB</span></p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20">
                  Upgrade Plan
                </button>
             </div>
          </div>

        </div>
      </section>
    </main>
  );
}

function StatCard({ title, value, change, type, color }: any) {
  return (
    <div className="bg-[#0f172a]/40 border border-white/5 rounded-3xl p-5 md:p-6 relative overflow-hidden group">
      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-2">{title}</p>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</h3>
      <p className={`${type === 'up' ? 'text-emerald-500' : 'text-red-500'} text-[10px] font-bold flex items-center gap-1`}>
        {type === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {change} <span className="text-gray-600 font-normal ml-1">this month</span>
      </p>
      <div className="absolute bottom-0 left-0 w-full h-10 opacity-20 group-hover:opacity-40 transition-all pointer-events-none">
          <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 20 V10 Q25 5 50 10 T100 10 V20 Z" fill={color} />
          </svg>
      </div>
    </div>
  );
}

function CircularProgress({ percentage }: { percentage: number }) {
  return (
    <div className="relative w-12 h-12 md:w-14 md:h-14">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path className="text-white/5 stroke-current" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path className="text-blue-500 stroke-current" strokeWidth="3.5" strokeDasharray={`${percentage}, 100`} strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">{percentage}%</span>
    </div>
  );
}

function RecentScans() {
  const scans = [
    { name: "John Doe", type: "Business Card", time: "2 min ago" },
    { name: "Acme Corp", type: "Invoice", time: "15 min ago" },
    { name: "Passport", type: "ID Document", time: "1 hr ago" },
    { name: "Project X", type: "Contract", time: "3 hr ago" },
  ];
  return (
    <div className="lg:col-span-1 bg-[#0f172a]/40 border border-white/5 rounded-[32px] p-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-white text-sm">Recent Scans</h4>
        <button className="text-blue-500 text-[10px] font-bold hover:underline">View all</button>
      </div>
      <div className="space-y-5">
        {scans.map((scan, i) => (
          <div key={i} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-11 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-500 group-hover:border-blue-500/50 transition-all">
                <FileText size={16} />
              </div>
              <div>
                <h5 className="text-white text-xs font-bold leading-none mb-1">{scan.name}</h5>
                <p className="text-gray-600 text-[10px]">{scan.type}</p>
              </div>
            </div>
            <span className="text-gray-700 text-[10px]">{scan.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityTimeline() {
  return (
    <div className="lg:col-span-1 bg-[#0f172a]/40 border border-white/5 rounded-[32px] p-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-white text-sm">Activity Timeline</h4>
        <button className="text-blue-500 text-[10px] font-bold hover:underline">View all</button>
      </div>
      <div className="relative space-y-6 pl-6">
        <div className="absolute left-[7px] top-2 w-[1px] h-[80%] bg-white/5"></div>
        <TimelineItem title="Document scanned" desc="Success" time="2m ago" color="emerald" />
        <TimelineItem title="Data extracted" desc="AI processed" time="15m ago" color="blue" />
        <TimelineItem title="Document saved" desc="CRM Sync" time="2h ago" color="yellow" />
      </div>
    </div>
  );
}

function TimelineItem({ title, desc, time, color }: any) {
  const colors: any = { emerald: "border-emerald-500", blue: "border-blue-500", yellow: "border-yellow-500" };
  return (
    <div className="relative">
      <div className={`absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#020617] border-2 ${colors[color]} z-10`}></div>
      <div className="flex justify-between items-start">
        <div>
          <h6 className="text-white text-xs font-bold leading-none mb-1">{title}</h6>
          <p className="text-gray-600 text-[10px]">{desc}</p>
        </div>
        <span className="text-gray-700 text-[10px]">{time}</span>
      </div>
    </div>
  );
}
