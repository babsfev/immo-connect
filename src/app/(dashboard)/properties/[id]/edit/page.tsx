import React from "react";
import { notFound } from "next/navigation";
import { getPropertyById } from "@/app/data/properties"; // Notre Loader sécurisé
import EditPropertyForm from "@/components/properties/EditPropertyForm"; // Le formulaire

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  
  // 1. Chargement des données côté serveur (Ultra rapide)
  const property = await getPropertyById(params.id);

  // 2. Si le bien n'existe pas ou n'appartient pas au user -> 404
  if (!property) {
    notFound();
  }

  // 3. On passe les données au formulaire client
  return <EditPropertyForm property={property} />;
}