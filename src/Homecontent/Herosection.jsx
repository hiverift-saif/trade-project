// src/pages/Home.jsx
import React from "react";
import { TrendingUp, Rocket, Play } from "lucide-react";
import backgroundVideo from "../assets/video.mp4"; // local video import

export default function Herosection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaW5nJTIwZGFzaGJvYXJkJTIwY2hhcnRzJTIwYmx1ZXxlbnwwfHx8fDE3MzI0MDYwMDB8MA&ixlib=rb-4.0.3&q=80&w=1080"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            <span className="block bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent mb-2">
              The Right Place for
            </span>
            <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Online Trading
            </span>
            <span className="block text-white/90 text-2xl sm:text-3xl md:text-4xl font-medium mt-2">
              on Financial Markets
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            User-friendly interface, <span className="text-green-400 font-semibold">100+ assets</span>, and{" "}
            <span className="text-blue-400 font-semibold">fast withdrawals</span>.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
          <button className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-12 py-6 text-xl font-semibold rounded-md shadow-2xl hover:scale-105 transition-all duration-300">
            <Rocket className="w-6 h-6" /> Start Trading in One Click
          </button>
          <button className="inline-flex items-center justify-center gap-3 border border-white/40 backdrop-blur-sm bg-white/10 text-white px-12 py-6 text-xl font-semibold rounded-md shadow-2xl hover:scale-105 transition-all duration-300">
            <Play className="w-6 h-6" /> Try Free Demo
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
          <div className="flex flex-col items-center space-y-2 bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold">Live Trading</span>
            </div>
            <span className="text-white/70 text-sm">24/7 Market Access</span>
          </div>
          <div className="flex flex-col items-center space-y-2 bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400 font-semibold">Real-Time Data</span>
            </div>
            <span className="text-white/70 text-sm">Instant Updates</span>
          </div>
          <div className="flex flex-col items-center space-y-2 bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 font-semibold">Fast Execution</span>
            </div>
            <span className="text-white/70 text-sm">Lightning Speed</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
