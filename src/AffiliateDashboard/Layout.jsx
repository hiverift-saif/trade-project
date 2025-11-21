import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Search, X, Menu, User, LogOut } from "lucide-react";
import Sidebar from "./Sidebar";
import { navItems } from "./constants/navItems";
import BASE from "../config";

function Layout({ children, pageTitle }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState("");
  const [getuser, setUser] = useState();
  // 1. Add state
const [showLevelsPanel, setShowLevelsPanel] = useState(false);
const openLevelsPanel = () => setShowLevelsPanel(true);

  const [balance, setBalance] = useState(
    localStorage.getItem("balance")
      ? parseFloat(localStorage.getItem("balance"))
      : 0
  );
  const [fetching, setFetching] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchBalance = async () => {
    setFetching(true);
    const token = localStorage.getItem("affiliate_token");

    if (!token) {
      navigate("/affiliateLogin");
      return;
    }

    try {
      const response = await fetch(`${BASE.BASE_URL}/wallets/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("affiliate_token");
        navigate("/affiliateLogin");
        return;
      }

      const result = await response.json();

      if (result?.wallets && Array.isArray(result.wallets)) {
        const usdWallet = result.wallets.find((w) => w.asset === "USD");
        if (usdWallet) {
          setBalance(usdWallet.available);
          localStorage.setItem("balance", usdWallet.available);
        } else {
          setBalance(0);
          localStorage.setItem("balance", 0);
        }
      } else {
        setBalance(0);
        localStorage.setItem("balance", 0);
      }
    } catch (err) {
      console.error("❌ Balance fetch failed:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("affiliate_token");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        console.error("User data parse error");
      }
    }
    fetchBalance();
  }, []);

  const handleDeposit = async () => {
    setError("");

    if (!depositAmount || depositAmount <= 0) {
      setError("Please enter a valid amount!");
      return;
    }

  // ✅ ADD THIS
  if (parseFloat(depositAmount) < 10) {
    setError("Minimum deposit amount is $10!");
    return;
  }

    if (!paymentMethod) {
      setError("Please select a payment method!");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BASE.BASE_URL}/wallets/credit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          asset: "USD",
          amount: parseFloat(depositAmount),
        }),
      });

      const result = await response.json();

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (response.ok) {
        await fetchBalance();
        alert(`✅ $${depositAmount} successfully deposited!`);
        setShowDeposit(false);
        setDepositAmount("");
        setPaymentMethod("");
      } else {
        setError(result.message || "Deposit failed. Try again.");
      }
    } catch (err) {
      console.error("Deposit error:", err);
      setError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const updatedNavItems = navItems.map((item) => ({
    ...item,
    active: item.link === location.pathname,
  }));

  const handleProfileClick = () => {
    setProfileOpen(false);
    navigate("/Profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
    localStorage.removeItem("affiliate_user");
    setProfileOpen(false);
    navigate("/affiliateLogin");
  };

  const staticDepositHistory = [
    {
      id: "TXN938493",
      method: "UPI",
      amount: 500,
      fee: 0,
      netAmount: 500,
      status: "success",
      date: "2025-01-16T14:22:00",
      reference: "UPI-283749239842-KJH23",
      gateway: "Razorpay",
      remarks: "Deposit credited successfully",
    },
    {
      id: "TXN938482",
      method: "Bank Transfer",
      amount: 2000,
      fee: 10,
      netAmount: 1990,
      status: "pending",
      date: "2025-01-14T17:55:00",
      reference: "NEFT-998374632918",
      gateway: "HDFC",
      remarks: "Waiting for bank confirmation",
    },
  ];




  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-xs sm:text-sm">

      <div className="flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-80 md:w-64 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-900/50 backdrop-blur-xl md:bg-gray-900/70`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 flex justify-between items-center md:justify-center">
              <h2 className="text-sm text-white md:hidden">Menu</h2>
              <button
                onClick={toggleSidebar}
                className="md:hidden text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar navItems={updatedNavItems} />
          </div>
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main */}
        <div className="relative flex-1 md:ml-64 transition-all duration-300 text-xs sm:text-sm">

          {/* Top Navbar */}
          <div className="bg-gray-900/50 border-b border-gray-800 sticky top-0 z-10 backdrop-blur-xl">
            <div className="px-4 sm:px-6 py-3 sm:py-4">

              <div className="flex flex-col md:flex-row items-center justify-between gap-3">

                {/* Mobile Header */}
                <div className="flex w-full items-center justify-between md:hidden">
                  <button onClick={toggleSidebar} className="text-white">
                    <Menu className="w-5 h-5" />
                  </button>
                  <h1 className="text-sm font-semibold text-white">
                    {pageTitle}
                  </h1>
                  <div className="w-5" />
                </div>

                {/* Desktop */}
                <div className="flex w-full flex-col sm:flex-row items-center justify-end gap-3">

                  {/* Search Bar */}
                  {/* <div className="w-full sm:max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        className="w-full h-9 sm:h-10 rounded-md border px-3 py-1.5 pl-10 text-[10px] sm:text-xs md:text-sm bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="Find client by UID"
                      />
                    </div>
                  </div> */}

                  {/* Balance + Profile */}
                  <div className="flex items-center  gap-2 relative text-[10px] sm:text-xs md:text-sm">

                    <div className="relative group">
                      <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700/80 rounded-xl px-2 py-2 sm:px-4 sm:py-3 shadow-md backdrop-blur-md text-white">
                        
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-blue-600/10 border border-blue-700/30">
                            <svg
                              className="w-3 h-3 text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M12 1v22M5 5h14M5 19h14" />
                            </svg>
                          </div>
                          <p className="text-[9px] sm:text-[11px] uppercase text-gray-400">
                            Available Balance
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-base sm:text-lg md:text-xl font-bold">
                            {fetching ? "Loading..." : `$${balance.toFixed(2)}`}
                          </p>
                          <button
                            onClick={() => setShowDeposit(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-[9px] sm:text-xs md:text-sm font-semibold px-2 sm:px-3 py-1.5 rounded-lg"
                          >
                            Deposit
                          </button>
                        </div>

                      </div>
                    </div>

{/* level 1 button  */}
<button
    onClick={() => setShowLevelsPanel(true)}
    className="text-white text-sm md:text-md uppercase font-bold hover:text-purple-400 transition"
  >
    LEVEL-1
  </button>

                    {/* Profile */}
                    <div className="relative">
                      <button
                        onClick={toggleProfile}
                        className="ml-2 p-2 rounded-lg hover:bg-gray-800 text-white"
                      >
                        <User className="w-5 h-5" />
                      </button>

                      {profileOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-gray-900 rounded-lg shadow-lg border border-gray-700 text-white text-xs">
                          <div className="flex items-center gap-3 p-3 border-b border-gray-700">
                            <img
                              src="https://flagcdn.com/w40/in.png"
                              className="w-6 h-4 rounded-sm"
                            />
                            <p>{getuser?.email}</p>
                          </div>

                          <ul className="p-2">
                            <li>
                              <Link to="/profile">
                                <button
                                  onClick={handleProfileClick}
                                  className="w-full flex items-center gap-2 py-2 px-2 hover:bg-gray-800"
                                >
                                  <User className="w-4 h-4" /> Profile
                                </button>
                              </Link>
                            </li>
                            <li>
                              <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 py-2 px-2 hover:bg-gray-800 text-red-400"
                              >
                                <LogOut className="w-4 h-4" /> Logout
                              </button>
                            </li>
                          </ul>

                        </div>
                      )}

                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Page Content */}
          <main className="p-4 sm:p-6 md:p-8 text-xs sm:text-sm">
            <h1 className="text-base sm:text-lg md:text-xl text-white font-semibold mb-6 hidden md:block">
              {pageTitle}
            </h1>
            {children}
          </main>

        </div>
      </div>

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 text-xs sm:text-sm">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-xl text-white relative">

            <button
              onClick={() => {
                setShowDeposit(false);
                setError("");
                setDepositAmount("");
                setPaymentMethod("");
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-base sm:text-lg font-semibold mb-4 text-center">
              Deposit Funds
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-xs">
                {error}
              </div>
            )}

            <div className="space-y-4">

              <div>
                <label className="block text-[11px] sm:text-sm text-gray-400 mb-1">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg bg-gray-800 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error && (!depositAmount || depositAmount <= 0)
                      ? "border-red-500"
                      : "border-gray-700"
                  }`}
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-sm text-gray-400 mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                >
                  <option value="">Select Method</option>
                  <option value="upi">UPI</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="crypto">Crypto (USDT)</option>
                </select>
              </div>

              <button
                onClick={handleDeposit}
                disabled={loading}
                className={`w-full py-2 rounded-lg font-semibold text-xs sm:text-sm ${
                  loading
                    ? "bg-blue-800 cursor-not-allowed opacity-70"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Processing..." : "Confirm Deposit"}
              </button>

            </div>

            <h3 className="text-sm sm:text-base font-semibold mt-6 mb-3">
              Recent Deposit History
            </h3>

            <div className="max-h-64 overflow-y-auto bg-gray-800/40 border border-gray-700 rounded-xl p-3">
              {staticDepositHistory.map((item, index) => (
                <div
                  key={index}
                  className="p-3 mb-3 rounded-lg bg-gray-900/60 border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm sm:text-base font-semibold text-white">
                      ${item.amount}
                    </p>
                    <span
                      className={`px-2 py-1 text-[9px] sm:text-xs rounded-lg ${
                        item.status === "success"
                          ? "bg-green-700 text-green-200"
                          : item.status === "pending"
                          ? "bg-yellow-700 text-yellow-200"
                          : "bg-red-700 text-red-200"
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-gray-300 text-[9px] sm:text-xs space-y-1">
                    <p><span className="text-gray-400">Transaction ID:</span> {item.id}</p>
                    <p><span className="text-gray-400">Method:</span> {item.method}</p>
                    <p><span className="text-gray-400">Gateway:</span> {item.gateway}</p>
                    <p><span className="text-gray-400">Reference:</span> {item.reference}</p>
                    <p><span className="text-gray-400">Date:</span> {new Date(item.date).toLocaleString()}</p>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      )}



      {/* Affiliate Levels Panel */}
 <div className="">
  <button
    onClick={() => setShowLevelsPanel(true)}
    className="text-white text-sm md:text-md uppercase font-bold hover:text-purple-400 transition"
  >
    LEVEL-1
  </button>

  {/* Slide-in Panel */}
  {showLevelsPanel && (
    <div className="absolute right-2 top-30 w-70 md:w-100 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 animate-slideInRight">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-500 rounded-full p-1">
              <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold">Affiliate Levels</h3>
          </div>
          <button
            onClick={() => setShowLevelsPanel(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-400 text-xs mb-3">
          Increase deposits to unlock higher rewards!
        </p>

        {/* Levels */}
{/* Levels Table */}
<div className="overflow-x-auto">
  <table className="w-full text-xs bg-gray-800 rounded-lg overflow-hidden">
    <thead className="bg-gray-700 text-gray-200">
      <tr>
        <th className="p-2 text-left">Level</th>
        <th className="p-2 text-left">Revenue</th>
        <th className="p-2 text-left">Turnover</th>
        <th className="p-2 text-left">Deposits</th>
        <th className="p-2 text-left">FTD</th>
      </tr>
    </thead>

    <tbody>
      {[
        { name: 'Level 1', revenue: '35.00%', turnover: '2.00%', deposits: '0', ftd: '0-2' },
        { name: 'Level 2', revenue: '50.00%', turnover: '2.00%', deposits: '0', ftd: '2-19' },
        { name: 'Level 3', revenue: '60.00%', turnover: '2.00%', deposits: '0', ftd: '19-30' },
        // { name: 'Level 4', revenue: '70.00%', turnover: '2.00%', deposits: '0', ftd: '30-50' },
        // { name: 'Level 5', revenue: '80.00%', turnover: '2.00%', deposits: '0', ftd: '50-999' },
      ].map((lvl, idx) => (
        <tr
          key={lvl.name}
          className={`${idx % 2 ? "bg-gray-900" : "bg-gray-800"} hover:bg-gray-700 transition`}
        >
          <td className="p-2 text-purple-400 font-medium">{lvl.name}</td>
          <td className="p-2 text-gray-300">{lvl.revenue}</td>
          <td className="p-2 text-gray-300">{lvl.turnover}</td>
          <td className="p-2 text-gray-300">{lvl.deposits}</td>
          <td className="p-2 text-gray-300">{lvl.ftd}</td>
        </tr>
      ))}

      {/* Level 6 Row */}
      <tr className="bg-gradient-to-b from-black via-gray-900 to-black">
        <td className="p-2 text-white font-medium">Level 6</td>
        <td className="p-2 text-white"> </td>
        <td className="p-2 text-white"></td>
        <td className="p-2 text-white"></td>
        <td className="p-2 text-white">Contact manager</td>
      </tr>
    </tbody>
  </table>
</div>



        <button
          onClick={() => setShowLevelsPanel(false)}
          className="mt-4 w-full bg-gradient-to-b from-black via-gray-900 to-black text-white text-xs font-medium py-2 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  )}
</div>
    </div>




  );
}


<style jsx>{`
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .animate-slideInRight {
    animation: slideInRight 0.3s ease-out;
  }
`}</style>
export default Layout;
