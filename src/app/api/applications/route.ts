// src/app/api/applications/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ApplyStatus } from '@prisma/client';

// Crear una nueva solicitud (Apply)
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const characterName = formData.get('characterName') as string;
    const characterClass = formData.get('characterClass') as string;
    const spec = formData.get('spec') as string;
    const uiImage = formData.get('uiImage') as File;
    const discordUsername = formData.get('discordUsername') as string;
    const logsLink = formData.get('logsLink') as string;

    if (!characterName || !characterClass || !spec || !uiImage || !discordUsername || !logsLink) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // TODO: integrar subida real de uiImage y obtener URL
    const uiImageUrl = `/uploads/${uiImage.name}`;

    const nuevoApply = await prisma.apply.create({
      data: {
        nombrePJ: characterName,
        clase: characterClass,
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
    return NextResponse.json({ error: `Error interno al crear solicitud: ${message}` }, { status: 500 });
  }
}

// Listar solicitudes (opcionalmente filtradas por status)
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const statusParam = url.searchParams.get('status');
    let where: { status?: ApplyStatus } | undefined;

    if (statusParam) {
      const status = statusParam.toUpperCase() as ApplyStatus;
      if (!Object.values(ApplyStatus).includes(status)) {
        return NextResponse.json({ error: 'Estado inválido' }, { status: 400 });
      }
      where = { status };
    }

    const applies = await prisma.apply.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(applies);
  } catch (error) {
    console.error('Error al listar solicitudes:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Error interno al listar solicitudes: ${message}` }, { status: 500 });
  }
}