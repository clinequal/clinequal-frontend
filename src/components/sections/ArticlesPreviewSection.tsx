import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { getArticles, type Article } from "@/lib/api/articles";

export async function ArticlesPreviewSection() {
  let articles: Article[] = [];

  try {
    const data = await getArticles(true);
    articles = data.articles.slice(0, 3);
  } catch {
    // Backend not yet available
  }

  if (articles.length === 0) return null;

  return (
    <Section background="gray" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-dark to-primary-light dark:from-slate-300 dark:to-primary-light bg-clip-text text-transparent">
            Latest Insights
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Stay informed on clinical trial equity and AI-driven bias detection.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="text-center">
          <Button href="/articles" variant="outline">
            View All Articles
          </Button>
        </div>
      </Container>
    </Section>
  );
}
