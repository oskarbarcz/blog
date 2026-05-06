import { Resvg } from "@resvg/resvg-js";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import satoriLib from "satori";
import fs from "node:fs";
import path from "node:path";
import { BRAND_COLOR } from "../../../constants";
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

// `entry.data.coverImage` is an `ImageMetadata` (post-processed URL), not a
// filesystem path — to embed the cover into the OG PNG we need raw bytes, so
// we re-open the trip's markdown and read the `coverImage:` frontmatter line
// to resolve the original file relative to the .md.
function loadCoverDataUri(slug: string): string | null {
  const mdDir = path.resolve("./src/content/trips");
  const mdPath = path.join(mdDir, `${slug}.md`);
  try {
    const md = fs.readFileSync(mdPath, "utf-8");
    const match = md.match(/^coverImage:\s*(.+)$/m);
    if (!match) return null;
    const rel = match[1].trim().replace(/^["']|["']$/g, "");
    const coverPath = path.resolve(mdDir, rel);
    const buf = fs.readFileSync(coverPath);
    const ext = path.extname(coverPath).toLowerCase().slice(1);
    const mime =
      ext === "jpg" || ext === "jpeg"
        ? "image/jpeg"
        : ext === "png"
          ? "image/png"
          : ext === "webp"
            ? "image/webp"
            : "image/jpeg";
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch (e) {
    console.error(`OG: failed to load cover for ${slug}`, e);
    return null;
  }
}

// Short DD.MM.YYYY range — drops the redundant parts when start and end share
// a year and/or month so the OG card stays uncluttered.
function shortDateRange(start: Date, end?: Date): string {
  const dd = (d: Date) => String(d.getDate()).padStart(2, "0");
  const mm = (d: Date) => String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = (d: Date) => String(d.getFullYear());
  const startFull = `${dd(start)}.${mm(start)}.${yyyy(start)}`;
  if (!end || start.toDateString() === end.toDateString()) return startFull;
  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();
  if (sameMonth) {
    return `${dd(start)}–${dd(end)}.${mm(end)}.${yyyy(end)}`;
  }
  if (sameYear) {
    return `${dd(start)}.${mm(start)} – ${dd(end)}.${mm(end)}.${yyyy(end)}`;
  }
  return `${startFull} – ${dd(end)}.${mm(end)}.${yyyy(end)}`;
}

// Polish plural: 1 / 2-4 / 5+ with the 12-14 exception.
//   0 → many  ("0 zdjęć")
//   1 → one   ("1 zdjęcie")
//   2-4 → few ("3 zdjęcia")
//   5+ → many ("5 zdjęć")
function pl(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  const lastTwo = n % 100;
  const last = n % 10;
  if (lastTwo >= 12 && lastTwo <= 14) return many;
  if (last >= 2 && last <= 4) return few;
  return many;
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
  const dateRange = shortDateRange(trip.data.startDate, trip.data.endDate);
  const placesLabel = pl(sectionCount, "miejsce", "miejsca", "miejsc");
  const photosLabel = pl(photoCount, "zdjęcie", "zdjęcia", "zdjęć");
  const coverDataUri = loadCoverDataUri(trip.id);

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
        fontFamily: "Roboto Slab",
        position: "relative",
      },
      children: [
        // Cover image as full-bleed background
        coverDataUri
          ? {
              type: "img",
              props: {
                src: coverDataUri,
                style: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                },
              },
            }
          : null,
        // Dark gradient overlay so text stays legible on bright covers
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.88) 100%)",
              display: "flex",
            },
          },
        },
        // Top-left eyebrow
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "50px",
              left: "60px",
              fontSize: "22px",
              fontWeight: 700,
              color: BRAND_COLOR,
              letterSpacing: "8px",
              display: "flex",
            },
            children: "PODRÓŻE",
          },
        },
        // Top-right brand
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "50px",
              right: "60px",
              fontSize: "24px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              display: "flex",
            },
            children: "oskar_blog",
          },
        },
        // Bottom content stack
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
                    width: "90px",
                    height: "5px",
                    backgroundColor: BRAND_COLOR,
                    marginBottom: "24px",
                    display: "flex",
                  },
                },
              },
              // Title — smaller than before
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "52px",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "16px",
                    lineHeight: 1.1,
                    display: "flex",
                    width: "1080px",
                  },
                  children: title,
                },
              },
              // Excerpt — slightly smaller
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "24px",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.82)",
                    marginBottom: "22px",
                    lineHeight: 1.35,
                    display: "flex",
                    width: "1000px",
                  },
                  children: excerpt,
                },
              },
              // Meta line: short date · places · photos
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    fontSize: "22px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.92)",
                  },
                  children: [
                    { type: "div", props: { children: dateRange } },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: BRAND_COLOR,
                          margin: "0 14px",
                          display: "flex",
                        },
                        children: "·",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        children: `${sectionCount} ${placesLabel}`,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: BRAND_COLOR,
                          margin: "0 14px",
                          display: "flex",
                        },
                        children: "·",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        children: `${photoCount} ${photosLabel}`,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ].filter(Boolean),
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
