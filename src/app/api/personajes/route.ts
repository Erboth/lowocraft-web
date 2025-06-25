import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* --------------------- POST: Crear personaje --------------------- */
export async function POST(request: Request) {
  const body = await request.json();

  try {
    const nuevo = await prisma.personaje.create({
      data: {
        nombre: body.nombre,
        clase: body.clase,
        especializacion: body.especializacion,
        rol: body.rol,
        etiqueta: null // etiqueta inicial vacía
      },
    });

    return Response.json(nuevo, { status: 201 });
  } catch (error) {
    console.error('Error al guardar personaje:', error);
    return Response.json({ error: 'Error al guardar personaje' }, { status: 500 });
  }
}

/* --------------------- GET: Listar personajes --------------------- */
export async function GET() {
  try {
    const personajes = await prisma.personaje.findMany({
      orderBy: { nombre: 'asc' }
    });
    return Response.json(personajes);
  } catch (error) {
    console.error('Error al obtener personajes:', error);
    return new Response('Error interno del servidor', { status: 500 });
  }
}
