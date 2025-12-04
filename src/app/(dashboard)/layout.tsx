import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-800">
      {/* Sidebar fixe à gauche (visible sur grand écran) */}
      <Sidebar />

      <div className="flex flex-col min-h-screen">
        {/* Header fixe en haut */}
        <Header />
        
        {/* Le contenu des pages (Dashboard, Properties, Tenants...) s'affiche ici via 'children' */}
        <main className="flex-1 p-4 sm:p-6 lg:ml-64 overflow-x-hidden">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}