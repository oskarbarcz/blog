import ArticleCard from "../articles/ArticleCard";
import TripCard from "../trips/TripCard";
import { FaArrowRight } from "react-icons/fa6";
import type { Article } from "../articles/types";
import type { TripCardData } from "../trips/types";

interface HomeCaseStudiesAndTripsProps {
  caseStudies: Article[];
  trips: TripCardData[];
}

interface ColumnHeaderProps {
  title: string;
  href: string;
}

function ColumnHeader({ title, href }: ColumnHeaderProps) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-3">
      <h2 className="font-family-mono text-lg font-bold tracking-tight whitespace-nowrap text-gray-900 dark:text-white">
        <span className="text-brand-500 dark:text-brand-400">&gt;&nbsp;</span>
        {title}
      </h2>
      <a
        href={href}
        className="group/all font-family-mono text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 hidden shrink-0 items-center gap-1 text-xs whitespace-nowrap transition-colors sm:inline-flex"
      >
        <span className="text-gray-400 dark:text-gray-500">[</span>
        Zobacz wszystkie
        <FaArrowRight className="h-2.5 w-2.5 transition-transform duration-150 group-hover/all:translate-x-0.5" />
        <span className="text-gray-400 dark:text-gray-500">]</span>
      </a>
    </div>
  );
}

function MobileSeeAll({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="group/all font-family-mono text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 mt-6 flex w-full items-center justify-end gap-1 text-sm transition-colors sm:hidden"
    >
      <span className="text-gray-400 dark:text-gray-500">[</span>
      Zobacz wszystkie
      <FaArrowRight className="h-3 w-3 transition-transform duration-150 group-hover/all:translate-x-0.5" />
      <span className="text-gray-400 dark:text-gray-500">]</span>
    </a>
  );
}

export default function HomeCaseStudiesAndTrips({
  caseStudies,
  trips,
}: HomeCaseStudiesAndTripsProps) {
  if (!caseStudies?.length && !trips?.length) return null;
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
          {caseStudies?.length ? (
            <div className="lg:col-span-2">
              <ColumnHeader title="Case studies" href="/case-studies" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {caseStudies.map((a) => (
                  <ArticleCard
                    key={a.slug}
                    article={a}
                    basePath="/case-studies"
                  />
                ))}
              </div>
              <MobileSeeAll href="/case-studies" />
            </div>
          ) : null}

          {trips?.length ? (
            <div className="lg:col-span-1">
              <ColumnHeader title="Ostatnie podróże" href="/trips" />
              <div className="grid grid-cols-1 gap-6">
                {trips.map((trip) => (
                  <TripCard key={trip.slug} trip={trip} />
                ))}
              </div>
              <MobileSeeAll href="/trips" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
