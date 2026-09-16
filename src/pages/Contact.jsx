import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Map,
  Image,
  ArrowUpRight
} from "lucide-react";
import LocationMap from "../components/LocationMap";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const subjectParam = searchParams.get("subject") || "";
  const typeParam = searchParams.get("type") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    projectType: typeParam || "Living Room",
    message: subjectParam ? `Hi, I would like to inquire about ${subjectParam}.` : "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mediaTab, setMediaTab] = useState("map");

  useEffect(() => {
    if (subjectParam) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi, I am interested in inquiring about ${subjectParam}. Please provide details regarding lead times, customization, and pricing.`,
      }));
    }
  }, [subjectParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const projectTypes = [
    "Living Room",
    "Bedroom",
    "Kitchen & Dining",
    "Office / Commercial",
    "Full Apartment / Villa",
    "Custom Joinery Build",
    "Bulk / Interior Designer Sourcing",
    "General Inquiry",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Breadcrumb Navigation - Wireframe Figure 9 */}
      <nav className="text-xs text-[#78716C] flex items-center gap-2">
        <Link to="/" className="hover:text-[#1C1917]">Home</Link>
        <span>/</span>
        <span className="text-[#1C1917] font-semibold">Contact</span>
      </nav>

      {/* Title & Subtitle - Wireframe Figure 9 */}
      <div className="space-y-2 border-b border-[#E7E2D9] pb-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-[#1C1917]">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-[#57534E]">
          Have a project in mind? Send us a message.
        </p>
      </div>

      {/* Split Grid: Inquiry Form (Left) & Showroom Info/Map (Right) - Wireframe Figure 9 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E7E2D9] p-6 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#1C1917]">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-sm text-[#57534E] max-w-md mx-auto leading-relaxed">
                  Your inquiry has been delivered directly to our Addis Ababa studio team. We will review your project requirements and connect with you shortly.
                </p>
              </div>

              <div className="bg-[#FAF8F5] border border-[#E7E2D9] p-5 rounded-2xl max-w-md mx-auto text-left text-xs space-y-2 text-[#44403C]">
                <p><span className="font-semibold text-[#1C1917]">Client:</span> {formData.fullName}</p>
                <p><span className="font-semibold text-[#1C1917]">Phone:</span> {formData.phone}</p>
                <p><span className="font-semibold text-[#1C1917]">Project Type:</span> {formData.projectType}</p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      phone: "",
                      email: "",
                      projectType: "Living Room",
                      message: "",
                    });
                  }}
                  className="px-6 py-2.5 bg-[#8A5333] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#6E3F24] transition-colors"
                >
                  Send Another Inquiry
                </button>
                <Link
                  to="/catalog"
                  className="px-6 py-2.5 bg-white border border-[#D6D3D1] text-[#1C1917] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#F3EFEA] transition-colors"
                >
                  Browse Catalog
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eyosias Belay"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D6D3D1] rounded-xl text-sm text-[#1C1917] focus:outline-none focus:border-[#8A5333] focus:bg-white transition-all"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+251 9XX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D6D3D1] rounded-xl text-sm text-[#1C1917] focus:outline-none focus:border-[#8A5333] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D6D3D1] rounded-xl text-sm text-[#1C1917] focus:outline-none focus:border-[#8A5333] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Project Type Dropdown - Wireframe Figure 9 */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-2">
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D6D3D1] rounded-xl text-sm text-[#1C1917] focus:outline-none focus:border-[#8A5333] focus:bg-white transition-all cursor-pointer"
                >
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] mb-2">
                  Message / Room Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about the space you are furnishing, required dimensions, or timelines..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D6D3D1] rounded-xl text-sm text-[#1C1917] focus:outline-none focus:border-[#8A5333] focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Send Message CTA Button - Wireframe Figure 9 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-[#8A5333] hover:bg-[#6E3F24] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Sending Inquiry..." : "Send Message"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Showroom Visual, Address, Hours & Social - Wireframe Figure 9 */}
        <div className="lg:col-span-5 space-y-6">
          {/* View Mode Switcher Header */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 p-1 bg-[#F1ECE4] rounded-2xl border border-[#E7E2D9]">
              <button
                type="button"
                onClick={() => setMediaTab("map")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mediaTab === "map"
                    ? "bg-white text-[#8A5333] shadow-xs"
                    : "text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Interactive Map</span>
              </button>
              <button
                type="button"
                onClick={() => setMediaTab("photo")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mediaTab === "photo"
                    ? "bg-white text-[#8A5333] shadow-xs"
                    : "text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                <Image className="w-3.5 h-3.5" />
                <span>Showroom Photo</span>
              </button>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=9.0002,38.8089"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#8A5333] hover:text-[#6E3F24] inline-flex items-center gap-1 transition-colors"
            >
              <span>Get Directions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Showroom Photo / Interactive Map Card */}
          <div className="h-[360px] sm:h-[400px] w-full">
            {mediaTab === "map" ? (
              <LocationMap className="h-full" />
            ) : (
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-md border border-[#E7E2D9] bg-[#EAE5DC]">
                <img
                  src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80"
                  alt="TK Furniture Showroom Addis Ababa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5DFD5]">
                    Showroom & Design Studio
                  </span>
                  <p className="text-sm font-semibold">Unity University Campus Area, Gerji</p>
                  <p className="text-xs text-[#D6D3D1]">Addis Ababa, Ethiopia</p>
                </div>
              </div>
            )}
          </div>

          {/* Visit Our Showroom Details */}
          <div className="bg-white rounded-3xl border border-[#E7E2D9] p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-xl font-bold text-[#1C1917]">
              Visit Our Showroom
            </h2>

            <div className="space-y-4 text-sm text-[#57534E]">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#8A5333] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#1C1917]">Studio & Showroom Address</p>
                  <p>Unity University Campus Area, Gerji, Addis Ababa, Ethiopia</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className="inline-flex items-center text-[11px] font-mono text-[#78716C] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E7E2D9]">
                      9.0002° N, 38.8089° E
                    </span>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=9.0002,38.8089"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#8A5333] hover:underline"
                    >
                      <span>Open in Maps</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#8A5333] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#1C1917]">Telephone</p>
                  <p>+251 911 234 567 / +251 922 890 123</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#8A5333] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#1C1917]">Direct Email</p>
                  <p>hello@tkfurniture.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#8A5333] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#1C1917]">Business Hours</p>
                  <p>Mon–Sat: 9:00 – 18:00</p>
                  <p className="text-xs text-[#78716C] mt-0.5">Sundays: By appointment for custom design consultations</p>
                </div>
              </div>
            </div>

            {/* Social Links - Wireframe Figure 9: Follow us: [FB] [IG] [TikTok] */}
            <div className="pt-4 border-t border-[#F3EFEA] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
                Follow Us
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#D6D3D1] hover:border-[#8A5333] text-xs font-bold text-[#1C1917]"
                >
                  FB
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#D6D3D1] hover:border-[#8A5333] text-xs font-bold text-[#1C1917]"
                >
                  IG
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#D6D3D1] hover:border-[#8A5333] text-xs font-bold text-[#1C1917]"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
