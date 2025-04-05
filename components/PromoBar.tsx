"use client";

import { useState, useEffect } from "react";
import { X, Megaphone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function PromoBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Show after scrolling 200px
  //     const shouldShow = window.scrollY > 200;
  //     setIsVisible(shouldShow);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // if (!isVisible || isDismissed) return null;

  return (
    <div className="bg-primary text-primary-foreground relative overflow-hidden animate-in slide-in-from-top-5">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_linear_infinite]" />
      <div className="container mx-auto px-4 relative">
        <div className="py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Megaphone className="h-4 w-4 animate-bounce" />
            <span className="hidden sm:inline">Offre spéciale :</span>
            <span className="font-medium animate-blink">-15% sur tous les casques de protection jusqu'au 31 juin</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="link"
              size="sm"
              className="text-primary-foreground hidden sm:flex items-center hover:text-primary-foreground/90 animate-pulse"
              asChild
            >
              <Link href="/products?category=casques">
                En profiter
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-primary-foreground/10"
              onClick={() => setIsDismissed(true)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}