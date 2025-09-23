import React from "react";
import { CreditCard, TrendingUp, Trophy, Smartphone, ChartColumn, Users, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Payment Methods",
    desc: "Multiple secure payment options",
    icon: <CreditCard className="w-6 h-6 text-white" />,
    bgColor: "bg-blue-500",
    img: "https://images.unsplash.com/photo-1748609278627-4b0e483b9b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
  {
    title: "Trading Assets",
    desc: "Diverse portfolio opportunities",
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    bgColor: "bg-green-500",
    img: "https://images.unsplash.com/photo-1634117622592-114e3024ff27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
  {
    title: "Achievements",
    desc: "Unlock rewards and milestones",
    icon: <Trophy className="w-6 h-6 text-white" />,
    bgColor: "bg-yellow-500",
    img: "https://images.unsplash.com/photo-1643962579365-3a9222e923b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
  {
    title: "Apps for Any Device",
    desc: "Trade anywhere, anytime",
    icon: <Smartphone className="w-6 h-6 text-white" />,
    bgColor: "bg-purple-500",
    img: "https://images.unsplash.com/photo-1613442301287-4fa478efd9ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
  {
    title: "Technical Analysis Tools",
    desc: "Advanced charting and indicators",
    icon: <ChartColumn className="w-6 h-6 text-white" />,
    bgColor: "bg-indigo-500",
    img: "https://images.unsplash.com/photo-1634117622592-114e3024ff27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
  {
    title: "Community",
    desc: "Connect with fellow traders",
    icon: <Users className="w-6 h-6 text-white" />,
    bgColor: "bg-pink-500",
    img: "https://images.unsplash.com/photo-1748609278627-4b0e483b9b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  },
];

export default function TradingFeatures() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 overflow-visible">
  <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent leading-tight">
  Trading Features
</h2>

          <p className="text-xl text-gray-300 mt-2">Everything you need for successful trading</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Background image overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ backgroundImage: `url(${feature.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">
                  {feature.desc}
                </p>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-8 rounded-md gap-1.5 text-blue-400 hover:text-white hover:bg-blue-500/20 p-0">
                  More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
