import { notFound } from "next/navigation";
import { getProduct, getProducts, getSubCategory } from "@/lib/db";
import ProductDetails from "./ProductDetails";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) return {};

  const subCategory = await getSubCategory(product.subCategoryId);

  return {
    title: product.name,
    description: product.description || `Découvrez ${product.name} - Un équipement de protection professionnel de haute qualité disponible chez Fullness Safety.`,
    openGraph: {
      title: product.name,
      description: product.description || `Découvrez ${product.name} - Un équipement de protection professionnel de haute qualité disponible chez Fullness Safety.`,
      images: product.imageUrl ? [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: product.name
        }
      ] : [],
    },
    alternates: {
      canonical: `https://fullness-safety.com/products/${params.id}`,
    },
  };
}

export default async function ProductPage({
  params,
}: Props) {
  const product = await getProduct(params.id);
  if (!product) {
    notFound();
  }

  const subCategory = await getSubCategory(product.subCategoryId);
  if (!subCategory) {
    notFound();
  }

  // Get similar products from the same subcategory
  const similarProducts = (await getProducts(undefined, product.subCategoryId))
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.imageUrl,
            category: subCategory.name,
            brand: {
              "@type": "Brand",
              name: "Fullness Safety"
            },
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              priceCurrency: "EUR",
              price: product.price,
              seller: {
                "@type": "Organization",
                name: "Fullness Safety"
              }
            }
          })
        }}
      />
      <ProductDetails 
        product={product} 
        subCategory={subCategory} 
        similarProducts={similarProducts}
      />
    </>
  );
}