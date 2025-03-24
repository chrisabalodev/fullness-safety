import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, HardHat, ShieldAlert, Footprints, Eye, HandMetal } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Casques",
    slug: "casques",
    description: "Protection de la tête certifiée",
    icon: HardHat,
    bgImage: "https://images.unsplash.com/photo-1578874691223-64558a3ca096?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Vêtements",
    slug: "vetements",
    description: "Vêtements professionnels",
    icon: ShieldAlert,
    bgImage: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Antichute",
    slug: "antichute",
    description: "Protection contre les chutes",
    icon: HandMetal,
    bgImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Chaussures",
    slug: "chaussures",
    description: "Protection des pieds",
    icon: Footprints,
    bgImage: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Protection Yeux",
    slug: "yeux",
    description: "Lunettes de sécurité",
    icon: Eye,
    bgImage: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Respiratoire",
    slug: "respiratoire",
    description: "Masques et filtres",
    icon: ShieldCheck,
    bgImage: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary mb-8">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-sm font-medium">Nos Produits</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Catégories de Produits</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre gamme complète d'équipements de protection individuelle
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
            >
              <div className="absolute inset-0">
                <img
                  src={category.bgImage}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              </div>
              <div className="relative h-full p-6 flex flex-col">
                <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-auto group-hover:scale-110 transition-transform duration-300">
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {category.description}
                  </p>
                  <div className="mt-4 inline-flex items-center text-sm text-white gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Découvrir
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="h-12 px-8"
            variant="outline"
            asChild
          >
            <Link href="/products">
              Voir tous nos produits
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}