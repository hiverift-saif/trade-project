import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Gift,
  Layers,
  Wallet,
  RotateCcw,
  History,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Shield,
  X,
  User,
  CreditCard,
  Bell,
  Headphones,
  Settings,
  Globe,
  LogIn,
} from "lucide-react";

function TopBar({
  balance,
  setBalance,
  onToggleTradeMobile,
  onToggleLeftSidebar,
}) {
  const navigate = useNavigate();
  const formatMoney = (num) => num.toFixed(2);
  const [userData, setUserData] = useState(null);

  const [showAccountPanel, setShowAccountPanel] = useState(false);
  const [showTopupPanel, setShowTopupPanel] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const dropdownRef = useRef(null);

  // 🔹 AccountTopupForm states
  const [paymentMethod, setPaymentMethod] = useState("Tether (USDT) TRC-20");
  const [amount, setAmount] = useState("30");
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);

  // 🔹 Payment methods list
  const paymentMethods = [
    { name: "Tether (USDT) TRC-20", icon: "💵", desc: "Crypto deposit" },
    { name: "Bitcoin (BTC)", icon: "₿", desc: "Secure blockchain payment" },
    { name: "Ethereum (ETH)", icon: "Ξ", desc: "Fast crypto transfer" },
    { name: "Credit Card", icon: "💳", desc: "Visa / MasterCard accepted" },
    { name: "UPI", icon: "📱", desc: "Instant UPI payment" },
    { name: "Google Pay (GPay)", icon: "🅶", desc: "Pay via Google Pay" },
    { name: "PhonePe", icon: "📲", desc: "Pay via PhonePe wallet" },
    { name: "Binance Pay", icon: "🏦", desc: "Pay using Binance wallet" },
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  // 🔹 Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowAccountPanel(false);
        setShowTopupPanel(false);
        setShowProfilePanel(false);
        setIsPaymentDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header
      className="h-14 bg-[#1c202e] border-b border-zinc-800/50 flex items-center justify-between px-3 sm:px-4 shadow-md z-[100] relative select-none"
      ref={dropdownRef}
    >
      {/* === LEFT SIDE === */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleLeftSidebar}
          className="md:hidden text-zinc-400 hover:text-white transition-all duration-200 p-1"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* === RIGHT SIDE === */}
      <div className="flex items-center gap-2 sm:gap-3 relative">
        {/* 🎁 Bonus Button */}
        <button className="hidden sm:flex px-3 py-1.5 rounded-lg bg-sky-600/20 text-sky-300 text-xs hover:bg-sky-600/30 items-center gap-2 transition-all duration-200 border border-sky-600/30">
          <Gift size={14} />
          <span>Get 50% Bonus</span>
        </button>

        {/* 💰 Balance Dropdown */}
        <div
          onClick={() => {
            setShowAccountPanel((prev) => !prev);
            setShowTopupPanel(false);
            setShowProfilePanel(false);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 text-zinc-200 text-sm font-semibold cursor-pointer hover:bg-zinc-700 transition-all duration-200 border border-zinc-700/50"
        >
          <span className="text-emerald-400">$</span>
          {formatMoney(balance)}
          <span className="text-zinc-500 text-xs hidden sm:inline ml-1">{selectedCurrency}</span>
          {showAccountPanel ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronDown size={14} className="text-zinc-400" />}
        </div>

        {/* 🧾 ACCOUNT PANEL MODAL */}
        {showAccountPanel && (
          <div className="absolute top-12 right-0 w-[92vw] sm:w-80 bg-[#1e2330] border border-zinc-700 rounded-xl shadow-2xl p-4 space-y-3 z-[9999] animate-in fade-in slide-in-from-top-2">
            
            {/* Real Account Card */}
            <div className="bg-[#151922] rounded-lg p-3 border border-zinc-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-500/30">
                    <Layers size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-zinc-300 text-xs uppercase font-bold tracking-wide">Real Account</h3>
                    <p className="text-white text-base font-bold">$0.00</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <button onClick={() => navigate("/finance/deposit")} className="col-span-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg py-2 text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                  <Wallet size={14} /> DEPOSIT
                </button>
                <button className="bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-lg flex items-center justify-center transition-colors">
                  <RotateCcw size={16} />
                </button>
                <button className="bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-lg flex items-center justify-center transition-colors">
                  <History size={16} />
                </button>
              </div>
            </div>

            {/* Demo Account */}
            <div className="bg-[#151922] rounded-lg p-3 flex items-center gap-3 border border-zinc-800 hover:border-zinc-600 cursor-pointer transition-colors group">
              <div className="w-9 h-9 bg-zinc-700 rounded-lg flex items-center justify-center group-hover:bg-zinc-600 transition-colors">
                <GraduationCap size={18} className="text-zinc-400 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-zinc-400 text-xs uppercase font-bold">Demo Account</h3>
                <p className="text-zinc-300 text-sm font-semibold">$50,000.00</p>
              </div>
            </div>

            {/* Forex Option */}
            <div className="bg-[#151922] rounded-lg p-3 flex items-center justify-between border border-zinc-800 hover:border-zinc-600 cursor-pointer transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-zinc-700 rounded-lg flex items-center justify-center group-hover:bg-zinc-600 transition-colors">
                  <Shield size={18} className="text-zinc-400 group-hover:text-white" />
                </div>
                <span className="text-zinc-300 text-sm font-semibold">Forex</span>
              </div>
              <ChevronDown size={16} className="text-zinc-500" />
            </div>
          </div>
        )}

        {/* === TOP UP BUTTON === */}
        <button
          onClick={() => {
            setShowTopupPanel((prev) => !prev);
            setShowAccountPanel(false);
            setShowProfilePanel(false);
          }}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 rounded-lg shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
        >
          DEPOSIT
        </button>

        {/* === PROFILE AVATAR === */}
        <button
          onClick={() => {
            setShowProfilePanel((prev) => !prev);
            setShowAccountPanel(false);
            setShowTopupPanel(false);
          }}
          className="w-8 h-8 sm:w-9 sm:h-9 bg-zinc-700 hover:bg-zinc-600 rounded-full flex items-center justify-center text-zinc-300 border border-zinc-600 transition-all active:scale-95"
        >
          <User size={18} />
        </button>

        {/* === 👤 PROFILE MODAL (Fully Responsive & Scrollable) === */}
        {showProfilePanel && (
          <>
            {/* Mobile Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden" onClick={() => setShowProfilePanel(false)} />
            
            <div className="fixed inset-0 md:absolute md:inset-auto md:top-14 md:right-0 z-[9999] flex flex-col md:block">
              <div className="
                w-full h-full md:h-auto md:w-[400px] lg:w-[450px] 
                bg-[#151922] md:border md:border-zinc-700 md:rounded-xl md:shadow-2xl 
                flex flex-col animate-in slide-in-from-right-10 md:slide-in-from-top-2 duration-200
              ">
                
                {/* Header (Fixed) */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-[#151922] shrink-0">
                  <h2 className="text-white text-base font-bold flex items-center gap-2">
                    <User size={18} className="text-indigo-400" /> User Profile
                  </h2>
                  <button onClick={() => setShowProfilePanel(false)} className="p-1.5 bg-zinc-800 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                    <X size={18} />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                  
                  {/* User Info Card */}
                  <div className="bg-[#1e2330] rounded-xl p-4 border border-zinc-700/50 flex flex-col items-center text-center">
                    <div className="relative mb-3">
                      <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center border-2 border-indigo-500 overflow-hidden">
                        <User size={32} className="text-zinc-500" />
                      </div>
                      <div className="absolute bottom-0 right-0 bg-emerald-500 border-2 border-[#1e2330] p-1 rounded-full">
                        <Shield size={10} className="text-white fill-current" />
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-lg">{userData?.name || "Trader"}</h3>
                    <p className="text-zinc-400 text-xs mb-3">ID: {userData?.id || "8839201"}</p>
                    <div className="flex gap-2">
                       <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold rounded border border-emerald-500/20">Verified</span>
                       <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] uppercase font-bold rounded border border-indigo-500/20">Pro</span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#1e2330] p-3 rounded-lg border border-zinc-800">
                      <p className="text-zinc-500 text-xs uppercase font-bold">Balance</p>
                      <p className="text-white font-mono text-sm">${balance.toFixed(2)}</p>
                    </div>
                    <div className="bg-[#1e2330] p-3 rounded-lg border border-zinc-800">
                      <p className="text-zinc-500 text-xs uppercase font-bold">Total Profit</p>
                      <p className="text-emerald-400 font-mono text-sm">+$0.00</p>
                    </div>
                  </div>

                  {/* Menu Links */}
                  <div className="space-y-1">
                    {[
                      { icon: Wallet, label: "Deposit Funds", path: "/finance/deposit", color: "text-emerald-400" },
                      { icon: CreditCard, label: "Withdraw Funds", path: "/finance/withdraw", color: "text-red-400" },
                      { icon: History, label: "Transaction History", path: "/transactions" },
                      { icon: Settings, label: "Account Settings", path: "/settings" },
                      { icon: Headphones, label: "Help & Support", path: "/support" },
                    ].map((item, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => { navigate(item.path); setShowProfilePanel(false); }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#252a3d] text-zinc-300 hover:text-white transition-all group"
                      >
                        <item.icon size={18} className={`group-hover:scale-110 transition-transform ${item.color || "text-zinc-400"}`} />
                        <span className="text-sm font-medium">{item.label}</span>
                        <ChevronDown size={14} className="-rotate-90 ml-auto text-zinc-600 group-hover:text-zinc-400" />
                      </button>
                    ))}
                  </div>

                  {/* Logout */}
                  <button 
                    onClick={handleLogout}
                    className="w-full mt-2 p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center gap-2 transition-colors border border-red-500/20"
                  >
                    <LogIn size={16} />
                    <span className="text-sm font-bold">Sign Out</span>
                  </button>

                </div>
              </div>
            </div>
          </>
        )}

        {/* === 💳 TOP UP MODAL (Fully Responsive & Scrollable) === */}
        {showTopupPanel && (
          <>
             {/* Mobile Backdrop */}
             <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden" onClick={() => setShowTopupPanel(false)} />

             <div className="fixed inset-0 flex items-center justify-center md:items-start md:justify-end md:inset-auto md:absolute md:top-14 md:right-0 z-[9999]">
                <div className="w-[90vw] max-w-[360px] md:w-80 bg-[#1e2330] border border-zinc-700 rounded-xl shadow-2xl flex flex-col max-h-[80vh] md:max-h-none animate-in zoom-in-95 md:zoom-in-100 duration-200">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-zinc-700/50 bg-[#1e2330] shrink-0 rounded-t-xl">
                    <div>
                      <h2 className="text-white text-sm font-bold uppercase tracking-wide">Deposit</h2>
                      <p className="text-zinc-400 text-[10px]">Select payment method</p>
                    </div>
                    <button onClick={() => setShowTopupPanel(false)} className="text-zinc-400 hover:text-white"><X size={18} /></button>
                  </div>

                  {/* Content */}
                  <div className="p-4 overflow-y-auto space-y-4">
                    
                    {/* Method Selector */}
                    <div>
                      <label className="text-zinc-400 text-xs font-bold uppercase mb-2 block">Payment Method</label>
                      <div className="relative">
                        <button 
                          onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
                          className="w-full bg-[#151922] border border-zinc-700 rounded-lg p-3 flex items-center justify-between hover:border-zinc-500 transition-colors"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                             <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-xs border border-emerald-500/30">₮</div>
                             <span className="text-zinc-200 text-sm truncate">{paymentMethod}</span>
                          </div>
                          <ChevronDown size={16} className={`text-zinc-500 transition-transform ${isPaymentDropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        {/* Dropdown Options */}
                        {isPaymentDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-[#151922] border border-zinc-700 rounded-lg shadow-xl z-20 max-h-48 overflow-y-auto">
                            {paymentMethods.map((m, i) => (
                              <button 
                                key={i} 
                                onClick={() => { setPaymentMethod(m.name); setIsPaymentDropdownOpen(false); }}
                                className="w-full flex items-center gap-3 p-3 hover:bg-zinc-800 transition-colors text-left border-b border-zinc-800/50 last:border-0"
                              >
                                <div className="text-lg">{m.icon}</div>
                                <div>
                                  <div className="text-zinc-200 text-sm font-medium">{m.name}</div>
                                  <div className="text-zinc-500 text-[10px]">{m.desc}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Amount Input */}
                    <div>
                      <label className="text-zinc-400 text-xs font-bold uppercase mb-2 block">Amount (USD)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
                        <input 
                          type="number" 
                          value={amount} 
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-[#151922] border border-zinc-700 rounded-lg py-3 pl-8 pr-3 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                        />
                      </div>
                      <div className="flex gap-2 mt-2">
                        {[10, 50, 100, 500].map(v => (
                          <button key={v} onClick={() => setAmount(String(v))} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs py-1.5 rounded border border-zinc-700 transition-colors">
                            ${v}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      onClick={() => {
                        const amt = parseFloat(amount || 0);
                        if(amt > 0) { setBalance(b => b + amt); setShowTopupPanel(false); }
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-emerald-900/20 active:scale-95 transition-all"
                    >
                      PROCEED TO PAY
                    </button>

                  </div>
                </div>
             </div>
          </>
        )}

      </div>
    </header>
  );
}

export default TopBar;