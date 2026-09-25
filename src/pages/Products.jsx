import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import useProducts from "../Hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { Filter, RotateCcw, ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useLanguage } from "../Context/LanguageContext";

const Products = () => {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    t,
    localizeCategory,
    localizeSubCategory,
    localizeMaterial,
    localizeProduct,
    formatPrice,
  } = useLanguage();

  // Read URL params
  const categoryParam = searchParams.get("category") || "All";
  const subCategoryParam = searchParams.get("subCategory") || "";

  // Local filter states
  const [selectedRoom, setSelectedRoom] = useState(categoryParam);
  const [selectedSubTypes, setSelectedSubTypes] = useState(
    subCategoryParam ? [subCategoryParam] : []
  );
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [maxPrice, setMaxPrice] = useState(70000);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL changes to local state
  useEffect(() => {
    if (categoryParam) {
      setSelectedRoom(categoryParam);
    }
  }, [categoryParam]);

  const itemsPerPage = 6;

  // Filter option constants matching the wireframe
  const roomOptions = ["All", "Living Room", "Bedroom", "Kitchen", "Office", "Apartment"];

  const subTypeOptions = [
    "Sofas",
    "Armchairs",
    "Coffee Tables",
    "TV Units",
    "Shelving",
    "Dining Tables",
    "Dining Chairs",
    "Beds",
    "Wardrobes",
    "Desks",
    "Patio Sets",
  ];

  const materialOptions = [
    { label: "Wood", value: "Wood" },
    { label: "Fabric", value: "Fabric" },
    { label: "Leather", value: "Leather" },
    { label: "Metal", value: "Metal" },
  ];

  // Toggle Sub-types
  const handleSubTypeToggle = (subType) => {
    setSelectedSubTypes((prev) =>
      prev.includes(subType)
        ? prev.filter((t) => t !== subType)
        : [...prev, subType]
    );
    setCurrentPage(1);
  };

  // Toggle Materials
  const handleMaterialToggle = (mat) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
    setCurrentPage(1);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSelectedRoom("All");
    setSelectedSubTypes([]);
    setSelectedMaterials([]);
    setMaxPrice(70000);
    setSearchQuery("");
    setCurrentPage(1);
    setSearchParams({});
  };

  // Filter Logic with Bilingual Search Support
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return products.filter((p) => {
      // Room / Category Filter
      if (selectedRoom !== "All" && p.category.toLowerCase() !== selectedRoom.toLowerCase()) {
        return false;
      }

      // Sub-type Filter
      if (selectedSubTypes.length > 0 && !selectedSubTypes.includes(p.subCategory)) {
        return false;
      }

      // Material Group Filter
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(p.materialGroup)) {
        return false;
      }

      // Price Range Filter
      if (p.price > maxPrice) {
        return false;
      }

      // Bilingual Search Query (matches English or Amharic)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const localized = localizeProduct(p) || p;
        const matchesName =
          p.name.toLowerCase().includes(query) ||
          (localized.name && localized.name.toLowerCase().includes(query));
        const matchesMaterial =
          p.material.toLowerCase().includes(query) ||
          (localized.material && localized.material.toLowerCase().includes(query));
        const matchesCat =
          p.category.toLowerCase().includes(query) ||
          (localized.category && localized.category.toLowerCase().includes(query));

        if (!matchesName && !matchesMaterial && !matchesCat) return false;
      }

      return true;
    });
  }, [products, selectedRoom, selectedSubTypes, selectedMaterials, maxPrice, searchQuery, localizeProduct]);

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center py-20 text-red-600">Error loading catalog: {error.message}</div>;

  const filterSidebar = (
    <div className="bg-white rounded-2xl border border-[#E7E2D9] p-6 space-y-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-[#F3EFEA]">
        <h3 className="font-bold text-lg text-[#1C1917] flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#8A5333]" />
          <span>{t("catalog.filters")}</span>
        </h3>
        <button
          onClick={handleResetFilters}
          className="text-xs text-[#8A5333] hover:text-[#6E3F24] font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t("catalog.reset")}</span>
        </button>
      </div>

      {/* Room Category */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#78716C] block">
          {t("catalog.roomCategory")}
        </label>
        <div className="space-y-1">
          {roomOptions.map((room) => (
            <button
              key={room}
              onClick={() => {
                setSelectedRoom(room);
                setSearchParams(room === "All" ? {} : { category: room });
                setCurrentPage(1);
              }}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedRoom.toLowerCase() === room.toLowerCase()
                  ? "bg-[#1C1917] text-white"
                  : "text-[#44403C] hover:bg-[#F5F2EC]"
              }`}
            >
              {localizeCategory(room)}
            </button>
          ))}
        </div>
      </div>

      {/* Item Type / Sub-category Checkboxes */}
      <div className="space-y-2 pt-2 border-t border-[#F3EFEA]">
        <label className="text-xs font-bold uppercase tracking-wider text-[#78716C] block">
          {t("catalog.itemType")}
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {subTypeOptions.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2.5 text-xs text-[#44403C] hover:text-[#1C1917] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedSubTypes.includes(type)}
                onChange={() => handleSubTypeToggle(type)}
                className="rounded border-[#D6D3D1] text-[#8A5333] focus:ring-[#8A5333]"
              />
              <span>{localizeSubCategory(type)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3 pt-2 border-t border-[#F3EFEA]">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold uppercase tracking-wider text-[#78716C]">
            {t("catalog.priceRange")}
          </label>
          <span className="font-bold text-[#1C1917]">
            {t("catalog.upTo")} {formatPrice(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="10000"
          max="70000"
          step="2000"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="w-full accent-[#8A5333]"
        />
        <div className="flex justify-between text-[11px] text-[#A8A29E]">
          <span>{formatPrice(10000)}</span>
          <span>{formatPrice(70000)}</span>
        </div>
      </div>

      {/* Material Filter */}
      <div className="space-y-2 pt-2 border-t border-[#F3EFEA]">
        <label className="text-xs font-bold uppercase tracking-wider text-[#78716C] block">
          {t("catalog.material")}
        </label>
        <div className="space-y-2">
          {materialOptions.map((mat) => (
            <label
              key={mat.value}
              className="flex items-center gap-2.5 text-xs text-[#44403C] hover:text-[#1C1917] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedMaterials.includes(mat.value)}
                onChange={() => handleMaterialToggle(mat.value)}
                className="rounded border-[#D6D3D1] text-[#8A5333] focus:ring-[#8A5333]"
              />
              <span>{localizeMaterial(mat.value)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Filters Action Button */}
      <button
        onClick={() => setMobileFilterOpen(false)}
        className="w-full py-2.5 bg-[#8A5333] hover:bg-[#6E3F24] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-xs"
      >
        {t("catalog.applyFilters")}
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-[#78716C] mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-[#1C1917]">{t("nav.home")}</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-[#1C1917]">{t("catalog.breadcrumb")}</Link>
        {selectedRoom !== "All" && (
          <>
            <span>/</span>
            <span className="text-[#1C1917] font-semibold">{localizeCategory(selectedRoom)}</span>
          </>
        )}
      </nav>

      {/* Category Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E7E2D9]">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1917]">
            {selectedRoom === "All" ? t("catalog.completeCatalog") : localizeCategory(selectedRoom)}
          </h1>
          <p className="text-sm text-[#78716C] mt-1">
            {t("catalog.showingPieces", { count: filteredProducts.length })}
          </p>
        </div>

        {/* Search Input & Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t("catalog.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#D6D3D1] rounded-xl text-xs text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#8A5333]"
            />
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden p-2.5 bg-white border border-[#D6D3D1] rounded-xl text-[#1C1917] flex items-center gap-1.5 text-xs font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#8A5333]" />
            <span>{t("catalog.filters")}</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left-hand Filter Panel - Desktop */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-28">
          {filterSidebar}
        </aside>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/50 backdrop-blur-xs">
            <div className="bg-[#FAF8F5] w-full max-w-xs h-full overflow-y-auto p-6 space-y-4 animate-in slide-in-from-right duration-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-[#1C1917]">{t("catalog.filters")}</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-[#78716C] hover:text-[#1C1917]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {filterSidebar}
            </div>
          </div>
        )}

        {/* Right-hand Product Grid */}
        <main className="lg:col-span-9 space-y-10">
          {paginatedProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E7E2D9] p-12 text-center space-y-3">
              <p className="text-lg font-bold text-[#1C1917]">{t("catalog.noPieces")}</p>
              <p className="text-sm text-[#78716C]">{t("catalog.noPiecesDesc")}</p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-5 py-2.5 bg-[#8A5333] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#6E3F24] transition-colors"
              >
                {t("catalog.resetAll")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} item={product} buttonText={t("catalog.view")} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-6 border-t border-[#E7E2D9] flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-[#D6D3D1] bg-white text-[#1C1917] hover:bg-[#F3EFEA] disabled:opacity-40 disabled:pointer-events-none transition-colors"
                aria-label={t("catalog.previous")}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-9 h-9 rounded-lg text-xs font-semibold transition-colors ${
                    currentPage === pageNumber
                      ? "bg-[#1C1917] text-white"
                      : "bg-white border border-[#D6D3D1] text-[#44403C] hover:bg-[#F3EFEA]"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-[#D6D3D1] bg-white text-[#1C1917] hover:bg-[#F3EFEA] disabled:opacity-40 disabled:pointer-events-none transition-colors"
                aria-label={t("catalog.next")}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
