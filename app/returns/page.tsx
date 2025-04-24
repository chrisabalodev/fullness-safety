"use client";

import { PackageX, AlertCircle, Shield, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function ReturnsPage() {
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
              <PackageX className="w-4 h-4" />
              <span className="text-sm font-medium">Politique de Retours</span>
            </div>
            
            <h1 
              className={`text-4xl md:text-5xl font-bold mb-6 text-center transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Politique de <span className="text-primary">Non-Retour</span>
            </h1>
            
            <p 
              className={`text-xl text-muted-foreground text-center mb-8 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Conditions applicables à toutes les ventes
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

            <h2 className="text-2xl font-semibold mb-4">1. Principe général</h2>
            <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/20 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-red-500 font-medium">
                  Conformément à nos conditions générales, tous les produits vendus par Fullness Safety ne sont ni repris, ni échangés, sauf cas exceptionnels prévus par la loi togolaise.
                </p>
              </div>
            </div>

            <div className="grid gap-8">
              {[
                {
                  icon: HelpCircle,
                  title: "2. Exceptions légales",
                  content: (
                    <>
                      <p className="text-muted-foreground mb-4">
                        Seules les situations suivantes pourraient donner lieu à un recours :
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Produit non conforme à la description contractuelle</li>
                        <li>Défaut de conformité avéré</li>
                        <li>Erreur manifeste de notre part dans la livraison</li>
                      </ul>
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mt-4">
                        <p className="text-sm text-muted-foreground">
                          <strong>Preuve requise :</strong> Toute réclamation doit être accompagnée de preuves tangibles (photos, vidéos, rapports d'expertise).
                        </p>
                      </div>
                    </>
                  )
                },
                {
                  icon: Shield,
                  title: "3. Processus de réclamation",
                  content: (
                    <>
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          En cas de problème éligible selon les exceptions ci-dessus :
                        </p>
                        <ol className="list-decimal pl-6 space-y-3">
                          <li>Notifier par écrit dans les <strong>72h</strong> après réception</li>
                          <li>Fournir toutes les preuves documentées</li>
                          <li>Conserver le produit dans son état d'origine</li>
                          <li>Attendre notre validation écrite avant tout retour</li>
                        </ol>
                        <p className="text-sm italic">
                          Les frais de retour sont à la charge du client sauf erreur avérée de notre part.
                        </p>
                      </div>
                    </>
                  )
                },
                {
                  icon: PackageX,
                  title: "4. Produits non éligibles",
                  content: (
                    <>
                      <p className="text-muted-foreground mb-4">
                        Aucun retour ne sera accepté pour :
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Produits commandés en quantité insuffisante</li>
                        <li>Changement d'avis ou erreur de commande client</li>
                        <li>Produits utilisés, endommagés ou non emballés d'origine</li>
                        <li>Articles personnalisés ou sur mesure</li>
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
              <h2 className="text-2xl font-semibold mb-4">5. Contact</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Pour toute question relative à cette politique ou pour signaler un problème :
                </p>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <p className="font-medium text-primary">Service Client Fullness Safety</p>
                  <p>contact@fullness-safety.com</p>
                  <p className="text-sm mt-2">Lomé, Togo - (+228) 91 21 82 26</p>
                </div>
                <p className="text-sm italic">
                  Les demandes de retour non conformes à cette politique ne recevront pas de réponse.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Cette politique s'applique sans préjudice des droits garantis par la loi togolaise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}