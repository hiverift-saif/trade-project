import React, { useState } from "react";
import { Check, Globe, Monitor, Smartphone, ArrowRight } from "lucide-react";
import mobile from "../assets/mobile.png"; 
// FontAwesome Icons (ensure you have them or replace with lucide equivalents)
// npm install react-icons
import { FaGooglePlay, FaApple, FaWindows } from "react-icons/fa";

const platformsData = [
  {
    id: 0,
    name: "Meta Trader 4",
    short: "Meta Trader 4",
    info: "Denouncing pleasure and praising pain was born and will give complete account of the system and expound.",
    features: [
      "Extensive Technical Indicators",
      "Automated Trading with Expert Advisors",
      "Low Resource Requirements",
    ],
    img: "https://tradebro-react-next-js-template.vercel.app/assets/images/resources/platform-1.png", // Phone Image Placeholder
  },
  {
    id: 1,
    name: "Meta Trader 5",
    short: "Meta Trader 5",
    info: "Provides advanced charting tools and flexible trading systems with powerful financial instruments.",
    features: [
      "Advanced Analytical Tools",
      "Economic Calendar",
      "Multi-Asset Trading Options",
    ],
    img: "https://tradebro-react-next-js-template.vercel.app/assets/images/resources/platform-1.png", // Use same or diff image
  },
];

export default function DownloadAccessibility() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full bg-[#000420] py-24 font-sans relative overflow-hidden">
      
      {/* Background Glow Effect (Optional) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* ====================================================
            UPPER SECTION: PHONES + TEXT + TABS
        ===================================================== */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          
          {/* --- LEFT: FLOATING PHONES --- */}
          <div className="w-full lg:w-1/2 relative">
            {/* Main Phone Image */}
            <div className="relative z-10 animate-float">
              <img 
                src={mobile} 
                alt="Trading App" 
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
            
            {/* Decorative Elements behind phone (optional) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl -z-10" />
          </div>

          {/* --- RIGHT: CONTENT & TABS --- */}
          <div className="w-full lg:w-1/2 space-y-8">
            
            {/* Badge */}
            <div>
              <span className="bg-[#50fa7b] text-[#051509] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                Platforms
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-tight">
              Powerful Trading <br />
              Platforms For Every <br />
              Trader
            </h2>

            {/* TABS BUTTONS */}
            <div className="flex flex-wrap gap-4">
              {platformsData.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 ${
                    active === i 
                      ? "bg-[#0a192f] border-[#1e293b]" 
                      : "bg-transparent border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Custom Check Icon Circle */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    active === i ? "bg-[#50fa7b] text-black" : "bg-slate-700 text-slate-400"
                  }`}>
                    <Check size={20} strokeWidth={3} />
                  </div>
                  
                  <div className="text-left">
                    <span className={`block text-sm font-bold ${active === i ? "text-white" : "text-slate-400"}`}>
                      {p.short}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Description Text */}
            <p className="text-slate-400 text-lg leading-relaxed">
              {platformsData[active].info}
            </p>

            {/* Features List */}
            <ul className="space-y-4">
              {platformsData[active].features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-300 font-medium">
                  {/* Green Leaf/Bullet Icon */}
                  <span className="text-[#50fa7b]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                       <path d="M7 0C7 0 14 7 14 7C14 7 7 14 7 14C7 14 0 7 0 7C0 7 7 0 7 0Z" />
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

          </div>
        </div>

        {/* ====================================================
            BOTTOM SECTION: DOWNLOAD CARDS
        ===================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: MOBILE */}
          <div className="bg-[#0a1020] border border-white/5 rounded-2xl p-8 text-center hover:border-[#50fa7b]/30 transition-colors group">
            <div className="mb-4 flex justify-center">
               <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Smartphone size={24} />
               </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">For Mobile Users</h3>
            <p className="text-slate-500 text-sm mb-6">Available on Android and iPhone</p>
            
            <div className="flex justify-center gap-3">
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#50fa7b] hover:text-black text-white transition-colors">
                <FaGooglePlay size={16} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#50fa7b] hover:text-black text-white transition-colors">
                <FaApple size={18} />
              </button>
            </div>
          </div>

          {/* CARD 2: DESKTOP */}
          <div className="bg-[#0a1020] border border-white/5 rounded-2xl p-8 text-center hover:border-[#50fa7b]/30 transition-colors group">
            <div className="mb-4 flex justify-center">
               <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                  <Monitor size={24} />
               </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">For Desktop Users</h3>
            <p className="text-slate-500 text-sm mb-6">Available on Windows & MacOS.</p>
            
            <div className="flex justify-center gap-3">
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#50fa7b] hover:text-black text-white transition-colors">
                <FaWindows size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#50fa7b] hover:text-black text-white transition-colors">
                <FaApple size={18} />
              </button>
            </div>
          </div>

          {/* CARD 3: WEB TERMINAL (With Green Button) */}
          <div className="bg-[#0a1020] border border-white/5 rounded-2xl p-8 text-center hover:border-[#50fa7b]/30 transition-colors group">
            <div className="mb-4 flex justify-center">
               <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-[#50fa7b] group-hover:scale-110 transition-transform">
                  <Globe size={24} />
               </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">For Web Terminal</h3>
            <p className="text-slate-500 text-sm mb-6">Trading directly via web browser.</p>
            
            <div className="flex justify-center">
              <button className="flex items-center gap-2 bg-[#50fa7b] hover:bg-[#4ade80] text-black font-bold text-sm px-6 py-2.5 rounded-full transition-all shadow-lg shadow-green-500/20">
                Web Platform <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}