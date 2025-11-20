// src/components/LeftSidebar.jsx
import React, { useState, useEffect } from "react";
import {
  BarChart2,
  ArrowDownCircle,
  Coins,
  User,
  Briefcase,
  Trophy,
  MessageSquare,
  HelpCircle,
  Gift,
  Rocket,
  X,
  GraduationCap,
  FileText,
  Activity,
  Globe,
  DollarSign,
  Lock,
  ChevronRight,
  Search,
  MessageCircle,
  Users,
  Headphones,
  BookOpen,
  ThumbsUp,
  Grid3x3,
  Send,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Music,
  LogIn,
  UserPlus,
} from "lucide-react";
import IconTab from "./IconTab";
import { useLocation, useNavigate } from "react-router-dom";

function LeftSidebar({
  isOpen,
  onClose,
  activeMenu,
  setActiveMenu,
  setShowLeftSidebar,
  setShowSignals,
  setShowSocialModal,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-open Finance menu when on finance routes
  useEffect(() => {
    if (location.pathname.startsWith("/finance")) {
      setActiveMenu("Finance");
    }
  }, [location.pathname, setActiveMenu]);

  const items = [
    { icon: BarChart2, label: "Trading" },
    { icon: Coins, label: "Finance" },
    { icon: User, label: "Profile" },
    // { icon: Briefcase, label: "Market" },
    // { icon: Trophy, label: "Achievements" },
    // { icon: MessageSquare, label: "Chat" },
    // { icon: HelpCircle, label: "Help" },
  ];

  const tradingSubMenu = [
    {
      icon: Coins,
      label: "Quick Trading Real Account",
      route: "/registration",
    },
    {
      icon: GraduationCap,
      label: "Quick Trading Demo Account",
      route: "/registration",
    },
    {
      icon: FileText,
      label: "Shares Trading Real Account",
      route: "/registration",
    },
    {
      icon: FileText,
      label: "Shares Trading Demo Account",
      route: "/registration",
    },
    { icon: Activity, label: "Forex MT4 Real Account", route: "/registration" },
    { icon: Activity, label: "Forex MT4 Demo Account", route: "/registration" },
    { icon: Globe, label: "Forex MT5 Real Account", route: "/registration" },
    { icon: Globe, label: "Forex MT5 Demo Account", route: "/registration" },
  ];

  const financeSubMenu = [
    {
      icon: Coins,
      label: "Deposit",
      route: "/finance/deposit",
      active:
        location.pathname === "/finance/deposit" ||
        location.pathname === "/finance",
    },
    {
      icon: ArrowDownCircle,
      label: "Withdraw",
      route: "/finance/withdraw",
      active: location.pathname === "/finance/withdraw",
    },
    {
      icon: DollarSign,
      label: "History",
      route: "/finance/history",
      active: location.pathname === "/finance/history",
    },
    // {
    //   icon: DollarSign,
    //   label: "Cashback",
    //   route: "/finance/cashback",
    //   active: location.pathname === "/finance/cashback",
    // },
    // {
    //   icon: DollarSign,
    //   label: "Promo codes",
    //   route: "/finance/promocodes",
    //   active: location.pathname === "/finance/promocodes",
    // },
    // {
    //   icon: DollarSign,
    //   label: "My Safe",
    //   route: "/finance/mysafe",
    //   active: location.pathname === "/finance/mysafe",
    // },
  ];

  const profileSubMenu = [
    {
      icon: User,
      label: "Profile",
      route: "/profile/Profile",
      active: location.pathname === "/profile/Profile",
    },
    {
      icon: User,
      label: "Trading Profile",
      route: "/profile/Trading-Profile",
      active: location.pathname === "/profile/Trading-Profile",
    },
    {
      icon: Lock,
      label: "Trading History",
      route: "/profile/Trading-History",
      active: location.pathname === "/profile/Trading-History",
    },
  ];

  const marketSubMenu = [
    {
      icon: Briefcase,
      label: "Stock Market",
      route: "/market/Stock-Market",
      active: location.pathname === "/market/Stock-Market",
    },
    {
      icon: Globe,
      label: "Purchases & Gifts",
      route: "/market/Purchases-Gifts",
      active: location.pathname === "/market/Purchases-Gifts",
    },
    {
      icon: Globe,
      label: "Gem Lottery",
      route: "/market/Gem-Lottery",
      active: location.pathname === "/market/Gem-Lottery",
    },
    {
      icon: Globe,
      label: "Social rewards",
      route: "/market/Social-rewards",
      active: location.pathname === "/market/Social-rewards",
    },
    {
      icon: Globe,
      label: "Gems mining",
      route: "/market/Gems-mining",
      active: location.pathname === "/market/Gems-mining",
    },
  ];

  const achievementsSubMenu = [
    {
      icon: Trophy,
      label: "Achievement",
      route: "/achievements/Achievement",
      active: location.pathname === "/achievements/Achievement",
    },
    {
      icon: Trophy,
      label: "History",
      route: "/achievements/History",
      active: location.pathname === "/achievements/History",
    },
    {
      icon: Trophy,
      label: "Rating",
      route: "/achievements/Rating",
      active: location.pathname === "/achievements/Rating",
    },
    {
      icon: Trophy,
      label: "Community help",
      route: "/achievements/Community-help",
      active: location.pathname === "/achievements/Community-help",
    },
  ];

  const renderSubMenu = (menu) => {
    if (menu === "Chat") {
      return (
        <div
          className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-[#0b1520] border-r border-zinc-800/50 p-0 shadow-lg transition-transform duration-300 overflow-hidden z-60 ${
            isOpen && activeMenu === menu
              ? "translate-x-0"
              : "-translate-x-full"
          } md:static md:w-80 md:flex md:flex-col md:${
            activeMenu === menu ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <div className="flex items-center gap-2 flex-1">
              <Search size={20} className="text-zinc-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-white placeholder-zinc-400 outline-none"
              />
            </div>
            <button
              onClick={() => setActiveMenu(null)}
              className="text-zinc-400 hover:text-white ml-2"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex border-b border-zinc-800">
            <button className="flex-1 py-3 text-center text-white font-medium border-b-2 border-blue-500">
              Chats (2)
            </button>
            <button className="flex-1 py-3 text-center text-zinc-400 font-medium">
              Notifications (2)
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex items-start gap-3 p-3 bg-zinc-900/50 rounded-lg cursor-pointer hover:bg-zinc-800/50 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium truncate">
                    Support Chat (Online)
                  </h3>
                  <span className="text-xs text-zinc-400 ml-2">
                    26 Sep, 15:09
                  </span>
                </div>
                <p className="text-sm text-zinc-300 truncate mt-1">
                  Welcome to the Support Chat! Here you can...
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-zinc-500">1</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-zinc-900/50 rounded-lg cursor-pointer hover:bg-zinc-800/50 transition-colors">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Users size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium truncate">
                    EN General chat (English)
                  </h3>
                  <span className="text-xs text-zinc-400 ml-2">12:26</span>
                </div>
                <p className="text-sm text-zinc-300 truncate mt-1">
                  Go to profile section, complete account v.13053
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (menu === "Help") {
      return (
        <div
          className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-[#0b1520]border-r border-zinc-800/50 p-0 shadow-lg transition-transform duration-300 overflow-y-auto z-60 ${
            isOpen && activeMenu === menu
              ? "translate-x-0"
              : "-translate-x-full"
          } md:static md:w-80 md:flex md:flex-col md:${
            activeMenu === menu ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center justify-between mb-4 px-4 pt-4 md:hidden">
            <div className="text-white font-bold text-lg">Help Options</div>
            <button
              onClick={() => setActiveMenu(null)}
              className="text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <ul className="flex flex-col h-full gap-0">
            <li>
              <div
                className="flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-indigo-900/50 transition-all duration-200 border-b border-zinc-800"
                onClick={() => {
                  navigate("/help/support-service");
                  setActiveMenu(null);
                }}
              >
                <Headphones size={20} className="text-blue-300" />
                <span className="flex-1">Support Service</span>
              </div>
            </li>
            <li>
              <div
                className="flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-indigo-900/50 transition-all duration-200 border-b border-zinc-800"
                onClick={() => {
                  navigate("/help/guides-tutorials");
                  setActiveMenu(null);
                }}
              >
                <BookOpen size={20} className="text-blue-300" />
                <span className="flex-1">Guides and Tutorials</span>
              </div>
            </li>
            <li>
              <div
                className="flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-indigo-900/50 transition-all duration-200 border-b border-zinc-800"
                onClick={() => {
                  navigate("/help/reviews");
                  setActiveMenu(null);
                }}
              >
                <ThumbsUp size={20} className="text-blue-300" />
                <span className="flex-1">Reviews</span>
              </div>
            </li>
            <li>
              <div
                className="flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-indigo-900/50 transition-all duration-200 border-b border-zinc-800"
                onClick={() => {
                  navigate("/help/support-chat");
                  setActiveMenu(null);
                }}
              >
                <MessageSquare size={20} className="text-blue-300" />
                <span className="flex-1">Support Chat</span>
              </div>
            </li>
            <li>
              <div
                className="flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-indigo-900/50 transition-all duration-200 border-b border-zinc-800"
                onClick={() => {
                  navigate("/help/apps");
                  setActiveMenu(null);
                }}
              >
                <Grid3x3 size={20} className="text-blue-300" />
                <span className="flex-1">Apps</span>
              </div>
            </li>
            <li className="px-4 py-3 border-b border-zinc-800">
              <div className="text-white font-medium mb-3">
                Official channels:
              </div>
              <div className="flex gap-2 mb-4">
                <button
                  className="w-10 h-10 bg-zinc-700 rounded flex items-center justify-center hover:bg-zinc-600 transition-colors"
                  onClick={() =>
                    window.open("https://t.me/yourchannel", "_blank")
                  }
                >
                  <Send size={16} className="text-blue-400" />
                </button>
                <button
                  className="w-10 h-10 bg-zinc-700 rounded flex items-center justify-center hover:bg-zinc-600 transition-colors"
                  onClick={() =>
                    window.open("https://discord.gg/yourserver", "_blank")
                  }
                >
                  <MessageCircle size={16} className="text-indigo-400" />
                </button>
              </div>
            </li>
            <li className="px-4 py-3">
              <div className="text-white font-medium mb-3">Follow us on:</div>
              <div className="flex gap-2 flex-wrap">
                <button
                  className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center hover:bg-zinc-600 transition-colors"
                  onClick={() =>
                    window.open("https://facebook.com/yourpage", "_blank")
                  }
                >
                  <Facebook size={14} className="text-blue-500" />
                </button>
                <button
                  className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center hover:bg-zinc-600 transition-colors"
                  onClick={() =>
                    window.open("https://t.me/yourchannel", "_blank")
                  }
                >
                  <Send size={14} className="text-blue-400" />
                </button>
                <button
                  className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center hover:bg-zinc-600 transition-colors"
                  onClick={() =>
                    window.open("https://instagram.com/yourpage", "_blank")
                  }
                >
                  <Instagram size={14} className="text-pink-500" />
                </button>
                <button
                  className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center hover:bg-zinc-600 transition-colors"
                  onClick={() =>
                    window.open("https://x.com/yourhandle", "_blank")
                  }
                >
                  <Twitter size={14} className="text-blue-400" />
                </button>
                <button
                  className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center hover:bg-zinc-600 transition-colors"
                  onClick={() =>
                    window.open("https://youtube.com/yourchannel", "_blank")
                  }
                >
                  <Youtube size={14} className="text-red-500" />
                </button>
                <button
                  className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center hover:bg-zinc-600 transition-colors"
                  onClick={() =>
                    window.open("https://tiktok.com/@yourhandle", "_blank")
                  }
                >
                  <Music size={14} className="text-black" />
                </button>
              </div>
            </li>
          </ul>
        </div>
      );
    }

    const subMenus = {
      Trading: tradingSubMenu,
      Finance: financeSubMenu,
      Profile: profileSubMenu,
      Market: marketSubMenu,
      Achievements: achievementsSubMenu,
    };

    if (!subMenus[menu]) return null;

    return (
      <div
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-[#0b1520] border-r border-zinc-800/50 p-0 shadow-lg transition-transform duration-300 overflow-y-auto z-60 ${
          isOpen && activeMenu === menu ? "translate-x-0" : "-translate-x-full"
        } md:static md:w-80 md:flex md:flex-col md:${
          activeMenu === menu ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between mb-4 px-4 pt-4 md:hidden">
          <div className="text-white font-bold text-lg">{menu} Options</div>
          <button
            onClick={() => setActiveMenu(null)}
            className="text-zinc-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <ul className="flex flex-col h-full gap-5">
          {subMenus[menu].map((item, index) => (
            <li key={index}>
              <div
                className={`flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-indigo-900/50 transition-all duration-200 border border-zinc-800 rounded cursor-pointer ${
                  item.active || location.pathname === item.route
                    ? "text-white bg-indigo-900/50"
                    : "bg-[#0a0e18]"
                }`}
                onClick={() => {
                  console.log(`Navigating to ${item.route}`);
                  navigate(item.route);
                  setActiveMenu(null);
                  if (setShowLeftSidebar) setShowLeftSidebar(false);
                  if (setShowSignals) setShowSignals(false);
                  if (setShowSocialModal) setShowSocialModal(false);
                }}
              >
                <item.icon size={20} className="text-blue-300" />
                <span className="flex-1">{item.label}</span>
                {(item.active || location.pathname === item.route) && (
                  <ChevronRight size={16} className="text-white" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-60 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] ${
          isOpen ? "w-64" : "w-20"
        } bg-[#050713] border-r border-zinc-800/50 flex flex-col items-center py-4 gap-2 z-60 shadow-lg transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:w-20 md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 mb-4 w-full">
          <div className="text-white font-bold text-lg">Menu</div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-2 w-full overflow-y-auto h-full">
          {items.map((it, i) => (
            <IconTab
              key={i}
              icon={it.icon}
              label={it.label}
              active={activeMenu === it.label}
              onClick={() => {
                console.log(`Menu clicked: ${it.label}`);
                if (activeMenu === it.label) {
                  setActiveMenu(null);
                } else {
                  setActiveMenu(it.label);
                  if (setShowLeftSidebar && !isOpen) {
                    setShowLeftSidebar(true);
                  }
                }
              }}
            />
          ))}
        </div>

        <div className="mt-auto w-full flex flex-col items-center gap-3 py-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs w-full justify-start px-4 transition-all duration-200">
            <Gift size={16} />
            <span className={`${isOpen ? "inline" : "hidden"}`}>Bonus</span>
          </button>

          <button
            onClick={() => {
              navigate("/Registration");
              if (setShowLeftSidebar) setShowLeftSidebar(false);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600/20 hover:bg-green-600/30 text-green-300 text-xs w-full justify-start px-4 transition-all duration-200"
          >
            <UserPlus size={16} />
            <span className={`${isOpen ? "inline ml-1" : "hidden"}`}>
              Signup
            </span>
          </button>

          <button
            onClick={() => {
              navigate("/login");
              if (setShowLeftSidebar) setShowLeftSidebar(false);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs w-full justify-start px-4 transition-all duration-200"
          >
            <LogIn size={16} />
            <span className={`${isOpen ? "inline ml-1" : "hidden"}`}>
              Login
            </span>
          </button>

          <button
            onClick={() => {
              navigate("/registration");
              if (setShowLeftSidebar) setShowLeftSidebar(false);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-indigo-300 text-xs w-full justify-start px-4 transition-all duration-200"
          >
            <Rocket size={16} />
            <span className={`${isOpen ? "inline ml-1" : "hidden"}`}>
              Upgrade
            </span>
          </button>
        </div>
      </aside>
      {renderSubMenu("Trading")}
      {renderSubMenu("Finance")}
      {renderSubMenu("Profile")}
      {renderSubMenu("Market")}
      {renderSubMenu("Achievements")}
      {renderSubMenu("Chat")}
      {renderSubMenu("Help")}
    </>
  );
}

export default LeftSidebar;
