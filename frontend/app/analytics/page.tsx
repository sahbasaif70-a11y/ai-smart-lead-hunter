"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  Loader2,
  TrendingUp,
  BarChart3,
  Calendar,
  Layers,
  Zap
} from "lucide-react";
import Sidebar from "../component/common/Sidebar";
import { useRouter } from "next/navigation";

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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

  // Stats
  const totalLeads = leads.length;
  const businessCards = leads.filter(l => l.cardType === 'business').length;
  const cnicCards = leads.filter(l => l.cardType === 'cnic').length;
  const otherCards = totalLeads - businessCards - cnicCards;

  const dataByMonth = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 18 },
    { name: 'Mar', value: 25 },
    { name: 'Apr', value: 45 },
    { name: 'May', value: 30 },
    { name: 'Jun', value: leads.length > 0 ? leads.length : 5 },
  ];

  const maxVal = Math.max(...dataByMonth.map(d => d.value));

  return (
    <main className="min-h-screen bg-[#020617] flex font-sans overflow-x-hidden">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* --- MAIN CONTENT --- */}
      <section className="flex-grow p-4 md:p-8 lg:p-10 w-full overflow-y-auto pt-20 lg:pt-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white font-space tracking-tight">Analytics</h1>
              <p className="text-gray-500 text-xs md:text-sm mt-1">Deep dive into your document scanning performance</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-400 font-bold">
            <Calendar size={14} /> Last 6 Months
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
            <p className="text-gray-500 font-medium">Processing analytics...</p>
          </div>
        ) : (
          <div className="space-y-8">

            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnalyticsStatCard title="Total Scans" value={totalLeads} icon={<Layers className="text-blue-500" size={20} />} change="+12.5%" />
                <AnalyticsStatCard title="Processing Speed" value="0.8s" icon={<Zap className="text-yellow-500" size={20} />} change="-0.1s" />
                <AnalyticsStatCard title="Efficiency" value="94%" icon={<TrendingUp className="text-emerald-500" size={20} />} change="+2.4%" />
                <AnalyticsStatCard title="Active Users" value="1" icon={<BarChart3 className="text-purple-500" size={20} />} change="0%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Bar Chart */}
                <div className="bg-[#0f172a]/40 border border-white/5 rounded-[32px] p-8">
                    <h4 className="text-white font-bold text-sm mb-8">Scan Activity</h4>
                    <div className="flex items-end justify-between h-48 gap-2">
                        {dataByMonth.map((d, i) => (
                            <div key={i} className="flex-grow flex flex-col items-center gap-4">
                                <div
                                    className="w-full max-w-[40px] bg-gradient-to-t from-blue-600/10 to-blue-500/40 border-t border-blue-500 rounded-t-lg transition-all duration-500 hover:opacity-80 relative group"
                                    style={{ height: `${(d.value / maxVal) * 100}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {d.value}
                                    </div>
                                </div>
                                <span className="text-gray-500 text-[10px] font-bold uppercase">{d.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Card Type Distribution */}
                <div className="bg-[#0f172a]/40 border border-white/5 rounded-[32px] p-8 shadow-2xl">
                    <h4 className="text-white font-bold text-sm mb-8">Distribution by Type</h4>
                    <div className="space-y-6">
                        <DistributionBar label="Business Cards" count={businessCards} total={totalLeads} color="bg-blue-500" />
                        <DistributionBar label="CNIC Cards" count={cnicCards} total={totalLeads} color="bg-cyan-400" />
                        <DistributionBar label="Others" count={otherCards} total={totalLeads} color="bg-purple-500" />
                    </div>

                    <div className="mt-10 pt-10 border-t border-white/5 grid grid-cols-3 text-center">
                        <div>
                            <p className="text-2xl font-bold text-white">{businessCards}</p>
                            <p className="text-[10px] text-gray-500 uppercase font-bold mt-1">Business</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{cnicCards}</p>
                            <p className="text-[10px] text-gray-500 uppercase font-bold mt-1">CNIC</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{otherCards}</p>
                            <p className="text-[10px] text-gray-500 uppercase font-bold mt-1">Other</p>
                        </div>
                    </div>
                </div>

            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function AnalyticsStatCard({ title, value, icon, change }: any) {
    return (
        <div className="bg-[#0f172a]/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden group shadow-xl">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                    {icon}
                </div>
                <span className={`text-[10px] font-bold ${change.startsWith('+') ? 'text-emerald-500' : change === '0%' ? 'text-gray-500' : 'text-red-500'}`}>
                    {change}
                </span>
            </div>
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
    );
}

function DistributionBar({ label, count, total, color }: any) {
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                <span className="text-gray-400">{label}</span>
                <span className="text-white">{percentage}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} rounded-full transition-all duration-1000`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
}
