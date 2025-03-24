import { Delete as Helmet, Headphones, HardDriveDownload, Hammer } from "lucide-react";
import { Award } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-muted" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary mb-8">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Notre Expertise</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Notre Savoir-Faire</h2>
          <p className="text-lg text-muted-foreground">
            Une expertise complète en équipements de protection individuelle
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: Helmet,
              title: "Protection Certifiée",
              description: "Équipements conformes aux normes CE",
              color: "bg-blue-500/10",
              textColor: "text-blue-500"
            },
            {
              icon: Headphones,
              title: "Support Expert",
              description: "Conseil personnalisé",
              color: "bg-amber-500/10",
              textColor: "text-amber-500"
            },
            {
              icon: HardDriveDownload,
              title: "Documentation",
              description: "Fiches techniques détaillées",
              color: "bg-emerald-500/10",
              textColor: "text-emerald-500"
            },
            {
              icon: Hammer,
              title: "Sur Mesure",
              description: "Solutions adaptées",
              color: "bg-purple-500/10",
              textColor: "text-purple-500"
            }
          ].map((feature) => (
            <div 
              key={feature.title}
              className="group text-center"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-8 w-8 ${feature.textColor}`} />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}