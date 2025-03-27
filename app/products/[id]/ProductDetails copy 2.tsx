"use client";

import { useState, useEffect, useCallback } from "react";
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
  Clock,
  Heart,
  // Nouveaux icônes pour les spécifications dynamiques
  Hash,
  Tag,
  Layers,
  Cpu,
  Database,
  HardDrive,
  Memory,
  Monitor,
  Printer,
  Server,
  Smartphone,
  Speaker,
  Wifi,
  Battery,
  Bluetooth,
  Cable,
  Disc,
  Power,
  Radio,
  Settings,
  Volume2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";



// Fonction pour formater les labels
// const formatLabel = (key: string): string => {
//   // Remplace les underscores et camelCase par des espaces
//   const withSpaces = key
//     .replace(/([A-Z])/g, ' $1')
//     .replace(/_/g, ' ')
//     .toLowerCase();

//   // Capitalise la première lettre
//   return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
// };

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
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    quantity: "1",
  });

  // Gestion des images avec fallback
  const images = product.images?.length > 0 
    ? product.images 
    : product.imageUrl 
      ? [{ url: product.imageUrl, alt: product.name }]
      : [{ url: '/placeholder-product.png', alt: 'Image non disponible' }];

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
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Demande envoyée !",
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

  const handleQuantityChange = useCallback((value: number) => {
    if (value >= 1 && value <= 999) {
      setSelectedQuantity(value);
    }
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Lien copié !",
          description: "Le lien a été copié dans le presse-papier.",
        });
      }
    } catch (error) {
      console.error('Sharing failed:', error);
    }
  };

  const toggleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
    toast({
      title: !isFavorite ? "Ajouté aux favoris" : "Retiré des favoris",
      variant: !isFavorite ? "default" : "destructive",
    });
  }, [isFavorite, toast]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatSpecificationValue = (value: any): string => {
    if (value === null || value === undefined) return 'Non spécifié';
    if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
    if (Array.isArray(value)) return value.join(', ');
    return String(value);
  };

  // const getSpecifications = () => {
  //   if (!product.specifications) return [];

  //   return Object.entries(product.specifications).map(([key, value]) => {
  //     const Icon = getSpecIcon(key);
  //     return {
  //       key,
  //       value: formatSpecificationValue(value),
  //       icon: Icon,
  //       label: formatLabel(key)
  //     };
  //   });
  // };

  // Mapping générique des icônes basé sur des mots-clés
const getSpecIcon = (key: string) => {
  const iconMap: Record<string, any> = {
    // Mots-clés communs
    norme: Certificate,
    standard: Certificate,
    matière: Box,
    material: Box,
    poids: Scale,
    weight: Scale,
    taille: Ruler,
    size: Ruler,
    dimension: Ruler,
    couleur: Tag,
    color: Tag,
    garantie: Shield,
    warranty: Shield,
    certification: Certificate,
    composition: Boxes,
    ventile: Wind,
    ventilation: Wind,
    voltage: Power,
    power: Power,
    énergie: Power,
    energy: Power,
    capacité: Database,
    capacity: Database,
    mémoire: Memory,
    memory: Memory,
    processeur: Cpu,
    cpu: Cpu,
    écran: Monitor,
    screen: Monitor,
    réseau: Wifi,
    network: Wifi,
    connectique: Cable,
    connection: Cable,
    batterie: Battery,
    battery: Battery,
    bluetooth: Bluetooth,
    son: Volume2,
    sound: Volume2,
    // Ajoutez d'autres mots-clés au besoin
  };

  // Trouve une correspondance insensible à la casse
  const lowerKey = key.toLowerCase();
  for (const [keyword, icon] of Object.entries(iconMap)) {
    if (lowerKey.includes(keyword)) {
      return icon;
    }
  }

  // Fallback pour les spécifications non reconnues
  return Sparkles;
};

