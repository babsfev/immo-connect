import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";
// ❗ PAS DE cache() ici pour éviter toute fuite de données entre utilisateurs

export async function getPaymentsData() {
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    const payments = await db.payment.findMany({
      where: {
        lease: { property: { managerId: user.userId } }
      },
      orderBy: { dueDate: 'desc' },
      include: {
        tenant: { select: { firstName: true, lastName: true } },
        lease: { 
          include: { property: { select: { title: true, address: true } } } 
        }
      }
    });

    // SÉRIALISATION DES DATES (Crucial pour éviter les erreurs React)
    const safePayments = payments.map(p => {
      const received = p.receivedAmount || 0;
      const remaining = p.amount - received;
      
      // Calcul du statut retard intelligent
      let displayStatus = p.status;
      if (displayStatus === "PENDING" && new Date(p.dueDate) < new Date()) {
          displayStatus = "LATE";
      }

      return {
        ...p,
        date: p.date.toISOString(),
        dueDate: p.dueDate.toISOString(),
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
        // Champs calculés pour le front
        receivedAmount: received,
        remainingAmount: remaining > 0 ? remaining : 0,
        displayStatus: displayStatus
      };
    });

    // KPIs basés sur le RÉEL perçu
    const totalCollected = safePayments.reduce((acc, curr) => acc + curr.receivedAmount, 0);
    const totalPending = safePayments.reduce((acc, curr) => acc + curr.remainingAmount, 0);
    const lateCount = safePayments.filter(p => p.displayStatus === "LATE").length;

    return {
      payments: safePayments,
      stats: { totalCollected, totalPending, lateCount }
    };

  } catch (error) {
    console.error("Erreur chargement paiements:", error);
    return null;
  }
}