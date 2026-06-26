import { readFileSync } from "node:fs";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { satteri, satteriHeadingIdsPlugin } from "@astrojs/markdown-satteri";
import flowbiteReact from "flowbite-react/plugin/astro";

const redirects = JSON.parse(
  readFileSync(new URL("./redirects.json", import.meta.url), "utf-8"),
);

export default defineConfig({
  site: "https://blog.barcz.me",
  redirects,
  markdown: {
    processor: satteri({ hastPlugins: [satteriHeadingIdsPlugin()] }),
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [react(), flowbiteReact(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
