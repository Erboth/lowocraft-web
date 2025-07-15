// src/app/api/usuarios/[id]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  // Extraer ID de la URL
  const { pathname } = new URL(request.url);
  const id = Number(pathname.split('/').pop());
  if (isNaN(id)) {
    return NextResponse.json(
      { error: 'ID de usuario inválido' },
      { status: 400 }
    );
  }

  // Validar rol
  const { rol } = await request.json();
  if (!['USER', 'ADMIN'].includes(rol)) {
    return NextResponse.json(
      { error: 'Rol inválido' },
      { status: 400 }
    );
  }

  try {
    const actualizado = await prisma.usuario.update({
      where: { id },
      data: { rol },
      select: { id: true, email: true, nombre: true, rol: true, createdAt: true }
    });
    return NextResponse.json(actualizado);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Error interno al actualizar usuario' },
      { status: 500 }
    );
  }
}
