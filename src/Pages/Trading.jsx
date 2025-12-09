import React, { useEffect, useState } from "react";
import { getOpenTrades, getClosedTrades } from "../api/tradeApi";
import { Routes, Route } from "react-router-dom";
import TopBar from "../components/TopBar";
import LeftSidebar from "../components/LeftSidebar";
import RightRail from "../components/RightRail";
import Toolbar from "../components/Toolbar";

import TradePanel from "../components/TradePanel";
import TradesTabs from "../components/TradesTabs";
import SignalsWidget from "../components/SignalsWidget";
import SocialTrading from "../components/SocialTradingModal";
import QuickTradingRealAccount from "../assets/Trading/QuickTradingRealAccount";
import QuickTradingDemoAccount from "../assets/Trading/QuickTradingDemoAccount";
import SharesTradingRealAccount from "../assets/Trading/SharesTradingRealAccount";
import SharesTradingDemoAccount from "../assets/Trading/SharesTradingDemoAccount";
import ForexMT4RealAccount from "../assets/Trading/ForexMT4RealAccount";
import ForexMT4DemoAccount from "../assets/Trading/ForexMT4DemoAccount";
import ForexMT5RealAccount from "../assets/Trading/ForexMT5RealAccount";
import ForexMT5DemoAccount from "../assets/Trading/ForexMT5DemoAccount";

import PocketOptionChart from "../components/LiveChart";

