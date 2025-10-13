import { useState, useEffect, useMemo, useRef } from 'react';
import Chart from 'react-apexcharts';
import { TrendingUp, TrendingDown, Clock, BarChart2, Settings, Zap, Layers, Star, Check } from 'lucide-react';

const PriceChart = () => {
  // Helper functions (unchanged)
  const getDurationMs = (tf) => {
    const map = {
      '5s': 5 * 1000,
      '15s': 15 * 1000,
      '1m': 60 * 1000,
      '5m': 5 * 60 * 1000,
      '15m': 15 * 60 * 1000,
      '1h': 3600 * 1000,
      '4h': 4 * 3600 * 1000,
      '1D': 24 * 3600 * 1000,
      '1W': 7 * 24 * 3600 * 1000,
      '1M': 30 * 24 * 3600 * 1000,
    };
    return map[tf] || 60 * 1000;
  };

  const generateInitialData = (timeframe) => {
    const duration = getDurationMs(timeframe);
    const data = [];
    let currentPrice = 45000;
    for (let i = 0; i < 100; i++) {
      const time = Date.now() - (100 - i) * duration;
      const date = new Date(time);

      const gap = (Math.random() - 0.5) * 200;
      const open = currentPrice + gap;
      const change = (Math.random() - 0.5) * 800;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 300;
      const low = Math.min(open, close) - Math.random() * 300;

      data.push({
        x: new Date(time),
        y: [parseFloat(open.toFixed(2)), parseFloat(high.toFixed(2)), parseFloat(low.toFixed(2)), parseFloat(close.toFixed(2))],
        volume: Math.floor(Math.random() * 3000000 + 500000),
        isGreen: close >= open
      });

      currentPrice = close;
    }
    return data;
  };

  const updateLastCandle = (prevData) => {
    if (prevData.length === 0) return prevData;
    const newData = [...prevData];
    const last = newData[newData.length - 1];

    const change = (Math.random() - 0.5) * 400;
    const newClose = last.y[3] + change;
    const newHigh = Math.max(last.y[1], newClose);
    const newLow = Math.min(last.y[2], newClose);

    newData[newData.length - 1] = {
      ...last,
      y: [last.y[0], newHigh, newLow, newClose],
      volume: last.volume + Math.floor(Math.random() * 1000000 + 100000),
      isGreen: newClose >= last.y[0]
    };

    return newData;
  };

  const computeEnrichedData = (candleData, indicatorsObj) => {
    const closes = candleData.map(d => d.y[3]);
    const highs = candleData.map(d => d.y[1]);
    const lows = candleData.map(d => d.y[2]);
    const sma20 = [];
    const sma50 = [];
    const bbUpper = [];
    const bbLower = [];
    const bbMiddle = [];
    const rsi = [];
    const macd = [];
    const macdSignal = [];
    const macdHistogram = [];

    // RSI calculation (simplified 14-period)
    const computeRSI = (prices, period = 14) => {
      let gains = 0;
      let losses = 0;
      for (let i = 1; i <= period; i++) {
        const change = prices[i] - prices[i - 1];
        if (change > 0) gains += change;
        else losses -= change;
      }
      let avgGain = gains / period;
      let avgLoss = losses / period;
      let rs = avgGain / avgLoss;
      let rsiValue = 100 - (100 / (1 + rs));
      return rsiValue;
    };

    // MACD calculation (simplified EMA12, EMA26, signal9)
    const ema = (data, period) => {
      const multiplier = 2 / (period + 1);
      let emaValue = data[0];
      return data.map((_, i) => {
        if (i === 0) return emaValue;
        emaValue = (data[i] * multiplier) + (emaValue * (1 - multiplier));
        return emaValue;
      });
    };

    closes.forEach((close, i) => {
      // SMA 20
      if (indicatorsObj.sma20 && i >= 19) {
        const sum = closes.slice(i - 19, i + 1).reduce((acc, curr) => acc + curr, 0);
        sma20.push(sum / 20);
      } else {
        sma20.push(null);
      }
      // SMA 50
      if (indicatorsObj.sma50 && i >= 49) {
        const sum = closes.slice(i - 49, i + 1).reduce((acc, curr) => acc + curr, 0);
        sma50.push(sum / 50);
      } else {
        sma50.push(null);
      }
      // Bollinger Bands
      if (indicatorsObj.bb && i >= 19) {
        const slice = closes.slice(i - 19, i + 1);
        const mean = slice.reduce((acc, curr) => acc + curr, 0) / 20;
        const variance = slice.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / 20;
        const std = Math.sqrt(variance);
        bbMiddle.push(mean);
        bbUpper.push(mean + 2 * std);
        bbLower.push(mean - 2 * std);
      } else {
        bbUpper.push(null);
        bbLower.push(null);
        bbMiddle.push(null);
      }
      // RSI
      if (indicatorsObj.rsi && i >= 14) {
        rsi.push(computeRSI(closes.slice(0, i + 1)));
      } else {
        rsi.push(null);
      }
      // MACD
      if (indicatorsObj.macd && i >= 25) {
        const ema12 = ema(closes.slice(0, i + 1), 12);
        const ema26 = ema(closes.slice(0, i + 1), 26);
        const macdLine = ema12[i] - ema26[i];
        macd.push(macdLine);
        const signal = ema(macd.slice(0, i + 1), 9);
        macdSignal.push(signal[i]);
        macdHistogram.push(macdLine - signal[i]);
      } else {
        macd.push(null);
        macdSignal.push(null);
        macdHistogram.push(null);
      }
    });

    return candleData.map((d, i) => ({
      ...d,
      sma20: sma20[i],
      sma50: sma50[i],
      bbUpper: bbUpper[i],
      bbLower: bbLower[i],
      bbMiddle: bbMiddle[i],
      rsi: rsi[i],
      macd: macd[i],
      macdSignal: macdSignal[i],
      macdHistogram: macdHistogram[i]
    }));
  };

  // State (unchanged)
  const [timeframe, setTimeframe] = useState('1m');
  const [chartType, setChartType] = useState('line');
  const [indicators, setIndicators] = useState({
    sma20: false, sma50: false, bb: false, rsi: false, macd: false,
    ac: false, adx: false, all: false, aro: false, atr: false, ao: false,
    bep: false, bbw: false, bup: false, cci: false, dc: false, dem: false,
    env: false, fra: false, fcb: false, icc: false, kch: false, mom: false,
    ma: false, osma: false, sar: false, roc: false, stc: false, so: false,
    sut: false, vor: false, will: false, zz: false
  });
  const [showIndicatorsMenu, setShowIndicatorsMenu] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
  const [candleData, setCandleData] = useState(() => generateInitialData('1m'));
  const [currentPrice, setCurrentPrice] = useState(45000);
  const [startPrice, setStartPrice] = useState(45000);
  const [xaxisRange, setXaxisRange] = useState({ min: undefined, max: undefined });

  const latestRangeRef = useRef({ min: undefined, max: undefined });
  const zoomDebounceTimer = useRef(null);

  // Effects (unchanged)
  useEffect(() => {
    const newData = generateInitialData(timeframe);
    setCandleData(newData);
    setStartPrice(newData[0]?.y[0] || 45000);
    setXaxisRange({ min: undefined, max: undefined });
    setCurrentPrice(newData[newData.length - 1]?.y[3] || 45000);
  }, [timeframe]);

  useEffect(() => {
    if (candleData.length > 0 && startPrice === 45000) {
      setStartPrice(candleData[0].y[0]);
      setCurrentPrice(candleData[candleData.length - 1].y[3]);
    }
  }, [candleData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCandleData((prevData) => {
        const newData = updateLastCandle(prevData);
        setCurrentPrice(newData[newData.length - 1].y[3]);
        return newData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeframe]);

  useEffect(() => {
    return () => {
      if (zoomDebounceTimer.current) clearTimeout(zoomDebounceTimer.current);
    };
  }, []);

  const enrichedData = useMemo(() => computeEnrichedData(candleData, indicators), [candleData, indicators]);

  const computeMainChartSeries = (enriched, type, indicatorsObj) => {
    let series = [
      {
        name: 'Price',
        data: enriched.map(d => {
          if (type === 'candles') {
            return { x: d.x, y: d.y };
          } else if (type === 'bars') {
            return {
              x: d.x,
              y: [d.y[2], d.y[1]],
              color: d.isGreen ? '#00ff88' : '#ff4444'
            };
          } else {
            return { x: d.x, y: d.y[3] };
          }
        })
      }
    ];

    if (type !== 'candles') {
      if (indicatorsObj.sma20) {
        const hasSma20 = enriched.some(d => d.sma20 !== null);
        if (hasSma20) {
          series.push({
            name: 'SMA20',
            data: enriched.map((d, i) => ({
              x: d.x,
              y: d.sma20
            })).filter(d => d.y !== null),
            color: '#00bfff'
          });
        }
      }
      if (indicatorsObj.sma50) {
        const hasSma50 = enriched.some(d => d.sma50 !== null);
        if (hasSma50) {
          series.push({
            name: 'SMA50',
            data: enriched.map((d, i) => ({
              x: d.x,
              y: d.sma50
            })).filter(d => d.y !== null),
            color: '#ffa500'
          });
        }
      }
      if (indicatorsObj.bb) {
        const hasBb = enriched.some(d => d.bbUpper !== null);
        if (hasBb) {
          series.push({
            name: 'BB Upper',
            data: enriched.map((d, i) => ({
              x: d.x,
              y: d.bbUpper
            })).filter(d => d.y !== null),
            color: '#ffff00',
            strokeDashArray: 5
          });
          series.push({
            name: 'BB Lower',
            data: enriched.map((d, i) => ({
              x: d.x,
              y: d.bbLower
            })).filter(d => d.y !== null),
            color: '#ffff00',
            strokeDashArray: 5
          });
        }
      }
      if (indicatorsObj.rsi) {
        const hasRsi = enriched.some(d => d.rsi !== null);
        if (hasRsi) {
          series.push({
            name: 'RSI',
            data: enriched.map((d, i) => ({
              x: d.x,
              y: d.rsi
            })).filter(d => d.y !== null),
            color: '#ff69b4'
          });
        }
      }
      if (indicatorsObj.macd) {
        const hasMacd = enriched.some(d => d.macd !== null);
        if (hasMacd) {
          series.push({
            name: 'MACD',
            data: enriched.map((d, i) => ({
              x: d.x,
              y: d.macd
            })).filter(d => d.y !== null),
            color: '#00ff00'
          });
          series.push({
            name: 'MACD Signal',
            data: enriched.map((d, i) => ({
              x: d.x,
              y: d.macdSignal
            })).filter(d => d.y !== null),
            color: '#ff0000'
          });
        }
      }
    }

    return series;
  };

  const mainChartSeries = useMemo(() => computeMainChartSeries(enrichedData, chartType, indicators), [enrichedData, chartType, indicators]);

  const priceChange = currentPrice - startPrice;
  const changePercent = ((priceChange / startPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  const priceColor = chartType === 'line' ? "#1e90ff" : "#00ff88";

  const getColumnWidth = () => {
    if (xaxisRange.min === undefined || xaxisRange.max === undefined) {
      return '100%';
    }
    const visiblePoints = enrichedData.filter(d => 
      d.x.getTime() >= xaxisRange.min && d.x.getTime() <= xaxisRange.max
    ).length;
    if (visiblePoints <= 5) {
      return '95%';
    } else if (visiblePoints <= 15) {
      return '85%';
    } else if (visiblePoints <= 50) {
      return '70%';
    } else {
      return '50%';
    }
  };

  const columnWidth = getColumnWidth();

  const handleIndicatorChange = (key) => {
    setIndicators(prev => ({ ...prev, [key]: !prev[key] }));
    if (!['sma20', 'sma50', 'bb', 'rsi', 'macd'].includes(key)) {
      console.log(`Indicator ${key} toggled - Implementation pending`);
    }
  };

  const handleApplyIndicators = () => {
    setShowIndicatorsMenu(false);
    console.log('Applied indicators:', indicators);
  };

  const indicatorsData = [
    { type: 'sma20', name: 'SMA 20' },
    { type: 'sma50', name: 'SMA 50' },
    { type: 'bb', name: 'Bollinger Bands' },
    { type: 'rsi', name: 'RSI' },
    { type: 'macd', name: 'MACD' },
    { type: 'ac', name: 'Accelerator Oscillator' },
    { type: 'adx', name: 'ADX' },
    { type: 'all', name: 'Alligator' },
    { type: 'aro', name: 'Aroon' },
    { type: 'atr', name: 'Average True Range' },
    { type: 'ao', name: 'Awesome Oscillator' },
    { type: 'bep', name: 'Bears Power' },
    { type: 'bbw', name: 'Bollinger Bands Width' },
    { type: 'bup', name: 'Bulls Power' },
    { type: 'cci', name: 'CCI' },
    { type: 'dc', name: 'Donchian Channels' },
    { type: 'dem', name: 'DeMarker' },
    { type: 'env', name: 'Envelopes' },
    { type: 'fra', name: 'Fractal' },
    { type: 'fcb', name: 'Fractal Chaos Bands' },
    { type: 'icc', name: 'Ichimoku Kinko Hyo' },
    { type: 'kch', name: 'Keltner Channel' },
    { type: 'mom', name: 'Momentum' },
    { type: 'ma', name: 'Moving Average' },
    { type: 'osma', name: 'OsMA' },
    { type: 'sar', name: 'Parabolic SAR' },
    { type: 'roc', name: 'Rate of Change' },
    { type: 'stc', name: 'Schaff Trend Cycle' },
    { type: 'so', name: 'Stochastic Oscillator' },
    { type: 'sut', name: 'SuperTrend' },
    { type: 'vor', name: 'Vortex' },
    { type: 'will', name: 'Williams %R' },
    { type: 'zz', name: 'ZigZag' },
  ];

  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (type) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return newSet;
    });
  };

  const getChartHeight = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 300;
      if (window.innerWidth < 1024) return 400;
      return 689;
    }
    return 400;
  };

  const chartHeight = getChartHeight();

  const mainChartOptions = useMemo(() => ({
    chart: {
      id: 'price-chart',
      type: chartType === 'candles' ? 'candlestick' : chartType === 'line' ? 'line' : 'rangeBar',
      height: chartHeight,
      width: '100%',
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
        zoomedArea: {
          fill: {
            color: priceColor,
            opacity: 0.4
          },
          stroke: {
            color: priceColor,
            opacity: 0.4,
            width: 1
          }
        }
      },
      pan: {
        enabled: true,
        type: 'x'
      },
      toolbar: {
        autoSelected: 'pan',
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      background: chartType === 'line' ? '#1f2937' : '#000',
      foreColor: '#e0e0e0',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      redrawOnParentResize: false,
      redrawOnWindowResize: false,
      events: {
        zoomed: (chartContext, { xaxis }) => {
          latestRangeRef.current = { min: xaxis.min, max: xaxis.max };
          if (zoomDebounceTimer.current) clearTimeout(zoomDebounceTimer.current);
          zoomDebounceTimer.current = setTimeout(() => {
            setXaxisRange(latestRangeRef.current);
          }, 120);
        },
        panned: (chartContext, { xaxis }) => {
          latestRangeRef.current = { min: xaxis.min, max: xaxis.max };
          if (zoomDebounceTimer.current) clearTimeout(zoomDebounceTimer.current);
          zoomDebounceTimer.current = setTimeout(() => {
            setXaxisRange(latestRangeRef.current);
          }, 120);
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            height: 250,
            width: '100%'
          },
          plotOptions: {
            bar: {
              columnWidth: '80%'
            }
          }
        }
      }, {
        breakpoint: 768,
        options: {
          chart: {
            height: 350,
            width: '100%'
          },
          plotOptions: {
            bar: {
              columnWidth: '70%'
            }
          }
        }
      }, {
        breakpoint: 1024,
        options: {
          chart: {
            height: 500,
            width: '100%'
          },
          plotOptions: {
            bar: {
              columnWidth: '60%'
            }
          }
        }
      }]
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#00ff88',
          downward: '#ff4444'
        },
        wick: {
          width: 1
        },
        columnWidth: columnWidth
      },
      bar: {
        columnWidth: columnWidth,
        horizontal: false
      },
      rangeBar: {
        columnWidth: columnWidth
      },
      line: {
        width: chartType === 'line' ? 3 : 2,
        curve: 'smooth'
      }
    },
    xaxis: {
      type: 'datetime',
      min: xaxisRange.min,
      max: xaxisRange.max,
      labels: {
        style: {
          colors: '#888',
          fontSize: '12px'
        },
        rotate: -45,
        maxHeight: 80
      },
      axisBorder: {
        color: '#404040'
      },
      axisTicks: {
        color: '#404040'
      }
    },
    yaxis: {
      labels: {
        formatter: (v) => `$${v.toLocaleString()}`,
        style: {
          colors: '#888',
          fontSize: '12px'
        }
      },
      opposite: true,
      axisBorder: {
        color: '#404040'
      }
    },
    grid: {
      borderColor: '#404040',
      strokeDashArray: 1,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      theme: 'dark',
      shared: true,
      intersect: false,
      y: {
        formatter: (v) => {
          if (Array.isArray(v)) {
            return `$${v[0].toFixed(2)} - $${v[1].toFixed(2)}`;
          }
          return `$${v.toFixed(2)}`;
        }
      }
    },
    colors: [priceColor]
  }), [chartType, priceColor, columnWidth, chartHeight, xaxisRange.min, xaxisRange.max]);

  const volumeChartOptions = useMemo(() => ({
    chart: {
      type: 'bar',
      height: showVolume ? (typeof window !== 'undefined' && window.innerWidth < 640 ? 50 : 80) : 0,
      width: '100%',
      stacked: false,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      background: chartType === 'line' ? '#1f2937' : '#000',
      foreColor: '#e0e0e0',
      zoom: {
        type: 'x',
        enabled: true
      },
      pan: {
        enabled: true,
        type: 'x'
      },
      toolbar: { show: false },
      redrawOnParentResize: false,
      redrawOnWindowResize: false
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: columnWidth,
        colors: {
          ranges: [{
            from: 0,
            to: Infinity,
            color: chartType === 'line' ? '#666' : '#4a5568'
          }]
        },
        borderRadius: 2
      }
    },
    xaxis: {
      type: 'datetime',
      min: xaxisRange.min,
      max: xaxisRange.max,
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    grid: {
      show: false
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (v) => `${(v / 1e6).toFixed(1)}M`
      }
    },
    dataLabels: { enabled: false }
  }), [showVolume, xaxisRange.min, xaxisRange.max, columnWidth, chartType]);

  const volumeChartSeries = useMemo(() => [
    {
      name: 'Volume',
      data: enrichedData.map(d => ({
        x: d.x,
        y: d.volume
      }))
    }
  ], [enrichedData]);

  const timeframes = ['5s', '15s', '1m', '5m', '15m', '1h', '4h', '1D', '1W', '1M'];

  return (
    <div className="min-h-screen bg-black text-white p-2 sm:p-4">
      <div className="max-w-full mx-auto space-y-4">
        {/* Header with Price */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg gap-3 border border-gray-800/50 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <span className="text-xl sm:text-3xl font-bold text-green-400 tracking-wide">${currentPrice.toLocaleString()}</span>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 ${isPositive ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-red-900/30 text-red-400 border border-red-500/30'}`}>
              {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="text-sm sm:text-base font-medium">{priceChange.toFixed(2)} ({changePercent}%)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-200 text-gray-400 hover:text-white">
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* Top Toolbar */}
        <div className="flex flex-row flex-wrap items-center gap-1 sm:gap-2 bg-gray-900/80 backdrop-blur-sm p-1 sm:p-3 rounded-lg border border-gray-800/50 shadow-lg ">
          {/* Timeframe Selector */}
          <div className="flex items-center gap-1 bg-gray-800/50 border border-gray-700/50 rounded-md p-1.5 sm:p-2 flex-shrink-0 min-w-[70px] sm:min-w-0">
            <Clock size={14} className="text-gray-400 flex-shrink-0" />
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-gray-800 text-white text-xs sm:text-sm font-medium border-none outline-none min-w-0 truncate pr-1 sm:pr-2 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
            >
              {timeframes.map(tf => <option key={tf} value={tf}>{tf}</option>)}
            </select>
          </div>

          {/* Chart Type */}
          <div className="flex items-center gap-0 bg-gray-800/50 border border-gray-700/50 rounded-md overflow-hidden flex-shrink-0">
            <BarChart2 size={14} className="text-gray-400 p-1 sm:p-2 bg-gray-800/50 flex-shrink-0" />
            <button 
              onClick={() => setChartType('candles')} 
              className={`px-1.5 sm:px-3 py-1.5 sm:py-2 text-xs font-medium transition-all duration-200 whitespace-nowrap ${chartType === 'candles' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700/50'}`}
            >
              Candles
            </button>
            <button 
              onClick={() => setChartType('line')} 
              className={`px-1.5 sm:px-3 py-1.5 sm:py-2 text-xs font-medium transition-all duration-200 whitespace-nowrap ${chartType === 'line' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700/50'}`}
            >
              Line
            </button>
            <button 
              onClick={() => setChartType('bars')} 
              className={`px-1.5 sm:px-3 py-1.5 sm:py-2 text-xs font-medium transition-all duration-200 whitespace-nowrap ${chartType === 'bars' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700/50'}`}
            >
              Bars
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-1 sm:flex-none" />

          {/* Indicators */}
   {/* Indicators */}
{/* <div className="relative flex-shrink-0 w-full sm:w-auto sm:ml-2">
  <button 
    onClick={() => setShowIndicatorsMenu(!showIndicatorsMenu)} 
    className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-md bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 shadow-sm w-full sm:w-auto truncate"
  >
    <Layers size={14} className="flex-shrink-0" />
    <span className="hidden sm:inline">Indicators</span>
    <Check size={12} className={`ml-auto sm:ml-2 flex-shrink-0 text-green-400 ${Object.values(indicators).filter(Boolean).length > 0 ? 'opacity-100' : 'opacity-0'}`} />
  </button>
  {showIndicatorsMenu && (
    <div className="absolute top-full left-0 mt-1 sm:mt-2 w-full sm:w-96 max-w-[90vw] bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl p-2 sm:p-4 border border-gray-700/50 z-50 max-h-72 sm:max-h-80 overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
        {indicatorsData.slice(0, 10).map((indicator) => (
          <div key={indicator.type} className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 hover:bg-gray-700/50 rounded-md transition-all duration-200 cursor-pointer">
            <button
              className={`flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full text-gray-400 hover:text-yellow-500 transition-all duration-200 ${favorites.has(indicator.type) ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 'border border-gray-600/50'}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(indicator.type);
              }}
            >
              <Star size={10} className="sm:size-12" />
            </button>
            <label className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-1">
              <input 
                type="checkbox"
                checked={indicators[indicator.type]}
                onChange={(e) => {
                  e.stopPropagation();
                  handleIndicatorChange(indicator.type);
                }}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200 flex-shrink-0"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-200 truncate">{indicator.name}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 mb-3 sm:mb-4">More indicators available in pro version...</div>
      <button 
        onClick={handleApplyIndicators}
        className="w-full text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-md"
      >
        Apply Changes
      </button>
    </div>
  )}
</div> */}

          {/* Volume */}
          <button 
            onClick={() => setShowVolume(!showVolume)} 
            className={`flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-md ${showVolume ? 'bg-green-600 text-white shadow-md' : 'bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700/50'} transition-all duration-200 flex-shrink-0 sm:ml-1 w-full sm:w-auto`}
          >
            <Zap size={14} className="flex-shrink-0" />
            <span className="truncate">{showVolume ? 'Vol On' : 'Vol Off'}</span>
          </button>
        </div>
<div className="relative flex-shrink-0 w-full sm:w-auto sm:ml-2">
  <button 
    onClick={() => setShowIndicatorsMenu(!showIndicatorsMenu)} 
    className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-md bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 shadow-sm w-full sm:w-auto truncate"
  >
    <Layers size={14} className="flex-shrink-0" />
    <span className="hidden sm:inline">Indicators</span>
    <Check size={12} className={`ml-auto sm:ml-2 flex-shrink-0 text-green-400 ${Object.values(indicators).filter(Boolean).length > 0 ? 'opacity-100' : 'opacity-0'}`} />
  </button>
  {showIndicatorsMenu && (
    <div className="absolute top-full left-0 mt-1 sm:mt-2 w-full sm:w-96 max-w-[90vw] bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl p-2 sm:p-4 border border-gray-700/50 z-50 max-h-72 sm:max-h-80 overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
        {indicatorsData.slice(0, 10).map((indicator) => (
          <div key={indicator.type} className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 hover:bg-gray-700/50 rounded-md transition-all duration-200 cursor-pointer">
            <button
              className={`flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full text-gray-400 hover:text-yellow-500 transition-all duration-200 ${favorites.has(indicator.type) ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 'border border-gray-600/50'}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(indicator.type);
              }}
            >
              <Star size={10} className="sm:size-12" />
            </button>
            <label className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-1">
              <input 
                type="checkbox"
                checked={indicators[indicator.type]}
                onChange={(e) => {
                  e.stopPropagation();
                  handleIndicatorChange(indicator.type);
                }}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200 flex-shrink-0"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-200 truncate">{indicator.name}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 mb-3 sm:mb-4">More indicators available in pro version...</div>
      <button 
        onClick={handleApplyIndicators}
        className="w-full text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-md"
      >
        Apply Changes
      </button>
    </div>
  )}
</div>
        {/* Chart Container */}
  <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-2 sm:p-4 border border-gray-800/50 shadow-xl w-full">
  <div className="w-full relative">
    <Chart
      key={chartType}  
      options={mainChartOptions}
      series={mainChartSeries}
      type={mainChartOptions.chart.type}
      height={mainChartOptions.chart.height}
      width={mainChartOptions.chart.width}
    />
  </div>
  {showVolume && (
    <div className="mt-2 pt-2 border-t border-gray-800/50">
      <Chart
        key={`${chartType}-${timeframe}`}
        options={volumeChartOptions}
        series={volumeChartSeries}
        type="bar"
        height={volumeChartOptions.chart.height}
        width={volumeChartOptions.chart.width}
      />
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default PriceChart;