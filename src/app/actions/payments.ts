"use server";

import { db } from "@/lib/prisma";
import { createSafeAction, actionResult } from "@/lib/safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const CapturePaymentSchema = z.object({
  paymentId: z.string().min(1),
  method: z.enum(["ESPECES", "VIREMENT", "CHEQUE", "WAVE", "OM"]),
  date: z.string(),
  amount: z.coerce.number().positive(),
  proofUrl: z.string().optional().nullable(),
  reference: z.string().optional(), // Nouveau champ utile
  notes: z.string().optional(),     // Nouveau champ utile
});

export const capturePayment = createSafeAction(
  CapturePaymentSchema,
  async ({ userId }, data) => {
    
    // 1. Validations
    if (data.amount < 100) return actionResult.error("Montant minimum : 100 FCFA.");
    if (new Date(data.date) > new Date()) return actionResult.error("Date future interdite.");

    try {
      await db.$transaction(async (tx) => {
        // A. Récupération du dossier paiement
        const payment = await tx.payment.findUnique({
          where: { id: data.paymentId },
          include: { lease: { include: { property: true } } },
        });

        if (!payment) throw new Error("Paiement introuvable");
        if (payment.lease.property.managerId !== userId) throw new Error("Accès refusé.");
        if (payment.status === "PAID") throw new Error("Ce paiement est déjà soldé.");

        // B. Calculs
        const currentReceived = payment.receivedAmount ?? 0;
        const newTotalReceived = currentReceived + data.amount;
        
        // Sécurité Trop-perçu
        if (newTotalReceived > payment.amount + 100) {
            throw new Error(`Erreur : Le reste à payer est de ${payment.amount - currentReceived} FCFA.`);
        }

        // C. Détermination du statut
        let newStatus = "PARTIAL";
        if ((payment.amount - newTotalReceived) <= 100) {
            newStatus = "PAID";
        }

        // D. CRÉATION DE LA TRANSACTION (Le cœur de la V2) 💎
        await tx.paymentTransaction.create({
          data: {
            amount: data.amount,
            date: new Date(data.date),
            method: data.method,
            proofUrl: data.proofUrl,
            reference: data.reference,
            notes: data.notes,
            paymentId: payment.id,
            recordedBy: userId, // On sait QUI a encaissé l'argent
          }
        });

        // E. Mise à jour du "Dossier Principal" (Payment)
        // On met à jour les totaux pour un affichage rapide sans avoir à refaire la somme de l'historique à chaque fois
        await tx.payment.update({
          where: { id: data.paymentId },
          data: {
            status: newStatus as any,
            receivedAmount: newTotalReceived,
            lastPaymentDate: new Date(data.date), // Date du dernier mouvement
            method: data.method,                  // Méthode du dernier mouvement
          }
        });

        // F. Audit Log (Optionnel maintenant, car on a PaymentTransaction, mais utile pour l'admin system)
        await tx.auditLog.create({
          data: {
            action: "PAYMENT_COLLECTED",
            entity: "Payment",
            entityId: payment.id,
            userId: userId,
            details: { 
                amount_added: data.amount, 
                new_total: newTotalReceived, 
                status: newStatus 
            }
          }
        });
      });

      revalidatePath("/payments");
      revalidatePath(`/payments/${data.paymentId}`); // Pour rafraîchir la page détail
      return actionResult.success("Encaissement enregistré avec succès.");

    } catch (e: any) {
        return actionResult.error(e.message || "Erreur lors de l'encaissement.");
    }
  },
  { rolesAllowed: ["AGENCY", "OWNER"] }
);