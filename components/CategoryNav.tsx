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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
      
  //     // Show nav after scrolling past header (200px)
  //     if (currentScrollY > 200) {
  //       setIsVisible(true);
  //       // Only make sticky if scrolling up or past 400px
  //       setIsSticky(currentScrollY < lastScrollY.current || currentScrollY > 400);
  //     } else {
  //       setIsVisible(false);
  //       setIsSticky(false);
  //     }
      
  //     lastScrollY.current = currentScrollY;
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

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
    <></>
  );
}