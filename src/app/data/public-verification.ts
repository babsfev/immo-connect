import { db } from "@/lib/prisma";
import { cache } from "react";

// Protection basique contre le scan d'ID (Alphanumérique seulement)
const ID_REGEX = /^[a-zA-Z0-9]+$/;

export const getPublicPaymentDetails = cache(async (id: string) => {
  // 1. Sécurité : Si l'ID est louche, on coupe tout de suite
  if (!id || !ID_REGEX.test(id)) return null;

  try {
    const payment = await db.payment.findUnique({
      where: { id },
      select: {
        id: true,
        amount: true,
        receivedAmount: true,
        date: true,
        status: true,
        // On ne remonte QUE les infos nécessaires à la preuve
        tenant: {
          select: {
            firstName: true,
            lastName: true, 
          }
        },
        lease: {
          select: {
            property: {
              select: {
                title: true,
                address: true,
                city: true,
                manager: {
                  select: {
                    agencySettings: {
                      select: { companyName: true, logoUrl: true }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    return payment;
  } catch (error) {
    return null;
  }
});