import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

const buildPathFromLocation = (pathname: string, search: string, hash: string) => {
  return `${pathname}${search}${hash}`;
};

const RoutePageViewTracker = () => {
  const location = useLocation();
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = buildPathFromLocation(location.pathname, location.search, location.hash);

    if (lastTrackedPathRef.current === currentPath) {
      return;
    }

    lastTrackedPathRef.current = currentPath;
    const timeoutId = window.setTimeout(() => {
      trackPageView(currentPath, document.title);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default RoutePageViewTracker;
