"use client";

import { useRouter } from "next/navigation";
import { ArticleForm, type ArticleFormData } from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  const router = useRouter();

  async function handleSubmit(data: ArticleFormData) {
    const res = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to create article: ${res.status}`);
    }
    router.push("/admin/articles");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
        New Article
      </h1>
      <ArticleForm onSubmit={handleSubmit} submitLabel="Create Article" />
    </div>
  );
}
