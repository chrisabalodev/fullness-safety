"use client";

import { Star, Quote, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    company: "BTP Construction",
    logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&q=80&w=160",
    author: "Jean Dupont",
    role: "Directeur Sécurité",
    content: "Fullness Safety nous accompagne depuis plus de 5 ans dans l'équipement de nos équipes. La qualité des produits et le service client sont irréprochables.",
    rating: 5
  },
  {
    company: "Industries Métalliques SA",
    logo: "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?auto=format&fit=crop&q=80&w=160",
    author: "Marie Lambert",
    role: "Responsable HSE",
    content: "Un partenaire fiable qui comprend nos besoins spécifiques en matière de protection individuelle.",
    rating: 5
  },
  {
    company: "Électricité Plus",
    logo: "https://images.unsplash.com/photo-1581092446327-9b52bd1570c2?auto=format&fit=crop&q=80&w=160",
    author: "Pierre Martin",
    role: "Chef de Projet",
    content: "Les équipements fournis répondent parfaitement aux normes de sécurité les plus strictes. Un excellent suivi commercial.",
    rating: 5
  },
  {
    company: "Maintenance Pro",
    logo: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=160",
    author: "Sophie Bernard",
    role: "Responsable Achats",
    content: "La rapidité de livraison et la qualité du service après-vente font de Fullness Safety un partenaire de confiance.",
    rating: 5
  },
  {
    company: "Bâtiment Express",
    logo: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=160",
    author: "Lucas Dubois",
    role: "Gérant",
    content: "Des produits de qualité et un excellent rapport qualité-prix. Je recommande vivement.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % (testimonials.length - 2)
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1
    );
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("testimonials-section");
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
    let interval: NodeJS.Timeout;

    if (isVisible && isAutoPlaying) {
      interval = setInterval(nextSlide, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isVisible, isAutoPlaying, nextSlide]);

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden" id="testimonials-section">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-transparent" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary mb-8">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">Ils nous font confiance</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Témoignages de nos clients</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez ce que nos clients disent de notre engagement envers la sécurité et la qualité
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-background/80 hover:shadow-lg transition-all"
              onClick={() => {
                prevSlide();
                setIsAutoPlaying(false);
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-background/80 hover:shadow-lg transition-all"
              onClick={() => {
                nextSlide();
                setIsAutoPlaying(false);
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Testimonials Slider */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-1/3 flex-shrink-0 px-4"
                >
                  <div className="bg-card rounded-xl p-8 shadow-lg border hover:border-primary/20 hover:shadow-xl transition-all duration-300 group h-full">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-muted mb-6 group-hover:scale-110 transition-transform duration-500">
                        <img
                          src={testimonial.logo}
                          alt={testimonial.company}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <Quote className="w-8 h-8 text-primary/20 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />

                      <p className="text-base text-muted-foreground mb-6 italic flex-grow">
                        "{testimonial.content}"
                      </p>

                      <div className="flex justify-center gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-semibold">{testimonial.author}</h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                        <p className="text-sm font-medium text-primary">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: testimonials.length - 2 }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-primary w-8" 
                    : "bg-primary/20 hover:bg-primary/40"
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}