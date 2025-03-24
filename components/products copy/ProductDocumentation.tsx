"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Download, Calendar } from "lucide-react";
import Link from "next/link";

interface TechnicalSheet {
  url: string;
  format: string;
  size: string;
  lastUpdate: string;
}

interface Certification {
  name: string;
  number: string;
  validUntil: string;
  url: string;
}

interface ProductDocumentationProps {
  technicalSheet?: TechnicalSheet;
  certifications?: Certification[];
}

export default function ProductDocumentation({ technicalSheet, certifications }: ProductDocumentationProps) {
  if (!technicalSheet && (!certifications || certifications.length === 0)) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-muted-foreground/50" />
        <p>Aucune documentation disponible pour ce produit</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {technicalSheet && (
        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Fiche technique</h3>
              <Badge variant="secondary" className="font-mono">
                {technicalSheet.format}
              </Badge>
            </div>
            
            <div className="grid gap-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Download className="w-4 h-4 mr-2" />
                Taille : {technicalSheet.size}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                Dernière mise à jour : {technicalSheet.lastUpdate}
              </div>
            </div>
            
            <Button 
              className="w-full mt-4 group"
              variant="outline"
              asChild
            >
              <Link 
                href={technicalSheet.url}
                target="_blank"
              >
                <Download className="w-4 h-4 mr-2 transition-transform group-hover:-translate-y-1" />
                Télécharger
              </Link>
            </Button>
          </div>
        </Card>
      )}

      {certifications && certifications.length > 0 && (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
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
    </div>
  );
}