import "dotenv/config";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { adminUsers } from "../drizzle/schema";
import { eq, sql } from "drizzle-orm";

async function main() {
  const OWNER_EMAIL = "khamcivoyages@gmail.com";
  const newPassword = process.env.NEW_OWNER_PASSWORD;

  if (!newPassword) {
    console.error("❌ Variable d'environnement NEW_OWNER_PASSWORD manquante.");
    console.error('   Usage PowerShell :');
    console.error('     $env:NEW_OWNER_PASSWORD = "ton-mot-de-passe"');
    console.error('     pnpm reset:owner');
    console.error('     Remove-Item Env:NEW_OWNER_PASSWORD');
    process.exit(1);
  }

  if (newPassword.length < 12) {
    console.error("❌ Le mot de passe doit faire au moins 12 caractères.");
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL manquant dans l'environnement (.env)");
    process.exit(1);
  }

  const dbClient = neon(process.env.DATABASE_URL);
  const db = drizzle(dbClient);

  const passwordHash = await bcrypt.hash(newPassword, 12);

  const result = await db
    .update(adminUsers)
    .set({ passwordHash })
    .where(eq(sql`lower(${adminUsers.email})`, OWNER_EMAIL.toLowerCase()))
    .returning({
      id: adminUsers.id,
      email: adminUsers.email,
      role: adminUsers.role,
    });

  if (result.length === 0) {
    console.error(`❌ Aucun compte trouvé avec l'email ${OWNER_EMAIL}.`);
    console.error("   Vérifier que le bootstrap owner a bien eu lieu.");
    process.exit(1);
  }

  console.log(`✅ Mot de passe mis à jour pour ${result[0].email} (rôle ${result[0].role}).`);
  console.log("   Tu peux te reconnecter dès maintenant.");
}

main().catch((err) => {
  console.error("Erreur pendant la mise à jour :", err);
  process.exit(1);
});
