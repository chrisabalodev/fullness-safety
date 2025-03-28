"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HardHat, ShieldAlert, HandMetal, Footprints, Eye, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Category, SubCategory, getCategories, getSubCategories } from "@/lib/db";

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

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="block space-y-1 rounded-lg p-3 animate-pulse">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-muted" />
              <div className="h-4 w-24 bg-muted rounded" />
            </div>
            <div className="space-y-1">
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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {categories.map((category) => {
        const Icon = categoryIcons[category.slug] || ShieldCheck;
        const categorySubCategories = subCategories[category.id] || [];

        return (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`} // Utilisation de l'ID plutôt que du slug
            className={cn(
              "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              pathname.startsWith('/products') && new URLSearchParams(window.location.search).get('category') === category.id && "bg-accent"
            )}
            onClick={onClose}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </div>
            <div className="space-y-1">
              {categorySubCategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/products?category=${category.id}&subcategory=${sub.id}`}
                  className="block text-xs text-muted-foreground hover:text-primary transition-colors line-clamp-1"
                  onClick={onClose}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default MegaMenu;