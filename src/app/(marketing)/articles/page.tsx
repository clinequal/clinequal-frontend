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
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-primary/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

        <Container className="relative py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              <span className="font-light text-white">What&apos;s new at</span><br />
              <span className="font-bold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
                Clinequal
              </span>
            </h1>
            <div className="md:text-right max-w-sm">
              <p className="text-sm font-semibold text-primary-light tracking-wide uppercase mb-2">
                Articles & Insights
              </p>
              <p className="text-slate-400 leading-relaxed">
                Perspectives on clinical trial equity, bias detection, and the
                future of inclusive healthcare research.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Articles Grid */}
      <section className="relative bg-white dark:bg-slate-900 py-16 md:py-20">
        <Container>
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
              <div className="grid md:grid-cols-2 gap-8 mb-16">
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
      </section>
    </>
  );
}
