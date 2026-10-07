import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useLanguage } from "../Context/LanguageContext";

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=960&q=80",
    badgeKey: "carousel.slide1.badge",
    titleKey: "carousel.slide1.title",
    subtitleKey: "carousel.slide1.subtitle",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=960&q=80",
    badgeKey: "carousel.slide2.badge",
    titleKey: "carousel.slide2.title",
    subtitleKey: "carousel.slide2.subtitle",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=960&q=80",
    badgeKey: "carousel.slide3.badge",
    titleKey: "carousel.slide3.title",
    subtitleKey: "carousel.slide3.subtitle",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=960&q=80",
    badgeKey: "carousel.slide4.badge",
    titleKey: "carousel.slide4.title",
    subtitleKey: "carousel.slide4.subtitle",
  },
];

// Pre-create slide list with clones for seamless infinite looping (no rewinding lag)
const SLIDES_WITH_CLONES = [
  { ...HERO_SLIDES[HERO_SLIDES.length - 1], cloneKey: "clone-prev" },
  ...HERO_SLIDES.map((s) => ({ ...s, cloneKey: `real-${s.id}` })),
  { ...HERO_SLIDES[0], cloneKey: "clone-next" },
];

const HeroCarousel = () => {
  const { t } = useLanguage();
  // displayIndex starts at 1 (first real slide)
  const [displayIndex, setDisplayIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const transitionTimeout = useRef(null);

  // Preload and decode all images into GPU memory on mount
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
      if (typeof img.decode === "function") {
        img.decode().catch(() => {});
      }
    });
  }, []);

  // Handle seamless loop teleportation when hitting clones
  const handleTransitionEnd = useCallback(() => {
    setDisplayIndex((current) => {
      if (current >= SLIDES_WITH_CLONES.length - 1) {
        setIsTransitioning(false);
        return 1;
      }
      if (current <= 0) {
        setIsTransitioning(false);
        return HERO_SLIDES.length;
      }
      setIsTransitioning(false);
      return current;
    });
  }, []);

  const nextSlide = useCallback(() => {
    setDisplayIndex((prev) => {
      if (prev >= SLIDES_WITH_CLONES.length - 1) return prev;
      setIsTransitioning(true);
      return prev + 1;
    });
  }, []);

  const prevSlide = useCallback(() => {
    setDisplayIndex((prev) => {
      if (prev <= 0) return prev;
      setIsTransitioning(true);
      return prev - 1;
    });
  }, []);

  const goToSlide = (slideIndex) => {
    setIsTransitioning(true);
    setDisplayIndex(slideIndex + 1);
  };

  // Fallback safety timeout for transitionEnd
  useEffect(() => {
    if (isTransitioning) {
      clearTimeout(transitionTimeout.current);
      transitionTimeout.current = setTimeout(() => {
        handleTransitionEnd();
      }, 580);
    }
    return () => clearTimeout(transitionTimeout.current);
  }, [isTransitioning, handleTransitionEnd]);

  // Autoplay with hover pause
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Derive the active dot index (0 to HERO_SLIDES.length - 1)
  const activeDotIndex =
    displayIndex === 0
      ? HERO_SLIDES.length - 1
      : displayIndex === SLIDES_WITH_CLONES.length - 1
      ? 0
      : displayIndex - 1;

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] max-w-md mx-auto group select-none"
      style={{
        isolation: "isolate",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        transform: "translateZ(0)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="TK Furniture Hero Showcase"
    >
      {/* Hardware-Accelerated Infinite Slider Track */}
      <div
        className="flex w-full h-full transform-gpu"
        style={{
          transform: `translate3d(-${displayIndex * 100}%, 0, 0)`,
          transition: isTransitioning
            ? "transform 550ms cubic-bezier(0.22, 1, 0.36, 1)"
            : "none",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {SLIDES_WITH_CLONES.map((slide, index) => {
          const badge = t(slide.badgeKey);
          const title = t(slide.titleKey);
          const subtitle = t(slide.subtitleKey);

          return (
            <div
              key={`${slide.cloneKey}-${index}`}
              className="w-full h-full shrink-0 relative overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              aria-hidden={index !== displayIndex}
            >
              <img
                src={slide.image}
                alt={title}
                className="w-full h-full object-cover select-none pointer-events-none"
                loading="eager"
                decoding="async"
                draggable={false}
              />

              {/* Cinematic Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />

              {/* Slide Content Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 text-[11px] font-semibold uppercase tracking-widest text-[#FAF8F5] mb-2 border border-white/20 shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#E5DFD5]" />
                  {badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF8F5]/90 mt-1 font-medium drop-shadow-xs">
                  {subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prev / Next Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 shadow-lg border border-white/25 hover:scale-105 active:scale-95 cursor-pointer z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 shadow-lg border border-white/25 hover:scale-105 active:scale-95 cursor-pointer z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/40 px-3 py-1.5 rounded-full border border-white/15">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
              activeDotIndex === index
                ? "w-6 bg-white shadow-sm"
                : "w-2 bg-white/45 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeDotIndex === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
