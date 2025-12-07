"use server";

import { db } from "@/lib/prisma";
import { z } from "zod";
import { createSafeAction, actionResult } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

const SendMessageSchema = z.object({
  content: z.string().min(1, "Message vide"),
  targetUserId: z.string().optional(),
});

export const sendMessage = createSafeAction(
  SendMessageSchema,
  async ({ userId }, data) => {
    
    // Note: Dans une V2, il faudrait un champ 'recipientId'.
    // Ici on crée un message simple lié à l'utilisateur courant.
    await db.message.create({
      data: {
        content: data.content,
        userId: userId!,
        read: false,
      }
    });

    revalidatePath("/message");
    return actionResult.success("Envoyé");
  }
);