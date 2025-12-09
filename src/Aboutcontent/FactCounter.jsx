import React from 'react';
import { CalendarDays, Activity, Users, FileBadge } from 'lucide-react';

const bgImageUrl = "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const FactCounterStyle2 = () => {
  
  const facts = [
    {
      id: 1,
      number: "1.4",
      suffix: "m+",
      description: "Trades Executed \nDaily",
      category: "Trades",
      icon: CalendarDays,
    },
    {
      id: 2,
      number: "30",
      suffix: "+",
      description: "Variety of Trading \nOptions.",
      category: "Instruments",
      icon: Activity,
    },
    {
      id: 3,
      number: "2.5",
      suffix: "m+",
      description: "Active Traders in \nCommunity",
      category: "Trades", // स्क्रीनशॉट में यहाँ भी 'Trades' लिखा है, अगर 'Community' चाहिए तो बदल लें।
      icon: Users,
    },
    {
      id: 4,
      number: "10",
      suffix: "+",
      description: "Industry Awards \nWon",
      category: "Recognition",
      icon: FileBadge,
    }
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-[#000C24] overflow-hidden flex items-center justify-center">
      
      {/* 1. Background Image with Dark Overlay */}
      {/* यह पीछे का डार्क ब्लू बैकग्राउंड और चार्ट पैटर्न बनाएगा */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImageUrl}
          alt="Trading Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        {/* गहरा नीला ओवरले ताकि इमेज बहुत ब्राइट न दिखे */}
        <div className="absolute inset-0 bg-[#000C24]/90"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Grid Layout for 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          
          {facts.map((item) => (
            // === WHITE CARD START ===
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:-translate-y-2">
              
              {/* Top Section: Number and Description */}
              <div className="p-6 lg:p-8 pb-4">
                <h2 className="text-[42px] lg:text-[50px] font-bold text-gray-900 leading-none flex items-start font-sans">
                  {item.number}
                  {/* Green Suffix (m+, +) */}
                  <span className=" text-3xl  lg:text-5xl ml-0.5 mt-1 font-semibold">{item.suffix}</span>
                </h2>
                <p className="text-gray-500 text-sm lg:text-xl mt-3 font-medium leading-snug whitespace-pre-line">
                  {item.description}
                </p>
              </div>

              {/* Bottom Section: Gray Footer with Chart Shape */}
              <div className="relative bg-gray-50 h-[80px] lg:h-[90px] mt-auto">
                
                {/* SVG Shape Pattern (वह सफ़ेद रंग का चार्ट जैसा डिज़ाइन) */}
                <div className="absolute bottom-0 left-0 right-0 h-full w-full overflow-hidden z-0">
                     <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full text-white fill-current opacity-100">
                        <path d="M0,150 L0,40 L130,100 L250,60 L380,120 L500,20 L500,150 Z" ></path>
                    </svg>
                </div>

                {/* Footer Content (Icon and Category Name) */}
                <div className="relative z-10 h-full flex items-center justify-between px-6 lg:px-8">
                    {/* Green Icon */}
                    <div className="text-[#00D094]">
                        <item.icon size={28} strokeWidth={2} />
                    </div>
                    {/* Bold Category Text */}
                    <h3 className="text-gray-900 text-lg md:text-xl font-bold tracking-tight">{item.category}</h3>
                </div>
              </div>

            </div>
            // === WHITE CARD END ===
          ))}

        </div>
      </div>
    </section>
  );
};

export default FactCounterStyle2;