"use client";
import React, { useState, useEffect } from "react";
import {
  FileText,
  MoreVertical,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  Loader2
} from "lucide-react";
import Link from "next/link";
import Sidebar from "../component/common/Sidebar";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("User");
  const router = useRouter();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");

        if (!token) {
          router.push("/login");
          return;
        }

        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            setUserName(user.name || "User");
          } catch (e) {
            console.error("Error parsing user data");
          }
        }

        const API_URL = "http://localhost:5000";
        const response = await fetch(`${API_URL}/api/get-leads`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const result = await response.json();
        if (result.success) {
          setLeads(result.data);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
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

  // Dynamic Stats
  const totalDocuments = leads.length;
  const scansThisMonth = leads.filter(lead => {
      const date = new Date(lead.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;

  const scanIncrease = totalDocuments > 0 ? ((scansThisMonth / totalDocuments) * 100).toFixed(1) : "0";

  // Mock storage calculation based on leads
  const storageUsed = (leads.length * 0.15).toFixed(1); // 150KB per lead avg
  const storagePercentage = Math.max(Math.round((parseFloat(storageUsed) / 200) * 100), 1);

  return (
    <main className="min-h-screen bg-[#020617] flex font-sans overflow-x-hidden">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* --- MAIN CONTENT --- */}
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
              <p className="text-gray-500 text-xs md:text-sm mt-1">Welcome back, {userName}! 👋</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/scan" className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-700 hover:opacity-90 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all shadow-lg shadow-blue-600/20">
              <Plus size={18} className="hidden xs:block" /> Quick Scan
            </Link>
            <button className="p-2 md:p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white"><MoreVertical size={20} /></button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
            <p className="text-gray-500 font-medium">Loading your dashboard...</p>
          </div>
        ) : (
          <>
            {/* TOP STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
              <StatCard title="Total Documents" value={totalDocuments.toLocaleString()} change={`+${scanIncrease}%`} type="up" color="#3b82f6" />
              <StatCard title="OCR Accuracy" value="99.9%" change="+2.1%" type="up" color="#10b981" />
              <StatCard title="Avg. Scan Time" value="0.8s" change="-0.2s" type="down" color="#ef4444" />

              <div className="bg-[#0f172a]/40 border border-white/5 rounded-3xl p-5 md:p-6 flex justify-between items-center shadow-xl">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-2">Storage Used</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{storageUsed} <span className="text-xs text-gray-500">GB</span></h3>
                  <p className="text-gray-600 text-[10px] mt-1">of 200 GB</p>
                </div>
                <CircularProgress percentage={storagePercentage} />
              </div>
            </div>

            {/* BOTTOM SECTION GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

              <RecentScans leads={leads.slice(0, 4)} />
              <ActivityTimeline leads={leads.slice(0, 3)} />

              {/* STORAGE OVERVIEW */}
              <div className="lg:col-span-1 bg-[#0f172a]/40 border border-white/5 rounded-[32px] p-6 md:p-8 flex flex-col items-center justify-between text-center shadow-2xl">
                 <h4 className="font-bold text-white text-sm self-start mb-6 uppercase tracking-widest opacity-60">Storage Overview</h4>

                 <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path className="text-white/5 stroke-current" strokeWidth="2.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-blue-500 stroke-current" strokeWidth="2.5" strokeDasharray={`${storagePercentage}, 100`} strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl md:text-4xl font-bold text-white">{storagePercentage}%</span>
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Used</span>
                    </div>
                 </div>

                 <div className="w-full mt-6">
                    <p className="text-gray-400 text-xs font-bold mb-4">{storageUsed} GB <span className="text-gray-600 font-normal">/ 200 GB</span></p>
                    <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-700 hover:opacity-90 text-white py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20 uppercase tracking-widest">
                      Upgrade Plan
                    </button>
                 </div>
              </div>

            </div>
          </>
        )}
      </section>
    </main>
  );
}

function StatCard({ title, value, change, type, color }: any) {
  return (
    <div className="bg-[#0f172a]/40 border border-white/5 rounded-3xl p-5 md:p-6 relative overflow-hidden group shadow-xl">
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

function RecentScans({ leads }: { leads: any[] }) {
  return (
    <div className="lg:col-span-1 bg-[#0f172a]/40 border border-white/5 rounded-[32px] p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-white text-sm uppercase tracking-widest opacity-60">Recent Scans</h4>
        <Link href="/records" className="text-blue-500 text-[10px] font-bold hover:underline">View all</Link>
      </div>
      <div className="space-y-5">
        {leads.length > 0 ? leads.map((lead, i) => (
          <Link href="/records" key={i} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-11 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-500 group-hover:border-blue-500/50 transition-all overflow-hidden">
                {lead.imageUrl ? (
                    <img src={lead.imageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                    <FileText size={16} />
                )}
              </div>
              <div>
                <h5 className="text-white text-xs font-bold leading-none mb-1 truncate max-w-[120px]">
                    {lead.extractedData.name || "Unknown"}
                </h5>
                <p className="text-gray-600 text-[10px] uppercase">{lead.cardType}</p>
              </div>
            </div>
            <span className="text-gray-700 text-[10px]">
                {new Date(lead.createdAt).toLocaleDateString()}
            </span>
          </Link>
        )) : (
            <p className="text-gray-600 text-xs text-center py-10">No recent scans</p>
        )}
      </div>
    </div>
  );
}

function ActivityTimeline({ leads }: { leads: any[] }) {
  return (
    <div className="lg:col-span-1 bg-[#0f172a]/40 border border-white/5 rounded-[32px] p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-white text-sm uppercase tracking-widest opacity-60">Activity Timeline</h4>
        <button className="text-blue-500 text-[10px] font-bold hover:underline">View all</button>
      </div>
      <div className="relative space-y-6 pl-6">
        <div className="absolute left-[7px] top-2 w-[1px] h-[80%] bg-white/5"></div>
        {leads.length > 0 ? leads.map((lead, i) => (
             <TimelineItem
                key={i}
                title={`${lead.cardType} Scanned`}
                desc={lead.extractedData.name || "AI processed"}
                time={new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                color={i === 0 ? "emerald" : i === 1 ? "blue" : "yellow"}
            />
        )) : (
            <p className="text-gray-600 text-xs py-4">No activity yet</p>
        )}
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
