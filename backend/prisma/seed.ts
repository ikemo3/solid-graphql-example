import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // オリオン座
  const orion = await prisma.constellation.upsert({
    where: { name: "オリオン座" },
    update: {},
    create: {
      name: "オリオン座",
    },
  });

  // おおいぬ座
  const canisMajor = await prisma.constellation.upsert({
    where: { name: "おおいぬ座" },
    update: {},
    create: {
      name: "おおいぬ座",
    },
  });

  // ケンタウルス座
  const centaurus = await prisma.constellation.upsert({
    where: { name: "ケンタウルス座" },
    update: {},
    create: {
      name: "ケンタウルス座",
    },
  });

  // シリウス（大犬座のα星）
  await prisma.star.upsert({
    where: { name: "シリウス" },
    update: {},
    create: {
      name: "シリウス",
      constellationId: canisMajor.id,
    },
  });

  // アルファ・ケンタウリ(ケンタウルス座のα星)
  await prisma.star.upsert({
    where: { name: "アルファ・ケンタウリ" },
    update: {},
    create: {
      name: "アルファ・ケンタウリ",
      constellationId: centaurus.id,
    },
  });

  // ベテルギウス(オリオン座のα星)
  await prisma.star.upsert({
    where: { name: "ベテルギウス" },
    update: {},
    create: {
      name: "ベテルギウス",
      constellationId: orion.id,
    },
  });

  // リゲル(オリオン座のβ星)
  await prisma.star.upsert({
    where: { name: "リゲル" },
    update: {},
    create: {
      name: "リゲル",
      constellationId: orion.id,
    },
  });
}

main();