const formatLabel = (key: string): string => {
  // D'abord remplacer les underscores par des espaces
  let formatted = key.replace(/_/g, ' ');

  // Ensuite gérer le camelCase en insérant des espaces avant les majuscules
  formatted = formatted.replace(/([A-Z])/g, ' $1');

  // Supprimer les espaces multiples
  formatted = formatted.replace(/\s+/g, ' ').trim();

  // Capitaliser la première lettre de chaque mot
  formatted = formatted.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Cas particuliers
  // formatted = formatted
  //   .replace(/\bCpu\b/g, 'CPU')
  //   .replace(/\bRam\b/g, 'RAM')
  //   .replace(/\bSsd\b/g, 'SSD')
  //   .replace(/\bHdd\b/g, 'HDD')
  //   .replace(/\bGb\b/g, 'GB')
  //   .replace(/\bGhz\b/g, 'GHz');

  return formatted;
};


// Fonction améliorée pour le formatage des valeurs
const formatSpecificationValue = (value: any): string => {
  if (value === null || value === undefined) return 'Non spécifié';
  if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
  if (Array.isArray(value)) return value.map(v => formatValue(v)).join(', ');
  return formatValue(value);
};

const getSpecifications = () => {
  if (!product.specifications) return [];

  return Object.entries(product.specifications).map(([key, value]) => {
    const Icon = getSpecIcon(key);
    return {
      key,
      value: formatSpecificationValue(value),
      icon: Icon,
      label: formatLabel(key)
    };
  });
};
// Helper pour formater les valeurs individuelles
const formatValue = (value: any): string => {
  if (typeof value === 'string') {
    // Essayez de formater les nombres avec unités (ex: "500gb" -> "500 GB")
    const unitMatch = value.match(/^(\d+)([a-zA-Z]+)$/);
    if (unitMatch) {
      return `${unitMatch[1]} ${unitMatch[2].toUpperCase()}`;
    }
  }
  return String(value);
};


  const specifications = getSpecifications();
  const hasSpecifications = specifications.length > 0;


  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Button
              variant="ghost"
              className="hover:bg-primary/5 -ml-2 group"
              onClick={() => router.back()}
              aria-label="Retour"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span>Retour</span>
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/5"
                onClick={toggleFavorite}
                aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/5"
                onClick={handleShare}
                aria-label="Partager"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery Section */}
          <div className="space-y-6">
            {/* Main Image with Navigation */}
            <div className="aspect-square relative overflow-hidden rounded-xl bg-muted group">
              {images.length > 0 && (
                <>
                  <Image
                    src={images[activeImage].url}
                    alt={images[activeImage].alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImage((prev) => (prev - 1 + images.length) % images.length);
                        }}
                        aria-label="Image précédente"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImage((prev) => (prev + 1) % images.length);
                        }}
                        aria-label="Image suivante"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden relative transition-all ${
                      activeImage === index 
                        ? 'ring-2 ring-primary ring-offset-2' 
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    aria-label={`Voir l'image ${index + 1}`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-8">
            {/* Product Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {subCategory.name}
                </Badge>
                {product.documentation?.certifications?.length > 0 && (
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">
                    <Certificate className="w-3 h-3 mr-1" />
                    Certifié
                  </Badge>
                )}
                {product.isNew && (
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                    Nouveau
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {product.name}
              </h1>

              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className={`${feature.bgColor} rounded-lg p-3 flex items-center gap-2`}
                >
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* Specifications & Documentation */}
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="specifications">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Spécifications
                </TabsTrigger>
                <TabsTrigger value="documentation">
                  <FileText className="w-4 h-4 mr-2" />
                  Documentation
                </TabsTrigger>
              </TabsList>
              
              {/* <TabsContent value="specifications" className="mt-6">
                {formattedSpecifications.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {formattedSpecifications.map(({ key, value, icon: Icon, label }) => (
                      <AccordionItem key={key} value={key} className="border rounded-lg">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-medium text-left">{label}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3 pl-16">
                          <p className="text-muted-foreground">{value}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-muted-foreground/50" />
                    <p>Aucune spécification disponible</p>
                  </div>
                )}
              </TabsContent> */}
              <TabsContent value="specifications" className="mt-6">
                {hasSpecifications ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {specifications.map(({ key, value, icon: Icon, label }) => (
                      <Card key={key} className="hover:shadow-md transition-shadow">
                        <div className="p-4 flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground">
                              {label}
                            </h4>
                            <p className="text-lg font-semibold">
                              {value}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-muted-foreground/50" />
                    <p>Aucune spécification disponible</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="documentation" className="mt-6 space-y-4">
                {product.documentation?.technicalSheet && (
                  <Card>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold">Fiche technique</h3>
                          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Download className="w-4 h-4 mr-1.5" />
                              {product.documentation.technicalSheet.size}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1.5" />
                              MAJ: {product.documentation.technicalSheet.lastUpdate}
                            </span>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="shrink-0"
                          asChild
                        >
                          <Link 
                            href={product.documentation.technicalSheet.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {product.documentation?.certifications?.map((cert, index) => (
                  <Card key={index}>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold">{cert.name}</h3>
                          <div className="mt-1 text-sm text-muted-foreground">
                            N° {cert.number}
                          </div>
                          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1.5" />
                              Valide jusqu'au {cert.validUntil}
                            </span>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="shrink-0"
                          asChild
                        >
                          <Link 
                            href={cert.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Voir
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

                {(!product.documentation?.technicalSheet && !product.documentation?.certifications) && (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-muted-foreground/50" />
                    <p>Aucune documentation disponible</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* // Remplacez la section des spécifications (TabsContent) par ce code :

            <TabsContent value="specifications" className="mt-6">
              {formattedSpecifications.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formattedSpecifications.map(({ key, value, icon: Icon, label }) => (
                    <Card key={key} className="hover:shadow-md transition-shadow">
                      <div className="p-4 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground">
                            {label}
                          </h4>
                          <p className="text-lg font-semibold">
                            {value}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-muted-foreground/50" />
                  <p>Aucune spécification disponible</p>
                </div>
              )}
            </TabsContent> */}


            {/* Quote Form */}
            <Card className="border-primary/20">
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Demander un devis</h3>
                    <p className="text-sm text-muted-foreground">
                      Réponse sous 24h ouvrées
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Input
                        placeholder="Nom complet *"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="h-12"
                        icon={<User className="w-4 h-4 text-muted-foreground" />}
                      />
                    </div>

                    <div>
                      <Input
                        type="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="h-12"
                        icon={<Mail className="w-4 h-4 text-muted-foreground" />}
                      />
                    </div>

                    <div>
                      <Input
                        type="tel"
                        placeholder="Téléphone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="h-12"
                        icon={<Phone className="w-4 h-4 text-muted-foreground" />}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quantité souhaitée *</label>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(selectedQuantity - 1)}
                          disabled={selectedQuantity <= 1}
                          aria-label="Réduire la quantité"
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          max="999"
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
                          aria-label="Augmenter la quantité"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Textarea
                        placeholder="Message (optionnel)"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        rows={3}
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
              </div>
            </Card>

            {/* Contact Options */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12"
                onClick={() => {
                  const subject = `Demande d'information: ${product.name}`;
                  const body = `Bonjour,\n\nJe suis intéressé par le produit "${product.name}" (Réf: ${product.id}).\n\nPouvez-vous me donner plus d'informations ?`;
                  window.location.href = `mailto:contact@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
              >
                <Mail className="w-4 h-4 mr-2" />
                Envoyer un email
              </Button>
              <Button
                className="flex-1 h-12 bg-green-600 hover:bg-green-700"
                onClick={() => {
                  const message = `Bonjour, je suis intéressé par le produit "${product.name}" (Réf: ${product.id}). Pouvez-vous me donner plus d'informations ?`;
                  window.open(`https://wa.me/33612345678?text=${encodeURIComponent(message)}`, '_blank');
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Produits similaires</h2>
              <Button variant="ghost" asChild>
                <Link href={`/products?category=${subCategory.id}`}>
                  Voir tout <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <Link
                  key={similarProduct.id}
                  href={`/products/${similarProduct.id}`}
                  className="group block"
                  aria-label={`Voir le produit ${similarProduct.name}`}
                >
                  <Card className="overflow-hidden hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-square relative overflow-hidden bg-muted">
                      {similarProduct.imageUrl ? (
                        <Image
                          src={similarProduct.imageUrl}
                          alt={similarProduct.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-12 h-12 text-muted-foreground/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="font-medium text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {similarProduct.name}
                      </h3>
                      <div className="mt-2 flex justify-between items-center">
                        <Badge variant="secondary" className="text-xs">
                          {subCategory.name}
                        </Badge>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          Voir <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Top Button */}
        {showBackToTop && (
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-8 right-8 h-11 w-11 rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Retour en haut"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}