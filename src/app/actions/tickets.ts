"use server";

import { db } from "@/lib/prisma";
import { createSafeAction, actionResult } from "@/lib/safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// --- 1. CRÉATION ---

const TicketSchema = z.object({
  title: z.string().min(3, "Titre requis"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  propertyId: z.string().min(1, "Bien requis"),
});

export const createTicket = createSafeAction(
  TicketSchema,
  async ({ userId }, data) => {
    
    // Sécurité 1 : Check User
    if (!userId) return actionResult.error("Non autorisé.");

    // Sécurité 2 : Check Propriété
    const property = await db.property.findUnique({
        where: { id: data.propertyId, managerId: userId }
    });
    if (!property) return actionResult.error("Bien introuvable.");

    await db.ticket.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: "TODO",
        propertyId: data.propertyId,
        creatorId: userId,
      }
    });

    revalidatePath("/maintenance");
    revalidatePath("/dashboard");
    
    return actionResult.success("Ticket créé.");
  },
  { rolesAllowed: ["AGENCY", "OWNER"] }
);

// --- 2. MISE À JOUR STATUT ---

const UpdateStatusSchema = z.object({
    id: z.string(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"])
});

export const updateTicketStatus = createSafeAction(
    UpdateStatusSchema,
    async ({ userId }, data) => {
        
        // Sécurité 1 : Check User
        if (!userId) return actionResult.error("Non autorisé.");

        // Sécurité 2 : Anti-IDOR (Le ticket doit appartenir à un bien du manager)
        const ticket = await db.ticket.findFirst({
            where: { 
              id: data.id, 
              property: { managerId: userId } 
            }
        });

        if (!ticket) return actionResult.error("Ticket introuvable ou accès interdit.");

        // Update
        await db.ticket.update({
            where: { id: data.id },
            data: { status: data.status }
        });

        revalidatePath("/maintenance");
        return actionResult.success("Statut mis à jour.");
    },
    // CORRECTIF DE SÉCURITÉ : On verrouille l'accès au niveau du framework aussi
    { rolesAllowed: ["AGENCY", "OWNER"] }
);