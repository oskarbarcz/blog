import { readFileSync } from "node:fs";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import flowbiteReact from "flowbite-react/plugin/astro";
import rehypeSlug from "rehype-slug";

const redirects = JSON.parse(
  readFileSync(new URL("./redirects.json", import.meta.url), "utf-8"),
);

export default defineConfig({
  site: "https://blog.barcz.me",
  redirects,
  markdown: {
    processor: unified({ rehypePlugins: [rehypeSlug] }),
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
