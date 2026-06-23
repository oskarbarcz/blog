import { FaArrowRight, FaImages, FaLocationDot } from "react-icons/fa6";
import type { TripCardData } from "./types";

interface TripCardProps {
  trip: TripCardData;
}

const formatDateRange = (start: string, end?: string): string => {
  const startDate = new Date(start);
  const startFmt = startDate.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  if (!end) return startFmt;
  const endDate = new Date(end);
  if (startDate.toDateString() === endDate.toDateString()) return startFmt;
  const endFmt = endDate.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  if (startDate.getFullYear() === endDate.getFullYear()) {
    const startNoYear = startDate.toLocaleDateString("pl-PL", {
      month: "short",
      day: "numeric",
    });
    return `${startNoYear} – ${endFmt}`;
  }
  return `${startFmt} – ${endFmt}`;
};

export default function TripCard({ trip }: TripCardProps) {
  const dateRange = formatDateRange(trip.startDate, trip.endDate);

  return (
    <article className="group hover:border-brand-500/70 dark:hover:border-brand-500/60 relative flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm transition-colors duration-150 hover:bg-gray-50/60 dark:border-gray-800 dark:bg-gray-900/50 dark:backdrop-blur-sm dark:hover:bg-gray-900/80">
      <div className="relative h-40 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <a href={`/trips/${trip.slug}`} className="block h-full w-full">
          <img
            src={trip.coverThumb}
            alt={trip.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
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

        <div className="font-family-mono flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
          <span className="inline-flex items-center gap-1">
            <FaLocationDot className="h-3 w-3" />
            {trip.sectionCount} {trip.sectionCount === 1 ? "miejsce" : "miejsc"}
          </span>
          <span className="inline-flex items-center gap-1">
            <FaImages className="h-3 w-3" />
            {trip.photoCount} zdjęć
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-gray-200 pt-3 dark:border-gray-800">
          <time
            dateTime={trip.startDate}
            className="font-family-mono text-xs whitespace-nowrap text-gray-500 dark:text-gray-500"
          >
            {dateRange}
          </time>
          <a
            href={`/trips/${trip.slug}`}
            className="group/read font-family-mono text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 inline-flex shrink-0 items-center gap-1 text-xs font-medium whitespace-nowrap transition-colors"
          >
            <span className="text-gray-400 dark:text-gray-500">[</span>
            Zobacz galerię
            <FaArrowRight className="h-2.5 w-2.5 transition-transform duration-150 group-hover/read:translate-x-0.5" />
            <span className="text-gray-400 dark:text-gray-500">]</span>
          </a>
        </div>
      </div>
    </article>
  );
}
