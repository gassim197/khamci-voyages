import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/Header";
import { trpc } from "@/lib/trpc";
import { trackEvent } from "@/lib/analytics";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import {
  studyApplicationSchema,
  studyContactSchema,
  studyOptions,
} from "@shared/studyFrance";
import "./StudiesFrance.css";

const metadata = {
  title: "Études en France : préparez votre projet | Khamci Voyages",
  description:
    "Depuis la Guinée, préparez votre projet d’études en France avec Khamci Voyages : orientation, dossier, entretien et accompagnement visa après admission.",
  ogTitle: "Votre projet d’études en France commence ici",
  ogDescription:
    "Découvrez l’accompagnement Khamci Voyages et présentez votre projet en quelques étapes.",
  ogUrl: "https://khamci-voyages.com/etudes-france",
  canonicalUrl: "https://khamci-voyages.com/etudes-france",
};
const initialValues = {
  name: "",
  phone: "",
  email: "",
  city: "",
  diploma: "",
  level: "",
  field: "",
  intake: "",
  progress: "",
  funding: "",
  notes: "",
  website: "",
  consent: false,
};
type FieldName = keyof typeof initialValues;
const questions = [
  [
    "À qui s’adresse cet accompagnement ?",
    "Aux étudiants qui préparent un projet d’études en France depuis la Guinée. Nous examinons votre parcours, le niveau souhaité et l’avancement de vos démarches avant de préciser l’accompagnement adapté.",
  ],
  [
    "Khamci Voyages est-il Campus France ?",
    "Non. Khamci Voyages est une agence privée indépendante de Campus France. Les démarches officielles, leurs conditions et leurs calendriers restent ceux des organismes concernés.",
  ],
  [
    "L’admission et le visa sont-ils garantis ?",
    "Non. L’admission relève des établissements et le visa des autorités compétentes. Notre rôle est de vous aider à préparer un projet cohérent et un dossier complet.",
  ],
  [
    "Que se passe-t-il après ma préinscription ?",
    "L’équipe étudie les informations transmises puis vous recontacte pour échanger sur votre projet et préciser les prochaines étapes. Le formulaire ne confirme ni une admission ni votre inscription à l’accompagnement.",
  ],
  [
    "Dois-je envoyer mes documents maintenant ?",
    "Non. Vos coordonnées et les grandes lignes de votre projet suffisent pour ce premier contact. Les pièces nécessaires seront précisées lors de l’échange avec votre conseiller.",
  ],
];

