"use client";
import React from "react";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  MoreVertical,
  FileText,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function RecordsPage() {
  const records = [
    { id: 1, name: "Alex Morgan", type: "Business Card", contact: "Alex Morgan", date: "May 9, 2025", status: "Completed" },
    { id: 2, name: "Acme Corporation", type: "Invoice", contact: "Acme Corp", date: "May 8, 2025", status: "Completed" },
    { id: 3, name: "John Doe", type: "Business Card", contact: "John Doe", date: "May 8, 2025", status: "Completed" },
    { id: 4, name: "Passport", type: "ID Document", contact: "Alex Morgan", date: "May 7, 2025", status: "Completed" },
    { id: 5, name: "Project X", type: "Contract", contact: "Project X", date: "May 7, 2025", status: "Pending" },
    { id: 6, name: "Driving License", type: "ID Document", contact: "New York", date: "May 6, 2025", status: "Completed" },
  ];

  return (
    <main className="min-h-screen bg-[#020617] p-4 md:p-8 pt-20">
      <div className="max-w-7xl mx-auto">

        {/* --- HEADER --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white font-space">All Records</h1>
            <p className="text-gray-500 text-xs md:text-sm">Manage your all scanned documents</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl text-xs md:text-sm hover:bg-white/10 transition-all">
              Export <ChevronDown size={14} />
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-lg shadow-blue-600/20">
              <Plus size={18} /> New Scan
            </button>
          </div>
        </div>

        {/* --- FILTERS & SEARCH --- */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search records..."
              className="w-full bg-[#0f172a]/50 border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none"
            />
          </div>

          {/* Dropdowns - Scrollable on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar whitespace-nowrap">
             <FilterBtn text="All Types" />
             <FilterBtn text="All Status" />
             <FilterBtn text="Date" active />
             <button className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-gray-400 shrink-0"><Filter size={18} /></button>
          </div>
        </div>

        {/* --- TABLE SECTION --- */}
        <div className="bg-[#0f172a]/30 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                  <th className="px-6 py-5">Document</th>
                  <th className="px-6 py-5">Type</th>
                  <th className="px-6 py-5">Contact</th>
                  <th className="px-6 py-5">Date</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-11 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-500">
                          <FileText size={16} />
                        </div>
                        <span className="text-white text-sm font-medium">{rec.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{rec.type}</td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{rec.contact}</td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{rec.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase border ${
                        rec.status === 'Completed'
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                      }`}>
                        {rec.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-600 hover:text-white"><MoreVertical size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- PAGINATION --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4 px-4">
          <p className="text-gray-600 text-xs">Showing 1 to 6 of 24,892 results</p>
          <div className="flex items-center gap-1.5">
            <PaginationBtn icon={<ChevronLeft size={16} />} />
            <PaginationBtn text="1" active />
            <PaginationBtn text="2" />
            <PaginationBtn text="3" />
            <span className="text-gray-700 px-1">...</span>
            <PaginationBtn text="450" />
            <PaginationBtn icon={<ChevronRight size={16} />} />
          </div>
        </div>

      </div>
    </main>
  );
}

function FilterBtn({ text, active }: any) {
  return (
    <button className={`bg-[#0f172a]/50 border border-white/5 px-4 py-2 rounded-xl text-xs flex items-center gap-3 shrink-0 ${active ? 'text-white font-medium' : 'text-gray-400'}`}>
      {text} <ChevronDown size={12} />
    </button>
  );
}

function PaginationBtn({ text, icon, active }: any) {
  return (
    <button className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${active ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}>
      {text || icon}
    </button>
  );
}
