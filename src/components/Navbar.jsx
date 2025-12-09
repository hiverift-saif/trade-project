import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Clock, ChevronRight, Lock, LogIn, UserPlus, LogOut,
  HelpCircle, MessageCircle, BookOpen,
  Search, Globe, ChevronDown, Menu, X, User,
} from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Detect Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Quickstart", path: "/Quickstart" },
    { name: "Free Demo", path: "/freedemo" },
    { name: "Trading" },
    { name: "Affiliates", path: "/affiliates" },
    { name: "About Us", path: "/aboutus" },
    { name: "Blog", path: "/blog" },
  ];

  const handleTradingClick = () => {
    const token = localStorage.getItem("tp_user_token");
    if (!token) {
      localStorage.setItem("redirect_to", "/trading");
      window.location.href = "/login";
    } else {
      window.location.href = "/trading";
    }
  };

  // Styles
  const dropdownCardStyle = "absolute top-full left-0 mt-5 w-80 bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 border-t-4 border-[#50fa7b] z-[2000]";
  const dropdownItemStyle = "flex items-start gap-4 p-5 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer group/item last:border-0";
  const dropdownTitleStyle = "font-heading font-bold text-xl text-[#000420] mb-1 group-hover/item:text-[#50fa7b] transition-colors";
  const dropdownSubStyle = "text-sm text-slate-500 font-medium";
  const iconBoxStyle = "mt-1 text-[#50fa7b] transform group-hover/item:translate-x-1 transition-transform duration-300";

  return (
    <div className="font-sans">
      
      {/* --- CSS ANIMATION FOR SMOOTH SLIDE --- */}
      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-in-out forwards;
        }
      `}</style>

      {/* Main Container Wrapper with Requested Gradient */}
      <div className="w-full bg-gradient-to-r from-[#041379] to-[#000315] rounded-2xl relative shadow-2xl">

        {/* =================== TOP HEADER COMMENTED ================== */}

        {/*
        <div className={`hidden lg:block border-b border-white/5 bg-[#ffffff0d] transition-all duration-300 ${
          isScrolled ? "opacity-0 invisible h-0 overflow-hidden" : "opacity-100 visible"
        }`}>
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">

              <div className="flex items-center gap-10">
                <Link to="/" className="text-3xl font-heading font-bold text-white tracking-tight flex items-center gap-1">
                  Trade<span className="text-[#50fa7b]">Bro</span>
                </Link>

                <div className="relative group">
                  <div className="flex items-center gap-4 bg-white/5 px-5 py-2.5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition">
                    <div className="text-[#50fa7b]"><Clock size={20} strokeWidth={2.5} /></div>
                    <div className="leading-tight text-left">
                      <span className="block text-[11px] uppercase text-slate-400 font-bold tracking-widest font-heading">Stock:</span>
                      <span className="block text-sm font-bold text-white mt-1">9.30 am to 4.00 pm</span>
                    </div>
                  </div>

                  <div className={dropdownCardStyle}>
                    <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>
                    <ul className="flex flex-col py-2">
                      <li className={dropdownItemStyle}><div className={iconBoxStyle}><ChevronRight size={24} strokeWidth={3} /></div><div><h4 className={dropdownTitleStyle}>Stock Market</h4><p className={dropdownSubStyle}>9.30 am to 4.00 pm</p></div></li>
                      <li className={dropdownItemStyle}><div className={iconBoxStyle}><ChevronRight size={24} strokeWidth={3} /></div><div><h4 className={dropdownTitleStyle}>Forex Market</h4><p className={dropdownSubStyle}>Open 24/5</p></div></li>
                      <li className={dropdownItemStyle}><div className={iconBoxStyle}><ChevronRight size={24} strokeWidth={3} /></div><div><h4 className={dropdownTitleStyle}>Commodities</h4><p className={dropdownSubStyle}>8.00 am to 5.00 pm</p></div></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 p-1.5 rounded-full flex items-center border border-white/5">
                <button className="bg-[#50fa7b] text-[#051509] px-7 py-2 rounded-full text-xs font-heading font-bold shadow-lg transition hover:bg-white tracking-wide">CLIENTS</button>
                <button className="text-slate-300 px-7 py-2 rounded-full text-xs font-heading font-bold hover:text-white transition tracking-wide">PARTNERS</button>
              </div>

              <div className="flex items-center gap-10">

                <div className="relative group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="text-[#50fa7b] bg-white/5 p-2.5 rounded-lg border border-white/10"><Lock size={20} /></div>
                    <div>
                      <h3 className="text-white font-heading font-bold text-base leading-tight">My Portal</h3>
                      <p className="text-xs text-slate-400 group-hover:text-[#50fa7b] transition font-medium mt-0.5">Login - or - Register</p>
                    </div>
                  </div>
                </div>

                <div className="relative group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="text-[#50fa7b] bg-white/5 p-2.5 rounded-lg border border-white/10"><HelpCircle size={20} /></div>
                    <div>
                      <h3 className="text-white font-heading font-bold text-base leading-tight">Help Center</h3>
                      <p className="text-xs text-slate-400 group-hover:text-[#50fa7b] transition font-medium mt-0.5">Get Support</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
        */}

        {/* =================== MAIN NAVBAR ================== */}
        <header
          className={`w-full border-b border-white/10 shadow-lg backdrop-blur-md z-[50]
            ${isScrolled 
              ? "fixed top-0 left-0 bg-gradient-to-r from-[#041379]/95 to-[#000315]/95 animate-slideDown shadow-2xl"
              : "relative bg-transparent"
            }
          `}
        >
          <div className="container mx-auto px-1 h-24 flex justify-between items-center gap-3">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-[#50fa7b] rounded-xl flex items-center justify-center shadow-lg shadow-[#50fa7b]/20 transform group-hover:rotate-12 transition">
                <span className="text-white font-heading font-bold text-sm">TP</span>
              </div>
              <span className="text-3xl font-heading font-bold text-white tracking-tight">
                Trade<span className="text-[#50fa7b]">Pro</span>
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) =>
                link.name === "Trading" ? (
                  <button key="Trading" onClick={handleTradingClick} className="text-base font-heading font-bold uppercase tracking-wider text-slate-300 hover:text-[#50fa7b] transition-colors relative group py-2">
                    Trading <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#50fa7b] transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ) : (
                  <Link key={link.name} to={link.path} className="text-base font-heading font-bold uppercase tracking-wider text-slate-300 hover:text-[#50fa7b] transition-colors relative group py-2">
                    {link.name} <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#50fa7b] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )
              )}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-1.5 text-slate-400 hover:text-white cursor-pointer transition group">
                <Globe size={20} className="group-hover:text-[#50fa7b] transition" /> 
                <span className="text-xs font-heading font-bold uppercase tracking-wider">En</span> 
                <ChevronDown size={14} />
              </div>
              <button className="text-slate-400 hover:text-[#50fa7b] transition transform hover:scale-110"><Search size={24} /></button>
              <Link to="/login" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-heading font-bold shadow-md shadow-black/10 transition transform hover:-translate-y-1">
  <div className="bg-white/20 p-1.5 rounded-full"><LogIn size={18} /></div>
  <div className="text-left leading-none">
    <span className="block text-[10px] opacity-90 font-sans font-medium">Welcome</span>
    <span className="block text-sm">Login</span>
  </div>
</Link>

              <Link to="/registration" className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-7 py-3 rounded-lg font-heading font-bold shadow-lg shadow-blue-500/20 transition transform hover:-translate-y-1">
                <div className="bg-white/20 p-1.5 rounded-full"><User size={18} /></div>
                <div className="text-left leading-none"><span className="block text-[10px] opacity-90 font-sans font-medium">Join Now</span><span className="block text-sm">Register</span></div>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button onClick={toggleMenu} className="lg:hidden text-slate-300 hover:text-[#50fa7b] p-2">
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`lg:hidden bg-gradient-to-r from-[#041379] to-[#000315] border-t border-white/10 transition-all duration-300 
            ${isMobileMenuOpen 
              ? "max-h-[calc(100vh-6rem)] overflow-y-auto opacity-100" 
              : "max-h-0 overflow-hidden opacity-0"
            }`}
          >
            <div className="px-6 py-8 space-y-3 pb-20">
              {navLinks.map((link) =>
                link.name === "Trading" ? (
                  <button key="m-trading" onClick={() => { setIsMobileMenuOpen(false); handleTradingClick(); }} className="block w-full text-left text-slate-200 hover:text-[#50fa7b] hover:bg-white/5 px-4 py-4 rounded-xl font-heading font-bold text-lg border-b border-white/5 transition">Trading</button>
                ) : (
                  <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#50fa7b] hover:bg-white/5 px-4 py-4 rounded-xl font-heading font-bold text-lg border-b border-white/5 transition">{link.name}</Link>
                )
              )}

              <div className="grid grid-cols-2 gap-5 mt-8 pt-4 border-t border-white/5">
                <Link to="/login" className="flex items-center justify-center gap-2 border border-slate-600 py-4 rounded-xl text-white font-heading font-bold hover:bg-white/5 transition"><LogIn size={20} /> Login</Link>
                <Link to="/registration" className="flex items-center justify-center gap-2 bg-[#50fa7b] text-[#051509] py-4 rounded-xl font-heading font-bold hover:bg-green-400 transition shadow-lg"><UserPlus size={20} /> Register</Link>
              </div>
            </div>
          </div>
        </header>

      </div>
    </div>
  );
}
