// src/app/api/usuarios/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        nombre: true,
        rol: true,
        createdAt: true
      },
      orderBy: { email: 'asc' }
    });
    return NextResponse.json(usuarios);
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    return NextResponse.json(
      { error: 'Error al listar usuarios' },
      { status: 500 }
    );
  }
}
