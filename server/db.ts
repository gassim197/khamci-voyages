import { eq, desc, gte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { InsertUser, users, quotes, testimonials, adminSettings, newsletterSubscribers, blogPosts, InsertQuote, InsertTestimonial, AdminProfile, InsertBlogPost, adminUsers, AdminUser } from "../drizzle/schema";
import bcrypt from "bcryptjs";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      _db = drizzle(sql);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// =====================
// QUOTES (DEVIS)
// =====================

export async function createQuote(data: InsertQuote) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(quotes).values(data);
}

export async function getAllQuotes() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(quotes).orderBy(desc(quotes.createdAt));
}

export async function getQuoteById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(quotes).where(eq(quotes.id, id)).limit(1);
  return result[0] ?? null;
}

export async function updateQuoteStatus(id: number, status: "pending" | "in_progress" | "completed" | "rejected", adminNotes?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: Record<string, unknown> = { status };
  if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
  return db.update(quotes).set(updateData).where(eq(quotes.id, id));
}

export async function deleteQuote(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(quotes).where(eq(quotes.id, id));
}

// Récupérer toutes les statistiques pour le dashboard
export async function getQuoteStats() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Récupérer tous les devis des 90 derniers jours
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const allQuotes = await db
    .select()
    .from(quotes)
    .where(gte(quotes.createdAt, ninetyDaysAgo))
    .orderBy(desc(quotes.createdAt));

  // Tous les devis pour les stats globales
  const totalQuotes = await db.select().from(quotes);

  return { recentQuotes: allQuotes, allQuotes: totalQuotes };
}

// =====================
// TESTIMONIALS (TÉMOIGNAGES)
// =====================

export async function createTestimonial(data: InsertTestimonial) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(testimonials).values(data);
}

export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
}

export async function getApprovedTestimonials() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(testimonials).where(eq(testimonials.status, "approved")).orderBy(desc(testimonials.createdAt));
}

export async function updateTestimonialStatus(id: number, status: "pending" | "approved" | "rejected") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(testimonials).set({ status }).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(testimonials).where(eq(testimonials.id, id));
}

// =====================
// ADMIN SETTINGS (MOT DE PASSE)
// =====================

const ADMIN_PASSWORD_KEY = "admin_password";

export async function getAdminPasswordHash(): Promise<string | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(adminSettings).where(eq(adminSettings.key, ADMIN_PASSWORD_KEY)).limit(1);
  return result[0]?.value ?? null;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = await getAdminPasswordHash();
  // Si aucun hash en DB, utiliser le mot de passe par défaut de l'env
  if (!hash) {
    const defaultPassword = process.env.ADMIN_PASSWORD;
    if (!defaultPassword) {
      throw new Error(
        "ADMIN_PASSWORD environment variable is required. " +
        "Set it in .env or in your deployment environment."
      );
    }
    return password === defaultPassword;
  }
  return bcrypt.compare(password, hash);
}

export async function setAdminPassword(newPassword: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const hash = await bcrypt.hash(newPassword, 12);
  await db.insert(adminSettings)
    .values({ key: ADMIN_PASSWORD_KEY, value: hash })
    .onConflictDoUpdate({ target: adminSettings.key, set: { value: hash } });
}

// =====================
// ADMIN PROFILE
// =====================

const ADMIN_PROFILE_KEY = "admin_profile";

const DEFAULT_PROFILE: AdminProfile = {
  name: "Administrateur",
  email: "khamcivoyages@gmail.com",
  phone: "+224 611 14 58 92",
  position: "Administrateur",
  bio: "",
  avatarUrl: "",
};

export async function getAdminProfile(): Promise<AdminProfile> {
  const db = await getDb();
  if (!db) return DEFAULT_PROFILE;
  const result = await db.select().from(adminSettings).where(eq(adminSettings.key, ADMIN_PROFILE_KEY)).limit(1);
  if (!result[0]) return DEFAULT_PROFILE;
  try {
    return JSON.parse(result[0].value) as AdminProfile;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export async function updateAdminProfile(profile: Partial<AdminProfile>): Promise<AdminProfile> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const current = await getAdminProfile();
  const updated = { ...current, ...profile };
  await db.insert(adminSettings)
    .values({ key: ADMIN_PROFILE_KEY, value: JSON.stringify(updated) })
    .onConflictDoUpdate({ target: adminSettings.key, set: { value: JSON.stringify(updated) } });
  return updated;
}

// =====================
// NEWSLETTER
// =====================

export async function subscribeToNewsletter(email: string, name?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Upsert : si l'email existe déjà, on réactive l'abonnement
  await db.insert(newsletterSubscribers)
    .values({ email, name: name ?? null, isActive: true })
    .onConflictDoUpdate({ target: newsletterSubscribers.email, set: { isActive: true, name: name ?? null } });
}

export async function getAllNewsletterSubscribers() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt));
}

