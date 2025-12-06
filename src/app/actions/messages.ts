"use server";

import { db } from "@/lib/prisma";
import { z } from "zod";
import { createSafeAction, actionResult } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

const SendMessageSchema = z.object({
  content: z.string().min(1, "Message vide"),
  targetUserId: z.string().optional(), // Si c'est l'agence qui répond
});

export const sendMessage = createSafeAction(
  SendMessageSchema,
  async ({ userId, userRole }, data) => {
    
    // Si c'est l'agence qui "répond", on crée un message au nom de l'agence
    // Note : Pour un vrai chat bi-directionnel, il faudrait un champ recipientId dans le Schema Prisma.
    // Pour l'instant, on simule en créant un message simple.
    
    await db.message.create({
      data: {
        content: data.content,
        userId: userId!, // L'expéditeur
        read: false,
      }
    });

    revalidatePath("/message");
    return actionResult.success("Envoyé");
  }
);