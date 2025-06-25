import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* --------------------- POST: Crear personaje --------------------- */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validación básica de campos requeridos
    const { nombre, clase, especializacion, rol } = body;

    if (!nombre || !clase || !especializacion || !rol) {
      return new Response(JSON.stringify({ error: 'Faltan datos obligatorios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const nuevo = await prisma.personaje.create({
      data: {
        nombre,
        clase,
        especializacion,
        rol,
        etiqueta: null // opcional por defecto
      },
    });

    return new Response(JSON.stringify(nuevo), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error al guardar personaje:', error);
    return new Response(JSON.stringify({ error: 'Error al guardar personaje' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/* --------------------- GET: Listar personajes --------------------- */
export async function GET() {
  try {
    const personajes = await prisma.personaje.findMany({
      orderBy: { nombre: 'asc' }
    });

    return new Response(JSON.stringify(personajes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error al obtener personajes:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener personajes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
