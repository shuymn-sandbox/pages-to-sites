import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      emptyOutDir: false,
      ssr: true,
      rollupOptions: {
        input: ["src/entry.cloudflare-workers.tsx", "@qwik-city-plan"],
      },
    },
  };
});
