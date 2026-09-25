import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import useProjects from "../Hooks/useProjects";
import useProducts from "../Hooks/useProducts";
import ProductCard from "../components/ProductCard";
import InquiryModal from "../components/InquiryModal";
import Loader from "../components/Loader";
import { ArrowLeft, MapPin, Send } from "lucide-react";
import { useLanguage } from "../Context/LanguageContext";

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, loading: projectsLoading } = useProjects();
  const { products, loading: productsLoading } = useProducts();
  const { t, localizeProject } = useLanguage();

  const [activePhoto, setActivePhoto] = useState("");
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const rawProject = Array.isArray(projects)
    ? projects.find((p) => String(p.id) === String(id))
    : null;

  const project = rawProject ? (localizeProject(rawProject) || rawProject) : null;

  useEffect(() => {
    if (project) {
      setActivePhoto(project.heroImage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id, rawProject]);

  if (productsLoading || projectsLoading) return <Loader />;

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#1C1917]">{t("projects.projectNotFound")}</h2>
        <p className="text-sm text-[#78716C]">{t("projects.projectNotFoundDesc")}</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#8A5333] text-white text-xs font-semibold uppercase tracking-wider rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("projects.backToProjects")}</span>
        </Link>
      </div>
    );
  }

  // Linked furniture pieces used in this project
  const furnitureUsedProducts = Array.isArray(products) && Array.isArray(rawProject.furnitureUsed)
    ? products.filter((p) => rawProject.furnitureUsed.includes(p.id))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-14">
      {/* Breadcrumbs */}
      <nav className="text-xs text-[#78716C] flex items-center gap-2">
        <Link to="/" className="hover:text-[#1C1917]">{t("nav.home")}</Link>
        <span>/</span>
        <Link to="/projects" className="hover:text-[#1C1917]">{t("nav.projects")}</Link>
        <span>/</span>
        <span className="text-[#1C1917] font-semibold">{project.title}</span>
      </nav>

      {/* Project Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7E2D9] pb-8">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="bg-[#8A5333] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {project.roomType}
            </span>
            <span className="text-xs text-[#78716C] flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#8A5333]" />
              {project.location}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#1C1917]">
            {project.title}
          </h1>
        </div>

        <button
          onClick={() => setIsInquiryModalOpen(true)}
          className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#8A5333] hover:bg-[#6E3F24] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md"
        >
          <Send className="w-4 h-4" />
          <span>{t("projects.inquireSimilar")}</span>
        </button>
      </div>

      {/* Main Hero Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-[16/9] max-h-[600px] w-full rounded-3xl overflow-hidden bg-[#F3EFEA] shadow-md border border-[#E7E2D9]">
          <img
            src={activePhoto || project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>

        {/* Gallery Thumbnails */}
        {project.gallery && project.gallery.length > 1 && (
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {project.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhoto(imgUrl)}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none ${
                  activePhoto === imgUrl
                    ? "border-[#8A5333] shadow-md scale-[1.02]"
                    : "border-[#E7E2D9] opacity-75 hover:opacity-100"
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${project.title} photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Project Narrative & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-4">
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-2xl font-bold text-[#1C1917]">{t("projects.overview")}</h2>
          <p className="text-[#57534E] text-base leading-relaxed">
            {project.description}
          </p>
          {project.clientBrief && (
            <div className="bg-[#FAF8F5] border-l-4 border-[#8A5333] p-5 rounded-r-xl space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A5333]">
                {t("projects.clientBrief")}
              </span>
              <p className="text-sm italic text-[#44403C]">"{project.clientBrief}"</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 bg-white border border-[#E7E2D9] rounded-2xl p-6 space-y-4 shadow-xs self-start">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#78716C]">
            {t("projects.overview")}
          </h3>
          <div className="space-y-3 text-xs text-[#44403C]">
            <div className="flex justify-between py-1.5 border-b border-[#F3EFEA]">
              <span className="text-[#78716C]">{t("contact.breadcrumb")}</span>
              <span className="font-semibold text-[#1C1917]">{project.location}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#F3EFEA]">
              <span className="text-[#78716C]">{t("catalog.roomCategory")}</span>
              <span className="font-semibold text-[#1C1917]">{project.roomType}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#F3EFEA]">
              <span className="text-[#78716C]">{t("projects.completed")}</span>
              <span className="font-semibold text-[#1C1917]">{project.year}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#F3EFEA]">
              <span className="text-[#78716C]">{t("projects.furnitureUsed")}</span>
              <span className="font-semibold text-[#1C1917]">{furnitureUsedProducts.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* "Shop This Project" (Furniture Used) */}
      {furnitureUsedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#E7E2D9] space-y-8">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A5333] block">
                {t("projects.portfolioBadge")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
                {t("projects.furnitureUsed")}
              </h2>
            </div>
            <Link
              to="/catalog"
              className="text-xs font-semibold uppercase tracking-wider text-[#8A5333] hover:text-[#6E3F24]"
            >
              {t("home.viewFullCatalog")}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {furnitureUsedProducts.map((prod) => (
              <ProductCard key={prod.id} item={prod} buttonText={t("catalog.view")} />
            ))}
          </div>
        </section>
      )}

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        itemName={project.title}
        itemCategory={project.roomType}
        itemPrice="Custom Commission"
      />
    </div>
  );
};

export default ProjectDetail;
