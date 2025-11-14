import React, { useCallback, useEffect, useRef, useState } from "react";
import ChartToolbar from "../components/ChartToolbar";
import ChartArea from "../components/ChartArea";

const BINANCE_KLINES = (sym) =>
  `https://api.binance.com/api/v3/klines?symbol=${sym}&interval=1m&limit=200`;
const BINANCE_WS = (sym) => `wss://stream.binance.com:9443/ws/${sym.toLowerCase()}@trade`;

export default function TradingPage() {
  // toolbar state
  const [category, setCategory] = useState("Crypto Currencies");
  const [symbol, setSymbol] = useState("ADAUSDT"); // Cardano OTC mapping
  const [chartType, setChartType] = useState("candles");
  const [timeframe, setTimeframe] = useState(30); // seconds
  const [amount, setAmount] = useState(10);
  const [payout, setPayout] = useState(82);

  // chart/series refs & live price
  const seriesAPIRef = useRef(null);
  const wsRef = useRef(null);
  const [livePrice, setLivePrice] = useState(null);

  // trades list
  const [trades, setTrades] = useState([]);

  // handle series ready from ChartArea
  const handleSeriesReady = useCallback(({ root, chart, xAxis, yAxis, series }) => {
    seriesAPIRef.current = { root, chart, xAxis, yAxis, series };
  }, []);

  // fetch initial klines and connect websocket when symbol changes
  useEffect(() => {
    let mounted = true;

    async function loadHistoricalAndConnect() {
      // cleanup previous ws
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch (e) {}
        wsRef.current = null;
      }

      const api = seriesAPIRef.current;
      if (!api) return;

      try {
        // for Binance-supported (ending with USDT) use real API
        if (symbol && symbol.toUpperCase().endsWith("USDT")) {
          const res = await fetch(BINANCE_KLINES(symbol));
          const raw = await res.json();
          const formatted = raw.map((d) => ({
            date: d[0],
            open: +d[1],
            high: +d[2],
            low: +d[3],
            close: +d[4],
          }));

          // Heikin Ashi conversion if selected
          if (chartType === "heikin") {
            for (let i = 1; i < formatted.length; i++) {
              const prev = formatted[i - 1];
              const cur = formatted[i];
              const haClose = (cur.open + cur.high + cur.low + cur.close) / 4;
              const haOpen = (prev.open + prev.close) / 2;
              const haHigh = Math.max(cur.high, haOpen, haClose);
              const haLow = Math.min(cur.low, haOpen, haClose);
              formatted[i] = { date: cur.date, open: haOpen, high: haHigh, low: haLow, close: haClose };
            }
          }

          api.series.data.setAll(formatted);
          if (!mounted) return;
          if (formatted.length) setLivePrice(formatted[formatted.length - 1].close);

          // connect websocket for live trades
          const ws = new WebSocket(BINANCE_WS(symbol));
          wsRef.current = ws;
          ws.onmessage = (ev) => {
            const msg = JSON.parse(ev.data);
            const p = parseFloat(msg.p);
            setLivePrice(p);

            // update last candle or add new
            try {
              const ds = api.series.data;
              const last = ds.getIndex(ds.length - 1);
              const now = Date.now();
              if (now - last.date < 60 * 1000) {
                last.close = p;
                last.high = Math.max(last.high, p);
                last.low = Math.min(last.low, p);
                ds.setIndex(ds.length - 1, last);
              } else {
                ds.push({ date: now, open: p, high: p, low: p, close: p });
              }

              // update pnl for active trades
              setTrades((prev) =>
                prev.map((t) => {
                  if (t.closed) return t;
                  const profit = t.type === "buy" ? (p - t.entry) * (t.amount / t.entry) : (t.entry - p) * (t.amount / t.entry);
                  const pct = (profit / t.amount) * 100;
                  return { ...t, current: p, pnl: profit, pnlPct: pct };
                })
              );
            } catch (e) {
              // ignore
            }
          };
          ws.onerror = (e) => console.error("ws error", e);
        } else {
          // If symbol not in Binance, make a simulated random walk dataset (keeps UI functional)
          const now = Date.now();
          const formatted = [];
          let base = 100 + Math.random() * 50;
          for (let i = 200; i > 0; i--) {
            const t = now - i * 60 * 1000;
            const o = base + (Math.random() - 0.5) * 0.5;
            const c = o + (Math.random() - 0.5) * 0.5;
            const h = Math.max(o, c) + Math.random() * 0.3;
            const l = Math.min(o, c) - Math.random() * 0.3;
            formatted.push({ date: t, open: o, high: h, low: l, close: c });
            base = c;
          }
          api.series.data.setAll(formatted);
          setLivePrice(formatted[formatted.length - 1].close);

          // simulate live updates
          const interval = setInterval(() => {
            setLivePrice((prev) => {
              const change = (Math.random() - 0.5) * 0.6;
              const next = Math.max(0.0001, (prev ?? 100) + change);
              const ds = api.series.data;
              const last = ds.getIndex(ds.length - 1);
              const now2 = Date.now();
              if (now2 - last.date < 60 * 1000) {
                last.close = next;
                last.high = Math.max(last.high, next);
                last.low = Math.min(last.low, next);
                ds.setIndex(ds.length - 1, last);
              } else {
                ds.push({ date: now2, open: next, high: next, low: next, close: next });
              }
              // update trades
              setTrades((prevT) =>
                prevT.map((t) => {
                  if (t.closed) return t;
                  const profit = t.type === "buy" ? (next - t.entry) * (t.amount / t.entry) : (t.entry - next) * (t.amount / t.entry);
                  const pct = (profit / t.amount) * 100;
                  return { ...t, current: next, pnl: profit, pnlPct: pct };
                })
              );
              return next;
            });
          }, 800);
          wsRef.current = { mockInterval: interval };
        }
      } catch (err) {
        console.error("load error", err);
      }
    }

    loadHistoricalAndConnect();

    return () => {
      mounted = false;
      if (wsRef.current) {
        if (wsRef.current instanceof WebSocket) {
          try {
            wsRef.current.close();
          } catch (e) {}
        } else if (wsRef.current.mockInterval) {
          clearInterval(wsRef.current.mockInterval);
        }
        wsRef.current = null;
      }
    };
  }, [symbol, chartType]);

  // place trade, draw horizontal label in chart and setup expiry
  const placeTrade = (type) => {
    if (!livePrice || amount <= 0) return;
    const id = Date.now().toString(36) + Math.floor(Math.random() * 1000);
    const entry = livePrice;
    const expiryTs = Date.now() + timeframe * 1000;
    const trade = {
      id,
      type,
      amount,
      entry,
      placedAt: Date.now(),
      expiry: expiryTs,
      remaining: timeframe,
      current: entry,
      pnl: 0,
      pnlPct: 0,
      closed: false,
    };

    // draw axis label/line if possible
    try {
      const api = seriesAPIRef.current;
      if (api) {
        const yAxis = api.yAxis;
        const dataItem = yAxis.makeDataItem({ value: entry });
        const range = yAxis.createAxisRange(dataItem);
        range.get("grid").setAll({
          stroke: am5.color(type === "buy" ? 0x22c55e : 0xef4444),
          strokeDasharray: [4, 4],
          strokeWidth: 1.2,
          visible: true,
        });
        range.get("label").setAll({
          text: `${type.toUpperCase()} ${entry.toFixed(4)}`,
          background: am5.RoundedRectangle.new(api.root, { fill: am5.color(0x000000), fillOpacity: 0.5 }),
          visible: true,
        });
        trade._rangeObj = range; // store to remove later
      }
    } catch (e) {
      // ignore if can't draw
    }

    setTrades((p) => [trade, ...p]);

    // countdown interval
    const intervalId = setInterval(() => {
      setTrades((prev) => prev.map((t) => (t.id === id ? { ...t, remaining: Math.max(0, Math.ceil((t.expiry - Date.now()) / 1000)) } : t)));
    }, 250);

    // expiry timeout
    const timeoutId = setTimeout(() => {
      const exit = livePrice ?? entry;
      const profit = type === "buy" ? (exit - entry) * (amount / entry) : (entry - exit) * (amount / entry);
      const pnlPct = (profit / amount) * 100;
      setTrades((prev) => prev.map((t) => (t.id === id ? { ...t, closed: true, exit, pnl: profit, pnlPct, remaining: 0 } : t)));
      // remove drawn range
      setTimeout(() => {
        setTrades((prev) => {
          const tr = prev.find((x) => x.id === id);
          if (tr && tr._rangeObj) {
            try {
              tr._rangeObj.dispose();
            } catch (e) {}
          }
          return prev;
        });
      }, 50);

      clearInterval(intervalId);
    }, timeframe * 1000);

    // attach ids to trade record
    setTrades((prev) => prev.map((t) => (t.id === id ? { ...t, __timeout: timeoutId, __interval: intervalId } : t)));
  };

  const closeTrade = (id) => {
    const t = trades.find((x) => x.id === id);
    if (!t || t.closed) return;
    if (t.__timeout) clearTimeout(t.__timeout);
    if (t.__interval) clearInterval(t.__interval);
    const exit = livePrice ?? t.entry;
    const profit = t.type === "buy" ? (exit - t.entry) * (t.amount / t.entry) : (t.entry - exit) * (t.amount / t.entry);
    const pnlPct = (profit / t.amount) * 100;
    setTrades((prev) => prev.map((tr) => (tr.id === id ? { ...tr, closed: true, exit, pnl: profit, pnlPct, remaining: 0 } : tr)));
    // remove visual range
    if (t._rangeObj) {
      try {
        t._rangeObj.dispose();
      } catch (e) {}
    }
  };

  // when category changes pick default symbol and payout
  useEffect(() => {
    const mapping = {
      "Crypto Currencies": "ADAUSDT",
      Currencies: "EURUSDT",
      Commodities: "GOLDUSD",
    };
    setSymbol(mapping[category] || "ADAUSDT");
    const payoutMap = {
      "Crypto Currencies": 82,
      Currencies: 78,
      Commodities: 76,
    };
    setPayout(payoutMap[category] || 80);
  }, [category]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* top toolbar */}
        <ChartToolbar
          category={category}
          onCategoryChange={setCategory}
          selectedAsset={symbol}
          onAssetChange={setSymbol}
          selectedChartType={chartType}
          onChartTypeChange={setChartType}
          selectedTF={timeframe}
          onTFChange={setTimeframe}
          amount={amount}
          onAmountChange={setAmount}
          payout={payout}
        />

        {/* main area */}
        <div className="mt-4 grid grid-cols-12 gap-4">
          {/* chart (left 8 columns) */}
          <div className="col-span-8 bg-white rounded-lg shadow p-3">
            <ChartArea symbol={symbol} chartType={chartType} onSeriesReady={handleSeriesReady} />
            {/* floating buy/sell to right inside chart container */}
            <div className="flex flex-col gap-3 absolute right-10 top-[150px] z-50">
              <button onClick={() => placeTrade("buy")} className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded text-white font-semibold">
                BUY 
              </button>
              <button onClick={() => placeTrade("sell")} className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white font-semibold">
                SELL
              </button>
            </div>
          </div>

          {/* right panel (col-span-4) */}
          <div className="col-span-4">
            <div className="bg-[#0b1220] text-white rounded-lg p-4 shadow">
              <div className="text-xs text-gray-300">Expiration time</div>
              <div className="text-xl font-semibold mt-1">{timeframe >= 60 ? `${timeframe / 60}m` : `${timeframe}s`}</div>

              <div className="mt-4">
                <div className="text-xs text-gray-300">Trade</div>
                <div className="text-lg font-semibold">${amount.toFixed(2)}</div>
                <div className="text-xs text-gray-400">Payout: <span className="text-green-400 font-semibold">+{payout}%</span></div>
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={() => placeTrade("buy")} className="flex-1 bg-green-500 hover:bg-green-600 px-4 py-3 rounded text-white font-bold">BUY</button>
                <button onClick={() => placeTrade("sell")} className="flex-1 bg-red-500 hover:bg-red-600 px-4 py-3 rounded text-white font-bold">SELL</button>
              </div>

              <div className="mt-4">
                <div className="text-xs text-gray-300">Current Price</div>
                <div className="text-2xl font-bold text-yellow-300">${livePrice ? livePrice.toFixed(6) : "—"}</div>
              </div>
            </div>

            {/* trade list */}
            <div className="mt-4 bg-white rounded-lg shadow p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Trades</h3>
                <div className="text-xs text-gray-500">Opened</div>
              </div>

              <div className="mt-3 space-y-2 max-h-64 overflow-auto">
                {trades.length === 0 && <div className="text-gray-500 text-sm">No active trades</div>}
                {trades.map((t) => (
                  <div key={t.id} className="flex justify-between items-start p-2 border rounded">
                    <div>
                      <div className="text-xs text-gray-400">{t.type.toUpperCase()} • {new Date(t.placedAt).toLocaleTimeString()}</div>
                      <div className="font-semibold">${t.entry.toFixed(6)}</div>
                      <div className="text-xs text-gray-500">Amt: ${t.amount.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">Exp: {t.remaining}s</div>
                    </div>

                    <div className="text-right">
                      <div className={`font-semibold ${t.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>${t.pnl?.toFixed(2) ?? "0.00"}</div>
                      <div className="text-xs text-gray-400">{t.pnlPct?.toFixed(2) ?? "0.00"}%</div>
                      {!t.closed ? (
                        <button onClick={() => closeTrade(t.id)} className="mt-2 px-2 py-1 bg-gray-200 rounded text-xs">Close</button>
                      ) : (
                        <div className="mt-2 text-xs">{t.pnl >= 0 ? "Closed (Win)" : "Closed(Loss)"}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* small footer price */}
        <div className="mt-6 text-center text-sm text-gray-600">Live price powered by Binance (crypto only)</div>
      </div>
    </div>
  );
}
