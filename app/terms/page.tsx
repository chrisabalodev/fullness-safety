"use client";

import { FileText, ClipboardList, Mail, Shield, Info } from "lucide-react";
import { useState, useEffect } from "react";

export default function TermsPage() {
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
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Informations légales</span>
            </div>
            
            <h1 
              className={`text-4xl md:text-5xl font-bold mb-6 text-center transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Conditions <span className="text-primary">d'Utilisation</span>
            </h1>
            
            <p 
              className={`text-xl text-muted-foreground text-center mb-8 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Modalités de consultation et demande de devis
            </p>
          </div>
        </div>
      </div> */}

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl shadow-sm border p-8 mb-12">
            <p className="text-muted-foreground mb-6">
              En vigueur au {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="text-2xl font-semibold mb-4">1. Nature du site</h2>
            <p className="text-muted-foreground mb-8">
              Le site Fullness Safety est une plateforme de présentation de nos équipements de protection individuelle. Il ne permet pas d'achat en ligne mais propose un service de demande de devis.
            </p>

            <div className="grid gap-8">
              {[
                {
                  icon: Info,
                  title: "2. Consultation du catalogue",
                  content: (
                    <>
                      <p className="text-muted-foreground mb-4">
                        Les fiches techniques des produits sont fournies à titre informatif. Fullness Safety :
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Garantit l'exactitude des données techniques</li>
                        <li>Se réserve le droit de modifier les spécifications</li>
                        <li>Précise que les images sont non contractuelles</li>
                      </ul>
                    </>
                  )
                },
                {
                  icon: Mail,
                  title: "3. Demande de devis",
                  content: (
                    <>
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          Le formulaire de devis en ligne ne constitue pas une commande mais une demande d'information.
                        </p>
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                          <p className="text-sm">
                            <strong>Engagement :</strong> Nous nous engageons à répondre sous 48h ouvrés.
                          </p>
                        </div>
                        <p>
                          Les prix communiqués dans les devis sont valables 30 jours et en francs CFA.
                        </p>
                      </div>
                    </>
                  )
                },
                {
                  icon: Shield,
                  title: "4. Propriété intellectuelle",
                  content: (
                    <>
                      <p className="text-muted-foreground mb-4">
                        Tout le contenu du site est la propriété exclusive de Fullness Safety :
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Interdiction de reproduction des fiches techniques</li>
                        <li>Marques et logos protégés</li>
                        <li>Données techniques couvertes par le droit d'auteur</li>
                      </ul>
                    </>
                  )
                },
                {
                  icon: ClipboardList,
                  title: "5. Responsabilités",
                  content: (
                    <>
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          Fullness Safety décline toute responsabilité pour :
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Utilisation inappropriée des informations techniques</li>
                          <li>Modifications ultérieures des caractéristiques produits</li>
                          <li>Erreurs de saisie dans les demandes de devis</li>
                        </ul>
                        <div className="bg-primary/5 p-3 rounded-lg mt-4">
                          <p className="text-sm">
                            Les produits finaux sont conformes aux normes en vigueur au Togo au moment de leur livraison.
                          </p>
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
              <h2 className="text-2xl font-semibold mb-4">6. Contact et droit applicable</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Pour toute question relative à ces conditions ou aux produits présentés :
                </p>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <p className="font-medium text-primary">Fullness Safety Togo</p>
                  <p>contact@fullness-safety.com</p>
                  <p className="text-sm mt-2">(+228) 91 21 82 26</p>
                </div>
                <p className="text-sm italic">
                  Les présentes conditions sont régies par le droit togolais. Tout litige relèvera des tribunaux compétents de Lomé.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Ces conditions peuvent être modifiées sans préavis. La version en ligne fait référence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}