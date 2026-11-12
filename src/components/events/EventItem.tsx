import { FaLocationDot, FaUserGroup } from "react-icons/fa6";
import { TimelineContent, TimelineItem, TimelinePoint } from "flowbite-react";
import RoleBadge from "./RoleBadge";
import PhotoGallery from "./PhotoGallery";
import EventSocialLinks from "./EventSocialLinks";

export interface EventLinks {
  article?: string;
  youtube?: string;
  linkedin?: string;
  facebook?: string;
  other?: string;
}

export interface EventItemData {
  title: string;
  role: "guest" | "speaker" | "panelist" | "participant" | "organizer";
  date: string;
  city: string;
  place?: {
    name: string;
    url?: string;
    logo?: string | null;
  };
  description: string;
  organizer: {
    name: string;
    logo?: string | null;
  };
  photos?: string[];
  links?: EventLinks;
}

interface EventItemProps {
  event: EventItemData;
}

export default function EventItem({ event }: EventItemProps) {
  const date = new Date(event.date);
  const hasPhotos = (event.photos?.length ?? 0) > 0;
  const { links, place } = event;

  return (
    <TimelineItem>
      <TimelinePoint className="bg-brand-500" />
      <TimelineContent>
        <div className="hover:border-brand-500/70 dark:hover:border-brand-500/60 rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-150 hover:bg-gray-50/60 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-gray-900/80">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {event.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <RoleBadge role={event.role} />
              <time
                className="font-family-mono text-gray-500 dark:text-gray-400"
                dateTime={date.toISOString()}
              >
                {date.toLocaleDateString("pl-PL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>

          <div
            className={`mt-1 flex w-full items-center text-xs text-gray-600 dark:text-gray-400 ${place?.logo ? "gap-2" : "gap-1"}`}
          >
            {place?.logo ? (
              <img
                src={place.logo}
                alt={`${place.name} logo`}
                className="h-4 w-4 rounded-sm bg-white object-contain ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <FaLocationDot
                className="text-brand-600 dark:text-brand-400 h-3.5 w-3.5"
                aria-hidden="true"
              />
            )}
            <span className="max-w-[18rem] truncate sm:max-w-none">
              {place &&
                (place.url ? (
                  <a
                    href={place.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-600 dark:hover:text-brand-400 underline decoration-gray-300 underline-offset-2 dark:decoration-gray-600"
                  >
                    {place.name}
                  </a>
                ) : (
                  place.name
                ))}
              {place && ", "}
              {event.city}
            </span>
          </div>

          <div className="mt-2 flex w-full items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            {event.organizer?.logo ? (
              <img
                src={event.organizer.logo}
                alt={`${event.organizer.name} logo`}
                className="h-4 w-4 rounded-sm bg-white object-contain ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <FaUserGroup
                className="h-3.5 w-3.5 text-gray-400"
                aria-hidden="true"
              />
            )}
            <span className="max-w-[18rem] truncate sm:max-w-none">
              {event.organizer?.name}
            </span>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {event.description}
          </p>

          {hasPhotos && (
            <PhotoGallery photos={event.photos} title={event.title} />
          )}

          <EventSocialLinks links={links} />
        </div>
      </TimelineContent>
    </TimelineItem>
  );
}
