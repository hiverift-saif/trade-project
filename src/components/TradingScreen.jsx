import React, { useRef, useState, useEffect } from "react";
import TopBar from "./TopBar";
import PocketOptionChart from "./PocketOptionChart";
import TradePanel from "./TradePanel";
import TradesTabs from "./TradesTabs";

const TradingScreen = () => {
  // const [balance, setBalance] = useState(1000);
  // const [amount, setAmount] = useState(10);
  // const [seconds, setSeconds] = useState(30);
  // const [payout] = useState(82);
  // const [livePrice, setLivePrice] = useState(null);
  // const [activeAsset, setActiveAsset] = useState("BTCUSDT");

  // const [opened, setOpened] = useState([]);
  // const [closed, setClosed] = useState([]);

  // const priceRef = useRef(null);

  // ✅ Listen to live price updates from chart
  // const handleLivePrice = (price) => {
  //   setLivePrice(price);
  //   priceRef.current = price;
  // };

  // ✅ BUY handler
  // const handleBuy = () => {
  //   const trade = {
  //     id: Date.now(),
  //     type: "Buy",
  //     amount,
  //     expiry: Date.now() + seconds * 1000,
  //     processed: false,
  //     asset: { symbol }, // ✅ store selected asset (from ChartToolbar)
  //   };
  //   setOpened((prev) => [...prev, trade]);
  // };

  // const handleSell = () => {
  //   const trade = {
  //     id: Date.now(),
  //     type: "Sell",
  //     amount,
  //     expiry: Date.now() + seconds * 1000,
  //     processed: false,
  //     asset: { symbol }, // ✅ same here
  //   };
  //   setOpened((prev) => [...prev, trade]);
  // };

  // ✅ Watch trades and close when time expires
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const now = Date.now();
  //     const price = priceRef.current;

  //     setOpened((prevOpened) => {
  //       const updated = prevOpened.map((t) => {
  //         if (!t.processed && t.expiry <= now && price) {
  //           let profit = 0;
  //           let win = false;

  //           if (
  //             (t.type === "buy" && price > t.entry) ||
  //             (t.type === "sell" && price < t.entry)
  //           ) {
  //             profit = t.amount + (t.amount * payout) / 100;
  //             setBalance((prev) => prev + profit);
  //             win = true;
  //           }

  //           const closedTrade = {
  //             ...t,
  //             processed: true,
  //             closedPrice: price,
  //             profit,
  //             win,
  //           };

  //           setClosed((prev) => [...prev, closedTrade]);
  //           return closedTrade;
  //         }
  //         return t;
  //       });

  //       // Filter out processed trades from opened list
  //       return updated.filter((t) => !t.processed);
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [payout]);

  return (
    <div className="min-h-screen bg-[#071124] flex flex-col">
      {/* ✅ Top balance bar */}
      {/* <TopBar balance={balance} /> */}

      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* ✅ Chart with live Binance data */}
        {/* <div className="flex-1">
          <PocketOptionChart
            onPriceUpdate={setLivePrice}
            selectedAsset={symbol} // ✅ pass the current Binance symbol here
          />
        </div> */}

        {/* ✅ Trading panel */}
        {/* <TradePanel
          selectedAsset={activeAsset}
          amount={amount}
          setAmount={setAmount}
          seconds={seconds}
          setSeconds={setSeconds}
          payout={payout}
          onBuy={handleBuy}
          onSell={handleSell}
          setBalance={setBalance}
          balance={balance}
        /> */}
      </div>

      {/* ✅ Opened & Closed trades */}
      {/* <div className="p-4 bg-[#0b1520] border-t border-zinc-800">
        <TradesTabs opened={opened} closed={closed} />
      </div> */}
    </div>
  );
};

export default TradingScreen;
