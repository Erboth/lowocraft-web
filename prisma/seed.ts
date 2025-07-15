import prisma from '../src/lib/prisma';
import { hash } from 'bcrypt';

async function main() {
  const passwordHash = await hash('tuPasswordSeguro', 10);
  await prisma.usuario.upsert({
    where: { email: 'admin@tuCorreo.com' },
    update: {},
    create: {
      email: 'admin@tuCorreo.com',
      nombre: 'Administrador',
      password: passwordHash,
      rol: 'ADMIN'
    }
  });
  console.log('Usuario admin creado');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
