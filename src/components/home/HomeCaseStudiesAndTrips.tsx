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
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="font-family-slab text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>
      <a
        href={href}
        className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 inline-flex items-center gap-1 text-sm font-medium"
      >
        Zobacz wszystkie
        <FaArrowRight className="h-3.5 w-3.5" />
      </a>
    </div>
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
            </div>
          ) : null}

          {trips?.length ? (
            <div className="lg:col-span-1">
              <ColumnHeader title="Najnowsze podróże" href="/trips" />
              <div className="grid grid-cols-1 gap-6">
                {trips.map((trip) => (
                  <TripCard key={trip.slug} trip={trip} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
