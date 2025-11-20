import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import MetricsCard from "./MetricsCard";
import BalanceCard from "./BalanceCard";
import CommissionsCard from "./CommissionsCard";
import { UserPlus, Link2, Loader2 } from "lucide-react";
import apiClient from "../api/apiClient";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import BASE from "../config";

function Dashboard() {
  const [filter, setFilter] = useState("day");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



const fetchDashboardData = async () => {
  setLoading(true);

  const token = localStorage.getItem("affiliate_token");
  const user = JSON.parse(localStorage.getItem("affiliate_user"));

  if (!user || !user.id) {
    setError("User not found");
    setLoading(false);
    return;
  }

  try {
    const res = await apiClient.get(
      `/admin/dashboard/${user.id}`,   
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.statusCode === 200) {
      const list = res.data.result;

      setDashboardData({
        affiliate: {
          code: list.code,
          totalCommission: list.totalCommission,
          totalReferrals: list.totalReferrals,
          withdrawable: list.withdrawable,
          referredUsers: list.referredUsers,
        },
      });

      setError(null);
    } else {
      setError("Failed to load affiliate dashboard");
    }
  } catch (err) {
    console.error("Dashboard API Error:", err);
    setError("Unable to load data");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchDashboardData();
  }, []);

  const { affiliate = {} } = dashboardData || {};
  const {
    totalCommission = 0,
    totalReferrals = 0,
    withdrawable = 0,
    code = "N/A",
  } = affiliate;

  const chartData = {
    day: [
      { name: "Mon", commission: 20 },
      { name: "Tue", commission: 35 },
      { name: "Wed", commission: 40 },
      { name: "Thu", commission: 25 },
      { name: "Fri", commission: 50 },
      { name: "Sat", commission: 30 },
      { name: "Sun", commission: 45 },
    ],
    week: [
      { name: "Week 1", commission: 150 },
      { name: "Week 2", commission: 200 },
      { name: "Week 3", commission: 180 },
      { name: "Week 4", commission: 220 },
    ],
    month: [
      { name: "Jan", commission: 800 },
      { name: "Feb", commission: 650 },
      { name: "Mar", commission: 900 },
      { name: "Apr", commission: 1200 },
      { name: "May", commission: 1100 },
      { name: "Jun", commission: 950 },
    ],
  };

  const metricsData = [
    {
      title: "Registered Referrals",
      value: totalReferrals.toString(),
      icon: UserPlus,
      iconColor: "text-blue-500",
    },
    {
      title: "Referral Code",
      value: code,
      icon: Link2,
      iconColor: "text-green-500",
    },
  ];

  const balanceMetrics = [
    { label: "Withdrawable", value: `$${withdrawable.toFixed(2)}` },
    { label: "Total Commission", value: `$${totalCommission.toFixed(2)}` },
    { label: "Total Referrals", value: totalReferrals.toString() },
  ];

  return (
    <Layout pageTitle="Dashboard">
      <div className="space-y-4 sm:space-y-6">
        {error && (
          <div className="p-3 bg-red-900/40 border border-red-700 text-red-300 text-sm rounded-lg">
            ⚠️ {error}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center h-16">
            <Loader2 className="w-5 h-5 mr-2 text-blue-400 animate-spin" />
            <p className="text-gray-300 text-sm">Loading dashboard data...</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 ">
          {metricsData.map((metric) => (
            <MetricsCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              iconColor={metric.iconColor}
            />
          ))}
        </div>

        <BalanceCard metrics={balanceMetrics} />

        <div className="mt-4 sm:mt-6">
          <CommissionsCard amount={`$${totalCommission.toFixed(2)}`} />
        </div>

        <div className="bg-gray-900/70 p-4 sm:p-6 rounded-2xl border border-gray-800 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              Commission Overview
            </h3>

            <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-0">
              {["day", "week", "month"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    filter === f
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData[filter]}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="commission"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 sm:mt-6 flex justify-between items-center">
            <span className="text-gray-400 text-sm sm:text-base">
              Withdrawable Balance
            </span>
            <span className="text-xl sm:text-2xl font-bold text-green-400">
              ${withdrawable.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
