import { FaCircleInfo } from "react-icons/fa6";
import { marked } from "marked";

interface ReactionaryContextProps {
  context: string;
}

export default function ReactionaryContext({
  context,
}: ReactionaryContextProps) {
  const htmlContent = marked.parse(context);

  return (
    <div className="mb-5">
      <div className="border-brand-100 bg-brand-50/50 dark:border-brand-400/20 dark:bg-brand-400/5 rounded-xl border p-6">
        <div className="mb-4 flex shrink-0 items-center gap-3">
          <div className="bg-brand-100 text-brand-600 dark:bg-brand-400/20 dark:text-brand-400 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <FaCircleInfo className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Kontekst sytuacji
            </h3>
            <p className="text-brand-600 dark:text-brand-400 text-xs font-medium">
              Ten artykuł jest reakcją na konkretne wydarzenie, poniżej
              znajdziesz uzupełnienie kontekstu.
            </p>
          </div>
        </div>
        <div
          className="article-content prose-sm dark:prose-invert m-0! max-w-none! text-base! leading-relaxed!"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
