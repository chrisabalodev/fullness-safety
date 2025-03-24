"use client";

import { Button } from "@/components/ui/button";
import { Package, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImage {
  url: string;
  alt: string;
}

interface ProductImageProps {
  images: ProductImage[];
  activeImage: number;
  onImageChange: (index: number) => void;
}

export default function ProductImage({ images, activeImage, onImageChange }: ProductImageProps) {
  return (
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
                  onClick={() => onImageChange((activeImage - 1 + images.length) % images.length)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onImageChange((activeImage + 1) % images.length)}
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
              onClick={() => onImageChange(index)}
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
  );
}