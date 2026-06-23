import { getCollection } from "astro:content";
import { SITE_ORIGIN } from "../../constants";

function toAbsolute(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function GET() {
  const events = await getCollection("events");

  const data = events
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((e) => ({
      slug: e.id,
      title: e.data.title,
      role: e.data.role,
      date: e.data.date.toISOString(),
      city: e.data.city,
      description: e.data.description,
      organizer: e.data.organizer,
      photos: (e.data.photos ?? []).map(toAbsolute),
      links: Object.fromEntries(
        Object.entries(e.data.links ?? {}).map(([k, v]) => [
          k,
          toAbsolute(v as string),
        ]),
      ),
    }));

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
