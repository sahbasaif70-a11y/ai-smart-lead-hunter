"use client";
import { Camera, Cpu, Lock, Cloud } from "lucide-react";

export default function Footer(){
    return(
        <footer className="w-full pt-20 pb-10 px-8 border-t border-white/5 bg-[#020617] ">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
                {/* Card1: Smart Scanning */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default">
                <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Camera size={24} />
                </div>
                <div>
              
                <h3 className="text-white font-semibold text-sm">Smart Scanning</h3>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">Auto-detect edges and capture perfect scans every time.</p>
                  </div>
            </div>
            {/* Card2: AI Extraction */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default">
            <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Cpu size={24}/>
            </div>
            <div>
                <h3 className="text-white font-semibold text-sm">AI Extraction</h3>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">Extract text with 99.9% accuracy using advanced OCR.</p>
            </div>
            </div>
            {/* Card3: Secure Storage */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default">
            <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Lock size={24}/>
            </div>
            <div>
                <h3 className="text-white font-semibold text-sm">Secure Storage</h3>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">Bank-level encryption keeps your data 100% secure.</p>
            </div>
            </div>
            {/* Card4: Sync Everywhere */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default">
            <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Cloud size={24}/>
            </div>
            <div>
                <h3 className="text-white font-semibold text-sm">Sync Everywhere</h3>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                Access your documents from any device, anytime.</p>
            </div>
            </div>

            </div>  
            
        </footer>
    );
}
