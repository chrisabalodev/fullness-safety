"use client";

import { useState, useEffect } from "react";
import { Building2 } from "lucide-react";

const brands = [
  {
    name: "3M",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200",
    description: "Protection respiratoire et auditive"
  },
  {
    name: "Honeywell",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200",
    description: "Équipements de protection individuelle"
  },
  {
    name: "Uvex",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200",
    description: "Protection des yeux et du visage"
  },
  {
    name: "Petzl",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200",
    description: "Équipements antichute"
  },
  {
    name: "Delta Plus",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200",
    description: "Vêtements de travail"
  },
  {
    name: "MSA Safety",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200",
    description: "Casques de protection"
  }
];

// Duplicate brands for infinite scroll effect
const extendedBrands = [...brands, ...brands];

export default function BrandsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const element = document.getElementById("brands-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;
    const speed = 0.5; // Pixels per millisecond

    const animate = (currentTime: number) => {
      if (lastTime === 0) {
        lastTime = currentTime;
      }

      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (isVisible) {
        setScrollPosition((prev) => {
          const newPosition = prev + speed * delta;
          // Reset position when all brands have scrolled
          return newPosition >= (100 / brands.length) * brands.length
            ? 0
            : newPosition;
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible]);

  return (
    <section className="py-24 bg-muted/50 relative" id="brands-section">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-transparent" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary mb-8">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">Nos Marques Partenaires</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Les Plus Grandes Marques</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nous collaborons avec les leaders mondiaux des équipements de protection pour vous garantir qualité et sécurité
          </p>
        </div>

        <div className="relative max-w-full overflow-hidden">
          {/* Gradient masks for smooth scroll effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/50 to-transparent z-10" />

          <div 
            className="flex transition-transform duration-1000 ease-linear"
            style={{ transform: `translateX(-${scrollPosition}%)` }}
          >
            {extendedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="w-1/6 flex-shrink-0 px-4"
              >
                <div className="bg-card rounded-xl p-6 border hover:border-primary/20 hover:shadow-lg transition-all duration-300 text-center h-full flex flex-col items-center justify-center group">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted mb-4 group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{brand.name}</h3>
                  <p className="text-sm text-muted-foreground">{brand.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}