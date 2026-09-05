import React, { useState } from "react";
import { X, CheckCircle, Send } from "lucide-react";

const InquiryModal = ({ isOpen, onClose, itemName = "", itemCategory = "", itemPrice = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredColor: "",
    message: `Hi, I am interested in inquiring about ${itemName ? `the "${itemName}"` : "furniture"} for my project in Addis Ababa. Please let me know current availability and custom sizing options.`,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-lg rounded-2xl shadow-2xl border border-[#E7E2D9] overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E7E2D9] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A5333]">
              Direct In-Studio Inquiry
            </span>
            <h3 className="text-xl font-bold text-[#1C1917] mt-0.5">
              {itemName ? `Inquire: ${itemName}` : "Inquire About Furniture"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#78716C] hover:bg-[#F3EFEA] hover:text-[#1C1917] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-[#1C1917]">Inquiry Received</h4>
                <p className="text-sm text-[#57534E] max-w-xs mx-auto">
                  Thank you! Our studio team on Bole Road will contact you via phone or email within 24 hours.
                </p>
              </div>
              <div className="bg-[#F3EFEA] p-4 rounded-xl text-left text-xs space-y-1 text-[#44403C] max-w-xs mx-auto">
                <p><span className="font-semibold">Piece:</span> {itemName}</p>
                <p><span className="font-semibold">Contact:</span> {formData.phone || formData.email}</p>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#8A5333] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {itemPrice && (
                <div className="bg-[#F3EFEA] p-3 rounded-lg flex items-center justify-between text-xs">
                  <span className="text-[#57534E]">Estimated Reference:</span>
                  <span className="font-bold text-[#1C1917]">{itemPrice}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Almaz Tadesse"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D6D3D1] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:border-[#8A5333] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+251 9XX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D6D3D1] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:border-[#8A5333] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D6D3D1] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:border-[#8A5333] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1">
                  Inquiry Message / Custom Dimensions
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-[#D6D3D1] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:border-[#8A5333] transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#78716C] hover:text-[#1C1917] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8A5333] hover:bg-[#6E3F24] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
