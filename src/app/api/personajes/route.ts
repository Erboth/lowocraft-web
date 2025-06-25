import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const nuevo = await prisma.personaje.create({
      data: {
        nombre: body.nombre,
        clase: body.clase,
        especializacion: body.especializacion,
        rol: body.rol,
      },
    });

    return Response.json(nuevo, { status: 201 });
  } catch (error) {
    console.error('Error al guardar personaje:', error);
    return Response.json({ error: 'Error al guardar personaje' }, { status: 500 });
  }
}
