"use client";
import React, { useState } from "react";
import {
  Menu,
  User,
  Bell,
  Lock,
  Globe,
  Shield,
  CreditCard
} from "lucide-react";
import Sidebar from "../component/common/Sidebar";

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              <h1 className="text-2xl md:text-3xl font-bold text-white font-space tracking-tight">Settings</h1>
              <p className="text-gray-500 text-xs md:text-sm mt-1">Manage your account preferences and application settings</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl space-y-6">
            <SettingsGroup title="Account Settings">
                <SettingsItem icon={<User size={18} />} title="Profile Information" desc="Update your name, email and avatar" />
                <SettingsItem icon={<Lock size={18} />} title="Security" desc="Change password and enable 2FA" />
            </SettingsGroup>

            <SettingsGroup title="Preferences">
                <SettingsItem icon={<Bell size={18} />} title="Notifications" desc="Configure alert preferences" />
                <SettingsItem icon={<Globe size={18} />} title="Language & Region" desc="Set your local language and timezone" />
            </SettingsGroup>

            <SettingsGroup title="Subscription">
                <SettingsItem icon={<CreditCard size={18} />} title="Billing & Plan" desc="Manage your subscription and invoices" />
                <SettingsItem icon={<Shield size={18} />} title="Privacy" desc="Data sharing and privacy controls" />
            </SettingsGroup>
        </div>
      </section>
    </main>
  );
}

function SettingsGroup({ title, children }: any) {
    return (
        <div className="bg-[#0f172a]/40 border border-white/5 rounded-[32px] p-8">
            <h4 className="text-white font-bold text-sm mb-6">{title}</h4>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

function SettingsItem({ icon, title, desc }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-[#020617] rounded-xl text-blue-500 group-hover:text-cyan-400 transition-colors">
                    {icon}
                </div>
                <div>
                    <h5 className="text-white text-sm font-bold">{title}</h5>
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter mt-0.5">{desc}</p>
                </div>
            </div>
            <span className="text-gray-600 group-hover:text-white transition-colors">→</span>
        </div>
    );
}
