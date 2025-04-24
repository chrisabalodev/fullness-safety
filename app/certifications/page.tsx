"use client";

import { BadgeCheck, Shield, FileText, Award, Globe, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function CertificationsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const certifications = [
    {
      title: "ISO 9001:2015",
      description: "Certification qualité pour notre système de management",
      scope: "Conception et distribution d'EPI",
      issuer: "AFNOR Certification",
      validity: "2025-06-30",
      logo: "/logos/afnor-logo.png",
      icon: <CheckCircle className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Norme CE",
      description: "Conformité aux exigences essentielles de santé et sécurité",
      scope: "Ensemble de notre gamme EPI",
      issuer: "Union Européenne",
      validity: "Permanente",
      logo: "/logos/ce-mark-logo.png",
      icon: <Shield className="w-6 h-6 text-emerald-500" />
    },
    {
      title: "ANSI/ISEA Standards",
      description: "Conformité aux normes américaines de protection",
      scope: "Gants et protections oculaires",
      issuer: "International Safety Equipment Association",
      validity: "2026-03-15",
      logo: "/logos/isea-logo.png",
      icon: <Award className="w-6 h-6 text-amber-500" />
    },
    {
      title: "OH SAS 18001",
      description: "Management de la santé et sécurité au travail",
      scope: "Processus internes",
      issuer: "Lloyd's Register",
      validity: "2024-12-31",
      logo: "/logos/lrqa-logo.png",
      icon: <FileText className="w-6 h-6 text-purple-500" />
    },
    {
      title: "Certification ECO",
      description: "Engagement environnemental pour certains produits",
      scope: "Gammes éco-responsables",
      issuer: "Ecocert",
      validity: "2025-09-01",
      logo: "/logos/ecocert-logo.png",
      icon: <Globe className="w-6 h-6 text-green-500" />
    },
    {
      title: "Agrément Togolais",
      description: "Homologation par le Ministère du Travail",
      scope: "Distribution au Togo",
      issuer: "Gouvernement Togolais",
      validity: "2026-01-01",
      logo: "/logos/togo-gov-logo.png",
      icon: <BadgeCheck className="w-6 h-6 text-red-500" />
    }
  ];

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
              <BadgeCheck className="w-4 h-4" />
              <span className="text-sm font-medium">Nos Garanties</span>
            </div>
            
            <h1 
              className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Nos <span className="text-primary">Certifications</span>
            </h1>
            
            <p 
              className={`text-xl text-muted-foreground transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Preuves tangibles de notre engagement qualité et sécurité
            </p>
          </div>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div 
              key={cert.title}
              className={`bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {cert.logo ? (
                    <div className="relative w-16 h-16">
                      <Image
                        src={cert.logo}
                        alt={cert.issuer}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-primary/10">
                      {cert.icon}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">{cert.title}</h2>
                  <p className="text-muted-foreground mb-3">{cert.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="font-medium">Émetteur:</p>
                      <p className="text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <div>
                      <p className="font-medium">Validité:</p>
                      <p className="text-muted-foreground">
                        {new Date(cert.validity).toLocaleDateString('fr-FR')}
                        {new Date(cert.validity) > new Date() ? (
                          <span className="ml-2 text-emerald-500">● Valide</span>
                        ) : (
                          <span className="ml-2 text-red-500">● Expiré</span>
                        )}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-medium">Portée:</p>
                      <p className="text-muted-foreground">{cert.scope}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> 

      {/* Compliance Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl p-8 shadow-sm border border-primary/20">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <span>Documents de Conformité</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Déclarations de conformité CE",
                    description: "Téléchargez les documents officiels pour chaque gamme de produits",
                    link: "/documents/declarations-ce.pdf"
                  },
                  {
                    title: "Rapports de tests",
                    description: "Résultats des tests en laboratoire accrédité",
                    link: "/documents/rapports-tests.pdf"
                  },
                  {
                    title: "Certificats originaux",
                    description: "Versions scannées de nos certifications",
                    link: "/documents/certificats.pdf"
                  },
                  {
                    title: "Manuel d'utilisation",
                    description: "Instructions pour une utilisation correcte des EPI",
                    link: "/documents/manuel-utilisation.pdf"
                  }
                ].map((doc, index) => (
                  <div 
                    key={doc.title}
                    className={`border rounded-lg p-4 hover:border-primary/50 transition-all duration-300 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${900 + index * 100}ms` }}
                  >
                    <h3 className="font-semibold mb-2">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{doc.description}</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={doc.link} target="_blank">
                        Télécharger
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Questions sur nos <span className="text-primary">certifications</span> ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Notre équipe qualité est à votre disposition pour fournir des documents supplémentaires ou des précisions techniques.
          </p>
          <Button size="lg" className="h-12 px-8" asChild>
            <Link href="/contact">
              Contacter le service qualité
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}