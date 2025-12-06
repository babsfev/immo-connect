import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { CURRENT_YEAR } from "@/lib/utils";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Social */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Logo className="h-8" />
            <p className="text-slate-500 text-sm leading-relaxed">
              La solution SaaS n°1 pour simplifier la gestion immobilière en Afrique de l'Ouest.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Facebook size={20} /></Link>
              <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><Twitter size={20} /></Link>
              <Link href="#" className="text-slate-400 hover:text-pink-600 transition-colors"><Instagram size={20} /></Link>
              <Link href="#" className="text-slate-400 hover:text-blue-800 transition-colors"><Linkedin size={20} /></Link>
            </div>
          </div>

          {/* Liens Produit */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Produit</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/market" className="hover:text-blue-600 transition-colors">Marketplace</Link></li>
              <li><Link href="/features" className="hover:text-blue-600 transition-colors">Fonctionnalités</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600 transition-colors">Tarifs</Link></li>
              <li><Link href="/login" className="hover:text-blue-600 transition-colors">Connexion</Link></li>
            </ul>
          </div>

          {/* Liens Légal */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Légal</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/terms" className="hover:text-blue-600 transition-colors">CGU / CGV</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Confidentialité</Link></li>
              <li><Link href="/legal" className="hover:text-blue-600 transition-colors">Mentions Légales</Link></li>
            </ul>
          </div>

          {/* Contact Amélioré */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Nous contacter</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-blue-600" /> 
                <a href="mailto:support@immo-connect.sn" className="hover:text-slate-900">support@immo-connect.sn</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-blue-600" />
                <a href="tel:+221338000000" className="hover:text-slate-900">+221 33 800 00 00</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-blue-600 mt-0.5" />
                <span>Mermoz, Dakar,<br/>Sénégal</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>&copy; {CURRENT_YEAR} Immo-Connect Inc. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-600">Plan du site</Link>
            <Link href="#" className="hover:text-slate-600">Sécurité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}