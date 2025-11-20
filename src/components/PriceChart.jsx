import React, { useEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5stock from '@amcharts/amcharts5/stock';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import Toolbar from './Toolbar';

const PriceChart = () => {
  const chartRef = useRef(null);
  const rootRef = useRef(null);
  const wsRef = useRef(null);
  const valueSeriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);
  const sbSeriesRef = useRef(null);
  const dateAxisRef = useRef(null);
  const sbDateAxisRef = useRef(null);
  const tooltipRef = useRef(null);

  const [latestPrice, setLatestPrice] = useState(null);
  const [assets] = useState([
    { id: 1, symbol: 'BTCUSDT', name: 'Bitcoin' },
    { id: 2, symbol: 'ETHUSDT', name: 'Ethereum' },
    { id: 3, symbol: 'BNBUSDT', name: 'Binance Coin' },
  ]);
  const [activeAsset, setActiveAsset] = useState(assets[0]);
  const [timeframe, setTimeframe] = useState('M1');

  const timeframeMap = {
    M1: { apiInterval: '1m', timeUnit: 'minute', count: 1 },
    M5: { apiInterval: '5m', timeUnit: 'minute', count: 5 },
    M15: { apiInterval: '15m', timeUnit: 'minute', count: 15 },
    H1: { apiInterval: '1h', timeUnit: 'hour', count: 1 },
    H4: { apiInterval: '4h', timeUnit: 'hour', count: 4 },
  };

  const eventsMap = {
    BTCUSDT: [
      { date: 1598918400000, letter: 'H', color: am5.color(0xff0000), description: 'Bitcoin Halving 2020' },
    ],
    ETHUSDT: [
      { date: 1625097600000, letter: 'E', color: am5.color(0x00ff00), description: 'Ethereum London Hard Fork' },
    ],
    BNBUSDT: [],
  };

  // Fetch historical data with error handling
  const fetchHistoricalData = async (symbol, interval, limit = 500) => {
    try {
      const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.map(d => ({
        Date: Number(d[0]),
        Open: parseFloat(d[1]) || 0,
        High: parseFloat(d[2]) || 0,
        Low: parseFloat(d[3]) || 0,
        Close: parseFloat(d[4]) || 0,
        Volume: parseFloat(d[5]) || 0,
      })).filter(d => d.Open && d.High && d.Low && d.Close);
    } catch (err) {
      console.error('Error fetching historical data:', err);
      return [];
    }
  };

  // Setup WebSocket with reconnection logic
  const setupWebSocket = (symbol, interval) => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    console.log("🌐 Attempting WebSocket connection for", symbol, interval);

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
    );
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected for', symbol, interval);
    };
    let high = 0;
    let low = 0;
    ws.onmessage = evt => {
      try {
        const msg = JSON.parse(evt.data);

        console.log({ msg })
        if (msg.k) {
          const k = msg.k;
          high = k.h;
          low = k.l;
          const candle = {
            Date: Number(k.t),
            Date: Date.now(), // Ensure timestamp is number
            Open: parseFloat(k.o) || 0,
            High: parseFloat(high + 8000) || 0,
            Low: parseFloat(low - 3000) || 0,
            Close: parseFloat(k.c) || 0,
            Volume: parseFloat(k.v) || 0,
          };

          // Validate candle data
          if (!candle.Date || !candle.Close) return;

          setLatestPrice(candle);

          const valueSeries = valueSeriesRef.current;
          const volumeSeries = volumeSeriesRef.current;
          const sbSeries = sbSeriesRef.current;
          if (valueSeries && volumeSeries && sbSeries) {
            const data = [...valueSeries.data.values];
            const last = data[data.length - 1];
            if (last && last.Date === candle.Date) {
              data[data.length - 1] = candle;
            } else {
              data.push(candle);
              if (data.length > 1000) data.shift();
            }
            valueSeries.data.setAll(data);
            volumeSeries.data.setAll(data);
            sbSeries.data.setAll(data);
          }
        }
      } catch (err) {
        console.error('WebSocket message parsing error:', err);
      }
    };

    ws.onclose = () => {
      console.warn('WebSocket closed. Reconnecting in 5s...');
      setTimeout(() => setupWebSocket(symbol, interval), 5000);
    };

    ws.onerror = err => {
      console.error('WebSocket error:', err);
      ws.close();
    };
  };

  // Load historical + WebSocket on asset/timeframe change
  useEffect(() => {
    const loadData = async () => {
      const { apiInterval, timeUnit, count } = timeframeMap[timeframe] || timeframeMap['M1'];
      const historical = await fetchHistoricalData(activeAsset.symbol, apiInterval);
      if (!historical.length) {
        console.warn('No historical data received');
        return;
      }

      const events = eventsMap[activeAsset.symbol] || [];

      if (!rootRef.current && chartRef.current) {
        const root = am5.Root.new(chartRef.current);
        rootRef.current = root;

        const myTheme = am5.Theme.new(root);
        myTheme.rule("Grid", ["scrollbar", "minor"]).setAll({
          visible: false,
        });

        root.setThemes([am5themes_Animated.new(root), myTheme]);
        root.numberFormatter.set("numberFormat", "#,###.00");

        const stockChart = root.container.children.push(
          am5stock.StockChart.new(root, { paddingRight: 0 })
        );

        const mainPanel = stockChart.panels.push(
          am5stock.StockPanel.new(root, {
            wheelY: "zoomX",
            panX: true,
            panY: true,
          })
        );

        const valueAxis = mainPanel.yAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
            extraMin: 0.1,
            tooltip: am5.Tooltip.new(root, {}),
            numberFormat: "#,###.00",
            extraTooltipPrecision: 2,
          })
        );

        const dateAxis = mainPanel.xAxes.push(
          am5xy.GaplessDateAxis.new(root, {
            baseInterval: { timeUnit, count },
            renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
            tooltip: am5.Tooltip.new(root, {}),
          })
        );
        dateAxisRef.current = dateAxis;

        const valueSeries = mainPanel.series.push(
          am5xy.CandlestickSeries.new(root, {
            name: activeAsset.name,
            turboMode: true,
            clustered: false,
            valueXField: "Date",
            valueYField: "Close",
            highValueYField: "High",
            lowValueYField: "Low",
            openValueYField: "Open",
            calculateAggregates: true,
            xAxis: dateAxis,
            yAxis: valueAxis,
            legendValueText:
              "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
            legendRangeValueText: "",
          })
        );

        stockChart.set("stockSeries", valueSeries);

        const valueLegend = mainPanel.plotContainer.children.push(
          am5stock.StockLegend.new(root, { stockChart })
        );

        const volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
          inside: true,
          pan: "zoom",
        });
        volumeAxisRenderer.labels.template.set("forceHidden", true);
        volumeAxisRenderer.grid.template.set("forceHidden", true);

        const volumeValueAxis = mainPanel.yAxes.push(
          am5xy.ValueAxis.new(root, {
            numberFormat: "#.#a",
            height: am5.percent(20),
            y: am5.percent(100),
            centerY: am5.percent(100),
            renderer: volumeAxisRenderer,
          })
        );

        const volumeSeries = mainPanel.series.push(
          am5xy.ColumnSeries.new(root, {
            name: "Volume",
            turboMode: true,
            clustered: false,
            valueXField: "Date",
            valueYField: "Volume",
            xAxis: dateAxis,
            yAxis: volumeValueAxis,
            legendValueText: "[bold]{valueY.formatNumber('#,###.0a')}[/]",
          })
        );
        volumeSeries.columns.template.setAll({
          strokeOpacity: 0,
          fillOpacity: 0.5,
        });

        volumeSeries.columns.template.adapters.add("fill", (fill, target) => {
          const dataItem = target.dataItem;
          if (dataItem) {
            return stockChart.getVolumeColor(dataItem);
          }
          return fill;
        });

        stockChart.set("volumeSeries", volumeSeries);
        valueLegend.data.setAll([valueSeries, volumeSeries]);

        mainPanel.set(
          "cursor",
          am5xy.XYCursor.new(root, {
            yAxis: valueAxis,
            xAxis: dateAxis,
            snapToSeries: [valueSeries],
            snapToSeriesBy: "y!",
          })
        );

        const scrollbar = mainPanel.set(
          "scrollbarX",
          am5xy.XYChartScrollbar.new(root, {
            orientation: "horizontal",
            height: 50,
          })
        );
        stockChart.toolsContainer.children.push(scrollbar);

        const sbDateAxis = scrollbar.chart.xAxes.push(
          am5xy.GaplessDateAxis.new(root, {
            baseInterval: { timeUnit, count },
            renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
          })
        );
        sbDateAxisRef.current = sbDateAxis;

        const sbValueAxis = scrollbar.chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
          })
        );

        const sbSeries = scrollbar.chart.series.push(
          am5xy.LineSeries.new(root, {
            valueYField: "Close",
            valueXField: "Date",
            xAxis: sbDateAxis,
            yAxis: sbValueAxis,
          })
        );

        sbSeries.fills.template.setAll({
          visible: true,
          fillOpacity: 0.3,
        });

        const seriesSwitcher = am5stock.SeriesTypeControl.new(root, {
          stockChart: stockChart,
        });

        seriesSwitcher.events.on("selected", ev => {
          setSeriesType(ev.item.id, stockChart, mainPanel, valueLegend);
        });

        function getNewSettings(series) {
          return {
            name: series.get("name"),
            valueYField: series.get("valueYField"),
            highValueYField: series.get("highValueYField"),
            lowValueYField: series.get("lowValueYField"),
            openValueYField: series.get("openValueYField"),
            calculateAggregates: series.get("calculateAggregates"),
            valueXField: series.get("valueXField"),
            xAxis: series.get("xAxis"),
            yAxis: series.get("yAxis"),
            legendValueText: series.get("legendValueText"),
            legendRangeValueText: series.get("legendRangeValueText"),
            stroke: series.get("stroke"),
            fill: series.get("fill"),
            turboMode: true,
          };
        }

        function setSeriesType(seriesType, stockChart, mainPanel, valueLegend) {
          const currentSeries = stockChart.get("stockSeries");
          const newSettings = getNewSettings(currentSeries);
          const data = currentSeries.data.values;
          mainPanel.series.removeValue(currentSeries);

          let series;
          switch (seriesType) {
            case "line":
              series = mainPanel.series.push(
                am5xy.LineSeries.new(root, newSettings)
              );
              break;
            case "candlestick":
              newSettings.clustered = false;
              series = mainPanel.series.push(
                am5xy.CandlestickSeries.new(root, newSettings)
              );
              break;
            case "procandlestick":
              newSettings.clustered = false;
              series = mainPanel.series.push(
                am5xy.CandlestickSeries.new(root, newSettings)
              );
              series.columns.template.get("themeTags").push("pro");
              break;
            case "ohlc":
              newSettings.clustered = false;
              series = mainPanel.series.push(
                am5xy.OHLCSeries.new(root, newSettings)
              );
              break;
            default:
              console.warn('Unknown series type:', seriesType);
              return;
          }

          if (series) {
            valueLegend.data.removeValue(currentSeries);
            series.data.setAll(data);
            stockChart.set("stockSeries", series);
            const cursor = mainPanel.get("cursor");
            if (cursor) {
              cursor.set("snapToSeries", [series]);
            }
            valueLegend.data.insertIndex(0, series);
          }
        }

        const tooltip = am5.Tooltip.new(root, {
          getStrokeFromSprite: false,
          getFillFromSprite: false,
        });
        tooltip.get("background").setAll({
          strokeOpacity: 1,
          stroke: am5.color(0x000000),
          fillOpacity: 1,
          fill: am5.color(0xffffff),
        });
        tooltipRef.current = tooltip;

        const makeEvent = (date, letter, color, description) => {
          const dataItem = dateAxis.createAxisRange(
            dateAxis.makeDataItem({ value: date })
          );
          const grid = dataItem.get("grid");
          if (grid) {
            grid.setAll({
              visible: true,
              strokeOpacity: 0.2,
              strokeDasharray: [3, 3],
            });
          }

          const bullet = am5.Container.new(root, { dy: -100 });
          bullet.children.push(
            am5.Circle.new(root, {
              radius: 10,
              stroke: color,
              fill: am5.color(0xffffff),
              tooltipText: description,
              tooltip: tooltip,
              tooltipY: 0,
            })
          );
          bullet.children.push(
            am5.Label.new(root, {
              text: letter,
              centerX: am5.p50,
              centerY: am5.p50,
            })
          );

          dataItem.set(
            "bullet",
            am5xy.AxisBullet.new(root, {
              location: 0,
              stacked: true,
              sprite: bullet,
            })
          );
        };

        events.forEach(event => makeEvent(event.date, event.letter, event.color, event.description));

        const toolbarContainer = document.getElementById('amchart-controls');
        if (toolbarContainer) {
          am5stock.StockToolbar.new(root, {
            container: toolbarContainer,
            stockChart: stockChart,
            controls: [
              am5stock.IndicatorControl.new(root, { stockChart, legend: valueLegend }),
              am5stock.DateRangeSelector.new(root, { stockChart }),
              am5stock.PeriodSelector.new(root, { stockChart }),
              seriesSwitcher,
              am5stock.DrawingControl.new(root, { stockChart }),
              am5stock.DataSaveControl.new(root, { stockChart }),
              am5stock.ResetControl.new(root, { stockChart }),
              am5stock.SettingsControl.new(root, { stockChart }),
            ],
          });
        }

        valueSeriesRef.current = valueSeries;
        volumeSeriesRef.current = volumeSeries;
        sbSeriesRef.current = sbSeries;

        valueSeries.data.setAll(historical);
        volumeSeries.data.setAll(historical);
        sbSeries.data.setAll(historical);
      } else {
        const root = rootRef.current;
        const dateAxis = dateAxisRef.current;
        const sbDateAxis = sbDateAxisRef.current;
        const valueSeries = valueSeriesRef.current;
        const volumeSeries = volumeSeriesRef.current;
        const sbSeries = sbSeriesRef.current;
        const tooltip = tooltipRef.current;

        if (valueSeries) {
          valueSeries.set("name", activeAsset.name);
        }
        if (dateAxis) {
          dateAxis.set("baseInterval", { timeUnit, count });
        }
        if (sbDateAxis) {
          sbDateAxis.set("baseInterval", { timeUnit, count });
        }

        if (dateAxis) {
          dateAxis.axisRanges.clear();
        }

        const makeEvent = (date, letter, color, description) => {
          const dataItem = dateAxis.createAxisRange(
            dateAxis.makeDataItem({ value: date })
          );
          const grid = dataItem.get("grid");
          if (grid) {
            grid.setAll({
              visible: true,
              strokeOpacity: 0.2,
              strokeDasharray: [3, 3],
            });
          }

          const bullet = am5.Container.new(root, { dy: -100 });
          bullet.children.push(
            am5.Circle.new(root, {
              radius: 10,
              stroke: color,
              fill: am5.color(0xffffff),
              tooltipText: description,
              tooltip: tooltip,
              tooltipY: 0,
            })
          );
          bullet.children.push(
            am5.Label.new(root, {
              text: letter,
              centerX: am5.p50,
              centerY: am5.p50,
            })
          );

          dataItem.set(
            "bullet",
            am5xy.AxisBullet.new(root, {
              location: 0,
              stacked: true,
              sprite: bullet,
            })
          );
        };

        events.forEach(event => makeEvent(event.date, event.letter, event.color, event.description));

        if (valueSeries) valueSeries.data.setAll(historical);
        if (volumeSeries) volumeSeries.data.setAll(historical);
        if (sbSeries) sbSeries.data.setAll(historical);
      }

      setupWebSocket(activeAsset.symbol, apiInterval);
    };

    loadData();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [activeAsset, timeframe]);

  useEffect(() => {
    return () => {
      if (rootRef.current) {
        rootRef.current.dispose();
        rootRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-screen bg-gray-100 p-4">
      <div className="w-full mb-4 flex flex-col sm:flex-row items-center justify-between">
        <div id="amchart-controls" className="w-full sm:w-auto mb-2 sm:mb-0"></div>
        <Toolbar
          assets={assets}
          activeAsset={activeAsset}
          setActiveAsset={setActiveAsset}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />
      </div>
      <div
        ref={chartRef}
        className="w-full bg-white shadow-lg rounded-lg h-[300px] sm:h-[400px] md:h-[400px] lg:h-[600px]"
      />
      {latestPrice && (
        <div className="mt-2 text-center">
          Latest Price for {activeAsset.name}: ${latestPrice.Close.toFixed(2)} (Updated:{' '}
          {new Date(latestPrice.Date).toLocaleTimeString()})
        </div>
      )}
    </div>
  );
};

export default PriceChart;


// import React, { useEffect, useRef, useState } from "react";
// import * as am5 from "@amcharts/amcharts5";
// import * as am5xy from "@amcharts/amcharts5/xy";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// const BINANCE_KLINES = (symbol, interval = "1m") =>
//   `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=200`;

// const BINANCE_WS = (symbol) =>
//   `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`;

// export default function PocketOptionChart({
//   onPriceUpdate,
//   symbol = "BTCUSDT",
//   amount = 0,
//   seconds = 0,
//   opened = [],
//   closed = [],
//   chartType: propChartType,
//   onChartTypeChange,
// }) {
//   // topbar states
//   const [chartType, setChartType] = useState(propChartType || "candles");
//   const [timeFrame, setTimeFrame] = useState("1m"); // Binance interval
//   const [fullscreen, setFullscreen] = useState(false); // Fullscreen mode
//  const [showIndicatorsPanel, setShowIndicatorsPanel] = useState(false);

//   const [indicatorConfig, setIndicatorConfig] = useState({
//     // Momentum Indicators
//     acceleratorOscillator: false,
//     aroon: false,
//     bearsPower: false,
//     bullsPower: false,
//     deMarker: false,
//     fractalChaosBands: false,
//     macd: false,
//     osma: false,
//     rateOfChange: false,
//     superTrend: false,
//     zigZag: false,

//     // Trend Indicators
//     adx: false,
//     averageTrueRange: false,
//     bollingerBands: false,
//     cci: false,
//     envelopes: false,
//     ichimoKuKinko: false,
//     momentum: false,
//     parabolicSAR: false,
//     schaffTrendCycle: false,
//     vortex: false,

//     // Volume/Volatility
//     alligator: false,
//     awesomeOscillator: false,
//     bollingerBandsWidth: false,
//     donchianChannels: false,
//     fractal: false,
//     keltnerChannel: false,
//     movingAverage: false,
//     rsi: false,
//     stochasticOscillator: false,
//     williamsR: false,
//   });
//   const [activeIndicators, setActiveIndicators] = useState([]);
//   const [drawingMode, setDrawingMode] = useState(false); // Drawing tools on/off

//   // livechart states
//   const [livePrice, setLivePrice] = useState(null);
//   const [priceColor, setPriceColor] = useState("text-gray-300");
//   const [showCalculator, setShowCalculator] = useState(false);
//   const [showTimeSelector, setShowTimeSelector] = useState(false);

//   const prevPriceRef = useRef(null);
//   const chartRef = useRef(null);
//   const rootRef = useRef(null);
//   const seriesRef = useRef(null);
//   const wsRef = useRef(null);
//   const followLatestRef = useRef(true);
//   const amountLabelRef = useRef(null);
//   const timeLabelRef = useRef(null);
//   const tradeLabelRef = useRef(null);
//   const tradeIntervalRef = useRef(null);
//   const [orderTicks, setOrderTicks] = useState([]);
//   const xAxisRef = useRef(null);
//   const yAxisRef = useRef(null);
//   const rangesRef = useRef(new Map());

//   // keep internal chartType in sync when parent changes it
//   useEffect(() => {
//     if (propChartType && propChartType !== chartType) {
//       setChartType(propChartType);
//     }
//   }, [propChartType]);

//   // Update AMChart labels when props change
//   useEffect(() => {
//     if (amountLabelRef.current) {
//       try {
//         amountLabelRef.current.set("text", `Amount: $${amount}`);
//       } catch (e) {
//         // ignore if chart disposed
//       }
//     }
//   }, [amount]);

//   useEffect(() => {
//     if (
//       !xAxisRef.current ||
//       !yAxisRef.current ||
//       !rootRef.current ||
//       !seriesRef.current
//     )
//       return;

//     const map = rangesRef.current;
//     const root = rootRef.current;
//     const chart = seriesRef.current.chart;

//     // clear previous "selectedExpiry" range
//     const existing = map.get("selectedExpiry");
//     if (existing) {
//       try {
//         clearInterval(existing._interval);
//         existing.label?.dispose();
//         existing.xRange?.dispose();
//       } catch (e) {}
//       map.delete("selectedExpiry");
//     }

//     if (!seconds || seconds <= 0) return;

//     const expiresAt = Date.now() + seconds * 1000;

//     const xItem = xAxisRef.current.makeDataItem({ value: expiresAt });
//     const xRange = xAxisRef.current.createAxisRange(xItem);
//     xRange.get("grid").setAll({
//       stroke: am5.color(0xffd600),
//       strokeWidth: 2,
//       strokeOpacity: 0.95,
//       strokeDasharray: [6, 6],
//     });
//     xRange.get("label").setAll({
//       text: "Expiry (selected)",
//       rotation: -90,
//       centerX: am5.percent(50),
//       dy: -8,
//       fill: am5.color(0xffd600),
//     });

//     // countdown floating label
//     const label = am5.Label.new(root, {
//       text: `${seconds}s`,
//       fill: am5.color(0x000000),
//       fontSize: 12,
//       background: am5.RoundedRectangle.new(root, {
//         fill: am5.color(0xffd600),
//         cornerRadiusTL: 6,
//         cornerRadiusTR: 6,
//         cornerRadiusBL: 6,
//         cornerRadiusBR: 6,
//       }),
//       paddingTop: 5,
//       paddingBottom: 5,
//       paddingLeft: 8,
//       paddingRight: 8,
//     });
//     chart.plotContainer.children.push(label);

//     const update = () => {
//       const remaining = Math.max(
//         0,
//         Math.floor((expiresAt - Date.now()) / 1000)
//       );
//       label.set("text", `${remaining}s`);
//       const xPos = xAxisRef.current.valueToPosition(expiresAt);
//       label.setAll({ x: am5.percent(xPos * 100), y: am5.percent(5) });
//     };

//     update();
//     const interval = setInterval(update, 1000);

//     map.set("selectedExpiry", { xRange, label, _interval: interval });

//     return () => {
//       clearInterval(interval);
//       label.dispose();
//       xRange.dispose();
//       map.delete("selectedExpiry");
//     };
//   }, [seconds]);

//   // Helpers for formatting remaining time and AM/PM time
//   const formatRemaining = (secs) => {
//     if (secs == null) return "--:--";
//     secs = Math.max(0, Math.floor(secs));
//     const days = Math.floor(secs / 86400);
//     const hours = Math.floor((secs % 86400) / 3600);
//     const mins = Math.floor((secs % 3600) / 60);
//     const s = secs % 60;
//     if (days > 0)
//       return `${days}d ${String(hours).padStart(2, "0")}h ${String(
//         mins
//       ).padStart(2, "0")}m`;
//     if (hours > 0)
//       return `${String(hours).padStart(2, "0")}:${String(mins).padStart(
//         2,
//         "0"
//       )}:${String(s).padStart(2, "0")}`;
//     return `${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
//   };

//   const formatAmPm = (ts) => {
//     if (!ts) return "—";
//     try {
//       const d = new Date(ts);
//       return d.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: true,
//       });
//     } catch (e) {
//       return "—";
//     }
//   };

//   // preview removed — we no longer show a selection preview on the chart

//   // keep a small local countdown state for opened orders so the overlay updates every second
//   useEffect(() => {
//     // build initial ticks
//     const build = () =>
//       opened.map((o) => {
//         const expiresAt = o.expiresAt
//           ? new Date(o.expiresAt).getTime()
//           : o.raw && o.raw.expiry
//           ? new Date(o.raw.expiry).getTime()
//           : null;

//         const remaining = expiresAt
//           ? Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
//           : o.seconds || 0;

//         // ✅ Get correct invested amount (priority order)
//         let invested = 0;
//         if (o.amount != null) invested = o.amount;
//         else if (o.raw && o.raw.amount != null) invested = o.raw.amount;
//         else if (o.price && o.quantity) invested = o.price * o.quantity;
//         else if (o.raw && o.raw.price && o.raw.quantity)
//           invested = o.raw.price * o.raw.quantity;

//         // 🟢 Round amount cleanly
//         const cleanAmount = Number(parseFloat(invested).toFixed(2));

//         return {
//           id: o.id || o._id,
//           remaining,
//           expiresAt,
//           amount: cleanAmount, // 👈 final rounded value
//         };
//       });

//     setOrderTicks(build());
//     if (tradeIntervalRef.current) clearInterval(tradeIntervalRef.current);
//     tradeIntervalRef.current = setInterval(() => {
//       setOrderTicks(build());
//     }, 1000);

//     return () => {
//       if (tradeIntervalRef.current) {
//         clearInterval(tradeIntervalRef.current);
//         tradeIntervalRef.current = null;
//       }
//     };
//   }, [opened]);

//   // Draw vertical expiry and horizontal price lines for opened orders using amCharts axis ranges
//   // === Show Amount & Expiry Label directly on live candle ===
//   useEffect(() => {
//     if (
//       !seriesRef.current ||
//       !xAxisRef.current ||
//       !yAxisRef.current ||
//       !rootRef.current
//     )
//       return;

//     const root = rootRef.current;
//     const chart = seriesRef.current?.chart;
//     const map = rangesRef.current;

//     // Clear old ranges/labels
//     map.forEach((obj) => {
//       try {
//         obj.xRange?.dispose();
//         obj.yRange?.dispose();
//         obj.label?.dispose();
//       } catch (e) {}
//     });
//     map.clear();

//     // Only handle the most recent active trade
//     const active = opened[0];
//     if (!active) return;

//     const expiresAt = active.expiresAt
//       ? new Date(active.expiresAt).getTime()
//       : active.raw?.expiry
//       ? new Date(active.raw.expiry).getTime()
//       : null;

//     const price =
//       active.price ||
//       active.openPrice ||
//       active.raw?.price ||
//       seriesRef.current.data.values.at(-1)?.close;

//     // ✅ SAFE SIDE HANDLING
//     const sideValue = active.side ?? active.raw?.side ?? "BUY";
//     const side =
//       typeof sideValue === "string" ? sideValue.toUpperCase() : "BUY";

//     const sideColor =
//       side === "BUY" ? am5.color(0x00c853) : am5.color(0xff3b30);

//     // === Draw expiry vertical line ===
//     if (expiresAt) {
//       const xItem = xAxisRef.current.makeDataItem({ value: expiresAt });
//       const xRange = xAxisRef.current.createAxisRange(xItem);
//       xRange.get("grid").setAll({
//         stroke: am5.color(0xff9900),
//         strokeWidth: 2,
//         strokeOpacity: 0.9,
//       });
//       xRange.get("label").setAll({
//         text: "Expiry",
//         rotation: -90,
//         centerX: am5.percent(50),
//         dy: -8,
//         fill: am5.color(0xff9900),
//       });

//       // === Create dynamic floating label over the current candle ===
//       // === Create dynamic floating label over the current candle ===
//       const tradeLabel = am5.Label.new(root, {
//         text: `$${Number(active.amount || 0).toFixed(2)}`, // ✅ Only show amount
//         fill: am5.color(0xffffff),
//         fontSize: 12,
//         fontWeight: "600",
//         background: am5.RoundedRectangle.new(root, {
//           fill: sideColor,
//           fillOpacity: 0.9,
//           cornerRadiusTL: 4,
//           cornerRadiusTR: 4,
//           cornerRadiusBL: 4,
//           cornerRadiusBR: 4,
//         }),
//         paddingTop: 3,
//         paddingBottom: 3,
//         paddingLeft: 6,
//         paddingRight: 6,
//       });

//       chart.plotContainer.children.push(tradeLabel);

//       // === Position label exactly above the live candle ===
//       const updateLabelPosition = () => {
//         try {
//           const last = seriesRef.current.data.values.at(-1);
//           if (!last) return;

//           const xCoord = xAxisRef.current.valueToPosition(last.date);
//           const yHigh = yAxisRef.current.valueToPosition(last.high);

//           const yRange = yAxisRef.current.get("renderer").height;
//           const dynamicOffset = (3 / yRange) * 100;

//           tradeLabel.setAll({
//             x: am5.percent(xCoord * 100),
//             y: am5.percent(100 - yHigh * 100 - dynamicOffset),
//           });

//           // ✅ Only show amount — no time
//           tradeLabel.set("text", `▲ $${Number(active.amount || 0).toFixed(2)}`);
//         } catch (e) {}
//       };

//       // Keep label synced with live candle movement
//       const interval = setInterval(updateLabelPosition, 1000);
//       updateLabelPosition();

//       // Also move expiry line when expiry time increases (if parent updates it)
//       const watcher = setInterval(() => {
//         const newExpiresAt = active.expiresAt
//           ? new Date(active.expiresAt).getTime()
//           : null;
//         if (newExpiresAt && newExpiresAt !== expiresAt) {
//           xRange.get("value").set("value", newExpiresAt);
//         }
//       }, 1000);

//       // Initial placement
//       updateLabelPosition();

//       // Cleanup when trade closes or component unmounts
//       map.set(active.id || active._id, { xRange, label: tradeLabel });
//       return () => {
//         clearInterval(interval);
//         clearInterval(watcher);
//         try {
//           tradeLabel.dispose();
//           xRange.dispose();
//         } catch (e) {}
//         map.clear();
//       };
//     }
//   }, [opened]);

//   // 🧠 Helper
//   const isCryptoSymbol = (s) =>
//     typeof s === "string" && s.toUpperCase().endsWith("USDT");

//   // 🧱 Chart Creation
//   //   useEffect(() => {
//   //     if (rootRef.current) rootRef.current.dispose();
//   //     if (wsRef.current) {
//   //       if (wsRef.current instanceof WebSocket) wsRef.current.close();
//   //       else if (wsRef.current.mockInterval)
//   //         clearInterval(wsRef.current.mockInterval);
//   //     }

//   //     const root = am5.Root.new(chartRef.current);
//   //     root._logo?.dispose();
//   //     root.setThemes([am5themes_Animated.new(root)]);
//   //     rootRef.current = root;

//   //     // White background
//   //     root.container.set(
//   //       "background",
//   //       am5.Rectangle.new(root, { fill: am5.color(0xffffff) })
//   //       // am5.Rectangle.new(root, { fill: am5.color(0x191c30) })
//   //     );

//   //     // 🧭 Create chart with scroll and zoom enabled
//   //     const chart = root.container.children.push(
//   //       am5xy.XYChart.new(root, {
//   //         panX: true,
//   //         panY: false,
//   //         // wheelX: "panX",   // scroll horizontally
//   //         // wheelY: "panX",   // scroll horizontally (disable zoom)
//   //         pinchZoomX: false,
//   //       })
//   //     );

//   //     // ✅ Disable all chart animations & prevent tooltip rearranging (stops zoom shifts)
//   //     chart.set("arrangeTooltips", false);
//   //     root.animationDuration = 0;
//   //     if (root.defaultState) {
//   //       root.defaultState.transitionDuration = 0;
//   //     }

//   //     // Add cursor
//   // // Draw cursor (default)
//   // const cursor = am5xy.XYCursor.new(root, {
//   //   behavior: drawingMode ? "none" : "none",
//   // });
//   // chart.set("cursor", cursor);

//   //     // Add scrollbar
//   //     chart.set(
//   //       "scrollbarX",
//   //       am5.Scrollbar.new(root, {
//   //         orientation: "horizontal",
//   //       })
//   //     );

//   //     const xAxis = chart.xAxes.push(
//   //       am5xy.DateAxis.new(root, {
//   //         maxDeviation: 0,
//   //         extraMax: 0.08, // ✅ add ~8% space to the right (so labels don’t hide)
//   //         extraMin: 0.05, // keep a little space on the left
//   //         start: 0.8, // show last 20% of data
//   //         end: 1,
//   //         strictMinMax: true,
//   //         keepSelection: true,
//   //         baseInterval: { timeUnit: "minute", count: 1 },
//   //         renderer: am5xy.AxisRendererX.new(root, {
//   //           minGridDistance: 50,
//   //           fill: am5.color(0x000000),
//   //           stroke: am5.color(0x000000),
//   //           grid: {
//   //             template: {
//   //               strokeWidth: 1,
//   //               strokeOpacity: 0.1,
//   //             },
//   //           },
//   //         }),
//   //         gridIntervals: [
//   //           { timeUnit: "minute", count: 1 },
//   //           { timeUnit: "minute", count: 5 },
//   //           { timeUnit: "minute", count: 15 },
//   //           { timeUnit: "minute", count: 30 },
//   //           { timeUnit: "hour", count: 1 },
//   //         ],
//   //       })
//   //     );

//   //     xAxis.set("autoGapCount", 0);
//   //     xAxis.set("autoAdjust", false);
//   //     // ✅ Prevent auto range expansion (stop auto zoom)
//   //     xAxis.set("keepSelection", true);
//   //     xAxis.set("start", 0.8); // show last 20% of data
//   //     xAxis.set("end", 1); // lock to latest candle
//   //     xAxis.set("strictMinMax", true); // 🔒 prevents automatic expansion
//   //     xAxis.set("minZoomCount", 1); // stops auto zoom on small data

//   //     // expose axis refs so other effects can add axis ranges (expiry lines)
//   //     xAxisRef.current = xAxis;

//   //     // throttled auto-zoom helper (avoid calling zoom too often)
//   //     let _lastAutoZoom = 0;
//   //     const autoZoomToLatest = (msTimestamp) => {
//   //       try {
//   //         const now = Date.now();
//   //         // throttle to ~200ms
//   //         if (!followLatestRef.current) return; // don't auto-zoom if user interacted
//   //         if (now - _lastAutoZoom < 200) return;
//   //         _lastAutoZoom = now;
//   //         const viewEnd = new Date(msTimestamp + 3000); // small projection ahead
//   //         const viewStart = new Date(msTimestamp - 30000); // show last 30s
//   //         xAxis.zoomToDates(viewStart, viewEnd, 0);
//   //       } catch (e) {
//   //         // ignore if axis not ready
//   //       }
//   //     };

//   //     const yAxis = chart.yAxes.push(
//   //       am5xy.ValueAxis.new(root, {
//   //         renderer: am5xy.AxisRendererY.new(root, {
//   //           fill: am5.color(0x000000),
//   //           stroke: am5.color(0x000000),
//   //           minGridDistance: 30,
//   //           grid: {
//   //             template: {
//   //               strokeWidth: 1,
//   //               strokeOpacity: 0.1,
//   //             },
//   //           },
//   //         }),
//   //         numberFormat: "#,###.00",
//   //       })
//   //     );
//   //     yAxis.set("autoAdjust", false);

//   //     // expose y axis for creating horizontal price lines
//   //     yAxisRef.current = yAxis;

//   //     // Chart Type Switcher
//   //     let series;
//   //     switch (chartType) {
//   //       case "line":
//   //         series = chart.series.push(
//   //           am5xy.LineSeries.new(root, {
//   //             name: symbol,
//   //             xAxis,
//   //             yAxis,
//   //             valueYField: "close",
//   //             valueXField: "date",
//   //             stroke: am5.color(0x00ffcc),
//   //             // strokeWidth: 2,
//   //             // tooltip: am5.Tooltip.new(root, {
//   //             //   labelText: "${valueY}",
//   //             //   getFillFromSprite: true,
//   //             // }),
//   //             connect: true,
//   //             tensionX: 0.8,
//   //             tensionY: 0.8,
//   //           })
//   //         );
//   //         break;
//   //       case "bars":
//   //         series = chart.series.push(
//   //           am5xy.OHLCSeries.new(root, {
//   //             name: symbol,
//   //             xAxis,
//   //             yAxis,
//   //             openValueYField: "open",
//   //             valueYField: "close",
//   //             lowValueYField: "low",
//   //             highValueYField: "high",
//   //             valueXField: "date",
//   //             // tooltip: am5.Tooltip.new(root, {
//   //             //   labelText:
//   //             //     "Open: ${openValueY}\nHigh: ${highValueY}\nLow: ${lowValueY}\nClose: ${valueY}",
//   //             //   getFillFromSprite: true,
//   //             // }),
//   //             strokeWidth: 2,
//   //           })
//   //         );
//   //         break;
//   //       case "heikin":
//   //         series = chart.series.push(
//   //           am5xy.CandlestickSeries.new(root, {
//   //             name: symbol,
//   //             xAxis,
//   //             yAxis,
//   //             openValueYField: "open",
//   //             valueYField: "close",
//   //             lowValueYField: "low",
//   //             highValueYField: "high",
//   //             valueXField: "date",
//   //             calculateAggregates: true,
//   //             // tooltip: am5.Tooltip.new(root, {
//   //             //   labelText:
//   //             //     "Open: ${openValueY}\nHigh: ${highValueY}\nLow: ${lowValueY}\nClose: ${valueY}",
//   //             //   getFillFromSprite: true,
//   //             // }),
//   //             increasingColor: am5.color(0x00ff00),
//   //             decreasingColor: am5.color(0xff0000),
//   //           })
//   //         );
//   //         break;
//   //       default:
//   //         series = chart.series.push(
//   //           am5xy.CandlestickSeries.new(root, {
//   //             name: symbol,
//   //             xAxis,
//   //             yAxis,
//   //             openValueYField: "open",
//   //             valueYField: "close",
//   //             lowValueYField: "low",
//   //             highValueYField: "high",
//   //             valueXField: "date",
//   //             // tooltip: am5.Tooltip.new(root, {
//   //             //   labelText:
//   //             //     "Open: ${openValueY}\nHigh: ${highValueY}\nLow: ${lowValueY}\nClose: ${valueY}",
//   //             //   getFillFromSprite: true,
//   //             // }),
//   //             increasingColor: am5.color(0x00ff00),
//   //             decreasingColor: am5.color(0xff0000),
//   //           })
//   //         );
//   //         break;
//   //     }

//   //     series.appear(1000, 100);
//   //     series.set("interpolationDuration", 0);
//   //     series.set("sequencedInterpolation", false);

//   //     seriesRef.current = series;

//   //     // === Fixed OHLC Info Label (Bottom-Left) ===
//   //     const ohlcLabel = chart.plotContainer.children.push(
//   //       am5.Label.new(root, {
//   //         text: "",
//   //         x: am5.p0, // left side
//   //         centerX: am5.p0,
//   //         y: am5.p100, // bottom
//   //         dy: -10,
//   //         dx: 15,
//   //         fill: am5.color(0xffffff),
//   //         fontSize: 13,
//   //         fontWeight: "500",
//   //         visible: false,
//   //         background: am5.RoundedRectangle.new(root, {
//   //           fill: am5.color(0x0b1520),
//   //           fillOpacity: 0.85,
//   //           cornerRadiusTL: 10,
//   //           cornerRadiusTR: 10,
//   //           cornerRadiusBL: 10,
//   //           cornerRadiusBR: 10,
//   //           stroke: am5.color(0x1a2436),
//   //           strokeOpacity: 0.4,
//   //         }),
//   //         paddingTop: 5,
//   //         paddingBottom: 5,
//   //         paddingLeft: 10,
//   //         paddingRight: 10,
//   //       })
//   //     );

//   //     // Disable the default floating tooltip
//   //     series.set("tooltip", null);
//   //     // 🟢 Correct hover: attach to each candle (only if the series supports columns)
//   //     if (series.columns) {
//   //       series.columns.template.events.on("pointerover", (ev) => {
//   //         try {
//   //           const dataItem = ev.target.dataItem;
//   //           if (!dataItem) return;

//   //           const open = dataItem.get("openValueY");
//   //           const high = dataItem.get("highValueY");
//   //           const low = dataItem.get("lowValueY");
//   //           const close = dataItem.get("valueY");

//   //           const closeColor =
//   //             close > open ? "#00c853" : close < open ? "#ff3b30" : "#ffffff";

//   //           // Use HTML for colored Close value
//   //           ohlcLabel.set(
//   //             "html",
//   //             `
//   //         <div style="
//   //           font-family: Inter, sans-serif;
//   //           color: #d1d5db;
//   //         ">
//   //           <span style="margin-right:8px;">Open: <b>${open?.toFixed(
//   //             2
//   //           )}</b></span>
//   //           <span style="margin-right:8px;">High: <b>${high?.toFixed(
//   //             2
//   //           )}</b></span>
//   //           <span style="margin-right:8px;">Low: <b>${low?.toFixed(2)}</b></span>
//   //           <span>Close: <b style="color:${closeColor};">${close?.toFixed(
//   //               2
//   //             )}</b></span>
//   //         </div>
//   //         `
//   //           );
//   //           ohlcLabel.show();
//   //         } catch (e) {
//   //           console.error("OHLC hover error:", e);
//   //         }
//   //       });

//   //       // 🔴 Hide when pointer leaves candle
//   //       series.columns.template.events.on("pointerout", () => {
//   //         ohlcLabel.hide();
//   //       });
//   //     }

//   //     // 🔁 Also update on live candle updates
//   //     series.events.on("dataitemsvalidated", () => {
//   //       try {
//   //         const data = series.data.values;
//   //         if (!data || data.length === 0) return;
//   //         const last = data[data.length - 1];
//   //         ohlcLabel.set(
//   //           "text",
//   //           `Open: ${last.open.toFixed(2)}   High: ${last.high.toFixed(
//   //             2
//   //           )}   Low: ${last.low.toFixed(2)}   Close: ${last.close.toFixed(2)}`
//   //         );
//   //       } catch (e) {}
//   //     });

//   //     // Respect user interaction: if user pans/clicks the chart, stop auto-following
//   //     let _onPointerDown = null;
//   //     let _onDblClick = null;
//   //     if (chartRef.current) {
//   //       const el = chartRef.current;
//   //       _onPointerDown = () => {
//   //         followLatestRef.current = false;
//   //       };
//   //       _onDblClick = () => {
//   //         followLatestRef.current = true;
//   //         // re-center to latest
//   //         try {
//   //           const ds = series.data.values;
//   //           if (ds.length) autoZoomToLatest(ds[ds.length - 1].date);
//   //         } catch (e) {}
//   //       };
//   //       el.addEventListener("pointerdown", _onPointerDown);
//   //       el.addEventListener("dblclick", _onDblClick);
//   //     }

//   //     // create amount/time labels and keep refs so they can be updated from React effects
//   //     try {
//   //       // trade info label (hidden until a trade opens)
//   //     } catch (e) {
//   //       // amcharts may not be ready in some environments; ignore label creation errors
//   //       console.warn("Could not create chart labels:", e);
//   //     }

//   //     const load = async () => {
//   //       try {
//   //         if (isCryptoSymbol(symbol)) {
//   //           const res = await fetch(BINANCE_KLINES(symbol, timeFrame));
//   //           const raw = await res.json();
//   //           const formatted = raw.map((d) => ({
//   //             date: new Date(d[0]).getTime(),
//   //             open: +d[1],
//   //             high: +d[2],
//   //             low: +d[3],
//   //             close: +d[4],
//   //           }));

//   //           series.events.disableType("datavalidated");
//   //           series.data.setAll(formatted);
//   //           series.events.enableType("datavalidated");

//   //           // === SIMPLE EMA INDICATOR (overlay line) ===
//   //           if (indicatorConfig.ema) {
//   //             // 20-period EMA
//   //             const period = 20;
//   //             let ema = null;
//   //             const emaData = formatted.map((candle, index) => {
//   //               const price = candle.close;
//   //               if (index === 0) {
//   //                 ema = price;
//   //               } else {
//   //                 const k = 2 / (period + 1);
//   //                 ema = price * k + ema * (1 - k);
//   //               }
//   //               return {
//   //                 date: candle.date,
//   //                 value: ema,
//   //               };
//   //             });

//   //             const emaSeries = chart.series.push(
//   //               am5xy.LineSeries.new(root, {
//   //                 name: "EMA 20",
//   //                 xAxis,
//   //                 yAxis,
//   //                 valueYField: "value",
//   //                 valueXField: "date",
//   //                 stroke: am5.color(0xffd600),
//   //                 strokeWidth: 1.5,
//   //               })
//   //             );
//   //             emaSeries.data.setAll(emaData);

//   //             // cleanup on dispose
//   //             root.events.on("dispose", () => {
//   //               try {
//   //                 emaSeries.dispose();
//   //               } catch {}
//   //             });
//   //           }

//   //           const lastClose = formatted[formatted.length - 1].close;
//   //           setLivePrice(lastClose);
//   //           prevPriceRef.current = lastClose;
//   //           // initial zoom to show recent data
//   //           try {
//   //             const lastTs = formatted[formatted.length - 1].date;
//   //             // autoZoomToLatest(lastTs);
//   //           } catch (e) {
//   //             // ignore if axis not ready
//   //           }

//   //           // 🌐 Live updates via WebSocket (aggregate trade stream into 1s candles)
//   //           // 🌐 Live updates via WebSocket (aggregate trade stream into 1s candles)
//   //           const ws = new WebSocket(BINANCE_WS(symbol));
//   //           wsRef.current = ws;

//   //           // currentSecond holds the in-progress 1-second candle
//   //           let currentSecond = null;

//   //           ws.onmessage = (ev) => {
//   //             try {
//   //               const msg = JSON.parse(ev.data);
//   //               // msg is a trade message from Binance stream: { p: price, E: eventTime }
//   //               const price = parseFloat(msg.p);
//   //               const eventTs = msg.E ? msg.E : Date.now();
//   //               const secondTs = Math.floor(eventTs / 1000) * 1000;

//   //               // ✅ Update live price color indicator
//   //               const prev = prevPriceRef.current;
//   //               if (prev !== null) {
//   //                 if (price > prev) setPriceColor("text-green-500");
//   //                 else if (price < prev) setPriceColor("text-red-500");
//   //               }
//   //               prevPriceRef.current = price;
//   //               setLivePrice(price);
//   //               onPriceUpdate?.(price);

//   //               // 🧱 1️⃣ If no current candle yet, start one
//   //               if (!currentSecond) {
//   //                 currentSecond = {
//   //                   ts: secondTs,
//   //                   open: price,
//   //                   high: price,
//   //                   low: price,
//   //                   close: price,
//   //                 };

//   //                 // Add first live candle
//   //                 series.events.disableType("datavalidated");
//   //                 series.data.push({
//   //                   date: currentSecond.ts,
//   //                   open: currentSecond.open,
//   //                   high: currentSecond.high,
//   //                   low: currentSecond.low,
//   //                   close: currentSecond.close,
//   //                 });
//   //                 series.events.enableType("datavalidated");
//   //               }

//   //               // 🧱 2️⃣ If a new second started, finalize the old candle
//   //               else if (secondTs !== currentSecond.ts) {
//   //                 const lastIndex = series.data.length - 1;
//   //                 const prevCandle = series.data.getIndex(lastIndex);

//   //                 if (prevCandle) {
//   //                   // ✅ finalize previous candle color
//   //                   const up = prevCandle.close > prevCandle.open;
//   //                   const col = up ? am5.color(0x00c853) : am5.color(0xff3b30);
//   //                   series.columns.getIndex(lastIndex)?.setAll({
//   //                     fill: col,
//   //                     stroke: col,
//   //                   });
//   //                 }

//   //                 // start a new one
//   //                 currentSecond = {
//   //                   ts: secondTs,
//   //                   open: price,
//   //                   high: price,
//   //                   low: price,
//   //                   close: price,
//   //                 };
//   //                 series.events.disableType("datavalidated");
//   //                 series.data.push({
//   //                   date: currentSecond.ts,
//   //                   open: currentSecond.open,
//   //                   high: currentSecond.high,
//   //                   low: currentSecond.low,
//   //                   close: currentSecond.close,
//   //                 });
//   //                 series.events.enableType("datavalidated");

//   //                 // keep only recent 120 candles
//   //                 if (series.data.length > 120) {
//   //                   series.data.removeIndex(0);
//   //                 }
//   //               }

//   //               // 🧱 3️⃣ Update current candle (same second)
//   //               else {
//   //                 currentSecond.high = Math.max(currentSecond.high, price);
//   //                 currentSecond.low = Math.min(currentSecond.low, price);
//   //                 currentSecond.close = price;

//   //                 const lastIndex = series.data.length - 1;
//   //                 if (lastIndex >= 0) {
//   //                   const candle = {
//   //                     date: currentSecond.ts,
//   //                     open: currentSecond.open,
//   //                     high: currentSecond.high,
//   //                     low: currentSecond.low,
//   //                     close: currentSecond.close,
//   //                   };

//   //                   // ✅ Update color dynamically for current candle
//   //                   if (candle.close > candle.open) {
//   //                     series.columns.getIndex(lastIndex)?.setAll({
//   //                       fill: am5.color(0x00c853), // green
//   //                       stroke: am5.color(0x00c853),
//   //                     });
//   //                   } else if (candle.close < candle.open) {
//   //                     series.columns.getIndex(lastIndex)?.setAll({
//   //                       fill: am5.color(0xff3b30), // red
//   //                       stroke: am5.color(0xff3b30),
//   //                     });
//   //                   }

//   //                   series.data.setIndex(lastIndex, candle);
//   //                 }
//   //               }

//   //               // optional: smooth camera follow
//   //               // try {
//   //               //   chart.get("cursor").set("position", 1);
//   //               // } catch (e) {}
//   //             } catch (e) {
//   //               // ignore malformed messages
//   //             }
//   //           };
//   //         }
//   //       } catch (err) {
//   //         console.error("Chart load error:", err);
//   //       }
//   //     };

//   //     load();

//   //     return () => {
//   //       if (chartRef.current) {
//   //         try {
//   //           if (_onPointerDown)
//   //             chartRef.current.removeEventListener("pointerdown", _onPointerDown);
//   //           if (_onDblClick)
//   //             chartRef.current.removeEventListener("dblclick", _onDblClick);
//   //         } catch (e) {}
//   //       }
//   //       if (rootRef.current) rootRef.current.dispose();
//   //       if (wsRef.current) {
//   //         if (wsRef.current instanceof WebSocket) wsRef.current.close();
//   //         else if (wsRef.current.mockInterval)
//   //           clearInterval(wsRef.current.mockInterval);
//   //       }
//   //     };
//   //   }, [symbol, chartType]);

//   useEffect(() => {
//     if (rootRef.current) rootRef.current.dispose();
//     if (wsRef.current) {
//       if (wsRef.current instanceof WebSocket) wsRef.current.close();
//       else if (wsRef.current.mockInterval)
//         clearInterval(wsRef.current.mockInterval);
//     }

//     const root = am5.Root.new(chartRef.current);
//     root._logo?.dispose();
//     root.setThemes([am5themes_Animated.new(root)]);
//     rootRef.current = root;

//     // Background
//     root.container.set(
//       "background",
//       am5.Rectangle.new(root, { fill: am5.color(0x0b1520) })
//     );

//     // Chart
//     const chart = root.container.children.push(
//       am5xy.XYChart.new(root, {
//         panX: true,
//         panY: false,
//         pinchZoomX: false,
//       })
//     );

//     chart.set("arrangeTooltips", false);
//     root.animationDuration = 0;
//     if (root.defaultState) root.defaultState.transitionDuration = 0;

//     // Cursor
//     const cursor = am5xy.XYCursor.new(root, {
//       behavior: drawingMode ? "none" : "none",
//     });
//     chart.set("cursor", cursor);

//     // ================= DRAWING TOOL ==================
//     if (drawingMode) {
//       let isDrawing = false;
//       let startPoint = null;
//       let currentLine = null;

//       chart.plotContainer.events.on("pointerdown", (ev) => {
//         isDrawing = true;
//         startPoint = chart.plotContainer.toLocal(ev.point);
//         currentLine = am5.Graphics.new(root, {
//           stroke: am5.color(0xffd600),
//           strokeWidth: 2,
//         });
//         chart.plotContainer.children.push(currentLine);
//       });

//       chart.plotContainer.events.on("pointermove", (ev) => {
//         if (!isDrawing || !currentLine) return;
//         const p = chart.plotContainer.toLocal(ev.point);

//         currentLine.set("draw", (display) => {
//           display.moveTo(startPoint.x, startPoint.y);
//           display.lineTo(p.x, p.y);
//         });
//       });

//       chart.plotContainer.events.on("pointerup", () => {
//         isDrawing = false;
//         currentLine = null;
//       });
//     }

//     // ================= Scrollbar ==================
//     // chart.set(
//     //   "scrollbarX",
//     //   am5.Scrollbar.new(root, { orientation: "horizontal" })
//     // );

//     // ================= X Axis ==================
//     const xAxis = chart.xAxes.push(
//       am5xy.DateAxis.new(root, {
//         maxDeviation: 0,
//         extraMax: 0.08,
//         extraMin: 0.05,
//         start: 0.8,
//         end: 1,
//         strictMinMax: true,
//         keepSelection: true,
//         baseInterval: { timeUnit: "minute", count: 1 },
//         renderer: am5xy.AxisRendererX.new(root, {
//           minGridDistance: 50,
//           stroke: am5.color(0x000000),
//         }),
//         gridIntervals: [
//           { timeUnit: "minute", count: 1 },
//           { timeUnit: "minute", count: 5 },
//           { timeUnit: "minute", count: 15 },
//           { timeUnit: "minute", count: 30 },
//           { timeUnit: "hour", count: 1 },
//         ],
//       })
//     );

//     xAxis.set("keepSelection", true);
//     xAxis.set("strictMinMax", true);
//     xAxis.set("minZoomCount", 1);
//     xAxisRef.current = xAxis;

//     // ================= Y Axis ==================
//     const yAxis = chart.yAxes.push(
//       am5xy.ValueAxis.new(root, {
//         renderer: am5xy.AxisRendererY.new(root, {
//           visible: false,
//           grid: { visible: false },
//           strokeOpacity: 0,
//           opacity: 0,
//         }),
//         numberFormat: "#,###.00",
//         visible: false,
//       })
//     );

//     yAxis.set("autoAdjust", false);
//     yAxisRef.current = yAxis;

//     // ================= SERIES (Chart Type) ==================
//     let series;
//     switch (chartType) {
//       case "line":
//         series = chart.series.push(
//           am5xy.LineSeries.new(root, {
//             name: symbol,
//             xAxis,
//             yAxis,
//             valueYField: "close",
//             valueXField: "date",
//             stroke: am5.color(0x00ffcc),
//             connect: true,
//             tensionX: 0.8,
//             tensionY: 0.8,
//           })
//         );
//         break;

//       case "bars":
//         series = chart.series.push(
//           am5xy.OHLCSeries.new(root, {
//             name: symbol,
//             xAxis,
//             yAxis,
//             openValueYField: "open",
//             valueYField: "close",
//             lowValueYField: "low",
//             highValueYField: "high",
//             valueXField: "date",
//             strokeWidth: 2,
//           })
//         );
//         break;

//       case "heikin":
//         series = chart.series.push(
//           am5xy.CandlestickSeries.new(root, {
//             name: symbol,
//             xAxis,
//             yAxis,
//             openValueYField: "open",
//             valueYField: "close",
//             lowValueYField: "low",
//             highValueYField: "high",
//             valueXField: "date",
//             calculateAggregates: true,
//             increasingColor: am5.color(0x00ff00),
//             decreasingColor: am5.color(0xff0000),
//           })
//         );
//         break;

//       default:
//         series = chart.series.push(
//           am5xy.CandlestickSeries.new(root, {
//             name: symbol,
//             xAxis,
//             yAxis,
//             openValueYField: "open",
//             valueYField: "close",
//             lowValueYField: "low",
//             highValueYField: "high",
//             valueXField: "date",
//             increasingColor: am5.color(0x00ff00),
//             decreasingColor: am5.color(0xff0000),
//           })
//         );
//     }

//     series.set("interpolationDuration", 0);
//     series.set("sequencedInterpolation", false);
//     seriesRef.current = series;

//     // ================= OHLC FIXED LABEL ==================
//     const ohlcLabel = chart.plotContainer.children.push(
//       am5.Label.new(root, {
//         text: "",
//         x: am5.p0,
//         y: am5.p100,
//         dy: -10,
//         dx: 15,
//         fill: am5.color(0xffffff),
//         fontSize: 13,
//         visible: false,
//         background: am5.RoundedRectangle.new(root, {
//           fill: am5.color(0x0b1520),
//           fillOpacity: 0.8,
//           cornerRadiusTL: 10,
//           cornerRadiusTR: 10,
//           cornerRadiusBL: 10,
//           cornerRadiusBR: 10,
//         }),
//         paddingTop: 5,
//         paddingBottom: 5,
//         paddingLeft: 10,
//         paddingRight: 10,
//       })
//     );

//     series.set("tooltip", null);

//     if (series.columns) {
//       series.columns.template.events.on("pointerover", (ev) => {
//         const d = ev.target.dataItem;
//         if (!d) return;

//         const open = d.get("openValueY");
//         const high = d.get("highValueY");
//         const low = d.get("lowValueY");
//         const close = d.get("valueY");
//         const color =
//           close > open ? "#00c853" : close < open ? "#ff3b30" : "#ffffff";

//         ohlcLabel.set(
//           "html",
//           `
//         <div style="color:#d1d5db;font-family:Inter;">
//           Open: <b>${open.toFixed(2)}</b>
//           High: <b>${high.toFixed(2)}</b>
//           Low: <b>${low.toFixed(2)}</b>
//           Close: <b style="color:${color}">${close.toFixed(2)}</b>
//         </div>
//         `
//         );
//         ohlcLabel.show();
//       });

//       series.columns.template.events.on("pointerout", () => ohlcLabel.hide());
//     }

//     // Live label update
//     series.events.on("dataitemsvalidated", () => {
//       const data = series.data.values;
//       if (!data.length) return;
//       const last = data[data.length - 1];

//       ohlcLabel.set(
//         "text",
//         `Open: ${last.open} High: ${last.high} Low: ${last.low} Close: ${last.close}`
//       );
//     });

//     // ================= LOAD HISTORICAL ==================
//     const load = async () => {
//       const res = await fetch(BINANCE_KLINES(symbol, timeFrame));
//       const raw = await res.json();

//       const formatted = raw.map((d) => ({
//         date: +d[0],
//         open: +d[1],
//         high: +d[2],
//         low: +d[3],
//         close: +d[4],
//       }));

//       series.events.disableType("datavalidated");
//       series.data.setAll(formatted);
//       series.events.enableType("datavalidated");

//       // ================= EMA INDICATOR ==================
//       if (indicatorConfig.ema) {
//         let ema = null;
//         const k = 2 / 21;

//         const emaData = formatted.map((c, i) => ({
//           date: c.date,
//           value: (ema = i === 0 ? c.close : c.close * k + ema * (1 - k)),
//         }));

//         const emaSeries = chart.series.push(
//           am5xy.LineSeries.new(root, {
//             name: "EMA 20",
//             xAxis,
//             yAxis,
//             valueYField: "value",
//             valueXField: "date",
//             stroke: am5.color(0xffd600),
//             strokeWidth: 1.5,
//           })
//         );

//         emaSeries.data.setAll(emaData);
//       }

//       setLivePrice(formatted.at(-1).close);
//       prevPriceRef.current = formatted.at(-1).close;
//     };

//     load();

//     // ================= LIVE WEBSOCKET ==================
//     const ws = new WebSocket(BINANCE_WS(symbol));
//     wsRef.current = ws;

//     let curr = null;

//     ws.onmessage = (ev) => {
//       const msg = JSON.parse(ev.data);
//       const price = parseFloat(msg.p);
//       const ts = Math.floor(msg.E / 1000) * 1000;

//       setPriceColor(
//         price > prevPriceRef.current
//           ? "text-green-500"
//           : price < prevPriceRef.current
//           ? "text-red-500"
//           : "text-gray-300"
//       );

//       prevPriceRef.current = price;
//       setLivePrice(price);

//       if (!curr) {
//         curr = { ts, open: price, high: price, low: price, close: price };
//         series.data.push({ date: ts, ...curr });
//       } else if (ts !== curr.ts) {
//         curr = { ts, open: price, high: price, low: price, close: price };
//         series.data.push({ date: ts, ...curr });
//       } else {
//         curr.high = Math.max(curr.high, price);
//         curr.low = Math.min(curr.low, price);
//         curr.close = price;
//         series.data.setIndex(series.data.length - 1, {
//           date: curr.ts,
//           ...curr,
//         });
//       }
//     };

//     return () => {
//       if (rootRef.current) rootRef.current.dispose();
//       if (wsRef.current) wsRef.current.close();
//     };
//   }, [symbol, chartType, timeFrame, indicatorConfig, drawingMode]);

//   return (
//     <div
//       className={`p-4 bg-[#0b1520] ${
//         fullscreen ? "fixed inset-0 z-50 overflow-auto" : "min-h-screen"
//       }`}
//     >
//       <div className="max-w-6xl mx-auto">
//         {/* === POCKET OPTION STYLE TOP TOOLBAR === */}
//         <div className="flex flex-wrap items-center gap-3 bg-[#0b1520] border border-gray-800 p-2 rounded-lg">
//           {/* ASSET SELECTOR (simple for now) */}
//         <select
//   onClick={() => setShowAssets(true)}
//   className="bg-[#293145] text-white px-3 py-1.5 rounded text-sm"
// >
//   {symbol}
//             <option value="BTCUSDT">BTC / USDT</option>
//             <option value="ETHUSDT">ETH / USDT</option>
//             <option value="BNBUSDT">BNB / USDT</option>
//             <option value="SOLUSDT">SOL / USDT</option>
//           </select>

//           {/* TIMEFRAME */}
//           <select
//             value={timeFrame}
//             onChange={(e) => setTimeFrame(e.target.value)}
//             className="bg-[#293145] text-white px-3 py-1.5 rounded text-sm"
//           >
//             <option value="1m">1m</option>
//             <option value="5m">5m</option>
//             <option value="15m">15m</option>
//             <option value="30m">30m</option>
//             <option value="1h">1h</option>
//             <option value="4h">4h</option>
//           </select>

//           {/* CHART TYPE */}
//           <select
//             value={chartType}
//             onChange={(e) => {
//               setChartType(e.target.value);
//               onChartTypeChange?.(e.target.value);
//             }}
//             className="bg-[#293145] text-white px-3 py-1.5 rounded text-sm"
//           >
//             <option value="candles">Candles</option>
//             <option value="line">Line</option>
//             <option value="bars">Bars</option>
//             <option value="heikin">Heikin Ashi</option>
//           </select>

//           {/* INDICATORS BUTTON */}
//           <button
//             onClick={() => setShowIndicatorsPanel((s) => !s)}
//             className="px-3 py-1.5 rounded bg-[#293145] text-gray-300 text-sm hover:bg-[#25314a]"
//           >
//             Indicators
//           </button>

//           {/* DRAWING TOOLS TOGGLE */}
//           <button
//             onClick={() => setDrawingMode((s) => !s)}
//             className={`px-3 py-1.5 rounded text-sm ${
//               drawingMode
//                 ? "bg-green-600 text-white"
//                 : "bg-[#293145] text-gray-300 hover:bg-[#25314a]"
//             }`}
//           >
//             Drawing
//           </button>

//           {/* FULLSCREEN TOGGLE */}
//           {/* <button
//             onClick={() => setFullscreen((s) => !s)}
//             className="px-3 py-1.5 rounded bg-[#293145] text-gray-300 text-sm hover:bg-[#25314a]"
//           >
//             {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
//           </button> */}
//         </div>

//         {/* INDICATOR PANEL (dropdown style) */}
//         {showIndicatorsPanel && (
//           <div className="mt-2 bg-[#0b1520] border border-gray-800 rounded-lg p-3 flex gap-4 text-sm text-gray-300">
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={indicatorConfig.ema}
//                 onChange={(e) =>
//                   setIndicatorConfig((prev) => ({
//                     ...prev,
//                     ema: e.target.checked,
//                   }))
//                 }
//               />
//               EMA
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={indicatorConfig.rsi}
//                 onChange={(e) =>
//                   setIndicatorConfig((prev) => ({
//                     ...prev,
//                     rsi: e.target.checked,
//                   }))
//                 }
//               />
//               RSI
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={indicatorConfig.macd}
//                 onChange={(e) =>
//                   setIndicatorConfig((prev) => ({
//                     ...prev,
//                     macd: e.target.checked,
//                   }))
//                 }
//               />
//               MACD
//             </label>
//           </div>
//         )}

//         {/* Chart */}
//         <div className="mt-4 relative">
//           <div className="relative">
//             <div
//               ref={chartRef}
//               className="w-full h-[520px] bg-[#0b1520] rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Live Price */}
//         <div className="mt-4 text-center">
//           <div className="text-sm text-gray-400">Live Price</div>
//           <div
//             className={`text-3xl font-bold transition-colors duration-300 ${priceColor}`}
//           >
//             ${livePrice ? livePrice.toFixed(4) : "—"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useRef, useState } from "react";
// import * as am5 from "@amcharts/amcharts5";
// import * as am5xy from "@amcharts/amcharts5/xy";
// import * as am5stock from "@amcharts/amcharts5/stock";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
// import Toolbar from "./Toolbar";

// const PriceChart = () => {
//   const chartRef = useRef(null);
//   const rootRef = useRef(null);
//   const wsRef = useRef(null);
//   const valueSeriesRef = useRef(null);
//   const volumeSeriesRef = useRef(null);
//   const sbSeriesRef = useRef(null);
//   const dateAxisRef = useRef(null);
//   const sbDateAxisRef = useRef(null);
//   const tooltipRef = useRef(null);

//   const [latestPrice, setLatestPrice] = useState(null);
//   const [assets] = useState([
//     { id: 1, symbol: "BTCUSDT", name: "Bitcoin" },
//     { id: 2, symbol: "ETHUSDT", name: "Ethereum" },
//     { id: 3, symbol: "BNBUSDT", name: "Binance Coin" },
//   ]);
//   const [activeAsset, setActiveAsset] = useState(assets[0]);
//   const [timeframe, setTimeframe] = useState("M1");

//   const timeframeMap = {
//     M1: { apiInterval: "1m", timeUnit: "minute", count: 1 },
//     M5: { apiInterval: "5m", timeUnit: "minute", count: 5 },
//     M15: { apiInterval: "15m", timeUnit: "minute", count: 15 },
//     H1: { apiInterval: "1h", timeUnit: "hour", count: 1 },
//     H4: { apiInterval: "4h", timeUnit: "hour", count: 4 },
//   };

//   const eventsMap = {
//     BTCUSDT: [
//       {
//         date: 1598918400000,
//         letter: "H",
//         color: am5.color(0xff0000),
//         description: "Bitcoin Halving 2020",
//       },
//     ],
//     ETHUSDT: [
//       {
//         date: 1625097600000,
//         letter: "E",
//         color: am5.color(0x00ff00),
//         description: "Ethereum London Hard Fork",
//       },
//     ],
//     BNBUSDT: [],
//   };

//   // Fetch historical data with error handling
//   const fetchHistoricalData = async (symbol, interval, limit = 500) => {
//     try {
//       const res = await fetch(
//         `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
//       );
//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       const data = await res.json();
//       return data
//         .map((d) => ({
//           Date: Number(d[0]),
//           Open: parseFloat(d[1]) || 0,
//           High: parseFloat(d[2]) || 0,
//           Low: parseFloat(d[3]) || 0,
//           Close: parseFloat(d[4]) || 0,
//           Volume: parseFloat(d[5]) || 0,
//         }))
//         .filter((d) => d.Open && d.High && d.Low && d.Close);
//     } catch (err) {
//       console.error("Error fetching historical data:", err);
//       return [];
//     }
//   };

//   // Setup WebSocket with reconnection logic
//   const setupWebSocket = (symbol, interval) => {
//     if (wsRef.current) {
//       wsRef.current.close();
//       wsRef.current = null;
//     }

//     const ws = new WebSocket(
//       `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${apiInterval}`
//     );

//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log("WebSocket connected for", symbol, interval);
//     };

//     ws.onmessage = (evt) => {
//       try {
//         const msg = JSON.parse(evt.data);
//         if (!msg.k) return;

//         const k = msg.k;

//         const candle = {
//           Date: Number(k.t), // FIXED
//           Open: parseFloat(k.o),
//           High: parseFloat(k.h), // FIXED
//           Low: parseFloat(k.l), // FIXED
//           Close: parseFloat(k.c),
//           Volume: parseFloat(k.v),
//         };

//         setLatestPrice(candle);

//         const valueSeries = valueSeriesRef.current;
//         const volumeSeries = volumeSeriesRef.current;
//         const sbSeries = sbSeriesRef.current;
//         if (!valueSeries || !volumeSeries || !sbSeries) return;

//         const data = [...valueSeries.data.values];
//         const last = data[data.length - 1];

//         if (last && last.Date === candle.Date) {
//           data[data.length - 1] = candle; // UPDATE SAME CANDLE
//         } else {
//           data.push(candle); // ADD NEW CANDLE
//         }

//         valueSeries.data.setAll(data);
//         volumeSeries.data.setAll(data);
//         sbSeries.data.setAll(data);
//       } catch (err) {
//         console.error("WebSocket message parsing error:", err);
//       }
//     };

//     ws.onclose = () => {
//       console.warn("WebSocket closed. Reconnecting in 5s...");
//       setTimeout(() => setupWebSocket(symbol, interval), 5000);
//     };

//     ws.onerror = (err) => {
//       console.error("WebSocket error:", err);
//       ws.close();
//     };
//   };

//   // Load historical + WebSocket on asset/timeframe change
//   useEffect(() => {
//     const loadData = async () => {
//       const { apiInterval, timeUnit, count } =
//         timeframeMap[timeframe] || timeframeMap["M1"];
//       const historical = await fetchHistoricalData(
//         activeAsset.symbol,
//         apiInterval
//       );
//       if (!historical.length) {
//         console.warn("No historical data received");
//         return;
//       }

//       const events = eventsMap[activeAsset.symbol] || [];

//       if (!rootRef.current && chartRef.current) {
//         const root = am5.Root.new(chartRef.current);
//         rootRef.current = root;

//         const myTheme = am5.Theme.new(root);
//         myTheme.rule("Grid", ["scrollbar", "minor"]).setAll({
//           visible: false,
//         });

//         root.setThemes([am5themes_Animated.new(root), myTheme]);
//         root.numberFormatter.set("numberFormat", "#,###.00");

//         const stockChart = root.container.children.push(
//           am5stock.StockChart.new(root, { paddingRight: 0 })
//         );

//         const mainPanel = stockChart.panels.push(
//           am5stock.StockPanel.new(root, {
//             wheelY: "zoomX",
//             panX: true,
//             panY: true,
//           })
//         );

//         const valueAxis = mainPanel.yAxes.push(
//           am5xy.ValueAxis.new(root, {
//             renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
//             extraMin: 0.1,
//             tooltip: am5.Tooltip.new(root, {}),
//             numberFormat: "#,###.00",
//             extraTooltipPrecision: 2,
//           })
//         );

//         const dateAxis = mainPanel.xAxes.push(
//           am5xy.GaplessDateAxis.new(root, {
//             baseInterval: { timeUnit, count },
//             renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
//             tooltip: am5.Tooltip.new(root, {}),
//           })
//         );
//         dateAxisRef.current = dateAxis;

//         const valueSeries = mainPanel.series.push(
//           am5xy.CandlestickSeries.new(root, {
//             name: activeAsset.name,
//             turboMode: true,
//             clustered: false,
//             valueXField: "Date",
//             valueYField: "Close",
//             highValueYField: "High",
//             lowValueYField: "Low",
//             openValueYField: "Open",
//             calculateAggregates: true,
//             xAxis: dateAxis,
//             yAxis: valueAxis,
//             legendValueText:
//               "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
//             legendRangeValueText: "",
//           })
//         );

//         stockChart.set("stockSeries", valueSeries);

//         const valueLegend = mainPanel.plotContainer.children.push(
//           am5stock.StockLegend.new(root, { stockChart })
//         );

//         const volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
//           inside: true,
//           pan: "zoom",
//         });
//         volumeAxisRenderer.labels.template.set("forceHidden", true);
//         volumeAxisRenderer.grid.template.set("forceHidden", true);

//         const volumeValueAxis = mainPanel.yAxes.push(
//           am5xy.ValueAxis.new(root, {
//             numberFormat: "#.#a",
//             height: am5.percent(20),
//             y: am5.percent(100),
//             centerY: am5.percent(100),
//             renderer: volumeAxisRenderer,
//           })
//         );

//         const volumeSeries = mainPanel.series.push(
//           am5xy.ColumnSeries.new(root, {
//             name: "Volume",
//             turboMode: true,
//             clustered: false,
//             valueXField: "Date",
//             valueYField: "Volume",
//             xAxis: dateAxis,
//             yAxis: volumeValueAxis,
//             legendValueText: "[bold]{valueY.formatNumber('#,###.0a')}[/]",
//           })
//         );
//         volumeSeries.columns.template.setAll({
//           strokeOpacity: 0,
//           fillOpacity: 0.5,
//         });

//         volumeSeries.columns.template.adapters.add("fill", (fill, target) => {
//           const dataItem = target.dataItem;
//           if (dataItem) {
//             return stockChart.getVolumeColor(dataItem);
//           }
//           return fill;
//         });

//         stockChart.set("volumeSeries", volumeSeries);
//         valueLegend.data.setAll([valueSeries, volumeSeries]);

//         mainPanel.set(
//           "cursor",
//           am5xy.XYCursor.new(root, {
//             yAxis: valueAxis,
//             xAxis: dateAxis,
//             snapToSeries: [valueSeries],
//             snapToSeriesBy: "y!",
//           })
//         );

//         const scrollbar = mainPanel.set(
//           "scrollbarX",
//           am5xy.XYChartScrollbar.new(root, {
//             orientation: "horizontal",
//             height: 50,
//           })
//         );
//         stockChart.toolsContainer.children.push(scrollbar);

//         const sbDateAxis = scrollbar.chart.xAxes.push(
//           am5xy.GaplessDateAxis.new(root, {
//             baseInterval: { timeUnit, count },
//             renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
//           })
//         );
//         sbDateAxisRef.current = sbDateAxis;

//         const sbValueAxis = scrollbar.chart.yAxes.push(
//           am5xy.ValueAxis.new(root, {
//             renderer: am5xy.AxisRendererY.new(root, {}),
//           })
//         );

//         const sbSeries = scrollbar.chart.series.push(
//           am5xy.LineSeries.new(root, {
//             valueYField: "Close",
//             valueXField: "Date",
//             xAxis: sbDateAxis,
//             yAxis: sbValueAxis,
//           })
//         );

//         sbSeries.fills.template.setAll({
//           visible: true,
//           fillOpacity: 0.3,
//         });

//         const seriesSwitcher = am5stock.SeriesTypeControl.new(root, {
//           stockChart: stockChart,
//         });

//         seriesSwitcher.events.on("selected", (ev) => {
//           setSeriesType(ev.item.id, stockChart, mainPanel, valueLegend);
//         });

//         function getNewSettings(series) {
//           return {
//             name: series.get("name"),
//             valueYField: series.get("valueYField"),
//             highValueYField: series.get("highValueYField"),
//             lowValueYField: series.get("lowValueYField"),
//             openValueYField: series.get("openValueYField"),
//             calculateAggregates: series.get("calculateAggregates"),
//             valueXField: series.get("valueXField"),
//             xAxis: series.get("xAxis"),
//             yAxis: series.get("yAxis"),
//             legendValueText: series.get("legendValueText"),
//             legendRangeValueText: series.get("legendRangeValueText"),
//             stroke: series.get("stroke"),
//             fill: series.get("fill"),
//             turboMode: true,
//           };
//         }

//         function setSeriesType(seriesType, stockChart, mainPanel, valueLegend) {
//           const currentSeries = stockChart.get("stockSeries");
//           const newSettings = getNewSettings(currentSeries);
//           const data = currentSeries.data.values;
//           mainPanel.series.removeValue(currentSeries);

//           let series;
//           switch (seriesType) {
//             case "line":
//               series = mainPanel.series.push(
//                 am5xy.LineSeries.new(root, newSettings)
//               );
//               break;
//             case "candlestick":
//               newSettings.clustered = false;
//               series = mainPanel.series.push(
//                 am5xy.CandlestickSeries.new(root, newSettings)
//               );
//               break;
//             case "procandlestick":
//               newSettings.clustered = false;
//               series = mainPanel.series.push(
//                 am5xy.CandlestickSeries.new(root, newSettings)
//               );
//               series.columns.template.get("themeTags").push("pro");
//               break;
//             case "ohlc":
//               newSettings.clustered = false;
//               series = mainPanel.series.push(
//                 am5xy.OHLCSeries.new(root, newSettings)
//               );
//               break;
//             default:
//               console.warn("Unknown series type:", seriesType);
//               return;
//           }

//           if (series) {
//             valueLegend.data.removeValue(currentSeries);
//             series.data.setAll(data);
//             stockChart.set("stockSeries", series);
//             const cursor = mainPanel.get("cursor");
//             if (cursor) {
//               cursor.set("snapToSeries", [series]);
//             }
//             valueLegend.data.insertIndex(0, series);
//           }
//         }

//         const tooltip = am5.Tooltip.new(root, {
//           getStrokeFromSprite: false,
//           getFillFromSprite: false,
//         });
//         tooltip.get("background").setAll({
//           strokeOpacity: 1,
//           stroke: am5.color(0x000000),
//           fillOpacity: 1,
//           fill: am5.color(0xffffff),
//         });
//         tooltipRef.current = tooltip;

//         const makeEvent = (date, letter, color, description) => {
//           const dataItem = dateAxis.createAxisRange(
//             dateAxis.makeDataItem({ value: date })
//           );
//           const grid = dataItem.get("grid");
//           if (grid) {
//             grid.setAll({
//               visible: true,
//               strokeOpacity: 0.2,
//               strokeDasharray: [3, 3],
//             });
//           }

//           const bullet = am5.Container.new(root, { dy: -100 });
//           bullet.children.push(
//             am5.Circle.new(root, {
//               radius: 10,
//               stroke: color,
//               fill: am5.color(0xffffff),
//               tooltipText: description,
//               tooltip: tooltip,
//               tooltipY: 0,
//             })
//           );
//           bullet.children.push(
//             am5.Label.new(root, {
//               text: letter,
//               centerX: am5.p50,
//               centerY: am5.p50,
//             })
//           );

//           dataItem.set(
//             "bullet",
//             am5xy.AxisBullet.new(root, {
//               location: 0,
//               stacked: true,
//               sprite: bullet,
//             })
//           );
//         };

//         events.forEach((event) =>
//           makeEvent(event.date, event.letter, event.color, event.description)
//         );

//         const toolbarContainer = document.getElementById("amchart-controls");
//         if (toolbarContainer) {
//           am5stock.StockToolbar.new(root, {
//             container: toolbarContainer,
//             stockChart: stockChart,
//             controls: [
//               am5stock.IndicatorControl.new(root, {
//                 stockChart,
//                 legend: valueLegend,
//               }),
//               am5stock.DateRangeSelector.new(root, { stockChart }),
//               am5stock.PeriodSelector.new(root, { stockChart }),
//               seriesSwitcher,
//               am5stock.DrawingControl.new(root, { stockChart }),
//               am5stock.DataSaveControl.new(root, { stockChart }),
//               am5stock.ResetControl.new(root, { stockChart }),
//               am5stock.SettingsControl.new(root, { stockChart }),
//             ],
//           });
//         }

//         valueSeriesRef.current = valueSeries;
//         volumeSeriesRef.current = volumeSeries;
//         sbSeriesRef.current = sbSeries;

//         valueSeries.data.setAll(historical);
//         volumeSeries.data.setAll(historical);
//         sbSeries.data.setAll(historical);
//       } else {
//         const root = rootRef.current;
//         const dateAxis = dateAxisRef.current;
//         const sbDateAxis = sbDateAxisRef.current;
//         const valueSeries = valueSeriesRef.current;
//         const volumeSeries = volumeSeriesRef.current;
//         const sbSeries = sbSeriesRef.current;
//         const tooltip = tooltipRef.current;

//         if (valueSeries) {
//           valueSeries.set("name", activeAsset.name);
//         }
//         if (dateAxis) {
//           dateAxis.set("baseInterval", { timeUnit, count });
//         }
//         if (sbDateAxis) {
//           sbDateAxis.set("baseInterval", { timeUnit, count });
//         }

//         if (dateAxis) {
//           dateAxis.axisRanges.clear();
//         }

//         const makeEvent = (date, letter, color, description) => {
//           const dataItem = dateAxis.createAxisRange(
//             dateAxis.makeDataItem({ value: date })
//           );
//           const grid = dataItem.get("grid");
//           if (grid) {
//             grid.setAll({
//               visible: true,
//               strokeOpacity: 0.2,
//               strokeDasharray: [3, 3],
//             });
//           }

//           const bullet = am5.Container.new(root, { dy: -100 });
//           bullet.children.push(
//             am5.Circle.new(root, {
//               radius: 10,
//               stroke: color,
//               fill: am5.color(0xffffff),
//               tooltipText: description,
//               tooltip: tooltip,
//               tooltipY: 0,
//             })
//           );
//           bullet.children.push(
//             am5.Label.new(root, {
//               text: letter,
//               centerX: am5.p50,
//               centerY: am5.p50,
//             })
//           );

//           dataItem.set(
//             "bullet",
//             am5xy.AxisBullet.new(root, {
//               location: 0,
//               stacked: true,
//               sprite: bullet,
//             })
//           );
//         };

//         events.forEach((event) =>
//           makeEvent(event.date, event.letter, event.color, event.description)
//         );

//         if (valueSeries) valueSeries.data.setAll(historical);
//         if (volumeSeries) volumeSeries.data.setAll(historical);
//         if (sbSeries) sbSeries.data.setAll(historical);
//       }

//       setupWebSocket(activeAsset.symbol, apiInterval);
//     };

//     loadData();

//     return () => {
//       if (wsRef.current) {
//         wsRef.current.close();
//         wsRef.current = null;
//       }
//     };
//   }, [activeAsset, timeframe]);

//   useEffect(() => {
//     return () => {
//       if (rootRef.current) {
//         rootRef.current.dispose();
//         rootRef.current = null;
//       }
//     };
//   }, []);

//   return (
//     <div className="w-full h-screen bg-gray-100 p-4">
//       <div className="w-full mb-4 flex flex-col sm:flex-row items-center justify-between">
//         <div
//           id="amchart-controls"
//           className="w-full sm:w-auto mb-2 sm:mb-0"
//         ></div>
//         <Toolbar
//           assets={assets}
//           activeAsset={activeAsset}
//           setActiveAsset={setActiveAsset}
//           timeframe={timeframe}
//           setTimeframe={setTimeframe}
//         />
//       </div>
//       <div
//         ref={chartRef}
//         className="w-full bg-white shadow-lg rounded-lg h-[300px] sm:h-[400px] md:h-[400px] lg:h-[600px]"
//       />
//       {latestPrice && (
//         <div className="mt-2 text-center">
//           Latest Price for {activeAsset.name}: ${latestPrice.Close.toFixed(2)}{" "}
//           (Updated: {new Date(latestPrice.Date).toLocaleTimeString()})
//         </div>
//       )}
//     </div>
//   );
// };

// export default PriceChart;



// PriceChart.jsx
// import React, { useEffect, useRef, useState } from "react";
// import {
//   createChart,
//   CrosshairMode,
//   LineStyle,
// } from "lightweight-charts";

// const PriceChart = () => {
//   const chartContainerRef = useRef(null);
//   const chartRef = useRef(null);
//   const candleSeriesRef = useRef(null);
//   const volumeSeriesRef = useRef(null);
//   const wsRef = useRef(null);
//   const resizeObserverRef = useRef(null);

//   // ---------------- STATE ----------------
//   const [assets] = useState([
//     { symbol: "BTCUSDT", name: "Bitcoin" },
//     { symbol: "ETHUSDT", name: "Ethereum" },
//     { symbol: "BNBUSDT", name: "BNB" },
//   ]);
//   const [activeAsset, setActiveAsset] = useState(assets[0]);
//   const [activeTf, setActiveTf] = useState("1m");
//   const [chartType, setChartType] = useState("candles");
//   const [latestPrice, setLatestPrice] = useState(null);

//   const [drawMode, setDrawMode] = useState(null); // "trend" | "hline"
//   const [drawings, setDrawings] = useState([]);

//   // -------------- TIMEFRAMES -----------------
//   const timeframes = [
//     { label: "1s", v: "1s" },
//     { label: "5s", v: "5s" },
//     { label: "15s", v: "15s" },
//     { label: "30s", v: "30s" },
//     { label: "1m", v: "1m" },
//     { label: "5m", v: "5m" },
//     { label: "15m", v: "15m" },
//     { label: "1h", v: "1h" },
//   ];

//   const intervalMap = {
//     "1s": "1s",
//     "5s": "5s",
//     "15s": "15s",
//     "30s": "30s",
//     "1m": "1m",
//     "5m": "5m",
//     "15m": "15m",
//     "1h": "1h",
//   };

//   // ---------------- HISTORICAL FETCH ----------------
//   const fetchHistorical = async (symbol, interval) => {
//     try {
//       const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=500`;
//       const res = await fetch(url);
//       const data = await res.json();

//       return data.map((d) => ({
//         time: Math.floor(Number(d[0]) / 1000),
//         open: parseFloat(d[1]),
//         high: parseFloat(d[2]),
//         low: parseFloat(d[3]),
//         close: parseFloat(d[4]),
//         volume: parseFloat(d[5]),
//       }));
//     } catch (e) {
//       console.error("Historical fetch error:", e);
//       return [];
//     }
//   };

//   // ------------------- DRAWING ENGINE -------------------
//   const addDrawing = (type, points) => {
//     setDrawings((prev) => [...prev, { type, points }]);
//   };

//   const drawOnCanvas = () => {
//     if (!chartRef.current) return;

//     const canvas = chartRef.current.getCanvas().getContext("2d");
//     const timeScale = chartRef.current.timeScale();
//     const priceScale = chartRef.current.priceScale("right");

//     canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);

//     drawings.forEach((d) => {
//       canvas.strokeStyle = "#4ade80";
//       canvas.lineWidth = 2;

//       if (d.type === "trend") {
//         const p1 = chartRef.current.priceScale("right").priceToCoordinate(d.points[0].price);
//         const t1 = chartRef.current.timeScale().timeToCoordinate(d.points[0].time);
//         const p2 = chartRef.current.priceScale("right").priceToCoordinate(d.points[1].price);
//         const t2 = chartRef.current.timeScale().timeToCoordinate(d.points[1].time);

//         if (p1 && p2 && t1 && t2) {
//           canvas.beginPath();
//           canvas.moveTo(t1, p1);
//           canvas.lineTo(t2, p2);
//           canvas.stroke();
//         }
//       }

//       if (d.type === "hline") {
//         const price = d.points[0].price;
//         const y = priceScale.priceToCoordinate(price);
//         if (!y) return;

//         canvas.beginPath();
//         canvas.moveTo(0, y);
//         canvas.lineTo(canvas.canvas.width, y);
//         canvas.stroke();
//       }
//     });
//   };

//   // ---------------- MOUSE HANDLER FOR DRAW ----------------
//   const initDrawHandlers = () => {
//     if (!chartRef.current) return;

//     const chart = chartRef.current;

//     let firstPoint = null;

//     chart.subscribeClick((param) => {
//       if (!param || !drawMode) return;
//       if (!param.time || !param.point) return;

//       const price = chart.priceScale("right").coordinateToPrice(param.point.y);

//       if (!firstPoint) {
//         firstPoint = { time: param.time, price };
//       } else {
//         const secondPoint = { time: param.time, price };

//         if (drawMode === "trend") {
//           addDrawing("trend", [firstPoint, secondPoint]);
//         }

//         if (drawMode === "hline") {
//           addDrawing("hline", [{ time: param.time, price }]);
//         }

//         firstPoint = null;
//         setDrawMode(null);
//       }
//     });
//   };

//   // ------------------ WEBSOCKET ------------------
//   const startWebSocket = (symbol, interval) => {
//     if (wsRef.current) wsRef.current.close();

//     const stream = `${symbol.toLowerCase()}@kline_${interval}`;
//     const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${stream}`);
//     wsRef.current = ws;

//     ws.onmessage = (msg) => {
//       const data = JSON.parse(msg.data);
//       if (!data.k) return;

//       const k = data.k;

//       const candle = {
//         time: Math.floor(k.t / 1000),
//         open: parseFloat(k.o),
//         high: parseFloat(k.h),
//         low: parseFloat(k.l),
//         close: parseFloat(k.c),
//         volume: parseFloat(k.v),
//       };

//       setLatestPrice(candle);

//       const series = candleSeriesRef.current;
//       const vol = volumeSeriesRef.current;

//       if (!series || !vol) return;

//       series.update(candle);
//       vol.update({
//         time: candle.time,
//         value: candle.volume,
//         color: candle.close >= candle.open ? "#22c55e" : "#ef4444",
//       });

//       drawOnCanvas();
//     };

//     ws.onclose = () => {
//       setTimeout(() => startWebSocket(symbol, interval), 2000);
//     };
//   };

//   // --------------- CHART INIT ----------------
//   useEffect(() => {
//     const init = async () => {
//       const container = chartContainerRef.current;

//       const chart = createChart(container, {
//         width: container.clientWidth,
//         height: container.clientHeight,
//         layout: {
//           background: { color: "#0f0f0f" },
//           textColor: "#dadada",
//         },
//         grid: {
//           vertLines: { color: "#1a1a1a" },
//           horzLines: { color: "#1a1a1a" },
//         },
//         timeScale: {
//           borderColor: "#222",
//         },
//         rightPriceScale: {
//           borderColor: "#222",
//         },
//         crosshair: {
//           mode: CrosshairMode.Normal,
//         },
//       });

//       chartRef.current = chart;

//       const candleSeries = chart.addCandlestickSeries({
//         upColor: "#22c55e",
//         downColor: "#ef4444",
//         borderUpColor: "#22c55e",
//         borderDownColor: "#ef4444",
//         wickUpColor: "#22c55e",
//         wickDownColor: "#ef4444",
//       });

//       const volumeSeries = chart.addHistogramSeries({
//         color: "#444",
//         priceFormat: {
//           type: "volume",
//         },
//         priceScaleId: "",
//         scaleMargins: { top: 0.8, bottom: 0 },
//       });

//       candleSeriesRef.current = candleSeries;
//       volumeSeriesRef.current = volumeSeries;

//       // Resize chart
//       resizeObserverRef.current = new ResizeObserver((size) => {
//         chart.applyOptions({
//           width: size[0].contentRect.width,
//           height: size[0].contentRect.height,
//         });
//       });
//       resizeObserverRef.current.observe(container);

//       initDrawHandlers();
//     };

//     init();
//   }, []);

//   // ---------------- LOAD DATA ON CHANGE ----------------
//   useEffect(() => {
//     const load = async () => {
//       const chart = chartRef.current;
//       const candleSeries = candleSeriesRef.current;
//       const volumeSeries = volumeSeriesRef.current;

//       if (!chart || !candleSeries) return;

//       const interval = intervalMap[activeTf];
//       const historical = await fetchHistorical(activeAsset.symbol, interval);

//       candleSeries.setData(
//         historical.map((c) => ({
//           time: c.time,
//           open: c.open,
//           high: c.high,
//           low: c.low,
//           close: c.close,
//         }))
//       );

//       volumeSeries.setData(
//         historical.map((c) => ({
//           time: c.time,
//           value: c.volume,
//           color: c.close >= c.open ? "#22c55e" : "#ef4444",
//         }))
//       );

//       chart.timeScale().fitContent();
//       startWebSocket(activeAsset.symbol, interval);
//     };

//     load();
//   }, [activeAsset, activeTf]);

//   // ----------- MAIN UI (EQUILIX STYLE TOP BAR) --------------
//   return (
//     <div className="w-full h-screen bg-black text-white p-4">
//       {/* TOP BAR */}
//       <div className="flex items-center justify-between bg-[#111] px-4 py-3 rounded-md mb-3">
//         {/* LEFT: Asset */}
//         <select
//           className="bg-[#1a1a1a] px-3 py-2 rounded"
//           value={activeAsset.symbol}
//           onChange={(e) =>
//             setActiveAsset(assets.find((a) => a.symbol === e.target.value))
//           }
//         >
//           {assets.map((a) => (
//             <option key={a.symbol} value={a.symbol}>
//               {a.name}
//             </option>
//           ))}
//         </select>

//         {/* CENTER: Timeframes */}
//         <div className="flex items-center gap-2">
//           {timeframes.map((t) => (
//             <button
//               key={t.v}
//               onClick={() => setActiveTf(t.v)}
//               className={`px-3 py-1 rounded ${
//                 activeTf === t.v ? "bg-green-600" : "bg-[#1a1a1a]"
//               }`}
//             >
//               {t.label}
//             </button>
//           ))}
//         </div>

//         {/* RIGHT: Buttons */}
//         <div className="flex items-center gap-3">
//           <button className="bg-[#1a1a1a] px-3 py-1 rounded">
//             Candle ▼
//           </button>

//           <button
//             className={`px-3 py-1 rounded ${
//               drawMode === "trend" ? "bg-green-600" : "bg-[#1a1a1a]"
//             }`}
//             onClick={() => setDrawMode("trend")}
//           >
//             Trendline
//           </button>

//           <button
//             className={`px-3 py-1 rounded ${
//               drawMode === "hline" ? "bg-green-600" : "bg-[#1a1a1a]"
//             }`}
//             onClick={() => setDrawMode("hline")}
//           >
//             Horizontal Line
//           </button>
//         </div>
//       </div>

//       {/* CHART */}
//       <div
//         ref={chartContainerRef}
//         className="w-full h-[600px] bg-[#0f0f0f] rounded"
//       />
//     </div>
//   );
// };

// export default PriceChart;

