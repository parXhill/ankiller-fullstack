import { PrismaClient } from '@prisma/client';

declare global {

  var prisma: PrismaClient | undefined;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // You can customize the log level as needed
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;