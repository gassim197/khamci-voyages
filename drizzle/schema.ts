import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Table des devis
export const quotes = mysqlTable("quotes", {
  id: int("id").autoincrement().primaryKey(),
  // Informations client
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }).notNull(),
  clientPhone: varchar("clientPhone", { length: 50 }),
  // Détails du voyage
  destination: varchar("destination", { length: 255 }),
  departureDate: varchar("departureDate", { length: 50 }),
  returnDate: varchar("returnDate", { length: 50 }),
  passengers: int("passengers").default(1),
  serviceType: varchar("serviceType", { length: 100 }),
  // Message et notes
  message: text("message"),
  adminNotes: text("adminNotes"),
  // Statut
  status: mysqlEnum("status", ["pending", "in_progress", "completed", "rejected"]).default("pending").notNull(),
  // Métadonnées
  source: varchar("source", { length: 100 }).default("website"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = typeof quotes.$inferInsert;

// Table des témoignages
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  // Informations client
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientTitle: varchar("clientTitle", { length: 255 }),
  clientLocation: varchar("clientLocation", { length: 255 }),
  // Contenu
  content: text("content").notNull(),
  rating: int("rating").default(5),
  // Statut
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  // Métadonnées
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// Table des paramètres admin (mot de passe, etc.)
export const adminSettings = mysqlTable("admin_settings", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AdminSetting = typeof adminSettings.$inferSelect;
export type InsertAdminSetting = typeof adminSettings.$inferInsert;

// Type pour le profil admin
export type AdminProfile = {
  name: string;
  email: string;
  phone: string;
  position: string;
  bio: string;
  avatarUrl: string;
};

// Table des abonnés à la newsletter
export const newsletterSubscribers = mysqlTable("newsletter_subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

// Table des articles de blog
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImage: varchar("coverImage", { length: 1000 }),
  category: mysqlEnum("category", ["destinations", "conseils", "offres", "actualites"]).default("destinations").notNull(),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  authorName: varchar("authorName", { length: 255 }).default("KHAMCI VOYAGES"),
  readTime: int("readTime").default(5),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  publishedAt: timestamp("publishedAt"),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;
