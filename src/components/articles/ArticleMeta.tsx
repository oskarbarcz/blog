import { FaCalendarDays, FaClock } from "react-icons/fa6";

interface ArticleMetaProps {
  date: string; // ISO string
  readTime: string;
}

export default function ArticleMeta({ date, readTime }: ArticleMetaProps) {
  return (
    <div className="font-family-mono flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
      <div className="flex items-center gap-1.5">
        <FaCalendarDays className="h-3 w-3 text-gray-400 dark:text-gray-600" />
        <time>
          {new Date(date).toLocaleDateString("pl-PL", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>

      <div className="flex items-center gap-1.5">
        <FaClock className="h-3 w-3 text-gray-400 dark:text-gray-600" />
        <span>{readTime}</span>
      </div>
    </div>
  );
}
