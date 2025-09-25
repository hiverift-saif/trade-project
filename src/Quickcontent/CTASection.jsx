import React from "react";
import { TrendingUp, Play } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1643962579745-bcaa05ffc573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-blue-900/80 to-indigo-900/90"></div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold  mb-6 bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
            Get Started Today with Trade Pro
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            From registration to your first trade, everything is just a few
            clicks away.{" "}
            <span className="text-blue-400 font-semibold">
              Join thousands of successful traders
            </span>{" "}
            worldwide.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-5 py-2 text-2xl font-semibold rounded-md shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105">
              <TrendingUp className="w-8 h-8 mr-2 group-hover:animate-pulse" />
              Start Trading Now
            </button>

            <button className="inline-flex items-center justify-center gap-2   backdrop-blur-sm bg-white/10 text-white hover:bg-white/20 px-5 py-2 text-2xl font-semibold rounded-md shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
              <Play className="w-8 h-8 mr-2 group-hover:animate-pulse" />
              Try Free Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-12 border-t border-gray-700/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">5 Min</div>
              <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto mb-3 rounded-full"></div>
              <p className="text-gray-400">Setup Time</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">$5</div>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-3 rounded-full"></div>
              <p className="text-gray-400">Minimum Deposit</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-3 rounded-full"></div>
              <p className="text-gray-400">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
