import React from "react";
import { Link } from "react-router";
import HeroCarousel from "./HeroCarousel";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid md:grid-cols-12 gap-12 items-center">
      {/* Left Content */}
      <div className="md:col-span-7 space-y-6">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] text-xs font-semibold uppercase tracking-widest text-[#8A5333] border border-[#E5DFD5]">
          <Sparkles className="w-3.5 h-3.5" />
          Crafted in Addis Ababa · Ethiopia
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1C1917] leading-tight">
          Furniture that fits your <span className="text-[#8A5333]">story.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-xl">
          Thoughtfully proportioned, handcrafted timber pieces and bespoke upholstery designed for Ethiopian homes, creative studios, and modern living spaces.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/catalog"
            className="px-7 py-3.5 bg-[#8A5333] hover:bg-[#6E3F24] text-white font-medium text-sm tracking-wider uppercase rounded-xl shadow-md hover:shadow-lg flex items-center gap-2 transition"
          >
            Shop the Catalog
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/about"
            className="px-6 py-3.5 bg-white border border-[#DCD6CC] text-[#1C1917] hover:bg-[#FAF8F5] rounded-xl transition text-sm font-medium"
          >
            Our Workshop Story
          </Link>
        </div>
      </div>

      {/* Right Carousel Slider */}
      <div className="md:col-span-5 relative">
        <HeroCarousel />
      </div>
    </div>
  );
};

export default Hero;
