import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const body = await request.json();

  try {
    const actualizado = await prisma.personaje.update({
      where: { id },
      data: {
        especializacion: body.especializacion,
        rol: body.rol,
        etiqueta: body.etiqueta,
      },
    });
    return Response.json(actualizado);
  } catch (error) {
    console.error('Error al actualizar personaje:', error);
    return Response.json({ error: 'No se pudo actualizar el personaje' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  try {
    await prisma.personaje.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error al borrar personaje:', error);
    return Response.json({ error: 'No se pudo borrar el personaje' }, { status: 500 });
  }
}
