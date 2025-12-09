import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const traders = [
  // 'code' is the country code for the flag image
  { code: "ca", count: "2.5k", top: "26%", left: "21%" },    // Canada
  { code: "us", count: "10k", top: "40%", left: "26%" },     // USA
  { code: "gl", count: "485", top: "18%", left: "36%" },     // Greenland
  { code: "br", count: "4.2k", top: "70%", left: "36%" },    // Brazil
  { code: "pl", count: "485", top: "32%", left: "53%" },     // Poland
  { code: "it", count: "8.5k", top: "44%", left: "51%" },    // Italy
  { code: "ru", count: "8.5k", top: "34%", left: "66%" },    // Russia
  { code: "in", count: "6.3k", top: "54%", left: "69%" },    // India
  { code: "ke", count: "765", top: "64%", left: "56%" },     // Kenya
];

export default function GlobalReach() {
  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden font-sans">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 bg-green-500 text-white text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            Global Reach
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Traders Across The Globe
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Discover the most competitive prices in the market, updated regularly for your advantage.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Map Area with Grid Background */}
          <div className="relative w-full h-0 pb-[60%] sm:pb-[55%] rounded-3xl overflow-hidden border border-gray-50 bg-gray-50/50">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-60 z-0 pointer-events-none"></div>
            <img
              src="https://tradebro-react-next-js-template.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fresources%2Fglobal-reach-v1-map.png&w=1200&q=75"
              alt="World Map"
              className="absolute inset-0 w-full h-full object-contain object-center opacity-80 z-10 mix-blend-multiply p-4"
            />
          </div>

          {/* Traders Markers */}
          {traders.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 260, damping: 20 }}
              viewport={{ once: true }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-default"
              style={{ top: item.top, left: item.left }}
            >
              {/* Ping Animation */}
              <div className="absolute inset-0 -m-2 sm:-m-3 w-12 h-12 sm:w-16 sm:h-16 bg-red-500/20 rounded-full animate-ping"></div>
              <div className="absolute inset-0 -m-0.5 w-9 h-9 sm:w-11 sm:h-11 bg-red-100/80 rounded-full"></div>

              {/* Flag Image Bubble */}
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] border-[3px] border-white overflow-hidden z-10 group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={`https://flagcdn.com/w80/${item.code}.png`} 
                  alt={item.code} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center whitespace-nowrap pointer-events-none">
                <p className="text-[10px] sm:text-xs font-extrabold text-gray-900 leading-none mb-0.5">{item.count}</p>
                <p className="text-[9px] sm:text-[10px] font-semibold text-gray-500 leading-none">Traders</p>
              </div>
            </motion.div>
          ))}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            viewport={{ once: true }}
            className="absolute -bottom-10 sm:-bottom-12 left-1/2 -translate-x-1/2 text-center w-full z-30"
          >
            <div className="flex justify-center -space-x-3 mb-3">
              {[32, 68, 46].map((id, idx) => (
                <div key={idx} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[3px] border-white shadow-md overflow-hidden bg-gray-200">
                  <img src={`https://randomuser.me/api/portraits/${idx === 1 ? 'women' : 'men'}/${id}.jpg`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 drop-shadow-sm">
              1.6 Million Traders Globally.{" "}
              <a href="#" className="text-green-600 hover:text-green-700 font-bold inline-flex items-center gap-1.5 transition-colors">
                Join With Us <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}