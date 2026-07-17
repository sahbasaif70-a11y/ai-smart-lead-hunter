"use client";
import React from "react";
import { Camera, Cpu, Lock, Cloud } from "lucide-react";

export default function Features() {
  const featureData = [
    {
      icon: <Camera size={24} />,
      title: "Smart Scanning",
      desc: "Auto-detect edges and capture perfect scans every time."
    },
    {
      icon: <Cpu size={24} />,
      title: "AI Extraction",
      desc: "Extract text with 99.9% accuracy using advanced OCR."
    },
    {
      icon: <Lock size={24} />,
      title: "Secure Storage",
      desc: "Bank-level encryption keeps your data 100% secure."
    },
    {
      icon: <Cloud size={24} />,
      title: "Sync Everywhere",
      desc: "Access your documents from any device, anytime."
    }
  ];

  return (
    <section className="w-full py-5 px-8 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#020617]">
        {featureData.map((card, index) => (
          <div key={index} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all cursor-default group">
            <div className="p-3.5 rounded-full bg-blue-500/10 bg-grid text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:text-cyan-400 transition-all">
              {card.icon}
            </div>
            <div>
              <h3 className="text-white font-bold text-sm tracking-wide">{card.title}</h3>
              <p className="text-gray-500 text-[11px] mt-1.5 leading-relaxed">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
