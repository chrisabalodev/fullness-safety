"use client";

import { ShieldCheck, Lock, EyeOff, Server, Key } from "lucide-react";
import { useState, useEffect } from "react";

export default function PrivacyPage() {
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
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Confidentialité</span>
            </div>
            
            <h1 
              className={`text-4xl md:text-5xl font-bold mb-6 text-center transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Politique de <span className="text-primary">Confidentialité</span>
            </h1>
            
            <p 
              className={`text-xl text-muted-foreground text-center mb-8 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Comment nous protégeons et utilisons vos informations personnelles
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

            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-8">
              Chez Fullness Safety, nous nous engageons à protéger votre vie privée. Cette politique explique comment nous collectons, utilisons et protégeons vos informations personnelles.
            </p>

            <div className="grid gap-8">
              {[
                {
                  icon: ShieldCheck,
                  title: "2. Données que nous collectons",
                  content: (
                    <>
                      <p className="mb-4">Nous pouvons collecter :</p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Informations de contact (nom, email, téléphone)</li>
                        <li>Informations de commande et facturation</li>
                        <li>Données de navigation et cookies</li>
                        <li>Historique des communications</li>
                      </ul>
                    </>
                  )
                },
                {
                  icon: Server,
                  title: "3. Utilisation des données",
                  content: (
                    <>
                      <p className="mb-4">Vos données sont utilisées pour :</p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Traiter vos commandes et demandes</li>
                        <li>Améliorer nos produits et services</li>
                        <li>Communiquer avec vous</li>
                        <li>Respecter nos obligations légales</li>
                      </ul>
                    </>
                  )
                },
                {
                  icon: EyeOff,
                  title: "4. Protection des données",
                  content: (
                    <>
                      <p className="mb-4">Nous mettons en œuvre :</p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Chiffrement des données sensibles</li>
                        <li>Contrôles d'accès stricts</li>
                        <li>Protocoles de sécurité avancés</li>
                        <li>Formation de notre personnel</li>
                      </ul>
                    </>
                  )
                },
                {
                  icon: Key,
                  title: "5. Vos droits",
                  content: (
                    <>
                      <p className="mb-4">Conformément à la loi, vous avez le droit de :</p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Accéder à vos données personnelles</li>
                        <li>Demander leur rectification</li>
                        <li>Demander leur suppression</li>
                        <li>Limiter leur traitement</li>
                        <li>Vous opposer à leur utilisation</li>
                      </ul>
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
              <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
              <p className="text-muted-foreground">
                Pour toute question concernant cette politique ou vos données personnelles, veuillez nous contacter à :
              </p>
              <p className="mt-4 text-primary font-medium">
                contact@fullness-safety.com
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Cette politique peut être mise à jour occasionnellement. Nous vous encourageons à la consulter régulièrement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}