"use client";

import { Button } from "@/components/ui/button";
import { Download, ArrowRight, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

export default function CatalogSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-muted/20 relative overflow-hidden">
      {/* Background effects - plus sophistiqués */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/10" />
      
      {/* Particules animées */}
      <div className="absolute inset-0 opacity-15">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content column - enrichie */}
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-4">
              <Star className="w-4 h-4 fill-current text-amber-500" />
              Nouvelle édition 2024
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Catalogue Équipements
              </span>{" "}
              <br />
              <span className="text-foreground">de Protection Professionnelle</span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Découvrez notre sélection exhaustive de plus de 500 produits certifiés pour la sécurité au travail.
            </p>

            {/* Features list */}
            <ul className="space-y-3">
              {[
                "Produits certifiés CE et normes internationales",
                "Fiches techniques détaillées pour chaque produit",
                "Nouveautés 2024 mises en avant",
                "Guide de sélection par métier"
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-base md:text-lg">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA buttons - améliorés */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                size="lg" 
                className="h-12 md:h-14 px-6 md:px-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-primary/30 group"
                asChild
              >
                <Link 
                  href="https://s02.swdrive.fr/s/ZRxBcJ4X4neGwqP/download/Catalogue%20Fullness%202023.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Télécharger le PDF
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="h-12 md:h-14 px-6 md:px-8 border-foreground/20 hover:bg-primary/5 hover:border-foreground/30 group bg-background/80 backdrop-blur-sm"
                asChild
              >
                <Link href="/products" className="flex items-center">
                  Voir les produits
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Image column - plus dynamique */}
          <div className="relative mt-8 lg:mt-0">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative group hover-lift transition-all duration-300">
              <img
                src="https://s02.swdrive.fr/s/SZW5QWWH2oEzEZb/preview?auto=format&fit=crop&q=80&w=1000"
                alt="Catalogue 2025 Fullness Protection"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-lg md:text-xl font-semibold">Catalogue Professionnel 2025</p>
                <p className="text-sm md:text-base text-white/80 mt-1">
                  Toutes nos solutions EPI en un seul document
                </p>
              </div>
            </div>
            
            {/* Decorative elements - plus visuels */}
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-primary/10 rounded-full blur-[60px] z-[-1]" />
            <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-blue-500/10 rounded-full blur-[60px] z-[-1]" />
            <div className="absolute top-1/2 -translate-y-1/2 -left-12 w-24 h-24 bg-emerald-500/5 rounded-full blur-[50px] z-[-1]" />
          </div>
        </div>
      </div>

      {/* Animation CSS */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}