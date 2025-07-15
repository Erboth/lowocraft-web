// src/app/api/usuarios/[id]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Validar y parsear el ID
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json(
      { error: 'ID de usuario inválido' },
      { status: 400 }
    );
  }

  // Leer el nuevo rol desde el body
  const { rol } = await request.json();
  const rolesPermitidos = ['USER', 'ADMIN'];
  if (!rolesPermitidos.includes(rol)) {
    return NextResponse.json(
      { error: `Rol inválido (${rol}). Debe ser USER o ADMIN.` },
      { status: 400 }
    );
  }

  try {
    // Actualizar solo el campo rol
    const actualizado = await prisma.usuario.update({
      where: { id },
      data: { rol },
      select: { id: true, email: true, nombre: true, rol: true, createdAt: true }
    });

    return NextResponse.json(actualizado, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar rol de usuario:', error);
    return NextResponse.json(
      { error: 'Error interno al actualizar el usuario' },
      { status: 500 }
    );
  }
}
