import React from "react";
import { ChevronRight } from "lucide-react";
import AboutSection from "../AboutContent/AboutSection";
import MissionStatement from "../AboutContent/MissionStatement";
import TestimonialSection from "../HomeContent/TestimonialSection";
import FactCounter from "../AboutContent/FactCounter";
import PartnerSection from "../AboutContent/PartnerSection";
import AwardsSection from "../AboutContent/AwardsSection";


export default function AboutUs() {
  return (
    <div className="">
      <section className="relative h-[450px]  overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 h-full">
          <img
            src="https://plus.unsplash.com/premium_photo-1661611270994-637a2a80a309?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About Background"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#000213] via-[#041379]/90 to-[#041379]/40"></div>
        </div>

        {/* CONTENT */}
 <div className="relative z-10 h-full flex flex-col justify-center">
  <div className="container mx-auto px-4 text-white">

    {/* Title */}
    <div className="flex justify-center items-center">
      <h2 className="text-4xl md:text-7xl font-bold mb-3">
        About Us
      </h2>
    </div>

    {/* Breadcrumb at Bottom */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-4 md:pl-30">
      <ul
        className="
          flex flex-col md:flex-row 
          items-center md:items-center 
          gap-2 text-xl text-white/80
        "
      >
        <li>
          <a href="/" className="hover:text-white">Home</a>
        </li>

        <li className="hidden md:flex items-center">
          <ChevronRight size={14} />
        </li>

        <li>About</li>

        <li className="hidden md:flex items-center">
          <ChevronRight size={14} />
        </li>

        <li className="font-semibold text-white">About Us</li>
      </ul>
    </div>
  </div>
</div>


      </section>

      <AboutSection/>
      <MissionStatement/>
      <TestimonialSection/>
      <FactCounter/>
      <PartnerSection/>
      <AwardsSection/>
    </div>
  );
}
