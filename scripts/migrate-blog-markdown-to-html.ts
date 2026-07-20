import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { blogPosts } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { marked } from "marked";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL manquant.");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  const posts = await db.select().from(blogPosts);
  console.log(`${posts.length} articles trouvés. Analyse en cours…`);

  let converted = 0;
  let skipped = 0;

  for (const post of posts) {
    const content = post.content ?? "";

    // Heuristique de détection : si le contenu contient déjà des balises
    // HTML de bloc (<p>, <h2>, <ul>...), on considère qu'il est déjà en
    // HTML et on skip. Sinon on convertit depuis Markdown.
    const looksLikeHtml = /<(p|h[1-6]|ul|ol|blockquote|hr|div|img|a\s)/i.test(content);

    if (looksLikeHtml) {
      console.log(`  ⊘ ${post.title} — déjà en HTML, skip`);
      skipped++;
      continue;
    }

    const html = await marked.parse(content, {
      gfm: true,
      breaks: false,
    });

    await db
      .update(blogPosts)
      .set({ content: html })
      .where(eq(blogPosts.id, post.id));

    console.log(`  ✅ ${post.title} — converti (${content.length} → ${html.length} chars)`);
    converted++;
  }

  console.log(`\nTerminé : ${converted} convertis, ${skipped} déjà en HTML.`);
}

main().catch((err) => {
  console.error("Erreur :", err);
  process.exit(1);
});
