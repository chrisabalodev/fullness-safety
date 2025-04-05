"use client";

import { useEffect, useState } from "react";
import { Quote, Product, getQuotes, getProduct, updateQuoteStatus } from "@/lib/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface QuoteWithProduct extends Quote {
  product: Product | null;
}

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-500",
  processing: "bg-blue-500/10 text-blue-500",
  completed: "bg-green-500/10 text-green-500",
  rejected: "bg-red-500/10 text-red-500"
};

const statusLabels = {
  pending: "En attente",
  processing: "En cours",
  completed: "Terminé",
  rejected: "Rejeté"
};

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const quotesData = await getQuotes();
        
        const quotesWithProducts = await Promise.all(
          quotesData.map(async (quote) => {
            try {
              const product = await getProduct(quote.productId);
              return { ...quote, product };
            } catch (error) {
              console.error(`Error fetching product ${quote.productId}:`, error);
              return { ...quote, product: null };
            }
          })
        );
        
        setQuotes(quotesWithProducts);
      } catch (error) {
        console.error("Error fetching quotes:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les devis",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handleStatusChange = async (quoteId: string, newStatus: Quote['status']) => {
    try {
      setUpdating(quoteId);
      const updatedQuote = await updateQuoteStatus(quoteId, newStatus);
      
      if (updatedQuote) {
        setQuotes(prev => 
          prev.map(q => q.id === quoteId ? { ...q, status: newStatus } : q)
        );
        toast({
          title: "Statut mis à jour",
          description: `Le devis a été marqué comme "${statusLabels[newStatus]}"`,
        });
      }
    } catch (error) {
      console.error("Error updating quote status:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Devis reçus</h1>
        <p className="text-muted-foreground mt-2">
          Gérez les demandes de devis de vos clients
        </p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.length > 0 ? (
              quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell>
                    {format(new Date(quote.createdAt), "Pp", { locale: fr })}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{quote.name}</div>
                      <div className="text-sm text-muted-foreground">{quote.email}</div>
                      {quote.phone && (
                        <div className="text-sm text-muted-foreground">{quote.phone}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {quote.product ? (
                      <>
                        <div className="font-medium">{quote.product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Réf: {quote.productId}
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Produit non trouvé (réf: {quote.productId})
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{quote.quantity}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={statusColors[quote.status]}
                    >
                      {statusLabels[quote.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={quote.status}
                      onValueChange={(value) => 
                        handleStatusChange(quote.id, value as Quote['status'])
                      }
                      disabled={updating === quote.id}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="processing">En cours</SelectItem>
                        <SelectItem value="completed">Terminé</SelectItem>
                        <SelectItem value="rejected">Rejeté</SelectItem>
                      </SelectContent>
                    </Select>
                    {updating === quote.id && (
                      <span className="ml-2 text-sm text-muted-foreground">Mise à jour...</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  Aucun devis trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}