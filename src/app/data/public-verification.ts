import { db } from "@/lib/prisma";

export async function getPublicPaymentVerification(paymentId: string) {
  try {
    const payment = await db.payment.findUnique({
      where: { id: paymentId },
      select: {
        id: true,
        amount: true,
        receivedAmount: true,
        // 👇 CORRECTION : On sélectionne les nouveaux champs date
        dueDate: true,
        lastPaymentDate: true, 
        status: true,
        // On ne remonte QUE les infos nécessaires à la preuve (Confidentialité)
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

    if (!payment) return null;

    // Logique d'affichage de la date
    const displayDate = payment.lastPaymentDate || payment.dueDate;

    return {
      ...payment,
      // On convertit pour le front
      date: displayDate.toISOString(),
      dueDate: payment.dueDate.toISOString(),
      tenantName: `${payment.tenant.firstName} ${payment.tenant.lastName}`,
      propertyTitle: payment.lease.property.title,
      agencyName: payment.lease.property.manager.agencySettings?.companyName || "Agence Immobilière",
      agencyLogo: payment.lease.property.manager.agencySettings?.logoUrl,
    };

  } catch (error) {
    return null;
  }
}