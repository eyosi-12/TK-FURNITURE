import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import useProjects from "../Hooks/useProjects";
import Loader from "../components/Loader";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useLanguage } from "../Context/LanguageContext";

const Projects = () => {
  const { projects, loading, error } = useProjects();
  const [selectedRoom, setSelectedRoom] = useState("All");
  const { t, localizeCategory, localizeProject } = useLanguage();

  const roomFilters = [
    "All",
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Office",
    "Apartment",
  ];

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];
    if (selectedRoom === "All") return projects;
    return projects.filter(
      (p) => p.roomType.toLowerCase() === selectedRoom.toLowerCase()
    );
  }, [projects, selectedRoom]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center py-20 text-red-600">Error: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Title & Subtitle - Wireframe Figure 8 */}
      <div className="space-y-2 border-b border-[#E7E2D9] pb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8A5333] block">
          {t("projects.portfolioBadge")}
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-[#1C1917]">
          {t("projects.title")}
        </h1>
        <p className="text-base sm:text-lg text-[#57534E]">
          {t("projects.subtitle")}
        </p>

        {/* Filter Tabs - Wireframe Figure 8 */}
        <div className="pt-6 flex flex-wrap gap-2">
          {roomFilters.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedRoom(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus:outline-none ${
                selectedRoom === tab
                  ? "bg-[#1C1917] text-[#FAF8F5] shadow-sm"
                  : "bg-white text-[#57534E] border border-[#D6D3D1] hover:border-[#8A5333] hover:text-[#1C1917]"
              }`}
            >
              {localizeCategory(tab)}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid - Wireframe Figure 8 (3 columns x 2 rows) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => {
          const localized = localizeProject(project) || project;

          return (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E7E2D9] hover:border-[#8A5333]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Project Photo */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#F3EFEA]">
                <img
                  src={localized.heroImage}
                  alt={localized.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-[#FAF8F5]/90 backdrop-blur-xs text-[11px] font-semibold text-[#1C1917] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {localized.roomType}
                  </span>
                </div>
              </div>

              {/* Project Title & Meta */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-[#1C1917] group-hover:text-[#8A5333] transition-colors leading-snug">
                    {localized.title}
                  </h3>
                  <p className="text-xs text-[#78716C] flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-[#8A5333]" />
                    <span>{localized.location}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F3EFEA] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#8A5333]">
                  <span>{t("projects.viewCase")}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
