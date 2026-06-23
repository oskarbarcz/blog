import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import satoriLib from "satori";
import fs from "node:fs";
import path from "node:path";
import { BRAND_COLOR } from "../constants";

const satori = satoriLib as unknown as (
  jsx: any,
  options: any,
) => Promise<string>;

export const GET: APIRoute = async () => {
  const robotoSlabBold = fs.readFileSync(
    path.resolve("./src/assets/fonts/RobotoSlab-Bold.ttf"),
  );

  const root = {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111",
        fontFamily: "Roboto Slab",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              width: "150px",
              height: "12px",
              backgroundColor: BRAND_COLOR,
              marginBottom: "48px",
              display: "flex",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: "84px",
              fontWeight: 700,
              color: BRAND_COLOR,
              display: "flex",
            },
            children: "blog.barcz.me",
          },
        },
      ],
    },
  };

  const svg = await satori(root, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Roboto Slab",
        data: robotoSlabBold,
        weight: 700,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg);
  const pngBuffer = resvg.render().asPng();

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
