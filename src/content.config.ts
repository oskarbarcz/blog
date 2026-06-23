import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import z from "zod";

const articleSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.date(),
  readTime: z.string(),
  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).optional(),
  coverUrl: z.url().optional(),
  reactionaryContext: z.string().optional(),
  language: z.enum(["pl", "en"]).default("pl"),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: articleSchema,
});

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/case-studies" }),
  schema: articleSchema,
});

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    role: z.enum(["guest", "speaker", "panelist", "participant", "organizer"]),
    date: z.date(),
    city: z.string(),
    description: z.string(),
    organizer: z.object({
      name: z.string(),
      logo: z.url().nullable().optional(),
    }),
    photos: z
      .array(
        z.union([
          z.url(),
          z.string().regex(/^(?:\/|\.\/|\.\.\/|[A-Za-z0-9_\-./]+)$/),
        ]),
      )
      .optional()
      .default([]),
    links: z
      .object({
        article: z.union([z.url(), z.string().regex(/^\//)]).optional(),
        youtube: z.url().optional(),
        linkedin: z.url().optional(),
        facebook: z.url().optional(),
        other: z.url().optional(),
      })
      .partial()
      .optional(),
  }),
});

const trips = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/trips" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      startDate: z.date(),
      endDate: z.date().optional(),
      coverImage: image(),
      keywords: z.array(z.string()).optional(),
      sections: z
        .array(
          z.object({
            location: z.object({
              city: z.string(),
              country: z.string(),
            }),
            startDate: z.date(),
            endDate: z.date().optional(),
            content: z.string(),
            images: z.array(image()).min(1),
          }),
        )
        .min(1),
    }),
});

export const collections = { articles, caseStudies, events, trips };
