import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Hero */}
          <div className="mb-10">
            <span className="inline-block bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-semibold px-3 py-1 rounded-full mb-4">Vie privée</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0D1B3E] mb-3">Politique de Confidentialité</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Dernière mise à jour : mars 2025</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-10">

            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">1. Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                KHAMCI VOYAGES accorde une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">2. Données collectées</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Nous collectons les données suivantes :</p>
              <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li><strong>Données d'identification :</strong> nom, prénom</li>
                <li><strong>Coordonnées :</strong> adresse email, numéro de téléphone</li>
                <li><strong>Données de voyage :</strong> destination souhaitée, dates de voyage, nombre de passagers</li>
                <li><strong>Messages :</strong> contenu de vos demandes de devis et messages envoyés via le formulaire de contact</li>
                <li><strong>Données techniques :</strong> adresse IP, type de navigateur, pages visitées (via des cookies techniques)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">3. Finalités du traitement</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Vos données sont utilisées pour :</p>
              <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li>Traiter et répondre à vos demandes de devis</li>
                <li>Vous contacter dans le cadre de votre demande de voyage</li>
                <li>Vous envoyer des confirmations et informations relatives à votre réservation</li>
                <li>Améliorer nos services et l'expérience utilisateur du site</li>
                <li>Vous envoyer notre newsletter (uniquement si vous y avez consenti)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">4. Conservation des données</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Vos données personnelles sont conservées pendant la durée nécessaire au traitement de votre demande, et au maximum pendant <strong>3 ans</strong> à compter de votre dernière interaction avec KHAMCI VOYAGES. Les données de newsletter sont conservées jusqu'à votre désinscription.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">5. Partage des données</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                KHAMCI VOYAGES ne vend ni ne loue vos données personnelles à des tiers. Vos données peuvent être partagées avec nos partenaires de voyage (compagnies aériennes, hôtels, prestataires visa) uniquement dans le cadre du traitement de votre demande, et avec votre consentement explicite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">6. Vos droits</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Vous disposez des droits suivants concernant vos données personnelles :</p>
              <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                Pour exercer ces droits, contactez-nous à : <strong>khamcivoyages@gmail.com</strong>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">7. Sécurité</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Notre site utilise le protocole HTTPS pour sécuriser les échanges de données.
              </p>
            </section>

            <section className="bg-[#0D1B3E]/5 rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3">Contact</h2>
              <p className="text-gray-700 dark:text-gray-300">Pour toute question relative à cette politique de confidentialité :</p>
              <ul className="mt-3 space-y-1 text-gray-700 dark:text-gray-300">
                <li>📧 <strong>khamcivoyages@gmail.com</strong></li>
                <li>📞 <strong>+224 611 14 58 92</strong></li>
              </ul>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
