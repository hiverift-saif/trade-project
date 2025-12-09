import React from 'react';
import { MoveRight, Play } from 'lucide-react';
import partners from "../assets/partners.png"; // Ensure this path is correct

const PartnerSec = () => {
  // Partner Logos Data (Using the original links provided)
  const partnersList = [
    { name: "Brand 1", logo: "https://tradebro-react-next-js-template.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrand%2Fbrand-1-1.png&w=384&q=75" },
    { name: "Brand 2", logo: "https://tradebro-react-next-js-template.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrand%2Fbrand-1-2.png&w=384&q=75" },
    { name: "Brand 3", logo: "https://tradebro-react-next-js-template.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrand%2Fbrand-1-3.png&w=384&q=75" },
    { name: "Brand 4", logo: "https://tradebro-react-next-js-template.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrand%2Fbrand-1-4.png&w=384&q=75" },
    { name: "Brand 5", logo: "https://tradebro-react-next-js-template.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrand%2Fbrand-1-5.png&w=384&q=75" },
    { name: "Brand 6", logo: "https://tradebro-react-next-js-template.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrand%2Fbrand-1-6.png&w=384&q=75" },
  ];

  return (
    <section className="py-20 mt-20 lg:py-28 bg-[#F5FBF8] overflow-visible font-sans ">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* === Header Section === */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#50fa7b] text-[#051509] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Our Partners
            </span>
            <h2 className="text-4xl lg:text-[46px] font-bold text-[#000C24] font-heading leading-tight">
              Partnering With Industry Leaders
            </h2>
          </div>
          
          <div className="shrink-0">
            <a href="/partners" className="group inline-flex items-center gap-2 text-[#000C24] font-bold text-sm hover:text-[#00D094] transition-colors duration-300">
              View all Partners
              {/* Tiny Play Icon Arrow */}
              <Play size={10} className="fill-current text-[#000C24] group-hover:text-[#00D094] transition-colors" />
            </a>
          </div>
        </div>

        {/* === Content Row === */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Left Column: Image */}
    <div className="w-full lg:w-[45%]">
  <div className="rounded-3xl overflow-hidden shadow-xl relative h-[500px] group">

    {/* IMAGE */}
    <img 
      src={partners}
      alt="Partnering Meeting" 
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />

    {/* GREEN HOVER GRADIENT */}
    <div className="absolute inset-0 bg-gradient-to-t from-green-500/70 via-green-500/30 to-transparent 
    opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

    {/* BLACK TOP FADE (always visible) */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

  </div>
</div>


          {/* Right Column: Logo Grid */}
          <div className="w-full lg:w-[55%] relative">
            
            {/* Grid Container */}
            <div className="grid grid-cols-2 border border-[#e1e7e3] rounded-2xl bg-white overflow-hidden shadow-sm">
               {/* Map through logos */}
               {partnersList.map((partner, index) => (
                 <div 
                    key={index} 
                    className={`
                      h-40 flex flex-col items-center justify-center p-6 border-gray-100 hover:bg-gray-50 transition-colors
                      ${index % 2 === 0 ? 'border-r border-[#e1e7e3]' : ''} 
                      ${index < 4 ? 'border-b' : ''}
                    `}
                 >
                    {/* Using the actual logo image */}
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-50 w-auto opacity-80  hover:scale-110 transition-all duration-300" 
                    />
                    
                 </div>
               ))}
            </div>

            {/* === FLOATING CENTER BADGE === */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-[#EEF7F2] p-8 rounded-xl shadow-lg text-center border border-white w-40 h-40 flex flex-col items-center justify-center">
                <h3 className="text-4xl font-bold text-[#051509] font-heading">15+</h3>
                <p className="text-xs font-bold text-gray-500 mt-1 leading-tight">
                  Industry Leaders <br/> with Us
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default PartnerSec;