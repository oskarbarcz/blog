import TripCard from "./TripCard";
import type { TripCardData } from "./types";

interface TripsListProps {
  trips: TripCardData[];
}

export default function TripsList({ trips }: TripsListProps) {
  return (
    <main className="relative">
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-24 lg:pb-12">
        <div className="mb-16 space-y-4">
          <h1 className="font-family-mono text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Podróże
          </h1>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            Podróże krótkie i dalekie, w formie fotorelacji i komentarza z
            miejsc, które odwiedziłem.
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
