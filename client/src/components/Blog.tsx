import { useState } from "react";
import { blogArticles } from "@/data/blogArticles";
import BlogCard from "./BlogCard";
import BlogArticleDetail from "./BlogArticleDetail";
import QuickQuoteModal from "./QuickQuoteModal";

/**
 * Blog Section - KHAMCI VOYAGES
 * 
 * Affiche les articles de blog avec :
 * - Filtrage par catégorie
 * - Articles à la une
 * - CTA intégrés pour demander un devis
 * - Design cohérent avec la landing page
 */

type CategoryFilter = "tous" | "actualité" | "destination" | "conseil" | "offre";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(
    "tous"
  );
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Filter articles
  const filteredArticles =
    selectedCategory === "tous"
      ? blogArticles
      : blogArticles.filter((article) => article.category === selectedCategory);

  // Featured articles (first 3)
  const featuredArticles = blogArticles.filter((a) => a.featured).slice(0, 3);

  // Regular articles
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  const categories: { value: CategoryFilter; label: string; icon: string }[] =
    [
      { value: "tous", label: "Tous les Articles", icon: "📰" },
      { value: "destination", label: "Destinations", icon: "🌍" },
      { value: "conseil", label: "Conseils", icon: "💡" },
      { value: "offre", label: "Offres Spéciales", icon: "🎁" },
      { value: "actualité", label: "Actualités", icon: "📢" },
    ];

  if (selectedArticleId) {
    return (
      <BlogArticleDetail
        articleId={selectedArticleId}
        onBack={() => setSelectedArticleId(null)}
        onQuoteClick={() => setIsQuoteModalOpen(true)}
      />
    );
  }

  return (
    <>
      <section id="blog" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-lg gradient-text mb-4">
              Blog & Actualités
            </h2>
            <p className="text-body text-gray-600 max-w-2xl mx-auto">
              Découvrez nos articles sur les destinations, les conseils de voyage,
              les offres spéciales et l'actualité de KHAMCI VOYAGES.
              Inspirez-vous et planifiez votre prochain voyage.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === cat.value
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Featured Articles */}
          {selectedCategory === "tous" && featuredArticles.length > 0 && (
            <div className="mb-16">
              <h3 className="heading-md text-gray-900 mb-8 flex items-center gap-2">
                <span className="text-2xl">⭐</span> Articles à la Une
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {featuredArticles.map((article) => (
                  <BlogCard
                    key={article.id}
                    article={article}
                    onReadMore={(id) => setSelectedArticleId(id)}
                    onQuoteClick={() => setIsQuoteModalOpen(true)}
                  />
                ))}
              </div>
              {regularArticles.length > 0 && (
                <div className="my-12 border-t border-gray-300"></div>
              )}
            </div>
          )}

          {/* Regular Articles Grid */}
          {regularArticles.length > 0 ? (
            <div>
              <h3 className="heading-md text-gray-900 mb-8">
                {selectedCategory === "tous" ? "Autres Articles" : "Articles"}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularArticles.map((article) => (
                  <BlogCard
                    key={article.id}
                    article={article}
                    onReadMore={(id) => setSelectedArticleId(id)}
                    onQuoteClick={() => setIsQuoteModalOpen(true)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Aucun article trouvé dans cette catégorie.
              </p>
              <button
                onClick={() => setSelectedCategory("tous")}
                className="mt-4 text-orange-600 hover:text-orange-700 font-semibold"
              >
                Voir tous les articles →
              </button>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-8 border border-orange-200">
              <h3 className="heading-md text-gray-900 mb-4">
                Prêt à Planifier Votre Voyage ?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Après avoir lu nos articles, demandez un devis personnalisé.
                Nos experts sont prêts à créer votre aventure parfaite.
              </p>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="btn-cta bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-3 rounded-lg"
              >
                🎯 DEMANDER MON DEVIS GRATUIT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Quote Modal */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        source="blog"
      />
    </>
  );
}
