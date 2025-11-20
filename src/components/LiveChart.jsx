// src/components/EquilixChart.jsx

import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { BarChart3, CandlestickChart, Pencil } from "lucide-react";

const TIMEFRAME_MAP = {
  S5: "5s",
  S10: "10s",
  S15: "15s",
  S30: "30s",

  M1: "1m",
  M2: "2m",
  M3: "3m",
  M5: "5m",
  M10: "10m",
  M15: "15m",
  M30: "30m",

  H1: "1h",
  H4: "4h",

  D1: "1d",
};

// Convert interval string into seconds (S, M, H, D)
const getIntervalSeconds = (intv) => {
  if (!intv || typeof intv !== "string") return 60; // ⭐ FIX

  const n = parseInt(intv);
  if (intv.endsWith("s")) return n;
  if (intv.endsWith("m")) return n * 60;
  if (intv.endsWith("h")) return n * 3600;
  if (intv.endsWith("d")) return n * 86400;

  return 60;
};

const BINANCE_KLINES = (symbol, interval = "1m", limit = 500) =>
  `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;

const BINANCE_WS_KLINE = (symbol, interval = "1m") =>
  `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;

const PocketOptionChart = ({
  onPriceUpdate,
  activeAsset, // ⬅️ ADD THIS
  setActiveAsset, // ⬅️ ADD THIS
  symbol = "BTCUSDT",
  initialInterval = "1m",
  height = 420,
  expiryPreview,
  addTradeMarker,
}) => {
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState({
    name: "Bitcoin - OTC",
    symbol: "BTC",
    payout: "+73%",
  });
  const dropdownRef = useRef(null);

  // Assets usestate
  const [assets, setAssets] = useState([]);
  const [chartSymbol, setChartSymbol] = useState(symbol); // "BTCUSDT" by default

  useEffect(() => {
    const randomPayout = () => {
      const values = [65, 70, 75, 80, 85, 90, 92, 95];
      return values[Math.floor(Math.random() * values.length)] + "%";
    };

    const loadBinanceAssets = async () => {
      try {
        const res = await fetch("https://api.binance.com/api/v3/exchangeInfo");
        const json = await res.json();

        console.log("🔥 Binance Asset List...........:", json.symbols);

        // Only USDT pairs
        const usdtSymbols = json.symbols
          .filter((s) => s.quoteAsset === "USDT" && s.status === "TRADING")
          .slice(0, 30);

        const mapped = usdtSymbols.map((s) => ({
          name: `${s.baseAsset} / ${s.quoteAsset}`,
          displaySymbol: s.baseAsset,
          apiSymbol: s.symbol,
          symbol: s.baseAsset + "USDT", // ⭐ MUST HAVE
          id: s.symbol, // ⭐ OPTIONAL but helpful
          payout: "+" + randomPayout(),
        }));

        setAssets(mapped);

        if (mapped.length > 0) {
          setSelectedAsset(mapped[0]);
          setChartSymbol(mapped[0].apiSymbol);
        }
      } catch (e) {
        console.error("❌ Failed to load Binance assets", e);
      }
    };

    loadBinanceAssets();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSelect = (asset) => {
    setSelectedAsset(asset);
    setChartSymbol(asset.apiSymbol); // ⭐ FIX #1 (IMPORTANT)
    setActiveAsset(asset); // ⬅️ FIX: update parent Trading.jsx
    setIsOpen(false);
  };

  // Chart references
  const hoverPriceLineRef = useRef(null);
  const lastMarkerTimeRef = useRef(0);
  const lastExpiryTimeRef = useRef(0);
  const markersRef = useRef([]);
  const currentTimeLineRef = useRef(null);
  const expiryLineRef = useRef(null);
  const indicatorPopupRef = useRef(null);
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const areaSeriesRef = useRef(null);
  const lineSeriesRef = useRef(null);
  const barSeriesRef = useRef(null);
  const emaSeriesRef = useRef(null);
  const smaSeriesRef = useRef(null);
  const wsRef = useRef(null);
  const resizeObserverRef = useRef(null);

  // Data references
  const livePriceLineRef = useRef(null);
  const candlesRef = useRef([]);
  const drawingsRef = useRef([]);
  const drawingModeRef = useRef("none");
  const trendStartRef = useRef(null);

  const [activeIndicators, setActiveIndicators] = useState({});

  // States
  // "all" OR "current"
  const [indicatorTab, setIndicatorTab] = useState("all");
  const [tfInterval, setTfInterval] = useState(initialInterval);

  const [chartType, setChartType] = useState("candles");
  const [showEma, setShowEma] = useState(false);
  const [showSma, setShowSma] = useState(false);
  const [drawingMode, setDrawingMode] = useState("none");
  const [lastCandleData, setLastCandleData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  // UI Popups
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicatorsOpen, setIndicatorsOpen] = useState(false);
  const [chartPopup, setChartPopup] = useState(false);
  const [drawingPopup, setDrawingPopup] = useState(false);

  // -------------- EMA ----------------
  const calculateEMA = (data, period = 20) => {
    if (!data.length) return [];
    const k = 2 / (period + 1);
    let emaPrev = data[0].close;
    const out = [{ time: data[0].time, value: emaPrev }];
    for (let i = 1; i < data.length; i++) {
      const price = data[i].close;
      emaPrev = price * k + emaPrev * (1 - k);
      out.push({ time: data[i].time, value: emaPrev });
    }
    return out;
  };

  // Awesome Oscillator  formula
  const calcAO = (candles) => {
    const median = candles.map((c) => ({
      time: c.time,
      value: (c.high + c.low) / 2,
    }));

    const sma = (arr, period) =>
      arr.map((_, i) => {
        if (i < period) return null;
        let sum = 0;
        for (let j = 0; j < period; j++) sum += arr[i - j].value;
        return { time: arr[i].time, value: sum / period };
      });

    const sma5 = sma(median, 5);
    const sma34 = sma(median, 34);

    const ao = sma34
      .map((v, i) => {
        if (!v || !sma5[i]) return null;
        return { time: v.time, value: sma5[i].value - v.value };
      })
      .filter(Boolean);

    return ao;
  };

  const calcRSI = (candles, period = 14) => {
    let gains = 0,
      losses = 0;
    const rsi = [];

    for (let i = 1; i < candles.length; i++) {
      const diff = candles[i].close - candles[i - 1].close;
      if (diff >= 0) gains += diff;
      else losses -= diff;

      if (i >= period) {
        const avgGain = gains / period;
        const avgLoss = losses / period;
        const rs = avgGain / avgLoss;
        rsi.push({
          time: candles[i].time,
          value: 100 - 100 / (1 + rs),
        });
        const prevDiff =
          candles[i - period + 1].close - candles[i - period].close;
        if (prevDiff >= 0) gains -= prevDiff;
        else losses += prevDiff;
      }
    }

    return rsi;
  };

  const calcMACD = (candles) => {
    const close = candles.map((c) => c.close);
    const ema12 = calcEMA(candles, 12);
    const ema26 = calcEMA(candles, 26);

    const macd = ema12.map((v, i) => ({
      time: candles[i].time,
      value: v.value - (ema26[i]?.value || 0),
    }));

    const signal = calcEMA(macd, 9);

    return macd.map((v, i) => ({
      time: v.time,
      value: v.value,
    }));
  };

  // -------------- SMA ----------------
  const calculateSMA = (data, period = 50) => {
    if (!data.length) return [];
    const result = [];
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].close;
      if (i >= period) sum -= data[i - period].close;
      if (i >= period - 1) {
        result.push({
          time: data[i].time,
          value: sum / period,
        });
      }
    }
    return result;
  };

  // ---------------- INDICATORS UPDATE ----------------
  const updateIndicators = () => {
    const data = candlesRef.current;
    if (!data.length) return;

    if (showEma) {
      if (!emaSeriesRef.current) {
        emaSeriesRef.current = chartRef.current.addLineSeries({
          lineWidth: 2,
          color: "#10b981",
        });
      }
      emaSeriesRef.current.setData(calculateEMA(data, 20));
    } else {
      if (emaSeriesRef.current) {
        chartRef.current.removeSeries(emaSeriesRef.current);
        emaSeriesRef.current = null;
      }
    }

    if (showSma) {
      if (!smaSeriesRef.current) {
        smaSeriesRef.current = chartRef.current.addLineSeries({
          lineWidth: 2,
          color: "#facc15",
        });
      }
      smaSeriesRef.current.setData(calculateSMA(data, 50));
    } else {
      if (smaSeriesRef.current) {
        chartRef.current.removeSeries(smaSeriesRef.current);
        smaSeriesRef.current = null;
      }
    }
  };

  // ---------------- CUSTOM INDICATOR ADDER ----------------
  const addIndicator = (name, data) => {
    if (!chartRef.current) return;

    const series = chartRef.current.addLineSeries({
      lineWidth: 2,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16), // random color
    });

    series.setData(data);

    setActiveIndicators((prev) => ({
      ...prev,
      [name]: series,
    }));
  };

  const calcEMA = (data, period = 13) => {
    if (!data.length) return [];

    const k = 2 / (period + 1);
    let emaPrev = data[0].close;

    const result = [{ time: data[0].time, value: emaPrev }];

    for (let i = 1; i < data.length; i++) {
      const price = data[i].close;
      emaPrev = price * k + emaPrev * (1 - k);
      result.push({ time: data[i].time, value: emaPrev });
    }
    return result;
  };

  const calcBulls = (candles) => {
    const ema = calcEMA(candles, 13);
    return candles.map((c, i) => ({
      time: c.time,
      value: c.high - (ema[i]?.value || 0),
    }));
  };

  const calcBears = (candles) => {
    const ema = calcEMA(candles, 13);
    return candles.map((c, i) => ({
      time: c.time,
      value: c.low - (ema[i]?.value || 0),
    }));
  };

  const removeIndicator = (name) => {
    if (activeIndicators[name]) {
      try {
        chartRef.current.removeSeries(activeIndicators[name]); // chart se remove
      } catch (e) {
        console.log("Remove error:", e);
      }
    }

    setActiveIndicators((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);

      const before = markersRef.current.length;

      // REMOVE expired markers
      markersRef.current = markersRef.current.filter((m) => m.expiry > now);

      if (markersRef.current.length !== before) {
        candleSeriesRef.current.setMarkers(markersRef.current);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        indicatorsOpen &&
        indicatorPopupRef.current &&
        !indicatorPopupRef.current.contains(e.target)
      ) {
        setIndicatorsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [indicatorsOpen]);

  // ---------------- CHART INIT ----------------
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height,
      layout: {
        background: { color: "#050713" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "#111827" },
        horzLines: { color: "#111827" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: "#1f2937" },
      timeScale: {
        borderColor: "#1f2937",
        timeVisible: true,
        secondsVisible: true,
      },
    });

    chart.priceScale("right").applyOptions({
      borderColor: "#1f2937",
      entireTextOnly: true,
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
      lastValueVisible: true,
      priceLineVisible: true,
    });

    // Save refs
    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;

    // ⭐ ADD LIVE PRICE LINE INIT HERE
    livePriceLineRef.current = candleSeriesRef.current.createPriceLine({
      price: 0,
      color: "#3b82f6",
      lineWidth: 2,
      axisLabelVisible: true,
      title: "",
    });

    // === TRADE MARKER (GLOBAL ACCESS) ===
    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;

    window.__chartAddMarker = (price, time, side, amount, seconds) => {
      if (!chartRef.current || !candleSeriesRef.current) return;

      const lastCandle = candlesRef.current[candlesRef.current.length - 1];
      // const ts = lastCandle.time; // ⭐ FIXED time
      let ts = Math.floor(time / 1000); // ✔ Real entry time
      if (ts <= lastMarkerTimeRef.current) {
        ts = lastMarkerTimeRef.current + 1;
      }

      lastMarkerTimeRef.current = ts;
      //  const expiryTs = ts + seconds;       // ✔ exact expiry

      const expiryTs = ts + seconds; // ⭐ EXPIRY TIME ADD

      const marker = {
        time: ts,
        amount: amount,
        position: side === "buy" ? "belowBar" : "aboveBar",
        color: side === "buy" ? "#22c55e" : "#ef4444",
        shape: side === "buy" ? "arrowUp" : "arrowDown",
        // text: `${amount}$ | ${side.toUpperCase()} | ${seconds}s`,
        text: `${amount}$ | ${seconds}s`, // ✔ correct time shown
        expiry: expiryTs, // ⭐ NEW
        secondsLeft: seconds,
      };

      markersRef.current.push(marker);
      markersRef.current.sort((a, b) => a.time - b.time);

      candleSeriesRef.current.setMarkers(markersRef.current);

      candleSeriesRef.current.createPriceLine({
        price,
        color: side === "buy" ? "#22c55e" : "#ef4444",
        lineWidth: 2,
        title: `${side.toUpperCase()} $${amount} (${seconds}s)`,
      });
    };

    // === TRADE MARKER DRAWER ===
    const addTradeMarker = (price, time, side, amount) => {
      if (!chartRef.current || !candleSeriesRef.current) return;

      candleSeriesRef.current.createPriceLine({
        price,
        color: side === "buy" ? "#22c55e" : "#ef4444",
        lineWidth: 2,
        lineStyle: 2,
        axisLabelVisible: true,
        title: `${side.toUpperCase()} $${amount}`,
      });

      candleSeriesRef.current.setMarkers([
        {
          time: Math.floor(time / 1000),
          position: side === "buy" ? "belowBar" : "aboveBar",
          color: side === "buy" ? "#22c55e" : "#ef4444",
          shape: side === "buy" ? "arrowUp" : "arrowDown",
          text: `$${amount}`,
        },
      ]);
    };

    const areaSeries = chart.addAreaSeries({
      topColor: "rgba(59,130,246,0.4)",
      bottomColor: "rgba(15,23,42,0)",
      lineColor: "#3b82f6",
      lineWidth: 2,
    });

    const lineSeries = chart.addLineSeries({
      color: "#3b82f6",
      lineWidth: 2,
    });

    const barSeries = chart.addHistogramSeries({
      color: "#475569",
      base: 0,
    });

    // Hide alt series initially
    areaSeries.priceScale().applyOptions({ visible: false });
    lineSeries.priceScale().applyOptions({ visible: false });
    barSeries.priceScale().applyOptions({ visible: false });

    // Save refs
    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    areaSeriesRef.current = areaSeries;
    lineSeriesRef.current = lineSeries;
    barSeriesRef.current = barSeries;

    // Resize observer
    resizeObserverRef.current = new ResizeObserver(() => {
      chart.applyOptions({
        width: containerRef.current.clientWidth,
      });
    });
    resizeObserverRef.current.observe(containerRef.current);

    return () => {
      resizeObserverRef.current.disconnect();
      chartRef.current?.remove();
    };
  }, [height]);

  // ---------------- LOAD CANDLES + WS LIVE ----------------
  useEffect(() => {
    let cancelled = false;

    // ⭐ Add this check here
    const VALID_BINANCE_TF = [
      "1m",
      "2m",
      "3m",
      "5m",
      "15m",
      "30m",
      "1h",
      "4h",
      "1d",
    ];

    // ❗ Binance 5s/10s/15s/30s support nahi karta
    if (!VALID_BINANCE_TF.includes(tfInterval)) {
      console.warn("Unsupported TF:", tfInterval);
      return;
    }

    const load = async () => {
      if (!chartRef.current) return;

      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }

      const res = await fetch(BINANCE_KLINES(chartSymbol, tfInterval, 500));
      const raw = await res.json();
      if (!Array.isArray(raw) || cancelled) return;

      const candles = raw.map((k) => ({
        time: k[0] / 1000,
        open: +k[1],
        high: +k[2],
        low: +k[3],
        close: +k[4],
      }));

      candlesRef.current = candles;

      candleSeriesRef.current.setData(candles);
      areaSeriesRef.current.setData(
        candles.map((c) => ({ time: c.time, value: c.close }))
      );
      lineSeriesRef.current.setData(
        candles.map((c) => ({ time: c.time, value: c.close }))
      );
      barSeriesRef.current.setData(
        candles.map((c) => ({ time: c.time, value: c.close }))
      );

      setLastCandleData(candles[candles.length - 1]);
      updateIndicators();

      const ws = new WebSocket(BINANCE_WS_KLINE(chartSymbol, tfInterval));
      wsRef.current = ws;

      ws.onmessage = (msg) => {
        const d = JSON.parse(msg.data);
        if (d.e !== "kline") return;

        const k = d.k;

        const live = {
          time: Math.floor(k.t / 1000),
          open: +k.o,
          high: +k.h,
          low: +k.l,
          close: +k.c,
        };

        candleSeriesRef.current.update(live);

        const lastIndex = candlesRef.current.length - 1;
        candlesRef.current[lastIndex] = live;

        // ⭐ SEND REAL LIVE PRICE TO TRADEPANEL
        if (typeof onPriceUpdate === "function") {
          onPriceUpdate(live.close); // ✅ FIXED
        }

        setLastCandleData(live);
      };

      // Live trade price WS (real-time chart update)
      const wsTrade = new WebSocket(
        `wss://stream.binance.com:9443/ws/${chartSymbol.toLowerCase()}@trade`
      );
      wsTrade.onmessage = (msg) => {
        const t = JSON.parse(msg.data);
        const livePrice = +t.p;
        onPriceUpdate?.(livePrice);
        // update last candle
        const last = candlesRef.current[candlesRef.current.length - 1];
        if (!last) return;

        const updated = {
          time: last.time,
          open: last.open,
          high: Math.max(last.high, livePrice),
          low: Math.min(last.low, livePrice),
          close: livePrice,
        };

        candleSeriesRef.current.update(updated);
        candlesRef.current[candlesRef.current.length - 1] = updated;

        // ⭐⭐⭐ SEND LIVE PRICE TO TRADEPANEL
        if (typeof onPriceUpdate === "function") {
          onPriceUpdate(livePrice);
        }
      };

      // Save trade websocket reference
      wsRef.currentTrade = wsTrade;
    };

    load();

    return () => {
      cancelled = true;
      wsRef.current?.close();
      wsRef.currentTrade?.close();
    };
  }, [chartSymbol, tfInterval, showEma, showSma]);

  // ---------------- CHART TYPE SWITCHER ----------------
  useEffect(() => {
    if (!chartRef.current) return;

    candleSeriesRef.current.applyOptions({ visible: chartType === "candles" });
    areaSeriesRef.current.applyOptions({ visible: chartType === "area" });
    lineSeriesRef.current.applyOptions({ visible: chartType === "line" });
    barSeriesRef.current.applyOptions({ visible: chartType === "bar" });
  }, [chartType]);

  // ---------------- DRAWING TOOLS HANDLER ----------------
  const toggleDrawingMode = (m) => {
    const newMode = drawingModeRef.current === m ? "none" : m;
    drawingModeRef.current = newMode;
    setDrawingMode(newMode);
    if (newMode !== "trend") trendStartRef.current = null;
  };

  useEffect(() => {
    const intervalClock = setInterval(() => {
      if (autoScroll) {
        chartRef.current.timeScale().scrollToRealTime();
      }
    }, 1000);

    return () => clearInterval(intervalClock);
  }, []);

  // Drawing section

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    function handleClick(param) {
      if (!param.time) return;

      // ✔ FIXED: Chart's internal time → seconds
      const t = Math.floor(param.time);

      const price = param.point
        ? chart.priceScale("right").coordinateToPrice(param.point.y)
        : lastCandleData?.close || 0;

      const mode = drawingModeRef.current;

      switch (mode) {
        case "vl":
          drawVerticalLine(t);
          break;

        case "hl":
          drawHorizontalLine(price);
          break;

        case "trend":
          handleTrendClick({ ...param, time: t });
          break;

        case "ray":
          handleRayClick({ ...param, time: t });
          break;

        case "rectangle":
          handleRectangleClick({ ...param, time: t });
          break;

        case "channel":
          handleChannelClick({ ...param, time: t });
          break;

        case "fibonacci":
          handleFibonacci({ ...param, time: t });
          break;

        default:
          break;
      }
    }
    // ⭐ ADD HERE — HOVER LIVE PRICE LINE
    chart.subscribeCrosshairMove((param) => {
      if (!candleSeriesRef.current) return;

      if (!param.point || !param.time) {
        if (hoverPriceLineRef.current) {
          candleSeriesRef.current.removePriceLine(hoverPriceLineRef.current);
          hoverPriceLineRef.current = null;
        }
        return;
      }

      const price = candleSeriesRef.current.coordinateToPrice(param.point.y);

      if (price == null) {
        if (hoverPriceLineRef.current) {
          candleSeriesRef.current.removePriceLine(hoverPriceLineRef.current);
          hoverPriceLineRef.current = null;
        }
        return;
      }

      const livePrice =
        candlesRef.current[candlesRef.current.length - 1]?.close;

      if (!hoverPriceLineRef.current) {
        hoverPriceLineRef.current = candleSeriesRef.current.createPriceLine({
          price,
          color: "white",
          lineWidth: 2,
          axisLabelVisible: true,
          title: livePrice ? livePrice.toFixed(5) : "",
        });
      }

      hoverPriceLineRef.current.applyOptions({
        price,
        title: livePrice ? livePrice.toFixed(5) : "",
      });
    });

    chart.subscribeClick(handleClick);
    return () => chart.unsubscribeClick(handleClick);
  }, []);

  // ---------------- VERTICAL LINE ----------------
  const drawVerticalLine = (time) => {
    const scale = chartRef.current.priceScale("right").getVisibleRange() || {
      minValue: candlesRef.current[0].low,
      maxValue: candlesRef.current[candlesRef.current.length - 1].high,
    };

    const series = chartRef.current.addLineSeries({
      color: "#facc15",
      lineWidth: 2,
    });

    series.setData([
      { time, value: scale.minValue },
      { time, value: scale.maxValue },
    ]);

    drawingsRef.current.push(series);
  };

  // ---------------- HORIZONTAL LINE ----------------
  const drawHorizontalLine = (price) => {
    const candles = candlesRef.current;
    const t1 = candles[0].time;
    const t2 = candles[candles.length - 1].time;

    const series = chartRef.current.addLineSeries({
      color: "#3b82f6",
      lineWidth: 2,
    });

    series.setData([
      { time: t1, value: price },
      { time: t2, value: price },
    ]);

    drawingsRef.current.push(series);
  };

  // ---------------- TREND LINE (2 Click) ----------------
  const handleTrendClick = (p) => {
    if (!trendStartRef.current) {
      trendStartRef.current = p;
    } else {
      const p1 = trendStartRef.current;
      const p2 = p;

      const y1 = chartRef.current
        .priceScale("right")
        .coordinateToPrice(p1.point.y);
      const y2 = chartRef.current
        .priceScale("right")
        .coordinateToPrice(p2.point.y);

      const series = chartRef.current.addLineSeries({
        color: "#10b981",
        lineWidth: 2,
      });

      series.setData([
        { time: p1.time, value: y1 },
        { time: p2.time, value: y2 },
      ]);

      drawingsRef.current.push(series);
      trendStartRef.current = null;
      drawingModeRef.current = "none";
    }
  };

  // ---------------- RAY (2 Click — infinite extension) ----------------
  const handleRayClick = (p) => {
    if (!trendStartRef.current) {
      trendStartRef.current = p;
    } else {
      const p1 = trendStartRef.current;
      const p2 = p;

      const y1 = chartRef.current
        .priceScale("right")
        .coordinateToPrice(p1.point.y);
      const y2 = chartRef.current
        .priceScale("right")
        .coordinateToPrice(p2.point.y);

      const m = (y2 - y1) / (p2.time - p1.time);
      const lastTime = candlesRef.current[candlesRef.current.length - 1].time;
      const extendY = y1 + m * (lastTime - p1.time);

      const series = chartRef.current.addLineSeries({
        color: "#eab308",
        lineWidth: 2,
      });

      series.setData([
        { time: p1.time, value: y1 },
        { time: lastTime, value: extendY },
      ]);

      drawingsRef.current.push(series);
      trendStartRef.current = null;
      drawingModeRef.current = "none";
    }
  };

  // ---------------- RECTANGLE (2 Click) ----------------
  const rectangleTemp = useRef(null);

  const handleRectangleClick = (p) => {
    const price = chartRef.current
      .priceScale("right")
      .coordinateToPrice(p.point.y);

    if (!rectangleTemp.current) {
      rectangleTemp.current = { t1: p.time, y1: price };
    } else {
      const { t1, y1 } = rectangleTemp.current;

      const t2 = p.time;
      const y2 = price;

      const rectSeries = chartRef.current.addHistogramSeries({
        color: "rgba(59,130,246,0.25)",
      });

      rectSeries.setData([
        { time: t1, value: y1 },
        { time: t1, value: y2 },
        { time: t2, value: y2 },
        { time: t2, value: y1 },
      ]);

      drawingsRef.current.push(rectSeries);

      rectangleTemp.current = null;
      drawingModeRef.current = "none";
    }
  };

  // ---------------- CHANNEL (Parallel Trendlines) ----------------
  const channelTemp = useRef(null);

  const handleChannelClick = (p) => {
    const price = chartRef.current
      .priceScale("right")
      .coordinateToPrice(p.point.y);

    if (!channelTemp.current) {
      channelTemp.current = { t1: p.time, y1: price };
    } else {
      const { t1, y1 } = channelTemp.current;
      const t2 = p.time;
      const y2 = price;

      const series1 = chartRef.current.addLineSeries({
        color: "#38bdf8",
        lineWidth: 2,
      });

      const series2 = chartRef.current.addLineSeries({
        color: "#38bdf8",
        lineWidth: 2,
      });

      series1.setData([
        { time: t1, value: y1 },
        { time: t2, value: y2 },
      ]);

      const gap = y2 - y1;

      series2.setData([
        { time: t1, value: y1 + gap },
        { time: t2, value: y2 + gap },
      ]);

      drawingsRef.current.push(series1);
      drawingsRef.current.push(series2);

      channelTemp.current = null;
      drawingModeRef.current = "none";
    }
  };

  // ---------------- FIBONACCI RETRACEMENT (2 Click) ----------------
  const fibTemp = useRef(null);

  const FIB_LEVELS = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];

  const handleFibonacci = (p) => {
    const price = chartRef.current
      .priceScale("right")
      .coordinateToPrice(p.point.y);

    if (!fibTemp.current) {
      fibTemp.current = { t1: p.time, y1: price };
    } else {
      const { t1, y1 } = fibTemp.current;
      const t2 = p.time;
      const y2 = price;

      FIB_LEVELS.forEach((lvl) => {
        const levelPrice = y1 + (y2 - y1) * lvl;

        const line = chartRef.current.addLineSeries({
          color: "#f472b6",
          lineWidth: 1,
        });

        line.setData([
          { time: t1, value: levelPrice },
          { time: t2, value: levelPrice },
        ]);

        drawingsRef.current.push(line);
      });

      fibTemp.current = null;
      drawingModeRef.current = "none";
    }
  };

  useEffect(() => {
    // if (!timerEnabled) {
    //   setTimeLeft(0);
    //   return;
    // }

    const sec = getIntervalSeconds(tfInterval);

    const now = Math.floor(Date.now() / 1000);
    const remaining = sec - (now % sec);

    // setTimeLeft(remaining);

    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return sec;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [tfInterval]);

  // === EXPIRY PREVIEW LINE ===
  //  // === EXPIRY PREVIEW LINE ===
  useEffect(() => {
    if (!chartRef.current || !candleSeriesRef.current) return;

    // remove old expiry line
    if (expiryLineRef.current) {
      try {
        chartRef.current.removeSeries(expiryLineRef.current);
      } catch {}
      expiryLineRef.current = null;
    }

    if (!expiryPreview) return;

    const expirySec = Math.floor(expiryPreview / 1000);

    const last = candlesRef.current[candlesRef.current.length - 1];
    if (!last) return;

    const min = last.low;
    const max = last.high;

    const series = chartRef.current.addLineSeries({
      color: "#ffbf00",
      lineWidth: 2,
      lineStyle: 2,
    });

    series.setData([
      { time: expirySec - 1, value: min },
      { time: expirySec, value: max },
    ]);

    expiryLineRef.current = series;
  }, [expiryPreview]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);

      markersRef.current = markersRef.current
        .map((m) => {
          const left = m.expiry - now;
          const secLeft = left > 0 ? left : 0;

          return {
            ...m,
            secondsLeft: secLeft,
            text: `${m.amount}$ | ${secLeft}s`,
          };
        })
        .filter((m) => m.secondsLeft > 0);

      candleSeriesRef.current.setMarkers(markersRef.current);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ---------------- UI ----------------
  return (
    <div className="w-full bg-[#050713] border border-[#1f2937] rounded-xl text-gray-100 relative">
      {/* TOP TOOLBAR */}

      <div className="px-3 py-2 border-b border-[#1f2937] bg-[#050713] relative z-50">
        {/* FIRST ROW — Asset + Three Dots */}
        <div className="flex items-center gap-4 ">
          {/* LEFT — ASSET */}
          <div className="relative" ref={dropdownRef}>
            {/* Selected Asset Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="h-10 px-4 bg-[#0f172a] text-gray-200 text-sm rounded-lg border border-[#1e293b] 
               hover:border-gray-500 transition-all flex items-center gap-3 min-w-[160px] justify-between"
            >
              <span className="font-semibold text-[13px]">
                {selectedAsset?.displaySymbol || selectedAsset?.symbol || "BTC"}{" "}
                / USDT
              </span>

              <svg
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Modal */}
            {isOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-[300px] bg-[#0f172a] rounded-xl border 
               border-[#1f2937] shadow-2xl overflow-hidden z-50"
              >
                {/* Header */}
                <div className="px-4 py-2 border-b border-[#1f2937] flex items-center justify-between">
                  <span className="text-gray-400 text-[11px] font-medium uppercase">
                    Asset
                  </span>

                  {/* Right side Cross button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    ✕
                  </button>
                </div>

                {/* Assets List */}

                <div className="max-h-[350px] overflow-y-auto">
                  {assets.map((asset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(asset)}
                      className={`w-full px-4 py-2.5 flex items-center justify-between 
      hover:bg-[#1e293b]/70 transition-all group ${
        selectedAsset?.apiSymbol === asset.apiSymbol ? "bg-[#1e293b]/50" : ""
      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-gray-200 text-sm font-medium">
                            {asset.name}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {asset.displaySymbol || asset.symbol}
                          </div>
                        </div>
                      </div>

                      <div className="text-green-400 text-sm font-bold">
                        {asset.payout}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — THREE DOT BUTTON */}
          <div className="relative">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setIndicatorsOpen(false);
                setChartPopup(false);
                setDrawingPopup(false);
              }}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1e293b] text-white text-xl"
            >
              ⋮
            </button>

            {/* MAIN MENU */}

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-12 bg-[#0f172a] border border-[#1e293b] rounded-xl shadow-xl p-1 z-50">
                {/* Indicators */}
                <button
                  onClick={() => {
                    setIndicatorsOpen(!indicatorsOpen);
                    setChartPopup(false);
                    setDrawingPopup(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#1e293b] rounded-lg text-left text-sm"
                >
                  <BarChart3 className="text-blue-400 w-5 h-5" />
                </button>

                {/* Chart Type */}
                <button
                  onClick={() => {
                    setChartPopup(!chartPopup);
                    setIndicatorsOpen(false);
                    setDrawingPopup(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#1e293b] rounded-lg text-left text-sm"
                >
                  <CandlestickChart className="text-green-400 w-5 h-5" />
                </button>

                {/* Drawing Tools */}
                <button
                  onClick={() => {
                    setDrawingPopup(!drawingPopup);
                    setIndicatorsOpen(false);
                    setChartPopup(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#1e293b] rounded-lg text-left text-sm"
                >
                  <Pencil className="text-yellow-300 w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------- INDICATORS POPUP ---------- */}

      {indicatorsOpen && (
        <div
          ref={indicatorPopupRef}
          className="absolute right-60 left-70 top-30 w-[420px] bg-[#1a1d28] border z-50 border-[#2d3748] rounded-xl shadow-2xl p-4"
        >
          {/* ---------- TABS ---------- */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setIndicatorTab("current")}
              className={`px-4 py-2 rounded-lg text-sm ${
                indicatorTab === "current"
                  ? "bg-[#2d3748] text-white"
                  : "bg-[#252836] text-gray-400"
              }`}
            >
              Current
            </button>

            <button
              onClick={() => setIndicatorTab("all")}
              className={`px-4 py-2 rounded-lg text-sm ${
                indicatorTab === "all"
                  ? "bg-[#2d3748] text-white"
                  : "bg-[#252836] text-gray-400"
              }`}
            >
              All
            </button>
          </div>

          {/* ---------- CURRENT INDICATORS LIST ---------- */}
          {indicatorTab === "current" && (
            <div>
              {Object.keys(activeIndicators).length === 0 && (
                <p className="text-gray-400 text-sm">No indicators applied.</p>
              )}

              {Object.keys(activeIndicators).map((name) => (
                <div
                  key={name}
                  className="flex justify-between items-center bg-[#1f2330] px-3 py-2 rounded-lg mb-2"
                >
                  <span className="text-gray-200 text-sm">{name}</span>

                  <button
                    onClick={() => removeIndicator(name)}
                    className="text-red-400 text-xs font-bold hover:text-red-200"
                  >
                    ✕ Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ---------- ALL INDICATORS LIST ---------- */}
          {indicatorTab === "all" && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 ">
              {/* 🔥 AO */}
              <button
                onClick={() => {
                  const data = calcAO(candlesRef.current);
                  addIndicator("AO", data);
                  // setIndicatorTab("current");
                }}
                className="flex items-center gap-2 px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded"
              >
                <span className="text-orange-500">⭐</span>
                <span>Awesome Oscillator</span>
              </button>

              {/* 🔥 RSI */}
              <button
                onClick={() => {
                  const data = calcRSI(candlesRef.current);
                  addIndicator("RSI", data);
                  // setIndicatorTab("current");
                }}
                className="flex items-center gap-2 px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded"
              >
                <span className="text-orange-500">⭐</span>
                <span>RSI</span>
              </button>

              {/* 🔥 Bulls */}
              <button
                onClick={() => {
                  const data = calcBulls(candlesRef.current);
                  addIndicator("Bulls Power", data);
                  // setIndicatorTab("current");
                }}
                className="flex items-center gap-2 px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded"
              >
                <span className="text-orange-500">⭐</span>
                <span>Bulls Power</span>
              </button>

              {/* 🔥 Bears */}
              <button
                onClick={() => {
                  const data = calcBears(candlesRef.current);
                  addIndicator("Bears Power", data);
                  // setIndicatorTab("current");
                }}
                className="flex items-center gap-2 px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded"
              >
                <span className="text-orange-500">⭐</span>
                <span>Bears Power</span>
              </button>

              <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>MACD</span>
              </button>

              <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>Average True Range</span>
              </button>

              {/* <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>Bollinger Bands</span>
              </button>

              <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>Momentum</span>
              </button>

              <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>Moving Average</span>
              </button>

              <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>Stochastic Oscillator</span>
              </button>

              <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>Williams %R</span>
              </button>

              <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>MACross</span>
              </button>

              <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>ZigZag</span>
              </button>

              <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>Stochastic Momentum Index</span>
              </button>

              <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>Moving Average Deviation</span>
              </button>

              <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>Moving Average Envelope</span>
              </button>

              <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>Acceleration Bands</span>
              </button> */}

              {/* <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>Accumulation Distribution</span>
              </button>

              <button className="flex items-center gap-2 text-left px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded">
                <span className="text-orange-500">⭐</span>
                <span>Accumulative Swing Index</span>
              </button> */}
            </div>
          )}
        </div>
      )}

      {/* ---------- CHART TYPE POPUP ---------- */}
      {chartPopup && (
        <div className="absolute right-60 left-70 top-20  w-80 h-[300px] bg-[#1a1d28] z-50 border border-[#2d3748] rounded-xl shadow-2xl p-4">
          {/* Chart Type Icons */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setChartType("candles")}
              className={`p-3 rounded-lg transition-colors ${
                chartType === "candles"
                  ? "bg-[#2d3748] text-white"
                  : "bg-[#252836] text-gray-400 hover:bg-[#2d3748]"
              }`}
            >
              📊
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`p-3 rounded-lg transition-colors ${
                chartType === "line"
                  ? "bg-[#2d3748] text-white"
                  : "bg-[#252836] text-gray-400 hover:bg-[#2d3748]"
              }`}
            >
              📈
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`p-3 rounded-lg transition-colors ${
                chartType === "bar"
                  ? "bg-[#2d3748] text-white"
                  : "bg-[#252836] text-gray-400 hover:bg-[#2d3748]"
              }`}
            >
              📉
            </button>
            <button
              onClick={() => setChartType("area")}
              className={`p-3 rounded-lg transition-colors ${
                chartType === "area"
                  ? "bg-[#2d3748] text-white"
                  : "bg-[#252836] text-gray-400 hover:bg-[#2d3748]"
              }`}
            >
              🔗
            </button>
          </div>

          {/* Time Frames */}
          <div className="mb-6">
            <h3 className="text-gray-400 text-sm font-medium mb-3">
              Time Frames
            </h3>
            {/* <div className="grid grid-cols-4 gap-2 mb-2">
              {["S5", "S10", "S15", "S30"].map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    const binanceInterval = TIMEFRAME_MAP[time];
                    setTfInterval(binanceInterval);
                  }}
                  className="px-3 py-2 bg-[#252836] text-gray-300 text-sm rounded-lg hover:bg-[#2d3748] transition-colors"
                >
                  {time}
                </button>
              ))}
            </div> */}

            <div className="grid grid-cols-4 gap-2 mb-2">
              {["M1", "M2", "M3", "M5"].map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    const binanceInterval = TIMEFRAME_MAP[time];
                    setTfInterval(binanceInterval);
                  }}
                  className="px-3 py-2 bg-[#252836] text-gray-300 text-sm rounded-lg hover:bg-[#2d3748] transition-colors"
                >
                  {time}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-2 mb-2">
              {["M10", "M15", "M30", "H1"].map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    const binanceInterval = TIMEFRAME_MAP[time];
                    setTfInterval(binanceInterval);
                  }}
                  className="px-3 py-2 bg-[#252836] text-gray-300 text-sm rounded-lg hover:bg-[#2d3748] transition-colors"
                >
                  {time}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {["H4", "D1"].map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    const binanceInterval = TIMEFRAME_MAP[time];
                    setTfInterval(binanceInterval);
                  }}
                  className="px-3 py-2 bg-[#252836] text-gray-300 text-sm rounded-lg hover:bg-[#2d3748] transition-colors"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div>
            {/* <h3 className="text-gray-400 text-sm font-medium mb-3">Settings</h3> */}

            {/* Enable timer */}
            {/* <div className="flex items-center justify-between mb-4 p-3 bg-[#252836] rounded-lg">
              <span className="text-gray-300 text-sm">Enable timer</span>

              <button
                onClick={() => setTimerEnabled(!timerEnabled)}
                className={`w-12 h-6 rounded-full p-1 transition-all relative 
      ${timerEnabled ? "bg-green-500" : "bg-gray-500"}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-all
        ${timerEnabled ? "translate-x-6" : "translate-x-0"}`}
                ></div>
              </button>
            </div> */}

            {/* Enable autoscroll */}
            {/* <div className="flex items-center justify-between p-3 bg-[#252836] rounded-lg">
              <span className="text-gray-300 text-sm">Enable autoscroll</span>
              <button
                className="w-5 h-5 bg-white rounded-full"
                onClick={() => setAutoScroll(!autoScroll)}
              ></button>
            </div> */}
          </div>

          {/* Settings Link */}
          {/* <div className="mt-6 text-center">
            <button className="text-blue-400 text-sm font-medium hover:text-blue-300">
              Settings
            </button>
          </div> */}
        </div>
      )}

      {/* ---------- DRAWING TOOLS POPUP ---------- */}
      {drawingPopup && (
        <div className="absolute right-60 left-70 top-20  w-56 bg-[#1a1d28] border z-50 border-[#2d3748] rounded-xl shadow-2xl p-3">
          <button
            onClick={() => toggleDrawingMode("vl")}
            className="w-full px-3 py-2.5 hover:bg-[#252836] rounded-lg flex items-center gap-3 text-left text-gray-300 text-sm transition-colors"
          >
            <span className="text-lg">|</span>
            <span>Vertical line</span>
          </button>

          <button
            onClick={() => toggleDrawingMode("channel")}
            className="w-full px-3 py-2.5 hover:bg-[#252836] rounded-lg flex items-center gap-3 text-left text-gray-300 text-sm transition-colors"
          >
            <span className="text-lg">/</span>
            <span>Channel</span>
          </button>

          <button
            onClick={() => toggleDrawingMode("hl")}
            className="w-full px-3 py-2.5 hover:bg-[#252836] rounded-lg flex items-center gap-3 text-left text-gray-300 text-sm transition-colors"
          >
            <span className="text-lg">—</span>
            <span>Horizontal line</span>
          </button>

          <button
            onClick={() => toggleDrawingMode("trend")}
            className="w-full px-3 py-2.5 hover:bg-[#252836] rounded-lg flex items-center gap-3 text-left text-gray-300 text-sm transition-colors"
          >
            <span className="text-lg">/</span>
            <span>Trend line</span>
          </button>

          <button
            onClick={() => toggleDrawingMode("ray")}
            className="w-full px-3 py-2.5 hover:bg-[#252836] rounded-lg flex items-center gap-3 text-left text-gray-300 text-sm transition-colors"
          >
            <span className="text-lg">/</span>
            <span>Ray</span>
          </button>

          <button
            onClick={() => toggleDrawingMode("fibonacci")}
            className="w-full px-3 py-2.5 hover:bg-[#252836] rounded-lg flex items-center gap-3 text-left text-gray-300 text-sm transition-colors"
          >
            <span className="text-lg">≡</span>
            <span>Fibonacci Retracement</span>
          </button>

          <button
            onClick={() => toggleDrawingMode("rectangle")}
            className="w-full px-3 py-2.5 hover:bg-[#252836] rounded-lg flex items-center gap-3 text-left text-gray-300 text-sm transition-colors"
          >
            <span className="text-lg">/</span>
            <span>Rectangle</span>
          </button>
        </div>
      )}

      {/* ---------- CHART ---------- */}
      <div
        ref={containerRef}
        className="w-full relative z-0"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};

export default PocketOptionChart;
