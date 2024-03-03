import { Prisma, PrismaClient } from "@prisma/client";

const isProduction = process.env.NODE_ENV === "production";
const prismaLog: Prisma.LogDefinition[] = isProduction
  ? []
  : [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "stdout",
        level: "error",
      },
      {
        emit: "stdout",
        level: "info",
      },
      {
        emit: "stdout",
        level: "warn",
      },
    ];

export const prisma = new PrismaClient<Prisma.PrismaClientOptions, "query">({
  log: prismaLog,
});

if (!isProduction) {
  prisma.$on("query", (e) => {
    console.log("Query: " + e.query);
    console.log("Params: " + e.params);
    console.log("Duration: " + e.duration + "ms");
  });
}
