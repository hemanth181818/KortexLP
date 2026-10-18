import { StrictMode, type ReactElement } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { trackView } from "@/lib/track";
import { graph } from "@/lib/seo";
import "./index.css";

/**
 * The home page renders straight away, as before. Every other path loads the
 * content pages' chunk first and only then renders, so a prerendered page keeps
 * its words on screen until React replaces them with the same words.
 */
const path = location.pathname.replace(/\/index\.html$/, "").replace(/\/+$/, "") || "/";

function mount(node: ReactElement) {
  createRoot(document.getElementById("root")!).render(<StrictMode>{node}</StrictMode>);
}

if (path === "/") {
  mount(<App />);
} else {
  import("@/pages/site").then(({ resolveRoute, ROUTE_PATHS }) => {
    const { head, element } = resolveRoute(path);
    // Read by scripts/prerender.mjs; harmless for visitors.
    window.__KORTEX_PAGE__ = { ...head, graph: graph(head) };
    window.__KORTEX_ROUTES__ = ROUTE_PATHS;
    document.title = head.title;
    mount(element);
  });
}

trackView();
