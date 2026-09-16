import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import useProducts from "../Hooks/useProducts";
import ProductCard from "../components/ProductCard";
import InquiryModal from "../components/InquiryModal";
import Loader from "../components/Loader";
import { 
  ArrowLeft, 
  Send, 
  Share2, 
  Check, 
  Sparkles, 
  Ruler, 
  Layers, 
  Clock 
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading, error } = useProducts();

  const product = Array.isArray(products)
    ? products.find((p) => String(p.id) === String(id))
    : null;

  // Active gallery image state
  const [activeImage, setActiveImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [product, id]);

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#1C1917]">Product Not Found</h2>
        <p className="text-sm text-[#78716C]">The piece you are looking for may have been retired or moved.</p>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#8A5333] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#6E3F24] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  // Related products from same category or fallback (3 cards matching wireframe)
  const relatedProducts = Array.isArray(products)
    ? products
        .filter((p) => p.id !== product.id && p.category === product.category)
        .slice(0, 3)
    : [];

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${product.name} from TK Furniture Addis Ababa:`;

    if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    } else {
      navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const formattedPrice = product.price
    ? `ETB ${product.price.toLocaleString()}`
    : "Price on Request";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      {/* Breadcrumb Navigation - Wireframe Figure 7 */}
      <nav className="text-xs text-[#78716C] flex items-center gap-2 flex-wrap">
        <Link to="/" className="hover:text-[#1C1917]">Home</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-[#1C1917]">Catalog</Link>
        <span>/</span>
        <Link 
          to={`/catalog?category=${encodeURIComponent(product.category)}`} 
          className="hover:text-[#1C1917]"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#1C1917] font-semibold">{product.name}</span>
      </nav>

      {/* Main Two-Column Layout - Wireframe Figure 7 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Large Product Imagery + Thumbnail Strip */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Product Image */}
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-[#F3EFEA] border border-[#E7E2D9] shadow-sm">
            <img
              src={activeImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-[#FAF8F5]/90 backdrop-blur-xs text-xs font-semibold text-[#1C1917] px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                {product.category}
              </span>
            </div>
          </div>

          {/* Thumbnail Strip Underneath - Wireframe Figure 7 */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {product.gallery.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none ${
                    activeImage === imgUrl
                      ? "border-[#8A5333] shadow-md scale-[1.02]"
                      : "border-[#E7E2D9] opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Price, Specs Box, Inquiry CTA, Share - Wireframe Figure 7 */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
              {product.name}
            </h1>
            <p className="text-2xl sm:text-3xl font-bold text-[#8A5333]">
              {formattedPrice}
            </p>
          </div>

          {/* Short Product Description */}
          <p className="text-[#57534E] text-base leading-relaxed">
            {product.description}
          </p>

          {/* Specifications Box - Wireframe Figure 7 */}
          <div className="bg-white border border-[#E7E2D9] rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#78716C]">
              Specifications & Details
            </h3>

            <div className="space-y-3 text-sm text-[#44403C]">
              {/* Dimensions */}
              <div className="flex items-start gap-3">
                <Ruler className="w-4 h-4 text-[#8A5333] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-[#1C1917]">Dimensions: </span>
                  <span>{product.dimensions}</span>
                </div>
              </div>

              {/* Material */}
              <div className="flex items-start gap-3">
                <Layers className="w-4 h-4 text-[#8A5333] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-[#1C1917]">Material: </span>
                  <span>{product.material}</span>
                </div>
              </div>

              {/* Available Colors with interactive swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="pt-1">
                  <span className="font-semibold text-[#1C1917] block mb-2">
                    Available Finishes / Colors:
                  </span>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        title={color.name}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center focus:outline-none ${
                          selectedColor?.name === color.name
                            ? "border-[#1C1917] scale-110 shadow-sm"
                            : "border-white/80 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {selectedColor?.name === color.name && (
                          <Check className={`w-3.5 h-3.5 ${
                            ["#FAF8F5", "#D8CAB8", "#E6DBC9", "#DFD3C3", "#CBB292"].includes(color.hex)
                              ? "text-black"
                              : "text-white"
                          }`} />
                        )}
                      </button>
                    ))}
                    {selectedColor && (
                      <span className="text-xs text-[#78716C] italic font-medium ml-1">
                        {selectedColor.name}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Lead Time */}
              <div className="flex items-start gap-3 pt-1">
                <Clock className="w-4 h-4 text-[#8A5333] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-[#1C1917]">Lead Time: </span>
                  <span>{product.leadTime || "2-3 weeks (Addis Ababa Delivery)"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Call To Action - Wireframe Figure 7 */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="w-full py-4 px-6 bg-[#8A5333] hover:bg-[#6E3F24] text-white font-semibold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Inquire About This Piece</span>
            </button>

            <Link
              to={`/contact?subject=${encodeURIComponent(`Inquiry: ${product.name}`)}`}
              className="w-full py-3 px-6 bg-white hover:bg-[#F3EFEA] text-[#1C1917] border border-[#D6D3D1] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <span>Visit Showroom to View Samples</span>
            </Link>
          </div>

          {/* Social Share Strip - Wireframe Figure 7: Share: [FB] [IG] [WhatsApp] */}
          <div className="pt-4 border-t border-[#E7E2D9] flex items-center justify-between text-xs text-[#78716C]">
            <span className="font-bold uppercase tracking-wider text-[#1C1917]">
              Share This Piece:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleShare("facebook")}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-[#D6D3D1] text-[#1C1917] hover:border-[#8A5333] hover:text-[#8A5333] font-semibold transition-colors"
              >
                FB
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-[#D6D3D1] text-[#1C1917] hover:border-[#8A5333] hover:text-[#8A5333] font-semibold transition-colors"
                title="Copy Link for Instagram / Direct share"
              >
                {shareCopied ? "Copied!" : "IG / Link"}
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-[#D6D3D1] text-[#1C1917] hover:border-[#8A5333] hover:text-[#8A5333] font-semibold transition-colors"
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section - Wireframe Figure 7 (3 cards) */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#E7E2D9] space-y-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-[#1C1917]">
              Related Products
            </h2>
            <Link
              to={`/catalog?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-semibold uppercase tracking-wider text-[#8A5333] hover:text-[#6E3F24]"
            >
              View More in {product.category}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                item={relProduct}
                buttonText="View"
              />
            ))}
          </div>
        </section>
      )}

      {/* Direct Inquiry Modal Popup */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        itemName={product.name}
        itemCategory={product.category}
        itemPrice={formattedPrice}
      />
    </div>
  );
};

export default ProductDetails;
