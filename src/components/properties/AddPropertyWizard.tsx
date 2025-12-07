"use client";

import React, { useState } from "react";
import {
  Building2,
  MapPin,
  Banknote,
  Check,
  ChevronRight,
  ChevronLeft,
  Home,
  AlertCircle,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/form/Input";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { toast } from "sonner"; // Pour la notification de succès

interface WizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddPropertyWizard({ isOpen, onClose }: WizardProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // État du formulaire (Simplifié pour l'exemple)
  const [formData, setFormData] = useState({
    name: "",
    type: "Appartement",
    address: "",
    city: "Dakar",
    price: "",
    charges: "",
  });

  const steps = [
    { num: 1, title: "Identité", icon: Building2 },
    { num: 2, title: "Localisation", icon: MapPin },
    { num: 3, title: "Finances", icon: Banknote },
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulation d'envoi au backend
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Bien immobilier créé avec succès !", {
        description: `${formData.name} a été ajouté à votre portefeuille.`,
      });
      onClose();
      setStep(1); // Reset
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajouter un nouveau bien">
      {/* 1. STEPPER (Barre de progression) */}
      <div className="mb-8 px-2">
        <div className="flex justify-between items-center relative">
          {/* Ligne de fond */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-100 -z-10" />
          {/* Ligne de progression active */}
          <div
            className="absolute left-0 top-1/2 h-0.5 bg-blue-600 -z-10 transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />

          {steps.map((s) => (
            <div
              key={s.num}
              className="flex flex-col items-center gap-2 bg-white px-2"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                  step >= s.num
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-slate-200 text-slate-400"
                }`}
              >
                {step > s.num ? <Check size={14} /> : s.num}
              </div>
              <span
                className={`text-[10px] font-medium uppercase tracking-wider ${
                  step >= s.num ? "text-blue-600" : "text-slate-400"
                }`}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CONTENU DU FORMULAIRE */}
      <div className="min-h-[280px]">
        {/* ÉTAPE 1 : INFO GÉNÉRALES */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-3 border border-blue-100">
              <div className="p-2 bg-white rounded-md text-blue-600">
                <Home size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-900">
                  Détails du bien
                </h4>
                <p className="text-xs text-blue-700">
                  Ces informations seront visibles sur le bail.
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Nom du bien (Interne)
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Résidence Mermoz Apt 4B"
                autoFocus
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Type de bien
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option>Appartement</option>
                <option>Villa</option>
                <option>Studio</option>
                <option>Bureau / Local</option>
                <option>Terrain</option>
              </select>
            </div>
          </div>
        )}

        {/* ÉTAPE 2 : ADRESSE */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Adresse complète
              </label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Numéro, Rue, Quartier..."
                icon={<MapPin size={18} />}
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Ville
                </label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Dakar"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Région
                </label>
                <Input
                  defaultValue="Dakar"
                  disabled
                  className="bg-slate-50 text-slate-500"
                />
              </div>
            </div>

            <div className="p-3 border border-dashed border-slate-300 rounded-lg text-center bg-slate-50">
              <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
                <MapPin size={14} /> Localisation GPS auto-détectée
              </p>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 : FINANCES */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Loyer Hors Charges
                </label>
                <Input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  autoFocus
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Provisions Charges
                </label>
                <Input
                  name="charges"
                  type="number"
                  value={formData.charges}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
            </div>

            {/* Carte Résumé Financier */}
            <div className="bg-slate-900 p-4 rounded-xl text-white shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400 uppercase font-bold">
                  Total à payer par le locataire
                </span>
                <Badge className="bg-green-500 text-white border-none">
                  Mensuel
                </Badge>
              </div>
              <p className="text-3xl font-bold tracking-tight">
                {parseInt(formData.price || "0") +
                  parseInt(formData.charges || "0")}{" "}
                <span className="text-sm font-normal text-slate-400">FCFA</span>
              </p>
              <div className="mt-3 pt-3 border-t border-slate-700 flex items-center gap-2 text-xs text-slate-400">
                <AlertCircle size={12} /> Commission Agence estimée :{" "}
                {Math.round(parseInt(formData.price || "0") * 0.07)} FCFA
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. FOOTER ACTIONS */}
      <div className="flex justify-between pt-6 border-t border-slate-100 mt-2">
        <Button
          variant="ghost"
          onClick={step === 1 ? onClose : handlePrev}
          className="text-slate-500 hover:text-slate-900"
        >
          {step === 1 ? "Annuler" : "Précédent"}
        </Button>

        <Button
          onClick={handleNext}
          className="bg-orange-500 hover:bg-orange-600 text-white min-w-[120px]"
          isLoading={isLoading}
        >
          {step === 3 ? (
            "Créer le bien"
          ) : (
            <>
              Suivant <ChevronRight size={16} className="ml-1" />
            </>
          )}
        </Button>
      </div>
    </Modal>
  );
}
