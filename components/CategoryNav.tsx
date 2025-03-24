"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Category, SubCategory, getCategories, getSubCategories } from '@/lib/db';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export default function CategoryNav() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Record<string, SubCategory[]>>({});
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>();
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);

      // Fetch subcategories for each category
      const subCategoriesMap: Record<string, SubCategory[]> = {};
      await Promise.all(
        categoriesData.map(async (category) => {
          const subs = await getSubCategories(category.id);
          subCategoriesMap[category.id] = subs;
        })
      );
      setSubCategories(subCategoriesMap);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav after scrolling past header (200px)
      if (currentScrollY > 200) {
        setIsVisible(true);
        // Only make sticky if scrolling up or past 400px
        setIsSticky(currentScrollY < lastScrollY.current || currentScrollY > 400);
      } else {
        setIsVisible(false);
        setIsSticky(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (categoryId: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setHoveredCategory(categoryId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 150);
  };

  // Check if a category or subcategory is active
  const isActive = (category: Category, subCategory?: SubCategory) => {
    const categoryParam = searchParams.get('category');
    const subCategoryParam = searchParams.get('subcategory');

    if (subCategory) {
      return categoryParam === category.slug && subCategoryParam === subCategory.slug;
    }
    return categoryParam === category.slug;
  };

  if (categories.length === 0) return null;

  return (
    <nav 
      className={cn(
        "bg-background/80 backdrop-blur-sm border-b z-40 transition-all duration-300 hidden lg:block",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        isSticky ? "fixed top-0 left-0 right-0 animate-in slide-in-from-top-2 shadow-md" : "shadow-sm"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-12">
          <ul className="flex items-center gap-1">
            {categories.map((category) => (
              <li 
                key={category.id} 
                className="relative"
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={`/products?category=${category.slug}`}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-colors relative group",
                    isActive(category) 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {category.name}
                  {subCategories[category.id]?.length > 0 && (
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      hoveredCategory === category.id && "rotate-180",
                      isActive(category) ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"
                    )} />
                  )}
                  {/* Active indicator */}
                  {isActive(category) && (
                    <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary" />
                  )}
                </Link>

                {/* Dropdown */}
                {subCategories[category.id]?.length > 0 && (
                  <div 
                    className={cn(
                      "absolute top-full left-0 pt-1 w-64 transition-all duration-200",
                      hoveredCategory === category.id 
                        ? "opacity-100 visible translate-y-0" 
                        : "opacity-0 invisible translate-y-2"
                    )}
                  >
                    <div className="bg-card rounded-lg shadow-lg border p-1 backdrop-blur-sm animate-in fade-in-0 zoom-in-95">
                      {subCategories[category.id].map((subCategory) => (
                        <Link
                          key={subCategory.id}
                          href={`/products?category=${category.slug}&subcategory=${subCategory.slug}`}
                          className={cn(
                            "block px-4 py-2 text-sm rounded-md transition-colors",
                            isActive(category, subCategory)
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          {subCategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}