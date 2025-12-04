"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useAction } from "@/hooks/use-action";
import { deleteProperty } from "@/app/actions/properties";
import { toast } from "sonner";

export default function DeletePropertyButton({ id, title }: { id: string, title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Hook "Magique"
  const { execute, isPending } = useAction(deleteProperty, {
    onSuccess: () => {
      setIsOpen(false);
      toast.success("Bien supprimé");
      router.push("/properties"); // Retour à la liste
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
      setIsOpen(false);
    }
  });

  const handleDelete = () => {
    execute({ id });
  };

  return (
    <>
      {/* Le Bouton Déclencheur */}
      <Button 
        variant="outline" 
        className="bg-white text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 size={16} className="mr-2"/> Supprimer
      </Button>

      {/* La Modale de Sécurité */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Supprimer ce bien ?">
        <div className="space-y-4">
           <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex gap-3">
              <div className="p-2 bg-white rounded-full h-fit text-red-600 shadow-sm">
                 <AlertTriangle size={20}/>
              </div>
              <div>
                 <h4 className="font-bold text-red-900 text-sm">Action irréversible</h4>
                 <p className="text-xs text-red-700 mt-1">
                    Vous êtes sur le point de supprimer <strong>"{title}"</strong>. 
                    Toutes les données associées (baux, historiques) seront archivées.
                 </p>
              </div>
           </div>

           <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isPending}>
                 Annuler
              </Button>
              <Button 
                 className="bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200"
                 onClick={handleDelete}
                 disabled={isPending}
              >
                 {isPending ? <Loader2 className="animate-spin mr-2"/> : <Trash2 size={16} className="mr-2"/>}
                 {isPending ? "Suppression..." : "Confirmer la suppression"}
              </Button>
           </div>
        </div>
      </Modal>
    </>
  );
}