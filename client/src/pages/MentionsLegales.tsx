import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Hero */}
          <div className="mb-10">
            <span className="inline-block bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-semibold px-3 py-1 rounded-full mb-4">Informations légales</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0D1B3E] mb-3">Mentions Légales</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Dernière mise à jour : mars 2025</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-10">

            {/* Éditeur */}
            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">1. Éditeur du site</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Le présent site web est édité par <strong>KHAMCI VOYAGES</strong>, agence de voyages enregistrée en République de Guinée.
              </p>
              <ul className="mt-3 space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>Dénomination sociale :</strong> KHAMCI VOYAGES</li>
                <li><strong>Siège social :</strong> Conakry, République de Guinée</li>
                <li><strong>Téléphone :</strong> +224 611 14 58 92</li>
                <li><strong>Email :</strong> khamcivoyages@gmail.com</li>
                <li><strong>Année de création :</strong> 2021</li>
              </ul>
            </section>

            {/* Hébergement */}
            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">2. Hébergement</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Ce site est hébergé par <strong>Manus</strong>, plateforme de déploiement d'applications web.
              </p>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">3. Propriété intellectuelle</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                L'ensemble des contenus présents sur ce site (textes, images, logos, vidéos, graphismes) sont la propriété exclusive de KHAMCI VOYAGES ou de leurs auteurs respectifs. Toute reproduction, distribution, modification ou utilisation de ces contenus sans autorisation écrite préalable est strictement interdite.
              </p>
            </section>

            {/* Données personnelles */}
            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">4. Données personnelles</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Les informations collectées via les formulaires de devis (nom, email, téléphone) sont utilisées exclusivement dans le cadre du traitement de vos demandes par KHAMCI VOYAGES. Elles ne sont en aucun cas transmises à des tiers à des fins commerciales.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                Conformément aux principes de protection des données personnelles, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à l'adresse : <strong>khamcivoyages@gmail.com</strong>.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">5. Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Ce site utilise des cookies techniques nécessaires à son bon fonctionnement (session utilisateur, préférences). Aucun cookie publicitaire ou de traçage tiers n'est utilisé sans votre consentement.
              </p>
            </section>

            {/* Responsabilité */}
            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">6. Limitation de responsabilité</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                KHAMCI VOYAGES s'efforce de maintenir les informations publiées sur ce site à jour et exactes. Cependant, nous ne pouvons garantir l'exactitude, l'exhaustivité ou l'actualité de toutes les informations. Les tarifs et disponibilités affichés sont donnés à titre indicatif et peuvent varier.
              </p>
            </section>

            {/* Droit applicable */}
            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">7. Droit applicable</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Les présentes mentions légales sont soumises au droit guinéen. Tout litige relatif à l'utilisation de ce site sera soumis à la juridiction compétente de Conakry, République de Guinée.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-[#0D1B3E]/5 rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3">Contact</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Pour toute question relative à ces mentions légales, contactez-nous :
              </p>
              <ul className="mt-3 space-y-1 text-gray-700 dark:text-gray-300">
                <li>📧 <strong>khamcivoyages@gmail.com</strong></li>
                <li>📞 <strong>+224 611 14 58 92</strong></li>
                <li>💬 WhatsApp disponible 24h/24</li>
              </ul>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
