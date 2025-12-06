"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSafeAction, actionResult } from "@/lib/safe-action";

const ExpenseSchema = z.object({
  title: z.string().min(2, "Titre requis"),
  amount: z.coerce.number().positive("Montant invalide"),
  date: z.string(),
  category: z.enum(["MAINTENANCE", "UTILITIES", "TAX", "MANAGEMENT", "LOAN", "OTHER"]),
  propertyId: z.string().min(1, "Bien requis"),
  isRecoverable: z.boolean().optional(),
  receiptUrl: z.string().optional().nullable(),
});

export const createExpense = createSafeAction(
  ExpenseSchema,
  async ({ userId }, data) => {
    
    // 👇 CORRECTION 1 : Garde de type pour userId
    if (!userId) {
      return actionResult.error("Utilisateur non identifié.");
    }

    // 👇 CORRECTION 2 : findFirst est plus souple que findUnique pour la vérification de propriété
    const property = await db.property.findFirst({
      where: { 
        id: data.propertyId, 
        managerId: userId // TypeScript sait maintenant que c'est un string
      }
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
    revalidatePath("/dashboard");
    revalidatePath("/reports");

    return actionResult.success("Dépense enregistrée.");
  },
  { rolesAllowed: ["AGENCY", "OWNER"] }
);