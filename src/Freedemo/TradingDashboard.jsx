import React, { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import TradeClosed from "../Freedemo/TradeClosed"
import { useNavigate } from "react-router-dom";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
} from "chart.js";
import { TrendingUp, TrendingDown } from "lucide-react";

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
);

export default function TradingDashboard() {

const [investment, setInvestment] = useState(null);
const [tradeTime, setTradeTime] = useState(null);
const [selectedAsset, setSelectedAsset] = useState(null);
const [isOpen, setIsOpen] = useState(false);
const [step, setStep] = useState(0);
const [demoFinished, setDemoFinished] = useState(false);

const assetRef = useRef(null);
const timeRef = useRef(null);
const investmentRef = useRef(null);
const tradeRef = useRef(null);

const assets = [
{ name: "EUR/USD OTC", percent: "92%" },
{ name: "GBP/USD", percent: "88%" },
{ name: "USD/JPY", percent: "85%" },
{ name: "BTC/USD", percent: "95%" },
{ name: "ETH/USD", percent: "90%" },
{ name: "Gold", percent: "87%" },
{ name: "Silver", percent: "83%" },
{ name: "Oil", percent: "89%" }
];

const guideSteps = [
"Welcome! Let’s start your demo.",
"Wallet balance is $1000.00.",
"Select an asset to trade.",
"Choose the trade time.",
"Set your investment amount.",
"Payout Information + Continue.",
"Demo completed!"
];

useEffect(() => {
const refs = [null, null, assetRef, timeRef, investmentRef, tradeRef];
if (refs[step] && refs[step].current) {
refs[step].current.scrollIntoView({ behavior: "smooth", block: "center" });
}
}, [step]);

const selectAsset = (asset) => {
setSelectedAsset(asset);
setIsOpen(false);
};

// const nextStep = () => {
// if (step === 2 && !selectedAsset) return;
// if (step === 3 && !tradeTime) return;
// if (step === 4 && !investment) return;

// if (step < guideSteps.length - 1) {
// setStep(step + 1);
// } else {
// setDemoFinished(true);
// }
// };




// inside component
const navigate = useNavigate();

const nextStep = () => {
  if (step === 2 && !selectedAsset) return;
  if (step === 3 && !tradeTime) return;
  if (step === 4 && !investment) return;

  if (step < guideSteps.length - 1) {
    setStep(step + 1);
  } else {
    // Instead of setDemoFinished, redirect to trade closed page
    navigate("/trade-closed");
  }
};

    
const prevStep = () => {
if (step > 0) setStep(step - 1);
};

const chartData = {
labels: Array.from({ length: 50 }, (_, i) => i),
datasets: [
{
label: selectedAsset || "Select Asset",
data: Array.from({ length: 50 }, (_, i) =>
200 + Math.sin(i / 5) * 20 + Math.random() * 10
),
borderColor: "#00BFFF", // Dark Sky Blue line
backgroundColor: (context) => {
const chart = context.chart;
const { ctx, chartArea } = chart;

if (!chartArea) {
return null;
}

const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
gradient.addColorStop(0, "rgba(0, 191, 255, 0.4)"); // Dark Sky Blue top
gradient.addColorStop(0.5, "rgba(0, 191, 255, 0.2)");
gradient.addColorStop(1, "rgba(0, 191, 255, 0)"); // Transparent bottom
return gradient;
},
borderWidth: 2,
pointRadius: 0,
fill: true,
tension: 0.3
}
]
};

const chartOptions = {
responsive: true,
maintainAspectRatio: false,
scales: {
x: { display: false },
y: {
grid: { color: "rgba(255,255,255,0.1)" },
ticks: { color: "#9CA3AF" }
}
},
plugins: {
legend: { display: false },
tooltip: {
backgroundColor: "#111827",
titleColor: "#fff",
bodyColor: "#00BFFF"
}
}
};

return (
<div className="bg-gradient-to-b from-gray-900 to-black min-h-screen p-4">
<div className="max-w-7xl mx-auto space-y-6">

{/* Header */}
<div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg">
<div className="flex items-center space-x-4">
<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center shadow">
<span className="text-white font-bold text-lg">TP</span>
</div>
<span className="text-white font-bold text-2xl">Trade Pro Dashboard</span>
</div>
<div className="bg-gray-700 px-4 py-2 rounded-lg shadow text-green-400 font-semibold text-lg">
$1000.00
</div>
</div>

{/* Main Content */}
<div className="flex flex-col lg:flex-row gap-6">

{/* Chart Section */}
<div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg">
{/* Asset Selector */}

<div ref={assetRef} className={`relative ${step === 2 ? "ring-4 ring-blue-500 rounded-md" : ""}`}>
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium shadow"
  >
    {selectedAsset || "Select Asset"}
  </button>



{isOpen && (
<div className="absolute top-12 left-0 bg-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto w-full z-50">
{assets.map((asset, idx) => (
<button
key={idx}
onClick={() => selectAsset(asset.name)}
className="w-full px-4 py-2 flex justify-between hover:bg-gray-600 text-white"
>
{asset.name}
<span className="text-green-400 font-semibold">{asset.percent}</span>
</button>
))}
</div>
)}
</div>

{/* Chart */}
<div className="mt-6 bg-gray-900 p-4 rounded-lg shadow-inner">
<div className="flex items-center mb-4">
<TrendingUp className="w-6 h-6 text-green-400" />
<span className="text-white font-bold text-lg ml-2">{selectedAsset || "Select Asset"}</span>
</div>
<div className="w-full h-[350px]">
<Line data={chartData} options={chartOptions} />
</div>
</div>

{/* Demo Guide */}
<div className="mt-6 bg-gray-700 p-4 rounded-lg shadow">
<h3 className="text-white font-bold text-lg mb-2">Demo Guide</h3>
<p className="text-gray-300 mb-4">{guideSteps[step]}</p>
<div className="flex justify-center space-x-2 mb-4">
{guideSteps.map((_, i) => (
<span
key={i}
className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ${i === step ? "bg-blue-500 scale-125" : "bg-gray-600 hover:bg-gray-500"}`}
onClick={() => setStep(i)}
/>
))}
</div>
<div className="flex justify-between">
<button onClick={prevStep} disabled={step === 0} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded disabled:opacity-50">
Back
</button>
<button onClick={nextStep} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
{step === guideSteps.length - 1 ? "Finish" : "Continue"}
</button>
</div>
</div>

{demoFinished && (
  
<div className="mt-4 p-4 bg-green-600 text-white font-bold rounded-lg text-center shadow">
🎉 Your trade is closed. Demo complete!     
</div>
)}
</div>

{/* Right Controls */}
<div className="w-full lg:w-80 space-y-6">
{/* Trade Time */}
<div ref={timeRef} className={`${step === 3 ? "ring-4 ring-blue-500 rounded-md" : ""} bg-gray-800 p-4 rounded-lg shadow`}>
<label className="text-gray-300 text-sm font-medium mb-2 block">Trade Time</label>
<div className="grid grid-cols-2 gap-2">
{[30, 60, 120, 300].map((time) => (
<button
key={time}
onClick={() => setTradeTime(time)}
className={`px-4 py-2 rounded-lg text-white font-medium ${tradeTime === time ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"}`}
>
{time}s
</button>
))}
</div>
</div>

{/* Investment */}
<div ref={investmentRef} className={`${step === 4 ? "ring-4 ring-blue-500 rounded-md" : ""} bg-gray-800 p-4 rounded-lg shadow`}>
<label className="text-gray-300 text-sm font-medium mb-2 block">Investment Amount</label>
<div className="grid grid-cols-2 gap-2">
{["50", "100", "250", "500"].map((amount) => (
<button
key={amount}
onClick={() => setInvestment(amount)}
className={`px-4 py-2 rounded-lg font-medium ${investment == amount ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
>
${amount}
</button>
))}
</div>
</div>

{/* Payout Info */}
<div ref={tradeRef} className={`${step === 5 ? "ring-4 ring-blue-500 rounded-md" : ""} bg-gray-800 p-4 rounded-lg shadow`}>
<h4 className="text-white font-semibold mb-2">Payout Information</h4>
<div className="flex justify-between mb-1">
<span className="text-gray-300">Investment:</span>
<span className="text-white">${investment || 0}</span>
</div>
<div className="flex justify-between mb-1">
<span className="text-gray-300">Potential Profit:</span>
<span className="text-green-400">+${investment ? (investment * 0.92).toFixed(2) : "0.00"}</span>
</div>
<div className="flex justify-between border-t border-gray-600 pt-2">
<span className="text-gray-300">Total Return:</span>
<span className="text-white font-semibold">${investment ? (investment * 1.92).toFixed(2) : "0.00"}</span>
</div>

<button onClick={nextStep} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold">
Continue
</button>

<div className="space-y-2 mt-4">
<button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded flex items-center justify-center gap-2 font-semibold">
<TrendingUp /> BUY
</button>
<button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded flex items-center justify-center gap-2 font-semibold">
<TrendingDown /> SELL
</button>
</div>
</div>
</div>
</div>
</div>
</div>
);
}