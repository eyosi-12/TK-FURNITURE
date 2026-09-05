import React from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Hammer,
  Leaf,
  Compass,
  MapPin
} from "lucide-react";

const About = () => {
  const values = [
    {
      title: "Authentic Materials",
      description:
        "We source sustainably harvested timber including Ethiopian Wanza, Tid (highland juniper), and kiln-dried European white oak alongside natural linen and full-grain leather.",
      icon: Leaf,
    },
    {
      title: "Master Joinery",
      description:
        "Every joint, mortise, and tenon is cut with exactitude by senior artisans in our Addis Ababa workshop, designed to endure generations of living.",
      icon: Hammer,
    },
    {
      title: "Bespoke Proportions",
      description:
        "Furniture should fit both your space and your rhythm of life. We customize lengths, depths, wood stains, and fabric finishes for individual clients.",
      icon: Compass,
    },
    {
      title: "Enduring Guarantee",
      description:
        "We stand behind the structural integrity of our frames with comprehensive workshop support and long-term care guidelines.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-10 sm:py-16">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-[#78716C] flex items-center gap-2">
          <Link to="/" className="hover:text-[#1C1917]">Home</Link>
          <span>/</span>
          <span className="text-[#1C1917] font-semibold">About Us</span>
        </nav>
      </div>

      {/* Hero / Brand Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] text-xs font-semibold uppercase tracking-widest text-[#8A5333] border border-[#E5DFD5]">
              <Sparkles className="w-3.5 h-3.5" />
              Our Story & Heritage
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1917] leading-[1.15]">
              Crafting furniture with quiet confidence in Addis Ababa.
            </h1>
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
              Founded in Addis Ababa, our studio was born from a desire to bridge traditional Ethiopian carpentry heritage with modern architectural simplicity. We believe furniture should not be disposable—it should age gracefully with your home, gathering character with every year.
            </p>
            <p className="text-base text-[#57534E] leading-relaxed">
              From our Bole Road workshop, our team of passionate woodworkers, upholsterers, and designers collaborate directly with homeowners, architects, and interior stylists to build thoughtful, resilient living environments.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] max-w-md mx-auto">
              <img
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80"
                alt="Workshop artisan craftsmanship in Addis Ababa"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs uppercase tracking-widest text-[#FAF8F5]/80 font-medium">
                  Studio Atelier
                </p>
                <p className="text-sm font-semibold">Bole Road Workshop, Addis Ababa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section - Wireframe Sitemap */}
      <section className="bg-[#F4EFE6] border-y border-[#E4DCD0] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A5333]">
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1917]">
              Mission & Core Values
            </h2>
            <p className="text-sm sm:text-base text-[#57534E]">
              Our principles define every cut of wood, choice of fabric, and interaction with our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E2D9] space-y-4 shadow-xs"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] text-[#8A5333] border border-[#E5DFD5] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-[#1C1917]">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workshop Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80"
                  alt="TK Furniture Atelier Showroom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-md translate-y-6">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80"
                  alt="Handcrafted Timber Living Design"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A5333] block">
              The Atelier Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1917]">
              Visit our Addis Ababa workshop and showroom.
            </h2>
            <p className="text-[#57534E] text-base leading-relaxed">
              We welcome private clients, architects, and designers to browse fabric swatches, inspect wood grain variations, and touch finished pieces in person. Our design consultants can guide you through tailored room layouts and bespoke commissions.
            </p>

            {/* User Flow 2 Connection: "Click 'Our Projects' to see real-world work" */}
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#8A5333] hover:bg-[#6E3F24] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                <span>View Our Completed Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-[#D6D3D1] hover:bg-[#F3EFEA] text-[#1C1917] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
              >
                <span>Contact & Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
