import React from "react";
import { Link, useNavigate } from "react-router";
import useProducts from "../Hooks/useProducts";
import useProjects from "../Hooks/useProjects";
import CategoryCarousel from "../components/CategoryCarousel";
import FeaturedProductsCarousel from "../components/FeaturedProductsCarousel";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import HeroCarousel from "../components/HeroCarousel";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "../Context/LanguageContext";

const Home = () => {
  const { products, loading: productsLoading } = useProducts();
  const { projects, loading: projectsLoading } = useProjects();
  const { t, localizeProject, localizeCategory } = useLanguage();
  const navigate = useNavigate();

  // Curated products for carousel (show all products for a rich transition)
  const displayProducts = Array.isArray(products) && products.length > 0
    ? products
    : [];

  // Featured 2 projects as specified in Wireframe Figure 5
  const featuredProjects = Array.isArray(projects)
    ? projects.filter((p) => p.featuredOnHome).slice(0, 2).length === 2
      ? projects.filter((p) => p.featuredOnHome).slice(0, 2)
      : projects.slice(0, 2)
    : [];

  // 10 Curated Room Categories for rich mouse-sliding carousel
  const roomCategories = [
    {
      name: "Living Room",
      label: t("rooms.livingRoom"),
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
      description: t("rooms.livingRoomDesc"),
    },
    {
      name: "Bedroom",
      label: t("rooms.bedroom"),
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
      description: t("rooms.bedroomDesc"),
    },
    {
      name: "Dining Room",
      label: t("rooms.diningRoom"),
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80",
      description: t("rooms.diningRoomDesc"),
    },
    {
      name: "Kitchen",
      label: t("rooms.kitchen"),
      image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80",
      description: t("rooms.kitchenDesc"),
    },
    {
      name: "Office",
      label: t("rooms.office"),
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      description: t("rooms.officeDesc"),
    },
    {
      name: "Apartment",
      label: t("rooms.apartment"),
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      description: t("rooms.apartmentDesc"),
    },
    {
      name: "Lounge",
      label: t("rooms.lounge"),
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      description: t("rooms.loungeDesc"),
    },
    {
      name: "Outdoor",
      label: t("rooms.outdoor"),
      image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80",
      description: t("rooms.outdoorDesc"),
    },
    {
      name: "Kids & Study",
      label: t("rooms.kidsStudy"),
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
      description: t("rooms.kidsStudyDesc"),
    },
    {
      name: "Atelier",
      label: t("rooms.atelier"),
      image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80",
      description: t("rooms.atelierDesc"),
    },
  ];

  if (productsLoading || projectsLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section - Stunning, High-Visibility Architectural Furniture House */}
      <section className="relative overflow-hidden border-b border-[#E7E2D9] bg-[#FAF8F5]">
        {/* Full-Bleed Grand Furniture House Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2600&q=90"
            alt="TK Luxury Furniture House & Atelier Showroom"
            className="w-full h-full object-cover object-right lg:object-center"
          />
          {/* Seamless feathered luxury studio vignette: gives crisp text readability on the left while showcasing the grand furniture house on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/85 via-50% to-[#FAF8F5]/20 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent lg:hidden" />
          {/* Subtle warm ambient lighting accents */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#8A5333]/8 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Content Container - Neat, open, architectural elegance (no clunky box!) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-14 sm:pb-20 lg:pt-10 lg:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Neat, Crisp, Uncluttered Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-[#8A5333] border border-[#E7E2D9] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8A5333]" />
              {t("home.heroBadge")}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1917] tracking-tight leading-[1.12]">
              {t("home.heroTitle")}
            </h1>

            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-xl font-normal">
              {t("home.heroSubtitle")}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#8A5333] hover:bg-[#6E3F24] text-white font-semibold text-sm tracking-wider uppercase rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>{t("home.shopCatalog")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/95 hover:bg-white text-[#1C1917] font-semibold text-sm rounded-xl border border-[#DCD6CC] transition-all shadow-2xs hover:border-[#8A5333]/50"
              >
                <span>{t("home.workshopStory")}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Showcase Carousel */}
          <div className="lg:col-span-5 relative">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* 2. Shop by Room - Mouse-Draggable Smooth Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryCarousel categories={roomCategories} />
      </section>

      {/* 3. Featured Products - Mouse-Draggable Smooth Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturedProductsCarousel products={displayProducts} />
      </section>

      {/* 4. Featured Projects - Wireframe Figure 5 (2 wide cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A5333] block">
              {t("home.realInstallations")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
              {t("home.featuredProjects")}
            </h2>
          </div>
          <Link
            to="/projects"
            className="text-xs font-semibold uppercase tracking-wider text-[#8A5333] hover:text-[#6E3F24] inline-flex items-center gap-1"
          >
            <span>{t("home.viewAllProjects")}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2 Wide Cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => {
            const localizedProject = localizeProject(project) || project;

            return (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E7E2D9] hover:border-[#8A5333]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EFEA]">
                  <img
                    src={localizedProject.heroImage}
                    alt={localizedProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#FAF8F5]/95 backdrop-blur-xs text-xs font-semibold text-[#1C1917] px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      {localizedProject.roomType}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#1C1917] group-hover:text-[#8A5333] transition-colors">
                      {localizedProject.title} — {localizedProject.roomType}
                    </h3>
                    <p className="text-xs text-[#78716C] mt-1">
                      {localizedProject.location} · {t("projects.completed")} {localizedProject.year}
                    </p>
                    <p className="text-sm text-[#57534E] mt-3 line-clamp-2">
                      {localizedProject.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#F3EFEA] flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#8A5333]">
                      {t("home.exploreProject")}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#F5F1EB] group-hover:bg-[#8A5333] group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. About Our Workshop - Wireframe Figure 5 Card / Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-[#F4EFE6] border border-[#E4DCD0] rounded-3xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xs">
          {/* Workshop Image on Left */}
          <div className="md:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80"
                alt="Woodcrafting in our Addis Ababa workshop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>

          {/* Text on Right */}
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A5333] block">
              {t("home.artisanalHeritage")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {t("home.aboutWorkshop")}
            </h2>
            <p className="text-[#57534E] text-base leading-relaxed">
              {t("home.workshopDesc")}
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1917] hover:bg-[#8A5333] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs"
              >
                <span>{t("home.learnMore")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
