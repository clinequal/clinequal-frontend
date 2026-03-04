"use client";

import { useState, useRef } from "react";
import { TipTapEditor } from "./TipTapEditor";

export interface ArticleFormData {
  title: string;
  summary: string;
  content: string;
  author: string;
  imageUrl: string | null;
  published: boolean;
  publishedAt: string | null;
}

interface ArticleFormProps {
  initialData?: ArticleFormData;
  onSubmit: (data: ArticleFormData) => Promise<void>;
  submitLabel: string;
}

const defaultData: ArticleFormData = {
  title: "",
  summary: "",
  content: "",
  author: "",
  imageUrl: null,
  published: false,
  publishedAt: null,
};

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/admin/uploads", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const data = await res.json();
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001";
  return `${apiBase}${data.url}`;
}

export function ArticleForm({
  initialData,
  onSubmit,
  submitLabel,
}: ArticleFormProps) {
  const [data, setData] = useState<ArticleFormData>(initialData ?? defaultData);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update(field: keyof ArticleFormData, value: string | boolean | null) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      update("imageUrl", url);
    } catch {
      setError("Failed to upload cover image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Title
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          required
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Author
        </label>
        <input
          type="text"
          value={data.author}
          onChange={(e) => update("author", e.target.value)}
          required
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Cover Image
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageUpload}
          className="hidden"
        />
        {data.imageUrl ? (
          <div className="space-y-2">
            <div className="relative aspect-[16/9] max-w-md rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
              <img
                src={data.imageUrl}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="text-sm text-primary hover:text-primary-dark transition-colors"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => update("imageUrl", null)}
                className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload cover image"}
          </button>
        )}
      </div>

      {/* Summary */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Summary
        </label>
        <textarea
          value={data.summary}
          onChange={(e) => update("summary", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        />
      </div>

      {/* Content (TipTap) */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Content
        </label>
        <TipTapEditor
          content={data.content}
          onChange={(html) => update("content", html)}
        />
      </div>

      {/* Published toggle */}
      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={data.published}
            onChange={(e) => {
              update("published", e.target.checked);
              if (e.target.checked && !data.publishedAt) {
                update("publishedAt", new Date().toISOString());
              }
            }}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
        </label>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {data.published ? "Published" : "Draft"}
        </span>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || uploading}
        className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
