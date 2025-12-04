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
});

export const capturePayment = createSafeAction(
  CapturePaymentSchema,
  async ({ userId }, data) => {
    
    // Sécurité Métier
    if (data.amount < 100) return actionResult.error("Montant minimum : 100 FCFA.");
    if (new Date(data.date) > new Date()) return actionResult.error("Date future interdite.");

    await db.$transaction(async (tx) => {
      const payment = await tx.payment.findUnique({
        where: { id: data.paymentId },
        include: { lease: { include: { property: true } } },
      });

      if (!payment) throw new Error("Paiement introuvable");
      if (payment.lease.property.managerId !== userId) throw new Error("Accès refusé.");

      // 1. CALCULS CUMULATIFS
      const previousReceived = payment.receivedAmount || 0;
      const newReceivedTotal = previousReceived + data.amount;
      const remainingDue = payment.amount - newReceivedTotal;

      if (previousReceived >= payment.amount - 100) throw new Error("Déjà réglé.");
      if (newReceivedTotal > payment.amount + 100) throw new Error("Trop perçu.");

      // 2. STATUT
      let newStatus = "PARTIAL";
      if (remainingDue <= 100) newStatus = "PAID";

      // 3. MISE À JOUR
      const updatedPayment = await tx.payment.update({
        where: { id: data.paymentId },
        data: {
          status: newStatus as any,
          method: data.method,
          date: new Date(data.date),
          lastPaymentDate: new Date(),
          receivedAmount: newReceivedTotal,
          proofUrl: data.proofUrl || payment.proofUrl,
        }
      });

      // 4. AUDIT
      await tx.auditLog.create({
        data: {
          action: "PAYMENT_COLLECTED",
          entity: "Payment",
          entityId: updatedPayment.id,
          userId: userId,
          details: { due: payment.amount, deposit: data.amount, totalReceived: newReceivedTotal, status: newStatus }
        }
      });
    });

    revalidatePath("/payments");
    revalidatePath("/dashboard");
    return actionResult.success("Encaissement validé.");
  },
  { rolesAllowed: ["AGENCY", "OWNER"] }
);