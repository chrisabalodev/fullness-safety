// server.js
const { createServer } = require('http');
const next = require('next');
const dotenv = require('dotenv');

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Paramètres de configuration
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Démarrage de l'application Next.js
app.prepare().then(() => {
  createServer((req, res) => {
    // Rediriger toutes les requêtes vers le gestionnaire Next.js
    handle(req, res);
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) {
      console.error('Erreur serveur:', err);
      process.exit(1);
    }
    console.log(`Serveur prêt sur http://localhost:${process.env.PORT || 3000}`);
  });
});
