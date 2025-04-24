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
      {/* Hero Section */}
      <div className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">Expertise locale depuis 2009</span>
            </div>
            
            <h1 
              className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Protection individuelle <span className="text-primary">adaptée</span> au marché togolais
            </h1>
            
            <p 
              className={`text-xl text-muted-foreground mb-8 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Fournisseur leader d'équipements de sécurité pour les professionnels au Togo.
            </p>
            
            <div 
              className={`transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Button size="lg" className="h-12 px-8" asChild>
                <Link href="/contact">
                  Contactez notre équipe locale
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 bg-background rounded-xl shadow-md p-6 border transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {[
            { value: "15", label: "Ans d'expérience", icon: Clock },
            { value: "200+", label: "Clients locaux", icon: Building2 },
            { value: "500+", label: "Produits certifiés", icon: ShieldCheck },
            { value: "100%", label: "Disponibilité locale", icon: CheckCircle2 }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center p-3">
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <stat.icon className="w-4 h-4" />
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local Expertise Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-lg aspect-video bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
              <Target className="w-20 h-20 text-white" />
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">
              Expertise <span className="text-primary">togolaise</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nous comprenons les défis spécifiques des professionnels au Togo et proposons des solutions adaptées.
            </p>
            
            <ul className="space-y-4">
              {[
                "Normes adaptées aux conditions locales",
                "Stock disponible à Lomé",
                "Service après-vente local",
                "Conseils techniques personnalisés"
              ].map((item, index) => (
                <li 
                  key={item}
                  className={`flex items-center gap-3 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* History Timeline */}
      <div className="bg-primary/5 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Notre <span className="text-primary">histoire</span>
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 top-0 h-full w-0.5 bg-primary/20" />

            {[
              {
                icon: Building2,
                year: "2009",
                title: "Fondation à Lomé",
                content: "Création de Fullness Safety pour répondre aux besoins croissants en EPI au Togo.",
                color: "bg-blue-500"
              },
              {
                icon: Scale,
                year: "2012",
                title: "Agrandissement",
                content: "Extension de nos entrepôts et diversification de notre catalogue produits.",
                color: "bg-emerald-500"
              },
              {
                icon: Award,
                year: "2016",
                title: "Certifications",
                content: "Obtention des certifications qualité pour l'ensemble de notre gamme.",
                color: "bg-purple-500"
              },
              {
                icon: Sparkles,
                year: "2020",
                title: "Innovation",
                content: "Introduction de gammes techniques adaptées aux secteurs miniers et industriels locaux.",
                color: "bg-amber-500"
              }
            ].map((item, index) => (
              <div 
                key={item.year}
                className={`relative pl-24 pb-12 group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                <div className={`absolute left-0 w-16 h-16 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-lg z-10`}>
                  {item.year}
                </div>
                <div className={`absolute left-8 top-8 w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-white -ml-4 z-20`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="bg-card p-8 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Nos <span className="text-primary">engagements</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: "Qualité garantie",
              description: "Produits conformes aux normes internationales et locales",
              color: "text-blue-500"
            },
            {
              icon: Users,
              title: "Service client",
              description: "Une équipe locale à votre écoute pour des conseils personnalisés",
              color: "text-emerald-500"
            },
            {
              icon: Trophy,
              title: "Excellence",
              description: "Sélection rigoureuse de nos fournisseurs et produits",
              color: "text-amber-500"
            }
          ].map((value, index) => (
            <div 
              key={value.title}
              className={`bg-card p-8 rounded-xl border transition-all duration-300 hover:shadow-md ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${1600 + index * 100}ms` }}
            >
              <div className={`${value.color} mb-6`}>
                <value.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Besoin de conseils pour vos équipements de protection ?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8">
              Notre équipe à Lomé est à votre disposition pour évaluer vos besoins.
            </p>
            
            <Button size="lg" className="h-12 px-8" asChild>
              <Link href="/contact">
                Contactez nos experts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 