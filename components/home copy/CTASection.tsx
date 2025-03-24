import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Besoin d'un Devis Personnalisé ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Notre équipe est à votre disposition pour étudier vos besoins et vous proposer une solution adaptée.
          </p>
          <Button
            size="lg"
            className="text-lg h-12 px-8 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            asChild
          >
            <Link href="/quote">
              Demander un devis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}