import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConditionsUtilisation() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Hero */}
          <div className="mb-10">
            <span className="inline-block bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-semibold px-3 py-1 rounded-full mb-4">Conditions générales</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0D1B3E] mb-3">Conditions d'Utilisation</h1>
            <p className="text-gray-500 text-sm">Dernière mise à jour : mars 2025</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-10">

            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100">1. Acceptation des conditions</h2>
              <p className="text-gray-700 leading-relaxed">
                En accédant et en utilisant le site web de KHAMCI VOYAGES, vous acceptez sans réserve les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100">2. Services proposés</h2>
              <p className="text-gray-700 leading-relaxed">
                KHAMCI VOYAGES est une agence de voyages proposant les services suivants :
              </p>
              <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-5">
                <li>Billetterie aérienne (vols internationaux)</li>
                <li>Réservation d'hôtels</li>
                <li>Location de véhicules</li>
                <li>Assistance visa pour 7 destinations</li>
                <li>Assurance voyage</li>
                <li>Organisation de pèlerinages Hadj et Oumra</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Les demandes de devis soumises via le site sont traitées dans un délai de <strong>24 heures ouvrables</strong>. Un devis en ligne ne constitue pas une réservation ferme.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100">3. Tarifs et paiement</h2>
              <p className="text-gray-700 leading-relaxed">
                Les tarifs affichés sur le site sont donnés à titre indicatif et peuvent varier en fonction des disponibilités, des dates et des conditions tarifaires des compagnies aériennes et prestataires partenaires. Le prix définitif est confirmé par notre équipe lors du traitement de votre devis.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                L'offre de lancement de <strong>-5% de réduction</strong> s'applique aux réservations effectuées via le site web, sous réserve de disponibilité et de conditions particulières.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100">4. Annulation et remboursement</h2>
              <p className="text-gray-700 leading-relaxed">
                Les conditions d'annulation et de remboursement varient selon le type de service, la compagnie aérienne ou le prestataire concerné. KHAMCI VOYAGES vous informera des conditions spécifiques applicables à votre réservation au moment de la confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100">5. Responsabilités</h2>
              <p className="text-gray-700 leading-relaxed">
                KHAMCI VOYAGES agit en qualité d'intermédiaire entre les clients et les prestataires de services (compagnies aériennes, hôtels, consulats). Notre responsabilité est limitée à notre rôle d'agence et ne couvre pas les défaillances des prestataires tiers.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                Il appartient au voyageur de s'assurer de la validité de ses documents de voyage (passeport, visa) et de respecter les exigences d'entrée du pays de destination.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100">6. Utilisation du site</h2>
              <p className="text-gray-700 leading-relaxed">
                Vous vous engagez à utiliser ce site de manière licite et à ne pas :
              </p>
              <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-5">
                <li>Soumettre des informations fausses ou trompeuses dans les formulaires</li>
                <li>Tenter d'accéder à des zones non autorisées du site</li>
                <li>Utiliser des outils automatisés pour extraire des données du site</li>
                <li>Perturber le fonctionnement normal du site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3 pb-2 border-b border-gray-100">7. Modification des conditions</h2>
              <p className="text-gray-700 leading-relaxed">
                KHAMCI VOYAGES se réserve le droit de modifier ces conditions d'utilisation à tout moment. Les modifications prennent effet dès leur publication sur le site. Il vous appartient de consulter régulièrement cette page.
              </p>
            </section>

            <section className="bg-[#0D1B3E]/5 rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#0D1B3E] mb-3">Contact</h2>
              <p className="text-gray-700">Pour toute question relative à ces conditions d'utilisation :</p>
              <ul className="mt-3 space-y-1 text-gray-700">
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
