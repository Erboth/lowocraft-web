// src/app/api/personajes/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request) {
  // Extraemos el ID de la ruta a mano:
  const { pathname } = new URL(request.url);
  const parts = pathname.split('/');        // e.g. ['','api','personajes','123']
  const idStr = parts[parts.length - 1];
  const id = Number(idStr);

  if (isNaN(id)) {
    return NextResponse.json(
      { error: 'ID inválido' },
      { status: 400 }
    );
  }

  // Leemos los campos a actualizar
  const { especializacion, rol, etiqueta } = await request.json();

  try {
    const actualizado = await prisma.personaje.update({
      where: { id },
      data: { especializacion, rol, etiqueta },
    });
    return NextResponse.json(actualizado);
  } catch (error) {
    console.error('Error al actualizar personaje:', error);
    return NextResponse.json(
      { error: 'Error al actualizar personaje' },
      { status: 500 }
    );
  }
}
