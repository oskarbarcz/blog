import { Resvg } from "@resvg/resvg-js";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import satoriLib from "satori";
import fs from "node:fs";
import path from "node:path";
import { AUTHOR_NAME, AUTHOR_PHOTO, BRAND_COLOR } from "../../../constants";
const satori = satoriLib as unknown as (
  // “anything in, promise of string out”
  jsx: any,
  options: any,
) => Promise<string>;

export async function getStaticPaths() {
  const trips = await getCollection("trips");
  return trips.map((trip) => ({
    params: { slug: trip.id },
    props: { trip },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { trip } = props as { trip: any };

  const robotoSlabBold = fs.readFileSync(
    path.resolve("./src/assets/fonts/RobotoSlab-Bold.ttf"),
  );
  const robotoSlabRegular = fs.readFileSync(
    path.resolve("./src/assets/fonts/RobotoSlab-Regular.ttf"),
  );

  const title = trip.data.title as string;
  const excerpt = trip.data.excerpt as string;
  const sectionCount = trip.data.sections.length as number;
  const photoCount = trip.data.sections.reduce(
    (n: number, s: { images: unknown[] }) => n + s.images.length,
    0,
  );

  const startFormatted = trip.data.startDate.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const endFormatted: string | undefined =
    trip.data.endDate?.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  const dateRange =
    endFormatted && endFormatted !== startFormatted
      ? `${startFormatted} – ${endFormatted}`
      : startFormatted;

  // Author photo is a remote URL we can fetch; the local cover image isn't
  // trivially accessible from a static API route, so the OG card uses a solid
  // brand-tinted gradient instead. Title + dates + counts carry the message.
  async function fetchImageAsBase64(url: string): Promise<string> {
    if (!url) return "";
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const mimeType = response.headers.get("content-type") || "image/jpeg";
      return `data:${mimeType};base64,${base64}`;
    } catch (e) {
      console.error(`Failed to fetch image: ${url}`, e);
      return "";
    }
  }

  const authorPhotoData = await fetchImageAsBase64(AUTHOR_PHOTO || "");

  const root = {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        backgroundColor: "#0f1f17",
        backgroundImage: `linear-gradient(135deg, ${BRAND_COLOR} 0%, #0f1f17 60%)`,
        fontFamily: "Roboto Slab",
        position: "relative",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "60px",
              left: "60px",
              fontSize: "44px",
              fontWeight: 700,
              color: "white",
              display: "flex",
              opacity: 0.9,
              letterSpacing: "2px",
            },
            children: "PODRÓŻE",
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "60px",
              right: "60px",
              fontSize: "32px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              display: "flex",
            },
            children: "oskar_blog",
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              padding: "60px",
              position: "relative",
              width: "100%",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    width: "150px",
                    height: "12px",
                    backgroundColor: "white",
                    marginBottom: "40px",
                    display: "flex",
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "76px",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "24px",
                    lineHeight: 1.1,
                    display: "flex",
                  },
                  children: title,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "30px",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.85)",
                    marginBottom: "30px",
                    lineHeight: 1.3,
                    display: "flex",
                    maxWidth: "1080px",
                  },
                  children: excerpt,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                  },
                  children: [
                    authorPhotoData
                      ? {
                          type: "img",
                          props: {
                            src: authorPhotoData,
                            style: {
                              width: "72px",
                              height: "72px",
                              borderRadius: "36px",
                              marginRight: "20px",
                              objectFit: "cover",
                            },
                          },
                        }
                      : null,
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "36px",
                          fontWeight: 400,
                          color: "rgba(255, 255, 255, 0.95)",
                          display: "flex",
                        },
                        children: [
                          { type: "div", props: { children: AUTHOR_NAME } },
                          {
                            type: "div",
                            props: {
                              style: {
                                color: "white",
                                margin: "0 24px",
                                opacity: 0.6,
                              },
                              children: "//",
                            },
                          },
                          { type: "div", props: { children: dateRange } },
                          {
                            type: "div",
                            props: {
                              style: {
                                color: "white",
                                margin: "0 24px",
                                opacity: 0.6,
                              },
                              children: "//",
                            },
                          },
                          {
                            type: "div",
                            props: {
                              children: `${sectionCount} miejsc · ${photoCount} zdjęć`,
                            },
                          },
                        ],
                      },
                    },
                  ].filter(Boolean),
                },
              },
            ],
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
        data: robotoSlabRegular,
        weight: 400,
        style: "normal",
      },
      {
        name: "Roboto Slab",
        data: robotoSlabBold,
        weight: 700,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  const body = new Uint8Array(pngBuffer);

  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