export default function Trading() {
  const [openTrades, setOpenTrades] = useState([]);
  const [previewExpiry, setPreviewExpiry] = useState(null);
  const [expiryPreview, setExpiryPreview] = useState(null);
  const [amount, setAmount] = useState(10);
  const [seconds, setSeconds] = useState(30);
  const [payout, setPayout] = useState(80);
  const [opened, setOpened] = useState([]);
  const [closed, setClosed] = useState([]);
  const [livePrice, setLivePrice] = useState(null);
  const [assets, setAssets] = useState([]);

  const [activeAsset, setActiveAsset] = useState(null);
  const [seriesData, setSeriesData] = useState([]);
  const [latestPrice, setLatestPrice] = useState(null);
  const [chartType, setChartType] = useState("candles");
  const [timeframe, setTimeframe] = useState("M4");
  const [showSignals, setShowSignals] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [balance, setBalance] = useState(50000);

  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightRail, setShowRightRail] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showTradeMobile, setShowTradeMobile] = useState(false);

  // ⭐ NEW: Chart key for forcing re-render
  const [chartKey, setChartKey] = useState(0);

  const updateExpiryPreview = (seconds) => {
    const expiry = Date.now() + seconds * 1000;
    setPreviewExpiry(expiry);
  };

  const handleTradeAction = (arg) => {
    const isOrder =
      arg && typeof arg === "object" && (arg._id || arg.id || arg.symbol);
    let order;
    if (isOrder) {
      order = {
        id: arg._id || arg.id || Date.now(),
        asset: activeAsset,
        side: arg.side || "BUY",
        amount:
          arg.amount != null
            ? arg.amount
            : arg.price != null
            ? arg.price * (arg.quantity || 1)
            : amount,
        seconds: arg.expiry
          ? Math.max(
              0,
              Math.floor((new Date(arg.expiry).getTime() - Date.now()) / 1000)
            )
          : seconds,
        payout,
        openPrice: arg.price || livePrice,
        expiresAt: arg.expiry
          ? new Date(arg.expiry).getTime()
          : Date.now() + seconds * 1000,
        createdAt: arg.createdAt || new Date().toISOString(),
        raw: arg,
      };
    } else {
      const side = arg;
      order = {
        id: Date.now(),
        asset: activeAsset,
        side,
        amount,
        seconds,
        payout,
        openPrice: livePrice,
        expiresAt: Date.now() + seconds * 1000,
        createdAt: new Date().toISOString(),
      };
    }

    setOpened((prev) => [order, ...prev]);
    loadTrades();

    const timeToExpiry = Math.max(
      0,
      (order.expiresAt || Date.now()) - Date.now()
    );
    if (timeToExpiry > 0) {
      setTimeout(() => {
        setOpened((prev) => prev.filter((t) => t.id !== order.id));
        const closedTrade = {
          id: order.id,
          side: order.side,
          symbol: order.asset?.symbol || order.asset?.id || order.symbol,
          amount: order.amount,
          openPrice: order.openPrice,
          closePrice: livePrice,
          profit:
            Math.random() > 0.5 ? order.amount * 0.8 : -order.amount * 0.8,
          expiresAt: order.expiresAt,
          closedAt: Date.now(),
          payout: order.payout,
        };

        setClosed((prev) => {
          const exists = prev.some(
            (item) => item.id === closedTrade.id || item._id === closedTrade.id
          );
          if (exists) return prev;
          return [closedTrade, ...prev];
        });
      }, timeToExpiry);
    }
  };

  useEffect(() => {
    loadTrades();
  }, []);

  const loadTrades = async () => {
    try {
      const openRes = await getOpenTrades();
      const closedRes = await getClosedTrades();

      const open = openRes?.data?.result?.data || [];
      const closed = closedRes?.data?.result?.data || [];

      const mapped = open.map((t) => {
        const expiry = new Date(t.expiryTime).getTime();
        const now = Date.now();
        const sec = Math.max(0, Math.floor((expiry - now) / 1000));

        return {
          ...t,
          expiresAt: expiry,
          seconds: sec,
        };
      });

      setOpened(mapped);
      setClosed(closed);
    } catch (err) {
      console.error("Trades load error:", err);
    }
  };

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const res = await fetch("https://api.binance.com/api/v3/exchangeInfo");
        const json = await res.json();

        const usdtPairs = json.symbols
          .filter((s) => s.quoteAsset === "USDT" && s.status === "TRADING")
          .slice(0, 40);

        const mapped = usdtPairs.map((s) => ({
          id: s.symbol,
          symbol: `${s.baseAsset}/USDT`,
          precision: s.quantityPrecision,
          payout: 0.9,
        }));

        setAssets(mapped);
        setActiveAsset(mapped[0]);
      } catch (e) {
        console.error("Failed to load Binance assets", e);
      }
    };

    loadAssets();
  }, []);

  useEffect(() => {
    if (!activeAsset) return;
    const initialData = Array.from({ length: 200 }).map((_, i) => {
      const time = Math.floor((Date.now() - (200 - i) * 1000) / 1000) * 1000;
      const prevClose = i === 0 ? 1.167 : seriesData[i - 1]?.close || 1.167;
      const { open, high, low, close } = generateOHLC(prevClose, i);
      return { time, open, high, low, close };
    });
    setSeriesData(initialData);
    setLatestPrice(initialData[initialData.length - 1]?.close);
  }, [activeAsset]);

  const generateOHLC = (prevClose, index) => {
    const baseVolatility = 0.005;
    const volatility = baseVolatility * (1 + 0.2 * Math.sin(index / 25));
    const trend = index % 50 === 0 ? (Math.random() > 0.5 ? 0.015 : -0.015) : 0;
    const open = prevClose + (Math.random() - 0.5) * volatility * 0.5;
    const close = open + (Math.random() - 0.5) * volatility + trend;
    const high = Math.max(open, close) + Math.random() * volatility * 1.5;
    const low = Math.min(open, close) - Math.random() * volatility * 1.5;
    return { open, high, low, close };
  };

  useEffect(() => {
    if (seriesData.length === 0) return;
    const id = setInterval(() => {
      setLatestPrice((prev) => {
        const prevClose =
          prev || seriesData[seriesData.length - 1]?.close || 1.167;
        const { open, high, low, close } = generateOHLC(
          prevClose,
          seriesData.length
        );
        setSeriesData((current) => [
          ...current.slice(-199),
          { time: Date.now(), open, high, low, close },
        ]);
        return close;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [seriesData.length]);

  const onTopUp = () => setBalance((b) => b + 1000);

  const place = async (side) => {
    if (!activeAsset) return;

    const now = new Date();
    const expiry = new Date(now.getTime() + seconds * 1000);

    const payload = {
      userId: "69119a266c6337fc08afa94a",
      type: side.toLowerCase(),
      symbol: activeAsset.apiSymbol || activeAsset.symbol,
      quantity: 1,
      price: latestPrice,
      entryPrice: latestPrice,
      expiryTime: expiry.toISOString(),
      status: "open",
      profitLoss: 0,
      stopLoss: null,
      takeProfit: null,
      txHash: null,
      exitPrice: null,
      closeReason: null,
      isPublic: true,
    };

    try {
      const res = await fetch("https://trade-pro.xyz/api/v1/trades/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("TRADE API RESPONSE", data);

      setOpened((o) => [
        {
          id: data._id || Date.now(),
          side,
          asset: activeAsset,
          amount,
          payout: activeAsset.payout,
          openPrice: latestPrice,
          expiresAt: expiry.getTime(),
          remaining: seconds,
          status: "open",
        },
        ...o,
      ]);
    } catch (err) {
      console.error("Trade API Error:", err);
    }
  };

  // ⭐⭐⭐ FIX: Chart re-render on resize ⭐⭐⭐
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      // Close mobile panel when going to desktop
      if (window.innerWidth >= 768 && showTradeMobile) {
        setShowTradeMobile(false);
      }

      // Debounce chart re-render
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Force chart re-render by changing key
        setChartKey((prev) => prev + 1);
      }, 300);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [showTradeMobile]);

  if (!activeAsset)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070b14] text-white">
        Loading…
      </div>
    );

  return (
<div className="h-screen w-full text-white flex flex-col font-sans antialiased overflow-hidden bg-[#070b14]">     {/* <TopBar
        balance={balance}
        onTopUp={onTopUp}
        onToggleTradeMobile={() => setShowTradeMobile((s) => !s)}
        onToggleLeftSidebar={() => setShowLeftSidebar((s) => !s)}
        onToggleRightRail={() => setShowRightRail((s) => !s)}
      /> */}

      <div className="flex flex-1 min-h-0 pb-0 md:pb-0 relative">
        {/* <LeftSidebar
          isOpen={showLeftSidebar}
          onClose={() => setShowLeftSidebar(false)}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setShowLeftSidebar={setShowLeftSidebar}
          setShowSignals={setShowSignals}
          setShowSocialModal={setShowSocialModal}
        /> */}

        <main className="flex-1 min-w-0 min-h-0 flex flex-col w-full transition-all duration-300 z-10 overflow-hidden">
          <Routes>
            <Route
              path="quick-real"
              element={
                <div className="flex flex-col min-h-screen">
                  <QuickTradingRealAccount />
                </div>
              }
            />
            <Route
              path="quick-demo"
              element={
                <div className="flex flex-col min-h-screen">
                  <QuickTradingDemoAccount
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    seriesData={seriesData}
                    latestPrice={latestPrice}
                    timeframe={timeframe}
                    balance={balance}
                    amount={amount}
                    setAmount={setAmount}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    place={place}
                  />
                </div>
              }
            />
            <Route
              path="shares-real"
              element={
                <div className="flex flex-col min-h-screen">
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
                  <SharesTradingRealAccount
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    seriesData={seriesData}
                    latestPrice={latestPrice}
                    timeframe={timeframe}
                    balance={balance}
                    amount={amount}
                    setAmount={setAmount}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    place={place}
                  />
                </div>
              }
            />
            <Route
              path="shares-demo"
              element={
                <div className="flex flex-col min-h-screen">
                  <SharesTradingDemoAccount
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    seriesData={seriesData}
                    latestPrice={latestPrice}
                    timeframe={timeframe}
                    balance={balance}
                    amount={amount}
                    setAmount={setAmount}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    place={place}
                  />
                </div>
              }
            />
            <Route
              path="forex-mt4-real"
              element={
                <div className="flex flex-col min-h-screen">
                  <ForexMT4RealAccount
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    seriesData={seriesData}
                    latestPrice={latestPrice}
                    timeframe={timeframe}
                    balance={balance}
                    amount={amount}
                    setAmount={setAmount}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    place={place}
                  />
                </div>
              }
            />
            <Route
              path="forex-mt4-demo"
              element={
                <div className="flex flex-col min-h-screen">
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
                  <ForexMT4DemoAccount
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    seriesData={seriesData}
                    latestPrice={latestPrice}
                    timeframe={timeframe}
                    balance={balance}
                    amount={amount}
                    setAmount={setAmount}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    place={place}
                  />
                </div>
              }
            />
            <Route
              path="forex-mt5-real"
              element={
                <div className="flex flex-col min-h-screen">
                  <ForexMT5RealAccount
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    seriesData={seriesData}
                    latestPrice={latestPrice}
                    timeframe={timeframe}
                    balance={balance}
                    amount={amount}
                    setAmount={setAmount}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    place={place}
                  />
                </div>
              }
            />
            <Route
              path="forex-mt5-demo"
              element={
                <div className="flex flex-col min-h-screen">
                  <ForexMT5DemoAccount
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    seriesData={seriesData}
                    latestPrice={latestPrice}
                    timeframe={timeframe}
                    balance={balance}
                    amount={amount}
                    setAmount={setAmount}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    place={place}
                  />
                </div>
              }
            />

            <Route
              path="/"
              element={
                <>
                  {/* 🖥️ DESKTOP LAYOUT (md and up) */}
                  <div className="hidden md:flex w-full h-full">
                    {/* Chart Area */}
                    <div className="flex-1 bg-[#050713] relative overflow-hidden">
                      <PocketOptionChart
                        key={`desktop-${chartKey}`}
                        onPriceUpdate={(price) => {
                          console.log("LIVE PRICE:", price);
                          setLivePrice(price);
                        }}
                        activeAsset={activeAsset}
                        setActiveAsset={setActiveAsset}
                        symbol={activeAsset?.id || "BTCUSDT"}
                        payout={activeAsset?.payout}
                        chartType={chartType}
                        expiryPreview={expiryPreview}
                        onAssetsLoaded={setAssets}
                        onChartTypeChange={setChartType}
                        height="100%"  // <--- YE ADD KAREIN
                      />
                    </div>

                    {/* Right Panel - Trade + Positions */}
                    <div
                      className={`${
                        showRightRail ? "w-[18rem]" : "w-0"
                      } bg-[#050713] border-l border-zinc-800 flex flex-col transition-all duration-300 overflow-hidden`}
                    >
                      {showRightRail && (
                        <>
                          <div className="border-b border-zinc-800">
                            <TradePanel
                              refreshTrades={loadTrades}
                              onBuy={(order) => handleTradeAction(order)}
                              onSell={(order) => handleTradeAction(order)}
                              place={place}
                              onExpiryPreview={(ts) => setExpiryPreview(ts)}
                              selectedAsset={activeAsset}
                              amount={amount}
                              setAmount={setAmount}
                              seconds={seconds}
                              setSeconds={setSeconds}
                              payout={payout}
                              livePrice={livePrice}
                              balance={balance}
                              setBalance={setBalance}
                              asset={activeAsset}
                              isOpen={true}
                              updateExpiryPreview={updateExpiryPreview}
                              onAddMarker={(data) => {
                                if (window.__chartAddMarker) {
                                  window.__chartAddMarker(
                                    data.price,
                                    data.time,
                                    data.side,
                                    data.amount,
                                    data.seconds
                                  );
                                }
                              }}
                            />
                          </div>
                        
                        </>
                      )}
                    </div>
                  </div>

                  {/* 📱 MOBILE LAYOUT (below md) */}
                  {/* 📱 MOBILE LAYOUT (below md) */}
<div className="md:hidden flex flex-col w-full h-[calc(100dvh-64px)] relative overflow-hidden bg-[#050713]">
  
  {/* 1. Chart Area - Flex-1 lega taaki baki jagah fill kare */}
  <div className="flex-1 relative w-full min-h-0">
    <PocketOptionChart
      key={`mobile-${chartKey}`}
      onPriceUpdate={(price) => {
        console.log("LIVE PRICE:", price);
        setLivePrice(price);
      }}
      activeAsset={activeAsset}
      setActiveAsset={setActiveAsset}
      symbol={activeAsset?.id || "BTCUSDT"}
      payout={activeAsset?.payout}
      chartType={chartType}
      expiryPreview={expiryPreview}
      onAssetsLoaded={setAssets}
      onChartTypeChange={setChartType}
    />
  </div>

  {/* 2. Trade Panel - Expanded Mode (Overlay) */}
  {showTradeMobile && (
    <div className="absolute inset-x-0 bottom-0 top-0 bg-black/50 z-50 flex flex-col justify-end">
        {/* Click outside to close */}
        <div className="flex-1" onClick={() => setShowTradeMobile(false)} />
        
<div className="
  absolute inset-x-0 bottom-0 
  bg-[#0a0e14] border-t border-zinc-800 
  px-4 pt-3 
  pb-[calc(40px+env(safe-area-inset-bottom))] 
  w-full 
  shadow-[0_-4px_20px_rgba(0,0,0,0.5)]
">
            <div className="flex justify-center pt-2 pb-1" onClick={() => setShowTradeMobile(false)}>
                <div className="w-10 h-1 bg-zinc-700 rounded-full"></div>
            </div>
            <div className="px-4 py-3 border-b border-zinc-800 flex justify-between items-center">
                <h3 className="text-white font-semibold">Trade</h3>
                <button
                onClick={() => setShowTradeMobile(false)}
                className="text-zinc-400 hover:text-white p-1"
                >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-0">
                <TradePanel
                refreshTrades={loadTrades}
                onBuy={(order) => { handleTradeAction(order); setShowTradeMobile(false); }}
                onSell={(order) => { handleTradeAction(order); setShowTradeMobile(false); }}
                place={place}
                onExpiryPreview={(ts) => setExpiryPreview(ts)}
                selectedAsset={activeAsset}
                amount={amount}
                setAmount={setAmount}
                seconds={seconds}
                setSeconds={setSeconds}
                payout={payout}
                livePrice={livePrice}
                balance={balance}
                setBalance={setBalance}
                asset={activeAsset}
                isOpen={true}
                updateExpiryPreview={updateExpiryPreview}
                onAddMarker={(data) => {
                    if (window.__chartAddMarker) {
                    window.__chartAddMarker(data.price, data.time, data.side, data.amount, data.seconds);
                    }
                }}
                />
                {/* <div className="border-t border-zinc-800 mt-4">
                <TradesTabs opened={opened} closed={closed} livePrice={livePrice} />
                </div> */}
            </div>
        </div>
    </div>
  )}

  {/* 3. Bottom Bar - Collapsed Mode (Sticky Footer) */}
  {!showTradeMobile && (
    <div className="shrink-0 z-40 bg-[#0a0e14] border-t border-zinc-800 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] w-full shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      
      {/* Toggle Button */}
      <button
        onClick={() => setShowTradeMobile(true)}
        className="w-full bg-transparent text-white font-medium py-1 mb-2 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-400">Amount</span>
            <span className="font-semibold">${amount}</span>
          </div>
          <div className="w-px h-4 bg-zinc-700"></div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-400">Time</span>
            <span className="font-semibold">00:00:{seconds.toString().padStart(2, "0")}</span>
          </div>
        </div>
        <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Buy/Sell Buttons */}
      <div className="flex gap-3 h-[52px]">
        <button
          onClick={() => handleTradeAction("BUY")}
          className="flex-1 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          Buy
        </button>

        <button
          onClick={() => handleTradeAction("SELL")}
          className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          Sell
        </button>
      </div>
    </div>
  )}
</div>
                </>
              }
            />
            <Route
              path="*"
              element={
                <div className="p-4 text-white">404 - Page Not Found</div>
              }
            />
          </Routes>
        </main>

        <RightRail
          isOpen={showRightRail}
          onClose={() => setShowRightRail(false)}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setShowRightRail={setShowRightRail}
          setShowSignals={setShowSignals}
          setShowSocialModal={setShowSocialModal}
        />
      </div>
    </div>
  );
}

