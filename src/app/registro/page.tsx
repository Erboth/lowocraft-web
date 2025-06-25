'use client';

import { useState } from 'react';

const especializacionesPorClase: Record<string, string[]> = {
  cazador: ['Puntería', 'Supervivencia', 'Bestias'],
  sacerdote: ['Sagrado', 'Disciplina', 'Sombras'],
  paladín: ['Sagrado', 'Represión', 'Protección'],
  guerrero: ['Furia', 'Armas', 'Protección'],
  druida: ['Equilibrio', 'Feral', 'Restauración', 'Guardian'],
  pícaro: ['Combate', 'Sutileza', 'Asesinato'],
  mago: ['Fuego', 'Escarcha', 'Arcano'],
  brujo: ['Aflicción', 'Demonología', 'Destrucción'],
  chamán: ['Elemental', 'Mejora', 'Restauración'],
};

const determinarRol = (clase: string, espec: string): string => {
  const healSpecs = {
    sacerdote: ['Sagrado', 'Disciplina'],
    paladín: ['Sagrado'],
    druida: ['Restauración'],
    chamán: ['Restauración'],
  };

  const tankSpecs = {
    paladín: ['Protección'],
    guerrero: ['Protección'],
    druida: ['Guardian'],
  };

  if (healSpecs[clase]?.includes(espec)) return 'Healer';
  if (tankSpecs[clase]?.includes(espec)) return 'Tank';
  return 'DPS';
};

export default function RegistroPage() {
  const [form, setForm] = useState({
    nombre: '',
    clase: '',
    especializacion: '',
    rol: '',
    aceptaNormas: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    let updatedForm = { ...form, [name]: type === 'checkbox' ? checked : value };

    if (name === 'clase') {
      updatedForm.especializacion = '';
      updatedForm.rol = '';
    }

    if (name === 'especializacion') {
      const nuevoRol = determinarRol(form.clase, value);
      updatedForm.rol = nuevoRol;
    }

    setForm(updatedForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.aceptaNormas) {
      alert('Debes aceptar las normas para registrarte.');
      return;
    }
    console.log('Datos enviados:', form);
    alert(`¡Registro enviado!\nNombre: ${form.nombre}\nClase: ${form.clase}\nEspecialización: ${form.especializacion}\nRol: ${form.rol}`);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-xl mx-auto bg-[#f7f0d3cc] text-gray-900 shadow-lg rounded-lg p-8 border border-[#c2b280]">
        <h1 className="text-3xl font-bold mb-6 text-center">📝 Registro de Personaje</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block font-semibold mb-1">Nombre del personaje</label>
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

          <div>
            <label htmlFor="clase" className="block font-semibold mb-1">Clase</label>
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
                <option key={cl} value={cl}>{cl.charAt(0).toUpperCase() + cl.slice(1)}</option>
              ))}
            </select>
          </div>

          {form.clase && (
            <div>
              <label htmlFor="especializacion" className="block font-semibold mb-1">Especialización</label>
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
                  <option key={espec} value={espec}>{espec}</option>
                ))}
              </select>
            </div>
          )}

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
              He leído y acepto las <a href="/normas" className="text-blue-600 hover:underline">normas de la guild</a>.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5a3e1b] text-white font-semibold py-2 px-4 rounded hover:bg-[#3f2d15] transition"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-[#5a3e1b] hover:underline">← Volver a la portada</a>
        </div>
      </div>
    </main>
  );
}
