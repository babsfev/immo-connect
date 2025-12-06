"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ConfirmButton } from "@/components/ui/ConfirmButton";
import { useAction } from "@/hooks/use-action";
import { deleteProperty } from "@/app/actions/properties";
import { toast } from "sonner";

export function DeletePropertyButton({ propertyId }: { propertyId: string }) {
  const router = useRouter();

  const { execute, isPending } = useAction(deleteProperty, {
    onSuccess: () => {
      toast.success("Bien supprimé définitivement.");
      router.push("/properties");
      router.refresh();
    },
    onError: (err) => {
      toast.error("Erreur suppression", { description: err });
    }
  });

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400 mr-2">Zone de danger :</span>
      <ConfirmButton 
        onConfirm={() => execute({ id: propertyId })} 
        isDeleting={isPending}
        confirmLabel="Vraiment supprimer ?"
        className="text-red-500 hover:bg-red-50 hover:text-red-700"
      />
    </div>
  );
}