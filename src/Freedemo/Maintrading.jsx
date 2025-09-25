import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Gift, User, ChartColumn, DollarSign, Bell, Target, 
  PieChart, CreditCard, Settings, CircleQuestionMark, Star,
  ChevronDown, TrendingUp, TrendingDown
} from 'lucide-react';

const Maintrading = () => {
  const [currentPrice, setCurrentPrice] = useState(1.17447);
  const [timeLeft, setTimeLeft] = useState(60);
  const [amount, setAmount] = useState(10);
  const [activeTab, setActiveTab] = useState('15m');
  const [balance] = useState(49990);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => prev + (Math.random() - 0.5) * 0.001);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 60);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateChartData = () => {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * 800;
      const y = 200 + Math.sin(i * 0.1) * 100 + Math.random() * 50;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  const chartData = generateChartData();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-white rounded-md hover:bg-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">TP</span>
              </div>
              <span className="text-white font-semibold text-lg">Trade Pro</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-300">GET 50% BONUS</span>
            </div>
            <div className="bg-gray-700 px-4 py-2 rounded-lg">
              <span className="text-green-400 font-semibold">${balance.toLocaleString()}</span>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium">
              TOP UP
            </button>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-6 space-y-6">
          {[
            ChartColumn, DollarSign, Bell, Target, PieChart, 
            CreditCard, Settings, CircleQuestionMark
          ].map((Icon, index) => (
            <button key={index} className="w-10 h-10 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </button>
          ))}
          
          <div className="flex-1" />
          
          <div className="bg-blue-600 rounded-lg p-2 text-center">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center mb-1">
              <Star className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-xs text-white">POCKET</span>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Main Chart Area */}
          <div className="flex-1 p-6">
            <div className="mb-4">
              <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-3 w-fit">
                <span className="text-white font-medium">EUR/USD OTC</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 h-[500px] relative">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white font-mono text-xl">
                  {currentPrice.toFixed(5)}
                </div>
                <div className="flex space-x-2">
                  {['1m', '5m', '15m', '1h', '4h'].map((interval) => (
                    <button
                      key={interval}
                      onClick={() => setActiveTab(interval)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        activeTab === interval 
                          ? 'bg-gray-700 text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {interval}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full h-[400px] relative bg-gray-900 rounded">
                <svg className="w-full h-full" viewBox="0 0 800 400">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <g stroke="#374151" strokeWidth="1" opacity="0.3">
                    {[0, 100, 200, 300, 400, 500, 600, 700, 800].map(x => (
                      <line key={x} x1={x} y1="0" x2={x} y2="400" />
                    ))}
                    {[0, 100, 200, 300, 400].map(y => (
                      <line key={y} x1="0" y1={y} x2="800" y2={y} />
                    ))}
                  </g>
                  
                  {/* Chart Line */}
                  <polyline
                    points={chartData}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  
                  {/* Animated dot at the end */}
                  <circle cx="800" cy="200" r="4" fill="#10b981" className="animate-pulse" />
                </svg>
              </div>
            </div>
          </div>

          {/* Trading Panel */}
          <div className="w-80 bg-gray-800 border-l border-gray-700 p-6">
            {/* Timer */}
            <div className="mb-6">
              <div className="bg-gray-700 rounded-lg p-3 text-center">
                <div className="text-gray-300 text-sm mb-1">Time ⏰</div>
                <div className="text-white font-mono text-lg">
                  00:{timeLeft.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-400 text-xs">+92%</div>
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-6">
              <label className="text-gray-300 text-sm mb-2 block">Amount</label>
              <div className="bg-gray-700 rounded-lg p-3">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-transparent text-white text-lg font-mono outline-none"
                />
              </div>
              <div className="text-gray-400 text-sm mt-1">
                Profit: +{Math.round(amount * 0.9)}
              </div>
            </div>

            {/* Buy/Sell Buttons */}
            <div className="space-y-3 mb-6">
              <button 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 text-lg rounded-lg flex items-center justify-center gap-2 transition-colors"
                disabled={timeLeft === 0}
              >
                <TrendingUp className="w-5 h-5" />
                BUY
              </button>
              <button 
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 text-lg rounded-lg flex items-center justify-center gap-2 transition-colors"
                disabled={timeLeft === 0}
              >
                <TrendingDown className="w-5 h-5" />
                SELL
              </button>
            </div>

            {/* Trades Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">Trades</span>
                <div className="flex space-x-4 text-sm">
                  <span className="text-blue-400">Opened</span>
                  <span className="text-gray-400">Closed</span>
                </div>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-medium">EUR/USD OTC</span>
                    <span className="text-xs px-2 py-1 rounded bg-blue-600 text-white">
                      ACTIVE
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>SELL</span>
                    <span>${amount}</span>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3 opacity-75">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-medium">GBP/USD OTC</span>
                    <span className="text-xs px-2 py-1 rounded bg-green-600 text-white">
                      WON
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>BUY</span>
                    <span>+$18</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintrading;