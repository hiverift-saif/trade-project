import React from "react";
import { Gift, Sparkles } from "lucide-react";

export default function TradingLuck() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Floating Gradient Circles */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-40 right-1/4 w-8 h-8 text-pink-400 animate-pulse opacity-60 delay-300" />
        <Gift className="absolute bottom-20 right-1/3 w-6 h-6 text-purple-400 animate-pulse opacity-60 delay-700" />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 md:p-16 shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500">
          {/* Animated Gift Icon */}
          <div className="flex justify-center mb-8 relative">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-full flex items-center justify-center animate-spin-slow relative">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
                <Gift className="w-12 h-12 text-white animate-pulse" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-full blur-lg opacity-60 animate-pulse"></div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold  mb-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Test Your Trading Luck!
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Enter your email and discover what Trade Pro has in store for you.
            <span className="text-yellow-400 font-semibold"> Get a chance to win bonuses</span>,
            <span className="text-pink-400 font-semibold"> free trades</span>, and
            <span className="text-purple-400 font-semibold"> exclusive offers!</span>
          </p>

          {/* Email Form */}
          <form className="max-w-lg mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="flex-1 w-full h-14 px-3 text-lg bg-white/10 text-white placeholder:text-gray-400 rounded-md border border-white/20 backdrop-blur-sm focus:border-purple-400 focus:ring-purple-400/20 outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-md shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                <span>Check My Luck</span>
              </button>
            </div>
          </form>

          {/* Bonuses */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-6">
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30">
              <div className="text-yellow-400 text-2xl font-bold">$100</div>
              <div className="text-gray-300 text-sm">Welcome Bonus</div>
            </div>
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg p-4 border border-pink-500/30">
              <div className="text-pink-400 text-2xl font-bold">5</div>
              <div className="text-gray-300 text-sm">Free Trades</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
              <div className="text-blue-400 text-2xl font-bold">VIP</div>
              <div className="text-gray-300 text-sm">Access</div>
            </div>
          </div>

          <p className="text-sm text-gray-400 flex items-center justify-center space-x-2">
            <Gift className="w-4 h-4 text-purple-400" />
            <span>🎁 Gamified Offer: Possible bonus or free gift from Trade Pro</span>
          </p>
        </div>
      </div>
    </section>
  );
}
