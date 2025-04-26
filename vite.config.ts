import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc"; // <-- change to swc
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const isProd = mode === "production";

  return {
    base: isProd ? "/api/x_bskyb_react/react/test_app/" : "/",
    plugins: [react(), tailwindcss(), viteSingleFile()],
    server: {
      proxy: {
        "/api": process.env.VITE_DEV_URL || "",
      },
      fs: {
        allow: [".."], // <-- very important
      },
    },
    build: {
      assetsInlineLimit: 10000000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        react: path.resolve("./node_modules/react"),
        "react-dom": path.resolve("./node_modules/react-dom"),
        "@sn-react/shadcn-kit": path.resolve(__dirname, "../sn-data-table/src"),
      },
    },
    optimizeDeps: {
      exclude: ["@sn-react/shadcn-kit"],
    },
  };
});
