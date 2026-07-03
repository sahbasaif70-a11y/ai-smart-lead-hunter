"use client";
 import React from "react"; 
 import { Search, Download, Plus, Filter, ChevronDown, MoreVertical, FileText, ChevronLeft, ChevronRight } from "lucide-react";
export default function RecordsPage() { const records = [ { id: 1, name: "Alex Morgan", type: "Business Card", contact: "Alex Morgan", date: "May 9, 2025", status: "Completed" }, { id: 2, name: "Acme Corporation", type: "Invoice", contact: "Acme Corp", date: "May 8, 2025", status: "Completed" }, { id: 3, name: "John Doe", type: "Business Card", contact: "John Doe", date: "May 8, 2025", status: "Completed" }, { id: 4, name: "Passport — A. Morgan", type: "ID Document", contact: "Alex Morgan", date: "May 7, 2025", status: "Completed" }, { id: 5, name: "Project X Contract", type: "Contract", contact: "Project X", date: "May 7, 2025", status: "Pending" }, { id: 6, name: "Driving License", type: "ID Document", contact: "New York, USA", date: "May 6, 2025", status: "Completed" }, ];
return ( <main className="min-h-screen bg-[#020617] p-4 md:p-8 lg:p-12 pt-24"> <div className="max-w-7xl mx-auto">
    {/* --- HEADER --- */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white font-space">All Records</h1>
        <p className="text-gray-500 text-sm">Manage your all scanned documents</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">
          Export <ChevronDown size={16} />
        </button>
        <button className="flex items-center gap-2 bg-gradient-to-r  from-cyan-400 to-blue-700 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 transition-all">
          <Plus size={18} /> New Scan
        </button>
      </div>
    </div>

    {/* --- FILTERS & SEARCH --- */}
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* Search Bar */}
      <div className="relative flex-grow max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="Search records..." 
          className="w-full bg-[#0f172a]/50 border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
        />
      </div>
      
      {/* Select Dropdowns */}
      <div className="flex items-center gap-3">
         <button className="bg-[#0f172a]/50 border border-white/5 text-gray-400 px-4 py-2.5 rounded-xl text-sm flex items-center gap-4">
            All Types <ChevronDown size={14} />
         </button>
         <button className="bg-[#0f172a]/50 border border-white/5 text-gray-400 px-4 py-2.5 rounded-xl text-sm flex items-center gap-4">
            All Status <ChevronDown size={14} />
         </button>
         <button className="bg-[#0f172a]/50 border border-white/5 text-white px-4 py-2.5 rounded-xl text-sm flex items-center gap-4 font-medium">
            Date <ChevronDown size={14} />
         </button>
         <button className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-gray-400 hover:text-white">
            <Filter size={18} />
         </button>
      </div>
    </div>

    {/* --- TABLE SECTION --- */}
    <div className="bg-[#0f172a]/30 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-xl">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/5 text-[10px] text-gray-500 uppercase font-bold tracking-widest">
            <th className="px-8 py-5">Document <ChevronDown size={12} className="inline ml-1" /></th>
            <th className="px-6 py-5">Type</th>
            <th className="px-6 py-5">Contact</th>
            <th className="px-6 py-5">Date</th>
            <th className="px-6 py-5">Status</th>
            <th className="px-8 py-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.02]">
          {records.map((rec) => (
            <tr key={rec.id} className="hover:bg-white/[0.02] transition-colors group">
              <td className="px-8 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-500">
                    <FileText size={18} />
                  </div>
                  <span className="text-white text-sm font-medium">{rec.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-400 text-sm">{rec.type}</td>
              <td className="px-6 py-4 text-gray-400 text-sm">{rec.contact}</td>
              <td className="px-6 py-4 text-gray-400 text-sm">{rec.date}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  rec.status === 'Completed' 
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                  : "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                }`}>
                  {rec.status}
                </span>
              </td>
              <td className="px-8 py-4 text-right">
                <button className="text-gray-600 hover:text-white transition-colors">
                  <MoreVertical size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* --- PAGINATION --- */}
    <div className="flex justify-between items-center mt-8 px-4">
      <p className="text-gray-600 text-xs font-medium">Showing 1 to 6 of 24,892 results</p>
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-600 hover:text-white"><ChevronLeft size={18} /></button>
        <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold">1</button>
        <button className="w-8 h-8 rounded-lg bg-white/5 text-gray-500 text-xs font-bold hover:bg-white/10">2</button>
        <button className="w-8 h-8 rounded-lg bg-white/5 text-gray-500 text-xs font-bold hover:bg-white/10">3</button>
        <span className="text-gray-700 px-1">...</span>
        <button className="w-8 h-8 rounded-lg bg-white/5 text-gray-500 text-xs font-bold hover:bg-white/10">4150</button>
        <button className="p-2 text-gray-600 hover:text-white"><ChevronRight size={18} /></button>
      </div>
    </div>

  </div>
</main>
); }