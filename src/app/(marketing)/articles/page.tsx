import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { NewsletterSignup } from "@/components/articles/NewsletterSignup";
import { getArticles, type Article } from "@/lib/api/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | Clinequal",
  description:
    "Insights on clinical trial equity, bias detection, and healthcare innovation from the Clinequal team.",
};

export default async function ArticlesPage() {
  let articles: Article[] = [];

  try {
    const data = await getArticles(true);
    articles = data.articles;
  } catch {
    // Backend not yet available
  }

  return (
    <Section background="gray">
      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-dark to-primary-light dark:from-slate-300 dark:to-primary-light bg-clip-text text-transparent">
            Articles & Insights
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Perspectives on clinical trial equity, AI-driven bias detection, and
            the future of inclusive healthcare research.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="max-w-xl mx-auto space-y-8">
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">
                No articles published yet. Check back soon!
              </p>
            </div>
            <NewsletterSignup />
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <div className="max-w-xl mx-auto">
              <NewsletterSignup />
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
