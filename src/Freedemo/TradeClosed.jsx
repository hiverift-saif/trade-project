import React from "react";
import { Link } from "react-router-dom";

export default function TradeClosed() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
      <div className="relative min-h-screen flex items-center justify-center p-4 w-full">

        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1634097537825-b446635b2f7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaW5nJTIwcGxhdGZvcm0lMjBkYXNoYm9hcmQlMjBkYXJrJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc1ODYwODM3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`,
            }}
          ></div>
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        {/* Card */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="text-center bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50">
            
            {/* Badge */}
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl bg-gradient-to-r from-red-500 to-pink-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-target w-12 h-12 text-white"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Your trade is closed.
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your trade was not profitable this time. Don’t worry, with practice and strategy, you can improve your success rate!
            </p>

            {/* Button */}
            <Link to="/Trading">
            
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 h-10 rounded-md has-[>svg]:px-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-16 py-4 text-2xl font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-gift w-8 h-8 mr-4"
                aria-hidden="true"
              >
                <rect x="3" y="8" width="18" height="4" rx="1"></rect>
                <path d="M12 8v13"></path>
                <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
                <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
              </svg>
              Start Trading
            </button>
            </Link>
          </div>
        </div>

        {/* Footer Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === 9
                  ? "bg-gradient-to-r from-blue-500 to-green-500 scale-125"
                  : "bg-green-500"
              }`}
            ></div>
          ))}
        </div>

      </div>
    </div>
  );
}
