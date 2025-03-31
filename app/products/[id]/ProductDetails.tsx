'use client';

import { useState, useEffect } from 'react';
import { Product, SubCategory } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, Phone, Send, Loader2, ShieldCheck, Package, Star, Shield, 
  Check, Info, Ruler, Scale, Sparkles, Boxes, ArrowRight, FileText,
  User, MessageSquare, Share2, ArrowUp, ChevronRight, ChevronLeft,
  Download, Calendar, AlignCenterVertical as Certificate, MessageCircle,
  Wind, Box, AlertTriangle, Truck, Repeat, Clock, Heart
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductDetailsProps {
  product: Product;
  subCategory: SubCategory;
  similarProducts: Product[];
}

const SpecificationsDisplay = ({ specifications }: { specifications: any }) => {
  if (!specifications || Object.keys(specifications).length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Info className="w-8 h-8 mx-auto mb-4" />
        <p>Aucune spécification disponible</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(specifications).map(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null;

        return (
          <Card key={key} className="h-full overflow-hidden">
            <div className="p-5 h-full flex flex-col">
              <h3 className="font-medium text-lg capitalize mb-3 text-primary">
                {key.replace(/_/g, ' ')}
              </h3>
              
              <div className="flex-grow">
                {Array.isArray(value) ? (
                  <ul className="space-y-2">
                    {value.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : typeof value === 'object' ? (
                  <div className="space-y-2">
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <div key={subKey} className="flex">
                        <span className="font-medium capitalize text-muted-foreground">
                          {subKey.replace('_', ' ')}:
                        </span>
                        <span className="ml-2 text-foreground">
                          {String(subValue)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {String(value)}
                  </p>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

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

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 999) {
      setSelectedQuantity(value);
    }
  };

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

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: !isFavorite ? "Ajouté aux favoris" : "Retiré des favoris",
      variant: !isFavorite ? "default" : "destructive",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Colonne 1 - Galerie */}
          {/* <div className="lg:col-span-1">
            <div className="space-y-6">
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
          </div> */}
          {/* Colonne 1 - Galerie améliorée */}
<div className="lg:col-span-1 sticky top-24 h-fit">
  <div className="space-y-6 bg-background rounded-lg border p-4 shadow-sm">
    {/* Image principale avec zoom */}
    <div className="aspect-square relative overflow-hidden rounded-xl bg-muted group">
      {images.length > 0 && (
        <>
          <Image
            src={images[activeImage].url}
            alt={images[activeImage].alt}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-110 cursor-zoom-in"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            onClick={() => {
              // Ouvrir une lightbox/modal pour zoomer
              window.open(images[activeImage].url, '_blank');
            }}
          />
          {/* Badge pour indiquer le nombre d'images */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              {activeImage + 1}/{images.length}
            </div>
          )}
          
          {/* Navigation entre images */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((prev) => (prev - 1 + images.length) % images.length);
                }}
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((prev) => (prev + 1) % images.length);
                }}
                aria-label="Image suivante"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </>
      )}
    </div>

    {/* Miniatures avec scroll horizontal amélioré */}
    {images.length > 1 && (
      <div className="relative">
        <div className="flex space-x-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`flex-shrink-0 relative rounded-lg overflow-hidden transition-all ${
                activeImage === index 
                  ? 'ring-2 ring-primary ring-offset-2' 
                  : 'opacity-80 hover:opacity-100 border'
              }`}
              style={{ width: '80px', height: '80px' }}
              aria-label={`Voir l'image ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
              {activeImage === index && (
                <div className="absolute inset-0 bg-primary/20" />
              )}
            </button>
          ))}
        </div>
      </div>
    )}

    {/* Badges d'information sous la galerie */}
    <div className="flex flex-wrap gap-2 justify-center">
      <Badge variant="outline" className="flex items-center gap-1">
        <Package className="h-3 w-3" />
        <span>En stock</span>
      </Badge>
      <Badge variant="outline" className="flex items-center gap-1">
        <Truck className="h-3 w-3" />
        <span>Livraison 48h</span>
      </Badge>
      <Badge variant="outline" className="flex items-center gap-1">
        <ShieldCheck className="h-3 w-3" />
        <span>Garantie 2 ans</span>
      </Badge>
    </div>
  </div>