export async function deleteNewsletterSubscriber(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.id, id));
}

// =====================
// BLOG POSTS
// =====================

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 100);
}

export async function createBlogPost(data: Omit<InsertBlogPost, "slug">) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const baseSlug = generateSlug(data.title);
  // S'assurer que le slug est unique
  const existing = await db.select().from(blogPosts).where(eq(blogPosts.slug, baseSlug)).limit(1);
  const slug = existing.length > 0 ? `${baseSlug}-${Date.now()}` : baseSlug;
  const insertData: InsertBlogPost = {
    ...data,
    slug,
    publishedAt: data.status === "published" ? new Date() : null,
  };
  const result = await db.insert(blogPosts).values(insertData);
  return result;
}

export async function updateBlogPost(id: number, data: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: Record<string, unknown> = { ...data };
  // Si on publie, mettre la date de publication
  if (data.status === "published") {
    const existing = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    if (existing[0] && !existing[0].publishedAt) {
      updateData.publishedAt = new Date();
    }
  }
  return db.update(blogPosts).set(updateData).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(blogPosts).where(eq(blogPosts.id, id));
}

export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
}

export async function getPublishedBlogPosts() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result[0] ?? null;
}

// =====================
// ADMIN USERS (MULTI-ADMIN : owner / editor)
// =====================

// Utilisateur admin sans le hash du mot de passe (jamais exposé au client).
export type SafeAdminUser = Omit<AdminUser, "passwordHash">;

function toSafeAdminUser(user: AdminUser): SafeAdminUser {
  const { passwordHash: _passwordHash, ...safe } = user;
  return safe;
}

const normalizeEmail = (email: string) => email.trim().toLowerCase();

// Au premier démarrage, crée le compte owner à partir de ADMIN_PASSWORD si
// la table admin_users est vide.
export async function bootstrapOwnerIfEmpty(): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Bootstrap ignoré : base de données indisponible");
    return;
  }

  const existing = await db.select({ id: adminUsers.id }).from(adminUsers).limit(1);
  if (existing.length > 0) return;

  const ownerPassword = process.env.ADMIN_PASSWORD;
  if (!ownerPassword) {
    throw new Error(
      "ADMIN_PASSWORD environment variable is required to bootstrap the owner account. " +
      "Set it in .env or in your deployment environment."
    );
  }

  const passwordHash = await bcrypt.hash(ownerPassword, 12);
  await db.insert(adminUsers).values({
    email: normalizeEmail("khamcivoyages@gmail.com"),
    name: ENV.adminName,
    passwordHash,
    role: "owner",
  });
  console.log("[Admin] Compte owner créé (khamcivoyages@gmail.com)");
}

// Vérifie email + mot de passe. Retourne l'utilisateur (sans hash) ou null.
export async function verifyAdminUser(email: string, password: string): Promise<SafeAdminUser | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(adminUsers).where(eq(adminUsers.email, normalizeEmail(email))).limit(1);
  const user = result[0];
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return toSafeAdminUser(user);
}

export async function listAdminUsers(): Promise<SafeAdminUser[]> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(adminUsers).orderBy(adminUsers.createdAt);
  return rows.map(toSafeAdminUser);
}

// Crée un editor (on ne crée jamais de second owner en V1).
export async function createAdminUser(data: { email: string; name: string; password: string }): Promise<SafeAdminUser> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const email = normalizeEmail(data.email);

  const existing = await db.select({ id: adminUsers.id }).from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  if (existing.length > 0) {
    throw new Error("Email déjà utilisé");
  }

  const passwordHash = await bcrypt.hash(data.password, 12);
  const inserted = await db.insert(adminUsers).values({
    email,
    name: data.name.trim(),
    passwordHash,
    role: "editor",
  }).returning();
  return toSafeAdminUser(inserted[0]);
}

// Supprime un utilisateur. Interdit la suppression d'un owner (garde-fou : le
// dernier owner ne peut pas être supprimé, et aucun second owner n'existe en V1).
export async function deleteAdminUser(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const target = await db.select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
  const user = target[0];
  if (!user) throw new Error("Utilisateur introuvable");
  if (user.role === "owner") {
    throw new Error("Impossible de supprimer un compte propriétaire");
  }
  await db.delete(adminUsers).where(eq(adminUsers.id, id));
}

// Met à jour le hash de mot de passe d'un utilisateur (changement par lui-même).
export async function updateAdminUserPassword(id: number, newPassword: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const passwordHash = await bcrypt.hash(newPassword, 12);
  await db.update(adminUsers).set({ passwordHash }).where(eq(adminUsers.id, id));
}
