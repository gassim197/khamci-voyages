import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { blogPosts } from "../drizzle/schema";
import { blogArticles } from "../client/src/data/blogArticles";

// La catégorie du fichier statique est au singulier (destination, conseil),
// mais l'enum DB est au pluriel (destinations, conseils, offres, actualites).
// Note : le fichier statique utilise "actualité" (accentué), pas "actualite".
const categoryMap: Record<string, "destinations" | "conseils" | "offres" | "actualites"> = {
  destination: "destinations",
  destinations: "destinations",
  conseil: "conseils",
  conseils: "conseils",
  offre: "offres",
  offres: "offres",
  actualité: "actualites",
  actualités: "actualites",
  actualite: "actualites",
  actualites: "actualites",
};

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL manquante — ajouter dans .env");
    process.exit(1);
  }

  const sql = neon(dbUrl);
  const db = drizzle(sql);

  console.log(`Seeding ${blogArticles.length} articles...`);

  for (const article of blogArticles) {
    const categoryDB = categoryMap[article.category] ?? "destinations";

    try {
      await db.insert(blogPosts).values({
        title: article.title,
        slug: article.id,
        excerpt: article.summary,
        content: article.content,
        coverImage: article.image,
        category: categoryDB,
        status: "published",
        authorName: article.author,
        readTime: article.readTime,
        publishedAt: new Date(article.date),
      }).onConflictDoNothing({ target: blogPosts.slug });

      console.log(`✓ ${article.title}`);
    } catch (err: any) {
      console.error(`✗ ${article.title} — ${err.message}`);
    }
  }

  console.log(`\nDone.`);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
