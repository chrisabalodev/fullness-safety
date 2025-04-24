"use client";

import { ShieldAlert, HardHat, Gloves, EyeOff, EarOff, Highlighter, ArrowRight, Hand, Drama } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SafetyTipsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
 
  const safetyCategories = [
    {
      icon: <HardHat className="w-8 h-8 text-amber-500" />,
      title: "Protection de la tête",
      tips: [
        "Toujours porter un casque sur les chantiers de construction",
        "Vérifier régulièrement l'état du harnais intérieur",
        "Remplacer immédiatement tout casque endommagé",
        "Choisir des casques avec ventilation pour les environnements chauds"
      ]
    },
    {
      icon: <Hand className="w-8 h-8 text-blue-500" />,
      title: "Protection des mains",
      tips: [
        "Sélectionner des gants adaptés au risque (coupures, chaleur, produits chimiques)",
        "Vérifier l'étanchéité des gants de protection chimique",
        "Changer de gants immédiatement s'ils sont perforés",
        "Nettoyer et stocker correctement les gants réutilisables"
      ]
    },
    {
      icon: <EyeOff className="w-8 h-8 text-purple-500" />,
      title: "Protection oculaire",
      tips: [
        "Porter des lunettes de sécurité même pour de courtes interventions",
        "Utiliser des écrans faciaux pour les travaux à haut risque",
        "S'assurer que les protections sont anti-buée",
        "Éviter de toucher l'intérieur des verres avec les doigts"
      ]
    },
    {
      icon: <EarOff className="w-8 h-8 text-red-500" />,
      title: "Protection auditive",
      tips: [
        "Porter des protections dès 85 dB d'exposition",
        "Alterner entre bouchons et casques pour les expositions prolongées",
        "Vérifier régulièrement l'étanchéité des protections",
        "Former les employés à un port correct des EPI auditifs"
      ]
    },
    {
      icon: <Drama className="w-8 h-8 text-green-500" />,
      title: "Protection respiratoire",
      tips: [
        "Choisir le bon type de filtre pour le contaminant spécifique",
        "Vérifier l'étanchéité du masque avant chaque utilisation",
        "Remplacer les filtres selon les indications du fabricant",
        "Entreposer les masques dans un endroit propre et sec"
      ]
    },
    {
      icon: <Highlighter className="w-8 h-8 text-orange-500" />,
      title: "Visibilité",
      tips: [
        "Porter des vêtements haute visibilité de classe 3 en milieu routier",
        "S'assurer que les bandes réfléchissantes sont propres et intactes",
        "Préférer les couleurs fluorescentes pour la journée",
        "Combiner avec des dispositifs lumineux pour les travaux de nuit"
      ]
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
              <ShieldAlert className="w-4 h-4" />
              <span className="text-sm font-medium">Bonnes pratiques</span>
            </div>
            
            <h1 
              className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Conseils de <span className="text-primary">Sécurité</span>
            </h1>
            
            <p 
              className={`text-xl text-muted-foreground transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Guide essentiel pour une utilisation optimale de vos équipements de protection
            </p>
          </div>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyCategories.map((category, index) => (
            <div 
              key={category.title}
              className={`bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold">{category.title}</h2>
              </div>
              <ul className="space-y-3 pl-2">
                {category.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div> 

      {/* Expert Advice Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 
              className={`text-3xl font-bold mb-6 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Besoin de conseils <span className="text-primary">personnalisés</span> ?
            </h2>
            <p 
              className={`text-lg text-muted-foreground mb-8 max-w-2xl mx-auto transition-all duration-700 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Nos experts en sécurité peuvent vous aider à choisir les équipements adaptés à vos besoins spécifiques.
            </p>
            <div 
              className={`transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Button size="lg" className="h-12 px-8" asChild>
                <Link href="/contact">
                  Contacter un expert EPI
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}