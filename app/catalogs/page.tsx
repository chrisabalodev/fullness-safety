"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, Calendar, ChevronLeft, ChevronRight, FileBox, FileSearch } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCatalogs, type Catalog } from "@/lib/storage";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const ITEMS_PER_PAGE = 9;

export default function CatalogsPage() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  useEffect(() => {
    const loadCatalogs = async () => {
      try {
        setLoading(true);
        const loadedCatalogs = await getCatalogs();
        setCatalogs(loadedCatalogs);
      } catch (error) {
        console.error("Failed to load catalogs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCatalogs();
  }, []);

  // Filter catalogs by year if selected
  const filteredCatalogs = selectedYear
    ? catalogs.filter(catalog => catalog.year.toString() === selectedYear)
    : catalogs;

  // Get unique years
  const availableYears = [...new Set(catalogs.map(catalog => catalog.year.toString()))].sort((a, b) => b.localeCompare(a));

  // Pagination logic
  const totalPages = Math.ceil(filteredCatalogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const catalogsToShow = filteredCatalogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && catalogs.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-48 mx-auto mb-8" />
            <Skeleton className="h-8 w-64 mx-auto mb-6" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-[3/4] w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-6" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary mb-8">
            <FileBox className="w-4 h-4" />
            <span className="text-sm font-medium">Catalogues Professionnels</span>
          </div>
          <h1 className="text-4xl font-bold mb-6">Catalogues Fullness Safety</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Consultez nos catalogues produits par année
          </p>
        </div>

        {/* Year Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center">
          <select
            value={selectedYear || ''}
            onChange={(e) => {
              setSelectedYear(e.target.value || null);
              setCurrentPage(1);
            }}
            className="rounded-md border border-input px-4 py-2 text-sm max-w-xs"
          >
            <option value="">Toutes les années</option>
            {availableYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {selectedYear && (
            <Button
              variant="outline"
              onClick={() => {
                setSelectedYear(null);
                setCurrentPage(1);
              }}
            >
              Réinitialiser
            </Button>
          )}
        </div>

        {/* Catalogs Grid */}
        {catalogsToShow.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalogsToShow.map((catalog) => (
                <Card 
                  key={catalog.id}
                  className="overflow-hidden hover:border-primary/20 transition-all duration-300 group hover:shadow-lg"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={catalog.coverImage || '/placeholder-catalog.jpg'}
                      alt={`Catalogue ${catalog.year}`}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 text-white/80">
                          <Calendar className="w-4 h-4" />
                          <span className="text-xs">
                            {catalog.year}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {catalog.pages} pages
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {catalog.title}
                      </h3>
                      <p className="text-sm text-white/80 mb-4 line-clamp-2">
                        {catalog.description}
                      </p>
                      
                      <div className="space-y-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full hover:bg-primary/90 flex items-center justify-between"
                          asChild
                        >
                          <Link 
                            href={catalog.fileUrl} 
                            target="_blank"
                          >
                            <span>Télécharger le catalogue</span>
                            <Download className="w-4 h-4" />
                          </Link>
                        </Button>

                        {catalog.fileSize && (
                          <div className="text-xs text-white/60 text-center">
                            {catalog.fileSize} • PDF
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  {filteredCatalogs.length} catalogues trouvés • Page {currentPage} sur {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                    className="hidden sm:inline-flex"
                  >
                    «
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    ‹
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === currentPage ? "default" : "outline"}
                          size="sm"
                          className="w-10 h-10"
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    ›
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="hidden sm:inline-flex"
                  >
                    »
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <FileSearch className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">Aucun catalogue trouvé</h3>
            <p className="text-muted-foreground">
              {selectedYear
                ? `Aucun catalogue disponible pour l'année ${selectedYear}`
                : "Aucun catalogue disponible pour le moment"}
            </p>
            {selectedYear && (
              <Button
                variant="ghost"
                className="mt-4"
                onClick={() => setSelectedYear(null)}
              >
                Afficher tous les catalogues
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}