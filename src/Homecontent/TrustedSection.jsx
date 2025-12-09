import React, { useState } from "react";

// ------- LOCAL IMAGES -------
import chart from "../assets/chart.png";
// import coin from "../assets/coin.png";

// Banner images (replace with your own)
import forexBanner from "../assets/forexBanner.png";
import energyBanner from "../assets/energyBanner.png";
import sharesBanner from "../assets/sharesBanner.png";
import indicesBanner from "../assets/indicesBanner.png";
import metalsBanner from "../assets/metalsBanner.png";

// ------- SVG ICONS -------
const Icons = {
  ArrowDown: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  ),

  Share: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),

  Play: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),

  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),

  SwapVertical: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10v12" />
      <path d="M17 14v-12" />
      <path d="M7 22l-4-4" />
      <path d="M7 22l4-4" />
      <path d="M17 2l-4 4" />
      <path d="M17 2l4 4" />
    </svg>
  ),

  Expand: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  ),
};

// ------- TABS -------
const tabs = [
  { id: "forex", label: "Forex", icon: "💱" },
  { id: "energies", label: "Energies", icon: "⚡" },
  { id: "shares", label: "Shares", icon: "📊" },
  { id: "indices", label: "Indices", icon: "📈" },
  { id: "metals", label: "Metals", icon: "🥇" },
];

// ------- FOREX CARD DATA -------
const forexData = {
  cards: [
    {
      base: "USD",
      baseName: "American Dollar",
      baseFlag: "https://flagcdn.com/us.svg",
      buy: "144.191",
      quote: "JPY",
      quoteName: "Japanese Yen",
      quoteFlag: "https://flagcdn.com/jp.svg",
      sell: "144.210",
      changePercent: "-0.25%",
      isPositive: false,
    },
    {
      base: "USD",
      baseName: "American Dollar",
      baseFlag: "https://flagcdn.com/us.svg",
      buy: "1.11463",
      quote: "EUR",
      quoteName: "Euro",
      quoteFlag: "https://flagcdn.com/eu.svg",
      sell: "1.11565",
      changePercent: "-0.08%",
      isPositive: false,
    },
    {
      base: "USD",
      baseName: "American Dollar",
      baseFlag: "https://flagcdn.com/us.svg",
      buy: "0.78004",
      quote: "AUD",
      quoteName: "Australian Dollar",
      quoteFlag: "https://flagcdn.com/au.svg",
      sell: "0.78026",
      changePercent: "+0.24%",
      isPositive: true,
    },
  ],
};

// ------- TABS STATIC DATA -------
const allTabData = {
  forex: {
    bannerImg: forexBanner,
    title: <>Explore Global <br /> Currencies</>,
    text: "Trade major, minor & exotic currency pairs with real-time spreads.",
    points: [
      { value: "1:500", text: "High leverage options." },
      { value: "0.1", text: "Low pip spreads." },
      { value: "40+", text: "Chart & indicators tools." },
    ],
    cards: forexData.cards,
  },

  energies: {
    bannerImg: energyBanner,
    title: <>Trade Leading <br /> Energy Commodities</>,
    text: "Crude oil, natural gas and more with tight market spreads.",
    points: [
      { value: "1:200", text: "Flexible leverage." },
      { value: "0.3", text: "Low spreads in energies." },
      { value: "25+", text: "Indicators support." },
    ],
    cards: forexData.cards,
  },

  shares: {
    bannerImg: sharesBanner,
    title: <>Invest in <br /> Global Shares</>,
    text: "Top-tier global companies at your fingertips.",
    points: [
      { value: "1000+", text: "Global stocks." },
      { value: "0.5", text: "Low fees." },
      { value: "50+", text: "Chart tools." },
    ],
    cards: forexData.cards,
  },

  indices: {
    bannerImg: indicesBanner,
    title: <>Major Global <br /> Indices</>,
    text: "Trade top world indices with low latency execution.",
    points: [
      { value: "30+", text: "Major indices available." },
      { value: "Tight", text: "Spread offerings." },
      { value: "High", text: "Liquidity markets." },
    ],
    cards: forexData.cards,
  },

  metals: {
    bannerImg: metalsBanner,
    title: <>Trade Precious <br /> Metals</>,
    text: "Trade Gold, Silver, and other metals with tight spreads.",
    points: [
      { value: "1:100", text: "Strong leverage available." },
      { value: "0.2", text: "Low metal spreads." },
      { value: "Premium", text: "Analysis tools included." },
    ],
    cards: forexData.cards,
  },
};

