"use client";

import { useState } from "react";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileText, User, Mail, Phone, Package, MessageSquare, Send, Loader2, Clock, MapPin, ChevronRight } from "lucide-react";
import logo from '@/public/logo.png';
import Image from "next/image";

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    quantity: "1",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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
        quantity: "1",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 999) {
      setSelectedQuantity(value);
    }
  };

  return (
    <footer className="bg-muted mt-auto border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Restez informé</h3>
          <p className="text-muted-foreground mb-6">
            Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et offres exclusives
          </p>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src={logo} 
                alt="Fullness safety"
                width={150}
                height={80}
                className="object-contain"
              />
            </Link>
            <p className="text-muted-foreground">
              Votre partenaire de confiance pour tous vos équipements de protection individuelle.
            </p>
          </div>
          
          {/* Produits */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Produits</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  Tous nos produits
                </Link>
              </li>
              <li>
                <Link href="/products?category=1" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  Casques de Protection
                </Link>
              </li>
              <li>
                <Link href="/products?category=2" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  Vêtements de Travail
                </Link>
              </li>
              <li>
                <Link href="/products?category=7" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  Équipements Antichute
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Entreprise */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Entreprise</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-primary" />
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>55 KTM Rue koketi immeuble st Hubert,<br/>01 BP 2440 Assivito lomé, Togo</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span> 91 21 82 26</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span> contact@fullness-safety.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Lun-Ven: 8h-17h <br /> Sam : 8h-14h</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Fullness Safety. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}