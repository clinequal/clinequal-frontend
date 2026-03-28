"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Article } from "@/lib/api/articles";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    try {
      const res = await fetch("/api/admin/articles");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setArticles(data.articles ?? []);
    } catch {
      // Backend not yet available — show empty state
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) {
        throw new Error("Delete failed");
      }
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch {
      alert("Failed to delete article");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-500 dark:text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          Articles
        </h1>
        <Link
          href="/admin/articles/new"
          className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
        >
          New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400">
            No articles yet. Create your first one!
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Author
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Date
                </th>
                <th className="text-right px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                >
                  <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-50 font-medium">
                    {article.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {article.author}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                        article.published
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="text-sm text-primary hover:text-primary-dark transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
