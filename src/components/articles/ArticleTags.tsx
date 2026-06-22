interface ArticleTagsProps {
  tags?: string[];
}

export default function ArticleTags({ tags = [] }: ArticleTagsProps) {
  const INTERNAL_TAGS = ["archive", "reactionary"];
  const filteredTags = tags.filter((tag) => !INTERNAL_TAGS.includes(tag));

  if (!filteredTags.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {filteredTags.map((tag) => (
        <span
          key={tag}
          className="bg-brand-50 text-brand-700 dark:bg-brand-400/10 dark:text-brand-400 font-family-mono inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
