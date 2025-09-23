import React from "react";
import { Zap, BookOpen, TrendingUp, Gamepad2, CreditCard, Gift, ChartColumn, Shield } from "lucide-react";

const features = [
  {
    title: "Flexible Trading",
    desc: "Express trades, pending trades, payouts up to 218%.",
    icon: <Zap className="w-8 h-8 text-white" />,
    bgGradient: "from-yellow-500 to-orange-500",
    hoverGradient: "from-yellow-500 to-orange-500/10",
  },
  {
    title: "Comprehensive Education",
    desc: "Tutorials, guides, strategies.",
    icon: <BookOpen className="w-8 h-8 text-white" />,
    bgGradient: "from-blue-500 to-cyan-500",
    hoverGradient: "from-blue-500 to-cyan-500/10",
  },
  {
    title: "Diverse Instruments",
    desc: "Forex, commodities, stocks.",
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    bgGradient: "from-green-500 to-emerald-500",
    hoverGradient: "from-green-500 to-emerald-500/10",
  },
  {
    title: "Risk-Free Demo",
    desc: "Virtual money, no risk.",
    icon: <Gamepad2 className="w-8 h-8 text-white" />,
    bgGradient: "from-purple-500 to-pink-500",
    hoverGradient: "from-purple-500 to-pink-500/10",
  },
  {
    title: "Easy Deposits/Withdrawals",
    desc: "50+ payment methods.",
    icon: <CreditCard className="w-8 h-8 text-white" />,
    bgGradient: "from-indigo-500 to-blue-500",
    hoverGradient: "from-indigo-500 to-blue-500/10",
  },
  {
    title: "High Loyalty Benefits",
    desc: "Bonuses, tournaments, promo codes.",
    icon: <Gift className="w-8 h-8 text-white" />,
    bgGradient: "from-pink-500 to-rose-500",
    hoverGradient: "from-pink-500 to-rose-500/10",
  },
  {
    title: "Trading Advantages",
    desc: "Cashback + smooth trading experience with minimal risks.",
    icon: <ChartColumn className="w-8 h-8 text-white" />,
    bgGradient: "from-emerald-500 to-teal-500",
    hoverGradient: "from-emerald-500 to-teal-500/10",
  },
  {
    title: "Advanced Security",
    desc: "Bank-level encryption, 2FA, and secure fund protection.",
    icon: <Shield className="w-8 h-8 text-white" />,
    bgGradient: "from-slate-500 to-gray-500",
    hoverGradient: "from-slate-500 to-gray-500/10",
  },
];

export default function WhyChooseTradePro() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold  mb-4 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
            Why Choose Trade Pro?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the ultimate trading platform designed for your success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`group relative p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.hoverGradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
              ></div>
              <div className="relative flex flex-col items-center text-center space-y-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.bgGradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
