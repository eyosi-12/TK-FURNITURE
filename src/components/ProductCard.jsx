import React from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../Context/LanguageContext";

const ProductCard = ({ item, buttonText }) => {
  const { localizeProduct, formatPrice, t } = useLanguage();
  const localizedItem = localizeProduct(item) || item;

  const displayButtonText = buttonText || t("home.viewDetails");

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E7E2D9] hover:border-[#8A5333]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3EFEA]">
        <img
          src={localizedItem.image}
          alt={localizedItem.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {/* Category tag */}
        <span className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[11px] font-semibold text-[#1C1917] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
          {localizedItem.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-semibold text-lg text-[#1C1917] group-hover:text-[#8A5333] transition-colors line-clamp-1">
              {localizedItem.name}
            </h3>
          </div>
          <p className="text-xs text-[#78716C] line-clamp-1">
            {localizedItem.material} · {localizedItem.dimensions}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-[#F3EFEA] flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-[#78716C] block uppercase font-medium">
              {t("catalog.startingFrom")}
            </span>
            <span className="text-lg font-bold text-[#1C1917]">
              {formatPrice(localizedItem.price)}
            </span>
          </div>

          <Link
            to={`/catalog/${localizedItem.id}`}
            className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C1917] group-hover:bg-[#8A5333] rounded-lg transition-colors shadow-xs"
          >
            <span>{displayButtonText}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
