interface ArticlesHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function ArticlesHeader({
  title = "Wszystkie publikacje",
  subtitle = "Dogłębne analizy tworzenia oprogramowania, projektowania systemów i nowoczesnej architektury webowej.",
}: ArticlesHeaderProps) {
  return (
    <div className="mb-16 space-y-4">
      <h1 className="font-family-mono text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
        <span className="text-brand-500 dark:text-brand-400">$&nbsp;</span>
        {title}
      </h1>
      <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-gray-600 dark:text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}
