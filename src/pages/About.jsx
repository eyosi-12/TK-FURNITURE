import React from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Hammer,
  Leaf,
  Compass,
} from "lucide-react";
import { useLanguage } from "../Context/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      title: t("about.values.materials.title"),
      description: t("about.values.materials.desc"),
      icon: Leaf,
    },
    {
      title: t("about.values.joinery.title"),
      description: t("about.values.joinery.desc"),
      icon: Hammer,
    },
    {
      title: t("about.values.proportions.title"),
      description: t("about.values.proportions.desc"),
      icon: Compass,
    },
    {
      title: t("about.values.guarantee.title"),
      description: t("about.values.guarantee.desc"),
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-10 sm:py-16">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-[#78716C] flex items-center gap-2">
          <Link to="/" className="hover:text-[#1C1917]">{t("nav.home")}</Link>
          <span>/</span>
          <span className="text-[#1C1917] font-semibold">{t("about.breadcrumb")}</span>
        </nav>
      </div>

      {/* Hero / Brand Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] text-xs font-semibold uppercase tracking-widest text-[#8A5333] border border-[#E5DFD5]">
              <Sparkles className="w-3.5 h-3.5" />
              {t("about.badge")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1917] leading-[1.15]">
              {t("about.title")}
            </h1>
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
              {t("about.p1")}
            </p>
            <p className="text-base text-[#57534E] leading-relaxed">
              {t("about.p2")}
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
                  {t("about.studioAtelier")}
                </p>
                <p className="text-sm font-semibold">{t("about.workshopLocation")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="bg-[#F4EFE6] border-y border-[#E4DCD0] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A5333]">
              {t("about.whatWeStandFor")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1917]">
              {t("about.missionTitle")}
            </h2>
            <p className="text-sm sm:text-base text-[#57534E]">
              {t("about.missionSubtitle")}
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

      {/* Workshop Process / Atelier Experience Section */}
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
              {t("about.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1917]">
              {t("about.showroomBanner.title")}
            </h2>
            <p className="text-[#57534E] text-base leading-relaxed">
              {t("about.showroomBanner.desc")}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#8A5333] hover:bg-[#6E3F24] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                <span>{t("projects.title")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-[#D6D3D1] hover:bg-[#F3EFEA] text-[#1C1917] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
              >
                <span>{t("nav.contact")}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
