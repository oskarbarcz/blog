import TripCard from "../trips/TripCard";
import { FaArrowRight } from "react-icons/fa6";
import type { TripCardData } from "../trips/types";

interface HomeLatestTripsProps {
  trips: TripCardData[];
}

export default function HomeLatestTrips({ trips }: HomeLatestTripsProps) {
  if (!trips?.length) return null;
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-family-slab text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Najnowsze podróże
          </h2>
          <a
            href="/trips"
            className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 inline-flex items-center gap-1 text-sm font-medium"
          >
            Zobacz wszystkie
            <FaArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.slug} trip={trip} />
          ))}
        </div>
      </div>
    </section>
  );
}
