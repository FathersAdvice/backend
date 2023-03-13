"use strict";

require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
var _client = require("@prisma/client");
const prisma = (0, _client.PrismaClient)();
const main = async () => {
  const getUsers = await prisma.user.findMany();
  console.log(getUsers);
};
main().catch(e => console.log(e)).finally(async () => {
  await prisma.$disconnect();
});