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
  Eye,
  RefreshCw,
  AlertTriangle,
  CreditCard,
  Bell,
  Headphones,
  Newspaper,
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
  const [email, setEmail] = useState("");
  const [hasPromoCode, setHasPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState("");
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

    navigate("/login"); // redirect to login page
  };
  return (
    <header
  className="h-14 bg-[#1c202e] border-b border-zinc-800/50 flex items-center justify-between px-4 shadow-md z-50 relative"
  ref={dropdownRef}
>
      {/* === LEFT SIDE === */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleLeftSidebar}
          className="md:hidden text-zinc-400 hover:text-white transition-all duration-200"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* === RIGHT SIDE === */}
      <div className="flex items-center gap-2 relative">
        {/* 🎁 Bonus Button */}
        <button className="px-3 py-1 rounded-lg bg-sky-600/20 text-sky-300 text-sm hover:bg-sky-600/30 flex items-center gap-2 transition-all duration-200">
          <Gift size={16} />
          <span className="hidden sm:inline">Get 50% Bonus</span>
        </button>

        {/* 💰 Balance Dropdown */}
        <div
          onClick={() => {
            setShowAccountPanel((prev) => !prev);
            setShowTopupPanel(false);
            setShowProfilePanel(false);
          }}
          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-zinc-800 text-zinc-200 text-sm font-medium cursor-pointer hover:bg-zinc-700 transition-all duration-200 relative"
        >
          ${formatMoney(balance)}
          <span className="text-zinc-400 ml-1">{selectedCurrency}</span>
          {showAccountPanel ? (
            <ChevronUp size={16} className="text-zinc-400 ml-1" />
          ) : (
            <ChevronDown size={16} className="text-zinc-400 ml-1" />
          )}
        </div>

        {/* 🧾 ACCOUNT PANEL */}
        {showAccountPanel && (
          <div className="absolute top-12 right-20 bg-slate-900 border border-slate-700 rounded-xl shadow-lg w-80 p-4 space-y-3 z-50 animate-fadeInDown">
            {/* QT Real Account */}
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                    <Layers className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-semibold">
                      QT Real
                    </h3>
                    <p className="text-white text-lg font-bold">$0</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigate("/finance/deposit");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium text-sm"
                >
                  <Wallet className="w-4 h-4" />
                  Top up
                </button>

                <button className="w-11 h-11 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center border border-slate-600">
                  <RotateCcw className="w-4 h-4 text-slate-300" />
                </button>
                <button className="w-11 h-11 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center border border-slate-600">
                  <History className="w-4 h-4 text-slate-300" />
                </button>
              </div>
            </div>

            {/* QT Demo Account */}
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-slate-300 text-sm font-medium">
                    QT Demo
                  </h3>
                  <p className="text-slate-400 text-base">$50,000</p>
                </div>
              </div>
            </div>

            {/* Forex Dropdown */}
            <button className="w-full bg-slate-700/30 hover:bg-slate-700/50 rounded-lg p-4 flex items-center justify-between transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-slate-300 text-sm font-medium">Forex</h3>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-400" />
            </button>

            {/* My Safe Section */}
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="text-slate-300 text-sm font-medium">
                    My Safe
                  </h3>
                </div>
                <button className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-medium rounded transition-colors">
                  Open
                </button>
              </div>
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
          className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-500 transition-all duration-200 font-medium"
        >
          TOP UP
        </button>

        {/* === PROFILE BUTTON === */}
        <button
          onClick={() => {
            setShowProfilePanel((prev) => !prev);
            setShowAccountPanel(false);
            setShowTopupPanel(false);
          }}
          className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors flex items-center gap-2"
        >
          <User size={18} />
          {/* <span className="text-sm">{userData?.name || "User"}</span> */}
        </button>

        {/* === PROFILE PANEL === */}
        {showProfilePanel && (
          <div className="absolute right-20 top-[36px] w-[40vw] max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-y-auto max-h-[79vh] animate-fadeInDown p-6">
            <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-3">
              <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-slate-400" /> User Profile
              </h2>
              <button
                onClick={() => setShowProfilePanel(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 👤 Profile Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center border-4 border-emerald-500 relative overflow-hidden">
                        <User className="w-12 h-12 text-slate-400" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>

                    {/* 🔥 USER DETAILS HERE */}
                    <div className="flex-1 space-y-2">
                      {/* User Name */}
                      <h2 className="text-white text-lg font-semibold">
                        {userData?.name || "User"}
                      </h2>

                      {/* Role */}
                      <p className="text-slate-400 text-sm">
                        {userData?.role || "Member"}
                      </p>

                      {/* Email */}
                      <p className="text-slate-400 text-sm flex items-center gap-1">
                        <span className="text-slate-500">📧</span>
                        {userData?.email || "Not Provided"}
                      </p>

                      {/* Mobile */}
                      <p className="text-slate-400 text-sm flex items-center gap-1">
                        <span className="text-slate-500">📱</span>
                        {userData?.mobile || "Not Provided"}
                      </p>

                      {/* Balance */}
                      <p className="text-slate-400 text-sm flex items-center gap-1">
                        <span className="text-slate-500">💰</span>$
                        {balance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-white font-semibold mb-4">
                    Real Account Statistics:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-slate-300 text-sm">
                      <span>Trades:</span> <span>0</span>
                    </div>
                    <div className="flex justify-between text-slate-300 text-sm">
                      <span>Turnover:</span> <span>0</span>
                    </div>
                    <div className="flex justify-between text-slate-300 text-sm">
                      <span>Profit:</span> <span>0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel Menu */}
              <div className="space-y-2">
                {[
                  {
                    icon: <Wallet />,
                    label: "Deposit",
                    route: "/finance/deposit",
                  },
                  {
                    icon: <CreditCard />,
                    label: "Withdrawal",
                    route: "/finance/withdraw",
                  },
                  {
                    icon: <Bell />,
                    label: "Notifications",
                    route: "/notifications",
                  },
                  { icon: <Headphones />, label: "Support", route: "/support" },
                  { icon: <Settings />, label: "Settings", route: "/settings" },
                  { icon: <Globe />, label: "Language", route: "/language" },
                  { icon: <LogIn />, label: "Log out", route: "logout" }, // special flag
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={
                      () =>
                        item.label === "Log out"
                          ? handleLogout() // 🔥 logout call
                          : navigate(item.route) // normal navigate
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800
                 hover:bg-slate-700 rounded-lg transition-colors border
                 border-slate-700 text-slate-300"
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === TOP UP PANEL === */}
        {showTopupPanel && (
          <div className="absolute right-20 top-[56px] w-[350px] bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-2xl animate-fadeInDown z-50">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-white text-lg font-semibold">
                  Quick account top-up
                </h2>
                <p className="text-slate-400 text-sm">
                  Make a deposit to start earning
                </p>
              </div>
              <button
                onClick={() => setShowTopupPanel(false)}
                className="text-slate-400 hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Payment Dropdown */}
            <div className="mb-4">
              <label className="text-white text-sm mb-2 block">
                Payment Method
              </label>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsPaymentDropdownOpen(!isPaymentDropdownOpen)
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 flex items-center justify-between hover:bg-slate-650 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-xs">
                      ₮
                    </div>
                    <span className="text-slate-200 text-sm">
                      {paymentMethod}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isPaymentDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown List */}
                {isPaymentDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-20 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 p-2 space-y-2 animate-fadeInDown">
                    {paymentMethods.map((method, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setPaymentMethod(method.name);
                          setIsPaymentDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-all duration-150 border border-slate-700/70 shadow-sm"
                      >
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg font-medium shadow-inner ${
                            method.name.includes("UPI")
                              ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                              : method.name.includes("Google Pay")
                              ? "bg-gradient-to-br from-blue-500 to-sky-500 text-white"
                              : method.name.includes("PhonePe")
                              ? "bg-gradient-to-br from-purple-500 to-indigo-600 text-white"
                              : method.name.includes("Binance")
                              ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-black"
                              : method.name.includes("Tether")
                              ? "bg-gradient-to-br from-teal-500 to-emerald-500 text-white"
                              : method.name.includes("Bitcoin")
                              ? "bg-gradient-to-br from-orange-500 to-yellow-500 text-white"
                              : method.name.includes("Ethereum")
                              ? "bg-gradient-to-br from-indigo-400 to-indigo-600 text-white"
                              : "bg-slate-600 text-white"
                          }`}
                        >
                          {method.icon}
                        </div>

                        <div className="flex flex-col items-start">
                          <span className="text-slate-200 text-sm font-medium">
                            {method.name}
                          </span>
                          <span className="text-slate-400 text-xs">
                            {method.desc || "Instant deposit"}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className="text-white text-sm mb-2 block">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500 transition-colors pr-8"
                  placeholder="30"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  $
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-white text-sm mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                placeholder="Email"
              />
            </div>

            {/* Promo Code */}
            <div className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                checked={hasPromoCode}
                onChange={(e) => setHasPromoCode(e.target.checked)}
                className="w-4 h-4 bg-slate-700 border border-slate-600 rounded accent-teal-500"
              />
              <span className="text-slate-300 text-sm">
                I have a promo code
              </span>
            </div>

            {hasPromoCode && (
              <div className="mb-5">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-slate-500 transition-colors"
                  placeholder="Enter promo code"
                />
              </div>
            )}

            {/* Submit */}
            <button
              onClick={() => {
                const amt = parseFloat(amount || 0);
                if (amt > 0) {
                  setBalance((b) => b + amt);
                  setShowTopupPanel(false);
                }
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Continue and pay ${amount || "0"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopBar;
