import React from "react";
import { getTickets } from "@/app/data/tickets";     // Appel au Chef Tickets
import { getProperties } from "@/app/data/properties"; // Appel au Chef Propriétés (pour le menu déroulant)
import { MaintenanceBoard } from "@/components/maintenance/MaintenanceBoard"; // Appel au Serveur en salle

export default async function MaintenancePage() {
  // 1. On récupère les données sur le serveur (rapide & sécurisé)
  // Promise.all permet de lancer les deux requêtes en même temps (parallèle)
  const [tickets, properties] = await Promise.all([
    getTickets(),
    getProperties()
  ]);

  // 2. On passe les données préparées au composant Client (l'interface interactive)
  return (
      <MaintenanceBoard 
         initialTickets={tickets} 
         // On simplifie la liste des propriétés pour le menu déroulant (juste ID et Titre)
         properties={properties.map(p => ({ id: p.id, title: p.title }))} 
      />
  );
}