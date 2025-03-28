"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, CheckCircle2, Star, Package, Users, Award, Clock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

const stats = [
  { 
    icon: Users,
    label: "Clients Satisfaits", 
    value: "2000+",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10" 
  },
  { 
    icon: Award,
    label: "Années d'Expérience", 
    value: "15+",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  { 
    icon: Package,
    label: "Produits Certifiés", 
    value: "500+",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  }
];

const features = [
  {
    icon: Clock,
    text: "Livraison express 24/48h",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: Users,
    text: "Service client dédié",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Star,
    text: "Garantie satisfaction",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  {
    icon: ShieldCheck,
    text: "Produits certifiés CE",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  }
];

const images = [
  {
    url: "https://s02.swdrive.fr/s/xLit58tEwasC873/preview?auto=format&fit=crop&q=80&w=80",
    alt: "Équipement de sécurité"
  },
  {
    url: "https://s02.swdrive.fr/s/djcHKTPbsn2yqg9/preview",
    alt: "Protection individuelle"
  },
  {
    url: "https://s02.swdrive.fr/s/MD6aQYGi7ALMeKr?auto=format&fit=crop&q=80&w=800",
    alt: "Équipement professionnel"
  },
  {
    url: "https://s02.swdrive.fr/s/RSkBa5DTYRrZKNR/preview?auto=format&fit=crop&q=80&w=800",
    alt: "Sécurité au travail"
  }
];

export default function HeroSection() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-[80vh] flex items-center pt-16 md:pt-0">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/95 to-primary/10" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="relative space-y-6 md:space-y-8 order-2 lg:order-1">
            {/* Rating Badge */}
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={variants}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary"
            >
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Note moyenne 4.8/5 sur 1500+ avis</span>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={variants}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight"
            >
              La Protection{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Professionnelle</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 -rotate-1 transform origin-bottom" />
              </span>{" "}
              <span className="text-primary">au Service de Votre Sécurité</span>
            </motion.h1>
            
            {/* Description */}
            <motion.p
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={variants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl"
            >
              Découvrez notre gamme complète d'équipements de protection individuelle de haute qualité. 
              La sécurité de vos équipes est notre priorité absolue.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={variants}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <Button
                size={isMobile ? "default" : "lg"}
                className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all group"
                asChild
              >
                <Link href="/products">
                  Explorer nos produits
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size={isMobile ? "default" : "lg"}
                variant="outline"
                className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 hover:bg-primary/5 group"
                asChild
              >
                <Link href="/contact">
                  Nous contacter
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={variants}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg ${feature.bgColor} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <feature.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${feature.color}`} />
                  <span className="text-xs sm:text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={variants}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className={`p-2 sm:p-4 rounded-lg ${stat.bgColor} transition-all duration-300 hover:scale-[1.02] text-center`}
                >
                  <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color} mx-auto mb-1 sm:mb-2`} />
                  <div className={`text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Image Gallery */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-8 lg:mb-0 order-1 lg:order-2">
            {isMobile || isTablet ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src={images[activeImageIndex].url}
                    alt={images[activeImageIndex].alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="absolute top-1/2 -translate-y-1/2 right-0 grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-xl">
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.4, scale: 0.95 }}
                    animate={{ 
                      opacity: index === activeImageIndex ? 1 : 0.4,
                      scale: index === activeImageIndex ? 1 : 0.95
                    }}
                    transition={{ duration: 0.5 }}
                    className={`${
                      index % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[4/5]'
                    } rounded-xl overflow-hidden shadow-xl relative group`}
                    style={{ 
                      transformOrigin: index % 2 === 0 ? 'bottom right' : 'top left'
                    }}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Mobile Navigation Dots */}
            {(isMobile || isTablet) && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-2 rounded-full transition-all ${activeImageIndex === index ? 'bg-primary w-6' : 'bg-muted-foreground/30 w-2'}`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}