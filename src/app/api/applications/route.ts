// src/app/api/applications/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Crear una nueva solicitud (Apply)
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const characterName = formData.get('characterName') as string;
    const characterClass = formData.get('characterClass') as string;
    const spec = formData.get('spec') as string;
    const uiImage = formData.get('uiImage') as File;
    const logsLink = formData.get('logsLink') as string;

    if (!characterName || !characterClass || !spec || !uiImage || !logsLink) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // Aquí deberías subir uiImage a tu almacenamiento y obtener una URL
    // Por ejemplo, usando Vercel Blob o Cloudinary
    // Para esta demo, vamos a simular la URL:
    const uiImageUrl = `/uploads/${uiImage.name}`;

    const nuevoApply = await prisma.apply.create({
      data: {
        nombrePJ: characterName,
        clase: characterClass,
        especializacion: spec,
        uiImageUrl,
        logsLink,
      },
    });

    return NextResponse.json(nuevoApply, { status: 201 });
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    return NextResponse.json({ error: 'Error interno al crear solicitud' }, { status: 500 });
  }
}

// Listar solicitudes (opcionalmente filtradas por status)
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const statusParam = url.searchParams.get('status');
    const where = statusParam ? { status: statusParam.toUpperCase() } : {};

    const applies = await prisma.apply.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(applies);
  } catch (error) {
    console.error('Error al listar solicitudes:', error);
    return NextResponse.json({ error: 'Error interno al listar solicitudes' }, { status: 500 });
  }
}
