import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import { useLanguage } from "../Context/LanguageContext";

const CategoryCarousel = ({ categories }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);
  const isHovered = useRef(false);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Update scroll progress bar
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft: sLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((sLeft / maxScroll) * 100);
    }
  };

  // Ambient gentle auto-glide that pauses on mouse hover / drag
  useEffect(() => {
    let animationId;
    let lastTime = performance.now();

    const smoothAutoScroll = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      if (scrollRef.current && !isHovered.current && !isDown.current) {
        const { scrollLeft: sLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (maxScroll > 0) {
          // Slow, elegant continuous glide
          let nextScroll = sLeft + (0.04 * delta);
          if (nextScroll >= maxScroll - 1) {
            nextScroll = 0; // seamlessly loop back
          }
          scrollRef.current.scrollLeft = nextScroll;
          setScrollProgress((nextScroll / maxScroll) * 100);
        }
      }

      animationId = requestAnimationFrame(smoothAutoScroll);
    };

    animationId = requestAnimationFrame(smoothAutoScroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Mouse Drag Events for 1:1 Smooth Hand/Mouse Glide
  const onMouseDown = (e) => {
    isDown.current = true;
    dragDistance.current = 0;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseMove = (e) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // smooth responsive drag multiplier
    dragDistance.current = Math.abs(x - startX.current);
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
    handleScroll();
  };

  const onMouseUp = () => {
    isDown.current = false;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    isHovered.current = false;
  };

  const onMouseEnter = () => {
    isHovered.current = true;
  };

  // Card click handler ensuring drags don't trigger clicks
  const handleCardClick = (roomName) => {
    if (dragDistance.current > 6) {
      return; // was dragging, ignore click
    }
    navigate(`/catalog?category=${encodeURIComponent(roomName)}`);
  };

  return (
    <div
      className="space-y-5 select-none"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Header with Title and "Explore All" link (NO arrow buttons) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A5333] block">
            {t("home.curatedCollections")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
            {t("home.shopByRoom")}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Subtle drag hint indicator */}
          <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EFEA] text-[11px] font-medium text-[#78716C] border border-[#E7E2D9]">
            <MoveHorizontal className="w-3.5 h-3.5 text-[#8A5333]" />
            <span>{t("rooms.dragToExplore") || "Drag or scroll to explore"}</span>
          </div>

          <Link
            to="/catalog"
            className="text-xs font-semibold uppercase tracking-wider text-[#8A5333] hover:text-[#6E3F24] inline-flex items-center gap-1"
          >
            <span>{t("home.exploreAllCategories")}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Smooth Mouse-Draggable Horizontal Track */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onScroll={handleScroll}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-2 px-1 -mx-1 cursor-grab active:cursor-grabbing scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((room) => (
          <div
            key={room.name}
            onClick={() => handleCardClick(room.name)}
            className="w-[240px] sm:w-[280px] lg:w-[310px] shrink-0 group text-left bg-white rounded-2xl overflow-hidden border border-[#E7E2D9] hover:border-[#8A5333] transition-all duration-300 p-2.5 sm:p-3.5 hover:shadow-xl focus:outline-none flex flex-col pointer-events-auto"
          >
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F3EFEA] mb-3">
              <img
                src={room.image}
                alt={room.label}
                draggable="false"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#1C1917] group-hover:text-[#8A5333] transition-colors line-clamp-1">
                  {room.label}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#78716C] line-clamp-1 mt-0.5">
                  {room.description || t("home.browseCollection")}
                </p>
              </div>

              <div className="pt-2 mt-2 flex items-center justify-between text-xs font-semibold text-[#8A5333] group-hover:translate-x-0.5 transition-transform">
                <span>{t("home.browseCollection")}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sleek Modern Scroll Progress Bar */}
      <div className="w-full max-w-xs mx-auto h-1.5 bg-[#EAE5DC] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#8A5333] rounded-full transition-all duration-150"
          style={{ width: `${Math.max(15, scrollProgress)}%` }}
        />
      </div>
    </div>
  );
};

export default CategoryCarousel;
