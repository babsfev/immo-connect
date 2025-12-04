import React from "react";
import { getExpenses } from "@/app/data/expenses";
import { getProperties } from "@/app/data/properties";
import ExpensesClient from "@/components/expenses/ExpensesClient"; // <-- On importe le Client

export default async function ExpensesPage() {
  // 1. Chargement parallèle des données (Rapide)
  const [expensesData, properties] = await Promise.all([
    getExpenses(),
    getProperties()
  ]);

  // 2. On passe tout au composant Client qui gère l'affichage
  return (
    <ExpensesClient 
      initialData={expensesData} 
      properties={properties} 
    />
  );
}