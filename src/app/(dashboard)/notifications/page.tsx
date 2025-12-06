import { Suspense } from "react";
import { getNotifications } from "@/app/data/notifications"; // Import Serveur OK ici
import { NotificationsClient } from "@/components/notifications/NotificationsClient"; // Import du client
import { Loader2 } from "lucide-react";

// Titre de la page (Metadata)
export const metadata = {
  title: "Notifications | ImmoConnect",
};

export default async function NotificationsPage() {
  // 1. Récupération des données côté serveur (Accès direct BDD/Headers)
  // getNotifications utilise authz.ts qui utilise headers(), c'est autorisé ici !
  const notificationsData = await getNotifications();

  // 2. Sérialisation des données (Dates -> String)
  // Les composants clients n'aiment pas les objets Date bruts
  const safeNotifications = (notificationsData || []).map(n => ({
    ...n,
    createdAt: n.createdAt.toISOString(), // Conversion cruciale
    // On s'assure que link est null si undefined pour la sérialisation
    link: n.link || null 
  }));

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Centre de notifications</h1>
        <p className="text-slate-500">Restez informé de l'activité de votre parc immobilier</p>
      </div>

      <Suspense fallback={
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-slate-400" />
        </div>
      }>
        {/* On passe les données au composant client */}
        <NotificationsClient initialNotifications={safeNotifications} />
      </Suspense>
    </div>
  );
}