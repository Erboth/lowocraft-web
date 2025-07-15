// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Evita múltiples instancias en dev
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
