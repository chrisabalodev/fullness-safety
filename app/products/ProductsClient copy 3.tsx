"use client";

import { useState, useEffect } from "react";
import { Category, Product, SubCategory, getSubCategories } from "@/lib/db";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Package, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, Filter, Search, X, Scale, Ruler, AlignCenterVertical as Certificate, Calendar, ShieldCheck, Boxes } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  
  const initialCategoryId = searchParams.get('category') || undefined;
  const initialSubCategoryId = searchParams.get('subcategory') || undefined;
  const initialSearchQuery = searchParams.get('search') || undefined;

  const [page, setPage] = useState(1);
  const [localSearch, setLocalSearch] = useState(initialSearchQuery || "");
  const [selectedSpecifications, setSelectedSpecifications] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [subCategories, setSubCategories] = useState<SubCategory[]>(initialSubCategories);

  // Fonction pour nettoyer et séparer les valeurs
  const cleanAndSplitValues = (value: any): string[] => {
    if (Array.isArray(value)) {
      return value.map(v => v?.toString().trim()).filter(v => v);
    }
    return value?.toString().split(',')
      .map((v: string) => v.trim())
      .filter((v: string) => v.length > 0) || [];
  };

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

  // Filter products by category and subcategory
  // const filteredByCategory = initialCategoryId 
  //   ? initialProducts.filter(product => product.categoryId === initialCategoryId)
  //   : initialProducts;

  // const filteredBySubCategory = initialSubCategoryId
  //   ? filteredByCategory.filter(product => product.subCategoryId === initialSubCategoryId)
  //   : filteredByCategory;
  // Remplacer les filtres initiaux par :
  const filteredByCategory = initialCategoryId 
  ? initialProducts.filter(product => product.categoryId === initialCategoryId)
  : initialProducts;

  const filteredBySubCategory = initialSubCategoryId
  ? filteredByCategory.filter(product => product.subCategoryId === initialSubCategoryId)
  : filteredByCategory;

  // Extract specifications from filtered products
  const allSpecifications = filteredBySubCategory.reduce((acc, product) => {
    if (!product.specifications) return acc;
    
    Object.entries(product.specifications).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      
      if (!acc[key]) {
        acc[key] = new Set();
      }
      
      const values = cleanAndSplitValues(value);
      values.forEach(v => acc[key].add(v));
    });
    
    return acc;
  }, {} as Record<string, Set<string>>);

  const specificationOptions = Object.entries(allSpecifications).reduce((acc, [key, values]) => {
    acc[key] = Array.from(values).sort();
    return acc;
  }, {} as Record<string, string[]>);

  // Apply all filters
  // const filteredProducts = filteredBySubCategory.filter(product => {
  //   // Filtre par recherche texte
  //   const matchesSearch = !localSearch || 
  //     [product.name, product.description, product.sku]
  //       .some(field => field?.toLowerCase().includes(localSearch.toLowerCase()));

  //   // Filtre par spécifications
  //   const matchesSpecifications = Object.entries(selectedSpecifications)
  //     .every(([filterKey, filterValues]) => {
  //       if (filterValues.length === 0) return true;
        
  //       const productValue = product.specifications?.[filterKey];
  //       if (productValue === undefined || productValue === null) return false;
        
  //       const productValues = cleanAndSplitValues(productValue);
  //       return filterValues.some(filterValue => 
  //         productValues.includes(filterValue)
  //       );
  //     });

  //   return matchesSearch && matchesSpecifications;
  // }).sort((a, b) => {
  //   switch (sortBy) {
  //     case "newest":
  //       return new Date(b.documentation?.technicalSheet?.lastUpdate || 0).getTime() -
  //              new Date(a.documentation?.technicalSheet?.lastUpdate || 0).getTime();
  //     case "name_asc":
  //       return a.name.localeCompare(b.name);
  //     case "name_desc":
  //       return b.name.localeCompare(a.name);
  //     default:
  //       return 0;
  //   }
  // });

  // Dans le JSX, modifiez le message quand aucun produit n'est trouvé :
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
          className="group"
        >
          <Card className="overflow-hidden hover:border-primary/20 transition-all duration-300 h-full">
            <div className="aspect-square relative overflow-hidden bg-muted">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-12 h-12 text-muted-foreground/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Affichage des spécifications clés */}
              {product.specifications && Object.entries(product.specifications).length > 0 && (
                <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                  {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => {
                    // Gestion des valeurs multiples pour l'affichage
                    const displayValues = cleanAndSplitValues(value).slice(0, 2);
                    return displayValues.map((v, i) => (
                      <Badge
                        key={`${key}-${i}`}
                        variant="secondary"
                        className="bg-black/50 text-white text-[10px] sm:text-xs capitalize"
                      >
                        {key}: {v}
                      </Badge>
                    ));
                  })}
                  {Object.entries(product.specifications).length > 2 && (
                    <Badge
                      variant="secondary"
                      className="bg-black/50 text-white text-[10px] sm:text-xs"
                    >
                      +{Object.entries(product.specifications).length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            <div className="p-2 sm:p-4"> 
              <h5 className="font-medium text-sm sm:text-lg text-center group-hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h5>
              {product.description && (
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground text-center line-clamp-2 hidden sm:block">
                  {product.description}
                </p>
              )}
            </div>
          </Card>
        </Link>
      ))}
    </div>

    {/* Pagination */}
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

  // const clearFilters = () => {
  //   setLocalSearch("");
  //   setSelectedSpecifications({});
  //   setSortBy("newest");
  //   setPage(1);
  //   updateUrl({ search: undefined });
  // };
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

  // const updateUrl = (params: { 
  //   category?: string, 
  //   subcategory?: string, 
  //   search?: string 
  // }) => {
  //   const newParams = new URLSearchParams(searchParams.toString());
    
  //   if (params.category !== undefined) {
  //     if (params.category) newParams.set('category', params.category);
  //     else newParams.delete('category');
  //   }
    
  //   if (params.subcategory !== undefined) {
  //     if (params.subcategory) newParams.set('subcategory', params.subcategory);
  //     else newParams.delete('subcategory');
  //   }
    
  //   if (params.search !== undefined) {
  //     if (params.search) newParams.set('search', params.search);
  //     else newParams.delete('search');
  //   }
    
  //   router.push(`/products?${newParams.toString()}`);
  // };

  const updateUrl = (params: { 
    category?: string | undefined, 
    subcategory?: string | undefined, 
    search?: string | undefined 
  }) => {
    const newParams = new URLSearchParams();
    
    if (params.category) newParams.set('category', params.category);
    if (params.subcategory) newParams.set('subcategory', params.subcategory);
    if (params.search) newParams.set('search', params.search);
    
    router.push(`/products?${newParams.toString()}`);
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    updateUrl({ subcategory: subCategoryId });
  };

  // const getActiveFiltersCount = () => {
  //   return Object.values(selectedSpecifications).reduce(
  //     (count, values) => count + values.length,
  //     0
  //   ) + (sortBy !== "newest" ? 1 : 0);
  // };

  const getActiveFiltersCount = () => { 
    let count = 0;
    if (localSearch) count++;
    if (initialCategoryId) count++;
    if (initialSubCategoryId) count++;
    if (sortBy !== "newest") count++;
    
    return count + Object.values(selectedSpecifications)
      .reduce((sum, values) => sum + values.length, 0);
  };

  // Fonction pour obtenir une icône dynamique
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
      {/* ... (le reste du JSX reste inchangé jusqu'à la partie Dynamic Specifications Filters) ... */}

      <div className="relative">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-transparent" />

        <div className="container mx-auto py-12 px-4 relative">
          <div className="flex flex-col gap-8">
            {/* Category Title */}
            {activeCategory && (
              <div>
                <h1 className="text-3xl font-bold">{activeCategory.name}</h1>
                {activeCategory.description && (
                  <p className="text-muted-foreground mt-2">{activeCategory.description}</p>
                )}
              </div>
            )}

            {/* Filters and search */}
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
                        {/* Tri */}
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
      
      {/* Dynamic Specifications Filters */}
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

      {/* ... (le reste du JSX reste inchangé) ... */}
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
      
                  {/* Subcategories Navigation */}
                  {initialCategoryId && subCategories.length > 0 && (
                    <div className="relative">
                      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                        <div className="flex space-x-2 p-4">
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
                    </div>
                  )}
      
                  {/* Active Filters */}
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
                            {key}: {value}
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
      
                  {/* Products Grid */}
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                      <p className="text-lg text-muted-foreground">
                        {localSearch || getActiveFiltersCount() > 0
                          ? "Aucun produit ne correspond à vos critères"
                          : "Aucun produit trouvé dans cette catégorie"
                        }
                      </p>
                      <Button 
                        className="mt-4"
                        onClick={clearFilters}
                      >
                        Réinitialiser les filtres
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                        {paginatedProducts.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="group"
                          >
                            <Card className="overflow-hidden hover:border-primary/20 transition-all duration-300 h-full">
                              <div className="aspect-square relative overflow-hidden bg-muted">
                                {product.imageUrl ? (
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Package className="w-12 h-12 text-muted-foreground/50" />
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                {/* Show key specifications */}
                                {product.specifications && Object.entries(product.specifications).length > 0 && (
                                  <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                                    {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                                      <Badge
                                        key={key}
                                        variant="secondary"
                                        className="bg-black/50 text-white text-[10px] sm:text-xs capitalize"
                                      >
                                        {key}: {value}
                                      </Badge>
                                    ))}
                                    {Object.entries(product.specifications).length > 2 && (
                                      <Badge
                                        variant="secondary"
                                        className="bg-black/50 text-white text-[10px] sm:text-xs"
                                      >
                                        +{Object.entries(product.specifications).length - 2}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="p-2 sm:p-4"> 
                                <h5 className="font-medium text-sm sm:text-lg text-center group-hover:text-primary transition-colors line-clamp-2">
                                  {product.name}
                                </h5>
                                {/* {product.description && (
                                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground text-center line-clamp-2 hidden sm:block">
                                    {product.description}
                                  </p>
                                )} */}
                              </div>
                            </Card>
                          </Link>
                        ))}
                      </div>
      
                      {/* Pagination */}
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