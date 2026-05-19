import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Calendar, Clock, Tag, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useMemo } from "react";

const CATEGORY_LABELS: Record<string, string> = {
  destinations: "Destinations",
  conseils: "Conseils",
  offres: "Offres Spéciales",
  actualites: "Actualités",
};

const CATEGORY_COLORS: Record<string, string> = {
  destinations: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  conseils: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  offres: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  actualites: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
};

export default function BlogPage() {
  const { data: posts, isLoading } = trpc.blog.listPublished.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    let filtered = posts;
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(q))
      );
    }
    return filtered;
  }, [posts, selectedCategory, searchQuery]);

  const categories = ["all", "destinations", "conseils", "offres", "actualites"];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Header />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#0D1B3E] to-[#1a3a6e] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[Playfair_Display]">
              Blog KHAMCI VOYAGES
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Conseils de voyage, destinations inspirantes et actualités pour préparer votre prochaine aventure.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#FF6B35] text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat === "all" ? "Tous" : CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📝</div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {searchQuery || selectedCategory !== "all"
                  ? "Aucun article trouvé"
                  : "Le blog arrive bientôt !"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery || selectedCategory !== "all"
                  ? "Essayez avec d'autres mots-clés ou une autre catégorie."
                  : "Nos premiers articles seront publiés très prochainement. Restez connectés !"}
              </p>
            </div>
          )}

          {/* Articles Grid */}
          {!isLoading && filteredPosts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Cover Image */}
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-[#0D1B3E] to-[#1a3a6e]">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl">✈️</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Category */}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mb-3 ${
                        CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Tag size={10} />
                      {CATEGORY_LABELS[post.category] ?? post.category}
                    </span>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#FF6B35] transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : new Date(post.createdAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime ?? 5} min
                      </span>
                    </div>

                    {/* Read More */}
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#FF6B35] group-hover:gap-2 transition-all">
                      Lire l'article
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#0D1B3E] to-[#1a3a6e] py-12 px-4 mt-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Envie de voyager ?
            </h2>
            <p className="text-white/70 mb-6">
              Demandez votre devis personnalisé — réponse garantie en moins de 24h, gratuit et sans engagement.
            </p>
            <Link href="/#contact">
              <Button className="bg-[#FF6B35] hover:bg-[#e85a2a] text-white font-bold px-8 py-3 text-lg">
                Demander un Service
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
