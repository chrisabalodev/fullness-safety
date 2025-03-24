"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, Award, Clock, ArrowRight, Building2, Trophy, Target, Sparkles, CheckCircle2, Globe2, Scale } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-transparent" />

        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-3xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div 
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary mb-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">Notre Histoire</span>
              </div>
              <h1 
                className={`text-4xl font-bold mb-6 transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                À propos de Fullness Safety
              </h1>
              <p 
                className={`text-xl text-muted-foreground transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Votre partenaire de confiance pour tous vos équipements de protection individuelle depuis plus de 15 ans.
              </p>
            </div>

            {/* Stats Section */}
            <div 
              className={`grid grid-cols-3 gap-6 mb-16 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {[
                {
                  icon: Users,
                  value: "2000+",
                  label: "Clients Satisfaits",
                  color: "text-blue-500",
                  bgColor: "bg-blue-500/10"
                },
                {
                  icon: Globe2,
                  value: "15+",
                  label: "Pays Desservis",
                  color: "text-emerald-500",
                  bgColor: "bg-emerald-500/10"
                },
                {
                  icon: Scale,
                  value: "500+",
                  label: "Produits Certifiés",
                  color: "text-amber-500",
                  bgColor: "bg-amber-500/10"
                }
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className={`${stat.bgColor} rounded-xl p-6 text-center transition-all duration-300 hover:scale-105`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-4`} />
                  <div className={`text-2xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="grid gap-8">
              {[
                {
                  icon: Target,
                  title: "Notre Mission",
                  content: "Assurer la sécurité et le confort des professionnels en leur fournissant des équipements de protection de haute qualité, conformes aux normes les plus strictes.",
                  color: "bg-blue-500/10",
                  textColor: "text-blue-500"
                },
                {
                  icon: Building2,
                  title: "Notre Entreprise",
                  content: "Fondée en 2009, Fullness Safety s'est imposée comme un leader dans la distribution d'équipements de protection individuelle en France. Notre expertise et notre engagement envers la qualité nous ont permis de gagner la confiance de plus de 2000 clients professionnels.",
                  color: "bg-emerald-500/10",
                  textColor: "text-emerald-500"
                },
                {
                  icon: Users,
                  title: "Notre Équipe",
                  content: "Une équipe d'experts passionnés, dédiée à vous conseiller et à vous accompagner dans le choix des équipements adaptés à vos besoins spécifiques. Nos conseillers techniques sont formés régulièrement pour vous offrir le meilleur service possible.",
                  color: "bg-purple-500/10",
                  textColor: "text-purple-500"
                },
                {
                  icon: Trophy,
                  title: "Nos Valeurs",
                  content: "L'excellence, l'innovation et la satisfaction client sont au cœur de notre démarche. Nous nous engageons à fournir des solutions de protection optimales tout en respectant les normes environnementales et sociales les plus exigeantes.",
                  color: "bg-amber-500/10",
                  textColor: "text-amber-500"
                },
                {
                  icon: Award,
                  title: "Nos Certifications",
                  content: "Certifiés ISO 9001:2015, nous garantissons des processus rigoureux et une qualité constante dans la sélection et la distribution de nos produits. Notre système de management de la qualité est audité régulièrement pour assurer une amélioration continue de nos services.",
                  color: "bg-red-500/10",
                  textColor: "text-red-500"
                },
                {
                  icon: Sparkles,
                  title: "Notre Engagement",
                  content: "Nous nous engageons à fournir un service personnalisé et des conseils experts pour chaque client. Notre objectif est de devenir votre partenaire privilégié en matière de sécurité au travail.",
                  color: "bg-indigo-500/10",
                  textColor: "text-indigo-500"
                }
              ].map((section, index) => (
                <div 
                  key={section.title}
                  className={`bg-card rounded-xl p-8 shadow-lg border hover:border-primary/20 transition-all duration-300 group ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-xl ${section.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <section.icon className={`w-8 h-8 ${section.textColor}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div 
              className={`mt-16 text-center transition-all duration-700 delay-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Button size="lg" className="h-12" asChild>
                <Link href="/contact">
                  Contactez-nous
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}