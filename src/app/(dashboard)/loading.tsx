import React from "react";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      
      {/* 1. Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-200 rounded-lg"></div>
          <div className="h-4 w-64 bg-slate-100 rounded-lg"></div>
        </div>
        <div className="h-10 w-32 bg-slate-200 rounded-full"></div>
      </div>

      {/* 2. KPI Grid Skeleton (4 cartes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-white border border-slate-100 rounded-2xl p-6 flex flex-col justify-between">
             <div className="flex justify-between">
                <div className="h-4 w-24 bg-slate-100 rounded"></div>
                <div className="h-8 w-8 bg-slate-100 rounded-lg"></div>
             </div>
             <div className="h-8 w-32 bg-slate-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* 3. Main Content Skeleton (Graphique & Liste) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
         
         {/* Grande zone (Graphique) */}
         <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6">
            <div className="h-6 w-40 bg-slate-200 rounded mb-6"></div>
            <div className="flex items-end gap-4 h-64">
               <div className="w-full h-[40%] bg-slate-100 rounded-t-lg"></div>
               <div className="w-full h-[70%] bg-slate-100 rounded-t-lg"></div>
               <div className="w-full h-[50%] bg-slate-100 rounded-t-lg"></div>
               <div className="w-full h-[80%] bg-slate-100 rounded-t-lg"></div>
               <div className="w-full h-[60%] bg-slate-100 rounded-t-lg"></div>
            </div>
         </div>

         {/* Petite zone (Widget) */}
         <div className="lg:col-span-1 bg-white border border-slate-100 rounded-2xl p-6 flex flex-col gap-4">
            <div className="h-6 w-32 bg-slate-200 rounded"></div>
            <div className="flex-1 bg-slate-50 rounded-xl"></div>
            <div className="h-10 w-full bg-slate-100 rounded-lg"></div>
         </div>

      </div>
    </div>
  );
}