import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectCreative } from 'swiper/modules';
import { ArrowRight, Play, Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import screen from "../assets/screen.png"

const Herosection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      title: "Secure\ninvesting for\nevery trader",
      desc: "Invest confidently with advanced security measures tailored to protect your trades.",
      image: "https://plus.unsplash.com/premium_photo-1664476845274-27c2dabdd7f0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Master the\nmarkets with\nconfidence.",
      desc: "Professional-grade analytics and real-time data to power your trading decisions.",
      image: "https://plus.unsplash.com/premium_photo-1661371627612-e48be62ce587?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Trade smarter,\nnot harder.",
      desc: "Automated tools and intelligent insights that work for you around the clock.",
      image: "https://plus.unsplash.com/premium_photo-1670249419881-b115ba63924a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    // Section Container
    <section className="relative w-full min-h-screen lg:h-screen bg-[#000213] overflow-x-hidden flex flex-col lg:flex-row font-sans">
      
      <style>{`
        .grid-pattern {
          background-image: radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        @keyframes slideDownFade {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slideDownFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .swiper-slide-active .slide-image {
          transform: scale(1.1);
          transition: transform 8s ease-out;
        }
        .slide-image {
          transform: scale(1);
          transition: transform 1s;
        }
      `}</style>

      {/* =========================================================
          1. LEFT SIDEBAR (CARDS)
          Background: Darkest Blue matching the theme
      ========================================================== */}
      <div className="relative z-30 w-full lg:w-[400px] h-auto lg:h-full  bg-gradient-to-r from-[#000213] via-[#041379]/90 to-[#041379]/40 flex flex-col justify-center px-6 py-12 lg:px-12 border-b lg:border-b-0 lg:border-r border-white/5 shrink-0">
        
        {/* Free Demo Card */}
        <div className="bg-[#50fa7b] h-[400px] rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden grid-pattern mb-6 max-w-sm mx-auto lg:mx-0 w-full">
          <h3 className="text-xl font-bold text-[#020617] mb-1">Free Demo</h3>
          <p className="text-[#020617]/70 text-xs font-semibold mb-6">Practice trading with virtual funds.</p>
          
          {/* CSS Phone Mockup */}
          <div className="bg-[#020617] rounded-[2rem] p-2 mx-auto w-48 shadow-2xl relative z-10 border-4 border-[#020617]">
            <img src={screen} alt="" />
             {/* Screen */}
             {/* <div className="bg-[#0f172a] rounded-[1.5rem] p-3 pt-6 h-32 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#020617] rounded-b-xl"></div>
                
                <div className="flex justify-between items-center px-1">
                   <div className="space-y-1">
                      <div className="w-8 h-1 bg-gray-600 rounded"></div>
                      <div className="w-5 h-1 bg-gray-600 rounded"></div>
                   </div>
                   <div className="w-6 h-6 rounded-full bg-[#50fa7b] border-2 border-white"></div>
                </div>

                <div className="text-left px-1">
                   <p className="text-[8px] text-gray-400">Balance</p>
                   <p className="text-white text-xl font-bold tracking-tight">$69,420</p>
                </div>
             </div> */}
          </div>

          {/* Button inside Green Card */}
          <button className="w-full mt-6 bg-transparent border border-black text-black text-xl  font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all">
            Start Demo <span className="text-[10px]">►</span>
          </button>
        </div>

        {/* Rating Card */}
{/* Rating Card (Matches Screenshot EXACTLY) */}
        <div className="bg-[#020617] border border-white/10 rounded-2xl shadow-xl max-w-sm mx-auto lg:mx-0 w-full overflow-hidden">
          
          {/* Top Section with Vertical Divider */}
          <div className="flex items-center p-6">
            {/* Score */}
            <div className="text-5xl font-bold text-white tracking-tighter pr-6 border-r border-white/10">
              4.9
            </div>
            
            {/* Stars & Text */}
            <div className="pl-6 flex flex-col gap-1.5">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#50fa7b] text-[#50fa7b]" />
                ))}
              </div>
              <p className="text-gray-400 text-xs font-medium">2.8k Verified Reviews</p>
            </div>
          </div>

          {/* Bottom Button with Top Divider */}
          <button className="w-full bg-[#0a1020] hover:bg-[#0f172a] border-t border-white/10 py-4 flex items-center justify-center gap-2 text-white text-sm font-bold transition-all group">
            Read Reviews <Play size={10} className="fill-white group-hover:fill-[#50fa7b] group-hover:text-[#50fa7b] transition-colors" />
          </button>
        </div>


      </div>

      {/* =========================================================
          2. RIGHT SIDE (SLIDER)
          Overlays updated to match Screenshot (Blue Gradient)
      ========================================================== */}
      <div className="relative w-full h-[600px] lg:h-full lg:flex-1 overflow-hidden z-10 block">
        
        {/* Slider Background */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Swiper
            modules={[Autoplay, Navigation, EffectCreative]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            speed={1500}
            effect={'creative'}
            creativeEffect={{
              prev: { shadow: true, translate: ['-20%', 0, -1] },
              next: { translate: ['100%', 0, 0] },
            }}
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full h-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="w-full h-full">
                <div className="w-full h-full relative">
                  <img
                    src={slide.image}
                    alt={`Slide ${index}`}
                    className="w-full h-full object-cover slide-image absolute top-0 left-0"
                  />
                  
                  {/* === UPDATED GRADIENT OVERLAYS (MATCHING SCREENSHOT) === */}
                  
                  {/* 1. Dark Blue Left-to-Right Gradient (Merges with Sidebar) */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#000213]/60 via-[#041379]/90 to-[#041379]/50 mix-blend-multiply"></div>
                  
                  {/* 2. Solid Gradient for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#000213] via-[#041379]/80 to-transparent"></div>
                  
                  {/* 3. Bottom Fade for Feature Boxes */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000213] via-transparent to-transparent opacity-90"></div>
                  
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-12 lg:px-24 pointer-events-none pb-20 lg:pb-0"> 
          <div key={activeIndex} className="space-y-6 max-w-3xl pointer-events-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] whitespace-pre-line animate-slide-down opacity-0" style={{ animationDelay: '0.1s' }}>
              {slides[activeIndex].title}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-xl animate-slide-down opacity-0" style={{ animationDelay: '0.3s' }}>
              {slides[activeIndex].desc}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 animate-slide-down opacity-0" style={{ animationDelay: '0.5s' }}>
              <button className="bg-[#50fa7b] hover:bg-[#4ade80] text-[#020617] font-bold py-3.5 sm:py-4 px-8 rounded-full flex items-center gap-2 hover:scale-105 transition-all text-sm sm:text-base shadow-[0_0_20px_rgba(80,250,123,0.3)]">
                Explore Markets <span className="text-xs">►</span>
              </button>

              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="relative w-12 h-12 flex items-center justify-center">
                   {/* Play Button Ring */}
                   <div className="absolute inset-0 border-2 border-white/30 rounded-full group-hover:border-[#50fa7b] transition-colors"></div>
                   <Play size={20} className="fill-white text-white group-hover:fill-[#50fa7b] group-hover:text-[#50fa7b] transition-colors ml-1" />
                </div>
                <div className="text-white">
                  <p className="font-bold text-sm">Master Trading</p>
                  <p className="text-xs text-white/60">in Minutes...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
          <button className="swiper-prev bg-white/5 backdrop-blur-md border border-white/10 w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-all duration-300 group">
            <ArrowRight className="w-5 h-5 -rotate-90" />
          </button>
          <button className="swiper-next bg-white/5 backdrop-blur-md border border-white/10 w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-all duration-300 group">
            <ArrowRight className="w-5 h-5 rotate-90" />
          </button>
        </div>
      </div>

      {/* =========================================================
          3. BOTTOM FEATURE BOXES
          Order: 3 (Sabse neeche)
          Mobile: Block, Desktop: Absolute
      ========================================================== */}
<div className="relative lg:absolute bottom-0 w-full z-40 bg-[#000213] lg:bg-[#000213]/90 lg:backdrop-blur-lg border-t border-white/10">
  <div className="container mx-auto px-4 md:px-8 py-2">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
      {[
        { text: "Up to $500 Bonus on First Deposit!", highlight: "$500 Bonus" },
        { text: "Stay Informed, Subscribe Now!", highlight: "Subscribe" },
        { text: "Trading with a Free Demo Account!", highlight: "Free Demo" },
        { text: "Download our Free eBooks", highlight: "eBooks" }
      ].map((feature, index) => (
        <div
          key={index}
          className="p-3 sm:p-4 lg:p-6 flex items-start sm:items-center gap-3 hover:bg-white/5 transition-colors cursor-pointer group"
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#50fa7b] flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
             {/* Check Icon Style from Screenshot */}
             <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
             </svg>
          </div>
          <p className="text-white text-xs sm:text-sm font-medium leading-snug text-left flex-1">
            {feature.text.split(feature.highlight).map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="font-extrabold text-white">{feature.highlight}</span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>

    </section>
  );
};

export default Herosection;