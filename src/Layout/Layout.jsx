import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { CartProvider } from "../Context/CartContext";
import { LanguageProvider } from "../Context/LanguageContext";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = "pk_test_d29uZHJvdXMtc25haWwtNzAuY2xlcmsuYWNjb3VudHMuZGV2JA";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
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
    </ClerkProvider>
  );
};

export default Layout;
