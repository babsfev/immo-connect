"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSafeAction, actionResult } from "@/lib/safe-action";

const ExpenseSchema = z.object({
  title: z.string().min(2, "Titre requis"),
  amount: z.coerce.number().positive("Montant invalide"),
  date: z.string(), // Date de la dépense
  category: z.enum(["MAINTENANCE", "UTILITIES", "TAX", "MANAGEMENT", "LOAN", "OTHER"]),
  propertyId: z.string().min(1, "Bien requis"),
  isRecoverable: z.boolean().optional(), // Est-ce refacturable au locataire ?
  receiptUrl: z.string().optional().nullable(), // Photo du ticket
});

export const createExpense = createSafeAction(
  ExpenseSchema,
  async ({ userId }, data) => {
    
    // 1. Sécurité : Le bien appartient-il au manager ?
    const property = await db.property.findUnique({
      where: { id: data.propertyId, managerId: userId }
    });

    if (!property) return actionResult.error("Bien introuvable ou accès interdit.");

    // 2. Création
    await db.expense.create({
      data: {
        title: data.title,
        amount: data.amount,
        date: new Date(data.date),
        category: data.category,
        propertyId: data.propertyId,
        isRecoverable: data.isRecoverable || false,
        receiptUrl: data.receiptUrl,
      }
    });

    // 3. Refresh
    revalidatePath("/expenses");
    revalidatePath("/dashboard"); // Pour mettre à jour le graphique Flux
    revalidatePath("/reports");   // Pour les bilans

    return actionResult.success("Dépense enregistrée.");
  },
  { rolesAllowed: ["AGENCY", "OWNER"] }
);