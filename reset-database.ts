
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetDatabase() {
  try {

    await prisma.follower.deleteMany({});
    await prisma.following.deleteMany({});
    await prisma.like.deleteMany({});
    await prisma.replie.deleteMany({});
    await prisma.tweetBase.deleteMany({});
    await prisma.user.deleteMany({});

    console.log("Banco de dados zerado com sucesso!");
  } catch (error) {
    console.error("Erro ao zerar o banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute a função para zerar o banco de dados.
resetDatabase();
