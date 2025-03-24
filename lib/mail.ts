import nodemailer from 'nodemailer';

// SMTP transporter configuration with proper connection handling
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Add connection timeout and other options
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000, // 10 seconds
  socketTimeout: 10000, // 10 seconds
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  },
  pool: true, // Use pooled connections
  maxConnections: 5, // Maximum number of simultaneous connections
  maxMessages: 100 // Maximum number of messages per connection
});

// Verify SMTP connection on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
});

export async function sendQuoteRequest(data: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  quantity: number;
  productId?: string;
  productName?: string;
}) {
  try {
    // Send email to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Fullness Safety" <contact@fullness-safety.com>',
      to: process.env.SMTP_USER || 'contact@fullness-safety.com',
      subject: 'Nouvelle demande de devis',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Nouvelle demande de devis</h1>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Informations client</h2>
            <p><strong>Nom :</strong> ${data.name}</p>
            <p><strong>Email :</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Téléphone :</strong> ${data.phone}</p>` : ''}
          </div>

          ${data.productId ? `
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0;">Produit demandé</h2>
              <p><strong>Nom :</strong> ${data.productName}</p>
              <p><strong>Référence :</strong> ${data.productId}</p>
              <p><strong>Quantité :</strong> ${data.quantity}</p>
            </div>
          ` : ''}

          ${data.message ? `
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0;">Message</h2>
              <p>${data.message}</p>
            </div>
          ` : ''}
        </div>
      `,
    });

    // Send confirmation email to client
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Fullness Safety" <contact@fullness-safety.com>',
      to: data.email,
      subject: 'Confirmation de votre demande de devis',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Demande de devis reçue</h1>
          
          <p>Bonjour ${data.name},</p>
          
          <p>Nous avons bien reçu votre demande de devis. Notre équipe commerciale vous contactera dans les plus brefs délais.</p>
          
          ${data.productId ? `
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0;">Récapitulatif de votre demande</h2>
              <p><strong>Produit :</strong> ${data.productName}</p>
              <p><strong>Quantité :</strong> ${data.quantity}</p>
            </div>
          ` : ''}

          <p>À très bientôt,<br>L'équipe Fullness Safety</p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error('Error sending quote emails:', error);
    return false;
  }
}

export async function sendNewsletterConfirmation(email: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Fullness Safety" <contact@fullness-safety.com>',
      to: email,
      subject: 'Confirmation d\'inscription à la newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Merci de votre inscription !</h1>
          <p>Bonjour,</p>
          <p>Nous sommes ravis de vous compter parmi nos abonnés. Vous recevrez désormais nos actualités et offres exclusives.</p>
          <p>À très bientôt,<br>L'équipe Fullness Safety</p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error('Error sending newsletter confirmation:', error);
    return false;
  }
}

export async function sendChatbotNotification(message: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Fullness Safety Chatbot" <contact@fullness-safety.com>',
      to: process.env.SMTP_USER || 'contact@fullness-safety.com',
      subject: 'Nouvelle conversation chatbot',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Nouvelle conversation chatbot</h1>
          <p>Un client a démarré une nouvelle conversation :</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p style="margin: 0;">${message}</p>
          </div>
          <p>Connectez-vous à l'interface d'administration pour plus de détails.</p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error('Error sending chatbot notification:', error);
    return false;
  }
}