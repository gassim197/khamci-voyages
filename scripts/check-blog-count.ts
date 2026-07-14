import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { blogPosts } from "../drizzle/schema";
import { count } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);
const result = await db.select({ value: count() }).from(blogPosts);
console.log(`Articles dans la DB : ${result[0].value}`);
