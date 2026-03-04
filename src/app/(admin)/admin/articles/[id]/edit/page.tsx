"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArticleForm, type ArticleFormData } from "@/components/admin/ArticleForm";
import { getArticleById, type Article } from "@/lib/api/articles";

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getArticleById(id)
      .then(setArticle)
      .catch(() => setError("Failed to load article"))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(data: ArticleFormData) {
    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to update article: ${res.status}`);
    }
    router.push("/admin/articles");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-500 dark:text-slate-400">Loading...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">
          {error || "Article not found"}
        </p>
      </div>
    );
  }

  const initialData: ArticleFormData = {
    title: article.title,
    summary: article.summary,
    content: article.content,
    author: article.author,
    imageUrl: article.imageUrl,
    published: article.published,
    publishedAt: article.publishedAt,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
        Edit Article
      </h1>
      <ArticleForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Update Article"
      />
    </div>
  );
}
