// src/Homecontent/TrustedSection.jsx
import React from "react";
import { Star, DollarSign, Clock, Shield, Users, Award } from "lucide-react";

export default function TrustedSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
            Trusted by Millions Worldwide
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join the most reliable trading platform with industry-leading security and support
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* 4.5 Stars */}
          <div className="text-center group">
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <Star className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                4.5 Stars
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-medium">
                User Rating
              </p>
            </div>
          </div>

          {/* $5 Min */}
          <div className="text-center group">
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <DollarSign className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                $5 Min
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-medium">
                Investment
              </p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="text-center group">
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <Clock className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                24/7
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-medium">
                Support
              </p>
            </div>
          </div>

          {/* Secure */}
          <div className="text-center group">
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <Shield className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                Secure
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-medium">
                Platform
              </p>
            </div>
          </div>

          {/* 1M+ Traders */}
          <div className="text-center group">
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <Users className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                1M+
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-medium">
                Traders
              </p>
            </div>
          </div>

          {/* Licensed */}
          <div className="text-center group">
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <Award className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                Licensed
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-medium">
                Broker
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Icons */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-blue-400" />
              <span>Regulated Broker</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>1M+ Active Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Award Winning Platform</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
