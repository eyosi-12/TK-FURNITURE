import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * ScrollToTop ensures that whenever the route or query parameters change,
 * the window scrolls directly to the very top, preventing new pages from
 * opening at the footer or bottom of the page.
 */
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Instantly reset scroll to top
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    } catch {
      window.scrollTo(0, 0);
    }

    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
