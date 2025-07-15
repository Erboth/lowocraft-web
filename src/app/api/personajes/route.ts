// src/app/api/personajes/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/* --------------------- POST: Crear personaje --------------------- */
export async function POST(request: Request) {
  const { nombre, clase, especializacion, rol } = await request.json();
  if (!nombre || !clase || !especializacion || !rol) {
    return NextResponse.json(
      { error: 'Faltan datos obligatorios' },
      { status: 400 }
    );
  }

  try {
    const nuevo = await prisma.personaje.create({
      data: { nombre, clase, especializacion, rol, etiqueta: null }
    });
    return NextResponse.json(nuevo, { status: 201 });
  } catch (error) {
    console.error('Error al guardar personaje:', error);
    return NextResponse.json(
      { error: 'Error al guardar personaje' },
      { status: 500 }
    );
  }
}

/* --------------------- GET: Listar personajes --------------------- */
export async function GET() {
  try {
    const personajes = await prisma.personaje.findMany({
      orderBy: { nombre: 'asc' }
    });
    return NextResponse.json(personajes);
  } catch (error) {
    console.error('Error al obtener personajes:', error);
    return NextResponse.json(
      { error: 'Error al obtener personajes' },
      { status: 500 }
    );
  }
}
