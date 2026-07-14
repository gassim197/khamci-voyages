import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Enums Postgres (déclarés en amont des tables, requis par pg-core)
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const quoteStatusEnum = pgEnum("quote_status", ["pending", "in_progress", "completed", "rejected"]);
export const testimonialStatusEnum = pgEnum("testimonial_status", ["pending", "approved", "rejected"]);
export const blogCategoryEnum = pgEnum("blog_category", ["destinations", "conseils", "offres", "actualites"]);
export const blogPostStatusEnum = pgEnum("blog_post_status", ["draft", "published"]);
export const adminRoleEnum = pgEnum("admin_role", ["owner", "editor"]);

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: serial("id").primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Table des devis
export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  // Informations client
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }).notNull(),
  clientPhone: varchar("clientPhone", { length: 50 }),
  // Détails du voyage
  destination: varchar("destination", { length: 255 }),
  departureDate: varchar("departureDate", { length: 50 }),
  returnDate: varchar("returnDate", { length: 50 }),
  passengers: integer("passengers").default(1),
  serviceType: varchar("serviceType", { length: 100 }),
  // Message et notes
  message: text("message"),
  adminNotes: text("adminNotes"),
  // Statut
  status: quoteStatusEnum("status").default("pending").notNull(),
  // Métadonnées
  source: varchar("source", { length: 100 }).default("website"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = typeof quotes.$inferInsert;

// Table des témoignages
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  // Informations client
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientTitle: varchar("clientTitle", { length: 255 }),
  clientLocation: varchar("clientLocation", { length: 255 }),
  // Contenu
  content: text("content").notNull(),
  rating: integer("rating").default(5),
  // Statut
  status: testimonialStatusEnum("status").default("pending").notNull(),
  // Métadonnées
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// Table des paramètres admin (mot de passe, etc.)
export const adminSettings = pgTable("admin_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
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
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

// Table des articles de blog
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImage: varchar("coverImage", { length: 1000 }),
  category: blogCategoryEnum("category").default("destinations").notNull(),
  status: blogPostStatusEnum("status").default("draft").notNull(),
  authorName: varchar("authorName", { length: 255 }).default("KHAMCI VOYAGES"),
  readTime: integer("readTime").default(5),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
  publishedAt: timestamp("publishedAt"),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// Table des comptes administrateurs (multi-admin : owner / editor)
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  passwordHash: text("passwordHash").notNull(),
  role: adminRoleEnum("role").default("editor").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;
