export const ENV = {
  // App
  isProduction: process.env.NODE_ENV === "production",
  publicSiteUrl: process.env.PUBLIC_SITE_URL ?? "http://localhost:3000",

  // Database (Neon Postgres)
  databaseUrl: process.env.DATABASE_URL ?? "",

  // Admin auth
  cookieSecret: process.env.JWT_SECRET ?? "",
  adminPassword: process.env.ADMIN_PASSWORD ?? "",

  // Email (Gmail SMTP)
  gmailUser: process.env.GMAIL_USER ?? "",
  gmailAppPassword: process.env.GMAIL_APP_PASSWORD ?? "",
};
