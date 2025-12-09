import React, { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Calendar, Hash } from "lucide-react";
import group from "../assets/group.png"

// Megaphone Icon
const MEGAPHONE_ICON = "https://cdn3d.iconscout.com/3d/premium/thumb/megaphone-4034453-3337320.png";


// Data for each tab
const insightsData = {
  "Global Analysis": {
    main: {
      tag: "MARKET ANALYSIS",
      date: "15.09.2025",
      title: "How Global Events are Shaping Commodity Prices",
      desc: "Desire that they cannot foresee all the pain business it will frequently occur...",
      image: "https://images.pexels.com/photos/3184333/pexels-photo-3184333.jpeg?auto=compress&cs=tinysrgb&w=800",
      read: "4 MINUTES READ"
    },
    subs: [
      { tag: "ECONOMIC NEWS", date: "31.08.2025", title: "The Effect of Fiscal Policies on Stock Market Performance", desc: "Cases are perfectly simple to all distinguish desire that they cannot foresee...", read: "3 MINUTES READ" },
      { tag: "LEARNING CENTER", date: "23.08.2025", title: "Understanding Leverage: The Pros and Cons", desc: "Foresee the pain trouble that are in bound trouble that are bound to ensue...", read: "5 MINUTES READ" }
    ]
  },
  "Market Analysis": {
    main: {
      tag: "STOCK MARKET",
      date: "02.09.2025",
      title: "Bull vs Bear: Navigating Volatility in 2025",
      desc: "An in-depth look at the current market trends and how to position your portfolio for maximum gains.",
      image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800",
      read: "6 MINUTES READ"
    },
    subs: [
      { tag: "FOREX TODAY", date: "10.09.2025", title: "USD/EUR Strategy for the Upcoming Quarter", desc: "Analyzing the currency pairs and central bank decisions impacting forex.", read: "3 MINUTES READ" },
      { tag: "CRYPTO NEWS", date: "28.08.2025", title: "Bitcoin Halving: What History Tells Us", desc: "Looking back at historical data to predict future crypto movements.", read: "7 MINUTES READ" }
    ]
  },
  "Trading Strategies": {
    main: {
      tag: "STRATEGY",
      date: "05.09.2025",
      title: "Mastering the Moving Average Crossover",
      desc: "A step-by-step guide to one of the most popular and effective technical indicators for day traders.",
      image: "https://images.pexels.com/photos/5980866/pexels-photo-5980866.jpeg?auto=compress&cs=tinysrgb&w=800",
      read: "8 MINUTES READ"
    },
    subs: [
      { tag: "RISK MGMT", date: "12.09.2025", title: "Position Sizing: The Secret to Longevity", desc: "Why risk management is more important than your entry point.", read: "4 MINUTES READ" },
      { tag: "PSYCHOLOGY", date: "20.08.2025", title: "Overcoming FOMO in Bull Markets", desc: "Mental frameworks to keep you disciplined when prices soar.", read: "5 MINUTES READ" }
    ]
  },
  "Technical Analysis": {
    main: {
      tag: "TECHNICALS",
      date: "14.09.2025",
      title: "Reading Candlestick Patterns Like a Pro",
      desc: "Decode the language of the market by understanding reversal and continuation patterns.",
      image: "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=800",
      read: "5 MINUTES READ"
    },
    subs: [
      { tag: "INDICATORS", date: "18.09.2025", title: "RSI vs MACD: Which One Wins?", desc: "Comparing momentum oscillators for better entry signals.", read: "4 MINUTES READ" },
      { tag: "CHARTING", date: "22.08.2025", title: "Support and Resistance Levels Explained", desc: "How to identify key zones where price is likely to react.", read: "3 MINUTES READ" }
    ]
  },
  "Economic News": {
    main: {
      tag: "ECONOMY",
      date: "01.09.2025",
      title: "Inflation Reports: Impact on Global Trade",
      desc: "Understanding how CPI data releases affect market volatility and trading opportunities.",
      image: "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=800",
      read: "4 MINUTES READ"
    },
    subs: [
      { tag: "POLICY", date: "11.09.2025", title: "Central Bank Interest Rate Decisions", desc: "What the latest hike means for your savings and investments.", read: "3 MINUTES READ" },
      { tag: "JOBS DATA", date: "25.08.2025", title: "NFP Report Analysis for Traders", desc: "How to trade the Non-Farm Payrolls release effectively.", read: "5 MINUTES READ" }
    ]
  }
};

const tabs = Object.keys(insightsData);

