// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash('Admin1234!', 10);
  await prisma.usuario.upsert({
    where: { email: 'admin@lowocraft.com' },
    update: {},
    create: {
      email: 'admin@lowocraft.com',
      nombre: 'Administrador',
      password: passwordHash,
      rol: 'ADMIN'
    }
  });
  console.log('✅ Usuario admin creado/actualizado');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
