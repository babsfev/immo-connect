import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

// 1. Pour la liste des documents (Page /documents)
export async function getDocuments() {
  const user = await getCurrentUser();
  if (!user) return [];

  return await db.document.findMany({
    where: {
      property: { managerId: user.userId },
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' },
    include: {
      property: { select: { title: true } },
      lease: { 
        include: { tenant: { select: { firstName: true, lastName: true } } }
      }
    }
  });
}

// 2. Pour la génération de PDF (API /api/documents/...)
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

  if (!payment) return null;

  // Sécurité : On vérifie que l'utilisateur a le droit de voir ce paiement
  // (Soit c'est le manager, soit c'est le locataire)
  const isManager = payment.lease.property.managerId === user.userId;
  const isTenant = payment.tenantId === user.userId;

  if (!isManager && !isTenant) {
    return null;
  }

  return payment;
}