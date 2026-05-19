import { Request, Response, NextFunction } from "express";
import { getBlogPostBySlug } from "./db";

/**
 * Liste des user-agents des crawlers de réseaux sociaux.
 * Ces bots ne peuvent pas exécuter JavaScript, ils lisent uniquement le HTML brut.
 */
const SOCIAL_CRAWLERS = [
  "facebookexternalhit",
  "Facebot",
  "Twitterbot",
  "LinkedInBot",
  "WhatsApp",
  "Slackbot",
  "TelegramBot",
  "Pinterest",
  "Discordbot",
  "Googlebot",
  "bingbot",
];

/**
 * Vérifie si la requête provient d'un crawler de réseau social.
 */
function isSocialCrawler(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  return SOCIAL_CRAWLERS.some((bot) => userAgent.includes(bot));
}

/**
 * Génère le HTML complet avec les métadonnées OG pour un article de blog.
 * Ce HTML est servi aux crawlers pour qu'ils puissent lire les métadonnées.
 */
function generateOgHtml(post: {
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  slug: string;
  authorName: string | null;
  publishedAt: Date | null;
  category: string;
}): string {
  const siteUrl = "https://khamcivoyages.com";
  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  const title = `${post.title} | KHAMCI VOYAGES`;
  const description = post.excerpt || `Lisez "${post.title}" sur le blog de KHAMCI VOYAGES, votre agence de voyages en Guinée.`;
  const defaultOgImage = "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/og-image-khamci-h7N4HYmxhJoJvsUHM7gK9Q.png";
  // S'assurer que l'image est une URL absolue
  let image = post.coverImage || defaultOgImage;
  if (image && !image.startsWith("http")) {
    image = `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`;
  }
  const publishedDate = post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString();

  return `<!DOCTYPE html>
<html lang="fr" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO Primaire -->
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="author" content="${escapeHtml(post.authorName || "KHAMCI VOYAGES")}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${articleUrl}" />

  <!-- Open Graph (Facebook, WhatsApp, LinkedIn) -->
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="KHAMCI VOYAGES" />
  <meta property="og:title" content="${escapeHtml(post.title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${escapeHtml(image)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${escapeHtml(post.title)}" />
  <meta property="og:url" content="${articleUrl}" />
  <meta property="og:locale" content="fr_GN" />
  <meta property="article:published_time" content="${publishedDate}" />
  <meta property="article:author" content="${escapeHtml(post.authorName || "KHAMCI VOYAGES")}" />
  <meta property="article:section" content="${escapeHtml(post.category)}" />

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(post.title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(image)}" />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon.png" />

  <!-- Redirect for browsers (crawlers won't follow this) -->
  <meta http-equiv="refresh" content="0;url=${articleUrl}" />
</head>
<body>
  <h1>${escapeHtml(post.title)}</h1>
  <p>${escapeHtml(description)}</p>
  <p>Lire l'article complet sur <a href="${articleUrl}">KHAMCI VOYAGES</a></p>
</body>
</html>`;
}

/**
 * Échappe les caractères HTML pour éviter les injections XSS.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Middleware Express qui intercepte les requêtes vers /blog/:slug
 * provenant des crawlers de réseaux sociaux et sert un HTML avec
 * les métadonnées Open Graph dynamiques de l'article.
 */
export function ogMiddleware(req: Request, res: Response, next: NextFunction) {
  const userAgent = req.headers["user-agent"];

  // Ne traiter que les requêtes /blog/:slug provenant de crawlers
  const blogMatch = req.path.match(/^\/blog\/([^/]+)$/);
  if (!blogMatch || !isSocialCrawler(userAgent)) {
    return next();
  }

  const slug = blogMatch[1];

  getBlogPostBySlug(slug)
    .then((post) => {
      if (!post || post.status !== "published") {
        return next();
      }

      const html = generateOgHtml(post);
      res.status(200).set({ "Content-Type": "text/html; charset=utf-8" }).end(html);
    })
    .catch((err) => {
      console.error("[OG Middleware] Error fetching blog post:", err);
      next();
    });
}
