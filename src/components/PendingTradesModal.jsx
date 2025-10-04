// PendingTradesModal.jsx - Updated with all three tabs working
import React, { useState, useEffect } from 'react';
import { X  } from 'lucide-react';




const assets = [ // Full assets list from snippet (truncated for brevity, use full from previous)
  { value: 'AEDCNY_otc', label: 'AED/CNY OTC' },
  { value: 'AUDCAD', label: 'AUD/CAD' },
  { value: 'AUDCAD_otc', label: 'AUD/CAD OTC' },
  // ... Add all other assets from previous code (Currencies, Crypto, Commodities, Stocks, Indices)
  { value: 'EURUSD_otc', label: 'EUR/USD OTC' },
  // ... (complete list)
];

function PendingTradesModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('by-time'); // 'by-time', 'by-price', 'current'
  const [selectedAsset, setSelectedAsset] = useState('EURUSD_otc');
  const [openTime, setOpenTime] = useState('2025-10-03T14:25:51');
  const [currentTime, setCurrentTime] = useState(new Date().toISOString().slice(0, 19).replace('T', ' '));
  const [targetPrice, setTargetPrice] = useState(''); // For 'by-price' tab
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [amount, setAmount] = useState(1);
  const [payout, setPayout] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString().slice(0, 19).replace('T', ' '));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const increment = (setter, value, max) => setter(Math.min(value + 1, max));
  const decrement = (setter, value) => setter(Math.max(value - 1, 0));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleBuy = () => {
    let message = `Buy trade placed! Asset: ${selectedAsset}, Amount: $${amount}`;
    if (activeTab === 'by-time') {
      message += `, Timeframe: ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (activeTab === 'by-price') {
      message += `, Target Price: ${targetPrice}`;
    }
    alert(message);
    onClose();
  };

  const handleSell = () => {
    let message = `Sell trade placed! Asset: ${selectedAsset}, Amount: $${amount}`;
    if (activeTab === 'by-time') {
      message += `, Timeframe: ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (activeTab === 'by-price') {
      message += `, Target Price: ${targetPrice}`;
    }
    alert(message);
    onClose();
  };

  if (!isOpen) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'by-time':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm mb-1">Open time</label>
              <div className="flex">
                <input
                  type="datetime-local"
                  value={openTime}
                  onChange={(e) => setOpenTime(e.target.value)}
                  className="bg-zinc-800 flex-1 p-2 rounded-l text-white"
                />
                <span className="bg-zinc-800 p-2 rounded-r flex items-center">🕐</span>
              </div>
              <p className="text-zinc-400 text-xs mt-1">Current time: {currentTime}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Payout</label>
              <div className="flex">
                <span className="bg-zinc-800 px-3 py-2 rounded-l flex items-center">From</span>
                <input
                  type="number"
                  value={payout}
                  onChange={(e) => setPayout(Number(e.target.value))}
                  className="bg-zinc-800 flex-1 p-2 text-center"
                />
                <span className="bg-zinc-800 px-3 py-2 rounded-r flex items-center">%</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Timeframe</label>
              <div className="flex items-center justify-center space-x-1">
                <button onClick={() => increment(setHours, hours, 23)} className="w-6 h-6 bg-zinc-800 rounded">+</button>
                <input type="text" value={hours.toString().padStart(2, '0')} className="w-8 text-center bg-zinc-800" readOnly />
                <span>:</span>
                <button onClick={() => increment(setMinutes, minutes, 59)} className="w-6 h-6 bg-zinc-800 rounded">+</button>
                <input type="text" value={minutes.toString().padStart(2, '0')} className="w-8 text-center bg-zinc-800" readOnly />
                <span>:</span>
                <button onClick={() => increment(setSeconds, seconds, 59)} className="w-6 h-6 bg-zinc-800 rounded">+</button>
                <input type="text" value={seconds.toString().padStart(2, '0')} className="w-8 text-center bg-zinc-800" readOnly />
                <button onClick={() => decrement(setSeconds, seconds)} className="w-6 h-6 bg-zinc-800 rounded">-</button>
                <button onClick={() => decrement(setMinutes, minutes)} className="w-6 h-6 bg-zinc-800 rounded">-</button>
                <button onClick={() => decrement(setHours, hours)} className="w-6 h-6 bg-zinc-800 rounded">-</button>
              </div>
            </div>
          </>
        );
      case 'by-price':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm mb-1">Target Price</label>
              <div className="flex">
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  placeholder="e.g., 1.1725"
                  className="bg-zinc-800 flex-1 p-2 rounded text-white"
                  step="0.0001"
                />
              </div>
              <p className="text-zinc-400 text-xs mt-1">Trade will open when asset price reaches the target</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Payout</label>
              <div className="flex">
                <span className="bg-zinc-800 px-3 py-2 rounded-l flex items-center">From</span>
                <input
                  type="number"
                  value={payout}
                  onChange={(e) => setPayout(Number(e.target.value))}
                  className="bg-zinc-800 flex-1 p-2 text-center"
                />
                <span className="bg-zinc-800 px-3 py-2 rounded-r flex items-center">%</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Timeframe</label>
              <div className="flex items-center justify-center space-x-1">
                <button onClick={() => increment(setHours, hours, 23)} className="w-6 h-6 bg-zinc-800 rounded">+</button>
                <input type="text" value={hours.toString().padStart(2, '0')} className="w-8 text-center bg-zinc-800" readOnly />
                <span>:</span>
                <button onClick={() => increment(setMinutes, minutes, 59)} className="w-6 h-6 bg-zinc-800 rounded">+</button>
                <input type="text" value={minutes.toString().padStart(2, '0')} className="w-8 text-center bg-zinc-800" readOnly />
                <span>:</span>
                <button onClick={() => increment(setSeconds, seconds, 59)} className="w-6 h-6 bg-zinc-800 rounded">+</button>
                <input type="text" value={seconds.toString().padStart(2, '0')} className="w-8 text-center bg-zinc-800" readOnly />
                <button onClick={() => decrement(setSeconds, seconds)} className="w-6 h-6 bg-zinc-800 rounded">-</button>
                <button onClick={() => decrement(setMinutes, minutes)} className="w-6 h-6 bg-zinc-800 rounded">-</button>
                <button onClick={() => decrement(setHours, hours)} className="w-6 h-6 bg-zinc-800 rounded">-</button>
              </div>
            </div>
          </>
        );
      case 'current':
        return (
          <>
            <div className="mb-4">
              <p className="text-zinc-400 text-sm">Trade will open immediately at current market conditions</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Payout</label>
              <div className="flex">
                <span className="bg-zinc-800 px-3 py-2 rounded-l flex items-center">From</span>
                <input
                  type="number"
                  value={payout}
                  onChange={(e) => setPayout(Number(e.target.value))}
                  className="bg-zinc-800 flex-1 p-2 text-center"
                />
                <span className="bg-zinc-800 px-3 py-2 rounded-r flex items-center">%</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Timeframe</label>
              <div className="flex items-center justify-center space-x-1">
                <button onClick={() => increment(setHours, hours, 23)} className="w-6 h-6 bg-zinc-800 rounded">+</button>
                <input type="text" value={hours.toString().padStart(2, '0')} className="w-8 text-center bg-zinc-800" readOnly />
                <span>:</span>
                <button onClick={() => increment(setMinutes, minutes, 59)} className="w-6 h-6 bg-zinc-800 rounded">+</button>
                <input type="text" value={minutes.toString().padStart(2, '0')} className="w-8 text-center bg-zinc-800" readOnly />
                <span>:</span>
                <button onClick={() => increment(setSeconds, seconds, 59)} className="w-6 h-6 bg-zinc-800 rounded">+</button>
                <input type="text" value={seconds.toString().padStart(2, '0')} className="w-8 text-center bg-zinc-800" readOnly />
                <button onClick={() => decrement(setSeconds, seconds)} className="w-6 h-6 bg-zinc-800 rounded">-</button>
                <button onClick={() => decrement(setMinutes, minutes)} className="w-6 h-6 bg-zinc-800 rounded">-</button>
                <button onClick={() => decrement(setHours, hours)} className="w-6 h-6 bg-zinc-800 rounded">-</button>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0a0e18] text-white w-full h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-zinc-700">
        <h2 className="text-lg font-bold">Pending Trades</h2>
        <button onClick={onClose} className="text-zinc-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Tabs */}
      <ul className="flex mb-2 px-4 pt-4 text-sm">
        <li className={`mr-4 px-3 py-1 rounded cursor-pointer ${activeTab === 'by-time' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'}`} onClick={() => handleTabChange('by-time')}>
          By the time
        </li>
        <li className={`mr-4 px-3 py-1 rounded cursor-pointer ${activeTab === 'by-price' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'}`} onClick={() => handleTabChange('by-price')}>
          By the asset price
        </li>
        <li className={`px-3 py-1 rounded cursor-pointer ${activeTab === 'current' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'}`} onClick={() => handleTabChange('current')}>
          Current
        </li>
      </ul>
      <p className="text-zinc-400 mb-4 px-4 text-sm">
        {activeTab === 'by-time' && 'Make a trade at the specified time'}
        {activeTab === 'by-price' && 'Make a trade when the asset reaches the specified price'}
        {activeTab === 'current' && 'Make a trade immediately'}
      </p>

      {/* Common Fields */}
      <div className="px-4 mb-4">
        <label className="block text-sm mb-1">Asset</label>
        <select
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
          className="w-full bg-zinc-800 p-2 rounded text-white"
        >
          {assets.map((asset) => (
            <option key={asset.value} value={asset.value}>{asset.label}</option>
          ))}
        </select>
      </div>

      <div className="px-4 mb-4">
        <label className="block text-sm mb-1">Amount</label>
        <div className="flex">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="bg-zinc-800 flex-1 p-2 rounded-l text-white"
            min="1"
          />
          <span className="bg-zinc-800 px-3 py-2 rounded-r flex items-center">$</span>
        </div>
      </div>

      {/* Tab-Specific Content */}
      {renderTabContent()}

      {/* Buy/Sell Buttons */}
      <div className="flex space-x-2 px-4 mb-4">
        <button onClick={handleBuy} className="flex-1 bg-green-600 py-2 rounded text-white font-bold hover:bg-green-700">
          ↑ BUY
        </button>
        <button onClick={handleSell} className="flex-1 bg-red-600 py-2 rounded text-white font-bold hover:bg-red-700">
          ↓ SELL
        </button>
      </div>

      {/* Info */}
      <p className="text-zinc-400 text-xs px-4">You should have enough balance at the time of making a trade. The actual payout rate at the moment of making a trade will be applied.</p>
    </div>
  );
}

export default PendingTradesModal;