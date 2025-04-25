"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowRight, Search, X, Shield, CreditCard, Truck, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Metadata } from "next";

// app/faq/page.tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Vos produits sont-ils conformes aux normes européennes ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, tous nos EPI respectent les normes EN ISO et CE."
      }
    }
  ]
};
 

const faqs = [
  {
    category: "Produits EPI",
    icon: <Shield className="w-5 h-5 text-blue-500" />,
    questions: [
      {
        q: "Quels types d'EPI proposez-vous ?",
        a: "Nous proposons une gamme complète d'Équipements de Protection Individuelle : casques de sécurité, gants anti-coupures, chaussures de sécurité, lunettes de protection, masques respiratoires, harnais antichute, et vêtements de protection haute visibilité."
      },
      {
        q: "Vos EPI sont-ils certifiés ?",
        a: "Tous nos EPI répondent aux normes en vigueur au Togo et sont certifiés CE ou ANSI selon les produits. Les certifications spécifiques sont indiquées sur chaque fiche produit."
      },
      {
        q: "Comment choisir la bonne taille pour mes EPI ?",
        a: "Des guides de tailles détaillés sont disponibles sur chaque fiche produit. Pour les commandes en volume, nous pouvons envoyer un technico-commercial pour des mesures précises."
      },
      {
        q: "Proposez-vous des EPI adaptés aux secteurs spécifiques ?",
        a: "Oui, nous avons des solutions spécialisées pour le BTP, l'industrie pétrolière, l'agroalimentaire, le secteur médical et les services électriques."
      }
    ]
  },
  {
    category: "Commandes et Paiements",
    icon: <CreditCard className="w-5 h-5 text-emerald-500" />,
    questions: [
      {
        q: "Comment commander des EPI ?",
        a: "Vous pouvez passer commande via notre site web, par WhatsApp au +228 91 21 82 26, ou directement dans notre showroom à Lomé. Pour les entreprises, nous proposons des visites commerciales sur demande."
      },
      {
        q: "Quels sont vos modes de paiement ?",
        a: "Nous acceptons les paiements en FCFA (cash), mobile money (Mix By Yas, Moov), virements bancaires et cartes bancaires. Les commandes supérieures à 1 million FCFA nécessitent un acompte de 50%."
      },
      {
        q: "Proposez-vous des tarifs dégressifs ?",
        a: "Oui, nous accordons des remises progressives à partir de 10 unités commandées. Contactez notre service commercial pour un devis personnalisé."
      },
      {
        q: "Facturez-vous avec TVA ?",
        a: "Oui, toutes nos factures incluent la TVA en vigueur au Togo. Nous fournissons des documents fiscaux conformes pour votre comptabilité."
      }
    ]
  },
  {
    category: "Livraison et Transport",
    icon: <Truck className="w-5 h-5 text-amber-500" />,
    questions: [
      {
        q: "Quels sont vos frais de livraison ?",
        a: "Toutes les livraisons sont payantes. Pour les autres villes: devis selon le poids et la destination. Les commandes volumineuses bénéficient d'un transport sécurisé."
      },
      {
        q: "Quels sont vos délais de livraison ?",
        a: "À Lomé: 24-48h après confirmation de paiement. Pour l'intérieur du pays: 3-7 jours ouvrés. Les commandes urgentes peuvent être traitées en express avec majoration."
      },
      {
        q: "Livrez-vous dans tout le Togo ?",
        a: "Oui, nous expédions dans toutes les régions via notre réseau de transporteurs partenaires. Les commandes pour les zones reculées peuvent nécessiter des délais supplémentaires."
      },
      {
        q: "Puis-je récupérer ma commande en magasin ?",
        a: "Oui, le retrait gratuit est possible dans notre entrepôt à Lomé sur rendez-vous. Vous bénéficierez d'une vérification complète de votre commande avant emport."
      }
    ]
  },
  {
    category: "Garantie et SAV",
    icon: <Settings className="w-5 h-5 text-purple-500" />,
    questions: [
      {
        q: "Quelle est votre politique de garantie ?",
        a: "Nos EPI bénéficient d'une garantie constructeur de 6 mois à 2 ans selon les articles. La garantie couvre les défauts de fabrication mais pas l'usure normale."
      },
      {
        q: "Que faire en cas de produit défectueux ?",
        a: "Contactez immédiatement notre SAV au +228 91 21 82 26 avec photos du défaut. Nous organiserons l'échange ou le remboursement selon les conditions de garantie."
      }
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string>();

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
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section with Animation */}
            <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Support Technique EPI</span>
              </div>
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Centre d'Aide
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Réponses aux questions fréquentes sur nos équipements de protection
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className={`relative max-w-2xl mx-auto mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="relative shadow-sm rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  type="search"
                  placeholder="Rechercher une question (ex: 'livraison', 'paiement')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 h-12 w-full bg-background border-primary/20 focus:border-primary/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-primary transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="absolute left-0 right-0 mt-2 text-sm text-muted-foreground animate-fade-in">
                  {filteredFaqs.reduce((total, category) => total + category.questions.length, 0)} réponse(s) trouvée(s)
                </div>
              )}
            </div>

            {/* FAQ Categories with Improved Design */}
            <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((category, catIndex) => (
                  <div 
                    key={category.category}
                    className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {category.icon}
                      </div>
                      <h2 className="text-xl font-semibold">{category.category}</h2>
                    </div>
                    <Accordion 
                      type="single" 
                      collapsible
                      value={expandedItem}
                      onValueChange={setExpandedItem}
                      className="space-y-2"
                    >
                      {category.questions.map((faq, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`${category.category}-${index}`}
                          className="overflow-hidden border-none"
                        >
                          <AccordionTrigger className="hover:no-underline py-3 px-4 rounded-lg hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/30">
                            <div className="flex items-start text-left">
                              <span className="font-medium">{faq.q}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-2 pt-0 text-muted-foreground">
                            <div className="prose prose-sm prose-primary max-w-none">
                              {faq.a}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              ) : (
                <div className={`text-center py-16 bg-card rounded-xl border border-dashed transition-all duration-300 ${searchQuery ? 'animate-pulse' : ''}`}>
                  <HelpCircle className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-lg text-muted-foreground mb-4">
                    Aucune question ne correspond à votre recherche
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setSearchQuery("")}
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Réinitialiser la recherche
                  </Button>
                </div>
              )}
            </div>

            {/* Enhanced CTA Section */}
            <div className={`mt-16 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 inline-block mb-6">
                <HelpCircle className="w-8 h-8 mx-auto text-primary mb-3" />
                <p className="text-muted-foreground mb-4 max-w-md">
                  Vous ne trouvez pas la réponse à votre question ?
                </p>
                <Button size="lg" className="h-12 gap-2" asChild>
                  <Link href="/contact">
                    Contactez notre équipe
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}