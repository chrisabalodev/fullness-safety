"use client";

import { Cookie, ShieldCheck, Settings, EyeOff, Server } from "lucide-react";
import { useState, useEffect } from "react";

export default function CookiesPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {/* <div className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Cookie className="w-4 h-4" />
              <span className="text-sm font-medium">Transparence numérique</span>
            </div>
            
            <h1 
              className={`text-4xl md:text-5xl font-bold mb-6 text-center transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Politique relative aux <span className="text-primary">Cookies</span>
            </h1>
            
            <p 
              className={`text-xl text-muted-foreground text-center mb-8 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Comment nous utilisons les cookies et technologies similaires
            </p>
          </div>
        </div>
      </div> */}

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl shadow-sm border p-8 mb-12">
            <p className="text-muted-foreground mb-6">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="text-2xl font-semibold mb-4">1. Qu'est-ce qu'un cookie ?</h2>
            <p className="text-muted-foreground mb-8">
              Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez notre site. Ils nous aident à améliorer votre expérience et à comprendre comment vous interagissez avec nos services.
            </p>

            <div className="grid gap-8">
              {[
                {
                  icon: Settings,
                  title: "2. Types de cookies utilisés",
                  content: (
                    <>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Cookies essentiels</h3>
                          <p className="text-muted-foreground text-sm">
                            Nécessaires au fonctionnement du site (ex : authentification, panier d'achat)
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Cookies de performance</h3>
                          <p className="text-muted-foreground text-sm">
                            Nous aident à améliorer le site en analysant l'usage (ex : Google Analytics)
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Cookies de fonctionnalité</h3>
                          <p className="text-muted-foreground text-sm">
                            Mémorisent vos préférences (ex : langue, région)
                          </p>
                        </div>
                      </div>
                    </>
                  )
                },
                {
                  icon: ShieldCheck,
                  title: "3. Finalités des cookies",
                  content: (
                    <>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Assurer le bon fonctionnement technique</li>
                        <li>Personnaliser votre expérience utilisateur</li>
                        <li>Analyser l'audience et les performances</li>
                        <li>Améliorer nos services et contenus</li>
                      </ul>
                    </>
                  )
                },
                {
                  icon: EyeOff,
                  title: "4. Protection des données",
                  content: (
                    <>
                      <p className="mb-4 text-muted-foreground">
                        Les cookies que nous utilisons ne collectent pas d'informations personnelles identifiables sans votre consentement.
                      </p>
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                        <p className="text-sm text-muted-foreground">
                          <strong>Durée de conservation :</strong> Les cookies sont conservés pour une durée maximale de 13 mois après leur dépôt initial.
                        </p>
                      </div>
                    </>
                  )
                },
                {
                  icon: Server,
                  title: "5. Gestion des cookies",
                  content: (
                    <>
                      <p className="mb-4 text-muted-foreground">
                        Vous pouvez contrôler et gérer les cookies à tout moment :
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-lg text-primary mt-1">
                            <Settings className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-medium">Via notre bannière cookies</h3>
                            <p className="text-sm text-muted-foreground">
                              Acceptez ou refusez les cookies non essentiels lors de votre première visite
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-lg text-primary mt-1">
                            <Cookie className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-medium">Via les paramètres du navigateur</h3>
                            <p className="text-sm text-muted-foreground">
                              La plupart des navigateurs permettent de bloquer ou supprimer les cookies
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }
              ].map((section, index) => (
                <div 
                  key={section.title}
                  className={`bg-card rounded-xl p-8 shadow-sm border hover:shadow-md transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                      <div className="text-muted-foreground leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">6. Contact et informations</h2>
              <p className="text-muted-foreground mb-4">
                Pour toute question relative à notre utilisation des cookies :
              </p>
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                <p className="font-medium text-primary">Fullness Safety</p>
                <p className="text-muted-foreground">service@fullness-safety.com</p>
                <p className="text-muted-foreground text-sm mt-2">
                  Nous traitons les demandes dans un délai de 30 jours maximum.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Cette politique est régulièrement révisée pour refléter nos pratiques actuelles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}