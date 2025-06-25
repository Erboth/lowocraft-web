'use client';

import { useEffect, useState } from 'react';

type Personaje = {
  id: number;
  nombre: string;
  clase: string;
  especializacion: string;
  rol: string;
  etiqueta: string | null;
};

const especializacionesPorClase: Record<string, string[]> = {
  cazador: ['Bestias', 'Puntería', 'Supervivencia'],
  sacerdote: ['Disciplina', 'Sagrado', 'Sombras'],
  paladín: ['Protección', 'Represión', 'Sagrado'],
  guerrero: ['Armas', 'Furia', 'Protección'],
  druida: ['Equilibrio', 'Feral', 'Guardian', 'Restauración'],
  pícaro: ['Asesinato', 'Combate', 'Sutileza'],
  mago: ['Arcano', 'Escarcha', 'Fuego'],
  brujo: ['Aflicción', 'Demonología', 'Destrucción'],
  chamán: ['Elemental', 'Mejora', 'Restauración'],
  monje: ['Maestro Cervecero', 'Tejedor de Niebla', 'Viajero del Viento'],
};

const determinarRol = (clase: string, espec: string): string => {
  const healSpecs: Record<string, string[]> = {
    sacerdote: ['Sagrado', 'Disciplina'],
    paladín: ['Sagrado'],
    druida: ['Restauración'],
    chamán: ['Restauración'],
    monje: ['Tejedor de Niebla'],
  };

  const tankSpecs: Record<string, string[]> = {
    paladín: ['Protección'],
    guerrero: ['Protección'],
    druida: ['Guardian'],
    monje: ['Maestro Cervecero'],
  };

  if (healSpecs[clase]?.includes(espec)) return 'Healer';
  if (tankSpecs[clase]?.includes(espec)) return 'Tank';
  return 'DPS';
};

export default function PersonajesPage() {
  const [personajes, setPersonajes] = useState<Personaje[]>([]);

  const cargarPersonajes = async () => {
    const res = await fetch('/api/personajes');
    const data = await res.json();
    setPersonajes(data);
  };

  useEffect(() => {
    cargarPersonajes();
  }, []);

  const actualizarPersonaje = async (id: number, updates: Partial<Personaje>) => {
    await fetch(`/api/personajes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    cargarPersonajes();
  };

  const eliminarPersonaje = async (id: number) => {
    if (confirm('¿Seguro que quieres borrar este personaje?')) {
      await fetch(`/api/personajes/${id}`, { method: 'DELETE' });
      cargarPersonajes();
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">📜 Personajes Registrados</h1>

        <table className="w-full table-auto border-collapse bg-white text-black rounded shadow-md overflow-hidden text-sm">
          <thead className="bg-[#5a3e1b] text-white">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Clase</th>
              <th className="p-2">Especialización</th>
              <th className="p-2">Rol</th>
              <th className="p-2">Etiqueta</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personajes.map((pj) => (
              <tr key={pj.id} className="text-center border-t border-gray-300">
                <td className="p-2">{pj.nombre}</td>
                <td className="p-2">{pj.clase}</td>

                <td className="p-2">
                  <select
                    value={pj.especializacion}
                    onChange={(e) => {
                      const nuevaEspec = e.target.value;
                      const nuevoRol = determinarRol(pj.clase, nuevaEspec);
                      actualizarPersonaje(pj.id, {
                        especializacion: nuevaEspec,
                        rol: nuevoRol,
                      });
                    }}
                    className="p-1 border rounded"
                  >
                    {especializacionesPorClase[pj.clase]?.map((espec) => (
                      <option key={espec} value={espec}>
                        {espec}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="p-2">{pj.rol}</td>

                <td className="p-2">
                  <select
                    value={pj.etiqueta ?? ''}
                    onChange={(e) =>
                      actualizarPersonaje(pj.id, { etiqueta: e.target.value || null })
                    }
                    className="p-1 border rounded"
                  >
                    <option value="">-</option>
                    <option value="Roster25">Roster25</option>
                    <option value="Roster10">Roster10</option>
                    <option value="Alter">Alter</option>
                  </select>
                </td>

                <td className="p-2">
                  <button
                    onClick={() => eliminarPersonaje(pj.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
