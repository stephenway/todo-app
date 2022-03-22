import { useEffect, useState } from "react";

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    function handleViewportResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleViewportResize);
    handleViewportResize();
    return () => window.removeEventListener("resize", handleViewportResize);
  }, []);

  return windowWidth;
}

export default useWindowWidth;
