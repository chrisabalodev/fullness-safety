"use client";

import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { Mail, Phone, MapPin, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const footerLinks = [
    {
      title: "Produits",
      links: [
        { href: "/products", label: "Tous les produits" },
        { href: "/products?category=1", label: "Casques de protection" },
        { href: "/products?category=2", label: "Vêtements de travail" },
        { href: "/products?category=7", label: "Équipements antichute" }
      ]
    },
    {
      title: "Entreprise",
      links: [
        { href: "/about", label: "À propos" },
        { href: "/contact", label: "Contact" },
        { href: "/faq", label: "FAQ" },
        { href: "/legal", label: "Mentions légales" }
      ]
    },
    {
      title: "Ressources",
      links: [
        { href: "/blog", label: "Blog" },
        { href: "/guides", label: "Guides d'achat" },
        { href: "/certifications", label: "Certifications" },
        { href: "/safety-tips", label: "Conseils de sécurité" }
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-950 to-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Newsletter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <h3 className="text-xl font-bold text-white">Restez connecté</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Recevez en exclusivité nos dernières offres, nouveautés et conseils 
                professionnels directement dans votre boîte mail.
              </p>
              <NewsletterForm />
            </div>
          </motion.div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-white mb-5 pb-2 border-b border-gray-800 flex items-center">
                  <ChevronRight className="w-4 h-4 text-primary mr-2" />
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-px before:bg-primary before:transition-all before:duration-300 group-hover:before:w-full">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact & Legal Section */}
        <div className="border-t border-gray-800 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-white">Nous contacter</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-800">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Adresse</h4>
                    <p className="text-white">
                      55 KTM Rue koketi<br />
                      Lomé, Togo
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-800">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Téléphone</h4>
                    <a href="tel:91218226" className="text-white hover:text-primary transition-colors">
                      91 21 82 26
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-800">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Email</h4>
                    <a href="mailto:contact@fullness-safety.com" className="text-white hover:text-primary transition-colors">
                      contact@fullness-safety.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-800">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Horaires</h4>
                    <p className="text-white">
                      Lun-Ven: 8h-17h<br />
                      Sam: 8h-14h
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-white mb-5">Légal</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { href: "/privacy", label: "Confidentialité" },
                    { href: "/terms", label: "Conditions" },
                    { href: "/cookies", label: "Cookies" },
                    { href: "/returns", label: "Retours" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 md:mt-0">
                <p className="text-sm text-gray-500 mb-2">
                  © {new Date().getFullYear()} Fullness Safety. Tous droits réservés.
                </p>
                <p className="text-sm text-gray-500">
                  Conçu avec passion par{" "}
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline"
                  >
                    Abalo Dev
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}