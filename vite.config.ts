import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    dedupe: ["svelte"], // important for libs that ship source
  },
  optimizeDeps: {
    exclude: ["@threlte/core"], // <-- prevents esbuild from touching it
  },
  ssr: {
    noExternal: ["@threlte/core"], // if you do any SSR, keep it unbundled
  },
});
