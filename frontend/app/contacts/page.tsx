"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  MoreVertical,
  Menu,
  Loader2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2
} from "lucide-react";
import Sidebar from "../component/common/Sidebar";
import { useRouter } from "next/navigation";

export default function ContactsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
        const API_URL = "http://localhost:5000";
        const response = await fetch(`${API_URL}/api/get-leads`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const result = await response.json();
        if (result.success) {
          setLeads(result.data);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [router]);

  const filteredLeads = leads.filter(lead =>
    lead.extractedData.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.extractedData.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.extractedData.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#020617] flex font-sans overflow-x-hidden">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* --- MAIN CONTENT --- */}
      <section className="flex-grow p-4 md:p-8 lg:p-10 w-full overflow-y-auto pt-20 lg:pt-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white font-space tracking-tight">Contacts</h1>
              <p className="text-gray-500 text-xs md:text-sm mt-1">Manage your extracted business contacts</p>
            </div>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
            <p className="text-gray-500 font-medium">Loading contacts...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/5 rounded-[32px]">
            <p className="text-gray-500">No contacts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLeads.map((lead, i) => (
              <ContactCard key={i} lead={lead} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function ContactCard({ lead }: { lead: any }) {
  const data = lead.extractedData;
  return (
    <div className="bg-[#0f172a]/40 border border-white/5 rounded-[32px] p-6 hover:border-blue-500/30 transition-all group shadow-xl">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-600/20">
            <div className="w-full h-full rounded-2xl bg-[#020617] flex items-center justify-center overflow-hidden">
               {lead.imageUrl ? (
                 <img src={lead.imageUrl} alt="" className="w-full h-full object-cover" />
               ) : (
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`} alt="Avatar" />
               )}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm leading-tight">{data.name || "Unknown"}</h4>
            <p className="text-blue-500 text-[10px] font-medium uppercase mt-0.5 tracking-wider">{data.job_title || "N/A"}</p>
          </div>
        </div>
        <button className="text-gray-600 hover:text-white transition-colors"><MoreVertical size={18} /></button>
      </div>

      <div className="space-y-3 mb-6">
        {data.company && (
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <Building2 size={14} className="text-gray-600" />
            <span className="truncate">{data.company}</span>
          </div>
        )}
        <div className="flex items-center gap-3 text-gray-400 text-xs">
          <Mail size={14} className="text-gray-600" />
          <span className="truncate">{data.email || "No email"}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400 text-xs">
          <Phone size={14} className="text-gray-600" />
          <span>{data.phone || "No phone"}</span>
        </div>
        {data.website && (
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <Globe size={14} className="text-gray-600" />
            <span className="truncate">{data.website}</span>
          </div>
        )}
        {data.address && (
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <MapPin size={14} className="text-gray-600" />
            <span className="truncate line-clamp-1">{data.address}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button className="flex-grow bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold py-2.5 rounded-xl transition-all border border-white/5 uppercase tracking-widest">
          Profile
        </button>
        <button className="flex-grow bg-gradient-to-r from-cyan-400 to-blue-700 hover:opacity-90 text-white text-[10px] font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 uppercase tracking-widest">
          Email
        </button>
      </div>
    </div>
  );
}
