// src/components/AboutUs.jsx
import React from "react";
import { Users, Award, Globe } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
            About Trade Pro
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Trade Pro is a global trading platform dedicated to empowering traders of all levels. 
            With cutting-edge tools, a secure environment, and educational resources, we aim to make 
            financial markets accessible, transparent, and profitable for everyone. Our mission is 
            to provide a seamless trading experience with fast executions, diverse instruments, 
            and a community-driven approach that ensures continuous growth and learning.
          </p>
        </div>

        {/* Features / Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
            <Users className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">50,000+ Traders</h3>
            <p className="text-gray-300 text-center">
              Our platform supports a global community of over 50,000 active traders.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
            <Award className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Trusted & Awarded</h3>
            <p className="text-gray-300 text-center">
              Recognized for excellence in trading innovation, customer support, and platform security.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
            <Globe className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Global Reach</h3>
            <p className="text-gray-300 text-center">
              Trade Pro operates worldwide, connecting traders to over 100 financial markets seamlessly.
            </p>
          </div>
        </div>

        {/* More About */}
        <div className="mt-16 max-w-4xl mx-auto text-center space-y-4">
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            At Trade Pro, we believe that trading should be intuitive, educational, and profitable. 
            Whether you're a beginner exploring your first trades or an expert managing a complex portfolio, 
            our platform equips you with the tools, insights, and support to succeed. Join our community 
            and experience a new era of online trading.
          </p>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Security, transparency, and customer satisfaction are the pillars of our service. We continuously 
            innovate to provide cutting-edge trading instruments, seamless execution, and reliable withdrawal processes.
          </p>
        </div>
      </div>
    </section>
  );
}
