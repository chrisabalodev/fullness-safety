"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShieldCheck, 
  Search, 
  X, 
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

export function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchVisible(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchVisible]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchVisible(false);
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
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors shrink-0"
          >
            <ShieldCheck className="h-6 w-6" />
            {/* <span>Fullness Safety</span> */}
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6"> 
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                {item.hasMegaMenu ? (
                  <button
                    onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/5"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] p-0">
                <DialogTitle className="sr-only">Rechercher un produit</DialogTitle>
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    {isSearching ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                      <Search className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Input 
                      ref={inputRef}
                      type="search" 
                      placeholder="Rechercher un produit..." 
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        handleSearch(e.target.value);
                      }}
                    />
                  </div>

                  {searchResults.length > 0 && (
                    <div className="border-t pt-4 space-y-2">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                          onClick={() => {
                            setIsSearchDialogOpen(false);
                            setSearchQuery("");
                          }}
                        >
                          <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-5 h-5 text-muted-foreground/50" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{product.name}</p>
                            {product.description && (
                              <p className="text-sm text-muted-foreground truncate">
                                {product.description}
                              </p>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {searchQuery.trim().length >= 2 && searchResults.length === 0 && !isSearching && (
                    <div className="text-center py-8 text-muted-foreground">
                      Aucun résultat trouvé
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="default" 
              className="ml-4 shadow-sm hover:shadow-md transition-shadow bg-primary hover:bg-primary/90"
              asChild
            >
              <Link href="/contact">
                <FileText className="h-4 w-4 mr-2" />
                Demander un devis
              </Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-4 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/5"
              onClick={() => setIsSearchDialogOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/5">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6" />
                    <span>Menu</span>
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
                      className="mt-4 w-full"
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

        {/* Mega Menu */}
        {isMegaMenuOpen && (
          <div 
            ref={megaMenuRef}
            className="absolute left-0 right-0 top-16 bg-background border-b shadow-lg animate-in slide-in-from-top-5"
          >
            <div className="container mx-auto px-4 py-6">
              <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;