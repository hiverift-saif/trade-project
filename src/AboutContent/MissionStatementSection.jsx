import React, { useState } from 'react';
import { ArrowRight, ChevronUp } from 'lucide-react';

const MissionStatementSection = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    { id: 'mission', label: 'Mission Statement' },
    { id: 'vision', label: 'Vision Statement' },
    { id: 'value', label: 'Our Value' }
  ];

  const content = {
    mission: {
      title: "Our Mission",
      desc: "Our mission is to empower individuals with innovative and strategic solutions that redefine growth, efficiency, and long-term success.",
      list: [
        "Delivering high-impact solutions that drive results.",
        "Building systems that empower businesses globally.",
        "Ensuring seamless workflow with intuitive technology."
      ],
      img: "https://images.unsplash.com/photo-1634704784915-aacf363b021f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    vision: {
      title: "Our Vision",
      desc: "We aim to become a global leader in automation, innovation, and intelligent digital transformation.",
      list: [
        "To develop world-class automated systems.",
        "To push boundaries of technology & innovation.",
        "To build a sustainable digital future."
      ],
      img: "https://plus.unsplash.com/premium_photo-1664476845274-27c2dabdd7f0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    value: {
      title: "Our Core Values",
      desc: "Our values shape how we think, work, and serve. Integrity, innovation, and commitment define our identity.",
      list: [
        "Customer-centric approach with transparent communication.",
        "Innovation as a daily practice, not an option.",
        "Long-term commitment built on trust and quality."
      ],
      img: "https://plus.unsplash.com/premium_photo-1661611255191-f68d5ad06cc5?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen">

      {/* Background Layer */}
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-white"></div>
      <div className="absolute top-[30%] left-0 right-0 bottom-0 bg-[#f1f7f3] "></div>

      <div className="relative z-10 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* ⭐ MOBILE = VERTICAL TABS ⭐ */}
          <div className="px-4 sm:px-20">
            <div className="flex flex-col sm:flex-row w-full">

              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full sm:flex-1 
                    px-6 py-4 md:py-5 text-base md:text-lg font-semibold 
                    transition-all duration-300 bg-[#f1f7f3] border border-gray-300
                    
                    ${index === 0 ? 'rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none' : ''}
                    ${index === tabs.length - 1 ? 'rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none' : ''}
                  `}
                >
                  {tab.label}
                </button>
              ))}

            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden ">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12">

              {/* Left Side */}
              <div className="space-y-6">
                <div>
                  <p className="text-gray-400 text-sm md:text-base uppercase tracking-wider mb-2">
                    STATEMENTS
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                    {content[activeTab].title}
                  </h2>
                </div>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {content[activeTab].desc}
                </p>

                <ul className="space-y-4">
                  {content[activeTab].list.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-green-500 mt-1" />
                      <p className="text-gray-700 text-base md:text-lg">{item}</p>
                    </li>
                  ))}
                </ul>

                <button className="inline-flex items-center gap-2 bg-gray-900 hover:bg-green-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Right Image */}
              <div className="relative order-first lg:order-last">
                <div className="relative rounded-xl overflow-hidden shadow-lg h-64 sm:h-80 lg:h-full min-h-[300px] group">

                  <img
                    src={content[activeTab].img}
                    alt="Content"
                    className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-green-500/70 via-green-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-gray-900 hover:bg-green-500 text-white p-3 md:p-4 rounded-full shadow-lg transition-all duration-300"
      >
        <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
      </button>

    </div>
  );
};

export default MissionStatementSection;
