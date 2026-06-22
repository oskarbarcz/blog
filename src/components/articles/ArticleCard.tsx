import { Button } from "flowbite-react";
import {
  FaArrowRight,
  FaBoxArchive,
  FaCircleInfo,
  FaGlobe,
} from "react-icons/fa6";
import ArticleTags from "./ArticleTags";
import ArticleMeta from "./ArticleMeta";
import type { Article } from "./types";

interface ArticleCardProps {
  article: Article;
  /** URL prefix for this card's links, e.g. "/articles" or "/case-studies". */
  basePath?: string;
}

export default function ArticleCard({
  article,
  basePath = "/articles",
}: ArticleCardProps) {
  const isArchive = article.tags?.includes("archive");
  const isReactionary = article.tags?.includes("reactionary");
  const isCaseStudy = article.tags?.includes("case study");
  const isEnglish = article.language === "en";
  const href = `${basePath}/${article.slug}`;

  return (
    <article className="group hover:border-brand-400/70 dark:hover:border-brand-500/60 relative flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(64,191,126,0.45)] dark:border-gray-800 dark:bg-gray-900/50 dark:backdrop-blur-sm dark:hover:shadow-[0_12px_32px_-12px_rgba(64,191,126,0.35)]">
      {article.coverUrl && (
        <div className="relative h-40 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <a href={href} className="block h-full w-full">
            <img
              src={article.coverUrl}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </a>
          <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
            {isEnglish && (
              <div className="flex items-center gap-1.5 rounded-full bg-blue-50/90 px-2.5 py-1 text-[10px] font-bold tracking-wider text-blue-700 shadow-sm backdrop-blur-sm dark:bg-blue-900/80 dark:text-blue-200">
                <FaGlobe className="h-2.5 w-2.5" />
                ENGLISH
              </div>
            )}
            {isArchive && (
              <div className="flex items-center gap-1.5 rounded-full bg-amber-50/90 px-2.5 py-1 text-[10px] font-bold tracking-wider text-amber-700 shadow-sm backdrop-blur-sm dark:bg-amber-900/80 dark:text-amber-200">
                <FaBoxArchive className="h-2.5 w-2.5" />
                ARCHIWUM
              </div>
            )}
            {isReactionary && (
              <div className="bg-brand-50/90 text-brand-700 dark:bg-brand-900/80 dark:text-brand-200 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider shadow-sm backdrop-blur-sm">
                <FaCircleInfo className="h-2.5 w-2.5" />
                REAKCJA
              </div>
            )}
            {isCaseStudy && (
              <div className="bg-brand-50/90 text-brand-700 dark:bg-brand-900/80 dark:text-brand-200 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider shadow-sm backdrop-blur-sm">
                <FaCircleInfo className="h-2.5 w-2.5" />
                CASE STUDY
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col space-y-3 p-5">
        <div className="flex-1 space-y-2">
          {!article.coverUrl &&
            (isArchive || isReactionary || isCaseStudy || isEnglish) && (
              <div className="flex flex-wrap items-center gap-3">
                {isEnglish && (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-blue-600 dark:text-blue-400">
                    <FaGlobe className="h-2.5 w-2.5" />
                    ENGLISH
                  </div>
                )}
                {isArchive && (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-amber-600 dark:text-amber-400">
                    <FaBoxArchive className="h-2.5 w-2.5" />
                    ARCHIWUM
                  </div>
                )}
                {isReactionary && (
                  <div className="text-brand-600 dark:text-brand-400 flex items-center gap-1.5 text-[10px] font-bold tracking-wider">
                    <FaCircleInfo className="h-2.5 w-2.5" />
                    REAKCJA
                  </div>
                )}
                {isCaseStudy && (
                  <div className="text-brand-600 dark:text-brand-400 flex items-center gap-1.5 text-[10px] font-bold tracking-wider">
                    <FaCircleInfo className="h-2.5 w-2.5" />
                    CASE STUDY
                  </div>
                )}
              </div>
            )}
          <h2 className="group-hover:text-brand-600 dark:group-hover:text-brand-400 text-xl leading-snug font-bold tracking-tight text-gray-900 transition-colors duration-150 dark:text-white">
            <a href={href}>{article.title}</a>
          </h2>
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {article.excerpt}
          </p>
        </div>

        <ArticleTags tags={article.tags} />

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-3 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500">
          <ArticleMeta date={article.date} readTime={article.readTime} />

          <Button size="xs" color="gray" pill as="a" href={href}>
            <span className="flex items-center gap-1.5 text-xs">
              Przeczytaj
              <FaArrowRight className="h-2.5 w-2.5" />
            </span>
          </Button>
        </div>
      </div>
    </article>
  );
}
