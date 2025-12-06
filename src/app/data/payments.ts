import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

// ❗ PAS DE cache() ici pour éviter toute fuite de données entre utilisateurs
export async function getPaymentsData() {
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    const payments = await db.payment.findMany({
      where: {
        lease: { property: { managerId: user.userId } },
        // IMPORTANT : On exclut les paiements supprimés (Soft Delete)
        deletedAt: null 
      },
      orderBy: { dueDate: 'desc' },
      include: {
        tenant: { select: { firstName: true, lastName: true } },
        lease: { 
          include: { property: { select: { title: true, address: true } } } 
        }
      }
    });

    // SÉRIALISATION DES DATES
    const safePayments = payments.map(p => {
      const received = p.receivedAmount || 0;
      const remaining = p.amount - received;
      
      // Calcul du statut retard intelligent
      let displayStatus = p.status;
      if (displayStatus === "PENDING" && new Date(p.dueDate) < new Date()) {
          displayStatus = "LATE" as any; // Cast pour satisfaire TS
      }

      // Détermination de la date principale à afficher
      // Si payé (ou partiel), on montre quand ça a été payé. Sinon, quand ça doit l'être.
      const displayDate = p.lastPaymentDate || p.dueDate;

      return {
        ...p,
        // 👇 CORRECTION ICI : On n'appelle plus p.date qui n'existe pas
        date: displayDate.toISOString(), 
        dueDate: p.dueDate.toISOString(),
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
        // Champs calculés
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