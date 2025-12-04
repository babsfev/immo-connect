import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ActionResult } from "@/lib/safe-action";

type ActionFunction<TInput, TOutput> = (
  data: TInput
) => Promise<ActionResult<TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data?: TOutput) => void; // data est optionnel ici aussi
  onError?: (error: string) => void;
  successMessage?: string;
}

export function useAction<TInput, TOutput>(
  action: ActionFunction<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult<TOutput> | null>(null);

  const execute = async (data: TInput) => {
    startTransition(async () => {
      try {
        const res = await action(data);
        setResult(res);

        if (res.ok) {
          if (options.successMessage || res.message) {
            toast.success("Succès", { 
              description: options.successMessage || res.message 
            });
          }
          
          // --- CORRECTION ICI ---
          // On exécute onSuccess même si res.data est undefined
          if (options.onSuccess) {
            options.onSuccess(res.data);
          }
          // ----------------------
          
        } else {
          const errorMsg = res.error || "Une erreur est survenue.";
          toast.error("Erreur", { description: errorMsg });
          if (options.onError) {
            options.onError(errorMsg);
          }
        }
      } catch (error) {
        toast.error("Erreur Critique", { description: "Erreur de communication serveur." });
      }
    });
  };

  return {
    execute,
    isPending,
    result,
  };
}