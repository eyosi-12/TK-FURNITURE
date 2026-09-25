import React from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../Context/LanguageContext";

const Footer = () => {
  const { t, isAmharic } = useLanguage();

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 mt-20 border-t border-[#2E2925]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12 border-b border-[#2E2925]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#0A0D14] border border-[#3B3632] flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src="/tk-logo.jpg"
                  alt="TK Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-wider uppercase block">
                  {isAmharic ? "ቲኬ ፈርኒቸር" : "TK FURNITURE"}
                </span>
                <span className="text-xs text-[#C5A880] tracking-[0.2em] uppercase font-semibold">
                  {t("nav.studioBadge")}
                </span>
              </div>
            </div>
            <p className="text-[#A8A29E] text-base leading-relaxed max-w-sm">
              {t("footer.tagline")}
            </p>
            <div className="pt-2">
              <span className="inline-block text-xs uppercase tracking-wider text-[#A8A29E] bg-[#292524] px-3 py-1.5 rounded-md border border-[#3B3632]">
                {t("footer.showroomLocation")}
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-[#D6D3D1] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>{t("footer.aboutWorkshop")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog"
                  className="text-sm text-[#D6D3D1] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>{t("footer.productCatalog")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-sm text-[#D6D3D1] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>{t("footer.completedProjects")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-[#D6D3D1] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>{t("footer.inquiryContact")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links & Hours Column */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              {t("footer.followUs")}
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#292524] hover:bg-[#8A5333] flex items-center justify-center text-xs font-bold transition-all border border-[#3B3632]"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#292524] hover:bg-[#8A5333] flex items-center justify-center text-xs font-bold transition-all border border-[#3B3632]"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#292524] hover:bg-[#8A5333] flex items-center justify-center text-xs font-bold transition-all border border-[#3B3632]"
                aria-label="TikTok"
              >
                TikTok
              </a>
            </div>
            <div className="pt-2 text-xs text-[#A8A29E] space-y-1">
              <p className="font-medium text-[#D6D3D1]">{t("footer.visitingHours")}</p>
              <p>{t("footer.hoursWeek")}</p>
              <p>{t("footer.hoursSun")}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>{t("footer.copyright")}</p>
          <p className="tracking-wide">{t("footer.designSpec")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
