"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";

const faqs = [
  {
    category: "Commandes et Devis",
    icon: "💼",
    questions: [
      {
        q: "Comment demander un devis ?",
        a: "Vous pouvez demander un devis directement depuis la page du produit qui vous intéresse en cliquant sur le bouton 'Demander un devis'. Vous pouvez également nous contacter par téléphone ou par email."
      },
      {
        q: "Quel est le délai de réponse pour un devis ?",
        a: "Nous nous engageons à vous répondre dans un délai de 24 à 48 heures ouvrées."
      },
      {
        q: "Quels sont les modes de paiement acceptés ?",
        a: "Nous acceptons les paiements par virement bancaire, chèque et carte bancaire. Pour les professionnels, nous proposons également le paiement à 30 jours."
      },
      {
        q: "Comment suivre ma commande ?",
        a: "Une fois votre commande confirmée, vous recevrez un email avec un numéro de suivi vous permettant de suivre votre colis en temps réel."
      }
    ]
  },
  {
    category: "Produits et Certifications",
    icon: "🛡️",
    questions: [
      {
        q: "Vos produits sont-ils certifiés ?",
        a: "Oui, tous nos produits sont certifiés CE et répondent aux normes européennes en vigueur. Les certifications spécifiques sont indiquées sur chaque fiche produit."
      },
      {
        q: "Puis-je personnaliser les équipements ?",
        a: "Oui, nous proposons des services de personnalisation pour la plupart de nos équipements. Contactez-nous pour plus d'informations."
      },
      {
        q: "Quelle est la durée de vie des EPI ?",
        a: "La durée de vie varie selon le type d'EPI. Elle est indiquée dans la documentation technique de chaque produit. Un entretien régulier permet d'optimiser leur durée de vie."
      },
      {
        q: "Comment choisir la bonne taille ?",
        a: "Des guides de tailles détaillés sont disponibles sur chaque fiche produit. En cas de doute, notre équipe est là pour vous conseiller."
      }
    ]
  },
  {
    category: "Livraison et Retours",
    icon: "🚚",
    questions: [
      {
        q: "Quels sont les délais de livraison ?",
        a: "Les délais de livraison standards sont de 2 à 5 jours ouvrés. Pour les commandes urgentes, nous proposons une livraison express sous 24/48h."
      },
      {
        q: "Livrez-vous à l'international ?",
        a: "Oui, nous livrons dans toute l'Union Européenne. Les délais et frais de livraison varient selon la destination."
      },
      {
        q: "Quelle est votre politique de retour ?",
        a: "Vous disposez d'un délai de 14 jours pour retourner un produit non utilisé dans son emballage d'origine. Les frais de retour sont à votre charge."
      },
      {
        q: "Comment retourner un produit ?",
        a: "Contactez notre service client pour obtenir un numéro de retour. Emballez soigneusement le produit dans son emballage d'origine et joignez le formulaire de retour."
      }
    ]
  },
  {
    category: "Service Après-Vente",
    icon: "🔧",
    questions: [
      {
        q: "Proposez-vous des formations pour l'utilisation des EPI ?",
        a: "Oui, nous proposons des formations sur l'utilisation et l'entretien des EPI. Ces formations peuvent être réalisées dans vos locaux ou dans notre centre de formation."
      },
      {
        q: "Comment entretenir mes EPI ?",
        a: "Les instructions d'entretien sont fournies avec chaque produit. Nous proposons également des guides d'entretien détaillés sur notre site."
      },
      {
        q: "Que faire en cas de produit défectueux ?",
        a: "Contactez immédiatement notre service après-vente. Nous procéderons à un échange ou à un remboursement selon la situation."
      },
      {
        q: "Proposez-vous un service de maintenance ?",
        a: "Oui, nous proposons des contrats de maintenance pour certains équipements spécifiques. Contactez-nous pour en savoir plus."
      }
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-transparent" />

        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div 
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary mb-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Centre d'aide</span>
              </div>
              <h1 
                className={`text-4xl font-bold mb-6 transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Questions Fréquentes
              </h1>
              <p 
                className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Trouvez rapidement des réponses à vos questions
              </p>
            </div>

            {/* Search Bar */}
            <div 
              className={`relative max-w-xl mx-auto mb-12 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  type="search"
                  placeholder="Rechercher une question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 h-12 w-full bg-card"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="absolute left-0 right-0 mt-2 text-sm text-muted-foreground">
                  {filteredFaqs.reduce((total, category) => total + category.questions.length, 0)} résultat(s) trouvé(s)
                </div>
              )}
            </div>

            {/* FAQ Categories */}
            <div className="space-y-8">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((category, categoryIndex) => (
                  <div 
                    key={category.category}
                    className={`bg-card rounded-xl p-6 shadow-lg border hover:border-primary/20 transition-all duration-300 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${(categoryIndex + 4) * 100}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="text-2xl">{category.icon}</div>
                      <h2 className="text-xl font-semibold">{category.category}</h2>
                    </div>
                    <Accordion 
                      type="single" 
                      collapsible 
                      className="w-full"
                      value={expandedCategory}
                      onValueChange={setExpandedCategory}
                    >
                      {category.questions.map((faq, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`${category.category}-${index}`}
                          className="border-b-0 [&[data-state=open]]:bg-muted/50 rounded-lg mb-2 last:mb-0"
                        >
                          <AccordionTrigger className="hover:no-underline py-4 px-4 text-left [&[data-state=open]>div]:text-primary">
                            <div className="flex items-start">
                              <span className="text-base font-medium">{faq.q}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 pt-0">
                            <p className="text-muted-foreground">{faq.a}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-card rounded-xl border">
                  <HelpCircle className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-lg text-muted-foreground mb-4">
                    Aucun résultat ne correspond à votre recherche
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setSearchQuery("")}
                  >
                    Réinitialiser la recherche
                  </Button>
                </div>
              )}
            </div>

            {/* CTA Section */}
            <div 
              className={`mt-16 text-center transition-all duration-700 delay-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="text-muted-foreground mb-6">
                Vous n'avez pas trouvé la réponse à votre question ?
              </p>
              <Button size="lg" className="h-12" asChild>
                <Link href="/contact">
                  Contactez-nous
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