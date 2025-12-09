import { useEffect, useRef, useState } from "react";

const TradingFeatures = () => {
  const stats = [
    { value: 1.4, unit: "m+", label: "Trades Executed Daily", icon: "📅", small: "Trades" },
    { value: 30, unit: "+", label: "Variety of Trading Options.", icon: "📈", small: "Instruments" },
    { value: 2.5, unit: "m+", label: "Active Traders in Community", icon: "👥", small: "Trades" },
    { value: 10, unit: "+", label: "Industry Awards Won", icon: "🏆", small: "Recognition" },
  ];

  const progressData = [
    { title: "Platform Uptime", percent: 99.9 },
    { title: "Community Growth", percent: 80 },
    { title: "Trade Success Rate", percent: 85 },
  ];

  const refSection = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setStart(true),
      { threshold: 0.5 }
    );
    obs.observe(refSection.current);
  }, []);

  return (
    <section
      ref={refSection}
      className="relative bg-[#f3faf5] py-20 px-3 md:px-8 overflow-hidden"
    >
      {/* BG grid shapes */}
      <div className="absolute -left-40 top-0 w-[600px] h-[600px] opacity-[0.12] bg-[url('https://i.ibb.co/JFrpKGF/grid.png')] bg-contain bg-no-repeat"></div>
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] opacity-[0.12] bg-[url('https://i.ibb.co/JFrpKGF/grid.png')] bg-contain bg-no-repeat"></div>

      <div className="max-w-[1250px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* LEFT BOXES */}
        <div className="flex flex-col gap-6">
          {stats.slice(0,2).map((item, i) => <StatCard key={i} item={item} start={start} />)}
        </div>

        {/* CENTER BIG CARD */}
        <div className="rounded-3xl bg-white shadow-md p-10 flex flex-col justify-center">
          <p className="mx-auto bg-green-500 text-white text-xs px-4 py-1 rounded-full">
            INTERESTING NUMBERS
          </p>
          <h2 className="text-center font-bold text-3xl mt-4 text-[#051509]">
            Fascinating Facts
          </h2>

          <div className="mt-10 space-y-6">
            {progressData.map((bar, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2 text-sm font-semibold text-[#051509]">
                  <span>{bar.title}</span>
                  <span>{bar.percent}%</span>
                </div>

                <div className="h-3 w-full bg-gray-200/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#48ff7b] to-[#12ca6a] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: start ? `${bar.percent}%` : "0%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT BOXES */}
        <div className="flex flex-col gap-6">
          {stats.slice(2,4).map((item, i) => <StatCard key={i} item={item} start={start} />)}
        </div>
      </div>
    </section>
  );
};

// 📌 Reusable Stat Card
const StatCard = ({ item, start }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md px-6 py-6">
      <h2 className="text-4xl font-bold text-[#051509]">
        {start ? <Counter value={item.value} /> : 0}{item.unit}
      </h2>
      <p className="text-sm text-gray-600 mt-2">{item.label}</p>

      <div className="flex justify-between mt-3 items-center">
        <span className="text-[40px]">{item.icon}</span>
        <span className="text-sm font-semibold text-[#051509]">{item.small}</span>
      </div>
    </div>
  );
};

// 🔢 Counter Animation
const Counter = ({ value }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let val = 0;
    const speed = 30;
    const inc = value / 25;

    const timer = setInterval(() => {
      val += inc;
      if (val >= value) {
        val = value;
        clearInterval(timer);
      }
      setCount(Number(val.toFixed(1)));
    }, speed);
  }, []);
  return count;
};

export default TradingFeatures;
