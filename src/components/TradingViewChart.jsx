import React, { useEffect, useRef } from "react";

export default function TradingViewChart({ symbol = "EURUSD", interval = "1" }) {
  const chartRef = useRef(null);

useEffect(() => {
  function initWidget() {
    if (window.TradingView && chartRef.current) {
      new window.TradingView.widget({
        container_id: chartRef.current.id,
        symbol,
        interval,
        width: "100%",
        height: "100%",
        autosize: true,
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#1f2937",
        enable_publishing: false,
        allow_symbol_change: true,
        hide_side_toolbar: false,
        details: true,
        hotlist: true,
        studies: [],
      });
    }
  }

  // ✅ Load script only once
  if (!window.TradingView) {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = initWidget;
    document.body.appendChild(script);
  } else {
    initWidget();
  }

  // ✅ Cleanup only removes old chart instance, not the script
  return () => {
    if (chartRef.current) {
      chartRef.current.innerHTML = "";
    }
  };
}, [symbol, interval]);


  return <div ref={chartRef} id={`tradingview_${symbol}`} style={{ height: "100%", width: "100%" }} />;
}
