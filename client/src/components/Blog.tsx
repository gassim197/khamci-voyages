import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Blog Section - KHAMCI VOYAGES
 *
 * Lit les articles publiés depuis la base de données via tRPC.
 * Les articles créés depuis le dashboard admin apparaissent ici automatiquement.
 */

type CategoryFilter = "tous" | "destinations" | "conseils" | "offres" | "actualites";

const CATEGORY_LABELS: Record<string, string> = {
  destinations: "Destinations",
  conseils: "Conseils",
  offres: "Offres Spéciales",
  actualites: "Actualités",
};

const CATEGORY_COLORS: Record<string, string> = {
  destinations: "bg-blue-100 text-blue-700",
  conseils: "bg-green-100 text-green-700",
  offres: "bg-orange-100 text-orange-700",
  actualites: "bg-purple-100 text-purple-700",
};

const CATEGORY_ICONS: Record<string, string> = {
  destinations: "🌍",
  conseils: "💡",
  offres: "🎁",
  actualites: "📢",
};

function BlogCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-9 w-full mt-2" />
      </div>
    </Card>
  );
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("tous");

  const { data: posts, isLoading, error } = trpc.blog.listPublished.useQuery();

  const categories: { value: CategoryFilter; label: string; icon: string }[] = [
    { value: "tous", label: "Tous les Articles", icon: "📰" },
    { value: "destinations", label: "Destinations", icon: "🌍" },
    { value: "conseils", label: "Conseils", icon: "💡" },
    { value: "offres", label: "Offres Spéciales", icon: "🎁" },
    { value: "actualites", label: "Actualités", icon: "📢" },
  ];

  const filteredPosts = !posts
    ? []
    : selectedCategory === "tous"
    ? posts
    : posts.filter((p) => p.category === selectedCategory);

  const featuredPosts = filteredPosts.slice(0, 3);
  const regularPosts = filteredPosts.slice(3);

  return (
    <section id="blog" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-orange-100 rounded-full">
            <BookOpen className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-600">BLOG & ACTUALITÉS</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Conseils, Destinations & Offres
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos articles sur les destinations, les conseils de voyage,
            les offres spéciales et l'actualité de KHAMCI VOYAGES.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                selectedCategory === cat.value
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => <BlogCardSkeleton key={i} />)}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Impossible de charger les articles pour le moment.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              {selectedCategory === "tous"
                ? "Aucun article publié pour le moment"
                : `Aucun article dans la catégorie "${CATEGORY_LABELS[selectedCategory] ?? selectedCategory}"`}
            </h3>
            <p className="text-gray-500 mb-6">
              {selectedCategory === "tous"
                ? "Les articles publiés depuis le dashboard admin apparaîtront ici."
                : "Essayez une autre catégorie."}
            </p>
            {selectedCategory !== "tous" && (
              <button
                onClick={() => setSelectedCategory("tous")}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Voir tous les articles →
              </button>
            )}
          </div>
        )}

        {/* Articles Grid */}
        {!isLoading && !error && filteredPosts.length > 0 && (
          <>
            {/* Featured (first 3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="block h-full">
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group flex flex-col">
                    {/* Cover Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-red-100 flex-shrink-0">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">
                          {CATEGORY_ICONS[post.category] ?? "📰"}
                        </div>
                      )}
                      {/* Category badge */}
                      <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700"}`}>
                        <Tag size={10} className="inline mr-1" />
                        {CATEGORY_LABELS[post.category] ?? post.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })
                            : new Date(post.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {post.readTime ?? 5} min
                        </span>
                      </div>

                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold flex items-center justify-center gap-2 group/btn"
                      >
                        Lire l'article
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* More articles */}
            {regularPosts.length > 0 && (
              <>
                <div className="my-8 border-t border-gray-200" />
                <h3 className="text-xl font-bold text-gray-900 mb-8">Autres Articles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="block h-full">
                      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col">
                        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 flex-shrink-0">
                          {post.coverImage ? (
                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl">
                              {CATEGORY_ICONS[post.category] ?? "📰"}
                            </div>
                          )}
                          <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold ${CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700"}`}>
                            {CATEGORY_LABELS[post.category] ?? post.category}
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors text-base">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto pt-3">
                            <span className="flex items-center gap-1"><Calendar size={10} />{new Date(post.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</span>
                            <span className="flex items-center gap-1"><Clock size={10} />{post.readTime ?? 5} min</span>
                            <span className="ml-auto text-orange-600 font-semibold text-xs flex items-center gap-1">Lire <ArrowRight size={10} /></span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-[#0D1B3E] to-[#1a3a6e] rounded-2xl p-8 md:p-10">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
            Prêt à Planifier Votre Voyage ?
          </h3>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Après avoir lu nos articles, demandez un devis personnalisé.
            Nos experts sont prêts à créer votre aventure parfaite.
          </p>
          <Link href="/#contact">
            <Button
              size="lg"
              className="bg-[#FF6B35] hover:bg-[#e85a2a] text-white font-bold px-8 py-4 text-base"
            >
              🎯 Demander mon Devis Gratuit
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
