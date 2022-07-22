// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const user1 = await prisma.users.upsert({
      update: {},
      create: {
          firstName: 'some',
          lastName: 'one',
          email: 'some@gmail.com',
          nationalCode: 1944478912,
          mobile: '09121212123',
          password: await bcrypt.hash('someone' , 10 ),
          role: 'ADMIN',
          permissions: ['CreateUser','DeleteUser','UpdateUser']
      },
      where: {email: 'some@gmail.com'}
  });

  const user2 = await prisma.users.upsert({
    where: {email: 'ss@gmail.com'},
    update: {},
    create: {
        firstName: 'ss',
        lastName: 'sa',
        email: 'ss@gmail.com',
        nationalCode: 1944478913,
        mobile: '09121212124',
        password: await bcrypt.hash('someone' , 10 ),
        role: 'USER',
        permissions: ['UpdateUser']
      },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });