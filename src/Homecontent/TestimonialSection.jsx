import React from 'react';
import { ShieldCheck, Headset, HandCoins, UserRoundCog } from 'lucide-react';

// --- CSS Animation for Scrolling Text ---
const scrollingTextStyles = `
  @keyframes scrollText {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  .animate-scroll-text {
    animation: scrollText 20s linear infinite;
  }
`;

// --- Feature Data ---
const features = [
  {
    id: 1,
    title: "Friendly & Expert",
    description: "Duty or the obligation that business it will frequently occurs pleasure to be repudiated.",
    icon: UserRoundCog,
    position: 'left',
    verticalPosition: 'top'
  },
  {
    id: 2,
    title: "Regulated & Secure",
    description: "Frequently occur that pleasures have to be repudiated accepted always holds.",
    icon: ShieldCheck,
    position: 'right',
    verticalPosition: 'top'
  },
  {
    id: 3,
    title: "No Hidden Fees",
    description: "Right to find fault with a man who chooses to enjoy a pleasure that annoying consequence.",
    icon: HandCoins,
    position: 'left',
    verticalPosition: 'bottom'
  },
  {
    id: 4,
    title: "24/7 Support",
    description: "Great pleasure. To take a trivial example, which of us ever undertakes laborious.",
    icon: Headset,
    position: 'right',
    verticalPosition: 'bottom'
  },
];

// --- Feature Card Component ---
const FeatureCard = ({ title, description, icon: Icon, position }) => {
  const isRight = position === 'right';
  
  return (
    <div className={`relative ${isRight ? 'text-left pl-4 sm:pl-6 md:pl-8' : 'text-right pr-4 sm:pr-6 md:pr-8'}`}>
      {/* Curved Line Image - Positioned absolutely */}
      <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 ${isRight ? 'right-full mr-0' : 'left-full ml-0'} w-24 xl:w-32 h-20 xl:h-24 pointer-events-none`}>
        <svg viewBox="0 0 120 80" className="w-full h-full">
          {isRight ? (
            // Right side - curve from left to right
            <path 
              d="M 0 40 Q 60 10, 120 40" 
              fill="none" 
              stroke="#d1d5db" 
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          ) : (
            // Left side - curve from right to left
            <path 
              d="M 120 40 Q 60 10, 0 40" 
              fill="none" 
              stroke="#d1d5db" 
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )}
        </svg>
      </div>

      {/* Content */}
      <div className={`flex items-start gap-3 sm:gap-4 ${isRight ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Text Content */}
        
   

        {/* Icon Box with Chevrons */}
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg">
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          
          {/* Decorative Chevrons */}
          <div className={`absolute ${isRight ? 'right-full mr-2 sm:mr-3' : 'left-full ml-2 sm:ml-3'} top-1/2 -translate-y-1/2 flex flex-col gap-0.5 sm:gap-1`}>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 border-t-2 ${isRight ? 'border-l-2' : 'border-r-2'} border-green-400 ${isRight ? '-rotate-45' : 'rotate-45'}`}></div>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 border-t-2 ${isRight ? 'border-l-2' : 'border-r-2'} border-green-400 ${isRight ? '-rotate-45' : 'rotate-45'}`}></div>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 border-t-2 ${isRight ? 'border-l-2' : 'border-r-2'} border-green-400 ${isRight ? '-rotate-45' : 'rotate-45'}`}></div>
          </div>
        </div>

             <div className="flex-1">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">{title}</h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Connector Green Dot */}
      <div className={`hidden lg:block absolute ${isRight ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'} top-1/2 -translate-y-1/2 w-3 h-3 xl:w-4 xl:h-4 bg-green-400 rounded-full shadow-lg border-2 border-white`}></div>
    </div>
  );
};

