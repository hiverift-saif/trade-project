import React from "react";
import { ArrowRight, Target, CheckCircle2 } from "lucide-react";
// Image path check kar lena
import leave from "../assets/leave.png";
import men from "../assets/men.png";

const WhyChooseTradePro = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-visible font-sans mb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
          {/* =========================================================
              LEFT SIDE - IMAGE & FLOATING CARDS (Responsive Fix)
          ========================================================== */}
          <div className="w-full lg:w-[45%] relative mt-8 lg:mt-0 flex flex-col lg:block">
            {/* 1. Main Image */}
            <div className="relative z-10 w-full md:w-[80%] mx-auto lg:mr-auto lg:ml-0 group overflow-hidden rounded-2xl">
              <img
                src={men}
                alt="About Trading"
                className="rounded-2xl shadow-xl w-full h-[300px] sm:h-[380px] object-cover 
           transition-transform duration-500 group-hover:scale-105"
              />

              {/* Green Gradient Bottom on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-500/70 via-green-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* 2. AWARD CARD (Mobile: Stacked Below, Desktop: Absolute Bottom-Right) */}
            {/* 2. AWARD CARD (Mobile: Stacked Below, Desktop: Absolute Bottom-Right) */}
            <div
              className="
    relative lg:absolute 
    mt-6 lg:mt-0 
    mx-auto lg:mx-0
    bottom-auto lg:bottom-[-180px] 
    right-auto lg:-right-12 
    z-30 
    w-[260px] sm:w-[280px] min-h-[320px] sm:min-h-[350px]
    bg-white rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] 
    overflow-hidden text-center border border-gray-100 
    flex flex-col justify-between
"
            >
              {/* White Body */}
              <div className="p-5 sm:p-7 pb-4 sm:pb-5 flex-grow flex flex-col justify-center items-center">
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="relative w-24 sm:w-28">
                    <img src={leave} alt="Wreath" className="w-full h-auto" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 leading-none">
                      <span className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-gray-800">
                        Top
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-gray-800">
                        Trading
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-gray-800">
                        Broker
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-blue-600 mt-1">
                        2023
                      </span>
                    </div>
                  </div>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#051509] leading-tight font-heading mt-2">
                  Top Trading <br /> Platform - Year '23.
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-400 mt-2 sm:mt-3 font-medium">
                  By ADVFN International.
                </p>
              </div>

              {/* Black Footer */}
              <div className="bg-[#000420] py-4 sm:py-5 px-4 w-full">
                <h5 className="text-white text-[13px] sm:text-sm font-bold font-heading leading-snug">
                  Trade with award <br /> winning broker
                </h5>
              </div>
            </div>

            {/* 3. 24 YEARS BADGE (Mobile: Stacked Below, Desktop: Absolute Bottom-Left) */}
            <div
              className="
    relative lg:absolute 
    mt-6 sm:mt-8 lg:mt-0 
    mx-auto lg:mx-0
    bottom-auto lg:bottom-[-40px] 
    left-auto lg:-left-12 
    z-30
    flex justify-center lg:block
    px-4 lg:px-0
"
            >
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center shadow-2xl">
                {/* Rotating Text Ring */}
                <div className="absolute inset-0 animate-[spin_15s_linear_infinite]">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path
                      id="textPath"
                      d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                      fill="none"
                    />
                    <text className="font-bold font-heading uppercase text-[5px] sm:text-[5.5px] fill-[#051509] tracking-[0.16em]">
                      <textPath href="#textPath" startOffset="0%">
                        YEARS OF TRADING EXPERIENCE • EXPERTISE BUILT ON
                        EXPERIENCE •
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* Inner Content */}
                <div className="relative z-10 bg-white w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center border-[3px] sm:border-4 border-[#50fa7b] shadow-inner">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#051509] font-heading leading-none">
                    24
                  </span>
                  <span className="text-[7px] sm:text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-tight mt-0.5 sm:mt-1">
                    Years Exp.
                  </span>
                </div>
              </div>
            </div>

            {/* 3. 24 YEARS BADGE (Mobile: Stacked Below, Desktop: Absolute Bottom-Left) */}
            <div
              className="
                relative lg:absolute 
                mt-8 lg:mt-0 
                mx-auto lg:mx-0
                bottom-auto lg:bottom-[-40px] 
                left-auto lg:-left-12 
                z-30
                flex justify-center lg:block
            "
            >
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 bg-white rounded-full flex items-center justify-center shadow-2xl">
                {/* Rotating Text Ring */}
                <div className="absolute inset-0 animate-[spin_15s_linear_infinite]">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path
                      id="textPath"
                      d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                      fill="none"
                    />
                    <text className="font-bold font-heading uppercase text-[5.5px] fill-[#051509] tracking-[0.16em]">
                      <textPath href="#textPath" startOffset="0%">
                        YEARS OF TRADING EXPERIENCE • EXPERTISE BUILT ON
                        EXPERIENCE •
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* Inner Content */}
                <div className="relative z-10 bg-white w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center border-4 border-[#50fa7b] shadow-inner">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#051509] font-heading leading-none">
                    24
                  </span>
                  <span className="text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-tight mt-1">
                    Years Exp.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT SIDE - CONTENT
          ========================================================== */}
          <div className="w-full lg:w-[55%] space-y-6 pl-0 lg:pl-10 mt-8 lg:mt-0">
            {/* Tag */}
            <div>
              <span className="bg-[#50fa7b] text-[#051509] px-5 py-2 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
                About Trade Pro
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-[46px] font-bold font-heading text-[#051509] leading-tight">
              Trusted Partner <br className="hidden sm:block" />
              In Achieving Trading <br className="hidden sm:block" />
              Success Globally
            </h2>

            {/* Paragraph */}
            <p className="text-gray-500 text-base sm:text-[17px] leading-relaxed font-medium">
              Give you a completed account of the system, and expounds the
              teaching of the great explorer the truth the master-builder human
              do not know how to pursue pleasure rationally.
            </p>

            {/* "The Goal" Section */}
            <div className="pt-2">
              <h4 className="text-xl font-bold font-heading text-[#051509]">
                The Goal
              </h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                PURPOSE DRIVEN AND GOAL ORIENTED
              </p>
              <div className="h-[1px] w-full bg-gray-200 my-5"></div>
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 bg-[#f0fdf4] rounded-xl flex items-center justify-center border border-green-100">
                  <div className="relative">
                    <Target
                      size={28}
                      className="text-[#051509]"
                      strokeWidth={1.5}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#50fa7b] rounded-full p-0.5 border border-white">
                      <CheckCircle2 size={10} className="text-black" />
                    </div>
                  </div>
                </div>
                <p className="text-sm sm:text-[15px] text-gray-500 leading-relaxed pt-1">
                  Expound the actual teaching of the great of the master-builder
                  human do not know how pursues business it will frequently.
                </p>
              </div>
            </div>

            {/* Read More Button */}
            <div className="pt-2">
              <a
                href="/about"
                className="inline-flex items-center gap-2 text-[#051509] font-bold text-sm hover:text-[#50fa7b] transition-colors group"
              >
                Read More
                <span className="text-[10px] transform group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={14} strokeWidth={3} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseTradePro;
