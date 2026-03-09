import nodemailer from "nodemailer";

const ADMIN_EMAIL = "khamcivoyages@gmail.com";
const FROM_NAME = "KHAMCI VOYAGES";

// Crée un transporteur Nodemailer selon la configuration disponible
function createTransporter() {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.warn("[Email] GMAIL_USER ou GMAIL_APP_PASSWORD non configurés. Les emails ne seront pas envoyés.");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass, // Mot de passe d'application Gmail (pas le mot de passe normal)
    },
  });
}

// Envoyer un email de notification pour un nouveau devis
export async function sendNewQuoteNotification(quote: {
  clientName: string;
  clientEmail: string;
  clientPhone?: string | null;
  destination?: string | null;
  departureDate?: string | null;
  returnDate?: string | null;
  passengers?: number | null;
  serviceType?: string | null;
  message?: string | null;
}) {
  const transporter = createTransporter();
  if (!transporter) return false;

  const serviceLabels: Record<string, string> = {
    vol: "Billet d'Avion",
    hotel: "Réservation d'Hôtel",
    visa: "Assistance Visa",
    circuit: "Voyage Organisé",
    custom: "Voyage Personnalisé",
    team_building: "Team Building",
  };

  const serviceLabel = quote.serviceType ? (serviceLabels[quote.serviceType] || quote.serviceType) : "Non spécifié";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #FF6B35, #F7931E); padding: 30px; text-align: center; color: white; }
    .header h1 { margin: 0; font-size: 24px; }
    .header p { margin: 5px 0 0; opacity: 0.9; }
    .body { padding: 30px; }
    .badge { display: inline-block; background: #FF6B35; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 20px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
    .info-item { background: #f8f9fa; border-radius: 8px; padding: 15px; }
    .info-item .label { font-size: 11px; text-transform: uppercase; color: #888; margin-bottom: 5px; }
    .info-item .value { font-size: 15px; font-weight: bold; color: #333; }
    .message-box { background: #fff8f0; border-left: 4px solid #FF6B35; padding: 15px; border-radius: 0 8px 8px 0; margin: 20px 0; }
    .cta { text-align: center; margin: 25px 0; }
    .cta a { background: linear-gradient(135deg, #FF6B35, #F7931E); color: white; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; display: inline-block; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✈️ KHAMCI VOYAGES</h1>
      <p>Nouveau devis reçu !</p>
    </div>
    <div class="body">
      <span class="badge">🆕 NOUVEAU DEVIS</span>
      <h2 style="color: #333; margin-top: 0;">Demande de ${serviceLabel}</h2>
      
      <div class="info-grid">
        <div class="info-item">
          <div class="label">👤 Client</div>
          <div class="value">${quote.clientName}</div>
        </div>
        <div class="info-item">
          <div class="label">📧 Email</div>
          <div class="value">${quote.clientEmail}</div>
        </div>
        ${quote.clientPhone ? `
        <div class="info-item">
          <div class="label">📞 Téléphone</div>
          <div class="value">${quote.clientPhone}</div>
        </div>` : ''}
        ${quote.destination ? `
        <div class="info-item">
          <div class="label">🌍 Destination</div>
          <div class="value">${quote.destination}</div>
        </div>` : ''}
        ${quote.departureDate ? `
        <div class="info-item">
          <div class="label">📅 Départ</div>
          <div class="value">${quote.departureDate}</div>
        </div>` : ''}
        ${quote.returnDate ? `
        <div class="info-item">
          <div class="label">📅 Retour</div>
          <div class="value">${quote.returnDate}</div>
        </div>` : ''}
        ${quote.passengers ? `
        <div class="info-item">
          <div class="label">👥 Passagers</div>
          <div class="value">${quote.passengers}</div>
        </div>` : ''}
        <div class="info-item">
          <div class="label">🎯 Service</div>
          <div class="value">${serviceLabel}</div>
        </div>
      </div>

      ${quote.message ? `
      <div class="message-box">
        <strong>💬 Message du client :</strong><br>
        <p style="margin: 10px 0 0; color: #555;">${quote.message}</p>
      </div>` : ''}

      <div class="cta">
        <a href="https://khamcivoyage-tggjc7uo.manus.space/admin/dashboard">
          📊 Voir dans le Dashboard Admin
        </a>
      </div>
    </div>
    <div class="footer">
      <p>KHAMCI VOYAGES - Agence de Voyages en Guinée</p>
      <p>+224 611 145 892 | khamcivoyages@gmail.com</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      to: ADMIN_EMAIL,
      from: `"${FROM_NAME}" <${process.env.GMAIL_USER}>`,
      subject: `🆕 Nouveau devis - ${quote.clientName} - ${serviceLabel}`,
      html,
    });
    console.log("[Email] New quote notification sent to", ADMIN_EMAIL);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send quote notification:", error);
    return false;
  }
}

// Envoyer un email de confirmation au client
export async function sendQuoteConfirmationToClient(quote: {
  clientName: string;
  clientEmail: string;
  serviceType?: string | null;
  destination?: string | null;
}) {
  const transporter = createTransporter();
  if (!transporter) return false;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #FF6B35, #F7931E); padding: 30px; text-align: center; color: white; }
    .body { padding: 30px; color: #333; line-height: 1.6; }
    .highlight { background: #fff8f0; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✈️ KHAMCI VOYAGES</h1>
      <p>Votre demande a bien été reçue !</p>
    </div>
    <div class="body">
      <h2>Bonjour ${quote.clientName},</h2>
      <p>Nous avons bien reçu votre demande de devis${quote.destination ? ` pour <strong>${quote.destination}</strong>` : ''}.</p>
      
      <div class="highlight">
        <p style="font-size: 18px; margin: 0;">⏱️ Notre équipe vous contactera dans les <strong>24 heures</strong> avec une offre personnalisée.</p>
      </div>
      
      <p>En attendant, n'hésitez pas à nous contacter directement :</p>
      <ul>
        <li>📞 <strong>+224 611 145 892</strong></li>
        <li>📧 <strong>khamcivoyages@gmail.com</strong></li>
        <li>💬 WhatsApp disponible 24h/24</li>
      </ul>
      
      <p>Merci de nous faire confiance pour votre voyage !</p>
      <p>L'équipe KHAMCI VOYAGES 🌍</p>
    </div>
    <div class="footer">
      <p>KHAMCI VOYAGES - Agence de Voyages en Guinée</p>
      <p>+224 611 145 892 | khamcivoyages@gmail.com</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      to: quote.clientEmail,
      from: `"${FROM_NAME}" <${process.env.GMAIL_USER}>`,
      subject: `✅ Votre demande de devis KHAMCI VOYAGES a été reçue`,
      html,
    });
    console.log("[Email] Confirmation sent to", quote.clientEmail);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send confirmation:", error);
    return false;
  }
}

// Envoyer une notification pour un nouveau témoignage
export async function sendNewTestimonialNotification(testimonial: {
  clientName: string;
  content: string;
  rating?: number | null;
}) {
  const transporter = createTransporter();
  if (!transporter) return false;

  const stars = "⭐".repeat(testimonial.rating || 5);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: white; border-radius: 10px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #FF6B35, #F7931E); padding: 30px; text-align: center; color: white; }
    .body { padding: 30px; }
    .testimonial-box { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; font-style: italic; }
    .cta { text-align: center; margin: 25px 0; }
    .cta a { background: linear-gradient(135deg, #FF6B35, #F7931E); color: white; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; display: inline-block; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✈️ KHAMCI VOYAGES</h1>
      <p>Nouveau témoignage reçu !</p>
    </div>
    <div class="body">
      <h2>💬 Nouveau témoignage de ${testimonial.clientName}</h2>
      <p>Note : ${stars} (${testimonial.rating || 5}/5)</p>
      <div class="testimonial-box">
        "${testimonial.content}"
      </div>
      <div class="cta">
        <a href="https://khamcivoyage-tggjc7uo.manus.space/admin/dashboard">
          ✅ Approuver dans le Dashboard
        </a>
      </div>
    </div>
    <div class="footer">
      <p>KHAMCI VOYAGES - Agence de Voyages en Guinée</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      to: ADMIN_EMAIL,
      from: `"${FROM_NAME}" <${process.env.GMAIL_USER}>`,
      subject: `💬 Nouveau témoignage - ${testimonial.clientName} - ${stars}`,
      html,
    });
    return true;
  } catch (error) {
    console.error("[Email] Failed to send testimonial notification:", error);
    return false;
  }
}