</div>

          {/* Colonne 2 - Fiche produit */}
          {/* <div className="lg:col-span-1 space-y-8">
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
          </div> */}

            {/* Colonne 2 - Fiche produit améliorée */}
<div className="lg:col-span-1 space-y-8 bg-background rounded-lg border p-6 shadow-sm">
  {/* En-tête avec badges et partage */}
  <div className="flex justify-between items-start">
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
    
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:bg-primary/5"
        onClick={toggleFavorite}
        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:bg-primary/5"
        onClick={handleShare}
        aria-label="Partager"
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  </div>

  {/* Titre et description */}
  <div className="space-y-4">
    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
      {product.name}
    </h1>

    {product.reference && (
      <div className="text-sm text-muted-foreground">
        Référence: <span className="font-mono">{product.reference}</span>
      </div>
    )}

    <div className="flex items-center gap-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-1">(12 avis)</span>
    </div>

    <p className="text-lg text-muted-foreground leading-relaxed">
      {product.description}
    </p>
  </div>

  {/* Caractéristiques principales */}
  <div className="grid grid-cols-2 gap-3">
    {features.map((feature) => (
      <div
        key={feature.label}
        className={`${feature.bgColor} rounded-lg p-3 flex items-center gap-3`}
      >
        <div className={`p-2 rounded-full ${feature.bgColor}`}>
          <feature.icon className={`h-5 w-5 ${feature.color}`} />
        </div>
        <div>
          <div className="text-sm font-medium">{feature.label}</div>
          <div className="text-xs text-muted-foreground">
            {feature.label === "Certifié CE" 
              ? "Normes européennes" 
              : feature.label === "Garantie 2 ans" 
                ? "Extension possible" 
                : "Frais de port offerts"}
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Spécifications clés */}
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">Spécifications clés</h3>
    <div className="grid grid-cols-2 gap-3">
      {product.specifications?.dimensions && (
        <div className="flex items-center gap-2 text-sm">
          <Ruler className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-muted-foreground">Dimensions</div>
            <div>{product.specifications.dimensions}</div>
          </div>
        </div>
      )}
      {product.specifications?.weight && (
        <div className="flex items-center gap-2 text-sm">
          <Scale className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-muted-foreground">Poids</div>
            <div>{product.specifications.weight}</div>
          </div>
        </div>
      )}
      {product.specifications?.material && (
        <div className="flex items-center gap-2 text-sm">
          <Box className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-muted-foreground">Matériau</div>
            <div>{product.specifications.material}</div>
          </div>
        </div>
      )}
      {product.specifications?.color && (
        <div className="flex items-center gap-2 text-sm">
          <Wind className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-muted-foreground">Couleur</div>
            <div>{product.specifications.color}</div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>


          {/* Colonne 3 - Formulaire de devis */}
          <div className="sticky top-24 h-fit">
            <Card className="border-primary/20 shadow-lg">
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <h3 className="font-semibold text-xl">Demander un devis</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Réponse sous 24h ouvrées
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="mt-6 space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  const message = `Bonjour, je suis intéressé par le produit "${product.name}" (Réf: ${product.id}). Pouvez-vous me donner plus d'informations ?`;
                  window.open(`https://wa.me/33612345678?text=${encodeURIComponent(message)}`, '_blank');
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact WhatsApp
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`tel:+33123456789`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Appeler un conseiller
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Caractéristiques techniques */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Caractéristiques techniques
          </h2>
          <SpecificationsDisplay specifications={product.specifications} />
        </section>

        {/* Documentation technique */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Documentation technique
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
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
              <div className="text-center py-8 text-muted-foreground col-span-2">
                <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-muted-foreground/50" />
                <p>Aucune documentation disponible</p>
              </div>
            )}
          </div>
        </section>

        {/* Produits similaires */}
        {similarProducts.length > 0 && (
          <section className="mt-16">
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

        {/* Bouton retour en haut */}
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