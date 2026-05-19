import { useState } from "react";
import { Check, Copy, Facebook, Linkedin, MessageCircle, Share2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SocialShareButtons({ url, title, description, className = "" }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || "");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleShare = (platform: string) => {
    trackEvent("article_share", {
      platform,
      article_title: title,
      article_url: url,
    });
    window.open(shareLinks[platform as keyof typeof shareLinks], "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent("article_share", {
        platform: "copy_link",
        article_title: title,
        article_url: url,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
        trackEvent("article_share", {
          platform: "native_share",
          article_title: title,
          article_url: url,
        });
      } catch {
        // User cancelled share
      }
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <Share2 size={16} />
        <span>Partager cet article</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Facebook */}
        <button
          onClick={() => handleShare("facebook")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1877F2] text-white text-sm font-medium hover:bg-[#166FE5] transition-colors shadow-sm hover:shadow-md"
          aria-label="Partager sur Facebook"
        >
          <Facebook size={16} />
          <span className="hidden sm:inline">Facebook</span>
        </button>

        {/* WhatsApp */}
        <button
          onClick={() => handleShare("whatsapp")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:bg-[#20BD5A] transition-colors shadow-sm hover:shadow-md"
          aria-label="Partager sur WhatsApp"
        >
          <MessageCircle size={16} />
          <span className="hidden sm:inline">WhatsApp</span>
        </button>

        {/* Twitter/X */}
        <button
          onClick={() => handleShare("twitter")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md"
          aria-label="Partager sur X (Twitter)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="hidden sm:inline">X</span>
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => handleShare("linkedin")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#0958A8] transition-colors shadow-sm hover:shadow-md"
          aria-label="Partager sur LinkedIn"
        >
          <Linkedin size={16} />
          <span className="hidden sm:inline">LinkedIn</span>
        </button>

        {/* Copier le lien */}
        <button
          onClick={handleCopyLink}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md ${
            copied
              ? "bg-green-500 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          aria-label="Copier le lien"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span className="hidden sm:inline">{copied ? "Copié !" : "Copier"}</span>
        </button>

        {/* Native Share (mobile) */}
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF6B35] text-white text-sm font-medium hover:bg-[#e85a2a] transition-colors shadow-sm hover:shadow-md sm:hidden"
            aria-label="Plus d'options de partage"
          >
            <Share2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
