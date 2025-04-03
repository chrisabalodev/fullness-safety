"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { 
  ShieldCheck, 
  Search, 
  Menu,
  Package,
  Info,
  Phone,
  FileText,
  ChevronRight,
  ChevronDown,
  Loader2,
  HelpCircle,
  Book
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MegaMenu } from "./MegaMenu";
import { getProducts } from "@/lib/db";
import logo from '@/public/logo.png'; 
import Image from "next/image";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    setIsSearching(false);
    setIsSearchDialogOpen(false);
  }, [pathname]);

  const handleSearch = async (query: string) => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const products = await getProducts();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const navItems = [
    { href: "/products", label: "Produits", icon: Package, hasMegaMenu: true },
    { href: "/catalogs", label: "Catalogues", icon: Book },
    { href: "/about", label: "À propos", icon: Info },
    { href: "/contact", label: "Contact", icon: Phone },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        ref={headerRef}
        className={`
          w-full z-50 border-b bg-background/95 backdrop-blur-md transition-all duration-300
          ${isSticky 
            ? 'fixed top-0 shadow-lg animate-in slide-in-from-top' 
            : 'sticky top-0'
          }
          h-[90px] py-[10px]
        `}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex h-full items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 h-full">
              <Image 
                src={logo} 
                alt="Fullness safety"
                width={120}
                height={70}
                className="object-contain h-full"
                priority
              />
            </Link>

            {/* Navigation desktop */}
            <nav className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <div key={item.href} className="relative">
                  {item.hasMegaMenu ? (
                    <button
                      onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                        isActive(item.href) ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        isMegaMenuOpen ? 'rotate-180' : ''
                      }`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isActive(item.href) ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:bg-primary/5 relative"
                    aria-label="Rechercher un produit"
                  >
                    <Search className="h-5 w-5" />
                    {searchQuery.trim().length > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                        {searchResults.length}
                      </span>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent 
                  className="sm:max-w-[600px] p-0 rounded-lg overflow-hidden"
                  onInteractOutside={(e) => {
                    if ((e.target as HTMLElement).closest('.search-result-item')) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="relative">
                    <div className="sticky top-0 bg-background z-10 p-4 border-b">
                      <DialogTitle className="sr-only">Rechercher un produit</DialogTitle>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {isSearching ? (
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                          ) : (
                            <Search className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <Input
                          type="search"
                          placeholder="Rechercher par nom, référence ou description..."
                          className="pl-10 text-base py-6 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleSearch(e.target.value);
                          }}
                          autoFocus
                          enterKeyHint="search"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            aria-label="Effacer la recherche"
                          >
                            <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                          </button>
                        )}
                      </div>
                    </div>

                    <ScrollArea className="h-[60vh] max-h-[500px]">
                      {searchResults.length > 0 ? (
                        <div className="divide-y">
                          {searchResults.map((product) => (
                            <Link
                              key={product.id}
                              href={`/products/${product.id}`}
                              className="search-result-item flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                              onClick={() => {
                                setIsSearchDialogOpen(false);
                                setSearchQuery("");
                              }}
                            >
                              <div className="flex-shrink-0 w-16 h-16 rounded-md bg-muted overflow-hidden">
                                {product.imageUrl ? (
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-muted">
                                    <Package className="h-6 w-6 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">{product.name}</h3>
                                {product.description && (
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {product.description}
                                  </p>
                                )}
                                {product.sku && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Réf: {product.sku}
                                  </p>
                                )}
                              </div>
                              <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            </Link>
                          ))}
                        </div>
                      ) : searchQuery.trim().length >= 2 && !isSearching ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
                          <p className="text-lg text-muted-foreground">
                            Aucun produit ne correspond à votre recherche
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Essayez avec d'autres termes
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
                          <p className="text-lg text-muted-foreground">
                            Recherchez des produits par nom, référence ou description
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Tapez au moins 2 caractères
                          </p>
                        </div>
                      )}
                    </ScrollArea>

                    {searchQuery.trim().length > 0 && (
                      <div className="sticky bottom-0 bg-background border-t p-3 text-right text-sm text-muted-foreground">
                        {isSearching ? (
                          <span>Recherche en cours...</span>
                        ) : (
                          <span>{searchResults.length} résultat{searchResults.length !== 1 ? 's' : ''}</span>
                        )}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="default" 
                className="hidden sm:flex shadow-sm hover:shadow-md transition-shadow"
                asChild
              >
                <Link href="/contact">
                  <FileText className="h-4 w-4 mr-2" />
                  Demander un devis
                </Link>
              </Button>

              {/* Menu mobile */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Image 
                        src={logo} 
                        alt="Fullness safety"
                        width={120}
                        height={50}
                        className="object-contain"
                      />
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col gap-4">
                    <div className="space-y-4">
                      <div className="text-sm font-medium text-muted-foreground">Navigation</div>
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                            isActive(item.href)
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.label}
                        </Link>
                      ))}
                      <Button 
                        className="mt-4 w-full sm:hidden"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href="/contact">
                          <FileText className="h-4 w-4 mr-2" />
                          Demander un devis
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        {isMegaMenuOpen && (
          <div 
            ref={megaMenuRef}
            className={`absolute left-0 right-0 bg-background border-b shadow-lg animate-in slide-in-from-top-5 ${
              isSticky ? 'fixed top-[90px]' : ''
            }`}
          >
            <div className="container mx-auto px-4 py-6">
              <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
            </div>
          </div>
        )}
      </header>

      {/* Espace réservé quand le header est fixe */}
      {isSticky && <div className="h-[90px] w-full" />}
    </>
  );
}

export default Header;