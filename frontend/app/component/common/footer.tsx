"use client";
import React from "react";
import { Mail, Phone, MapPin, ArrowRight, Globe, Share2, MessageSquare, Send } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Social icons mapping with safe fallback
  const socialIcons = [
    { Icon: Globe, href: "#" },
    { Icon: MessageSquare, href: "#" },
    { Icon: Share2, href: "#" },
    { Icon: Send, href: "#" }
  ];

  return (
    <footer className="w-full bg-[#020617] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* --- MAIN FOOTER CONTENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src="/logo1.png" alt="ScanVault" width={32} height={32} className="object-contain" />
              <div className="text-xl font-bold tracking-[0.2em] text-white">
                SCAN<span className="text-cyan-400">VAULT</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Revolutionizing business intelligence with AI-powered document scanning and automated data extraction.
            </p>
            <div className="flex items-center gap-4">
              {socialIcons.map((social, index) => {
                const ActiveIcon = social.Icon;
                return ActiveIcon ? (
                  <Link key={index} href={social.href} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-700 hover:text-white hover:border-transparent transition-all">
                    <ActiveIcon size={18} />
                  </Link>
                ) : null;
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Product</h4>
            <ul className="space-y-4">
              <FooterLink href="/scan" text="AI Scanner" />
              <FooterLink href="/dashboard" text="Dashboard" />
              <FooterLink href="/records" text="Scanned Records" />
              <FooterLink href="/analytics" text="Analytics" />
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500 text-sm group cursor-pointer hover:text-white transition-colors">
                <Mail size={18} className="text-cyan-400 shrink-0" />
                <span>support@scanvault.ai</span>
              </li>
              <li className="flex items-start gap-3 text-gray-500 text-sm group cursor-pointer hover:text-white transition-colors">
                <Phone size={18} className="text-cyan-400 shrink-0" />
                <span>+1 (555) 000-SCAN</span>
              </li>
              <li className="flex items-start gap-3 text-gray-500 text-sm group cursor-pointer hover:text-white transition-colors">
                <MapPin size={18} className="text-cyan-400 shrink-0" />
                <span>Silicon Valley, CA<br />United States</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Stay Updated</h4>
            <p className="text-gray-500 text-sm mb-4">Subscribe to our newsletter for the latest AI updates.</p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-cyan-400/50 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-cyan-400 to-blue-700 rounded-lg text-white shadow-lg shadow-blue-600/20">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-xs">
            © {currentYear} ScanVault AI Intelligence. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-xs text-gray-600">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link href={href} className="text-gray-500 text-sm hover:text-cyan-400 transition-colors flex items-center gap-2 group">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 scale-0 group-hover:scale-100 transition-transform"></span>
        {text}
      </Link>
    </li>
  );
}
