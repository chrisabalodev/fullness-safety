"use client";

import { Card } from "@/components/ui/card";
import { getCategories, getProducts, getSubCategories } from "@/lib/db";
import { Boxes, FolderTree, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    subCategories: 0,
    products: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [categories, subCategories, products] = await Promise.all([
        getCategories(),
        getSubCategories(),
        getProducts()
      ]);

      setStats({
        categories: categories.length,
        subCategories: subCategories.length,
        products: products.length
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground mt-2">
          Gérez votre catalogue de produits et vos catégories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/categories" className="group">
          <Card className="p-6 hover:border-primary/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FolderTree className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Catégories</p>
                <p className="text-2xl font-bold">{stats.categories}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/categories" className="group">
          <Card className="p-6 hover:border-primary/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Boxes className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sous-catégories</p>
                <p className="text-2xl font-bold">{stats.subCategories}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/products" className="group">
          <Card className="p-6 hover:border-primary/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Produits</p>
                <p className="text-2xl font-bold">{stats.products}</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}