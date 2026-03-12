import { blogArticles } from "@/data/blogArticles";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

interface BlogArticleDetailProps {
  articleId: string;
  onBack: () => void;
  onQuoteClick: () => void;
}

export default function BlogArticleDetail({
  articleId,
  onBack,
  onQuoteClick,
}: BlogArticleDetailProps) {
  const article = blogArticles.find((a) => a.id === articleId);

  if (!article) {
    return (
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container text-center">
          <h2 className="heading-lg text-gray-900 dark:text-white mb-4">Article non trouvé</h2>
          <button
            onClick={onBack}
            className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold"
          >
            ← Retour aux articles
          </button>
        </div>
      </section>
    );
  }

  // Get related articles (same category, different article)
  const relatedArticles = blogArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <article className="bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-8 md:py-12 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Retour aux articles
          </button>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 capitalize">
                {article.category}
              </span>
            </div>

            <h1 className="heading-display text-gray-900 dark:text-white mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>
                  {new Date(article.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{article.readTime} min de lecture</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>Par {article.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full h-96 md:h-[500px] bg-gray-200 dark:bg-gray-800 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              {article.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("##")) {
                  return (
                    <h2
                      key={index}
                      className="heading-md text-gray-900 dark:text-white mt-8 mb-4"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("-")) {
                  return (
                    <ul
                      key={index}
                      className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4"
                    >
                      {paragraph.split("\n").map((item, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                          {item.replace("- ", "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p
                      key={index}
                      className="text-gray-700 dark:text-gray-300 dark:text-gray-300 leading-relaxed mb-4"
                    >
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-8 border border-orange-200 dark:border-orange-800 mb-12">
              <h3 className="heading-md text-gray-900 dark:text-white mb-4">
                Intéressé par cette destination ou ce service ?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 dark:text-gray-300 mb-6">
                Demandez un devis personnalisé et laissez nos experts créer votre
                voyage parfait.
              </p>
              <button
                onClick={onQuoteClick}
                className="btn-cta bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-3 rounded-lg"
              >
                🎯 DEMANDER MON DEVIS GRATUIT
              </button>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div>
                <h3 className="heading-md text-gray-900 dark:text-white mb-8">
                  Articles Similaires
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <div
                      key={relatedArticle.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer group"
                      onClick={onBack}
                    >
                      <div className="h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <img
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                          {relatedArticle.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
