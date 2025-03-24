"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, Sparkles } from "lucide-react";

interface Specification {
  key: string;
  value: string;
  icon: any;
  label: string;
}

interface ProductSpecificationsProps {
  specifications: Specification[];
}

export default function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  if (specifications.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-muted-foreground/50" />
        <p>Aucune spécification disponible pour ce produit</p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {specifications.map(({ key, value, icon: Icon, label }, index) => (
        <AccordionItem 
          key={key} 
          value={key}
          className="animate-in fade-in-50"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium capitalize">{label}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-11">
            <p className="text-muted-foreground">{value}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}