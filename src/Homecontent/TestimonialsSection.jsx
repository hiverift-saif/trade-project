import React from "react";

const testimonials = [
  {
    profit: "40%",
    profitText: "Trading Performance",
    profitSubText: "Improved.",
    rating: 4.9,
    review: "I've found Trade Pro to be incredibly reliable and user-friendly. The educational resources and market analysis have been instrumental in helping me.",
    name: "Oakley Hamilton",
    role: "Day Trader",
    country: "fr",
  },
  {
    profit: "20%",
    profitText: "Return on my Investments",
    profitSubText: "Last Quarter.",
    rating: 5.0,
    review: "Trading with Trade Pro has been a great experience. The platform is easy to use, and the insights provided have helped me consistently improve my trading.",
    name: "Edric Stanley",
    role: "Stock Trader",
    country: "gb",
  },
  {
    profit: "35%",
    profitText: "Profit within Three",
    profitSubText: "Months.",
    rating: 5.0,
    review: "The platform's tools and resources significantly improved my trading strategy. Trade Pro has been instrumental in my trading success.",
    name: "Newton Lester",
    role: "Forex Trader",
    country: "de",
  },
];

export default function PremiumTestimonials() {
  return (
    <section className="py-20 bg-[#0a0e27] overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-blue-950/20"></div>

      <div className="w-full px-4 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-emerald-400 px-6 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase text-white shadow-lg mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Real Experiences, Real Results
          </h2>
        </div>

        {/* ROW 1 - Left to Right */}
        <div className="relative mb-8 overflow-hidden">
          <div className="flex gap-10 animate-scroll-left">
            {[...testimonials, ...testimonials].map((item, idx) => (
              <TestimonialCard key={`row1-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* ROW 2 - Right to Left */}
        <div className="relative overflow-hidden">
          <div className="flex gap-10 animate-scroll-right">
            {[...testimonials, ...testimonials].map((item, idx) => (
              <TestimonialCard key={`row2-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind + CSS Animation (Vite ke liye perfect) */}
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-left {
            animation: scroll-left 35s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 35s linear infinite;
          }
          .animate-scroll-left:hover,
          .animate-scroll-right:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
}

function TestimonialCard({ item }) {
  return (
    <div className="flex-shrink-0 w-[360px] lg:w-[420px] bg-gradient-to-br from-[#1a1f3a] to-[#0f1629] rounded-2xl p-8 border border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-black text-white">{item.profit}</span>
          </div>
          <div>
            <p className="text-gray-300 font-medium">{item.profitText}</p>
            <p className="text-gray-400 text-sm">{item.profitSubText}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-600/30">
          <span className="text-white font-bold text-lg">{item.rating}</span>
          <span className="text-emerald-400 ml-1">★★★★★</span>
        </div>
      </div>

      <p className="text-gray-300 text-base leading-relaxed mb-8">
        "{item.review}"
      </p>

      <div className="flex items-center gap-4">
        <img
          src={`https://flagcdn.com/48x36/${item.country}.png`}
          alt={item.name}
          className="w-12 h-12 rounded-full border-2 border-gray-600 object-cover"
        />
        <div>
          <h3 className="text-white font-bold text-lg">{item.name}</h3>
          <p className="text-gray-400 text-sm">{item.role}</p>
        </div>
      </div>
    </div>
  );
}