"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HardHat, ShieldAlert, HandMetal, Footprints, Eye, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Category, SubCategory, getCategories, getSubCategories } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const categoryIcons: Record<string, any> = {
  casques: HardHat,
  vetements: ShieldAlert,
  antichute: HandMetal,
  chaussures: Footprints,
  yeux: Eye,
  respiratoire: ShieldCheck,
};

interface MegaMenuProps {
  onClose?: () => void;
}

export function MegaMenu({ onClose }: MegaMenuProps) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Record<string, SubCategory[]>>({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedView, setExpandedView] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        const subCategoriesMap: Record<string, SubCategory[]> = {};
        await Promise.all(
          categoriesData.map(async (category) => {
            const subs = await getSubCategories(category.id);
            subCategoriesMap[category.id] = subs;
          })
        );
        setSubCategories(subCategoriesMap);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fermer le menu quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="block space-y-2 rounded-lg p-3 animate-pulse bg-muted/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-muted" />
              <div className="h-4 w-24 bg-muted rounded" />
            </div>
            <div className="space-y-1.5">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-3 w-full bg-muted rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div 
      ref={menuRef}
      className="w-full max-w-6xl mx-auto p-4 bg-background border rounded-lg shadow-xl"
    >
      {/* Vue compacte */}
      {!expandedView && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category.slug] || ShieldCheck;
            const categorySubCategories = subCategories[category.id] || [];
            const isActive = activeCategory === category.id;

            return (
              <div 
                key={category.id}
                className={cn(
                  "relative rounded-lg p-3 transition-all",
                  isActive ? "bg-accent" : "hover:bg-accent/50"
                )}
                onMouseEnter={() => setActiveCategory(category.id)}
              >
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={`/products?category=${category.id}`}
                    className="flex items-center gap-2 flex-1"
                    onClick={onClose}
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </Link>
                  {categorySubCategories.length > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.preventDefault();
                        setExpandedView(true);
                        setActiveCategory(category.id);
                      }}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                {/* Sous-catégories en aperçu */}
                {categorySubCategories.length > 0 && (
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pt-2"
                      >
                        <div className="flex flex-wrap gap-1">
                          {categorySubCategories.slice(0, 4).map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/products?category=${category.id}&subcategory=${sub.id}`}
                              className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-primary/10 hover:text-primary transition-colors line-clamp-1"
                              onClick={onClose}
                            >
                              {sub.name}
                            </Link>
                          ))}
                          {categorySubCategories.length > 4 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs h-auto px-2 py-1"
                              onClick={(e) => {
                                e.preventDefault();
                                setExpandedView(true);
                              }}
                            >
                              +{categorySubCategories.length - 4}
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Vue étendue */}
      <AnimatePresence>
        {expandedView && activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  {React.createElement(categoryIcons[categories.find(c => c.id === activeCategory)?.slug] || ShieldCheck, {
                    className: "h-4 w-4 text-primary"
                  })}
                </div>
                {categories.find(c => c.id === activeCategory)?.name}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedView(false)}
              >
                <ChevronUp className="mr-1 h-4 w-4" />
                Retour
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {subCategories[activeCategory]?.map((subCategory) => (
                <Link
                  key={subCategory.id}
                  href={`/products?category=${activeCategory}&subcategory=${subCategory.id}`}
                  className={cn(
                    "block p-3 rounded-lg border hover:border-primary hover:bg-accent/50 transition-colors",
                    new URLSearchParams(window.location.search).get('subcategory') === subCategory.id && "border-primary bg-accent"
                  )}
                  onClick={onClose}
                >
                  <div className="font-medium text-sm">{subCategory.name}</div>
                  {subCategory.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {subCategory.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MegaMenu;