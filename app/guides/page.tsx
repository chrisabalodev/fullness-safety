"use client";

import { Ruler, Headphones, Ear, EarOff, Shirt, HardHat, Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SizeGuidesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("casques-antibruit");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sizeGuides = {
    "casques-antibruit": {
      icon: <Headphones className="w-6 h-6 text-purple-500" />,
      title: "Casques Antibruit",
      description: "Guide pour choisir la protection auditive optimale",
      image: "/images/size-guide-ear-protection.jpg",
      table: [
        ["Taille", "XS", "S", "M", "L", "XL"],
        ["Circonférence tête (cm)", "52-54", "54-56", "56-58", "58-60", "60-62"],
        ["Niveau d'atténuation (dB)", "27-31", "28-32", "29-33", "30-34", "31-35"]
      ],
      tips: [
        "Mesurez à 1 cm au-dessus des sourcils et des oreilles",
        "Le casque doit couvrir complètement les oreilles sans serrer",
        "Vérifiez l'étanchéité avec vos lunettes de sécurité si nécessaire",
        "Pour un usage prolongé, privilégiez les modèles rembourrés"
      ],
      standards: ["EN 352-1", "ANSI S3.19"]
    },
    "coquilles-antibruit": {
      icon: <EarOff className="w-6 h-6 text-blue-500" />,
      title: "Coquilles Antibruit",
      description: "Sélectionnez la bonne taille de bouchons d'oreilles",
      image: "/images/size-guide-earplugs.jpg",
      table: [
        ["Type", "Petit", "Moyen", "Grand"],
        ["Diamètre (mm)", "10-12", "12-14", "14-16"],
        ["Atténuation (dB)", "25-29", "27-31", "29-33"]
      ],
      tips: [
        "Nettoyez vos mains avant manipulation",
        "Tirez doucement le pavillon de l'oreille vers l'arrière pour l'insertion",
        "Les coquilles doivent sceller complètement le conduit auditif",
        "Remplacez les bouchons mousse tous les 3-5 jours d'utilisation"
      ],
      standards: ["EN 352-2", "NRR 30+"]
    },
    "chaussures": {
      icon: <Footprints className="w-6 h-6 text-amber-500" />,
      title: "Chaussures de Sécurité",
      description: "Mesurez votre pied selon notre méthode pour choisir la pointure parfaite",
      image: "/images/size-guide-shoes.jpg",
      table: [
        ["Pointure EU", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
        ["Longueur pied (cm)", "23", "23.5", "24", "25", "25.5", "26", "27", "27.5", "28", "29"]
      ],
      tips: [
        "Mesurez en fin de journée quand le pied est légèrement gonflé",
        "Portez les chaussettes que vous utiliserez avec les chaussures de sécurité",
        "Laissez 1 cm d'espace entre le bout du pied et la chaussure"
      ],
      standards: ["EN ISO 20345:2022"]
    },
    "casques-securite": {
      icon: <HardHat className="w-6 h-6 text-red-500" />,
      title: "Casques de Sécurité",
      description: "Ajustement optimal pour une protection maximale de la tête",
      image: "/images/size-guide-helmets.jpg",
      table: [
        ["Taille", "XS", "S", "M", "L", "XL"],
        ["Circonférence (cm)", "53-54", "55-56", "57-58", "59-60", "61-62"]
      ],
      tips: [
        "Mesurez la circonférence à 2 cm au-dessus des sourcils",
        "Le casque ne doit ni serrer ni bouger librement",
        "Vérifiez l'ajustement après réglage du harnais"
      ],
      standards: ["EN 397:2012+A1"]
    }
  };

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
              <Ruler className="w-4 h-4" />
              <span className="text-sm font-medium">Protection Auditive & EPI</span>
            </div>
            
            <h1 
              className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Guides de <span className="text-primary">Tailles</span>
            </h1>
            
            <p 
              className={`text-xl text-muted-foreground transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Choisissez la protection parfaitement adaptée à vos besoins
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Navigation Tabs */}
        <div 
          className={`flex overflow-x-auto pb-2 mb-8 gap-1 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {Object.keys(sizeGuides).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === category
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {sizeGuides[category].title}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Column */}
          <div 
            className={`relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Image
              src={sizeGuides[activeTab].image}
              alt={`Guide de tailles pour ${sizeGuides[activeTab].title}`}
              fill
              className="object-cover"
              quality={90}
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white font-medium">
                {sizeGuides[activeTab].description}
              </p>
            </div>
          </div>

          {/* Info Column */}
          <div 
            className={`transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  {sizeGuides[activeTab].icon}
                </div>
                <h2 className="text-xl font-semibold">
                  {sizeGuides[activeTab].title}
                </h2>
              </div>

              {/* Size Table */}
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm">
                  <tbody>
                    {sizeGuides[activeTab].table.map((row, rowIndex) => (
                      <tr 
                        key={rowIndex}
                        className={rowIndex === 0 ? "font-semibold bg-secondary" : ""}
                      >
                        {row.map((cell, cellIndex) => (
                          <td 
                            key={cellIndex}
                            className={`px-3 py-2 border ${
                              cellIndex === 0 ? "text-left font-medium" : "text-center"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Standards */}
              {sizeGuides[activeTab].standards && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Normes applicables :</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizeGuides[activeTab].standards.map((standard, index) => (
                      <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">
                        {standard}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips Section */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-primary" />
                  Conseils d'ajustement
                </h3>
                <ul className="space-y-2">
                  {sizeGuides[activeTab].tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Special Notice for Hearing Protection */}
        {(activeTab === "casques-antibruit" || activeTab === "coquilles-antibruit") && (
          <div 
            className={`mt-8 bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-start gap-4">
              <Ear className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">
                  Protection Auditive Importante
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Pour une exposition supérieure à 85 dB, le port de protection auditive est obligatoire. 
                  Nos experts peuvent vous aider à calculer le niveau d'atténuation nécessaire à votre environnement de travail.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Download Section */}
        <div 
          className={`mt-16 bg-primary/5 rounded-xl p-8 border border-primary/10 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Guides Complets à Télécharger
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-6">
            Téléchargez nos documents techniques détaillés pour chaque type de protection
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(sizeGuides).map(([key, guide]) => (
              <Button 
                key={key} 
                variant="outline" 
                className="gap-2"
                asChild
              >
                <Link href={`/guides/guide-tailles-${key}.pdf`} target="_blank">
                  {guide.icon}
                  {guide.title} (PDF)
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-primary">Protection Auditive</span> sur Mesure
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nos spécialistes peuvent vous recommander les solutions adaptées à votre niveau d'exposition sonore
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-12 px-8 gap-2" asChild>
              <Link href="/contact">
                <Headphones className="w-5 h-5" />
                Demander un conseil
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 gap-2" asChild>
              <Link href="/products?category=protection-auditive">
                <EarOff className="w-5 h-5" />
                Voir nos protections auditives
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}