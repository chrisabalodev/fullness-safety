"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, Loader2, Building2, ArrowUpRight } from "lucide-react";
import { Category, getCategories } from "@/lib/db";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    category: ""
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      category: ""
    });

    setLoading(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@fullness-safety.fr",
      link: "mailto:contact@fullness-safety.fr",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "01 23 45 67 89",
      link: "tel:0123456789",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "123 Rue de la Sécurité, 75001 Paris",
      link: "https://maps.google.com",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      icon: Clock,
      title: "Horaires",
      value: "Lun-Ven: 9h-18h",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-transparent" />

        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div 
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary mb-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">Contactez-nous</span>
              </div>
              <h1 
                className={`text-4xl font-bold mb-6 transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Nous Sommes à Votre Écoute
              </h1>
              <p 
                className={`text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div 
                className={`space-y-8 transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'
                }`}
              >
                <div className="grid gap-6">
                  {contactInfo.map((item, index) => (
                    <div
                      key={item.title}
                      className={`group relative overflow-hidden rounded-xl ${item.bgColor} p-6 transition-all duration-300 hover:scale-[1.02] ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <item.icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{item.title}</h3>
                          {item.link ? (
                            <Link
                              href={item.link}
                              className={`${item.color} hover:underline flex items-center gap-1 group-hover:gap-2 transition-all duration-300`}
                              target={item.link.startsWith("http") ? "_blank" : undefined}
                              rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                            >
                              {item.value}
                              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Link>
                          ) : (
                            <p className={item.color}>{item.value}</p>
                          )}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  ))}
                </div>

                {/* Map Preview */}
                <div 
                  className={`aspect-video rounded-xl overflow-hidden bg-muted relative group transition-all duration-700 delay-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000"
                    alt="Location map"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-semibold mb-2">Nos Bureaux</h3>
                    <p className="text-sm text-white/80">
                      123 Rue de la Sécurité, 75001 Paris
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div 
                className={`bg-card rounded-xl p-8 shadow-lg border transition-all duration-700 delay-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[20px]'
                }`}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Nom complet
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Téléphone
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-2">
                        Catégorie de produits
                      </label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        required
                        rows={5}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}