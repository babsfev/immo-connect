// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { softDeleteExtension } from "./prisma-extension"; // <-- Import

const prismaClientSingleton = () => {
  const client = new PrismaClient();
  // On applique l'extension ici
  return softDeleteExtension(client);
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const db = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;