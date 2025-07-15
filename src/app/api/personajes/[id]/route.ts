// src/app/api/applications/[id]/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const { status } = await request.json();
  // Validamos que status sea uno de los valores permitidos
  if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
    return NextResponse.json({ error: 'Estado inválido' }, { status: 400 });
  }

  try {
    const actualizado = await prisma.apply.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(actualizado);
  } catch (error) {
    console.error('Error al actualizar solicitud:', error);
    return NextResponse.json(
      { error: 'Error al actualizar solicitud' },
      { status: 500 }
    );
  }
}
