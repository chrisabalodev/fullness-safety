import { Metadata } from "next";
import { getCategories, getProducts, getSubCategories } from "@/lib/db";
import ProductsClient from "./ProductsClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Catalogue des Produits de Protection",
  description: "Découvrez notre gamme complète d'équipements de protection individuelle. Casques, vêtements, équipements antichute et plus encore pour votre sécurité au travail.",
  openGraph: {
    title: "Catalogue des Produits de Protection | Fullness Safety",
    description: "Découvrez notre gamme complète d'équipements de protection individuelle. Casques, vêtements, équipements antichute et plus encore pour votre sécurité au travail.",
  },
  alternates: {
    canonical: "https://fullness-safety.com/products",
  },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const categoryId = searchParams.category as string;
  const subCategoryId = searchParams.subcategory as string;
  const searchQuery = searchParams.search as string;

  const [categories, subCategories, products] = await Promise.all([
    getCategories(),
    getSubCategories(categoryId || undefined),
    getProducts(categoryId || undefined, subCategoryId || undefined)
  ]);

  const filteredProducts = searchQuery
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <ProductsClient 
      initialCategories={categories}
      initialSubCategories={subCategories}
      initialProducts={filteredProducts}
      initialCategoryId={categoryId}
      initialSubCategoryId={subCategoryId}
      initialSearchQuery={searchQuery}
    />
  );
}