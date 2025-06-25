'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

  // Cargar personajes al montar el componente
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
    <main className="p-6">
      {/* Botón de volver */}
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Volver a la portada
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">
        Lista de personajes registrados
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {personajes.length === 0 && !error ? (
        <p>No hay personajes registrados aún.</p>
      ) : (
        <ul className="space-y-2">
          {personajes.map((p) => (
            <li
              key={p.id}
              className="border p-4 rounded bg-gray-100 text-black"
            >
              <strong>{p.nombre}</strong> — {p.clase} ({p.rol})
              {p.especializacion && ` – ${p.especializacion}`}
              {p.etiqueta && (
                <span className="ml-2 text-sm text-gray-600 italic">
                  [{p.etiqueta}]
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
