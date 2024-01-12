import { useEffect } from "react";

const ScrollToTop = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return null;
};

export default ScrollToTop;
