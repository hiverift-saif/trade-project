import React, { useState, useEffect } from 'react';
import { Trophy, ArrowLeft, ArrowRight } from 'lucide-react';
import leave from "../assets/leave.png";

const AwardsSec = () => {
  // 1. Data Array (ज्यादा आइटम्स डाले हैं ताकि स्लाइड हो सके)
  const awards = [
    {
      id: 1,
      title: "Global Forex \nBroker of the Year",
      organization: "Global Forex Awards",
      date: "Mar, 2021"
    },
    {
      id: 2,
      title: "Most Transparent \nFX Broker",
      organization: "The Forex Expo USA",
      date: "Dec, 2018"
    },
    {
      id: 3,
      title: "Best Forex Rewards \nProgram",
      organization: "Global Forex Awards",
      date: "Jun, 2016"
    },
    {
      id: 4,
      title: "Best Customer \nService 2022",
      organization: "World Finance Awards",
      date: "Aug, 2022"
    },
    {
      id: 5,
      title: "Fastest Growing \nBroker Asia",
      organization: "International Business",
      date: "Jan, 2020"
    },
    {
      id: 6,
      title: "Best Trading \nPlatform Mobile",
      organization: "Tech Finance Expo",
      date: "Nov, 2019"
    }
  ];

  // 2. State Management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // 3. Responsive Logic (Screen Size के हिसाब से कार्ड्स सेट करना)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2); // Tablet
      } else {
        setItemsToShow(3); // Desktop
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 4. Navigation Functions
  const nextSlide = () => {
    // अगर हम अंत में हैं, तो वापस शुरू पर जाएँ (Loop)
    if (currentIndex >= awards.length - itemsToShow) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      // अगर शुरू में हैं, तो अंत पर जाएँ
      setCurrentIndex(awards.length - itemsToShow);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden font-sans">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* === Header === */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-[#66FF99] text-[#000C24] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
            Awards & Honors
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#000C24] mb-6 leading-tight">
            Proud Moments Of Achievement
          </h2>
          <p className="text-gray-500 text-lg">
            Discover the most competitive prices in the market, updated <br className="hidden md:block"/>
            regularly for your advantage.
          </p>
        </div>

        {/* === SLIDER CONTAINER === */}
        <div className="relative overflow-hidden">
          
          {/* Track that moves */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
          >
     {/* ... Baaki code same rahega ... */}

{awards.map((item) => (
  <div
    key={item.id}
    className="flex-shrink-0 px-4"
    style={{ width: `${100 / itemsToShow}%` }}
  >
    {/* Card Container: Added 'overflow-hidden' to clip the image nicely */}
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-8 lg:p-10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 h-full overflow-hidden">
      
      {/* Background Laurel Decoration (Updated Position) */}
      <div className="absolute top-0 right-0 h-full w-1/2 pointer-events-none">
        <img 
            src={leave} 
            alt="" 
            // Removed bg-red-700, added object-cover and positioning
            className="w-full h-full object-contain object-right opacity-100 group-hover:opacity-200 transition-opacity "
        />
      </div>

      {/* Icon */}
      <div className="mb-6 inline-block relative z-10">
        <div className="relative">
          <Trophy size={48} className="text-[#000C24] stroke-[1.5]" />
          <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[#00D094]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-[#000C24] mb-6 leading-snug whitespace-pre-line group-hover:text-[#00D094] transition-colors relative z-10">
        {item.title}
      </h3>

      {/* Divider */}
      <div className="w-full h-px bg-gray-100 mb-6 group-hover:bg-gray-200 transition-colors relative z-10"></div>

      {/* Footer */}
      <div className="text-gray-500 font-medium leading-relaxed relative z-10">
        <p>{item.organization}</p>
        <p>{item.date}</p>
      </div>

    </div>
  </div>
))}

{/* ... Baaki code same rahega ... */}
          </div>
        </div>

        {/* === Navigation Buttons === */}
        <div className="flex justify-center items-center gap-4 mt-16">
          <button 
            onClick={prevSlide}
            className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#000C24] hover:bg-[#000C24] hover:text-white transition-all duration-300"
          >
            <ArrowLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="w-14 h-14 rounded-full border border-[#000C24] bg-[#000C24] flex items-center justify-center text-white shadow-lg hover:bg-gray-900 transition-all duration-300"
          >
            <ArrowRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default AwardsSec;