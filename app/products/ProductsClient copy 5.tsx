"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Category, Product, SubCategory, getSubCategories } from "@/lib/db";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Package, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, 
  Filter, Search, X, Scale, Ruler, AlignCenterVertical as Certificate, 
  Calendar, ShieldCheck, Boxes 
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

const ITEMS_PER_PAGE = 12;

interface ProductsClientProps {
  initialCategories: Category[];
  initialSubCategories: SubCategory[];
  initialProducts: Product[];
}

export default function ProductsClient({
  initialCategories,
  initialSubCategories,
  initialProducts,
}: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const initialCategoryId = searchParams.get('category') || undefined;
  const initialSubCategoryId = searchParams.get('subcategory') || undefined;
  const initialSearchQuery = searchParams.get('search') || undefined;

  const [page, setPage] = useState(1);
  const [localSearch, setLocalSearch] = useState(initialSearchQuery || "");
  const [selectedSpecifications, setSelectedSpecifications] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [subCategories, setSubCategories] = useState<SubCategory[]>(initialSubCategories);
  const [specificationOptions, setSpecificationOptions] = useState<Record<string, string[]>>({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Fonction de nettoyage des valeurs
  const cleanAndSplitValues = useCallback((value: any, key?: string): string[] => {
    if (!value) return [];
    
    const valuesArray = Array.isArray(value) 
      ? value.map(v => v?.toString().trim())
      : value.toString().split(',').map((v: string) => v.trim());

    const cleanedValues = valuesArray
      .filter(v => v && v.length > 0)
      .map(v => {
        let cleaned = v
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim();

        if (key) {
          const lowerKey = key.toLowerCase();
          if (lowerKey.includes('dimension') || lowerKey.includes('taille') || lowerKey.includes('poids')) {
            cleaned = cleaned.replace(/(\d)\s*([x×*])\s*(\d)/g, '$1x$3')
                           .replace(/\s*(mm|cm|m|kg|g)\s*/g, '$1');
          } else if (lowerKey.includes('couleur')) {
            cleaned = cleaned.replace(/[^a-zA-Zéèàêâîôû]/g, '');
          }
        }

        return cleaned;
      });

    return [...new Set(cleanedValues)]
      .map(v => v.charAt(0).toUpperCase() + v.slice(1));
  }, []);

  // Vérification de la position de défilement
  const checkScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  // Défilement gauche
  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  }, []);

  // Défilement droit
  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  }, []);

  // Vérification initiale et après redimensionnement
  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [checkScrollPosition]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (initialCategoryId) {
        const subs = await getSubCategories(initialCategoryId);
        setSubCategories(subs);
      } else {
        setSubCategories([]);
      }
    };
    fetchSubCategories();
  }, [initialCategoryId]);

  useEffect(() => {
    const filteredByCategory = initialCategoryId 
      ? initialProducts.filter(product => product.categoryId === initialCategoryId)
      : initialProducts;

    const filteredBySubCategory = initialSubCategoryId
      ? filteredByCategory.filter(product => product.subCategoryId === initialSubCategoryId)
      : filteredByCategory;

    const newSpecs = filteredBySubCategory.reduce((acc, product) => {
      if (!product.specifications) return acc;
      
      Object.entries(product.specifications).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        
        if (!acc[key]) {
          acc[key] = new Set();
        }
        
        const values = cleanAndSplitValues(value, key);
        values.forEach(v => acc[key].add(v));
      });
      
      return acc;
    }, {} as Record<string, Set<string>>);

    const sortedSpecs = Object.entries(newSpecs).reduce((acc, [key, values]) => {
      acc[key] = Array.from(values).sort((a, b) => a.localeCompare(b));
      return acc;
    }, {} as Record<string, string[]>);

    setSpecificationOptions(sortedSpecs);
  }, [initialProducts, initialCategoryId, initialSubCategoryId, cleanAndSplitValues]);

  const filteredByCategory = initialCategoryId 
    ? initialProducts.filter(product => product.categoryId === initialCategoryId)
    : initialProducts;

  const filteredBySubCategory = initialSubCategoryId
    ? filteredByCategory.filter(product => product.subCategoryId === initialSubCategoryId)
    : filteredByCategory;

  const filteredProducts = filteredBySubCategory.filter(product => {
    const matchesSearch = !localSearch || 
      [product.name, product.description, product.sku]
        .some(field => field?.toLowerCase().includes(localSearch.toLowerCase()));

    const matchesSpecifications = Object.entries(selectedSpecifications)
      .every(([filterKey, filterValues]) => {
        if (filterValues.length === 0) return true;
        
        const productValue = product.specifications?.[filterKey];
        if (productValue === undefined || productValue === null) return false;
        
        const productValues = cleanAndSplitValues(productValue, filterKey);
        return filterValues.some(filterValue => 
          productValues.includes(filterValue)
        );
      });

    return matchesSearch && matchesSpecifications;
  }).sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.documentation?.technicalSheet?.lastUpdate || 0).getTime() -
               new Date(a.documentation?.technicalSheet?.lastUpdate || 0).getTime();
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const activeCategory = initialCategories.find(c => c.id === initialCategoryId);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (value: string) => {
    setLocalSearch(value);
    setPage(1);
    updateUrl({ search: value || undefined });
  };

  const handleSpecificationToggle = (specKey: string, value: string) => {
    setSelectedSpecifications(prev => ({
      ...prev,
      [specKey]: prev[specKey]?.includes(value)
        ? prev[specKey].filter(v => v !== value)
        : [...(prev[specKey] || []), value]
    }));
    setPage(1);
  };

  const clearFilters = () => {
    setLocalSearch("");
    setSelectedSpecifications({});
    setSortBy("newest");
    setPage(1);
    updateUrl({ 
      search: undefined,
      category: undefined,
      subcategory: undefined 
    });
  };

  const updateUrl = (params: { 
    category?: string | undefined, 
    subcategory?: string | undefined, 
    search?: string | undefined 
  }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (params.category !== undefined) {
      if (params.category) {
        newParams.set('category', params.category);
      } else {
        newParams.delete('category');
      }
    }
    
    if (params.subcategory !== undefined) {
      if (params.subcategory) {
        newParams.set('subcategory', params.subcategory);
      } else {
        newParams.delete('subcategory');
      }
    }
    
    if (params.search !== undefined) {
      if (params.search) {
        newParams.set('search', params.search);
      } else {
        newParams.delete('search');
      }
    }
    
    router.push(`/products?${newParams.toString()}`);
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (subCategoryId) {
      newParams.set('subcategory', subCategoryId);
    } else {
      newParams.delete('subcategory');
    }
    
    router.push(`/products?${newParams.toString()}`);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localSearch) count++;
    if (initialCategoryId) count++;
    if (initialSubCategoryId) count++;
    if (sortBy !== "newest") count++;
    
    return count + Object.values(selectedSpecifications)
      .reduce((sum, values) => sum + values.length, 0);
  };

  const getDynamicIcon = (key: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      poids: <Scale className="w-4 h-4 text-primary" />,
      taille: <Ruler className="w-4 h-4 text-primary" />,
      materiau: <Boxes className="w-4 h-4 text-primary" />,
      couleur: <div className="w-4 h-4 rounded-full bg-current" />,
      default: <Certificate className="w-4 h-4 text-primary" />
    };
    
    return iconMap[key.toLowerCase()] || iconMap.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="relative">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-transparent" />

        <div className="container mx-auto py-12 px-4 relative">
          <div className="flex flex-col gap-8">
            {activeCategory && (
              <div>
                <h1 className="text-3xl font-bold">{activeCategory.name}</h1>
                {activeCategory.description && (
                  <p className="text-muted-foreground mt-2">{activeCategory.description}</p>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="h-10">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtres
                      {getActiveFiltersCount() > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {getActiveFiltersCount()}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Filtres</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value="sort">
                          <AccordionTrigger className="py-4 hover:no-underline">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Calendar className="w-4 h-4 text-primary" />
                              </div>
                              <span className="font-medium">Trier par</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <RadioGroup value={sortBy} onValueChange={setSortBy} className="pl-11 space-y-3">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="newest" id="newest" />
                                <Label htmlFor="newest">Plus récents</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="name_asc" id="name_asc" />
                                <Label htmlFor="name_asc">Nom (A-Z)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="name_desc" id="name_desc" />
                                <Label htmlFor="name_desc">Nom (Z-A)</Label>
                              </div>
                            </RadioGroup>
                          </AccordionContent>
                        </AccordionItem>

                        {Object.entries(specificationOptions).map(([key, values]) => (
                          <AccordionItem key={key} value={key}>
                            <AccordionTrigger className="py-4 hover:no-underline">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                  {getDynamicIcon(key)}
                                </div>
                                <span className="font-medium capitalize">{key}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-3 pl-11">
                                {values.map((value) => (
                                  <div key={`${key}-${value}`} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`${key}-${value}`}
                                      checked={(selectedSpecifications[key] || []).includes(value)}
                                      onCheckedChange={() => handleSpecificationToggle(key, value)}
                                    />
                                    <Label htmlFor={`${key}-${value}`} className="cursor-pointer">
                                      {value}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </ScrollArea>
                    <SheetFooter className="mt-4">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={clearFilters}
                      >
                        Réinitialiser les filtres
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    value={localSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 pr-10 w-full sm:w-[300px]"
                  />
                  {localSearch && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => handleSearch("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              </div>
            </div>

            {initialCategoryId && subCategories.length > 0 && (
              <div className="relative group overflow-hidden">
                {canScrollLeft && (
                  <div className="absolute left-0 top-0 bottom-0 flex items-center z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-background"
                      onClick={scrollLeft}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                  <div 
                    ref={scrollContainerRef}
                    className="flex space-x-2 p-4"
                    onScroll={checkScrollPosition}
                  >
                    {subCategories.map((subCategory) => (
                      <Button
                        key={subCategory.id}
                        variant={subCategory.id === initialSubCategoryId ? "default" : "outline"}
                        className="shrink-0"
                        onClick={() => handleSubCategoryClick(subCategory.id)}
                      >
                        {subCategory.name}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
                
                {canScrollRight && (
                  <div className="absolute right-0 top-0 bottom-0 flex items-center z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-background"
                      onClick={scrollRight}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <div className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-0 ${
                  !canScrollLeft ? 'opacity-0' : ''
                }`} />
                <div className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-0 ${
                  !canScrollRight ? 'opacity-0' : ''
                }`} />
              </div>
            )}

            {getActiveFiltersCount() > 0 && (
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedSpecifications).map(([key, values]) =>
                  values.map((value) => (
                    <Badge
                      key={`${key}-${value}`}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive/10"
                      onClick={() => handleSpecificationToggle(key, value)}
                    >
                      <span className="capitalize">{key}</span>: {value}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))
                )}
                {sortBy !== "newest" && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive/10"
                    onClick={() => setSortBy("newest")}
                  >
                    {sortBy === "name_asc" ? "Nom (A-Z)" : "Nom (Z-A)"}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Effacer tout
                </Button>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-lg text-muted-foreground">
                  Aucun produit ne correspond à vos critères
                </p>
                <Button 
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Afficher tous les produits
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                  {paginatedProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="group block h-full focus:outline-none"
                    >
                      <div className="flex h-full flex-col overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-md">
                        <div className="relative h-72 w-full bg-gray-50 sm:h-72">
                          {product.imageUrl ? (
                            <>
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
                                loading="lazy"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                              <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </>
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-100">
                              <Package className="h-12 w-12 text-gray-300" />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-1 flex-col p-4">
                          <h3 className="mb-1 text-sm font-medium text-gray-900 line-clamp-2 md:text-base">
                            {product.name}
                          </h3>
                          
                          {product.specifications && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {Object.entries(product.specifications)
                                .slice(0, 2)
                                .map(([key, value]) => {
                                  const displayValue = cleanAndSplitValues(value, key)[0];
                                  return (
                                    <span 
                                      key={`${key}-${displayValue}`}
                                      className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                                    >
                                      {displayValue}
                                    </span>
                                  );
                                })}
                            </div>
                          )}

                          <div className="mt-auto pt-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <span className="text-xs font-medium text-primary underline-offset-4 group-hover:underline md:text-sm">
                              Voir détails
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
 
                {totalPages > 1 && (
                  <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={page === 1}
                        onClick={() => handlePageChange(1)}
                        className="hidden sm:inline-flex"
                      >
                        <ChevronFirst className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(p => {
                            if (totalPages <= 7) return true;
                            if (p === 1 || p === totalPages) return true;
                            if (p >= page - 1 && p <= page + 1) return true;
                            return false;
                          })
                          .map((p, i, arr) => (
                            <div key={p}>
                              {i > 0 && arr[i - 1] !== p - 1 && (
                                <span className="px-2 text-muted-foreground">...</span>
                              )}
                              <Button
                                variant={p === page ? "default" : "outline"}
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
                        disabled={page === totalPages}
                        onClick={() => handlePageChange(page + 1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={page === totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        className="hidden sm:inline-flex"
                      >
                        <ChevronLast className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Page {page} sur {totalPages}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}