// --- Main Section Component ---
const TestimonialSection = () => {
  const topLeftFeature = features.find(f => f.position === 'left' && f.verticalPosition === 'top');
  const topRightFeature = features.find(f => f.position === 'right' && f.verticalPosition === 'top');
  const bottomLeftFeature = features.find(f => f.position === 'left' && f.verticalPosition === 'bottom');
  const bottomRightFeature = features.find(f => f.position === 'right' && f.verticalPosition === 'bottom');

  return (
    <>
      <style>{scrollingTextStyles}</style>
      <div className="relative min-h-screen bg-gray-50 overflow-hidden py-12 md:py-16 lg:py-20 px-4 sm:px-6">
        {/* Background Scrolling Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="w-[95vw] sm:w-[90vw] md:w-[85vw] max-w-[1400px] overflow-hidden">
            <div className="flex whitespace-nowrap animate-scroll-text mt-12 sm:mt-16 md:mt-20">
              <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black text-gray-200 tracking-wider mx-4 sm:mx-6 md:mx-8">TRADEPRO</span>
              <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black text-gray-200 tracking-wider mx-4 sm:mx-6 md:mx-8">TRADEPRO</span>
              <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black text-gray-200 tracking-wider mx-4 sm:mx-6 md:mx-8">TRADEPRO</span>
              <span className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black text-gray-200 tracking-wider mx-4 sm:mx-6 md:mx-8">TRADEPRO</span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <div className="inline-block px-4 sm:px-6 py-2 bg-green-400 rounded-full text-xs font-bold text-gray-900 mb-4 sm:mb-6 tracking-wide">
              WHY CHOOSE US
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4 px-4">
              The Top Choice For Traders
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm px-4">
              Discover the most competitive prices in the market, updated<br className="hidden sm:block"/> regularly for your advantage.
            </p>
          </div>

          {/* Main Grid - Phone Centered with Features Around */}
          <div className="relative flex justify-center mb-12 lg:mb-0">
            {/* Center Phone Column */}
            <div className="flex justify-center relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-green-300 rounded-full blur-3xl opacity-20"></div>
              </div>

              {/* Phone Frame */}
              <div className="relative w-64 h-[520px] sm:w-72 sm:h-[580px] md:w-80 md:h-[620px] bg-gray-900 rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden border-[10px] sm:border-[12px] md:border-[14px] border-gray-900">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-36 md:w-40 h-5 sm:h-6 md:h-7 bg-gray-900 rounded-b-3xl z-10"></div>
                
                {/* Screen Content */}
                <div className="w-full h-full bg-white p-5 pt-9 sm:p-6 sm:pt-10 md:p-8 md:pt-12">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 sm:mb-7 md:mb-8">
                    <div className="space-y-1 sm:space-y-1.5">
                      <div className="w-5 sm:w-6 md:w-7 h-0.5 bg-gray-800 rounded"></div>
                      <div className="w-5 sm:w-6 md:w-7 h-0.5 bg-gray-800 rounded"></div>
                      <div className="w-5 sm:w-6 md:w-7 h-0.5 bg-gray-800 rounded"></div>
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-green-400 rounded-full flex items-center justify-center shadow-md">
                      <UserRoundCog className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 tracking-wide">SUMMARIES</h2>

                  {/* Tabs */}
                  <div className="flex gap-4 sm:gap-5 md:gap-6 mb-7 sm:mb-8 md:mb-10 text-xs sm:text-sm">
                    <span className="text-gray-900 font-semibold">Lorem</span>
                    <span className="text-gray-300">Ipsum</span>
                    <span className="text-gray-300">Dolor</span>
                  </div>

                  {/* Circular Progress */}
                  <div className="flex justify-center mb-7 sm:mb-8 md:mb-10">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="50%" cy="50%" r="42%" fill="none" stroke="#f3f4f6" strokeWidth="12"/>
                        <circle cx="50%" cy="50%" r="42%" fill="none" stroke="#4ade80" strokeWidth="12" strokeDasharray="471" strokeDashoffset="130" strokeLinecap="round"/>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">72<span className="text-xl sm:text-2xl">%</span></span>
                        <span className="text-[0.6rem] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 text-center leading-tight px-2">Lorem Ipsum<br/>dolor sit.</span>
                      </div>
                      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 bg-green-400 rounded-full shadow-md"></div>
                    </div>
                  </div>

                  {/* Stats List */}
                  <div className="space-y-3 sm:space-y-4 md:space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">Lorem Ipsum</p>
                        <p className="text-[0.6rem] sm:text-xs text-gray-400">dolor sit amet</p>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                        <svg className="w-10 h-5 sm:w-12 sm:h-6 md:w-14 md:h-7">
                          <polyline points="0,18 18,8 36,14 54,4" fill="none" stroke="#10b981" strokeWidth="2"/>
                        </svg>
                        <span className="text-[0.6rem] sm:text-xs text-green-500">↑12.21</span>
                        <span className="text-sm sm:text-base font-bold text-gray-900">$6,942</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">Lorem Ipsum</p>
                        <p className="text-[0.6rem] sm:text-xs text-gray-400">dolor sit amet</p>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                        <svg className="w-10 h-5 sm:w-12 sm:h-6 md:w-14 md:h-7">
                          <polyline points="0,4 18,10 36,7 54,18" fill="none" stroke="#ef4444" strokeWidth="2"/>
                        </svg>
                        <span className="text-[0.6rem] sm:text-xs text-red-500">↓12.21</span>
                        <span className="text-sm sm:text-base font-bold text-gray-900">$8,152</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Left Feature */}
            <div className="hidden lg:block absolute left-0 top-8 xl:top-12 w-72 xl:w-80">
              <FeatureCard {...topLeftFeature} />
            </div>

            {/* Top Right Feature */}
            <div className="hidden lg:block absolute right-0 top-8 xl:top-12 w-72 xl:w-80">
              <FeatureCard {...topRightFeature} />
            </div>

            {/* Bottom Left Feature */}
            <div className="hidden lg:block absolute left-0 bottom-8 xl:bottom-12 w-72 xl:w-80">
              <FeatureCard {...bottomLeftFeature} />
            </div>

            {/* Bottom Right Feature */}
            <div className="hidden lg:block absolute right-0 bottom-8 xl:bottom-12 w-72 xl:w-80">
              <FeatureCard {...bottomRightFeature} />
            </div>
          </div>

          {/* Mobile View - Stacked */}
          <div className="lg:hidden mt-8 sm:mt-10 md:mt-12 space-y-6 sm:space-y-8">
            {features.map((feature) => (
              <div key={feature.id} className="max-w-sm mx-auto">
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 rounded-full flex items-center justify-center shadow-xl hover:bg-gray-800 transition-all hover:scale-110 z-50"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default TestimonialSection;