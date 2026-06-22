import CompactEventItem, {
  type CompactEventData,
} from "../events/CompactEventItem.tsx";
import { FaArrowRight } from "react-icons/fa6";

interface HomeLatestEventsProps {
  events: CompactEventData[];
}

export default function HomeLatestEvents({ events }: HomeLatestEventsProps) {
  if (!events?.length) return null;
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h2 className="font-family-mono text-lg font-bold tracking-tight whitespace-nowrap text-gray-900 dark:text-white">
            <span className="text-brand-500 dark:text-brand-400">
              &gt;&nbsp;
            </span>
            Najnowsze wydarzenia
          </h2>
          <a
            href="/events"
            className="group/all font-family-mono text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 inline-flex shrink-0 items-center gap-1 text-xs whitespace-nowrap transition-colors"
          >
            <span className="text-gray-400 dark:text-gray-500">[</span>
            Zobacz wszystkie
            <FaArrowRight className="h-2.5 w-2.5 transition-transform duration-150 group-hover/all:translate-x-0.5" />
            <span className="text-gray-400 dark:text-gray-500">]</span>
          </a>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => (
            <CompactEventItem key={`${e.date}-${i}-${e.title}`} {...e} />
          ))}
        </ul>
      </div>
    </section>
  );
}
