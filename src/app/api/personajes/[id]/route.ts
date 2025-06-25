import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // Extraer el ID de la URL

  const body = await request.json();

  if (!id || isNaN(Number(id))) {
    return Response.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const actualizado = await prisma.personaje.update({
      where: { id: Number(id) },
      data: {
        especializacion: body.especializacion,
        rol: body.rol,
        etiqueta: body.etiqueta,
      },
    });

    return Response.json(actualizado);
  } catch (error) {
    console.error('Error al actualizar personaje:', error);
    return Response.json({ error: 'Error al actualizar personaje' }, { status: 500 });
  }
}
