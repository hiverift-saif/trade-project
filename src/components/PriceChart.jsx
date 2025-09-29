import React, { useEffect, useRef } from 'react';
import Chart from "react-apexcharts";

function PriceChart({ data, precision }) {
  const chartContainerRef = useRef(null);

  const series = React.useMemo(
    () => [
      {
        name: "Price",
        data: data.map((p) => [p.time * 1000, p.value]),
      },
    ],
    [data]
  );

  const options = {
    chart: {
      type: 'area',
      height: '100%',
      background: '#0b0f1a',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: { show: false },
      zoom: { enabled: true },
    },
    theme: { mode: 'dark' },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    grid: {
      borderColor: '#161a27',
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      type: 'datetime',
      labels: { datetimeUTC: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      opposite: true,
      labels: { formatter: (val) => val.toFixed(precision) },
      axisBorder: { show: false },
    },
    tooltip: { x: { format: 'dd MMM yyyy HH:mm:ss' } },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1, stops: [0, 100] },
    },
  };

  useEffect(() => {
    const container = chartContainerRef.current;
    if (container) {
      container.scrollLeft = 0; // Reset scroll to start
      container.style.marginLeft = '0'; // Explicitly remove any margin
    }
  }, [data]);

  return (
    <div
      ref={chartContainerRef}
      className="flex-1 h-full w-full overflow-hidden z-0" // Changed z-10 to z-0
      style={{ marginLeft: '0' }} // Inline style to ensure no left margin
    >
      <Chart options={options} series={series} type="area" height="100%" width="100%" />
    </div>
  );
}

export default PriceChart;