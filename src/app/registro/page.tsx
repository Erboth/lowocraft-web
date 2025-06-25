'use client';

import { useState } from 'react';
import Link from 'next/link';

/* --------------------- Datos base --------------------- */

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

/* --------------------- Lógica de rol --------------------- */

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

/* --------------------- Componente --------------------- */

export default function RegistroPage() {
  const [form, setForm] = useState({
    nombre: '',
    clase: '',
    especializacion: '',
    rol: '',
    aceptaNormas: false,
  });

  /* ---------- Manejador de cambios tipado de forma segura ---------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;

    const updatedForm = {
      ...form,
      [name]:
        type === 'checkbox'
          ? (target as HTMLInputElement).checked
          : value,
    };

    if (name === 'clase') {
      updatedForm.especializacion = '';
      updatedForm.rol = '';
    }

    if (name === 'especializacion') {
      updatedForm.rol = determinarRol(form.clase, value);
    }

    setForm(updatedForm);
  };

  /* --------------------- Envío del formulario --------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.aceptaNormas) {
      alert('Debes aceptar las normas para registrarte.');
      return;
    }

    try {
      const res = await fetch('/api/personajes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert('¡Registro guardado correctamente!');
        setForm({
          nombre: '',
          clase: '',
          especializacion: '',
          rol: '',
          aceptaNormas: false,
        });
      } else {
        alert('Error al registrar personaje.');
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Error al conectar con el servidor.');
    }
  };

  /* --------------------- JSX --------------------- */

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-xl mx-auto bg-[#f7f0d3cc] text-gray-900 shadow-lg rounded-lg p-8 border border-[#c2b280]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📝 Registro de Personaje
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block font-semibold mb-1">
              Nombre del personaje
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>

          {/* Clase */}
          <div>
            <label htmlFor="clase" className="block font-semibold mb-1">
              Clase
            </label>
            <select
              name="clase"
              id="clase"
              value={form.clase}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-400 rounded"
            >
              <option value="">-- Selecciona una clase --</option>
              {Object.keys(especializacionesPorClase).map((cl) => (
                <option key={cl} value={cl}>
                  {cl.charAt(0).toUpperCase() + cl.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Especialización */}
          {form.clase && (
            <div>
              <label
                htmlFor="especializacion"
                className="block font-semibold mb-1"
              >
                Especialización
              </label>
              <select
                name="especializacion"
                id="especializacion"
                value={form.especializacion}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-400 rounded"
              >
                <option value="">-- Selecciona una especialización --</option>
                {especializacionesPorClase[form.clase].map((espec) => (
                  <option key={espec} value={espec}>
                    {espec}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Rol asignado */}
          {form.rol && (
            <div>
              <label className="block font-semibold mb-1">Rol asignado</label>
              <input
                type="text"
                value={form.rol}
                readOnly
                className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-gray-600"
              />
            </div>
          )}

          {/* Aceptar normas */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="aceptaNormas"
              id="aceptaNormas"
              checked={form.aceptaNormas}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="aceptaNormas" className="text-sm">
              He leído y acepto las{' '}
              <Link href="/normas" className="text-blue-600 hover:underline">
                normas de la guild
              </Link>
              .
            </label>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-[#5a3e1b] text-white font-semibold py-2 px-4 rounded hover:bg-[#3f2d15] transition"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-[#5a3e1b] hover:underline"
          >
            ← Volver a la portada
          </Link>
        </div>
      </div>
    </main>
  );
}
