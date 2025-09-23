import React from "react";
import { Smartphone, Apple, Monitor, MessageSquare, Download, ExternalLink, QrCode } from "lucide-react";

export default function DownloadAccessibility() {
  const platforms = [
    {
      name: "Android",
      subtitle: "Google Play + APK",
      description: "Download from Google Play or install APK directly",
      gradient: "from-green-500 to-emerald-600",
      icon: <Smartphone className="w-10 h-10 text-white" />,
      buttonText: "Download APK",
    },
    {
      name: "iOS",
      subtitle: "App Store",
      description: "Available on the Apple App Store",
      gradient: "from-blue-500 to-indigo-600",
      icon: <Apple className="w-10 h-10 text-white" />,
      buttonText: "Download iOS",
    },
    {
      name: "Web App",
      subtitle: "Browser Trading",
      description: "Trade directly in your web browser",
      gradient: "from-purple-500 to-violet-600",
      icon: <Monitor className="w-10 h-10 text-white" />,
      buttonText: "Open Web App",
    },
    {
      name: "Telegram Bot",
      subtitle: "Instant Trading",
      description: "Trade through our Telegram bot",
      gradient: "from-indigo-500 to-blue-600",
      icon: <MessageSquare className="w-10 h-10 text-white" />,
      buttonText: "Open Bot",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v6h-2v-6h2zM36%2014v6h-2v-6h2zM18%2034v6h-2v-6h2zM18%2014v6h-2v-6h2z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold  mb-6 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
            Download &amp; Accessibility
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Trade on any device, anywhere, anytime. Choose your preferred platform and
            <span className="text-blue-400 font-semibold"> start trading today</span>.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {platforms.map((platform, idx) => (
            <div
              key={idx}
              className={`group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-gray-600/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
              ></div>
              <div className="text-center relative">
                <div className="flex justify-center mb-6">
                  <div
                    className={`relative w-20 h-20 bg-gradient-to-br ${platform.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl`}
                  >
                    {platform.icon}
                    <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                  {platform.name}
                </h3>
                <p className="text-sm text-blue-400 font-semibold mb-4">{platform.subtitle}</p>
                <p className="text-sm text-gray-300 mb-8 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {platform.description}
                </p>
                <button
                  className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm h-9 px-4 w-full bg-gradient-to-r ${platform.gradient} hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-white font-semibold border-0 group-hover:scale-105`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {platform.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Mobile Access */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-bold  mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Quick Mobile Access
              </h3>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Scan the QR code with your mobile device to instantly access our trading platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all h-9 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Open Web Platform
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 py-2 border bg-background dark:bg-input/30 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                  <QrCode className="w-5 h-5 mr-2" />
                  Generate QR Code
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 bg-white rounded-2xl p-4 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-white" />
                  </div>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-20"></div>
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm rounded-2xl px-8 py-4 border border-gray-700/50">
              <Monitor className="w-6 h-6 text-blue-400" />
              <span className="text-gray-300 font-medium">
                All platforms synchronized with your account - Trade seamlessly across devices
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
