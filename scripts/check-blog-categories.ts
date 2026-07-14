import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { blogPosts } from "../drizzle/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);
const rows = await db
  .select({ slug: blogPosts.slug, category: blogPosts.category, status: blogPosts.status })
  .from(blogPosts);
for (const r of rows) console.log(`${r.status}\t${r.category}\t${r.slug}`);
