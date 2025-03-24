"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product, getProduct } from "@/lib/db";
import QuoteForm from "./QuoteForm";

export default function QuotePage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const data = await getProduct(productId);
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Produit non trouvé</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Demande de devis</h1>
        <div className="mb-8">
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <div className="w-20 h-20 relative overflow-hidden rounded bg-background">
              {product.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div>
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
          </div>
        </div>
        <QuoteForm product={product} />
      </div>
    </div>
  );
}