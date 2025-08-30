import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-dvh grid place-items-center">
      <div className="text-center p-8">
        <h1 className="font-brandSerif text-6xl mb-4">404</h1>
        <p className="text-base text-foreground/70 mb-6">We couldn't find that page.</p>
        <a href="/" className="inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground">Back home</a>
      </div>
    </div>
  );
};

export default NotFound;
