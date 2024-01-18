import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function zerarDados() {
  await prisma.user.deleteMany();

  console.log("Dados zerados com sucesso.");

  await prisma.$disconnect();
}

zerarDados();
