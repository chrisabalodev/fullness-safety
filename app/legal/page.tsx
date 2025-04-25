"use client";

import { Building2, FileText, Mail, Phone, MapPin, Scale, Server, Link } from "lucide-react";
import { useState, useEffect } from "react";

export default function LegalPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span className="text-sm font-medium">Informations légales</span>
            </div>
            
            <h1 
              className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Mentions <span className="text-primary">Légales</span>
            </h1>
            
            <p 
              className={`text-xl text-muted-foreground transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Conformément aux dispositions légales en vigueur au Togo
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl shadow-sm border p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Building2 className="w-6 h-6 text-primary" />
              <span>Éditeur du site</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  Raison sociale
                </h3>
                <p className="text-muted-foreground">Fullness Safety</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  Adresse
                </h3>
                <p className="text-muted-foreground">
                  55 KTM rue : koketi, immeuble st Hubert, Assivito <br />
                  Lomé, Togo
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  Téléphone
                </h3>
                <p className="text-muted-foreground">+228 91 21 82 260</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  Email
                </h3>
                <p className="text-muted-foreground">contact@fullness-safety.com</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  RCCM
                </h3>
                <p className="text-muted-foreground">TG-LOM 2015 A 1661</p>
              </div>
              
              <div className="space-y-2"> 
                <h3 className="font-medium flex items-center gap-2">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  Numéro contribuable
                </h3>
                <p className="text-muted-foreground">1000252645</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Directeur de publication</h2>
            <p className="text-muted-foreground mb-8">
              Chris aimé, Developpeur de abalo.dev
            </p>

            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <Server className="w-6 h-6 text-primary" />
              <span>Hébergeur</span>
            </h2>
            <div className="text-muted-foreground space-y-2">
              <p><strong>o2switch</strong></p>
              <p>Chem. des Pardiaux<br />
              63000 Clermont-Ferrand, France</p>
              <p>SAS au capital de 100 000€</p>
              <p>RCS Clermont-Ferrand 510 909 807</p>
              <p>Téléphone : +33 (0)4 44 44 60 40</p>
              <p>Email : support@o2switch.fr</p>
              <p>Site web : <a href="https://www.o2switch.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.o2switch.fr</a></p>
            </div>
          </div>

          {/* Legal Sections */}
          <div className="grid gap-8">
            {[
              {
                icon: <FileText className="w-6 h-6 text-primary" />,
                title: "Propriété intellectuelle",
                content: (
                  <>
                    <p className="mb-4 text-muted-foreground">
                      L'ensemble des éléments constitutifs du site (textes, images, vidéos, logos, etc.) 
                      est la propriété exclusive de Fullness Safety SARL ou de ses partenaires.
                    </p>
                    <p className="text-muted-foreground">
                      Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation 
                      préalable est strictement interdite et constituerait une contrefaçon sanctionnée par 
                      les articles 171 et suivants du Code de la propriété intellectuelle togolais.
                    </p>
                  </>
                )
              },
              {
                icon: <Scale className="w-6 h-6 text-primary" />,
                title: "Responsabilité",
                content: (
                  <>
                    <p className="mb-4 text-muted-foreground">
                      Les informations contenues sur ce site sont fournies à titre indicatif.
                      Fullness Safety ne garantit pas l'exactitude ou l'exhaustivité des informations publiées.
                    </p>
                    <p className="text-muted-foreground">
                      L'utilisateur reconnaît utiliser les informations sous sa responsabilité exclusive. 
                      Fullness Safety ne pourra être tenue responsable des dommages directs ou indirects 
                      résultant de l'utilisation des informations présentées.
                    </p>
                  </>
                )
              },
              {
                icon: <FileText className="w-6 h-6 text-primary" />,
                title: "Protection des données",
                content: (
                  <>
                    <p className="mb-4 text-muted-foreground">
                      Conformément à la loi n°2019-014 du 22 octobre 2019 relative à la protection des données 
                      personnelles au Togo, vous disposez d'un droit d'accès, de rectification et d'opposition 
                      aux données vous concernant.
                    </p>
                    <p className="text-muted-foreground">
                      Pour exercer ces droits, veuillez contacter notre Délégué à la Protection des Données 
                      à l'adresse : contact@fullness-safety.com
                    </p>
                  </>
                )
              },
              {
                icon: <FileText className="w-6 h-6 text-primary" />,
                title: "Cookies",
                content: (
                  <p className="text-muted-foreground">
                    Ce site utilise des cookies strictement nécessaires à son fonctionnement. 
                    En naviguant sur ce site, vous acceptez l'utilisation de ces cookies. 
                    Consultez notre <Link href="/privacy" className="text-primary hover:underline">Politique de Confidentialité</Link> pour plus d'informations.
                  </p>
                )
              },
              {
                icon: <FileText className="w-6 h-6 text-primary" />,
                title: "Loi applicable",
                content: (
                  <p className="text-muted-foreground">
                    Les présentes mentions légales sont régies par le droit togolais. 
                    Tout litige relatif à leur interprétation ou à leur exécution relève 
                    des tribunaux compétents de Lomé.
                  </p>
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
                    {section.icon}
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

          {/* Update Info */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}