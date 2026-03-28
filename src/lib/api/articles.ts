export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001";

/** Ensure image URLs from the backend are absolute */
function resolveImageUrl(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
}

/** Resolve relative /uploads/ URLs inside HTML content */
function resolveContentUrls(html: string): string {
  if (!html) return html;
  return html.replace(
    /src="\/uploads\//g,
    `src="${API_BASE}/uploads/`
  );
}

function resolveArticle(article: Article): Article {
  return {
    ...article,
    imageUrl: resolveImageUrl(article.imageUrl),
    content: resolveContentUrls(article.content),
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  imageUrl: string | null;
  publishedAt: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ArticlesResponse {
  totalCount: number;
  articles: Article[];
}

export async function getArticles(
  published?: boolean
): Promise<ArticlesResponse> {
  const params = new URLSearchParams();
  if (published !== undefined) {
    params.set("published", String(published));
  }
  const qs = params.toString();
  const res = await fetch(`${API_BASE}/api/articles${qs ? `?${qs}` : ""}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
  }
  const data: ArticlesResponse = await res.json();
  return { ...data, articles: data.articles.map(resolveArticle) };
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  const res = await fetch(`${API_BASE}/api/articles/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch article: ${res.status} ${res.statusText}`);
  }
  const article: Article = await res.json();
  return resolveArticle(article);
}

export async function getArticleById(id: string): Promise<Article> {
  const res = await fetch(`${API_BASE}/api/articles/by-id/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch article: ${res.status} ${res.statusText}`);
  }
  const article: Article = await res.json();
  return resolveArticle(article);
}

export async function createArticle(
  data: {
    title: string;
    summary?: string;
    content?: string;
    author?: string;
    imageUrl?: string | null;
    published?: boolean;
    publishedAt?: string | null;
  },
  token: string
): Promise<Article> {
  const res = await fetch(`${API_BASE}/api/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Failed to create article: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function updateArticle(
  id: string,
  data: Partial<{
    title: string;
    summary: string;
    content: string;
    author: string;
    imageUrl: string | null;
    published: boolean;
    publishedAt: string | null;
  }>,
  token: string
): Promise<Article> {
  const res = await fetch(`${API_BASE}/api/articles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Failed to update article: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function deleteArticle(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/articles/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Failed to delete article: ${res.status} ${res.statusText}`);
  }
}

export class AlreadySubscribedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AlreadySubscribedError";
  }
}

export async function subscribeNewsletter(email: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (res.status === 409) {
    throw new AlreadySubscribedError("You're already subscribed!");
  }
  if (!res.ok) {
    throw new Error(`Failed to subscribe: ${res.status} ${res.statusText}`);
  }
}
