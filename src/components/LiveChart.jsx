

import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { BarChart3, CandlestickChart, Pencil , Maximize2, Minimize2} from "lucide-react";

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
  if (!intv || typeof intv !== "string") return 60;

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
  activeAsset,
  setActiveAsset,
  symbol = "BTCUSDT",
  initialInterval = "1m",
  height = window.innerWidth < 768 ? 420 : 890,
  expiryPreview,
  addTradeMarker,
}) => {
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState({
    name: "BTC / USDT",
    displaySymbol: "BTC",
    symbol: "BTCUSDT",
    apiSymbol: "BTCUSDT",
    image: "https://assets.coincap.io/assets/icons/btc@2x.png",
    payout: "+82%",
  });

  const [chartSymbol, setChartSymbol] = useState("BTCUSDT");
  const dropdownRef = useRef(null);

  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getIndicatorDataByName = (name, candles) => {
    switch (name) {
      case "AO": return calcAO(candles);
      case "RSI": return calcRSI(candles);
      case "Bulls Power": return calcBulls(candles);
      case "Bears Power": return calcBears(candles);
      default: return null;
    }
  };

  // Load Assets
  useEffect(() => {
    const randomPayout = () => {
      const values = [70, 75, 80, 82, 85, 87, 90, 92];
      return values[Math.floor(Math.random() * values.length)] + "%";
    };

    const loadBinanceAssets = async () => {
      try {
        const res = await fetch("https://api.binance.com/api/v3/ticker/price");
        const json = await res.json();

        if (Array.isArray(json)) {
          const usdtSymbols = json.filter((s) => {
            return s.symbol.endsWith("USDT") && 
                   !s.symbol.includes("UP") && 
                   !s.symbol.includes("DOWN") && 
                   !s.symbol.includes("BULL") && 
                   !s.symbol.includes("BEAR");
          });

          const mapped = usdtSymbols.map((s) => {
            const baseAsset = s.symbol.replace("USDT", "");
            const iconUrl = `https://assets.coincap.io/assets/icons/${baseAsset.toLowerCase()}@2x.png`;

            return {
              name: `${baseAsset} / USDT`,
              displaySymbol: baseAsset,
              apiSymbol: s.symbol,
              symbol: s.symbol,
              id: s.symbol,
              image: iconUrl, 
              payout: "+" + randomPayout(),
            };
          });

          setAssets(mapped);

          if (mapped.length > 0 && !activeAsset) {
             const btc = mapped.find(m => m.displaySymbol === "BTC");
             const defaultAsset = btc || mapped[0];

             setSelectedAsset(defaultAsset);
             setChartSymbol(defaultAsset.apiSymbol);
             if(setActiveAsset) setActiveAsset(defaultAsset);
          }
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
    setChartSymbol(asset.apiSymbol);
    setActiveAsset(asset);
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
  const mainContainerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Data references
  const livePriceLineRef = useRef(null);
  const candlesRef = useRef([]);
  const drawingsRef = useRef([]);
  const drawingModeRef = useRef("none");
  const trendStartRef = useRef(null);

  const [activeIndicators, setActiveIndicators] = useState({});

  // States
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

  // EMA
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

  // Awesome Oscillator formula
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

  // SMA
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

  // Update Indicators
  const updateIndicators = () => {
    const data = candlesRef.current;
    if (!data.length) return;

    if (showEma) {
      if (!emaSeriesRef.current) {
        emaSeriesRef.current = chartRef.current.addLineSeries({
          lineWidth: 1,
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

  // Add Indicator
  const addIndicator = (name, data) => {
    if (!chartRef.current) return;
    
    if (activeIndicators[name]) return;

const isOscillator = ["RSI", "AO", "MACD", "Bulls Power", "Bears Power", "ATR", "CCI", "Stoch"].some(type => name.includes(type));
    let series;

    if (isOscillator) {
      series = chartRef.current.addLineSeries({
        lineWidth: 2,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        priceScaleId: name,
        scaleMargins: { top: 0.8, bottom: 0 },
      });
    } else {
      series = chartRef.current.addLineSeries({
        lineWidth: 2,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        priceScaleId: 'right',
      });
    }

    series.setData(data);

    const newIndicators = { ...activeIndicators, [name]: series };
    setActiveIndicators(newIndicators);

    localStorage.setItem("savedIndicators", JSON.stringify(Object.keys(newIndicators)));
  };

  // Remove Indicator
  const removeIndicator = (name) => {
    if (activeIndicators[name]) {
      try {
        chartRef.current.removeSeries(activeIndicators[name]);
      } catch (e) { console.log("Remove error:", e); }
    }

    const newIndicators = { ...activeIndicators };
    delete newIndicators[name];
    
    setActiveIndicators(newIndicators);
    
    localStorage.setItem("savedIndicators", JSON.stringify(Object.keys(newIndicators)));
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

  // FULLSCREEN LOGIC - Close all popups before entering fullscreen
  const toggleFullscreen = async () => {
    if (!mainContainerRef.current) return;

    try {
      if (!isFullscreen) {
        // Close all popups first
        setIndicatorsOpen(false);
        setChartPopup(false);
        setDrawingPopup(false);
        setIsOpen(false);

        // Wait a bit for popups to close
        await new Promise(resolve => setTimeout(resolve, 100));

        // Enter Fullscreen
        if (mainContainerRef.current.requestFullscreen) {
          await mainContainerRef.current.requestFullscreen();
        } else if (mainContainerRef.current.webkitRequestFullscreen) {
          await mainContainerRef.current.webkitRequestFullscreen();
        } else if (mainContainerRef.current.mozRequestFullScreen) {
          await mainContainerRef.current.mozRequestFullScreen();
        } else if (mainContainerRef.current.msRequestFullscreen) {
          await mainContainerRef.current.msRequestFullscreen();
        }
      } else {
        // Exit Fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  // Listen for ESC key or fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);

      const before = markersRef.current.length;

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

  // CHART INIT
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      layout: {
        background: { color: "#050713" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "#111827" },
        horzLines: { color: "#111827" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { labelBackgroundColor: '#1f2937' },
        horzLine: { labelBackgroundColor: '#1f2937' },
      },
      rightPriceScale: {
        visible: true,
        borderColor: "#1f2937",
        borderVisible: true,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      timeScale: {
        borderColor: "#1f2937",
        timeVisible: true,
        secondsVisible: true,
        rightOffset: 2,
        shiftVisibleRangeOnNewBar: true,
      },
    });

    chart.priceScale("right").applyOptions({
      borderColor: "#1f2937",
      visible: true,
      entireTextOnly: false,
      autoScale: true,
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
      lastValueVisible: true,
      priceLineVisible: true,
      priceFormat: {
        type: 'price',
        precision: 2,
        minMove: 0.01,
      },
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;

    areaSeriesRef.current = chart.addAreaSeries({ 
      lineColor: "#10b981", 
      topColor: "rgba(16, 185, 129, 0.2)", 
      bottomColor: "rgba(16, 185, 129, 0)", 
      visible: false 
    });
    lineSeriesRef.current = chart.addLineSeries({ color: "#3b82f6", visible: false });
    barSeriesRef.current = chart.addBarSeries({ color: "#ef4444", visible: false });

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 0 || !entries[0].contentRect) return;
      
      const { width, height } = entries[0].contentRect;
      
      if (width > 0 && height > 0) {
        chart.applyOptions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
    };

  }, []);

  // LOAD CANDLES + WS LIVE
  useEffect(() => {
    let cancelled = false;

    const VALID_BINANCE_TF = ["1m", "2m", "3m", "5m", "15m", "30m", "1h", "4h", "1d"];

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
      barSeriesRef.current.setData(candles);
      
      const simpleData = candles.map((c) => ({ time: c.time, value: c.close }));
      areaSeriesRef.current.setData(simpleData);
      lineSeriesRef.current.setData(simpleData);

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
        barSeriesRef.current.update(live);
        
        const lineUpdate = { time: live.time, value: live.close };
        areaSeriesRef.current.update(lineUpdate);
        lineSeriesRef.current.update(lineUpdate);

        const lastIndex = candlesRef.current.length - 1;
        candlesRef.current[lastIndex] = live;

        if (typeof onPriceUpdate === "function") {
          onPriceUpdate(live.close);
        }

        setLastCandleData(live);
      };

      const wsTrade = new WebSocket(
        `wss://stream.binance.com:9443/ws/${chartSymbol.toLowerCase()}@trade`
      );
      wsTrade.onmessage = (msg) => {
        const t = JSON.parse(msg.data);
        const livePrice = +t.p;
        onPriceUpdate?.(livePrice);

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
        barSeriesRef.current.update(updated);

        const lineUpdate = { time: updated.time, value: updated.close };
        areaSeriesRef.current.update(lineUpdate);
        lineSeriesRef.current.update(lineUpdate);

        candlesRef.current[candlesRef.current.length - 1] = updated;

        if (typeof onPriceUpdate === "function") {
          onPriceUpdate(livePrice);
        }
      };

      wsRef.currentTrade = wsTrade;
    };

    load();

    return () => {
      cancelled = true;
      wsRef.current?.close();
      wsRef.currentTrade?.close();
    };
  }, [chartSymbol, tfInterval, showEma, showSma]);

  // CHART TYPE SWITCHER
  useEffect(() => {
    if (!chartRef.current) return;

    candleSeriesRef.current.applyOptions({ visible: chartType === "candles" });
    areaSeriesRef.current.applyOptions({ visible: chartType === "area" });
    lineSeriesRef.current.applyOptions({ visible: chartType === "line" });
    barSeriesRef.current.applyOptions({ visible: chartType === "bar" });
  }, [chartType]);

  // DRAWING TOOLS HANDLER
  const toggleDrawingMode = (m) => {
    const newMode = drawingModeRef.current === m ? "none" : m;
    drawingModeRef.current = newMode;
    setDrawingMode(newMode);
    if (newMode !== "trend") trendStartRef.current = null;
  };

  // Drawing section
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;



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

chart.subscribeClick((param) => {
  if (!param.time || !param.point) return;

  const price = candleSeriesRef.current.coordinateToPrice(param.point.y);
  const t = Math.floor(param.time);
  const mode = drawingModeRef.current;

  if (mode === "vl") drawVerticalLine(t);
  if (mode === "hl") drawHorizontalLine(price);
  if (mode === "trend") handleTrendClick({ ...param, time: t });
  if (mode === "ray") handleRayClick({ ...param, time: t });
  if (mode === "rectangle") handleRectangleClick({ ...param, time: t });
  if (mode === "channel") handleChannelClick({ ...param, time: t });
  if (mode === "fibonacci") handleFibonacci({ ...param, time: t });
});
  }, []);

  // VERTICAL LINE
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

  // HORIZONTAL LINE
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

  // TREND LINE (2 Click)
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

  // RAY (2 Click — infinite extension)
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

  // RECTANGLE (2 Click)
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

  // CHANNEL (Parallel Trendlines)
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

  // FIBONACCI RETRACEMENT (2 Click)
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
    const sec = getIntervalSeconds(tfInterval);

    const now = Math.floor(Date.now() / 1000);
    const remaining = sec - (now % sec);

    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return sec;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [tfInterval]);

  // EXPIRY PREVIEW LINE
  useEffect(() => {
    if (!chartRef.current || !candleSeriesRef.current) return;

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

  // UI RENDER
  return (
<div
  ref={mainContainerRef}
  className="flex flex-col bg-[#050713] w-full border border-[#1f2937] rounded-xl relative"
  style={{ 
      height: height ,
      width: '100%'
  }}
>

{/* TOP TOOLBAR */}
<div className="px-2 sm:px-3 py-2 border-b border-[#1f2937] bg-[#050713] relative z-50 shrink-0">
  <div className="flex items-center justify-between gap-2 sm:gap-4">
    
    {/* LEFT — ASSET SELECTOR */}
    <div className="relative flex-1 min-w-0 max-w-[240px]" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setSearchTerm(""); 
        }}
        className="h-9 sm:h-10 w-full px-2 sm:px-3 bg-[#0f172a] text-gray-200 text-xs sm:text-sm rounded-lg border border-[#1e293b] hover:border-gray-500 transition-all flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <img 
            src={selectedAsset?.image || "https://cdn-icons-png.flaticon.com/512/1213/1213079.png"} 
            alt="" 
            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex-shrink-0"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://cdn-icons-png.flaticon.com/512/1213/1213079.png";
            }}
          />
          <span className="font-semibold truncate">
            {selectedAsset?.name || "BTC / USDT"}
          </span>
        </div>
        <svg className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[85vw] sm:w-[320px] bg-[#0f172a] rounded-xl border border-[#1f2937] shadow-2xl overflow-hidden z-50 flex flex-col">
          
          {/* SEARCH BAR */}
          <div className="p-3 border-b border-[#1f2937]">
            <input 
              type="text"
              placeholder="Search coin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="w-full bg-[#1e293b] text-white text-sm px-3 py-2 rounded-lg outline-none border border-transparent focus:border-blue-500 transition-all placeholder-gray-500"
            />
          </div>

          {/* Asset List */}
          <div className="max-h-[280px] overflow-y-auto">
            {assets
              .filter(asset => 
                asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                asset.displaySymbol.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((asset, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(asset)}
                className={`w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#1e293b]/70 transition-all group ${selectedAsset?.apiSymbol === asset.apiSymbol ? "bg-[#1e293b]/50" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={asset.image} 
                    alt={asset.displaySymbol} 
                    className="w-6 h-6 rounded-full bg-white/5 p-0.5"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://cdn-icons-png.flaticon.com/512/1213/1213079.png";
                    }} 
                  />
                  <div className="text-left">
                    <div className="text-gray-200 text-sm font-medium">{asset.name}</div>
                    <div className="text-gray-500 text-[10px]">{asset.displaySymbol}</div>
                  </div>
                </div>
                <div className="text-green-400 text-sm font-bold bg-green-400/10 px-2 py-1 rounded">{asset.payout}</div>
              </button>
            ))}
            
            {assets.filter(asset => asset.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
              <div className="p-4 text-center text-gray-500 text-sm">No assets found</div>
            )}
          </div>
        </div>
      )}
    </div>

    {/* RIGHT — TOOLS BUTTONS */}
    <div className="flex items-center gap-1.5 sm:gap-2">
      
      {/* 1. Indicators Button */}
      <button
        onClick={() => {
          setIndicatorsOpen(!indicatorsOpen);
          setChartPopup(false);
          setDrawingPopup(false);
        }}
        className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-[#1e293b] hover:bg-[#1e293b] transition-colors ${indicatorsOpen ? "bg-[#1e293b] text-blue-400" : "bg-[#0f172a] text-gray-400"}`}
        title="Indicators"
      >
        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* 2. Chart Type Button */}
      <button
        onClick={() => {
          setChartPopup(!chartPopup);
          setIndicatorsOpen(false);
          setDrawingPopup(false);
        }}
        className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-[#1e293b] hover:bg-[#1e293b] transition-colors ${chartPopup ? "bg-[#1e293b] text-green-400" : "bg-[#0f172a] text-gray-400"}`}
        title="Chart Type"
      >
        <CandlestickChart className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* 3. Drawing Tools Button */}
      <button
        onClick={() => {
          setDrawingPopup(!drawingPopup);
          setIndicatorsOpen(false);
          setChartPopup(false);
        }}
        className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-[#1e293b] hover:bg-[#1e293b] transition-colors ${drawingPopup ? "bg-[#1e293b] text-yellow-400" : "bg-[#0f172a] text-gray-400"}`}
        title="Drawing Tools"
      >
        <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* 4. Fullscreen Button */}
      <button 
        onClick={toggleFullscreen} 
        className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-[#1e293b] hover:bg-[#1e293b] text-gray-400 transition-colors" 
        title="Fullscreen"
      >
        {isFullscreen ? <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
      </button>
      
    </div>
  </div>
</div>


{/* 1. INDICATORS POPUP */}
{indicatorsOpen && !isFullscreen && (
  <>
    <div
      className="fixed inset-0 z-40 bg-black/50 md:hidden"
      onClick={(e) => {
        e.stopPropagation();
        setIndicatorsOpen(false);
      }}
    ></div>

    <div
      ref={indicatorPopupRef}
      className="absolute top-12 left-2 right-2 bottom-auto max-h-[80vh] overflow-y-auto z-50 bg-[#1a1d28] border border-[#2d3748] rounded-xl shadow-2xl p-4 
      md:right-0 md:left-auto md:w-[420px] md:h-auto md:overflow-visible"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setIndicatorsOpen(false)}
        className="absolute top-3 right-3 z-50 text-gray-400 hover:text-white bg-[#1a1d28] rounded-full p-1"
      >
        ✕
      </button>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 sticky top-0 bg-[#1a1d28] z-10 py-1 pr-8">
        <button
          onClick={() => setIndicatorTab("current")}
          className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
            indicatorTab === "current"
              ? "bg-[#2d3748] text-white"
              : "bg-[#252836] text-gray-400"
          }`}
        >
          Current
        </button>

        <button
          onClick={() => setIndicatorTab("all")}
          className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
            indicatorTab === "all"
              ? "bg-[#2d3748] text-white"
              : "bg-[#252836] text-gray-400"
          }`}
        >
          All
        </button>
      </div>

      {/* Current Indicators List */}
      {indicatorTab === "current" && (
        <div>
          {Object.keys(activeIndicators).length === 0 && (
            <p className="text-gray-400 text-sm text-center py-4">
              No indicators applied.
            </p>
          )}

          {Object.keys(activeIndicators).map((name) => (
            <div
              key={name}
              className="flex justify-between items-center bg-[#1f2330] px-3 py-3 rounded-lg mb-2"
            >
              <span className="text-gray-200 text-sm">{name}</span>

              <button
                onClick={() => removeIndicator(name)}
                className="text-red-400 text-xs font-bold hover:text-red-200 px-2 py-1"
              >
                ✕ Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* All Indicators List */}
      {indicatorTab === "all" && (
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              name: "Awesome Oscillator",
              func: () => addIndicator("AO", calcAO(candlesRef.current)),
            },
            {
              name: "RSI",
              func: () =>
                addIndicator("RSI", calcRSI(candlesRef.current)),
            },
            {
              name: "Bulls Power",
              func: () =>
                addIndicator(
                  "Bulls Power",
                  calcBulls(candlesRef.current)
                ),
            },
            {
              name: "Bears Power",
              func: () =>
                addIndicator(
                  "Bears Power",
                  calcBears(candlesRef.current)
                ),
            },
            { name: "MACD", func: null }, 
            { name: "ATR", func: null }, 
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={item.func}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#252836] rounded-lg bg-[#1f2330] md:bg-transparent transition-colors"
            >
              <span className="text-orange-500">⭐</span>
              <span className="truncate">{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  </>
)}


{/* 2. CHART TYPE POPUP */}
{chartPopup && !isFullscreen && (
  <>
    <div
      className="fixed inset-0 z-40 bg-black/50 md:hidden"
      onClick={(e) => {
        e.stopPropagation();
        setChartPopup(false);
      }}
    ></div>

    <div
      className="absolute top-12 left-4 right-4 z-50 bg-[#1a1d28] border border-[#2d3748] rounded-xl shadow-2xl p-4 
       md:right-20 md:left-auto md:w-[320px]"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setChartPopup(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-white p-1 rounded-full hover:bg-[#252836] transition-colors"
      >
        ✕
      </button>

      {/* Chart Type Icons */}
      <div className="flex justify-between gap-2 mb-4 mt-4">
        {["candles", "line", "bar", "area"].map((type) => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            className={`flex-1 p-3 rounded-lg transition-colors flex justify-center items-center ${
              chartType === type
                ? "bg-[#2d3748] text-white"
                : "bg-[#252836] text-gray-400 hover:bg-[#2d3748]"
            }`}
          >
            {type === "candles" && "📊"}
            {type === "line" && "📈"}
            {type === "bar" && "📉"}
            {type === "area" && "🔗"}
          </button>
        ))}
      </div>

      {/* Time Frames */}
      <div className="mb-2">
        <h3 className="text-gray-400 text-sm font-medium mb-3">
          Time Frames
        </h3>
        <div className="flex flex-col gap-2">
          {[
            ["M1", "M2", "M3", "M5"],
            ["M10", "M15", "M30", "H1"],
            ["H4", "D1"],
          ].map((row, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-4 gap-2">
              {row.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    if (TIMEFRAME_MAP[time])
                      setTfInterval(TIMEFRAME_MAP[time]);
                  }}
                  className="px-2 py-2 bg-[#252836] text-gray-300 text-xs sm:text-sm rounded-lg hover:bg-[#2d3748] transition-colors text-center"
                >
                  {time}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
)}


{/* 3. DRAWING TOOLS POPUP */}
{drawingPopup && !isFullscreen && (
  <>
    <div
      className="fixed inset-0 z-40 bg-black/50 md:hidden"
      onClick={(e) => {
        e.stopPropagation();
        setDrawingPopup(false);
      }}
    ></div>

    <div
      className="absolute top-12 left-4 z-50 w-[220px] bg-[#1a1d28] border border-[#2d3748] rounded-xl shadow-2xl p-3 pt-10 
     md:right-40 md:left-auto md:pt-3"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setDrawingPopup(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-white p-1 rounded-full hover:bg-[#252836] transition-colors"
      >
        ✕
      </button>

      <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
        {[
          { id: "vl", icon: "|", label: "Vertical line" },
          { id: "channel", icon: "/", label: "Channel" },
          { id: "hl", icon: "—", label: "Horizontal line" },
          { id: "trend", icon: "/", label: "Trend line" },
          { id: "ray", icon: "/", label: "Ray" },
          { id: "fibonacci", icon: "≡", label: "Fibonacci" },
          { id: "rectangle", icon: "□", label: "Rectangle" },
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => toggleDrawingMode(tool.id)}
            className="w-full px-3 py-3 md:py-2 hover:bg-[#252836] rounded-lg flex items-center gap-3 text-left text-gray-300 text-sm transition-colors border-b border-[#2d3748] md:border-none last:border-none"
          >
            <span className="text-lg w-6 text-center">{tool.icon}</span>
            <span>{tool.label}</span>
          </button>
        ))}
      </div>
    </div>
  </>
)}


{/* Chart Container */}
<div className="relative flex-1 w-full min-h-0">
  <div ref={containerRef} className="absolute inset-0 w-full h-full" 
    style={{ pointerEvents: "auto" }}

  />
  
</div>
</div>
);
};

export default PocketOptionChart;