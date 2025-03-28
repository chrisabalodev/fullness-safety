"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, CheckCircle2, Star, Package, Users, Award, Clock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

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
    url: "https://s02.swdrive.fr/s/MD6aQYGi7ALMeKr/preview?auto=format&fit=crop&q=80&w=800",
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

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/95 to-primary/10" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 blur-3xl rounded-full animate-pulse" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="relative space-y-8">
            {/* Rating Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Note moyenne 4.8/5 sur 1500+ avis</span>
            </div>
            
            {/* Main Title */}
            <h1 
              className={`text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              La Protection{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Professionnelle</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 -rotate-1 transform origin-bottom transition-transform duration-300 hover:scale-110" />
              </span>{" "}
              <span className="text-primary">au Service de Votre Sécurité</span>
            </h1>
            
            {/* Description */}
            <p 
              className={`text-xl text-muted-foreground leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Découvrez notre gamme complète d'équipements de protection individuelle de haute qualité. 
              La sécurité de vos équipes est notre priorité absolue.
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Button
                size="lg"
                className="text-lg h-14 px-8 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all group hover-lift"
                asChild
              >
                <Link href="/products">
                  Explorer nos produits
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8 hover:bg-primary/5 group"
                asChild
              >
                <Link href="/contact">
                  Nous contacter
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Features Grid */}
            <div 
              className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {features.map((feature, index) => (
                <div 
                  key={feature.text}
                  className={`flex items-center gap-3 p-3 rounded-xl ${feature.bgColor} transition-all duration-300 hover:scale-105`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div 
              className={`grid grid-cols-3 gap-6 pt-8 border-t transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className={`p-4 rounded-xl ${stat.bgColor} transition-all duration-300 hover:scale-105 text-center`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image Gallery */}
          <div className="relative lg:h-[600px]">
            <div className="absolute top-1/2 -translate-y-1/2 right-0 grid grid-cols-2 gap-4 w-full max-w-xl">
              {images.map((image, index) => (
                <div 
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[4/5]'
                  } ${
                    index === activeImageIndex ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                  } rounded-2xl overflow-hidden shadow-2xl relative group hover-lift transition-all duration-500`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    transformOrigin: index % 2 === 0 ? 'bottom right' : 'top left'
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}