export default function TrustedSection() {
  const [activeTab, setActiveTab] = useState("forex");
  const [timeframe, setTimeframe] = useState("1D");

  const currentData = allTabData[activeTab];

  return (
    <section className="relative py-24 bg-[#020617] text-white overflow-hidden rounded-b-2xl">
      <div className="max-w-[1880px] mx-auto px-4 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="bg-[#22c55e] text-black px-4 py-1.5 rounded-full text-[11px] font-bold uppercase">
            Instruments
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Leading Market Price List
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover the most competitive prices updated in real-time.
          </p>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-6 py-2.5 rounded-full flex items-center gap-2 border transition-all duration-300 ${
                activeTab === t.id
                  ? "bg-[#22c55e] border-[#22c55e] text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
              }`}
            >
              {t.icon} {t.label}
              {activeTab === t.id && <Icons.ArrowDown />}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-w-6xl mx-auto items-center mb-24">

          {/* LEFT BANNER IMAGE WITH GRADIENT */}
          <div className="relative group overflow-hidden rounded-2xl">

            <img
              src={currentData.bannerImg}
              className="relative w-full h-[400px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105 z-10"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-green-500/70 via-green-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
          </div>

          {/* RIGHT INFO */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              {currentData.title}
            </h3>

            <p className="text-slate-400 mb-8">{currentData.text}</p>

            <ul className="space-y-6">
              {currentData.points.map((p, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#22c55e]/10 flex items-center justify-center text-[#22c55e]">
                    <Icons.Check />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{p.value}</h4>
                    <p className="text-slate-500 text-sm">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
  {forexData.cards.map((card, index) => (
    <div key={index} className="bg-[#0B1221] rounded-2xl border border-slate-800 hover:border-slate-600 transition-all duration-300 overflow-hidden flex flex-col group">

      <div className="flex flex-col sm:flex-row h-auto sm:h-80">
        
        {/* LEFT */}
        <div className="w-full sm:w-[45%] p-4 md:p-5 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-slate-800/50 relative">
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white text-xl md:text-2xl font-bold">{card.base}</h3>
              <img src={card.baseFlag} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-4 border-white object-cover" alt={card.baseName} />
            </div>

            <p className="text-slate-500 mb-3 md:mb-4 font-bold text-sm md:text-base">{card.baseName}</p>

            <div className="flex justify-between items-end">
              <span className="text-white font-bold text-sm md:text-base">Buys</span>
              <span className="text-white text-lg md:text-xl font-bold">{card.buy}</span>
            </div>
          </div>

          <div className="flex justify-center my-3 opacity-60">
            <Icons.SwapVertical />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white text-xl md:text-2xl font-bold">{card.quote}</h3>
              <img src={card.quoteFlag} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-4 border-white object-cover" alt={card.quoteName} />
            </div>

            <p className="text-slate-500 mb-3 md:mb-4 text-sm md:text-base">{card.quoteName}</p>

            <div className="flex justify-between items-end">
              <span className="text-white font-medium text-sm md:text-base">Sells</span>
              <span className="text-white text-lg md:text-xl font-bold">{card.sell}</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full sm:w-[55%] p-4 md:p-5 flex flex-col relative bg-slate-900/20">

          <div className="flex justify-between items-start mb-6">
            <div className={`px-2.5 py-1.5 rounded text-xs font-bold ${
              card.isPositive ? "bg-[#22c55e] text-black" : "bg-[#ff5555] text-white"
            }`}>
              {card.isPositive ? "▲" : "▼"} {card.changePercent}
            </div>
            <div className="text-slate-600 hover:text-white cursor-pointer">
              <Icons.Expand />
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {["1D", "1M", "1Y"].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-2.5 py-1 rounded text-[10px] md:text-xs ${
                  timeframe === t ? "bg-white text-black font-bold" : "text-slate-500 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 relative flex items-end justify-between px-1 gap-1 border-b border-l border-slate-800/50 min-h-[120px] sm:min-h-0">
            <img src={chart} className="relative z-10 w-full h-full object-contain opacity-90" alt="Chart" />

            <div className="absolute right-0 bottom-0 flex flex-col justify-between h-full text-[9px] text-slate-600 translate-x-full pl-1">
              <span>2.8</span>
              <span>2.5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 flex flex-col sm:flex-row bg-[#0d1424]">
        <button className="flex-1 py-3 md:py-4 text-sm md:text-base text-white hover:bg-slate-800 border-b sm:border-b-0 sm:border-r border-slate-800 flex items-center justify-center">
          Start Your Trading <Icons.Play />
        </button>
        <button className="flex-1 py-3 md:py-4 text-sm md:text-base text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center">
          Share price list <Icons.Share />
        </button>
      </div>

    </div>
  ))}
</div>

      </div>
    </section>
  );
}
