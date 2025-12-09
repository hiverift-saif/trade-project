import React from "react";
import { MoveRight, History } from "lucide-react";
import aboutV2Shape22 from "../assets/about.png";
import aboutv2 from "../assets/aboutv2.png";
import aboutv3 from "../assets/aboutv3.png";

const AboutSec = () => {
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* GAP REDUCED HERE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-start">
            {/* Background shape */}
            <div className="hidden lg:block absolute left-[250px] top-1/2 -translate-y-1/2 z-0">
              <img
                src={aboutV2Shape22}
                className="w-[300px] opacity-60 animate-[spin_10s_linear_infinite]"
                alt="Background Shape"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center lg:items-start gap-6">
              {/* Main Image */}
              <div className="relative w-[240px] sm:w-[300px] rounded-2xl overflow-hidden group">
                <img
                  src={aboutv2}
                  className="w-full h-full object-cover rounded-2xl transition-all duration-500 group-hover:scale-110"
                  alt="Support"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/70 via-green-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>

              {/* Chart Image */}
              <div className="relative lg:absolute lg:left-[330px] lg:top-5 w-[240px] sm:w-[300px]">
                <div className="rounded-2xl overflow-hidden group shadow-lg">
                  <img
                    src={aboutv3}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    alt="Chart"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-500/70 via-green-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
              </div>

              {/* Experience Box */}
              <div className="relative lg:absolute lg:bottom-[-20px] lg:left-[260px] w-[260px] sm:w-[300px]  sm:h-[200px] rounded-2xl shadow-2xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-50 object-cover"
                >
                  <source
                    src="https://cdn.pixabay.com/video/2024/03/15/204306-923909642_large.mp4"
                    type="video/mp4"
                  />
                </video>

                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10 p-5 h-full  gap-4 text-white">
                  <div className="text-[#66FF99] mt-1">
                    <History size={36} />
                  </div>

                  <div className="flex flex-col justify-center items-left pl-10">
                    <h2 className="text-3xl md:5xl font-bold leading-none">
                      24+ Years{" "}
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-300 mt-1 font-bold">
                      Experience in the <br /> Market
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5 mt-10 lg:mt-0 text-center lg:text-left">
            <span className="inline-block bg-[#66FF99] text-[#000C24] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
              About Pro
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold text-[#000C24] leading-tight mb-6">
              Gateway To Global <br /> Markets
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              It is a long established fact that reader will be distracted by
              the readable content of a page when looking at layout point of
              making here is that it has a more or less normal distribution all
              letters as opposed to using.
            </p>

            <div className="flex items-start gap-5 mb-10 justify-center lg:justify-start">
              <div className="w-14 h-14 rounded-full bg-[#E8FBF2] flex items-center justify-center text-[#00D094]">
                <History size={28} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-[#000C24]">
                  Our Journey
                </h3>
                <p className="text-gray-600">
                  Nor again is there anyone who loves or pursues itself because
                  it is pain.
                </p>
              </div>
            </div>

            <button className="group bg-[#000C24] text-white px-9 py-4 rounded-full font-semibold flex items-center gap-2 mx-auto lg:mx-0 hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl">
              Explore History
              <MoveRight
                className="group-hover:translate-x-1 transition-all"
                size={20}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSec;
