
// src/pages/HeroSection.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, LogIn, MousePointer } from "lucide-react";

export default function Quickhero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image + Gradients */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1643962579745-bcaa05ffc573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaW5nJTIwY2hhcnRzJTIwZmluYW5jaWFsJTIwbWFya2V0cyUyMGRhc2hib2FyZCUyMGRhcmt8ZW58MXx8fHwxNzU4NjA3MzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          <span className="block bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent mb-2">
            Quick Start with
          </span>
          <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Trade Pro
          </span>
        </h1>
        <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          How to Trade on Financial Markets in{" "}
          <span className="text-green-400 font-semibold">6 Simple Steps</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => navigate("/registration")}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6 py-2 text-xl font-semibold rounded-md shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <UserPlus className="w-6 h-6 mr-3" /> Registration
          </button>
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center justify-center gap-2 border border-white/40 backdrop-blur-sm bg-white/10 text-white px-6 py-2 text-xl font-semibold rounded-md shadow-2xl hover:bg-white/20 hover:scale-105 transition-all duration-300"
          >
            <LogIn className="w-6 h-6 mr-3" /> Log In
          </button>
          <button
            onClick={() => console.log("Start in One Click")}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-2 text-xl font-semibold rounded-md shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <MousePointer className="w-6 h-6 mr-3" /> Start in One Click
          </button>
        </div>
      </div>
    </section>
  );
}
