"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { ShieldCheck, LogOut, FolderTree, ShoppingBag, FileText } from "lucide-react";
import Link from "next/link";

export default function AdminHeader() {
  const { logout } = useAuth();

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link 
            href="/admin" 
            className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors"
          >
            <ShieldCheck className="h-6 w-6" />
            <span>Administration</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link 
              href="/admin/categories" 
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <FolderTree className="h-4 w-4" />
              <span className="hidden sm:inline">Catégories</span>
            </Link>
            <Link 
              href="/admin/products" 
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Produits</span>
            </Link>
            <Link 
              href="/admin/quotes" 
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Devis</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}