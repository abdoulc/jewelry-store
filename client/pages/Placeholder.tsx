import { useLocation } from "react-router-dom";

export default function Placeholder() {
  const { pathname } = useLocation();
  const title = pathname
    .replace(/^\//, "")
    .split("/")[0]
    .replace(/-/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase()) || "Home";

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-brandSerif text-4xl md:text-5xl">{title}</h1>
        <p className="mt-4 text-foreground/70">
          This page is a placeholder. Continue prompting to fill in the content and functionality you want here.
        </p>
      </div>
    </div>
  );
}
