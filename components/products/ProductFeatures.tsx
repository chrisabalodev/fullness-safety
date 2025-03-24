"use client";

import { AlignCenterVertical as Certificate, Shield, Truck, Repeat } from "lucide-react";

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
  {
    icon: Repeat,
    label: "Retour gratuit",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  }
];

export default function ProductFeatures() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {features.map((feature) => (
        <div
          key={feature.label}
          className={`${feature.bgColor} rounded-xl p-4 text-center group hover:scale-105 transition-all duration-300`}
        >
          <feature.icon className={`h-6 w-6 ${feature.color} mx-auto mb-2`} />
          <span className="text-sm font-medium">{feature.label}</span>
        </div>
      ))}
    </div>
  );
}