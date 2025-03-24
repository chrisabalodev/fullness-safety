import { useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import NewsletterForm from "./NewsletterForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileText, User, Mail, Phone, Package, MessageSquare, Send, Loader2, Clock } from "lucide-react";

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
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Quote Form Section */}
        {/* <div className="max-w-2xl mx-auto mb-16">
          <Card className="overflow-hidden border-primary/10">
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Demander un devis</h3>
                  <p className="text-sm text-muted-foreground">
                    Recevez une offre personnalisée sous 24h
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>Nom complet *</span>
                      </div>
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
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>Email *</span>
                      </div>
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
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>Téléphone</span>
                      </div>
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
                    <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span>Quantité souhaitée *</span>
                      </div>
                    </label>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(selectedQuantity - 1)}
                        disabled={selectedQuantity <= 1}
                      >
                        -
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={selectedQuantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        required
                        className="w-20 text-center"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(selectedQuantity + 1)}
                        disabled={selectedQuantity >= 999}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <span>Message</span>
                      </div>
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      placeholder="Précisez vos besoins spécifiques, personnalisation souhaitée, etc."
                      className="resize-none"
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
                      Envoyer la demande
                    </>
                  )}
                </Button>
              </form>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Réponse garantie sous 24h ouvrées</span>
              </div>
            </div>
          </Card>
        </div> */}

        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Restez informé</h3>
          <p className="text-muted-foreground mb-6">
            Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et offres exclusives
          </p>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <ShieldCheck className="h-6 w-6" />
              <span>Fullness Safety</span>
            </Link>
            <p className="text-muted-foreground">
              Votre partenaire de confiance pour tous vos équipements de protection individuelle.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Produits</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tous nos produits
                </Link>
              </li>
              <li>
                <Link href="/products?category=casques" className="text-muted-foreground hover:text-foreground transition-colors">
                  Casques de Protection
                </Link>
              </li>
              <li>
                <Link href="/products?category=vetements" className="text-muted-foreground hover:text-foreground transition-colors">
                  Vêtements de Travail
                </Link>
              </li>
              <li>
                <Link href="/products?category=antichute" className="text-muted-foreground hover:text-foreground transition-colors">
                  Équipements Antichute
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>123 Rue de la Sécurité</li>
              <li>75001 Paris, France</li>
              <li>Tél: 01 23 45 67 89</li>
              <li>Email: contact@fullness-safety.fr</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Fullness Safety. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}