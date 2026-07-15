export const ENV = {
  // App
  isProduction: process.env.NODE_ENV === "production",
  publicSiteUrl: process.env.PUBLIC_SITE_URL ?? "http://localhost:3000",

  // Database (Neon Postgres)
  databaseUrl: process.env.DATABASE_URL ?? "",

  // Admin auth
  cookieSecret: process.env.JWT_SECRET ?? "",
  adminPassword: process.env.ADMIN_PASSWORD ?? "",
  // Nom affiché du compte owner créé au premier démarrage. Volontairement pas
  // le nom de la marque : la sidebar distingue le branding de la personne
  // connectée. Aucun endpoint de renommage n'existe, d'où le réglage ici.
  adminName: process.env.ADMIN_NAME?.trim() || "Administrateur",

  // Email (Resend — envoi transactionnel via SMTP)
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  // Adresse d'expéditeur. Avant vérification du domaine : "onboarding@resend.dev"
  // (Resend n'autorise alors l'envoi que vers l'email du compte). Une fois
  // khamci-voyages.com vérifié : "contact@khamci-voyages.com".
  emailFrom: process.env.EMAIL_FROM ?? "onboarding@resend.dev",
};
