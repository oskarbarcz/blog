import { Button } from "flowbite-react";
import { FaArrowRight, FaImages, FaLocationDot } from "react-icons/fa6";
import type { TripCardData } from "./types";

interface TripCardProps {
  trip: TripCardData;
}

const formatDateRange = (start: string, end?: string): string => {
  const startDate = new Date(start);
  const startFmt = startDate.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  if (!end) return startFmt;
  const endDate = new Date(end);
  // Same day → just show the single date; same month/year → trim repeated parts.
  if (startDate.toDateString() === endDate.toDateString()) return startFmt;
  const endFmt = endDate.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `${startFmt} – ${endFmt}`;
};

export default function TripCard({ trip }: TripCardProps) {
  const dateRange = formatDateRange(trip.startDate, trip.endDate);

  return (
    <article className="group hover:shadow-brand-500/10 relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50 dark:backdrop-blur-sm">
      <div className="relative h-44 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <a href={`/trips/${trip.slug}`} className="block h-full w-full">
          <img
            src={trip.coverThumb}
            alt={trip.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </a>
      </div>

      <div className="flex flex-1 flex-col space-y-3 p-5">
        <div className="flex-1 space-y-2">
          <h2 className="group-hover:text-brand-600 dark:group-hover:text-brand-400 text-xl leading-snug font-bold tracking-tight text-gray-900 transition-colors dark:text-white">
            <a href={`/trips/${trip.slug}`}>{trip.title}</a>
          </h2>
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {trip.excerpt}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
          <time dateTime={trip.startDate}>{dateRange}</time>
          <span className="inline-flex items-center gap-1">
            <FaLocationDot className="h-3 w-3" />
            {trip.sectionCount} {trip.sectionCount === 1 ? "miejsce" : "miejsc"}
          </span>
          <span className="inline-flex items-center gap-1">
            <FaImages className="h-3 w-3" />
            {trip.photoCount} zdjęć
          </span>
        </div>

        <div className="flex items-center justify-end border-t border-gray-200 pt-3 dark:border-gray-800">
          <Button
            size="xs"
            color="gray"
            pill
            as="a"
            href={`/trips/${trip.slug}`}
          >
            <span className="flex items-center gap-1.5 text-xs">
              Zobacz galerię
              <FaArrowRight className="h-2.5 w-2.5" />
            </span>
          </Button>
        </div>
      </div>

      <div className="from-brand-400 via-brand-500 to-brand-600 absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}
