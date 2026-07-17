"use client";
import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar(){
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in by checking token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/");
    setIsOpen(false);
  };

  return(
    <nav className="w-full relative border-b border-[#11C9F2]/10 backdrop-blur-md sticky top-0 z-50 bg-[#020617]/80">
      <div className="max-w-7xl mx-auto px-8 py-3 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img src="logo1.png" alt="ScanVault logo" width={40} height={40} className="object-contain" />
            <div className="text-xl font-bold tracking-[0.2em] text-white">
              SCAN<span className="text-cyan-400">VAULT</span>
            </div>
          </Link>
        </div>

        {/* 2. Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/scan" className="hover:text-white transition-colors">Scan</Link>
          <Link href="/extract" className="hover:text-white transition-colors">Form</Link>
          <Link href="/records" className="hover:text-white transition-colors">Records</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
        </div>

        {/* 3. Login/Logout Button */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all uppercase tracking-widest"
          >
            <LogOut size={16} /> Logout
          </button>
        ) : (
          <Link href="/login">
            <button className="hidden md:block bg-gradient-to-r from-cyan-400 to-blue-700 hover:opacity-90 text-white px-8 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] uppercase tracking-widest">
              Login
            </button>
          </Link>
        )}

        {/* MOBILE MENU BUTTON */}
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
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-white">Home</Link>
            <Link href="/scan" onClick={() => setIsOpen(false)} className="hover:text-white">Scan</Link>
            <Link href="/extract" onClick={() => setIsOpen(false)} className="hover:text-white">Form</Link>
            <Link href="/records" onClick={() => setIsOpen(false)} className="hover:text-white">Records</Link>
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-white">Dashboard</Link>
          </div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500/20 border border-red-500 text-red-500 py-3 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-700 text-white py-3 rounded-xl font-bold uppercase tracking-widest">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
