"use client";

import { useState, useEffect, useRef } from "react";
import { Product, SubCategory } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Mail, 
  Phone, 
  Send, 
  Loader2, 
  ShieldCheck, 
  Package, 
  Star, 
  Shield, 
  Check, 
  Info, 
  Ruler, 
  Scale, 
  Sparkles, 
  Boxes, 
  ArrowRight,
  FileText,
  User,
  MessageSquare,
  Share2,
  ArrowUp,
  ChevronRight,
  ChevronLeft,
  Download,
  Calendar,
  AlignCenterVertical as Certificate,
  MessageCircle,
  Wind,
  Box,
  AlertTriangle,
  Truck,
  Repeat,
  Clock
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Map of specification keys to their icons and labels
const specificationIcons: Record<string, { icon: any; label: string }> = {
  norme: { icon: Certificate, label: "Norme" },
  materiau: { icon: Box, label: "Matériau" },
  poids: { icon: Scale, label: "Poids" },
  taille: { icon: Ruler, label: "Taille" },
  ventile: { icon: Wind, label: "Ventilation" }
};

interface ProductDetailsProps {
  product: Product;
  subCategory: SubCategory;
  similarProducts: Product[];
}

export default function ProductDetails({
  product,
  subCategory,
  similarProducts,
}: ProductDetailsProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    quantity: "1",
  });

  // Use product.images if available, otherwise create a single image from imageUrl
  const images = product.images?.length > 0 
    ? product.images 
    : product.imageUrl 
      ? [{ url: product.imageUrl, alt: product.name }]
      : [];

  const features = [
    {
      icon: Certificate,
      label: "Certifié CE",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: Shield,
      label: "Garantie 2 ans",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Truck,
      label: "Livraison 24/48h",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Repeat,
      label: "Retour gratuit",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    }
  ];

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié !",
        description: "Le lien a été copié dans le presse-papier.",
      });
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Bonjour, je suis intéressé par le produit "${product.name}" (Réf: ${product.id}). Pouvez-vous me donner plus d'informations ?`;
    const whatsappUrl = `https://wa.me/33123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get specifications with icons and formatted values
  const formattedSpecifications = Object.entries(product.specifications || {}).map(([key, value]) => {
    const spec = specificationIcons[key] || { 
      icon: Sparkles, 
      label: key.charAt(0).toUpperCase() + key.slice(1) 
    };
    
    // Format boolean values
    const formattedValue = typeof value === 'boolean' 
      ? (value ? 'Oui' : 'Non')
      : value?.toString() || '';

    return {
      key,
      value: formattedValue,
      icon: spec.icon,
      label: spec.label
    };
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Button
              variant="ghost"
              className="hover:bg-primary/5 -ml-2 group"
              asChild
            >
              <Link href="/products">
                <ChevronLeft className="w-4 h-4 mr-2" />
                <span>Retour aux produits</span>
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/5"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
              </Button>

              <Button
                variant="default"
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square relative overflow-hidden rounded-2xl bg-muted group">
              {images.length > 0 ? (
                <>
                  <img
                    src={images[activeImage].url}
                    alt={images[activeImage].alt}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  {images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setActiveImage((prev) => (prev - 1 + images.length) % images.length)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setActiveImage((prev) => (prev + 1) % images.length)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-12 h-12 text-muted-foreground/50" />
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-6 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden relative ${
                      activeImage === index 
                        ? 'ring-2 ring-primary ring-offset-2' 
                        : 'opacity-70 hover:opacity-100'
                    } transition-all duration-300`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:py-8">
            <div className="space-y-8">
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="text-sm">
                    {subCategory.name}
                  </Badge>
                  {product.documentation?.certifications?.length > 0 && (
                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">
                      <Certificate className="w-3 h-3 mr-1" />
                      Certifié
                    </Badge>
                  )}
                </div>

                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  {product.name}
                </h1>

                <p className="text-lg text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className={`${feature.bgColor} rounded-xl p-4 text-center group hover:scale-105 transition-all duration-300`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color} mx-auto mb-2`} />
                    <span className="text-sm font-medium">{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* Quick Specifications */}
              {formattedSpecifications.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {formattedSpecifications.slice(0, 3).map(({ key, value, icon: Icon, label }) => (
                    <div key={key} className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                      <p className="text-lg font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Quote Form */}
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

              {/* Specifications & Documentation */}
              <Tabs defaultValue="specifications" className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="specifications" className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Spécifications
                  </TabsTrigger>
                  <TabsTrigger value="documentation" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Documentation
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="specifications" className="mt-6">
                  {formattedSpecifications.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {formattedSpecifications.map(({ key, value, icon: Icon, label }, index) => (
                        <AccordionItem 
                          key={key} 
                          value={key}
                          className="animate-in fade-in-50"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <AccordionTrigger className="py-4 hover:no-underline">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Icon className="w-4 h-4 text-primary" />
                              </div>
                              <span className="font-medium capitalize">{label}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-11">
                            <p className="text-muted-foreground">{value}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-muted-foreground/50" />
                      <p>Aucune spécification disponible pour ce produit</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="documentation" className="mt-6 space-y-6">
                  {/* Documentation content */}
                  {product.documentation.technicalSheet && (
                    <Card className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Fiche technique</h3>
                          <Badge variant="secondary" className="font-mono">
                            {product.documentation.technicalSheet.format}
                          </Badge>
                        </div>
                        
                        <div className="grid gap-3">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Download className="w-4 h-4 mr-2" />
                            Taille : {product.documentation.technicalSheet.size}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-2" />
                            Dernière mise à jour : {product.documentation.technicalSheet.lastUpdate}
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full mt-4 group"
                          variant="outline"
                          asChild
                        >
                          <Link 
                            href={product.documentation.technicalSheet.url}
                            target="_blank"
                          >
                            <Download className="w-4 h-4 mr-2 transition-transform group-hover:-translate-y-1" />
                            Télécharger
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  )}

                  {/* Certifications */}
                  {product.documentation.certifications && (
                    <div className="space-y-4">
                      {product.documentation.certifications.map((cert, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{cert.name}</h4>
                                <p className="text-sm text-muted-foreground">N° {cert.number}</p>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  Valide jusqu'au {cert.validUntil}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="shrink-0"
                                asChild
                              >
                                <Link href={cert.url} target="_blank">
                                  <Download className="w-4 h-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {!product.documentation.technicalSheet && !product.documentation.certifications && (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-muted-foreground/50" />
                      <p>Aucune documentation disponible pour ce produit</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold mb-8">Produits similaires</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <Link
                  key={similarProduct.id}
                  href={`/products/${similarProduct.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:border-primary/20 transition-all duration-300 h-full">
                    <div className="aspect-square relative overflow-hidden bg-muted">
                      {similarProduct.imageUrl ? (
                        <img
                          src={similarProduct.imageUrl}
                          alt={similarProduct.name}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Package className="w-12 h-12 text-muted-foreground/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <Button variant="secondary" className="w-full bg-white/90 hover:bg-white">
                          Voir le produit
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg text-center group-hover:text-primary transition-colors line-clamp-2">
                        {similarProduct.name}
                      </h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Top Button */}
        {showBackToTop && (
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-8 right-8 h-10 w-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-background/80 backdrop-blur-sm"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}