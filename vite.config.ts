import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { execSync } from "child_process";

/** The day files last changed in git, so a page's dateModified moves only when its words do. */
const lastChanged = (paths: string) => {
  try {
    return execSync(`git log -1 --format=%cs -- ${paths}`, { encoding: "utf8" }).trim() || new Date().toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
};

export default defineConfig({
  server: {
    host: "::",
    port: 3010,
  },
  plugins: [react()],
  define: {
    __CONTENT_UPDATED__: JSON.stringify(lastChanged("src/content src/pages/site.tsx src/components/site")),
    __HOME_UPDATED__: JSON.stringify(lastChanged("index.html src/pages/Landing.tsx src/components/lp src/content/faq.json")),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["framer-motion"],
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
