import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import { useLanguage } from "../Context/LanguageContext";
import ProductCard from "./ProductCard";

const FeaturedProductsCarousel = ({ products }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);
  const isHovered = useRef(false);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Update progress bar
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft: sLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((sLeft / maxScroll) * 100);
    }
  };

  // Ambient smooth auto-glide that pauses on mouse hover / drag
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
          let nextScroll = sLeft + (0.045 * delta);
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

  if (!products || products.length === 0) return null;

  return (
    <div
      className="space-y-5 select-none"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Header with Title and "View Full Catalog" link (NO arrow buttons) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A5333] block">
            {t("home.signaturePieces")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
            {t("home.featuredProducts")}
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
            <span>{t("home.viewFullCatalog")}</span>
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
        className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-none py-2 px-1 -mx-1 cursor-grab active:cursor-grabbing scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[280px] sm:w-[320px] lg:w-[360px] shrink-0"
            onClickCapture={(e) => {
              // If user dragged more than 6px, prevent triggering link
              if (dragDistance.current > 6) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            <ProductCard item={product} buttonText={t("home.viewDetails")} />
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

export default FeaturedProductsCarousel;