function ApplicationForm() {
  const [values, setValues] = useState(initialValues);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  const [campaign] = useState(() => {
    const p = new URLSearchParams(window.location.search);
    const get = (key: string) => (p.get(key) || "").slice(0, 100);
    return {
      source: get("utm_source"),
      medium: get("utm_medium"),
      name: get("utm_campaign"),
      content: get("utm_content"),
    };
  });
  const mutation = trpc.studyFrance.submit.useMutation({
    onSuccess: () => {
      setValues(initialValues);
      trackEvent("study_france_submitted", { form: "etudes-france" });
    },
  });
  useEffect(() => {
    if (mutation.isSuccess) headingRef.current?.focus();
  }, [mutation.isSuccess]);
  const update = (key: FieldName, value: string | boolean) => {
    setValues(v => ({ ...v, [key]: value }));
    setErrors(e => ({ ...e, [key]: "" }));
    if (!started.current) {
      started.current = true;
      trackEvent("study_france_started", { form: "etudes-france" });
    }
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (mutation.isPending) return;
    const result = (
      step === 1 ? studyContactSchema : studyApplicationSchema
    ).safeParse({ ...values, campaign });
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      });
      setErrors(next);
      requestAnimationFrame(() =>
        document.getElementById(`study-${Object.keys(next)[0]}`)?.focus()
      );
      return;
    }
    if (step === 1) {
      setErrors({});
      setStep(2);
      requestAnimationFrame(() =>
        document.getElementById("study-diploma")?.focus()
      );
      return;
    }
    mutation.mutate(studyApplicationSchema.parse({ ...values, campaign }));
  };
  const field = (
    key: Exclude<FieldName, "consent" | "website">,
    label: string,
    options: {
      type?: string;
      placeholder?: string;
      choices?: readonly string[];
      autoComplete?: string;
      maxLength?: number;
    } = {}
  ) => {
    const props = {
      id: `study-${key}`,
      name: key,
      value: values[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        update(key, e.target.value),
      "aria-invalid": !!errors[key],
      "aria-describedby": errors[key] ? `error-${key}` : undefined,
      required: true,
    };
    return (
      <div className="sf-field">
        <label htmlFor={props.id}>{label}</label>
        {options.choices ? (
          <select {...props}>
            <option value="">Sélectionnez une réponse</option>
            {options.choices.map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ) : (
          <input
            {...props}
            type={options.type || "text"}
            placeholder={options.placeholder}
            autoComplete={options.autoComplete}
            maxLength={options.maxLength || 160}
          />
        )}
        {errors[key] && (
          <span className="sf-error" id={`error-${key}`}>
            {errors[key]}
          </span>
        )}
      </div>
    );
  };
  if (mutation.isSuccess)
    return (
      <div className="sf-success" role="status">
        <CheckCircle2 size={56} />
        <p className="sf-eyebrow">PREMIÈRE ÉTAPE ACCOMPLIE</p>
        <h3 ref={headingRef} tabIndex={-1}>
          Votre demande est enregistrée.
        </h3>
        <p>
          Notre équipe va étudier votre projet et vous recontacter aux
          coordonnées indiquées.
        </p>
        <p className="sf-small">
          Cette préinscription ne constitue pas une confirmation
          d’accompagnement, d’admission ou de visa.
        </p>
        <a href="tel:+224611145892" className="sf-text-link">
          Une question ? Appelez-nous <ArrowRight size={16} />
        </a>
      </div>
    );
  return (
    <form
      onSubmit={submit}
      noValidate
      className="sf-form"
      aria-label="Préinscription Études France"
    >
      <div className="sf-form-progress" aria-label={`Étape ${step} sur 2`}>
        <span className={step === 1 ? "active" : "done"}>
          <b>{step === 2 ? <Check size={14} /> : "1"}</b> Vos coordonnées
        </span>
        <i />
        <span className={step === 2 ? "active" : ""}>
          <b>2</b> Votre projet
        </span>
      </div>
      <h3>
        {step === 1 ? "Faisons connaissance." : "Parlons de votre projet."}
      </h3>
      <p className="sf-form-intro">
        {step === 1
          ? "Comment pouvons-nous vous recontacter ?"
          : "Quelques repères pour préparer notre premier échange."}{" "}
        Tous les champs sont requis, sauf mention contraire.
      </p>
      <fieldset disabled={mutation.isPending}>
        <legend className="sr-only">
          {step === 1 ? "Vos coordonnées" : "Votre projet d’études"}
        </legend>
        <div className="sf-fields">
          {step === 1 ? (
            <>
              {field("name", "Nom et prénom", {
                autoComplete: "name",
                placeholder: "Votre nom complet",
                maxLength: 120,
              })}
              {field("phone", "Téléphone / WhatsApp", {
                type: "tel",
                autoComplete: "tel",
                placeholder: "+224 …",
                maxLength: 30,
              })}
              {field("email", "Adresse email", {
                type: "email",
                autoComplete: "email",
                placeholder: "vous@exemple.com",
                maxLength: 320,
              })}
              {field("city", "Ville de résidence", {
                autoComplete: "address-level2",
                placeholder: "Ex. : Conakry",
                maxLength: 100,
              })}
            </>
          ) : (
            <>
              {field("diploma", "Dernier diplôme ou classe actuelle", {
                placeholder: "Ex. : Terminale, Licence…",
                maxLength: 120,
              })}
              {field("level", "Niveau d’études visé", {
                choices: studyOptions.level,
              })}
              {field("field", "Domaine souhaité", {
                placeholder: "Ex. : informatique, gestion…",
              })}
              {field("intake", "Rentrée envisagée", {
                placeholder: "Ex. : septembre 2027 ou À définir",
                maxLength: 80,
              })}
              {field("progress", "Où en êtes-vous ?", {
                choices: studyOptions.progress,
              })}
              {field("funding", "Financement des études et du séjour", {
                choices: studyOptions.funding,
              })}
              <div className="sf-field sf-full">
                <label htmlFor="study-notes">
                  Une précision ? <span>(facultatif)</span>
                </label>
                <textarea
                  id="study-notes"
                  value={values.notes}
                  onChange={e => update("notes", e.target.value)}
                  maxLength={1000}
                  rows={3}
                  placeholder="Une formation en tête, une question particulière…"
                />
              </div>
            </>
          )}
        </div>
        <div className="sf-trap" aria-hidden="true">
          <label htmlFor="study-website">Votre site web</label>
          <input
            id="study-website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={e => update("website", e.target.value)}
          />
        </div>
        {step === 2 && (
          <div className="sf-consent">
            <label>
              <input
                id="study-consent"
                type="checkbox"
                checked={values.consent}
                onChange={e => update("consent", e.target.checked)}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "error-consent" : undefined}
              />
              <span>
                J’accepte que Khamci Voyages utilise ces informations pour
                étudier mon projet et me recontacter.{" "}
                <a
                  href="/politique-confidentialite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Politique de confidentialité
                </a>
                .
              </span>
            </label>
            {errors.consent && (
              <p className="sf-error" id="error-consent">
                {errors.consent}
              </p>
            )}
          </div>
        )}
        {mutation.isError && (
          <p role="alert" className="sf-submit-error">
            Votre demande n’a pas pu être enregistrée. Vos réponses sont
            conservées dans ce formulaire. Réessayez ou{" "}
            <a href="tel:+224611145892">appelez le +224 611 14 58 92</a>.
          </p>
        )}
        <div className="sf-form-actions">
          {step === 2 && (
            <button
              type="button"
              className="sf-back"
              onClick={() => {
                setStep(1);
                setErrors({});
                requestAnimationFrame(() =>
                  document.getElementById("study-name")?.focus()
                );
              }}
            >
              Retour
            </button>
          )}
          <button type="submit" className="sf-button">
            {mutation.isPending
              ? "Enregistrement en cours…"
              : step === 1
                ? "Continuer vers mon projet"
                : "Envoyer ma préinscription"}
            <ArrowRight size={18} />
          </button>
        </div>
      </fieldset>
      <p className="sf-form-note">
        <ShieldCheck size={16} /> Aucun paiement ni document à transmettre à
        cette étape.
      </p>
    </form>
  );
}

