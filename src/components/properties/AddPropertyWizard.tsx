"use client";
import React, { useState } from "react";
import { Building2, MapPin, Banknote, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal"; // Assure-toi que Modal est bien dans components/ui

interface WizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddPropertyWizard({ isOpen, onClose }: WizardProps) {
  const [step, setStep] = useState(1);

  const steps = [
    { num: 1, title: "Infos", icon: Building2 },
    { num: 2, title: "Adresse", icon: MapPin },
    { num: 3, title: "Finances", icon: Banknote },
  ];

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajouter un nouveau bien">
      
      {/* Stepper Visuel */}
      <div className="flex justify-between mb-8 px-4">
        {steps.map((s) => (
          <div key={s.num} className="flex flex-col items-center relative z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
              step >= s.num ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
            }`}>
              {step > s.num ? <Check size={14}/> : s.num}
            </div>
            <span className={`text-[10px] mt-1 font-medium ${step >= s.num ? "text-blue-600" : "text-slate-400"}`}>
              {s.title}
            </span>
          </div>
        ))}
        {/* Ligne de connexion */}
        <div className="absolute top-[84px] left-12 right-12 h-0.5 bg-slate-100 z-0">
           <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${((step-1)/2)*100}%` }}></div>
        </div>
      </div>

      {/* Contenu du Formulaire */}
      <div className="space-y-4 min-h-[200px]">
        
        {step === 1 && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-200">
            <div className="space-y-1"><label className="text-sm font-medium">Nom du bien</label><Input placeholder="Ex: Résidence Mermoz" autoFocus /></div>
            <div className="space-y-1"><label className="text-sm font-medium">Type</label>
               <select className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Appartement</option>
                  <option>Villa</option>
                  <option>Studio</option>
                  <option>Commercial</option>
               </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-200">
             <div className="space-y-1"><label className="text-sm font-medium">Adresse complète</label><Input placeholder="Rue, Quartier..." autoFocus /></div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-sm font-medium">Ville</label><Input defaultValue="Dakar" /></div>
                <div className="space-y-1"><label className="text-sm font-medium">Région</label><Input defaultValue="Dakar" /></div>
             </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-200">
             <div className="space-y-1"><label className="text-sm font-medium">Loyer Mensuel (Hors charges)</label><Input type="number" placeholder="0 FCFA" autoFocus /></div>
             <div className="space-y-1"><label className="text-sm font-medium">Charges / Syndic</label><Input type="number" placeholder="0 FCFA" /></div>
             <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-700 border border-blue-100">
                Loyer total affiché : <strong>0 FCFA</strong>
             </div>
          </div>
        )}

      </div>

      {/* Footer Actions */}
      <div className="flex justify-between mt-8 pt-4 border-t border-slate-100">
        <Button variant="ghost" onClick={step === 1 ? onClose : handlePrev} className="text-slate-500">
          {step === 1 ? "Annuler" : "Précédent"}
        </Button>
        <Button 
          onClick={step === 3 ? onClose : handleNext} // onClose simule la sauvegarde
          className="bg-blue-600 text-white"
        >
          {step === 3 ? "Créer le bien" : "Suivant"}
        </Button>
      </div>
    </Modal>
  );
}