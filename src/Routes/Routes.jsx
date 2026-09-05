import React from "react";
import { createBrowserRouter } from "react-router";

import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Projects from "../pages/Projects";
import ProjectDetail from "../pages/ProjectDetail";
import Contact from "../pages/Contact";
import ErrorPage from "../pages/ErrorPage";
import Whislist from "../pages/Whislist";
import Cart from "../pages/Cart";
import Payment from "../pages/Payment";
import OrderSuccess from "../pages/OrderSuccess";
import Orders from "../pages/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/catalog", element: <Products /> },
      { path: "/catalog/:id", element: <ProductDetails /> },
      { path: "/product", element: <Products /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:id", element: <ProjectDetail /> },
      { path: "/contact", element: <Contact /> },
      // Graceful fallback for prior e-commerce links
      { path: "/whislist", element: <Whislist /> },
      { path: "/cart", element: <Cart /> },
      { path: "/payment", element: <Payment /> },
      { path: "/order-success", element: <OrderSuccess /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
]);

export default router;
