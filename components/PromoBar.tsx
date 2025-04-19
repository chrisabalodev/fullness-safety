"use client";

import { useState, useEffect } from "react";
import { X, BookOpen, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function PromoBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    exit: { 
      opacity: 0, 
      y: -50,
      transition: { duration: 0.3 }
    }
  };

  const shimmerVariants = {
    initial: { backgroundPosition: "0% 0%" },
    animate: { 
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white shadow-lg"
        >
          {/* Shimmer effect */}
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.03)_100%)] bg-[length:300%_300%] pointer-events-none"
          />
          
          {/* Glow effect on hover */}
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white pointer-events-none"
            />
          )}

          <div className="container mx-auto px-4 relative overflow-hidden">
            <div className="py-3 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
              {/* Left content */}
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <BookOpen className="h-5 w-5 text-blue-300" />
                </motion.div>
                
                <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
                  <motion.span
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="font-medium text-blue-100"
                  >
                    NOUVEAUTÉ 2025
                  </motion.span>
                  <span className="font-semibold text-white">
                    Découvrez le catalogue Fullness Safety - Innovations en protection professionnelle
                  </span>
                </div>
              </div>
              
              {/* Right content */}
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-white text-blue-800 hover:bg-white/90 hover:text-blue-900 shadow-md hover:shadow-lg transition-all rounded-full px-4"
                  asChild
                >
                  <Link href="/catalogue-2025" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>Télécharger</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                  onClick={() => setIsVisible(false)}
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Animated border bottom */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="h-[2px] w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] bg-[length:200%_100%]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}