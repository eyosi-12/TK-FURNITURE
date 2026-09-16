import React from "react";
import { Link, useNavigate } from "react-router";
import useProducts from "../Hooks/useProducts";
import useProjects from "../Hooks/useProjects";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import HeroCarousel from "../components/HeroCarousel";
import { ArrowRight, ArrowUpRight, Hammer, ShieldCheck, Sparkles } from "lucide-react";

const Home = () => {
  const { products, loading: productsLoading } = useProducts();
  const { projects, loading: projectsLoading } = useProjects();
  const navigate = useNavigate();

  // Featured 3 products as specified in Wireframe Figure 5
  const featuredProducts = Array.isArray(products)
    ? products.filter((p) => p.featured).slice(0, 3).length === 3
      ? products.filter((p) => p.featured).slice(0, 3)
      : products.slice(0, 3)
    : [];

  // Featured 2 projects as specified in Wireframe Figure 5
  const featuredProjects = Array.isArray(projects)
    ? projects.filter((p) => p.featuredOnHome).slice(0, 2).length === 2
      ? projects.filter((p) => p.featuredOnHome).slice(0, 2)
      : projects.slice(0, 2)
    : [];

  const roomCategories = [
    {
      name: "Living Room",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
      description: "Sofas, armchairs, travertine & oak tables",
    },
    {
      name: "Bedroom",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
      description: "Platform beds, fluted wardrobes, bedside consoles",
    },
    {
      name: "Kitchen",
      image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80",
      description: "Solid teak dining tables & leather barstools",
    },
    {
      name: "Office",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      description: "Executive desks, task chairs & modular shelving",
    },
    {
      name: "Apartment",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      description: "Balcony teak sets & compact tailored pieces",
    },
  ];

  if (productsLoading || projectsLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section - Wireframe Figure 5 */}
      <section className="relative overflow-hidden bg-[#EFECE6] border-b border-[#E7E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] text-xs font-semibold uppercase tracking-widest text-[#8A5333] border border-[#E5DFD5]">
              <Sparkles className="w-3.5 h-3.5" />
              Crafted in Addis Ababa · Ethiopia
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1917] tracking-tight leading-[1.15]">
              Furniture that fits your story.
            </h1>
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-xl">
              Thoughtfully proportioned, handcrafted timber pieces and bespoke upholstery designed for Ethiopian homes, creative studios, and modern living spaces.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#8A5333] hover:bg-[#6E3F24] text-white font-medium text-sm tracking-wider uppercase rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <span>Shop the Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/80 hover:bg-white text-[#1C1917] font-medium text-sm rounded-xl border border-[#DCD6CC] transition-all"
              >
                <span>Our Workshop Story</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* 2. Shop by Room - Wireframe Figure 5 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A5333] block">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
              Shop by Room
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs font-semibold uppercase tracking-wider text-[#8A5333] hover:text-[#6E3F24] inline-flex items-center gap-1"
          >
            <span>Explore All Categories</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Room Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {roomCategories.map((room) => (
            <button
              key={room.name}
              onClick={() => navigate(`/catalog?category=${encodeURIComponent(room.name)}`)}
              className="group text-left bg-white rounded-2xl overflow-hidden border border-[#E7E2D9] hover:border-[#8A5333] transition-all duration-300 p-2 sm:p-3 hover:shadow-lg focus:outline-none"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#F3EFEA] mb-3">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#1C1917] group-hover:text-[#8A5333] transition-colors">
                {room.name}
              </h3>
              <p className="text-[11px] text-[#78716C] line-clamp-1 mt-0.5">
                Browse collection
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Featured Products - Wireframe Figure 5 (3 cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A5333] block">
              Signature Pieces
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
              Featured Products
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs font-semibold uppercase tracking-wider text-[#8A5333] hover:text-[#6E3F24] inline-flex items-center gap-1"
          >
            <span>View Full Catalog</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} item={product} buttonText="View Details" />
          ))}
        </div>
      </section>

      {/* 4. Featured Projects - Wireframe Figure 5 (2 wide cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A5333] block">
              Real Installations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
              Featured Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="text-xs font-semibold uppercase tracking-wider text-[#8A5333] hover:text-[#6E3F24] inline-flex items-center gap-1"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2 Wide Cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E7E2D9] hover:border-[#8A5333]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EFEA]">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#FAF8F5]/95 backdrop-blur-xs text-xs font-semibold text-[#1C1917] px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {project.roomType}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#1C1917] group-hover:text-[#8A5333] transition-colors">
                    {project.title} — {project.roomType}
                  </h3>
                  <p className="text-xs text-[#78716C] mt-1">
                    {project.location} · Completed {project.year}
                  </p>
                  <p className="text-sm text-[#57534E] mt-3 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F3EFEA] flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8A5333]">
                    Explore Project & Furniture Used
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#F5F1EB] group-hover:bg-[#8A5333] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
              Artisanal Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
              About Our Workshop
            </h2>
            <p className="text-[#57534E] text-base leading-relaxed">
              We are an Addis Ababa–based furniture studio uniting time-honored joinery with contemporary minimalism. From solid kiln-dried highland timber to custom tailored upholstery, each piece is built to order, ensuring enduring quality that gracefully endures everyday life.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1917] hover:bg-[#8A5333] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs"
              >
                <span>Learn More</span>
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
