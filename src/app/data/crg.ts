import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/authz";

// On change la signature pour accepter des dates précises
export async function getCRGData(startDate: Date, endDate: Date) {
  const user = await getCurrentUser();
  if (!user) return null;

  // 1. Récupération des encaissements
  const payments = await db.payment.findMany({
    where: {
      lease: { property: { managerId: user.userId } },
      // On filtre sur la date réelle d'encaissement
      lastPaymentDate: {
        gte: startDate,
        lte: endDate
      },
      status: { in: ['PAID', 'PARTIAL'] },
      deletedAt: null // Soft delete
    },
    include: {
      lease: { include: { property: true } },
      tenant: true
    },
    orderBy: { lastPaymentDate: 'asc' }
  });

  // 2. Récupération des dépenses
  const expenses = await db.expense.findMany({
    where: {
      property: { managerId: user.userId },
      date: {
        gte: startDate,
        lte: endDate
      },
      deletedAt: null
    },
    include: {
      property: true
    },
    orderBy: { date: 'asc' }
  });

  // 3. Calculs
  const totalIncome = payments.reduce((acc, p) => acc + (p.receivedAmount || 0), 0);
  const totalExpense = expenses.reduce((acc, e) => acc + e.amount, 0);
  
  // Commission (10%)
  const agencyFees = totalIncome * 0.10;
  const netIncome = totalIncome - totalExpense - agencyFees;

  // 4. Formatage
  const reportData = payments.map(p => ({
    type: 'INCOME',
    date: p.lastPaymentDate!,
    description: `Loyer - ${p.tenant.lastName}`,
    property: p.lease.property.title,
    amount: p.receivedAmount || 0
  }));

  const expenseData = expenses.map(e => ({
    type: 'EXPENSE',
    date: e.date,
    description: e.title,
    property: e.property.title,
    amount: e.amount
  }));

  return {
    period: { start: startDate, end: endDate },
    stats: { totalIncome, totalExpense, agencyFees, netIncome },
    transactions: [...reportData, ...expenseData].sort((a, b) => a.date.getTime() - b.date.getTime())
  };
}