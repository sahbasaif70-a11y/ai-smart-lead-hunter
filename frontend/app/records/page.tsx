"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileSpreadsheet,
  FileText
} from "lucide-react";
import Link from "next/link";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function RecordsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);

  // --- EXPORT LOGIC ---
  const exportToExcel = () => {
    const dataToExport = filteredRecords.map(rec => ({
      Name: rec.extractedData.name,
      Type: rec.cardType,
      JobTitle: rec.extractedData.job_title || "N/A",
      Company: rec.extractedData.company || "N/A",
      Email: rec.extractedData.email || "N/A",
      Phone: rec.extractedData.phone || "N/A",
      Website: rec.extractedData.website || "N/A",
      Address: rec.extractedData.address || "N/A",
      Date: new Date(rec.createdAt).toLocaleDateString()
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "LeadHunter_Records.xlsx");
    setShowExportMenu(false);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Lead Hunter - Scanned Records", 14, 15);

    const tableData = filteredRecords.map(rec => [
      rec.extractedData.name,
      rec.cardType,
      rec.extractedData.email || "N/A",
      rec.extractedData.phone || "N/A",
      new Date(rec.createdAt).toLocaleDateString()
    ]);

    autoTable(doc, {
      head: [['Name', 'Type', 'Email', 'Phone', 'Date']],
      body: tableData,
      startY: 20,
    });

    doc.save("LeadHunter_Records.pdf");
    setShowExportMenu(false);
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const API_URL = "https://ai-smart-lead-hunter.onrender.com";
        const response = await fetch(`${API_URL}/api/get-leads`);
        const result = await response.json();
        if (result.success) {
          setRecords(result.data);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const filteredRecords = records.filter(rec =>
    rec.extractedData.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.cardType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#020617] p-4 md:p-8 pt-20">
      <div className="max-w-7xl mx-auto">

        {/* --- HEADER --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white font-space">All Records</h1>
            <p className="text-gray-500 text-xs md:text-sm">Manage your all scanned documents</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto relative">
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl text-xs md:text-sm hover:bg-white/10 transition-all">
                Export <ChevronDown size={14} />
              </button>

              {showExportMenu && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                  <button
                    onClick={exportToExcel}
                    className="w-full flex items-center gap-3 px-4 py-3 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-all text-left">
                    <FileSpreadsheet size={16} className="text-emerald-500" /> Export to Excel
                  </button>
                  <button
                    onClick={exportToPDF}
                    className="w-full flex items-center gap-3 px-4 py-3 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-all text-left">
                    <FileText size={16} className="text-red-500" /> Export to PDF
                  </button>
                </div>
              )}
            </div>

            <Link href="/scan" className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-lg shadow-blue-600/20">
              <Plus size={18} /> New Scan
            </Link>
          </div>
        </div>

        {/* --- FILTERS & SEARCH --- */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search records by name or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0f172a]/50 border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar whitespace-nowrap">
             <FilterBtn text="All Types" />
             <FilterBtn text="Latest" active />
             <button className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-gray-400 shrink-0"><Filter size={18} /></button>
          </div>
        </div>

        {/* --- TABLE SECTION --- */}
        <div className="bg-[#0f172a]/30 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                  <th className="px-6 py-5">Document Preview</th>
                  <th className="px-6 py-5">Full Name</th>
                  <th className="px-6 py-5">Type</th>
                  <th className="px-6 py-5">Email / Phone</th>
                  <th className="px-6 py-5">Scan Date</th>
                  <th className="px-6 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-blue-500" size={32} />
                        <p className="text-gray-500 text-sm">Loading records from database...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <p className="text-gray-500 text-sm">No records found.</p>
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((rec) => (
                    <tr key={rec._id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="w-16 h-10 bg-white/5 border border-white/10 rounded-lg overflow-hidden flex items-center justify-center">
                          <img src={rec.imageUrl} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white text-sm font-medium">{rec.extractedData.name || "Unknown"}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-400 text-xs uppercase tracking-tighter bg-white/5 px-2 py-1 rounded-md">{rec.cardType}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-gray-400 text-xs">{rec.extractedData.email || "No Email"}</span>
                          <span className="text-gray-600 text-[10px]">{rec.extractedData.phone || "No Phone"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs">
                        {new Date(rec.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-600 hover:text-white"><MoreVertical size={18} /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- PAGINATION --- */}
        {!loading && filteredRecords.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4 px-4">
            <p className="text-gray-600 text-xs">Showing {filteredRecords.length} results</p>
            <div className="flex items-center gap-1.5">
              <PaginationBtn icon={<ChevronLeft size={16} />} />
              <PaginationBtn text="1" active />
              <PaginationBtn icon={<ChevronRight size={16} />} />
            </div>
          </div>
        )}

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
