import { BlogArticle } from "@/data/blogArticles";
import { Calendar, Clock, User } from "lucide-react";

interface BlogCardProps {
  article: BlogArticle;
  onReadMore: (id: string) => void;
  onQuoteClick: () => void;
}

export default function BlogCard({
  article,
  onReadMore,
  onQuoteClick,
}: BlogCardProps) {
  const categoryColors: Record<string, string> = {
    actualité: "bg-blue-100 text-blue-700",
    destination: "bg-green-100 text-green-700",
    conseil: "bg-purple-100 text-purple-700",
    offre: "bg-red-100 text-red-700",
  };

  return (
    <article className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-gray-200">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {article.featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            ⭐ À la Une
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        {/* Category Badge */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
              categoryColors[article.category] || "bg-gray-100 text-gray-700"
            }`}
          >
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="heading-md text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {article.summary}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-2">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(article.date).toLocaleDateString("fr-FR")}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{article.readTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{article.author}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 pt-4 mt-auto">
          <button
            onClick={() => onReadMore(article.id)}
            className="flex-1 text-orange-600 hover:text-orange-700 font-semibold text-sm transition-colors border border-orange-600 hover:border-orange-700 rounded-lg py-2 px-3"
          >
            Lire l'article →
          </button>
          <button
            onClick={onQuoteClick}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-sm rounded-lg py-2 px-3 transition-all transform hover:scale-105"
          >
            Devis
          </button>
        </div>
      </div>
    </article>
  );
}
