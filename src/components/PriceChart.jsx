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

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
    );
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected for', symbol, interval);
    };

    ws.onmessage = evt => {
      try {
        const msg = JSON.parse(evt.data);
        if (msg.k) {
          const k = msg.k;
          const candle = {
            Date: Number(k.t),
            Open: parseFloat(k.o) || 0,
            High: parseFloat(k.h) || 0,
            Low: parseFloat(k.l) || 0,
            Close: parseFloat(k.c) || 0,
            Volume: parseFloat(k.v) || 0,
          };

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