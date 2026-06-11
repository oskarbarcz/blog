import { getCollection } from "astro:content";
import {
  SITE_NAME,
  SITE_ORIGIN,
  DEFAULT_SITE_DESCRIPTION,
  HOMEPAGE_DESCRIPTION,
  ARTICLES_PAGE_DESCRIPTION,
  EVENTS_PAGE_DESCRIPTION,
  TRIPS_PAGE_DESCRIPTION,
  SOCIAL_LINKS,
  AUTHOR_BIO,
} from "../constants";

export async function GET() {
  const articles = await getCollection("articles");
  const trips = await getCollection("trips");

  const sortedArticles = articles.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  const sortedTrips = trips.sort(
    (a, b) => b.data.startDate.getTime() - a.data.startDate.getTime(),
  );

  let content = `# ${SITE_NAME}\n\n`;
  content += `> ${DEFAULT_SITE_DESCRIPTION}\n\n`;

  content += `## Main Pages\n\n`;
  content += `- [Home](${SITE_ORIGIN}): ${HOMEPAGE_DESCRIPTION}\n`;
  content += `- [Articles](${SITE_ORIGIN}/articles): ${ARTICLES_PAGE_DESCRIPTION}\n`;
  content += `- [Trips](${SITE_ORIGIN}/trips): ${TRIPS_PAGE_DESCRIPTION}\n`;
  content += `- [Events](${SITE_ORIGIN}/events): ${EVENTS_PAGE_DESCRIPTION}\n\n`;

  content += `## API\n\n`;
  content += `- [Events JSON](${SITE_ORIGIN}/api/events): Machine-readable JSON feed of all events.\n\n`;

  content += `## Articles\n\n`;
  sortedArticles.forEach((article) => {
    // Sanitize excerpt: remove newlines and extra spaces
    const excerpt = article.data.excerpt.replace(/\s+/g, " ").trim();
    content += `- [${article.data.title}](${SITE_ORIGIN}/articles/${article.id}): ${excerpt}\n`;
  });

  if (sortedTrips.length > 0) {
    content += `\n## Trips\n\n`;
    sortedTrips.forEach((trip) => {
      const excerpt = trip.data.excerpt.replace(/\s+/g, " ").trim();
      content += `- [${trip.data.title}](${SITE_ORIGIN}/trips/${trip.id}): ${excerpt}\n`;
    });
  }

  content += `\n## Social Links\n\n`;
  content += `- [LinkedIn](${SOCIAL_LINKS.linkedin})\n`;
  content += `- [GitHub](${SOCIAL_LINKS.github})\n`;
  content += `- [Facebook](${SOCIAL_LINKS.facebook})\n`;
  content += `- [Instagram](${SOCIAL_LINKS.instagram})\n`;

  content += `\n## About the Author\n\n`;
  content += `${AUTHOR_BIO}\n`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
