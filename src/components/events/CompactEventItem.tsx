import RoleBadge from "./RoleBadge.tsx";

export interface CompactEventData {
  title: string;
  role: "guest" | "speaker" | "panelist" | "participant" | "organizer";
  date: string;
  city: string;
}

export default function CompactEventItem({
  title,
  role,
  date,
  city,
}: CompactEventData) {
  const d = new Date(date);
  return (
    <li className="flex items-start justify-between gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          {city}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1 text-right">
        <RoleBadge role={role} />
        <time
          className="text-[11px] text-gray-500 dark:text-gray-400"
          dateTime={d.toISOString()}
        >
          {d.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </div>
    </li>
  );
}
