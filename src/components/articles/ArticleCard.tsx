import Link from "next/link";
import type { Article } from "@/lib/api/articles";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <Link href={`/articles/${article.slug}`} className="group">
      {/* Cover Image */}
      {article.imageUrl ? (
        <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 mb-4 flex items-center justify-center">
          <span className="text-slate-500 text-sm">No cover image</span>
        </div>
      )}

      {/* Metadata */}
      <div className="space-y-2">
        {date && (
          <p className="text-sm text-slate-400">{date}</p>
        )}
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        {article.author && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {article.author}
          </p>
        )}
      </div>
    </Link>
  );
}
