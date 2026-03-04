import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { getArticleBySlug } from "@/lib/api/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await getArticleBySlug(slug);
    return {
      title: `${article.title} | Clinequal`,
      description: article.summary,
      openGraph: {
        title: article.title,
        description: article.summary,
        type: "article",
        publishedTime: article.publishedAt ?? undefined,
        authors: [article.author],
        ...(article.imageUrl && {
          images: [{ url: article.imageUrl }],
        }),
      },
    };
  } catch {
    return { title: "Article Not Found | Clinequal" };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  let article;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Section background="white">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/articles"
            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Articles
          </Link>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span>{article.author}</span>
              {date && (
                <>
                  <span>&middot;</span>
                  <span>{date}</span>
                </>
              )}
            </div>
          </header>

          {/* Cover Image */}
          {article.imageUrl && (
            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-slate-100 dark:bg-slate-700">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </Container>
    </Section>
  );
}
