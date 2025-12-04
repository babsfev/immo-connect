"use client";

import React, { use, useState } from "react"; // Ajout useState
import Link from "next/link";
import { useRouter } from "next/navigation"; // Ajout Router
import { 
  ArrowLeft, Phone, Mail, Briefcase, Wallet, FileText, 
  CheckCircle2, XCircle, Building2, ShieldCheck 
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal"; // Import Modal
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner"; // Import Toast

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  // États pour les interactions
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock Data Candidat
  const candidate = {
    id: id,
    name: "Jean-Marc Ndiaye",
    email: "jm.ndiaye@gmail.com",
    phone: "+221 77 555 12 34",
    job: "Consultant Senior",
    company: "Deloitte Sénégal",
    contractType: "CDI",
    seniority: "4 ans",
    income: 2000000,
    property: "Villa Corniche Ouest",
    rent: 600000,
    status: "Analyse", 
    score: 92, 
    aiAnalysis: "Profil très solide. Revenus confortables (3.3x le loyer). Stabilité professionnelle confirmée.",
    documents: [
      { name: "CNI / Passeport", status: "Validé", aiCheck: "Authentique" },
      { name: "3 derniers bulletins", status: "Validé", aiCheck: "Cohérent" },
      { name: "Contrat de travail", status: "En revue", aiCheck: "Signature détectée" },
      { name: "Relevés bancaires", status: "Validé", aiCheck: "Flux réguliers" },
    ]
  };

  const effortRate = Math.round((candidate.rent / candidate.income) * 100);
  const isEffortSafe = effortRate <= 33;

  // --- ACTIONS INTERACTIVES ---
  
  const handleAccept = () => {
    setIsProcessing(true);
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: 'Génération du contrat de bail...',
      success: () => {
        setIsProcessing(false);
        router.push('/tenants'); // Redirection vers la liste des locataires
        return 'Dossier validé ! Le locataire a été créé.';
      },
      error: 'Erreur',
    });
  };

  const handleRejectConfirm = () => {
    setIsRejectModalOpen(false);
    toast.success("Candidature refusée", { description: "Un email de refus courtois a été envoyé." });
    router.push('/applications');
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      
      {/* HEADER & NAVIGATION */}
      <div className="flex flex-col gap-4">
        <Link href="/applications">
          <Button variant="ghost" size="sm" className="pl-0 text-slate-500 hover:text-blue-600">
            <ArrowLeft size={16} className="mr-2" /> Retour au Pipeline
          </Button>
        </Link>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-2xl font-bold border-4 border-white shadow-sm">
                 {candidate.name.charAt(0)}
              </div>
              <div>
                 <h1 className="text-2xl font-bold text-slate-900">{candidate.name}</h1>
                 <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="bg-white text-slate-600">Candidat</Badge>
                    <span className="text-slate-400 text-sm">•</span>
                    <span className="text-sm text-slate-600 flex items-center gap-1 font-medium"><Building2 size={14} className="text-blue-600"/> {candidate.property}</span>
                 </div>
              </div>
           </div>
           
           {/* BOUTONS D'ACTION ACTIFS */}
           <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
              <Button 
                variant="ghost" 
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => setIsRejectModalOpen(true)} // Ouvre la modale
              >
                 <XCircle size={18} className="mr-2"/> Refuser
              </Button>
              <div className="w-px bg-slate-200 my-1"></div>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white shadow-md"
                onClick={handleAccept} // Lance le process d'acceptation
                isLoading={isProcessing}
              >
                 <CheckCircle2 size={18} className="mr-2"/> Valider le dossier
              </Button>
           </div>
        </div>
      </div>

      {/* ... (Le reste du contenu des cartes reste identique à avant) ... */}
      {/* Je remets le contenu principal pour que le fichier soit complet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="space-y-6">
            <Card className="bg-slate-900 text-white border-none overflow-hidden relative shadow-xl shadow-slate-300">
               <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-30"></div>
               <CardContent className="p-6 relative z-10">
                  <div className="flex justify-between items-start mb-2">
                     <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Score IA</p>
                     <ShieldCheck className="text-green-400" size={20}/>
                  </div>
                  <div className="flex items-end gap-2 mb-4">
                     <span className="text-5xl font-bold text-white tracking-tight">{candidate.score}</span>
                     <span className="text-xl text-slate-500 mb-1">/100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
                     <div className={`h-full rounded-full ${candidate.score >= 80 ? "bg-green-500" : "bg-orange-500"}`} style={{ width: `${candidate.score}%` }}></div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-xs text-blue-100 leading-relaxed border border-white/10">
                     🤖 <strong>Analyse :</strong> {candidate.aiAnalysis}
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="pb-3 border-b border-slate-100"><CardTitle className="text-base">Solvabilité</CardTitle></CardHeader>
               <CardContent className="pt-4 space-y-4">
                  <div className="flex justify-between items-center">
                     <div className="flex items-center gap-3"><div className="p-2 bg-green-50 text-green-600 rounded-lg"><Wallet size={18}/></div><div><p className="text-xs text-slate-500">Revenus Nets</p><p className="font-bold text-slate-900">{formatCurrency(candidate.income)}</p></div></div>
                  </div>
                  <div className="flex justify-between items-center">
                     <div className="flex items-center gap-3"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Briefcase size={18}/></div><div><p className="text-xs text-slate-500">Contrat</p><p className="font-bold text-slate-900">{candidate.contractType}</p></div></div>
                     <Badge variant="secondary" className="text-[10px]">{candidate.seniority}</Badge>
                  </div>
                  <div className={`p-3 rounded-xl border ${isEffortSafe ? "bg-green-50 border-green-100" : "bg-orange-50 border-orange-100"}`}>
                     <div className="flex justify-between text-sm mb-1 font-medium"><span className={isEffortSafe ? "text-green-800" : "text-orange-800"}>Taux d'effort</span><span className={isEffortSafe ? "text-green-700" : "text-orange-700"}>{effortRate}%</span></div>
                     <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-white/50"><div className={`h-full ${isEffortSafe ? "bg-green-500" : "bg-orange-500"}`} style={{ width: `${effortRate}%` }}></div></div>
                  </div>
               </CardContent>
            </Card>
            
            <Card><CardContent className="p-4 flex gap-2"><Button variant="outline" className="flex-1"><Phone size={16} className="mr-2"/> Appeler</Button><Button variant="outline" className="flex-1"><Mail size={16} className="mr-2"/> Email</Button></CardContent></Card>
         </div>

         <div className="lg:col-span-2 space-y-6">
            <Card>
               <CardHeader className="pb-3"><div className="flex justify-between items-center"><CardTitle className="text-base">Pièces Justificatives</CardTitle><Badge variant="secondary">{candidate.documents.length} reçues</Badge></div></CardHeader>
               <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {candidate.documents.map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:border-blue-300 transition-all cursor-pointer group">
                           <div className="flex items-center gap-3"><div className="bg-blue-50 p-2.5 rounded-lg text-blue-600"><FileText size={18}/></div><div><p className="font-medium text-slate-900 text-sm">{doc.name}</p><p className="text-[10px] text-slate-500 flex items-center gap-1">IA Check: <span className="text-green-600 font-medium">{doc.aiCheck}</span></p></div></div>
                           <div className="flex items-center gap-2">{doc.status === "Validé" ? <CheckCircle2 size={18} className="text-green-500"/> : <XCircle size={18} className="text-orange-500"/>}</div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>

      {/* MODALE DE REFUS */}
      <Modal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} title="Refuser la candidature">
         <div className="space-y-4">
            <p className="text-sm text-slate-600">Êtes-vous sûr de vouloir refuser <strong>{candidate.name}</strong> ? Cette action est irréversible.</p>
            <div>
               <label className="text-sm font-medium text-slate-700">Motif du refus (Optionnel)</label>
               <select className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm mt-1">
                  <option>Dossier incomplet</option>
                  <option>Revenus insuffisants</option>
                  <option>Bien déjà loué</option>
                  <option>Autre</option>
               </select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
               <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>Annuler</Button>
               <Button variant="danger" onClick={handleRejectConfirm}>Confirmer le refus</Button>
            </div>
         </div>
      </Modal>

    </div>
  );
}