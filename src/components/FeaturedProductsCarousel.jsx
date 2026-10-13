import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import { useLanguage } from "../Context/LanguageContext";
import ProductCard from "./ProductCard";

const FeaturedProductsCarousel = ({ products }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const scrollRef = useRef(null);
  const progressBarRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);
  const isDraggingHorizontal = useRef(false);
  const isHovered = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Update progress bar via direct DOM ref to avoid 60fps React re-renders
  const handleScroll = () => {
    if (!scrollRef.current || !progressBarRef.current) return;
    const { scrollLeft: sLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      progressBarRef.current.style.width = `${Math.max(15, Math.min(100, (sLeft / maxScroll) * 100))}%`;
    }
  };

  // Ambient smooth auto-glide that pauses on mouse hover / drag / touch
  useEffect(() => {
    let animationId;
    let lastTime = performance.now();
    let scrollDirection = 1; // 1 = forward, -1 = reverse

    const smoothAutoScroll = (time) => {
      const delta = Math.min(time - lastTime, 50); // cap delta to prevent tab-switch jumps
      lastTime = time;

      if (scrollRef.current && !isHovered.current && !isDown.current) {
        const { scrollLeft: sLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (maxScroll > 0) {
          // Matched dynamic speed: 0.11 px/ms (~110 px/s)
          const speed = 0.11;
          let nextScroll = sLeft + (scrollDirection * speed * delta);

          if (nextScroll >= maxScroll - 1) {
            scrollDirection = -1; // smoothly reverse when reaching the end
            nextScroll = maxScroll;
          } else if (nextScroll <= 0) {
            scrollDirection = 1; // smoothly reverse when reaching the beginning
            nextScroll = 0;
          }

          scrollRef.current.scrollLeft = nextScroll;
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${Math.max(15, Math.min(100, (nextScroll / maxScroll) * 100))}%`;
          }
        }
      }

      animationId = requestAnimationFrame(smoothAutoScroll);
    };

    animationId = requestAnimationFrame(smoothAutoScroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Mouse drag events supporting both horizontal glide & vertical page glide
  const onMouseDown = (e) => {
    isDown.current = true;
    dragDistance.current = 0;
    isDraggingHorizontal.current = false;
    startX.current = e.pageX;
    startY.current = e.pageY;
    if (scrollRef.current) {
      scrollLeft.current = scrollRef.current.scrollLeft;
    }
  };

  const onMouseMove = (e) => {
    if (!isDown.current || !scrollRef.current) return;

    const deltaX = e.pageX - startX.current;
    const deltaY = e.pageY - startY.current;
    dragDistance.current = Math.max(Math.abs(deltaX), Math.abs(deltaY));

    // If movement is predominantly vertical and horizontal drag hasn't locked in,
    // allow gliding up or down the page freely
    if (!isDraggingHorizontal.current && Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 6) {
      window.scrollBy({ top: -deltaY, behavior: "auto" });
      startY.current = e.pageY;
      return;
    }

    // Horizontal glide
    if (Math.abs(deltaX) > 6 || isDraggingHorizontal.current) {
      isDraggingHorizontal.current = true;
      e.preventDefault();
      const walk = deltaX * 1.5;
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
      handleScroll();
    }
  };

  const onMouseUp = () => {
    isDown.current = false;
    isDraggingHorizontal.current = false;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    isDraggingHorizontal.current = false;
    isHovered.current = false;
  };

  const onMouseEnter = () => {
    isHovered.current = true;
  };

  // Touch handlers allowing full natural vertical scrolling and horizontal swiping
  const onTouchStart = (e) => {
    isDown.current = true;
    dragDistance.current = 0;
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const onTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      const diffX = Math.abs(e.touches[0].clientX - touchStartX.current);
      const diffY = Math.abs(e.touches[0].clientY - touchStartY.current);
      dragDistance.current = Math.max(diffX, diffY);
    } else {
      dragDistance.current = 10;
    }
  };

  const onTouchEnd = () => {
    isDown.current = false;
  };

  if (!products || products.length === 0) return null;

  return (
    <div
      className="space-y-5 select-none"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Header with Title and "View Full Catalog" link */}
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

      {/* Smooth Mouse- & Touch-Draggable Horizontal Track */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onScroll={handleScroll}
        className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-none py-2 px-1 -mx-1 cursor-grab active:cursor-grabbing touch-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", touchAction: "auto" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[280px] sm:w-[320px] lg:w-[360px] shrink-0"
            onClickCapture={(e) => {
              // If user dragged more than 8px, prevent triggering link
              if (dragDistance.current > 8) {
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
          ref={progressBarRef}
          className="h-full bg-[#8A5333] rounded-full transition-all duration-150"
          style={{ width: "15%" }}
        />
      </div>
    </div>
  );
};

export default FeaturedProductsCarousel;
