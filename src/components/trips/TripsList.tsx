import TripCard from "./TripCard";
import type { TripCardData } from "./types";

interface TripsListProps {
  trips: TripCardData[];
}

export default function TripsList({ trips }: TripsListProps) {
  return (
    <main className="relative bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-24 lg:pb-12">
        <div className="mb-16 space-y-4">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
            Podróże
          </h1>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            Fotorelacje z wypraw — miejsca, które warto zobaczyć i klimaty,
            które warto zapamiętać.
          </p>
        </div>

        {trips.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Pierwsze fotorelacje pojawią się wkrótce.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <TripCard key={trip.slug} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
