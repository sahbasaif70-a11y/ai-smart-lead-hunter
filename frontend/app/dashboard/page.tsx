"use client";
import React from "react";
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
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#020617] flex font-sans">
      
      {/* --- 1. SIDEBAR (Left) --- */}
      <aside className="w-64 bg-[#020617] border-r border-white/5 p-6 flex flex-col justify-between hidden lg:flex sticky top-0 h-screen">
        <div>
          {/* User Profile */}
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
            <button className="ml-auto text-gray-500"><ArrowDownRight size={12} /></button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { name: "Dashboard", icon: <LayoutDashboard size={18} />, active: true },
              { name: "Scan", icon: <ScanLine size={18} /> },
              { name: "Records", icon: <FileText size={18} /> },
              { name: "Contacts", icon: <Users size={18} /> },
              { name: "Analytics", icon: <PieChart size={18} /> },
              { name: "Settings", icon: <Settings size={18} /> },
            ].map((item) => (
              <a
                key={item.name}
                href="#"
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

        {/* Logout */}
        <button className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-400 transition-all text-sm font-medium">
          <LogOut size={18} />
          Log out
        </button>
      </aside>

      {/* --- 2. MAIN CONTENT (Right) --- */}
      <section className="flex-grow p-4 md:p-8 lg:p-10 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white font-space tracking-tight">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, Alex! 👋</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-700 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20">
              <Plus size={18} /> Quick Scan
            </button>
            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* TOP STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Card 1: Total Documents */}
          <div className="bg-[#0f172a]/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-3">Total Documents</p>
            <h3 className="text-3xl font-bold text-white mb-2">24,892</h3>
            <p className="text-emerald-500 text-[10px] font-bold flex items-center gap-1">
              <ArrowUpRight size={12} /> +12.5% <span className="text-gray-600 font-normal ml-1">this month</span>
            </p>
            <div className="absolute bottom-0 left-0 w-full h-12 opacity-20 group-hover:opacity-40 transition-all pointer-events-none">
                <svg viewBox="0 0 100 20" className="w-full h-full"><path d="M0 20 V10 Q25 5 50 10 T100 10 V20 Z" fill="#3b82f6" /></svg>
            </div>
          </div>

          {/* Card 2: OCR Accuracy */}
          <div className="bg-[#0f172a]/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-3">OCR Accuracy</p>
            <h3 className="text-3xl font-bold text-white mb-2">99.9%</h3>
            <p className="text-emerald-500 text-[10px] font-bold flex items-center gap-1">
              <ArrowUpRight size={12} /> +2.1% <span className="text-gray-600 font-normal ml-1">this month</span>
            </p>
            <div className="absolute bottom-0 left-0 w-full h-12 opacity-20 group-hover:opacity-40 transition-all pointer-events-none">
                <svg viewBox="0 0 100 20" className="w-full h-full"><path d="M0 20 V15 Q25 5 50 12 T100 8 V20 Z" fill="#10b981" /></svg>
            </div>
          </div>

          {/* Card 3: Avg Scan Time */}
          <div className="bg-[#0f172a]/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-3">Avg. Scan Time</p>
            <h3 className="text-3xl font-bold text-white mb-2">0.8<span className="text-sm ml-1 text-gray-500">s</span></h3>
            <p className="text-red-500 text-[10px] font-bold flex items-center gap-1">
              <ArrowDownRight size={12} /> -0.2s <span className="text-gray-600 font-normal ml-1">this month</span>
            </p>
            <div className="absolute bottom-0 left-0 w-full h-12 opacity-20 group-hover:opacity-40 transition-all pointer-events-none">
                <svg viewBox="0 0 100 20" className="w-full h-full"><path d="M0 20 V12 Q25 18 50 10 T100 15 V20 Z" fill="#ef4444" /></svg>
            </div>
          </div>

          {/* Card 4: Storage Used (With Progress) */}
          <div className="bg-[#0f172a]/40 border border-white/5 rounded-3xl p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-3">Storage Used</p>
              <h3 className="text-3xl font-bold text-white">68.4 <span className="text-xs text-gray-500">GB</span></h3>
              <p className="text-gray-600 text-[10px] mt-2 italic">of 200 GB</p>
            </div>
            <div className="relative w-14 h-14">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-white/5 stroke-current" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-blue-500 stroke-current" strokeWidth="3.5" strokeDasharray="34, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">34%</span>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* RECENT SCANS (Left) */}
          <div className="lg:col-span-1 bg-[#0f172a]/40 border border-white/5 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-8">
              <h4 className="font-bold text-white text-sm">Recent Scans</h4>
              <button className="text-blue-500 text-[10px] font-bold hover:underline">View all</button>
            </div>
            <div className="space-y-6">
              {[
                { name: "John Doe", type: "Business Card", time: "2 min ago" },
                { name: "Invoice — Acme Corp", type: "Invoice", time: "15 min ago" },
                { name: "Passport — A. Morgan", type: "ID Document", time: "1 hr ago" },
                { name: "Contract — Project X", type: "Contract", time: "3 hr ago" },
              ].map((scan, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:border-blue-500/50 transition-all">
                      <div className="w-6 h-8 border border-gray-700 rounded-sm relative overflow-hidden bg-[#020617]/50">
                         <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-500/50 animate-pulse"></div>
                      </div>
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

          {/* ACTIVITY TIMELINE (Center) */}
          <div className="lg:col-span-1 bg-[#0f172a]/40 border border-white/5 rounded-[32px] p-6">
            <div className="flex justify-between items-center mb-8">
              <h4 className="font-bold text-white text-sm">Activity Timeline</h4>
              <button className="text-blue-500 text-[10px] font-bold hover:underline">View all</button>
            </div>
            <div className="relative space-y-8 pl-6">
              <div className="absolute left-[7px] top-2 w-[1px] h-[85%] bg-white/5"></div>
              
              <div className="relative">
                <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#020617] border-2 border-emerald-500 z-10"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h6 className="text-white text-xs font-bold leading-none mb-1">Document scanned</h6>
                    <p className="text-gray-600 text-[10px]">Business card scanned successfully</p>
                  </div>
                  <span className="text-gray-700 text-[10px]">2 min ago</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#020617] border-2 border-blue-500 z-10"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h6 className="text-white text-xs font-bold leading-none mb-1">Data extracted</h6>
                    <p className="text-gray-600 text-[10px]">AI extracted 8 fields from image</p>
                  </div>
                  <span className="text-gray-700 text-[10px]">15 min ago</span>
                </div>
              </div>

              <div className="relative opacity-50">
                <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#020617] border-2 border-yellow-500 z-10"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h6 className="text-white text-xs font-bold leading-none mb-1">Document saved</h6>
                    <p className="text-gray-600 text-[10px]">Record added to CRM database</p>
                  </div>
                  <span className="text-gray-700 text-[10px]">2 hr ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* STORAGE OVERVIEW (Right) */}
          <div className="lg:col-span-1 bg-[#0f172a]/40 border border-white/5 rounded-[32px] p-8 flex flex-col items-center justify-between text-center">
             <h4 className="font-bold text-white text-sm self-start mb-6">Storage Overview</h4>
             
             <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-white/5 stroke-current" strokeWidth="2.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-blue-500 stroke-current" strokeWidth="2.5" strokeDasharray="34, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-bold text-white">34%</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Used</span>
                </div>
             </div>

             <div className="w-full mt-6">
                <p className="text-gray-400 text-xs font-bold mb-6">68.4 GB <span className="text-gray-600 font-normal">/ 200 GB</span></p>
                <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-700 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20">
                  Upgrade Plan
                </button>
             </div>
          </div>

        </div>

      </section>
    </main>
  );
}