import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";
// ❌ On enlève l'import de cache

export async function getPaymentForReceipt(paymentId: string) { // ❌ Plus de cache()
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
              manager: { include: { agencySettings: true } }
            }
          }
        }
      }
    }
  });

  if (!payment || payment.lease.property.managerId !== user.userId) {
    return null;
  }

  return payment;
}