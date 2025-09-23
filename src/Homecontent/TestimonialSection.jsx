import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, TrendingUp, Users, DollarSign } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Lisa Wang",
    country: "Canada",
    uid: "8472639",
    rating: 5,
    date: "March 5, 2025",
    profit: "+$2,890",
    review: "Zero deposit fees and lightning-fast withdrawals. The platform is user-friendly and perfect for both beginners and pros.",
    initials: "LW",
  },
  {
    id: 2,
    name: "John Doe",
    country: "USA",
    uid: "9283746",
    rating: 4,
    date: "Feb 18, 2025",
    profit: "+$1,520",
    review: "Trading on this platform is smooth and reliable. Highly recommended!",
    initials: "JD",
  },
  {
    id: 3,
    name: "Maria Lopez",
    country: "Spain",
    uid: "3847562",
    rating: 5,
    date: "Jan 12, 2025",
    profit: "+$3,400",
    review: "Excellent platform for both beginners and pros. Withdrawals are super fast.",
    initials: "ML",
  },


    {
    id: 4,
    name: "Lisa Wang",
    country: "Canada",
    uid: "8472639",
    rating: 5,
    date: "March 5, 2025",
    profit: "+$2,890",
    review: "Zero deposit fees and lightning-fast withdrawals. The platform is user-friendly and perfect for both beginners and pros.",
    initials: "LW",
  },
  {
    id: 5,
    name: "John Doe",
    country: "USA",
    uid: "9283746",
    rating: 4,
    date: "Feb 18, 2025",
    profit: "+$1,520",
    review: "Trading on this platform is smooth and reliable. Highly recommended!",
    initials: "JD",
  },
  {
    id: 6,
    name: "Maria Lopez",
    country: "Spain",
    uid: "3847562",
    rating: 5,
    date: "Jan 12, 2025",
    profit: "+$3,400",
    review: "Excellent platform for both beginners and pros. Withdrawals are super fast.",
    initials: "ML",
  },
];

const stats = [
  {
    icon: <Users className="w-8 h-8 text-white" />,
    value: "50,000+",
    label: "Active Traders",
    gradient: "from-blue-400 to-indigo-400",
    bgGradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-white" />,
    value: "$50M+",
    label: "Withdrawn",
    gradient: "from-green-400 to-emerald-400",
    bgGradient: "from-green-500 to-emerald-600",
  },
  {
    icon: <Star className="w-8 h-8 text-white" />,
    value: "4.5★",
    label: "Average Rating",
    gradient: "from-yellow-400 to-orange-400",
    bgGradient: "from-yellow-500 to-orange-600",
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (



    
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M0%2040h80v1H0zM40%200v80h1V0z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold  mb-6 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
            What Our Traders Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of successful traders worldwide who trust Trade Pro
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative mb-16">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
              <div className="flex items-center space-x-6">
                <div className="relative w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-xl">{testimonials[current].initials}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-50 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{testimonials[current].name}</h3>
                  <p className="text-gray-400 font-medium">{testimonials[current].country}</p>
                  <p className="text-xs text-gray-500">UID: {testimonials[current].uid}</p>
                </div>
              </div>
              <div className="text-left md:text-right">
                <div className="flex items-center space-x-1 mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonials[current].rating ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-400 mb-2">{testimonials[current].date}</p>
                <div className="inline-flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-green-500/30">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xl font-bold text-green-400">{testimonials[current].profit}</span>
                </div>
              </div>
            </div>
            <blockquote className="text-xl text-gray-200 leading-relaxed mb-6 font-medium">
              "{testimonials[current].review}"
            </blockquote>
            <div className="w-full bg-gray-700 rounded-full h-1 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 h-1 rounded-full transition-all duration-6000" style={{ width: "100%" }}></div>
            </div>

            {/* Carousel controls */}
            <div className="flex justify-center items-center space-x-6 mt-8">
              <button onClick={prevTestimonial} className="w-12 h-12 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center justify-center">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex space-x-3">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${current === idx ? "bg-gradient-to-r from-blue-500 to-green-500 scale-125" : "bg-gray-600 hover:bg-gray-500"}`}
                  ></button>
                ))}
              </div>
              <button onClick={nextTestimonial} className="w-12 h-12 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
              <div className={`w-16 h-16 ${stat.bgGradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
                {stat.icon}
              </div>
              <div className={`text-3xl font-bold  mb-2 bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient}`}>
                {stat.value}
              </div>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
