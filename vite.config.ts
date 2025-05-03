import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [react(), tailwindcss(), viteSingleFile()],
    server: {
      proxy: {
        "/api": process.env.VITE_DEV_URL || "",
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
        // '@kit': path.resolve(__dirname, '../sn-react-shadcn/src'), //- uncomment when using npm link
        // "sn-shadcn-kit": path.resolve(__dirname, "../sn-react-shadcn/src"), //- uncomment when using npm link
      },
    },
    // optimizeDeps: { //- uncomment when using npm link
    //   exclude: ["sn-shadcn-kit"],
    // },
  };
});