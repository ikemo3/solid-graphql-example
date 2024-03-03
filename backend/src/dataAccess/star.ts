import { prisma } from "./prisma";

export async function queryStarList() {
  return prisma.star.findMany({ orderBy: { id: "asc" } });
}

export async function queryStarByIdOrThrow(id: number) {
  return prisma.star.findUniqueOrThrow({ where: { id } });
}

export async function queryConstellationList() {
  return prisma.constellation.findMany({ orderBy: { id: "asc" } });
}

export async function queryConstellationByIdOrThrow(id: number) {
  return prisma.constellation.findUniqueOrThrow({ where: { id } });
}
