import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X, ArrowUpRight, Compass } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Catalog", path: "/catalog" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E2D9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo - Wireframe [ LOGO ] */}
        <Link 
          to="/" 
          onClick={closeMenu}
          className="group flex flex-col items-start focus:outline-none"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-wider text-[#1C1917] group-hover:text-[#8A5333] transition-colors uppercase">
            TK FURNITURE
          </span>
          <span className="text-[10px] tracking-[0.25em] text-[#8A5333] font-medium uppercase -mt-0.5">
            Addis Ababa · Studio
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#1C1917] text-[#FAF8F5] shadow-sm"
                    : "text-[#57534E] hover:text-[#1C1917] hover:bg-[#EFEAE2]"
                }`}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#8A5333] hover:bg-[#6E3F24] rounded-full transition-all shadow-sm hover:shadow"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#1C1917] hover:bg-[#EFEAE2] transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E7E2D9] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "bg-[#1C1917] text-[#FAF8F5]"
                    : "text-[#44403C] hover:bg-[#EFEAE2]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#E7E2D9]">
            <Link
              to="/contact"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-[#8A5333] rounded-lg shadow"
            >
              <span>Inquire / Visit Showroom</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
