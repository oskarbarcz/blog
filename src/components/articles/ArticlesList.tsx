import { useState } from "react";
import { ARTICLES_PER_PAGE } from "../../constants";
import ArticlesHeader from "./ArticlesHeader.tsx";
import ArticlesGrid from "./ArticlesGrid.tsx";
import ArticleCard from "./ArticleCard.tsx";
import ArticlesPager from "./ArticlesPager.tsx";
import type { Article } from "./types.ts";

interface ArticlesListProps {
  articles: Article[];
  title?: string;
  subtitle?: string;
  basePath?: string;
}

export default function ArticlesList({
  articles,
  title,
  subtitle,
  basePath,
}: ArticlesListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = ARTICLES_PER_PAGE;

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative">
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-24 lg:pb-12">
        <ArticlesHeader title={title} subtitle={subtitle} />
        <ArticlesGrid>
          {currentArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              basePath={basePath}
            />
          ))}
        </ArticlesGrid>

        <ArticlesPager
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </main>
  );
}
