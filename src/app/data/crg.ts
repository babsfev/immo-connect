import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

interface CRGFilter {
  month: number; // 0-11
  year: number;
  ownerId?: string; // Optionnel pour l'instant (si on gère ses propres biens)
}

export async function getCRGData({ month, year }: CRGFilter) {
  const user = await getCurrentUser();
  if (!user) return null;

  // Dates de début et fin du mois
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0, 23, 59, 59);

  // 1. Récupérer les ENTRÉES (Loyer encaissés ce mois-ci)
  // On regarde la date d'encaissement réelle (p.date), pas l'échéance (p.dueDate)
  const incomes = await db.payment.findMany({
    where: {
      lease: { property: { managerId: user.userId } },
      status: "PAID", // Seul l'argent réellement touché compte
      date: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
      lease: { include: { property: true } },
      tenant: true
    }
  });

  // 2. Récupérer les SORTIES (Dépenses payées ce mois-ci)
  const expenses = await db.expense.findMany({
    where: {
      property: { managerId: user.userId },
      date: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
      property: true
    }
  });

  // 3. CALCULS
  const totalIncome = incomes.reduce((sum, item) => sum + (item.receivedAmount || item.amount), 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  
  // Commission Agence (Ex: 10% par défaut, à configurer plus tard dans AgencySettings)
  const agencyRate = 0.10; 
  const agencyFees = totalIncome * agencyRate;

  // Net à reverser au propriétaire
  const netBalance = totalIncome - totalExpense - agencyFees;

  return {
    period: { month, year },
    incomes: incomes.map(i => ({
       date: i.date,
       label: `Loyer - ${i.lease.property.title} (${i.tenant.lastName})`,
       amount: i.receivedAmount || i.amount
    })),
    expenses: expenses.map(e => ({
       date: e.date,
       label: `Frais - ${e.title} (${e.property.title})`,
       amount: e.amount
    })),
    fees: { label: "Honoraires de Gestion (10%)", amount: agencyFees },
    totals: { totalIncome, totalExpense, netBalance }
  };
}