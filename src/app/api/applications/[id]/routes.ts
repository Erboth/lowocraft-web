// src/app/api/applications/[id]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ApplyStatus } from '@prisma/client';

export async function PATCH(request: Request) {
  // Extraer ID del path
  const { pathname } = new URL(request.url);
  const segments = pathname.split('/');
  const id = Number(segments[segments.length - 1]);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  // Leer nuevo estado desde el body
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const { status } = body;
  const validStatuses = Object.values(ApplyStatus);
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: `Estado inválido: ${status}` }, { status: 400 });
  }

  try {
    const updated = await prisma.apply.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error al actualizar Apply:', error);
    return NextResponse.json({ error: 'Error interno al actualizar solicitud' }, { status: 500 });
  }
}
