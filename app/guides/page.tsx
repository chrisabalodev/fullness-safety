"use client";

import { Ruler, Shoe, Shirt, HardHat, Gloves, Headphones, EarOff, ArrowRight, Download, Info, HandMetal, Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SizeGuidesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("chaussures-securite");
  const [conversionInput, setConversionInput] = useState("");
  const [conversionResult, setConversionResult] = useState("");
  const [conversionType, setConversionType] = useState("eu-to-us");
  const [showConversionHelp, setShowConversionHelp] = useState(false);

  const sizeGuides = {
    "chaussures-securite": {
      icon: <Footprints className="w-6 h-6 text-amber-500" />,
      title: "Chaussures de Sécurité",
      description: "Mesurez votre pied selon notre méthode pour choisir la pointure parfaite",
      image: "/images/size-guide-shoes.jpg",
      table: [
        ["Pointure EU", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
        ["Pointure US", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],
        ["Pointure UK", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
        ["Longueur pied (cm)", "23", "23.5", "24", "25", "25.5", "26", "27", "27.5", "28", "29"]
      ],
      tips: [
        "Mesurez en fin de journée quand le pied est légèrement gonflé",
        "Portez les chaussettes que vous utiliserez avec les chaussures de sécurité",
        "Laissez 1 cm d'espace entre le bout du pied et la chaussure"
      ],
      standards: ["EN ISO 20345:2022"],
      conversions: [
        { id: "eu-to-us", label: "EU → US", description: "Convertir pointure européenne en américaine" },
        { id: "eu-to-uk", label: "EU → UK", description: "Convertir pointure européenne en britannique" },
        { id: "cm-to-eu", label: "CM → EU", description: "Convertir longueur en cm en pointure européenne" }
      ]
    },
    "vetements-protection": {
      icon: <Shirt className="w-6 h-6 text-blue-500" />,
      title: "Vêtements de Protection",
      description: "Guide des tailles pour nos vêtements de protection et haute visibilité",
      image: "/images/size-guide-clothes.jpg",
      table: [
        ["Taille", "XS", "S", "M", "L", "XL", "XXL"],
        ["Tour poitrine (cm)", "86-91", "91-97", "97-103", "103-109", "109-115", "115-121"],
        ["Tour taille (cm)", "71-76", "76-81", "81-87", "87-93", "93-99", "99-104"],
        ["Tour hanches (cm)", "89-94", "94-100", "100-106", "106-112", "112-118", "118-124"]
      ],
      tips: [
        "Mesurez sans sur-vêtement pour plus de précision",
        "Pour les combinaisons, prévoyez une taille au-dessus si vous portez des couches épaisses",
        "Les tailles peuvent varier selon les fabricants"
      ],
      standards: ["EN ISO 20471", "EN 13034"],
      conversions: [
        { id: "taille-to-cm", label: "Taille → CM", description: "Convertir taille standard en mesures corporelles" },
        { id: "cm-to-taille", label: "CM → Taille", description: "Convertir mesures corporelles en taille standard" }
      ]
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
      standards: ["EN 397:2012+A1"],
      conversions: [
        { id: "taille-to-cm", label: "Taille → CM", description: "Convertir taille standard en circonférence" },
        { id: "cm-to-taille", label: "CM → Taille", description: "Convertir circonférence en taille standard" }
      ]
    },
    "gants-protection": {
      icon: <HandMetal className="w-6 h-6 text-green-500" />,
      title: "Gants de Protection",
      description: "Choisissez la bonne taille pour une dextérité optimale",
      image: "/images/size-guide-gloves.jpg",
      table: [
        ["Taille", "6", "7", "8", "9", "10"],
        ["Circonférence main (cm)", "17", "18", "19", "20", "21"],
        ["Longueur main (cm)", "16", "17", "18", "19", "20"]
      ],
      tips: [
        "Mesurez la main dominante",
        "Les gants trop grands réduisent la sensibilité",
        "Pour les travaux précis, privilégiez un ajustement serré"
      ],
      standards: ["EN 388", "EN 407"],
      conversions: [
        { id: "taille-to-cm", label: "Taille → CM", description: "Convertir taille standard en mesures" },
        { id: "cm-to-taille", label: "CM → Taille", description: "Convertir mesures en taille standard" }
      ]
    },
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
        "Vérifiez l'étanchéité avec vos lunettes de sécurité si nécessaire"
      ],
      standards: ["EN 352-1", "ANSI S3.19"],
      conversions: [
        { id: "taille-to-cm", label: "Taille → CM", description: "Convertir taille standard en circonférence" },
        { id: "cm-to-taille", label: "CM → Taille", description: "Convertir circonférence en taille standard" }
      ]
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
        "Les coquilles doivent sceller complètement le conduit auditif"
      ],
      standards: ["EN 352-2", "NRR 30+"],
      conversions: [
        { id: "taille-to-mm", label: "Taille → MM", description: "Convertir taille standard en diamètre" },
        { id: "mm-to-taille", label: "MM → Taille", description: "Convertir diamètre en taille standard" }
      ]
    }
  };

  // Méthode de conversion des tailles
  const convertSize = () => {
    if (!conversionInput) {
      setConversionResult("Veuillez entrer une valeur");
      return;
    }

    const value = parseFloat(conversionInput);
    if (isNaN(value)) {
      setConversionResult("Valeur invalide");
      return;
    }

    const currentGuide = sizeGuides[activeTab];
    let result;

    switch (activeTab) {
      case "chaussures-securite":
        switch (conversionType) {
          case "eu-to-us":
            result = value - 35 + 5; // Conversion EU → US
            break;
          case "eu-to-uk":
            result = value - 35 + 4; // Conversion EU → UK
            break;
          case "cm-to-eu":
            // Conversion CM → EU basée sur le tableau
            const sizes = currentGuide.table[3].slice(1);
            const cmValues = sizes.map(Number);
            let closestIndex = 0;
            let smallestDiff = Math.abs(value - cmValues[0]);
            
            for (let i = 1; i < cmValues.length; i++) {
              const diff = Math.abs(value - cmValues[i]);
              if (diff < smallestDiff) {
                smallestDiff = diff;
                closestIndex = i;
              }
            }
            result = currentGuide.table[0][closestIndex + 1];
            break;
          default:
            result = "Conversion non prise en charge";
        }
        break;

      default:
        // Logique générique pour les autres catégories
        const isCmToSize = conversionType.startsWith("cm") || conversionType.startsWith("mm");
        const measureIndex = isCmToSize ? 1 : 0;
        const sizeIndex = isCmToSize ? 0 : 1;
        
        const measures = currentGuide.table[measureIndex].slice(1);
        const sizes = currentGuide.table[sizeIndex].slice(1);
        
        if (isCmToSize) {
          // Conversion CM/MM → Taille
          const measureValues = measures.map(m => {
            if (m.includes("-")) {
              const [min, max] = m.split("-").map(Number);
              return (min + max) / 2;
            }
            return Number(m);
          });
          
          let closestIndex = 0;
          let smallestDiff = Math.abs(value - measureValues[0]);
          
          for (let i = 1; i < measureValues.length; i++) {
            const diff = Math.abs(value - measureValues[i]);
            if (diff < smallestDiff) {
              smallestDiff = diff;
              closestIndex = i;
            }
          }
          result = sizes[closestIndex];
        } else {
          // Conversion Taille → CM/MM
          const sizeIndex = sizes.findIndex(s => s.toLowerCase() === conversionInput.toLowerCase());
          if (sizeIndex !== -1) {
            result = measures[sizeIndex];
          } else {
            result = "Taille non trouvée";
          }
        }
    }

    setConversionResult(
      typeof result === "string" 
        ? result 
        : `Résultat: ${typeof result === 'number' ? Math.round(result * 2) / 2 : result}`
    );
  };

  useEffect(() => {
    setIsVisible(true);
    // Réinitialiser la conversion quand on change d'onglet
    setConversionInput("");
    setConversionResult("");
    setConversionType(sizeGuides[activeTab].conversions[0].id);
  }, [activeTab]);

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
              <span className="text-sm font-medium">Guides de tailles EPI</span>
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
              Trouvez la taille parfaite pour vos équipements de protection
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
          {/* Colonne image */}
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

          {/* Colonne info */}
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
              <div className="overflow-x-auto mb-6">
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

              {/* Conversion Section */}
              <div className="mt-6 border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-primary" />
                    Convertisseur de tailles
                  </h3>
                  <button 
                    onClick={() => setShowConversionHelp(!showConversionHelp)}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>

                {showConversionHelp && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md mb-4 text-sm text-blue-800 dark:text-blue-200">
                    <p>
                      Utilisez ce convertisseur pour transformer les tailles entre différents systèmes de mesure.
                      Sélectionnez le type de conversion et entrez votre valeur pour obtenir le résultat correspondant.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Type de conversion</label>
                    <select
                      value={conversionType}
                      onChange={(e) => setConversionType(e.target.value)}
                      className="w-full p-2 border rounded-md bg-background"
                    >
                      {sizeGuides[activeTab].conversions.map((conv) => (
                        <option key={conv.id} value={conv.id}>
                          {conv.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {conversionType.includes("cm") || conversionType.includes("mm") 
                        ? conversionType.includes("mm") 
                          ? "Diamètre (mm)" 
                          : "Mesure (cm)"
                        : "Taille"}
                    </label>
                    <input
                      type="text"
                      value={conversionInput}
                      onChange={(e) => setConversionInput(e.target.value)}
                      placeholder={`Entrez ${
                        conversionType.includes("cm") 
                          ? "la longueur en cm" 
                          : conversionType.includes("mm") 
                            ? "le diamètre en mm" 
                            : "la taille"
                      }`}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <Button onClick={convertSize} className="gap-2">
                    <Ruler className="w-4 h-4" />
                    Convertir
                  </Button>
                  
                  {conversionResult && (
                    <div className="bg-primary/10 text-primary px-4 py-2 rounded-md">
                      {conversionResult}
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  Note: Les conversions sont approximatives. Consultez notre guide complet pour des mesures précises.
                </p>
              </div>

              {/* Tips Section */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-primary" />
                  Conseils de mesure
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

              {/* Standards Section */}
              {sizeGuides[activeTab].standards && (
                <div className="mt-6">
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
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div 
          className={`mt-16 bg-primary/5 rounded-xl p-8 border border-primary/10 transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Guides complets à télécharger
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-6">
            Téléchargez nos documents techniques détaillés pour chaque type de protection
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(sizeGuides).map((category) => (
              <Button 
                key={category} 
                variant="outline" 
                className="gap-2"
                asChild
              >
                <Link href={`/guides/guide-tailles-${category}.pdf`} target="_blank">
                  {sizeGuides[category].icon}
                  {sizeGuides[category].title} (PDF)
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
            Besoin d'aide pour <span className="text-primary">choisir votre taille</span> ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nos conseillers techniques peuvent vous guider par téléphone ou en magasin
          </p>
          <Button size="lg" className="h-12 px-8" asChild>
            <Link href="/contact">
              Contactez nos experts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}