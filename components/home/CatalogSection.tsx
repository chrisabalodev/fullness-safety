import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

export default function CatalogSection() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">
              Découvrez Notre{" "}
              <span className="text-primary">Nouveau Catalogue</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Explorez notre gamme complète d'équipements de protection individuelle dans notre catalogue 2023. Plus de 500 produits certifiés pour votre sécurité.
            </p>
            <Button size="lg" className="h-12" asChild>
              <Link 
                href="https://s02.swdrive.fr/s/ZRxBcJ4X4neGwqP/download/Catalogue%20Fullness%202023.pdf" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-5 w-5" />
                Télécharger le catalogue
              </Link>
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative group hover-lift">
              <img
                src="https://s02.swdrive.fr/s/jPAYeToEcDmamad/preview?auto=format&fit=crop&q=80&w=1000"
                alt="Catalogue 2024"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-lg font-semibold">Catalogue 2023</p>
                <p className="text-sm text-white/80">Disponible en téléchargement</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}