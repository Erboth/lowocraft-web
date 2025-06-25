'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/* ---------- Tipado ---------- */
type Personaje = {
  id: number;
  nombre: string;
  clase: string;
  especializacion: string;
  rol: string;
  etiqueta: string | null;
};

export default function PersonajesPage() {
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [error, setError] = useState<string | null>(null);

  /* ---------- Cargar al montar ---------- */
  useEffect(() => {
    fetch('/api/personajes')
      .then((res) => {
        if (!res.ok) throw new Error('Error en la API');
        return res.json();
      })
      .then(setPersonajes)
      .catch((err) => {
        console.error('Error al obtener personajes:', err);
        setError('No se pudieron cargar los personajes');
      });
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      {/* Contenedor tipo pergamino */}
      <div className="max-w-5xl mx-auto bg-[#f7f0d3cc] text-gray-900 shadow-lg rounded-lg p-8 border border-[#c2b280]">
        {/* Volver */}
        <div className="mb-6">
          <Link href="/" className="text-[#5a3e1b] hover:underline">
            ← Volver a la portada
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">
          📜 Personajes registrados
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {personajes.length === 0 && !error ? (
          <p className="text-center">No hay personajes registrados aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-400">
              <thead className="bg-[#5a3e1b] text-white">
                <tr>
                  <th className="p-2 border">Nombre</th>
                  <th className="p-2 border">Clase</th>
                  <th className="p-2 border">Especialización</th>
                  <th className="p-2 border">Rol</th>
                  <th className="p-2 border">Etiqueta</th>
                  {/* Acciones futuras */}
                </tr>
              </thead>
              <tbody>
                {personajes.map((p) => (
                  <tr key={p.id} className="odd:bg-[#f7f0d3] even:bg-[#e9e1c6]">
                    <td className="p-2 border">{p.nombre}</td>
                    <td className="p-2 border">{p.clase}</td>
                    <td className="p-2 border">{p.especializacion}</td>
                    <td className="p-2 border">{p.rol}</td>
                    <td className="p-2 border">{p.etiqueta ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
