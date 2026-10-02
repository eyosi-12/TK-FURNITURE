import React from "react";
import { useLanguage } from "../Context/LanguageContext";
import { Globe } from "lucide-react";

export const LanguageToggle = ({ variant = "header" }) => {
  const { language, setLanguage, isAmharic } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "am" : "en");
  };

  const handleSideClick = (targetLang, e) => {
    e.stopPropagation();
    // If clicking current language, toggle to other; if clicking other, switch to other
    if (language === targetLang) {
      setLanguage(targetLang === "en" ? "am" : "en");
    } else {
      setLanguage(targetLang);
    }
  };

  if (variant === "mobile-drawer") {
    return (
      <div 
        onClick={toggleLanguage}
        className="bg-[#FAF8F5] border border-[#E7E2D9] hover:border-[#8A5333]/50 rounded-2xl p-3.5 space-y-2.5 cursor-pointer select-none transition-all duration-200"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleLanguage(); }}
        aria-label="Toggle language between English and Amharic"
      >
        <div className="flex items-center justify-between text-xs font-semibold text-[#78716C] px-1 pointer-events-none">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#8A5333]" />
            <span>ቋንቋ / Language</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#8A5333] font-bold">
            {isAmharic ? "አማርኛ (Amharic)" : "English"}
          </span>
        </div>
        <div className="relative grid grid-cols-2 gap-2 bg-[#EFEAE2] p-1 rounded-xl">
          <button
            type="button"
            onClick={(e) => handleSideClick("en", e)}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
              language === "en"
                ? "bg-[#1C1917] text-white shadow-sm"
                : "text-[#57534E] hover:text-[#1C1917]"
            }`}
          >
            <span>English</span>
          </button>
          <button
            type="button"
            onClick={(e) => handleSideClick("am", e)}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
              language === "am"
                ? "bg-[#8A5333] text-white shadow-sm"
                : "text-[#57534E] hover:text-[#1C1917]"
            }`}
          >
            <span>አማርኛ</span>
          </button>
        </div>
      </div>
    );
  }

  // Header pill variant with smooth animated sliding indicator and two-way click
  return (
    <div
      onClick={toggleLanguage}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleLanguage();
        }
      }}
      className="relative inline-flex items-center bg-[#EAE5DC] p-1 rounded-full border border-[#D8D1C5] hover:border-[#8A5333]/60 shadow-2xs cursor-pointer select-none transition-all duration-200 group"
      aria-label={`Current language: ${language === "en" ? "English" : "Amharic"}. Click to switch language.`}
      title={language === "en" ? "Switch to አማርኛ (Amharic)" : "Switch to English"}
    >
      {/* Sliding Active Pill Background */}
      <span
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-transform duration-300 ease-out shadow-xs pointer-events-none ${
          language === "en"
            ? "translate-x-0 bg-[#1C1917]"
            : "translate-x-[calc(100%+8px)] bg-[#8A5333]"
        }`}
      />

      {/* English Pill */}
      <button
        type="button"
        onClick={(e) => handleSideClick("en", e)}
        className={`relative z-10 px-3 py-1 text-xs font-bold rounded-full transition-colors duration-200 cursor-pointer focus:outline-none ${
          language === "en"
            ? "text-[#FAF8F5]"
            : "text-[#6E675F] group-hover:text-[#1C1917]"
        }`}
        aria-label="English"
      >
        EN
      </button>

      {/* Amharic Pill */}
      <button
        type="button"
        onClick={(e) => handleSideClick("am", e)}
        className={`relative z-10 px-3 py-1 text-xs font-bold rounded-full transition-colors duration-200 cursor-pointer focus:outline-none ${
          language === "am"
            ? "text-white"
            : "text-[#6E675F] group-hover:text-[#1C1917]"
        }`}
        aria-label="አማርኛ"
      >
        አማ
      </button>
    </div>
  );
};

export default LanguageToggle;
