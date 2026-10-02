import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { CartProvider } from "../Context/CartContext";
import { LanguageProvider } from "../Context/LanguageContext";

const Layout = () => {
  const location = useLocation();

  return (
    <LanguageProvider>
      <CartProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main key={location.pathname} className="flex-1 animate-page-flow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
};

export default Layout;
