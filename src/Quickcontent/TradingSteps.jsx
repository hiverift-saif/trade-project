// src/components/TradingSteps.jsx
import React from "react";
import { UserPlus, Shield, Wallet, TrendingUp, DollarSign, Banknote } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Registration",
    description: "Create a free Trade Pro account using your email, or sign up quickly via Google or Facebook.",
    icon: <UserPlus className="w-10 h-10 text-white" />,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Verification",
    description: "Complete your profile. Upload ID and proof of address to secure your account.",
    icon: <Shield className="w-10 h-10 text-white" />,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: 3,
    title: "Deposit",
    description: "Fund your account using your preferred deposit method. Processing depends on the option chosen.",
    icon: <Wallet className="w-10 h-10 text-white" />,
    gradient: "from-purple-500 to-violet-600",
  },
  {
    id: 4,
    title: "Trading",
    description: "Trading with Trade Pro is easy: Select your asset, Choose chart + indicators, Set trade amount & time, Place increase/decrease order.",
    icon: <TrendingUp className="w-10 h-10 text-white" />,
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: 5,
    title: "Profit",
    description: "Each correct forecast brings instant profit. Earnings are added to your balance—reinvest or withdraw anytime.",
    icon: <DollarSign className="w-10 h-10 text-white" />,
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    id: 6,
    title: "Withdrawal",
    description: "Withdraw funds at any time using the same method as deposit. Fast, simple, and reliable.",
    icon: <Banknote className="w-10 h-10 text-white" />,
    gradient: "from-cyan-500 to-blue-600",
  },
];

export default function TradingSteps() {
  return (
    <section className="py-20 relative bg-black bg-gradient-to-r from-[#000213] via-[#041379]/90 to-[#041379]/40 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r  to-green-100 bg-clip-text text-transparent">
            Your Trading Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow these simple steps to start your successful trading career with Trade Pro
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical Line for Desktop */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-30"></div>

          <div className="space-y-16">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={`relative flex items-center flex-col lg:flex-row ${
                  idx % 2 !== 0 ? "lg:flex-row-reverse" : ""
                } lg:space-x-16 space-y-8 lg:space-y-0`}
              >
                {/* Card */}
                <div className="w-full lg:w-5/12 text-center lg:text-left">
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:scale-105 group">
                    {/* Mobile Icon */}
                    <div className="flex items-center justify-center lg:hidden mb-6">
                      <div
                        className={`relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r ${step.gradient}`}
                      >
                        {step.icon}
                        <div className="absolute inset-0 rounded-2xl blur opacity-50 bg-gradient-to-r from-white/30 to-black/30 group-hover:opacity-75 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {step.description}
                    </p>
                    <button className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Desktop Icon */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-24 h-24 items-center justify-center">
                  <div
                    className={`relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl bg-gradient-to-r ${step.gradient}`}
                  >
                    {step.icon}
                    <div className="absolute inset-0 rounded-2xl blur opacity-50"></div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg">
                      {step.id}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
