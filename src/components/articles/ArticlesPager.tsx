interface ArticlesPagerProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const wrap =
  "font-family-mono inline-flex items-center gap-1 text-sm transition-colors";
const idle =
  "cursor-pointer text-gray-600 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400";
const active = "cursor-pointer text-brand-600 dark:text-brand-400 font-bold";
const disabled = "text-gray-300 dark:text-gray-700 cursor-not-allowed";
const bracket = "text-gray-400 dark:text-gray-600";

export default function ArticlesPager({
  currentPage,
  totalPages,
  onPageChange,
}: ArticlesPagerProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const atStart = currentPage <= 1;
  const atEnd = currentPage >= totalPages;

  return (
    <nav
      aria-label="Paginacja"
      className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
    >
      <button
        type="button"
        disabled={atStart}
        onClick={() => !atStart && onPageChange(currentPage - 1)}
        className={`${wrap} ${atStart ? disabled : idle}`}
      >
        <span className={bracket}>[</span>← poprzednia
        <span className={bracket}>]</span>
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === currentPage ? "page" : undefined}
          onClick={() => onPageChange(p)}
          className={`${wrap} ${p === currentPage ? active : idle}`}
        >
          <span className={bracket}>[</span>
          {p}
          <span className={bracket}>]</span>
        </button>
      ))}

      <button
        type="button"
        disabled={atEnd}
        onClick={() => !atEnd && onPageChange(currentPage + 1)}
        className={`${wrap} ${atEnd ? disabled : idle}`}
      >
        <span className={bracket}>[</span>następna →
        <span className={bracket}>]</span>
      </button>
    </nav>
  );
}
