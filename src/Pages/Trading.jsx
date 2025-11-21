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

  const updateExpiryPreview = (seconds) => {
    const expiry = Date.now() + seconds * 1000;
    setPreviewExpiry(expiry);
  };

  // ✅ BUY / SELL trade handler

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

    loadTrades(); // ⭐ OPEN/CLOSED trade fresh fetch
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
          amount: order.amount, // ⭐ SAME AMOUNT
          openPrice: order.openPrice,
          closePrice: livePrice, // ⭐ CORRECT CLOSE PRICE
          profit:
            Math.random() > 0.5 ? order.amount * 0.8 : -order.amount * 0.8,
          expiresAt: order.expiresAt, // ⭐ USED FOR SHOWING CLOSE TIME
          closedAt: Date.now(), // ⭐ REAL CLOSE TIMESTAMP
          payout: order.payout,
        };

        // setClosed((prev) => [closedTrade, ...prev]);
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

  // const getAssets = () => [
  //   { id: "EURUSD-OTC", symbol: "EUR/USD OTC", precision: 5, payout: 0.92 },
  //   { id: "BTCUSD", symbol: "BTC/USD", precision: 2, payout: 0.9 },
  //   { id: "AAPL", symbol: "AAPL", precision: 2, payout: 0.88 },
  //   { id: "EURKWD", symbol: "EUR/KWD", precision: 5, payout: 0.91 },
  //   { id: "EURBHD", symbol: "EUR/BHD", precision: 5, payout: 0.91 },
  //   { id: "EUROMR", symbol: "EUR/OMR", precision: 5, payout: 0.91 },
  //   { id: "EURJOD", symbol: "EUR/JOD", precision: 5, payout: 0.91 },
  //   { id: "EURGBP", symbol: "EUR/GBP", precision: 5, payout: 0.9 },
  // ];

  // useEffect(() => {
  //   const _assets = getAssets();
  //   setAssets(_assets);
  //   setActiveAsset(_assets[0]);
  // }, []);

  useEffect(() => {
    loadTrades();
  }, []);

  const loadTrades = async () => {
    try {
      const openRes = await getOpenTrades(); // 🔵 OPEN TRADES API
      const closedRes = await getClosedTrades(); // 🔴 CLOSED TRADES API

      const open = openRes?.data?.result?.data || [];
      const closed = closedRes?.data?.result?.data || [];

      // ⭐ OPEN TRADES को seconds के साथ map करना
      const mapped = open.map((t) => {
        const expiry = new Date(t.expiryTime).getTime();
        const now = Date.now();
        const sec = Math.max(0, Math.floor((expiry - now) / 1000));

        return {
          ...t,
          expiresAt: expiry, // UI के लिए expiry timestamp
          seconds: sec, // remaining seconds
        };
      });

      // 🟢 OPEN TRADES UI अपडेट
      setOpened(mapped);

      // 🔴 CLOSED trades UI अपडेट
      setClosed(closed);

      // ⭐⭐⭐ AUTO-CLOSE TIMER (हर open trade के लिए) ⭐⭐⭐
      // mapped.forEach((trade) => {
      //   if (!trade.expiresAt) return;

      //   const remaining = trade.expiresAt - Date.now();

      //   if (remaining > 0) {
      //     setTimeout(() => {
      //       // 🔵 OPEN list से हटाओ
      //       setOpened((prev) => prev.filter((t) => t._id !== trade._id));

      //       // 🔴 CLOSED list में डालो
      //       setClosed((prev) => [
      //         {
      //           ...trade,
      //           closePrice: livePrice, // current live price
      //           profit:
      //             Math.random() > 0.5
      //               ? trade.price * 0.8
      //               : -trade.price * 0.8,
      //           closedAt: new Date().toISOString(),
      //         },
      //         ...prev,
      //       ]);
      //     }, remaining);
      //   }
      // });
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
          .slice(0, 40); // 40 best assets

        const mapped = usdtPairs.map((s) => ({
          id: s.symbol, // BTCUSDT
          symbol: `${s.baseAsset}/USDT`,
          precision: s.quantityPrecision,
          payout: 0.9, // default 90%, you can randomize
        }));

        setAssets(mapped);
        setActiveAsset(mapped[0]); // set first Binance asset as active
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

      // 👉 ADD opened trade to UI (optional)
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

  if (!activeAsset)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070b14] text-white">
        Loading…
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0b1520] text-white flex flex-col font-sans antialiased relative">
      <TopBar
        balance={balance}
        onTopUp={onTopUp}
        onToggleTradeMobile={() => setShowTradeMobile((s) => !s)}
        onToggleLeftSidebar={() => setShowLeftSidebar((s) => !s)}
        onToggleRightRail={() => setShowRightRail((s) => !s)}
      />
      <div className="flex flex-1 min-h-0 pb-0 md:pb-0 relative">
        <LeftSidebar
          isOpen={showLeftSidebar}
          onClose={() => setShowLeftSidebar(false)}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setShowLeftSidebar={setShowLeftSidebar}
          setShowSignals={setShowSignals}
          setShowSocialModal={setShowSocialModal}
        />
        <main className="flex-1 min-w-0 min-h-0 flex flex-col w-full transition-all duration-300 z-10 overflow-y-auto">
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
                <div className="flex flex-col min-h-screen">
                  <div className="flex w-full h-full overflow-hidden">
                    {/* 🔵 LEFT SIDE — FULL CHART AREA */}
                    <div className="flex-1 bg-[#050713] relative overflow-hidden">
                      {/* Chart */}
                      <PocketOptionChart
                        onPriceUpdate={(price) => {
                          console.log("LIVE PRICE:", price); // debug
                          setLivePrice(price);
                        }}
                        activeAsset={activeAsset}
                        setActiveAsset={setActiveAsset}
                        symbol={activeAsset?.id || "BTCUSDT"}
                        payout={activeAsset?.payout}
                        chartType={chartType}
                        expiryPreview={expiryPreview}
                        onAssetsLoaded={setAssets}
                        // onPriceUpdate={(p) => setLivePrice(p)}
                        // activeAsset={activeAsset}
                        // setActiveAsset={setActiveAsset}
                        // symbol={activeAsset?.id || "BTCUSDT"}
                        // payout={activeAsset?.payout}

                        // chartType={chartType}
                        onChartTypeChange={setChartType}
                        // expiryPreview={expiryPreview}
                        // onAssetsLoaded={setAssets}
                      />
                    </div>

                    {/* 🔵 RIGHT SIDE — TRADE PANEL + POSITIONS */}
                    <div className="w-[18rem] bg-[#050713] border-l border-zinc-800 flex flex-col h-full">
                      {/* Trade Panel — FIXED LIKE EQUILIX */}
                      <div className="border-b border-zinc-800">
                        <TradePanel
                          refreshTrades={loadTrades}
                          onBuy={(order) => handleTradeAction(order)}
                          onSell={(order) => handleTradeAction(order)}
                          place={place}
                          onExpiryPreview={(ts) => {
                            // Pass to LiveChart / Candle expiry marker
                            setExpiryPreview(ts);
                          }}
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
                          isOpen={true} // always open — Equilix style
                          updateExpiryPreview={updateExpiryPreview} // ⭐ new prop
                          // ⭐⭐ ADD THIS HERE ⭐⭐
                          onAddMarker={(data) => {
                            if (window.__chartAddMarker) {
                              window.__chartAddMarker(
                                data.price,
                                data.time,
                                data.side,
                                data.amount,
                                data.seconds // ⭐ ADD
                              );
                            }
                          }}
                          className="max-h-[50%] overflow-y-auto"
                        />
                      </div>

                      {/* Opened + Closed Trades — Scrollable Bottom */}
                      <div className="flex-1 overflow-y-auto p-4">
                        <TradesTabs
                          opened={opened}
                          closed={closed}
                          livePrice={livePrice}
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
