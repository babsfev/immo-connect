import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { CURRENT_YEAR } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Logo className="h-8 mb-4" />
            <p className="text-slate-500 text-sm leading-relaxed">
              La solution SaaS n°1 pour la gestion immobilière en Afrique de l'Ouest.
            </p>
          </div>

          {/* Liens */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Produit</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/market" className="hover:text-blue-600">Marketplace</Link></li>
              <li><Link href="/#features" className="hover:text-blue-600">Fonctionnalités</Link></li>
              <li><Link href="/login" className="hover:text-blue-600">Connexion</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-blue-600">CGU / CGV</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Confidentialité</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Mentions Légales</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Nous contacter</h4>
            <p className="text-sm text-slate-500 mb-2">support@immo-connect.sn</p>
            <p className="text-sm text-slate-500">+221 33 800 00 00</p>
            <p className="text-sm text-slate-500 mt-2">Dakar, Sénégal</p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 text-center">
          <p className="text-xs text-slate-400">
            &copy; {CURRENT_YEAR} Immo-Connect Inc. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}