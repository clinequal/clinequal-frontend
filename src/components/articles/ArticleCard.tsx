import Link from "next/link";
import type { Article } from "@/lib/api/articles";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group bg-white dark:bg-slate-800/80 rounded-xl overflow-hidden border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-1 hover:border-primary/40 transition-all duration-300"
    >
      {/* Cover Image */}
      {article.imageUrl && (
        <div className="aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-700">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5">
        {/* Date */}
        {date && (
          <p className="text-xs text-primary font-medium mb-2">{date}</p>
        )}

        {/* Title */}
        <h3 className="font-semibold text-slate-900 dark:text-slate-50 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        {/* Summary */}
        {article.summary && (
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        )}
      </div>
    </Link>
  );
}
