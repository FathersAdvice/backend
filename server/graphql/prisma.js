import { PrismaClient } from '@prisma/client';

const prisma = PrismaClient();
const main = async () => {
  const getUsers = await prisma.user.findMany();
  console.log(getUsers);
}

main().catch(e => throw e).finally(async  () => {
  await  prisma.$disconnect();
})