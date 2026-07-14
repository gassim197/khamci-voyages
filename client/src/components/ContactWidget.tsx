import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { trackWhatsAppClick } from "@/lib/analytics";

/**
 * ContactWidget - KHAMCI VOYAGES
 *
 * Widget de contact flottant unique (bas-droite) : au clic, ouvre un panel
 * avec un formulaire de contact compact + un CTA WhatsApp prominent.
 * Remplace l'ancien bouton WhatsApp standalone.
 */

// Numéro WhatsApp de KHAMCI VOYAGES (format international sans +)
const WHATSAPP_NUMBER = "224611145892";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour KHAMCI VOYAGES, je souhaite obtenir un devis pour mon voyage. Pouvez-vous m'aider ?"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const contactSchema = z.object({
  nom: z.string().min(2, "Votre nom est requis (2 caractères min.)"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  message: z.string().min(10, "Votre message doit faire au moins 10 caractères"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const submitQuote = trpc.quotes.submit.useMutation({
    onSuccess: () => {
      toast.success("Message envoyé avec succès ! Nous vous recontacterons sous 24h.");
      reset();
      setTimeout(() => setIsOpen(false), 1500);
    },
    onError: () => {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    submitQuote.mutate({
      clientName: values.nom,
      clientEmail: values.email,
      clientPhone: values.telephone || undefined,
      message: values.message,
      source: "contact-widget",
    });
  };

  return (
    <>
      {/* Overlay pour fermer au clic en dehors */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Panel ouvert */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-[380px] overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
            role="dialog"
            aria-label="Formulaire de contact"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-[#FF6B35] to-[#e85a2a] p-5 text-white">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1 text-white/90 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-bold">Contactez-nous</h3>
              <p className="text-sm italic text-white/90">Nous répondons sous 24h</p>
            </div>

            {/* Body */}
            <div className="space-y-4 p-5">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                  <Input
                    type="text"
                    placeholder="Votre nom *"
                    autoComplete="name"
                    {...register("nom")}
                  />
                  {errors.nom && (
                    <p className="mt-1 text-xs text-red-500">{errors.nom.message}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Votre email *"
                    autoComplete="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="tel"
                    placeholder="Téléphone (optionnel)"
                    autoComplete="tel"
                    {...register("telephone")}
                  />
                </div>

                <div>
                  <Textarea
                    placeholder="Comment pouvons-nous vous aider ? *"
                    rows={3}
                    className="resize-none"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitQuote.isPending}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FF6B35] to-[#e85a2a] py-3 font-semibold text-white shadow-md transition-all hover:from-[#e85a2a] hover:to-[#d44e22] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {submitQuote.isPending ? "Envoi en cours..." : "Envoyer"}
                </button>
              </form>

              {/* Séparateur OU */}
              <div className="relative flex items-center justify-center">
                <div className="h-px w-full bg-gray-200 dark:bg-gray-700" />
                <span className="absolute bg-white px-3 text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                  OU
                </span>
              </div>

              {/* CTA WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(window.location.pathname)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 font-semibold text-white shadow-md transition-colors hover:bg-[#1ebe5b]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Discuter sur WhatsApp
              </a>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-3 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
              Almamya, Kaloum, Conakry — +224 611 14 58 92
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton flottant */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Fermer le contact" : "Nous contacter"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B35] to-[#e85a2a] text-white shadow-lg transition-transform duration-300 hover:scale-110"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}