export default function InsightsSection() {
  const [activeTab, setActiveTab] = useState("Global Analysis");
  const [isChecked, setIsChecked] = useState(true);

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setActiveTab(tabs[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = tabs.indexOf(activeTab);
    const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    setActiveTab(tabs[prevIndex]);
  };

  const content = insightsData[activeTab];

  return (
    <section className="bg-white py-20 font-sans">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#50fa7b] text-[#0a0a0a] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide mb-4">
            News & Updates
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] mb-3 font-heading">
            Latest Insights and Updates
          </h2>

          <p className="text-gray-500 text-base">
           Discover the most competitive prices in the market, <br /> updated regularly for your advantage
          </p>

        </div>

        {/* TABS */}
        <div className="border border-gray-200 rounded-lg mb-10 overflow-hidden bg-white shadow-sm">
          <div className="flex flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[150px] p-4 text-md md:text-xl font-bold text-center transition-all border-r border-gray-200 last:border-r-0 hover:bg-gray-50
                  ${activeTab === tab ? "text-[#0a0a0a] bg-white" : "text-gray-400"}
                `}
              >
                {tab}
              </button>
            ))}
            
            {/* Navigation Arrows */}
            <div className="flex items-center justify-center gap-2 px-4 py-3 border-t md:border-t-0 md:border-l border-gray-200 w-full md:w-auto">
              <button onClick={handlePrev} className="p-2 text-gray-400 hover:text-[#0a0a0a] transition">
                <ArrowLeft size={20}/>
              </button>
              <button onClick={handleNext} className="p-2 text-gray-400 hover:text-[#0a0a0a] transition">
                <ArrowRight size={20}/>
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: ARTICLES */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* MAIN FEATURED ARTICLE */}
              <div className="md:col-span-2 group cursor-pointer">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Image */}
                  <div className="h-64 overflow-hidden rounded-lg relative">
                    <img 
                      src={group}
                      alt="Main Article" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                {/* Green Gradient Bottom on Hover */}
  <div className="
      absolute inset-0 bg-gradient-to-t 
      from-green-500/70 via-green-500/30 to-transparent 
      opacity-0 group-hover:opacity-100 transition-opacity duration-500
  "></div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <div className="flex items-center gap-2 bg-gray-100  text-xs font-bold px-3 py-1.5 rounded">
       <div className="bg-[#2bb331] h-7  w-7 rounded-full flex justify-center items-center">
                        
                    
                      <Hash size={16} className="text-black" />
                        </div>

                        
                        <span className="text-sm text-black">{content.main.tag}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                        <Calendar size={14} className="pr-6" />
                        <span>{content.main.date}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-[#0a0a0a] mb-3 leading-tight font-heading group-hover:text-[#00B050] transition-colors">
                      {content.main.title}
                    </h3>
                    
                    <p className="text-gray-500 text-xl font-bold leading-relaxed mb-5 line-clamp-2">
                      {content.main.desc}
                    </p>
                    
                    {/* FLIP ANIMATION FOOTER */}
                    <div className="relative h-5 overflow-hidden w-fit">
                        <div className="flex flex-col transition-transform duration-500 group-hover:-translate-y-5">
                            {/* Default State: Time */}
                            <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#051509] h-5">
                                {content.main.read} <ArrowRight size={14} />
                            </span>
                            {/* Hover State: Read More */}
                            <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#00B050] h-5">
                                READ MORE <ArrowRight size={14} />
                            </span>
                        </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* SUB ARTICLES */}
              {content.subs.map((sub, index) => (
                <div key={index} className="group pb-6 border-b border-gray-100 cursor-pointer">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">


                    <div className="flex items-center gap-2 bg-gray-100  text-xs font-bold px-3 py-1.5 rounded">
                      <div className="bg-[#2bb331] h-7  w-7 rounded-full flex justify-center items-center">
                        
                    
                      <Hash size={16} className="text-black" />
                        </div>
                      <span className="text-black text-sm">{sub.tag}</span>
                    </div>




                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <Calendar size={14} />
                      <span>{sub.date}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-[#0a0a0a] mb-3 leading-tight font-heading group-hover:text-[#00B050] transition-colors">
                    {sub.title}
                  </h4>
                  
                  <p className="text-gray-500 text-xl font-bold  leading-relaxed mb-4 line-clamp-2">
                    {sub.desc}
                  </p>
                  
                  {/* FLIP ANIMATION FOOTER */}
                  <div className="relative h-5 overflow-hidden w-fit">
                        <div className="flex flex-col transition-transform duration-500 group-hover:-translate-y-5">
                            <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#051509] h-5">
                                {sub.read} <ArrowRight size={14} />
                            </span>
                            <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#00B050] h-5">
                                READ MORE <ArrowRight size={14} />
                            </span>
                        </div>
                    </div>

                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: SUBSCRIBE BOX */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl p-8 text-white relative overflow-visible h-full">
              
              {/* Decorative Shapes */}
              <div className="absolute top-8 right-8 w-32 h-32 opacity-10">
                <div className="w-full h-full border-4 border-white rounded-full"></div>
              </div>
              <div className="absolute bottom-12 left-8 w-24 h-24 opacity-10">
                <div className="w-full h-full bg-white rounded-full"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 font-heading">Subscribe Us</h3>
                <p className="text-gray-300 text-sm mb-8">
                  Get updates in your inbox directly.
                </p>

                <div className="bg-white rounded-xl p-6 shadow-xl">
                  <ul className="space-y-4 mb-6">
                    {["Special Promotions", "Exclusive Market Insights", "Expert Trading Tips"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-gray-400" strokeWidth={3} />
                        <span className="text-sm text-gray-700 font-semibold">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-4">
                    <input 
                      type="email" 
                      placeholder="Email address..." 
                      className="w-full bg-gray-100 border-0 rounded-lg px-4 py-3.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 font-medium"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                      />
                      <span className="text-xs text-gray-500 font-semibold">
                        I agree terms & conditions.
                      </span>
                    </label>
                  </div>

                  <button className="w-full bg-[#50fa7b] hover:bg-[#4ade80] text-[#0a0a0a] font-bold text-sm py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl">
                    Subscribe <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Megaphone Icon */}
              <div className="absolute bottom-[-40px] right-[-40px] w-40 h-40 z-20 pointer-events-none">
                <img 
                  src={MEGAPHONE_ICON} 
                  alt="Megaphone" 
                  className="w-full h-full object-contain drop-shadow-2xl animate-float" 
                />

                 

              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}