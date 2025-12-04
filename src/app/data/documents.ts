import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

export async function getPaymentForReceipt(paymentId: string) {
  const user = await getCurrentUser();
  if (!user) return null;

  const payment = await db.payment.findUnique({
    where: { id: paymentId },
    include: {
      tenant: true,
      lease: {
        include: {
          property: {
            include: {
              // On récupère les infos agence
              manager: {
                include: {
                  agencySettings: true 
                }
              }
            }
          }
        }
      }
    }
  });

  // SÉCURITÉ STRICTE : Vérification du propriétaire
  if (!payment || payment.lease.property.managerId !== user.userId) {
    return null;
  }

  return payment;
}