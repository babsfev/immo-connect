"use client";

import React, { useState } from "react";
import { 
  Building2, 
  MapPin, 
  Banknote, 
  Check, 
  ChevronRight, 
  Home, 
  AlertCircle,
  Loader2
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/form/Input"; 
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { useAction } from "@/hooks/use-action";
import { createProperty } from "@/app/actions/properties";
import { showToast } from "@/lib/toast";

interface WizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddPropertyWizard({ isOpen, onClose }: WizardProps) {
  const [step, setStep] = useState(1);

  // 1. Hook Server Action 
  // CORRECTION : On retire 'reset' qui n'existait pas
  const { execute, isPending, result } = useAction(createProperty, {
    onSuccess: () => {
      showToast.success("Bien immobilier créé !", "Ajouté avec succès à votre portefeuille.");
      onClose();
      setStep(1);
    },
    onError: (error) => {
      showToast.error("Erreur de création", error);
    }
  });

  // CORRECTION : Extraction sécurisée des erreurs
  // On vérifie d'abord que le résultat existe, qu'il n'est PAS ok, et qu'il a des détails
  const fieldErrors = (result && !result.ok && result.details) ? result.details : {};

  const handleSubmit = (formData: FormData) => {
    execute(formData);
  };

  // --- NAVIGATION DU WIZARD ---
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const steps = [
    { num: 1, title: "Identité", icon: Building2 },
    { num: 2, title: "Localisation", icon: MapPin },
    { num: 3, title: "Finances", icon: Banknote },
  ];

  // Calcul du total estimé (Affichage seulement)
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajouter un nouveau bien">
      
      {/* 1. STEPPER */}
      <div className="mb-8 px-2">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-100 -z-10" />
          <div
            className="absolute left-0 top-1/2 h-0.5 bg-slate-900 -z-10 transition-all duration-500 ease-out"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />

          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-2 bg-white px-2 group">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                  step >= s.num
                    ? "bg-slate-900 border-slate-900 text-white scale-110 shadow-lg"
                    : "bg-white border-slate-200 text-slate-300"
                }`}
              >
                {step > s.num ? <Check size={14} /> : s.num}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  step >= s.num ? "text-slate-900" : "text-slate-300"
                }`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. FORMULAIRE */}
      <form action={handleSubmit} className="min-h-80 flex flex-col">
        
        <div className="flex-1">
          {/* ÉTAPE 1 : INFO GÉNÉRALES */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-blue-50/50 p-4 rounded-xl flex items-start gap-4 border border-blue-100/50">
                <div className="p-2.5 bg-white rounded-lg text-blue-600 shadow-sm border border-blue-50">
                  <Home size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Détails du bien</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Ces informations identifient le bien dans vos contrats.</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Nom du bien (Titre)"
                  name="title"
                  placeholder="Ex: Appartement A4 - Résidence Mermoz"
                  error={fieldErrors.title} // Connexion automatique de l'erreur
                  autoFocus
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Type de bien
                  </label>
                  <div className="relative">
                    <select
                      name="type"
                      className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all appearance-none"
                    >
                      <option value="APARTMENT">Appartement</option>
                      <option value="HOUSE">Maison / Villa</option>
                      <option value="STUDIO">Studio</option>
                      <option value="OFFICE">Bureau</option>
                      <option value="RETAIL">Commerce</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <ChevronRight className="rotate-90" size={16}/>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <Input
                      label="Surface (m²)"
                      name="surface"
                      type="number"
                      placeholder="Ex: 85"
                      error={fieldErrors.surface}
                   />
                   <Input
                      label="Pièces"
                      name="rooms"
                      type="number"
                      placeholder="Ex: 3"
                      error={fieldErrors.rooms}
                   />
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 : ADRESSE */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <Input
                label="Adresse complète"
                name="address"
                placeholder="Numéro, Rue, Quartier..."
                icon={<MapPin size={18} />}
                error={fieldErrors.address}
                autoFocus
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Ville"
                  name="city"
                  placeholder="Dakar"
                  defaultValue="Dakar"
                  error={fieldErrors.city}
                />
                <div className="space-y-1.5 opacity-60">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Pays</label>
                  <div className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 font-medium">
                    Sénégal 🇸🇳
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 3 : FINANCES */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Loyer Mensuel (Hors Charges)"
                  name="price"
                  type="number"
                  placeholder="0"
                  icon={<span className="text-xs font-bold">FCFA</span>}
                  error={fieldErrors.price}
                  onChange={(e) => setEstimatedPrice(parseInt(e.target.value) || 0)}
                  autoFocus
                />
              </div>

              {/* Carte Résumé Financier */}
              <div className="bg-slate-900 p-5 rounded-2xl text-white shadow-xl shadow-slate-900/10 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                
                <div className="flex justify-between items-center mb-3 relative z-10">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                    Projection Revenus
                  </span>
                  <Badge className="bg-green-500/20 text-green-400 border-none backdrop-blur-md">
                    Annuel : {(estimatedPrice * 12).toLocaleString()} FCFA
                  </Badge>
                </div>
                
                <div className="flex items-baseline gap-2 relative z-10">
                  <p className="text-4xl font-bold tracking-tight">
                    {estimatedPrice.toLocaleString()}
                  </p>
                  <span className="text-sm font-medium text-slate-400">FCFA / mois</span>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400 relative z-10">
                  <AlertCircle size={14} className="text-blue-400" /> 
                  Rentabilité brute estimée : <span className="text-white font-bold">~ 6-8%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. FOOTER ACTIONS */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-auto">
          <Button
            type="button"
            variant="ghost"
            onClick={step === 1 ? onClose : handlePrev}
            className="text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            disabled={isPending}
          >
            {step === 1 ? "Annuler" : "Retour"}
          </Button>

          {step < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-slate-900 hover:bg-slate-800 text-white min-w-[120px] shadow-lg shadow-slate-900/20"
            >
              Suivant <ChevronRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white min-w-[140px] shadow-lg shadow-green-600/20"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Création...
                </>
              ) : (
                <>
                  <Check size={18} className="mr-2" /> Terminer
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}