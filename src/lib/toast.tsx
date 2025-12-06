import { toast } from "sonner";
import { Check, AlertTriangle, XOctagon, Info } from "lucide-react";

export const showToast = {
  success: (title: string, message?: string) => {
    toast.custom((t) => (
      <div className="flex items-center w-[350px] bg-white border-l-4 border-green-500 shadow-2xl rounded-lg p-4 animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden">
        {/* Effet de fond subtil */}
        <div className="absolute right-0 top-0 opacity-10 -translate-y-1/2 translate-x-1/4">
           <Check size={100} className="text-green-500" />
        </div>

        <div className="shrink-0 mr-4">
          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-slate-900">{title}</h3>
          {message && <p className="text-sm text-slate-500 mt-1">{message}</p>}
        </div>
        {/* Bouton fermer implicite via sonner ou ajout manuel */}
      </div>
    ), { duration: 4000 });
  },

  error: (title: string, message?: string) => {
    toast.custom((t) => (
      <div className="flex items-center w-[350px] bg-white border-l-4 border-red-500 shadow-2xl rounded-lg p-4 animate-in shake duration-300">
        <div className="shrink-0 mr-4">
          <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
            <XOctagon className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-red-900">{title}</h3>
          {message && <p className="text-sm text-red-700 mt-1">{message}</p>}
        </div>
      </div>
    ), { duration: 5000 });
  }
};