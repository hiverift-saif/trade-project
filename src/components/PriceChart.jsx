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

  const [latestPrice, setLatestPrice] = useState(null);

  const [assets] = useState([
    { id: 1, symbol: 'BTCUSDT', name: 'Bitcoin' },
    { id: 2, symbol: 'ETHUSDT', name: 'Ethereum' },
    { id: 3, symbol: 'BNBUSDT', name: 'Binance Coin' },
  ]);

  const [activeAsset, setActiveAsset] = useState(assets[0]);
  const [timeframe, setTimeframe] = useState('M1');

  const timeframeMap = {
    M1: '1m',
    M5: '5m',
    M15: '15m',
    H1: '1h',
    H4: '4h',
  };

  // Fetch historical data
  const fetchHistoricalData = async (symbol, interval, limit = 500) => {
    try {
      const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
      );
      const data = await res.json();
      return data.map(d => ({
        Date: d[0],
        Open: parseFloat(d[1]),
        High: parseFloat(d[2]),
        Low: parseFloat(d[3]),
        Close: parseFloat(d[4]),
        Volume: parseFloat(d[5]),
      }));
    } catch (err) {
      console.error('Error fetching historical data:', err);
      return [];
    }
  };

  // Setup WebSocket
  const setupWebSocket = (symbol, interval) => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
    );
    wsRef.current = ws;

    ws.onmessage = evt => {
      const msg = JSON.parse(evt.data);
      if (msg.k) {
        const k = msg.k;
        const candle = {
          Date: k.t,
          Open: parseFloat(k.o),
          High: parseFloat(k.h),
          Low: parseFloat(k.l),
          Close: parseFloat(k.c),
          Volume: parseFloat(k.v),
        };
        setLatestPrice(candle);

        // Directly update chart
        const valueSeries = valueSeriesRef.current;
        const volumeSeries = volumeSeriesRef.current;
        if (valueSeries && volumeSeries) {
          const data = [...valueSeries.data.values];
          const last = data[data.length - 1];
          if (last && last.Date === candle.Date) {
            data[data.length - 1] = candle;
          } else {
            data.push(candle);
          }
          valueSeries.data.setAll(data);
          volumeSeries.data.setAll(data);
        }
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
      const interval = timeframeMap[timeframe] || '1m';
      const historical = await fetchHistoricalData(activeAsset.symbol, interval);

      // Initialize chart if not already
      if (!rootRef.current && chartRef.current) {
        const root = am5.Root.new(chartRef.current);
        rootRef.current = root;
        root.setThemes([am5themes_Animated.new(root)]);

        const stockChart = root.container.children.push(
          am5stock.StockChart.new(root, { paddingRight: 0 })
        );
        const mainPanel = stockChart.panels.push(
          am5stock.StockPanel.new(root, { wheelY: 'zoomX', panX: true, panY: true })
        );

        const valueAxis = mainPanel.yAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, { pan: 'zoom' }),
            extraMin: 0.1,
          })
        );

        const dateAxis = mainPanel.xAxes.push(
          am5xy.GaplessDateAxis.new(root, {
            baseInterval: { timeUnit: 'minute', count: 1 },
            renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
          })
        );

        const valueSeries = mainPanel.series.push(
          am5xy.CandlestickSeries.new(root, {
            name: activeAsset.name,
            valueXField: 'Date',
            valueYField: 'Close',
            highValueYField: 'High',
            lowValueYField: 'Low',
            openValueYField: 'Open',
            xAxis: dateAxis,
            yAxis: valueAxis,
            calculateAggregates: true,
          })
        );

        const valueLegend = mainPanel.plotContainer.children.push(
          am5stock.StockLegend.new(root, { stockChart: stockChart })
        );

        // Volume series
        const volumeAxisRenderer = am5xy.AxisRendererY.new(root, { inside: true, pan: 'zoom' });
        volumeAxisRenderer.labels.template.set('forceHidden', true);
        volumeAxisRenderer.grid.template.set('forceHidden', true);

        const volumeValueAxis = mainPanel.yAxes.push(
          am5xy.ValueAxis.new(root, {
            numberFormat: '#.#a',
            height: am5.percent(20),
            centerY: am5.percent(100),
            y: am5.percent(100),
            renderer: volumeAxisRenderer,
          })
        );

        const volumeSeries = mainPanel.series.push(
          am5xy.ColumnSeries.new(root, {
            name: 'Volume',
            valueXField: 'Date',
            valueYField: 'Volume',
            xAxis: dateAxis,
            yAxis: volumeValueAxis,
          })
        );
        volumeSeries.columns.template.setAll({ strokeOpacity: 0, fillOpacity: 0.5 });

        stockChart.set('stockSeries', valueSeries);
        stockChart.set('volumeSeries', volumeSeries);
        valueLegend.data.setAll([valueSeries, volumeSeries]);

        mainPanel.set(
          'cursor',
          am5xy.XYCursor.new(root, { yAxis: valueAxis, xAxis: dateAxis, snapToSeries: [valueSeries] })
        );

        valueSeriesRef.current = valueSeries;
        volumeSeriesRef.current = volumeSeries;

        // Set initial data
        valueSeries.data.setAll(historical);
        volumeSeries.data.setAll(historical);

        // StockToolbar with Indicators, Period buttons, Candles, Draw tools
        const toolbarContainer = document.getElementById('amchart-controls');
        if (toolbarContainer) {
          am5stock.StockToolbar.new(root, {
            container: toolbarContainer,
            stockChart: stockChart,
            controls: [
              am5stock.IndicatorControl.new(root, { stockChart, legend: valueLegend }),
              am5stock.PeriodSelector.new(root, { stockChart }),
              am5stock.SeriesTypeControl.new(root, { stockChart }),
              am5stock.DrawingControl.new(root, { stockChart }),
              am5stock.DataSaveControl.new(root, { stockChart }),
              am5stock.ResetControl.new(root, { stockChart }),
              am5stock.SettingsControl.new(root, { stockChart }),
            ],
          });
        }
      }

      // Setup WebSocket
      setupWebSocket(activeAsset.symbol, interval);
    };

    loadData();

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [activeAsset, timeframe]);

  // Dispose chart on unmount
  useEffect(() => {
    return () => {
      if (rootRef.current) rootRef.current.dispose();
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
        style={{ width: '100%', height: '600px' }}
        className="w-full bg-white shadow-lg rounded-lg"
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
