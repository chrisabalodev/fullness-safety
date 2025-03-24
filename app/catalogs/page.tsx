"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, Calendar, ChevronLeft, ChevronRight, ChevronFirst, ChevronLast } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Catalog {
  id: string;
  title: string;
  year: number;
  description: string;
  pdfUrl: string;
  coverImage: string;
  updatedAt: string;
}

// Sample data - in production this would come from an API
const allCatalogs: Catalog[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${2024 - Math.floor(i / 4)}-${(i % 4) + 1}`,
  title: `Catalogue ${i % 2 === 0 ? 'Général' : 'Spécialisé'}`,
  year: 2024 - Math.floor(i / 4),
  description: `${i % 2 === 0 ? 'Notre catalogue complet' : 'Catalogue spécialisé'} d'équipements de protection pour l'année ${2024 - Math.floor(i / 4)}.`,
  pdfUrl: `https://example.com/catalog-${2024 - Math.floor(i / 4)}-${(i % 4) + 1}.pdf`,
  coverImage: i % 2 === 0
    ? "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?auto=format&fit=crop&q=80&w=1000"
    : "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&q=80&w=1000",
  updatedAt: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString() // Subtract i months
}));

const ITEMS_PER_PAGE = 6;

export default function CatalogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(allCatalogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const catalogsToShow = allCatalogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-transparent" />

        <div className="container mx-auto px-4 py-16 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary mb-8">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Nos Catalogues</span>
            </div>
            <h1 className="text-4xl font-bold mb-6">Catalogues par Année</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre gamme complète d'équipements de protection à travers nos catalogues annuels
            </p>
          </div>

          {/* Catalogs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogsToShow.map((catalog) => (
              <Card 
                key={catalog.id}
                className="overflow-hidden hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={catalog.coverImage}
                    alt={`Catalogue ${catalog.year}`}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 text-white/80 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Mis à jour le {new Date(catalog.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {catalog.title} {catalog.year}
                    </h3>
                    <p className="text-sm text-white/80 mb-4">
                      {catalog.description}
                    </p>
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <Link href={catalog.pdfUrl} target="_blank">
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger le catalogue
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(1)}
                  className="hidden sm:inline-flex"
                >
                  <ChevronFirst className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => {
                      if (totalPages <= 7) return true;
                      if (p === 1 || p === totalPages) return true;
                      if (p >= currentPage - 1 && p <= currentPage + 1) return true;
                      return false;
                    })
                    .map((p, i, arr) => (
                      <div key={p}>
                        {i > 0 && arr[i - 1] !== p - 1 && (
                          <span className="px-2 text-muted-foreground">...</span>
                        )}
                        <Button
                          variant={p === currentPage ? "default" : "outline"}
                          size="icon"
                          className="w-10"
                          onClick={() => handlePageChange(p)}
                        >
                          {p}
                        </Button>
                      </div>
                    ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(totalPages)}
                  className="hidden sm:inline-flex"
                >
                  <ChevronLast className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Page {currentPage} sur {totalPages}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}