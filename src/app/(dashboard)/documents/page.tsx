import { getDocuments } from "@/app/data/documents";
import DocumentsClientPage from "./DocumentsClientPage"; // Importe le fichier créé à l'étape 1

export default async function DocumentsPage() {
  // 1. On récupère les données sur le serveur (rapide et sécurisé)
  const docs = await getDocuments();
  
  // 2. On affiche le composant Client en lui donnant les données
  return <DocumentsClientPage recentDocs={docs} />;
}