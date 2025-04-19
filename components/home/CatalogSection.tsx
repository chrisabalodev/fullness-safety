"use client";

import { Button } from "@/components/ui/button";
import { Download, ArrowRight, CheckCircle2, Star, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Catalog {
  id: string;
  title: string;
  description: string;
  year: number;
  fileUrl: string;
  coverImage: string;
  metadata: {
    isCurrent: boolean;
    [key: string]: any;
  };
}

export default function CatalogSection() {
  const [currentCatalog, setCurrentCatalog] = useState<Catalog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentCatalog = async () => {
      try {
        const response = await fetch('/api/catalogs/current');
        const data = await response.json();
        setCurrentCatalog(data);
      } catch (error) {
        console.error("Error fetching catalog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentCatalog();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse text-center">
              <FileText className="mx-auto h-10 w-10 text-primary/30" />
              <p className="mt-3 text-primary/50">Chargement du catalogue...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!currentCatalog) return null;

  return (
    <section className="py-12 md:py-16 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#2d3748_1px,transparent_1px)] bg-[size:16px_16px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Content - reduced width */}
          <div className="w-full lg:w-1/2 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-medium">
              <Star className="w-3 h-3 fill-current text-amber-500" />
              Nouvelle édition {currentCatalog.year}
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {currentCatalog.title}
              </span>
            </h2>
            
            <p className="text-muted-foreground leading-relaxed">
              {currentCatalog.description}
            </p>

            <ul className="space-y-2">
              {[
                "Produits certifiés aux normes européennes",
                "Fiches techniques complètes",
                `Nouveautés ${currentCatalog.year}`,
                "Guide de sélection par secteur"
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button 
                size="sm" 
                className="px-5 bg-primary hover:bg-primary/90"
                asChild
              >
                <Link href={currentCatalog.fileUrl} target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="px-5"
                asChild
              >
                <Link href="/products">
                  Voir les produits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Preview - smaller and elegant */}
          <div className="w-full lg:w-1/2">
            <div className="relative group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-md border border-muted-foreground/10">
                <img
                  src={currentCatalog.coverImage}
                  alt={`Catalogue ${currentCatalog.year}`}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-102"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Preview badge */}
              <div className="absolute -top-3 -right-3 bg-background rounded-full p-1 shadow-sm border border-muted-foreground/10">
                <div className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  Preview
                </div>
              </div>
            </div>
            
            {/* File info */}
            <div className="mt-3 text-xs text-muted-foreground text-center">
              Cliquez sur "Télécharger" pour obtenir la version complète
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}