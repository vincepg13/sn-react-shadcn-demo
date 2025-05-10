/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const devUrl = env.VITE_DEV_URL;
  const snCookie = env.VITE_SPOOF_COOKIE;

  const injectCookie = (proxy: any) => {
    proxy.on("proxyReq", (proxyReq: any) => {
      if (snCookie) {
        proxyReq.setHeader("Cookie", snCookie);
      }
    });
  };
  
  return {
    plugins: [react(), tailwindcss(), viteSingleFile()],
    server: {
      proxy: {
        "/api": {
          target: devUrl,
          changeOrigin: true,
          secure: false,
          configure: injectCookie,
        },
        "/angular.do": {
          target: devUrl,
          changeOrigin: true,
          secure: false,
          configure: injectCookie,
        },
        "/sys_script.do": {
          target: devUrl,
          changeOrigin: true,
          secure: false,
          configure: injectCookie,
        },
      },
      fs: {
        allow: [".."],
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
        // "@kit": path.resolve(__dirname, "../sn-react-shadcn/src"), //dev only
        // "sn-shadcn-kit": path.resolve(__dirname, "../sn-react-shadcn/src"), //dev only
      },
    },
    optimizeDeps: {
      // exclude: ["sn-shadcn-kit"], //dev only
    },
  };
});
