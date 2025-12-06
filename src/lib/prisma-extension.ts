import { PrismaClient } from "@prisma/client";

// Liste des modèles qui ont le champ 'deletedAt' (Soft Delete activé)
const modelsWithSoftDelete = [
  "User",
  "Property",
  "RoomListing",
  "Lease",
  "Tenant",
  "Application",
  "Payment",
  "Expense",
  "Ticket",
  "Document",
];

export const softDeleteExtension = (client: PrismaClient) => {
  return client.$extends({
    query: {
      $allModels: {
        async findMany({ model, args, query }) {
          // Si ce modèle ne gère pas le soft delete, on exécute la requête normale
          if (!modelsWithSoftDelete.includes(model)) return query(args);

          // Sinon, on applique le filtre
          if (args.where === undefined) {
            args.where = { deletedAt: null } as any;
          } else if ((args.where as any).deletedAt === undefined) {
            (args.where as any).deletedAt = null;
          }
          return query(args);
        },

        async findFirst({ model, args, query }) {
          if (!modelsWithSoftDelete.includes(model)) return query(args);

          if (args.where === undefined) {
            args.where = { deletedAt: null } as any;
          } else if ((args.where as any).deletedAt === undefined) {
            (args.where as any).deletedAt = null;
          }
          return query(args);
        },

        async findUnique({ model, args, query }) {
          if (!modelsWithSoftDelete.includes(model)) return query(args);

          // Astuce : On injecte deletedAt: null
          // TypeScript râle car findUnique attend des champs uniques stricts, donc on cast en 'any'
          args.where = { ...args.where, deletedAt: null } as any;
          return query(args);
        },

        // INTERCEPTION SUPPRESSION
        async delete({ model, args, query }) {
          if (!modelsWithSoftDelete.includes(model)) return query(args);

          // Transformation du DELETE en UPDATE
          return (client as any)[model].update({
            ...args,
            data: { deletedAt: new Date() },
          });
        },

        async deleteMany({ model, args, query }) {
          if (!modelsWithSoftDelete.includes(model)) return query(args);

          return (client as any)[model].updateMany({
            ...args,
            data: { deletedAt: new Date() },
          });
        },
      },
    },
  });
};