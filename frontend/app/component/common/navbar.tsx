"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 

export default function Navbar(){
  const [isOpen, setIsOpen] = useState(false);

  return(
    <nav className="w-full relative border-b border-[#11C9F2]/10 backdrop-blur-md sticky top-0 z-50 bg-[#020617]/80">
      <div className="max-w-7xl mx-auto px-8 py-3 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src="logo1.png" alt="ScanVault logo" width={40} height={40} className="object-contain" />
          <div className="text-xl font-bold tracking-[0.2em] text-white">
            SCAN<span className="text-cyan-400">VAULT</span>
          </div>
        </div>

        {/* 2. Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Scan</a>
          <a href="#" className="hover:text-white transition-colors">Form</a>
          <a href="#" className="hover:text-white transition-colors">Records</a>
          <a href="#" className="hover:text-white transition-colors">Dashboard</a>
        </div>

        {/* 3. Desktop Button (Hidden on Mobile) */}
        <button className="hidden md:block bg-gradient-to-r from-cyan-400 to-blue-700 hover:opacity-90 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
          Start Scan
        </button>

        {/* MOBILE MENU BUTTON (Only visible on Mobile) */}
        <button 
          className="md:hidden text-white p-2" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#020617] border-b border-[#11C9F2]/10 p-6 flex flex-col gap-6 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-4 text-gray-400 text-sm font-medium">
            <a href="#" onClick={() => setIsOpen(false)} className="hover:text-white">Home</a>
            <a href="#" onClick={() => setIsOpen(false)} className="hover:text-white">Scan</a>
            <a href="#" onClick={() => setIsOpen(false)} className="hover:text-white">Form</a>
            <a href="#" onClick={() => setIsOpen(false)} className="hover:text-white">Records</a>
            <a href="#" onClick={() => setIsOpen(false)} className="hover:text-white">Dashboard</a>
          </div>
          <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-700 text-white py-3 rounded-xl font-bold">
            Start Scan
          </button>
        </div>
      )}
    </nav>
  );
}