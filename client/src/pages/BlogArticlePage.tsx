import { trpc } from "@/lib/trpc";
import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, Clock, Tag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialShareButtons from "@/components/SocialShareButtons";
import ReadingProgressBar from "@/components/ReadingProgressBar";

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

export default function BlogArticlePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";

  const { data: post, isLoading, error } = trpc.blog.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <ReadingProgressBar />
      <Header />

      <main className="flex-grow pt-20">
        {/* Loading */}
        {isLoading && (
          <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        )}

        {/* Error / Not Found */}
        {(error || (!isLoading && !post)) && (
          <div className="max-w-3xl mx-auto px-4 py-20 text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Article introuvable</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Cet article n'existe pas ou n'est plus disponible.</p>
            <Link href="/#blog">
              <Button className="bg-[#FF6B35] hover:bg-[#e85a2a] text-white">
                <ArrowLeft size={16} className="mr-2" />
                Retour au Blog
              </Button>
            </Link>
          </div>
        )}

        {/* Article Content */}
        {!isLoading && post && (
          <>
            {/* Hero */}
            <div className="relative">
              {post.coverImage ? (
                <div className="h-64 md:h-96 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              ) : (
                <div className="h-32 bg-gradient-to-r from-[#0D1B3E] to-[#1a3a6e]" />
              )}
            </div>

            {/* Article Body */}
            <div className="max-w-3xl mx-auto px-4 py-10">
              {/* Back link */}
              <Link href="/#blog" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold mb-6 text-sm">
                <ArrowLeft size={16} />
                Retour au Blog
              </Link>

              {/* Category badge */}
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-4 ${CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700 dark:text-gray-300"}`}>
                <Tag size={10} />
                {CATEGORY_LABELS[post.category] ?? post.category}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
                    : new Date(post.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime ?? 5} min de lecture
                </span>
                <span className="font-medium text-gray-700 dark:text-gray-300">Par {post.authorName ?? "KHAMCI VOYAGES"}</span>
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg text-gray-600 dark:text-gray-400 italic mb-8 border-l-4 border-orange-400 pl-4">
                  {post.excerpt}
                </p>
              )}

              {/* Content — HTML généré par l'éditeur riche (admins authentifiés) */}
              <div
                className="prose prose-lg dark:prose-invert prose-headings:font-bold
                  prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Social Share Buttons */}
              <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
                <SocialShareButtons
                  url={window.location.href}
                  title={post.title}
                  description={post.excerpt ?? undefined}
                />
              </div>

              {/* CTA */}
              <div className="mt-12 bg-gradient-to-r from-[#0D1B3E] to-[#1a3a6e] rounded-2xl p-6 md:p-8 text-center">
                <h3 className="text-white text-xl font-bold mb-2">
                  Cet article vous a inspiré ?
                </h3>
                <p className="text-white/70 mb-5 text-sm">
                  Demandez votre devis personnalisé — réponse garantie en moins de 24h, gratuit et sans engagement.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/#contact">
                    <Button className="bg-[#FF6B35] hover:bg-[#e85a2a] text-white font-bold px-6">
                      🎯 Demander un Service
                    </Button>
                  </Link>
                  <a
                    href="https://wa.me/224611145892"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-6">
                      <MessageCircle size={16} className="mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
