import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "../components/TopBar";
import LeftSidebar from "../components/LeftSidebar";
import RightRail from "../components/RightRail";
import Toolbar from "../components/Toolbar";
import PriceChart from "../components/PriceChart";
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
import { X } from "lucide-react"; // For close icon
// import LiveChart from "../components/LiveChart";
import PocketOptionChart from "../components/LiveChart";
import ChartToolbar from "../components/ChartToolbar";

export default function Trading() {
  const [category, setCategory] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState("BTCUSDT");
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
  const [showTradeMobile, setShowTradeMobile] = useState(true);
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightRail, setShowRightRail] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ BUY / SELL trade handler
  // Accept either a simple call (backwards compatible) or an `order` object returned from the API
  const handleTradeAction = (arg) => {
    // If an order object is passed from TradePanel (server response), use it
    const isOrder =
      arg && typeof arg === "object" && (arg._id || arg.id || arg.symbol);
    let order;
    if (isOrder) {
      order = {
        id: arg._id || arg.id || Date.now(),
        asset: { symbol: arg.symbol || selectedAsset },
        side: arg.side || "BUY",
        // prefer server-provided invested amount, fall back to computed/selected amount
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
      // legacy: called as handleTradeAction("BUY")
      const side = arg;
      order = {
        id: Date.now(),
        asset: { symbol: selectedAsset },
        side,
        amount,
        seconds,
        payout,
        openPrice: livePrice,
        expiresAt: Date.now() + seconds * 1000,
        createdAt: new Date().toISOString(),
      };
    }

    // Add to opened list
    setOpened((prev) => [order, ...prev]);

    // schedule move to closed when expiry reached
    const timeToExpiry = Math.max(
      0,
      (order.expiresAt || Date.now()) - Date.now()
    );
    if (timeToExpiry > 0) {
      setTimeout(() => {
        setOpened((prev) => prev.filter((t) => t.id !== order.id));

        const closedTrade = {
          ...order,
          closePrice: livePrice,
          profit:
            Math.random() > 0.5 ? order.amount * 0.8 : -order.amount * 0.8,
          closedAt: new Date().toISOString(),
        };
        setClosed((prev) => [closedTrade, ...prev]);
      }, timeToExpiry);
    }
  };

  useEffect(() => {
    if (showSignals || showSocialModal || isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [showSignals, showSocialModal, isModalOpen]);

  const getAssets = () => [
    { id: "EURUSD-OTC", symbol: "EUR/USD OTC", precision: 5, payout: 0.92 },
    { id: "BTCUSD", symbol: "BTC/USD", precision: 2, payout: 0.9 },
    { id: "AAPL", symbol: "AAPL", precision: 2, payout: 0.88 },
    { id: "EURKWD", symbol: "EUR/KWD", precision: 5, payout: 0.91 },
    { id: "EURBHD", symbol: "EUR/BHD", precision: 5, payout: 0.91 },
    { id: "EUROMR", symbol: "EUR/OMR", precision: 5, payout: 0.91 },
    { id: "EURJOD", symbol: "EUR/JOD", precision: 5, payout: 0.91 },
    { id: "EURGBP", symbol: "EUR/GBP", precision: 5, payout: 0.9 },
  ];

  useEffect(() => {
    const _assets = getAssets();
    setAssets(_assets);
    setActiveAsset(_assets[0]);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setOpened((prevOpened) => {
        return prevOpened
          .map((t) =>
            t.remaining > 0 ? { ...t, remaining: t.remaining - 1 } : t
          )
          .filter((t) => {
            if (t.remaining === 0) {
              const closedTrade = {
                ...t,
                closePrice: livePrice,
                profit:
                  Math.random() > 0.5
                    ? t.amount * (t.payout / 100)
                    : -t.amount * (t.payout / 100),
              };
              setClosed((prevClosed) => [closedTrade, ...prevClosed]);
              return false; // remove from opened
            }
            return true;
          });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [livePrice]);

  const onTopUp = () => setBalance((b) => b + 1000);

  const place = (side) => {
    if (!activeAsset || amount <= 0) return;

    // ✅ Prevent placing trade if insufficient funds
    if (balance < amount) {
      alert("Insufficient balance!");
      return;
    }

    // ✅ Deduct amount immediately when placing a trade
    setBalance((prevBalance) => Math.round((prevBalance - amount) * 100) / 100);

    const now = Date.now();
    const trade = {
      id: Math.random().toString(36).slice(2),
      side,
      asset: activeAsset,
      amount: Math.round(amount * 100) / 100,
      payout: activeAsset.payout,
      openPrice: latestPrice ?? seriesData[seriesData.length - 1]?.close,
      openTime: now,
      expiresAt: now + seconds * 1000,
      remaining: seconds,
      closed: false,
    };

    // ✅ Add the trade to "opened" list
    setOpened((o) => [trade, ...o]);
  };

  if (!activeAsset)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070b14] text-white">
        Loading…
      </div>
    );

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col font-sans antialiased relative">
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
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
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
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
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
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
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
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
                  <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_20rem] min-h-0 w-full h-full relative z-10">
                    <div className="flex flex-col flex-1 min-h-[50vh] sm:min-h-[60vh] lg:h-full w-full min-w-0 overflow-visible relative">
                      <div
                        className="flex-1 relative bg-[#0b0f1a] shadow-inner w-full overflow-hidden"
                        style={{ minHeight: "500px" }}
                      >
                        {/* 🔹 Floating toolbar on top of chart */}
                        <div className="absolute top-2 left-4 z-30">
                          <ChartToolbar
                            category={category}
                            onCategoryChange={setCategory}
                            selectedAsset={selectedAsset}
                            onAssetChange={setSelectedAsset}
                            chartType={chartType}
                            onChartTypeChange={setChartType}
                          />
                        </div>

                        {/* 🔹 Chart area below */}
                        <PocketOptionChart
                          symbol={selectedAsset}
                          onPriceUpdate={(price) => setLivePrice(price)}
                          amount={amount}
                          seconds={seconds}
                          opened={opened}
                          closed={closed}
                          balance={balance}
                          setBalance={setBalance}
                          chartType={chartType}
                          onChartTypeChange={setChartType}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:h-screen h-[400px] bg-[#0b0f1a] md:border-l md:border-zinc-800/50 w-full md:w-[20rem]">
                      <TradePanel
                        selectedAsset={selectedAsset}
                        amount={amount}
                        setAmount={setAmount}
                        seconds={seconds}
                        setSeconds={setSeconds}
                        payout={payout}
                        livePrice={livePrice}
                        onBuy={(order) => handleTradeAction(order)}
                        onSell={(order) => handleTradeAction(order)}
                        balance={balance}
                        setBalance={setBalance}
                        asset={activeAsset}
                        isOpen={showTradeMobile}
                        onClose={() => setShowTradeMobile(false)}
                        className="md:sticky md:top-0 z-30 md:max-h-[calc(100vh-3.5rem)] md:overflow-y-auto"
                      />
                      {/* <TradePanel
                        isOpen={showTradeMobile}
                        onClose={() => setShowTradeMobile(false)}
                      /> */}

                      <div className="flex-1 overflow-y-auto px-4 md:block">
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
