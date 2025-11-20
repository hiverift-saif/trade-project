// src/AffiliateDashboard/Analytics.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Layout from "./Layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, MousePointer, DollarSign, Percent, Loader2 } from "lucide-react";
import BASE from "../config";

export default function Analytics() {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
   const response = await axios.get(`${BASE.BASE_URL}/analytics`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

        console.log("API DATA 👉", response.data);
        setRawData(response.data.result || []);
      } catch (err) {
        setError("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Summary (no duplication)
  const summary = useMemo(() => {
    let clicks = 0,
      signups = 0,
      earnings = 0;

    rawData.forEach((item) => {
      clicks += item.clicks;
      signups += item.signups;
      earnings += item.earnings;
    });

    const conversionRate =
      clicks > 0 ? ((signups / clicks) * 100).toFixed(1) : 0;

    return {
      clicks,
      signups,
      conversionRate,
      earnings: earnings.toFixed(2),
    };
  }, [rawData]);

  // 📊 CHART DATA — NO DUPLICATE COUNTING
  const chartData = useMemo(() => {
    return rawData
      .map((item) => ({
        date: new Date(item.date).toISOString().split("T")[0],
        clicks: item.clicks,
        signups: item.signups,
        earnings: item.earnings,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [rawData]);

  // Loading
  if (loading) {
    return (
      <Layout pageTitle="Analytics">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <span className="ml-3 text-gray-400">Loading...</span>
        </div>
      </Layout>
    );
  }

  // Error
  if (error) {
    return (
      <Layout pageTitle="Analytics">
        <div className="p-6 text-red-400">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Analytics">
      <div className="space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-gray-900 border border-gray-800 flex items-center gap-4">
            <MousePointer className="text-blue-400 w-8 h-8" />
            <div>
              <p className="text-gray-400 text-sm">Total Clicks</p>
              <h3 className="text-white text-xl font-semibold">
                {summary.clicks.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-gray-900 border border-gray-800 flex items-center gap-4">
            <Users className="text-green-400 w-8 h-8" />
            <div>
              <p className="text-gray-400 text-sm">Total Signups</p>
              <h3 className="text-white text-xl font-semibold">
                {summary.signups.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-gray-900 border border-gray-800 flex items-center gap-4">
            <Percent className="text-yellow-400 w-8 h-8" />
            <div>
              <p className="text-gray-400 text-sm">Conversion Rate</p>
              <h3 className="text-white text-xl font-semibold">
                {summary.conversionRate}%
              </h3>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-gray-900 border border-gray-800 flex items-center gap-4">
            <DollarSign className="text-purple-400 w-8 h-8" />
            <div>
              <p className="text-gray-400 text-sm">Total Earnings</p>
              <h3 className="text-white text-xl font-semibold">
                ${summary.earnings}
              </h3>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="text-white text-lg font-semibold mb-4">
            Performance Overview
          </h3>
          {chartData.length === 0 ? (
            <p className="text-gray-500">No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="signups"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#a855f7"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          <div className="text-gray-400 text-sm mt-2 flex gap-4">
            <span className="text-blue-400">● Clicks</span>
            <span className="text-green-400">● Signups</span>
            <span className="text-purple-400">● Earnings</span>
          </div>
        </div>

        {/* Earnings Breakdown */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 overflow-x-auto">
          <h3 className="text-white text-lg font-semibold mb-4">
            Earnings Breakdown
          </h3>
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Users Referred</th>
                <th className="text-left p-2">Commission</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rawData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No earnings data available
                  </td>
                </tr>
              ) : (
                rawData
                  .filter((item) => item.earnings > 0)
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((item, i) => {
                    const date = new Date(item.date).toLocaleDateString("en", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });

                    const status =
                      item.earnings >= 50 ? "Paid" : "Pending";

                    return (
                      <tr
                        key={i}
                        className="border-b border-gray-800 hover:bg-gray-800/50 transition"
                      >
                        <td className="p-2">{date}</td>
                        <td className="p-2">{item.signups}</td>
                        <td className="p-2">${item.earnings.toFixed(2)}</td>
                        <td
                          className={`p-2 font-medium ${
                            status === "Paid"
                              ? "text-green-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {status}
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