export default function StudiesFrance() {
  usePageMetadata(metadata);
  return (
    <div className="sf-page">
      <Header />
      <main>
        <section className="sf-hero">
          <div className="sf-wrap sf-hero-grid">
            <div className="sf-hero-copy">
              <p className="sf-eyebrow">
                <span className="sf-flag" aria-hidden="true" /> OBJECTIF FRANCE
                · KHAMCI VOYAGES
              </p>
              <h1>
                Votre avenir
                <br />
                se prépare.
                <br />
                <em>Direction la France.</em>
              </h1>
              <p className="sf-lead">
                Un projet d’études mérite un accompagnement à chaque étape.
                Construisons le vôtre, depuis la Guinée.
              </p>
              <a className="sf-button" href="#preinscription">
                Je présente mon projet <ArrowRight size={19} />
              </a>
              <p className="sf-hero-note">
                Orientation · Candidature · Entretien · Dossier visa
              </p>
            </div>
            <div className="sf-hero-visual">
              <img
                src="/covers/hero-paris.webp"
                alt="La tour Eiffel et les toits de Paris"
                fetchPriority="high"
                width="800"
                height="1000"
              />
              <div className="sf-photo-shade" />
              <div className="sf-destination">
                <MapPin size={16} /> France
              </div>
              <div className="sf-visual-title">
                <span>UN NOUVEAU CHAPITRE</span>
                <strong>
                  Vos ambitions.
                  <br />
                  Notre accompagnement.
                </strong>
              </div>
              <div className="sf-photo-tag">
                <GraduationCap size={26} />
                <div>
                  <b>Étudier en France</b>
                  <span>Tout commence par votre projet.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="sf-trust">
          <div className="sf-wrap">
            <span>
              <MapPin size={18} /> Une équipe à Conakry
            </span>
            <span>
              <CheckCircle2 size={18} /> Un accompagnement par étapes
            </span>
            <span>
              <ShieldCheck size={18} /> Une agence privée indépendante
            </span>
          </div>
        </div>
        <section className="sf-section sf-wrap" id="accompagnement">
          <div className="sf-section-heading">
            <div>
              <p className="sf-eyebrow">VOTRE PARCOURS, PAS À PAS</p>
              <h2>
                Avancez avec
                <br />
                des repères clairs.
              </h2>
            </div>
            <p>
              Du choix des formations à la préparation du dossier visa après
              admission, nous vous aidons à organiser vos démarches.
            </p>
          </div>
          <div className="sf-steps">
            {[
              [
                "01",
                "Clarifier votre projet",
                "Faire le point sur votre parcours et vous orienter dans le choix des formations.",
              ],
              [
                "02",
                "Préparer votre candidature",
                "Organiser les pièces et vous accompagner dans la préparation de votre dossier.",
              ],
              [
                "03",
                "Préparer votre entretien",
                "Vous entraîner à présenter votre parcours, vos motivations et votre projet d’études.",
              ],
              [
                "04",
                "Après votre admission",
                "Vous accompagner dans la préparation du dossier de demande de visa étudiant.",
              ],
            ].map(([n, title, text]) => (
              <article key={n}>
                <span className="sf-step-number">{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="sf-offer">
          <div className="sf-wrap sf-offer-grid">
            <div>
              <p className="sf-eyebrow">UN CADRE TRANSPARENT</p>
              <h2>
                Deux étapes.
                <br />
                Des honoraires annoncés.
              </h2>
              <p>
                Les frais d’accompagnement sont distincts des dépenses liées à
                vos études et à votre séjour.
              </p>
              <p className="sf-small">
                Les frais officiels de procédure et de visa, les frais des
                établissements, le logement et le billet d’avion ne sont pas
                inclus.
              </p>
            </div>
            <div className="sf-price-card">
              <div>
                <span className="sf-price-label">01 · AVANT L’ADMISSION</span>
                <p className="sf-price">
                  1 000 000 <span>GNF</span>
                </p>
                <p>
                  À l’ouverture de l’accompagnement : orientation, préparation
                  du dossier et de l’entretien.
                </p>
              </div>
              <div>
                <span className="sf-price-label">02 · APRÈS L’ADMISSION</span>
                <p className="sf-price">
                  500 000 <span>GNF</span>
                </p>
                <p>
                  Pour poursuivre l’accompagnement jusqu’au dépôt de la demande
                  de visa.
                </p>
              </div>
              <p className="sf-price-total">
                Honoraires des deux étapes <strong>1 500 000 GNF</strong>
              </p>
            </div>
          </div>
        </section>
        <section
          className="sf-section sf-wrap sf-registration"
          id="preinscription"
        >
          <div className="sf-registration-copy">
            <p className="sf-eyebrow">À VOUS D’ÉCRIRE LA SUITE</p>
            <h2>
              Parlons de
              <br />
              votre projet.
            </h2>
            <p>
              Présentez-nous votre parcours et vos ambitions. Ces informations
              permettront à notre équipe de préparer un échange utile avec vous.
            </p>
            <ul>
              <li>
                <Check size={18} /> Vos coordonnées pour vous recontacter
              </li>
              <li>
                <Check size={18} /> Votre parcours et la formation souhaitée
              </li>
              <li>
                <Check size={18} /> Votre avancement et votre financement
              </li>
            </ul>
            <div className="sf-contact">
              <span>Vous préférez en parler directement ?</span>
              <a href="tel:+224611145892">
                <Phone size={18} /> +224 611 14 58 92
              </a>
              <p>Almamya, Kaloum, Conakry</p>
            </div>
            <p className="sf-small">
              La préinscription permet un premier échange. Les modalités de
              l’accompagnement seront précisées avec l’équipe.
            </p>
          </div>
          <ApplicationForm />
        </section>
        <section className="sf-faq">
          <div className="sf-wrap sf-faq-grid">
            <div>
              <p className="sf-eyebrow">AVANT DE VOUS LANCER</p>
              <h2>
                Vos questions,
                <br />
                nos réponses.
              </h2>
            </div>
            <div>
              {questions.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <div className="sf-disclaimer sf-wrap">
          Khamci Voyages propose un accompagnement privé indépendant de Campus
          France. Aucune admission ni aucun visa ne sont garantis.
        </div>
      </main>
      <footer className="sf-footer">
        <div className="sf-wrap">
          <a href="/" aria-label="Accueil Khamci Voyages">
            <img
              src="/logo-khamci-officiel.png"
              alt="Khamci Voyages"
              width="150"
              height="60"
            />
          </a>
          <span>Votre projet commence par une rencontre.</span>
          <nav aria-label="Informations légales">
            <a href="/mentions-legales">Mentions légales</a>
            <a href="/politique-confidentialite">Confidentialité</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
