// src/app/api/applications/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Crear una nueva solicitud (Apply)
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const characterName   = formData.get('characterName')   as string;
    const characterClass  = formData.get('characterClass')  as string;
    const spec            = formData.get('spec')            as string;
    const uiImageUrl      = formData.get('uiImageUrl')      as string;
    const discordUsername = formData.get('discordUsername') as string;
    const logsLink        = formData.get('logsLink')        as string;

    if (
      !characterName ||
      !characterClass ||
      !spec ||
      !uiImageUrl ||
      !discordUsername ||
      !logsLink
    ) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    // Crear registro directamente con la URL proporcionada
    const nuevoApply = await prisma.apply.create({
      data: {
        nombrePJ:        characterName,
        clase:           characterClass,
        especializacion: spec,
        uiImageUrl,
        discordUsername,
        logsLink,
      },
    });

    return NextResponse.json(nuevoApply, { status: 201 });
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Error interno al crear solicitud: ${message}` },
      { status: 500 }
    );
  }
}

// Listar solicitudes (opcionalmente filtradas por status)
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const statusParam = url.searchParams.get('status');
    const where = statusParam
      ? { status: statusParam.toUpperCase() }
      : undefined;

    const applies = await prisma.apply.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(applies);
  } catch (error) {
    console.error('Error al listar solicitudes:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Error interno al listar solicitudes: ${message}` },
      { status: 500 }
    );
  }
}
