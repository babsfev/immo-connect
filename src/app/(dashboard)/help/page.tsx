"use client";
import React from "react";
import {
  Search,
  FileQuestion,
  MessageCircle,
  Phone,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/form/Input";
import Button from "@/components/ui/Button";

export default function HelpPage() {
  return (
    <div className="space-y-8 pb-10 max-w-4xl mx-auto">
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Comment pouvons-nous vous aider ?
        </h1>
        <div className="relative max-w-lg mx-auto">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <Input
            placeholder="Rechercher une question (ex: créer un bail)..."
            className="pl-10 h-12 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:border-blue-300 cursor-pointer transition-all hover:shadow-md text-center">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-4">
              <BookOpen size={24} />
            </div>
            <h3 className="font-bold text-slate-900">Documentation</h3>
            <p className="text-sm text-slate-500 mt-2">
              Guides pas à pas pour maîtriser l'outil.
            </p>
          </CardContent>
        </Card>
        <Card className="hover:border-orange-300 cursor-pointer transition-all hover:shadow-md text-center">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-full mb-4">
              <FileQuestion size={24} />
            </div>
            <h3 className="font-bold text-slate-900">FAQ</h3>
            <p className="text-sm text-slate-500 mt-2">
              Questions fréquentes sur la facturation.
            </p>
          </CardContent>
        </Card>
        <Card className="hover:border-green-300 cursor-pointer transition-all hover:shadow-md text-center">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="p-3 bg-green-50 text-green-600 rounded-full mb-4">
              <MessageCircle size={24} />
            </div>
            <h3 className="font-bold text-slate-900">Support Chat</h3>
            <p className="text-sm text-slate-500 mt-2">
              Discutez avec un expert en direct.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Questions fréquentes
        </h2>
        <div className="space-y-4">
          {[
            "Comment modifier un contrat signé ?",
            "Comment exporter mes données comptables ?",
            "Puis-je ajouter un collaborateur ?",
          ].map((q, i) => (
            <div
              key={i}
              className="p-4 bg-white border border-slate-200 rounded-xl flex justify-between items-center cursor-pointer hover:bg-slate-50"
            >
              <span className="font-medium text-slate-700">{q}</span>
              <Button variant="ghost" size="sm">
                Lire
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
