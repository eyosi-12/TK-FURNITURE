import React from "react";
import { useLanguage } from "../Context/LanguageContext";
import { Globe } from "lucide-react";

export const LanguageToggle = ({ variant = "header" }) => {
  const { language, setLanguage, isAmharic } = useLanguage();

  if (variant === "mobile-drawer") {
    return (
      <div className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-2xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-semibold text-[#78716C] px-1">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#8A5333]" />
            <span>ቋንቋ / Language</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#8A5333] font-bold">
            {isAmharic ? "አማርኛ" : "English"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              language === "en"
                ? "bg-[#1C1917] text-white shadow-xs"
                : "bg-white text-[#57534E] hover:text-[#1C1917] border border-[#E7E2D9]"
            }`}
          >
            <span>English</span>
          </button>
          <button
            type="button"
            onClick={() => setLanguage("am")}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              language === "am"
                ? "bg-[#8A5333] text-white shadow-xs"
                : "bg-white text-[#57534E] hover:text-[#1C1917] border border-[#E7E2D9]"
            }`}
          >
            <span>አማርኛ</span>
          </button>
        </div>
      </div>
    );
  }

  // Header pill variant
  return (
    <div
      className="inline-flex items-center bg-[#EFEAE2] p-1 rounded-full border border-[#DCD6CC] shadow-2xs"
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
          language === "en"
            ? "bg-[#1C1917] text-[#FAF8F5] shadow-xs"
            : "text-[#78716C] hover:text-[#1C1917]"
        }`}
        aria-label="Switch to English"
        title="English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("am")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
          language === "am"
            ? "bg-[#8A5333] text-white shadow-xs"
            : "text-[#78716C] hover:text-[#1C1917]"
        }`}
        aria-label="ወደ አማርኛ ቀይር"
        title="አማርኛ (Amharic)"
      >
        አማ
      </button>
    </div>
  );
};

export default LanguageToggle;
