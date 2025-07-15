"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

// Definición de clases y especializaciones de WoW (Pandaria) en castellano
const CLASES = [
  'Caballero de la muerte',
  'Druida',
  'Cazador',
  'Mago',
  'Monje',
  'Paladín',
  'Sacerdote',
  'Pícaro',
  'Chamán',
  'Brujo',
  'Guerrero',
];

const ESPECIALIZACIONES: Record<string, string[]> = {
  'Caballero de la muerte': ['Sangre', 'Escarcha', 'Profano'],
  Druida: ['Equilibrio', 'Combate feral', 'Guardián', 'Restauración'],
  Cazador: ['Dominio de bestias', 'Puntería', 'Supervivencia'],
  Mago: ['Arcano', 'Fuego', 'Escarcha'],
  Monje: ['Maestro cervecero', 'Tejedor de niebla', 'Caminante del viento'],
  Paladín: ['Sagrado', 'Protección', 'Retribución'],
  Sacerdote: ['Disciplina', 'Sagrado', 'Sombra'],
  Pícaro: ['Asesinato', 'Combate', 'Sutileza'],
  Chamán: ['Elemental', 'Mejora', 'Restauración'],
  Brujo: ['Aflicción', 'Demonología', 'Destrucción'],
  Guerrero: ['Armas', 'Furia', 'Protección'],
};

export default function ApplysPage() {
  const router = useRouter();
  const [characterName, setCharacterName] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [spec, setSpec] = useState('');
  const [uiImageUrl, setUiImageUrl] = useState('');
  const [discordUsername, setDiscordUsername] = useState('');
  const [logsLink, setLogsLink] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !characterName ||
      !characterClass ||
      !spec ||
      !uiImageUrl ||
      !discordUsername ||
      !logsLink
    ) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('characterName', characterName);
      formData.append('characterClass', characterClass);
      formData.append('spec', spec);
      formData.append('uiImageUrl', uiImageUrl);
      formData.append('discordUsername', discordUsername);
      formData.append('logsLink', logsLink);

      const res = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al enviar la solicitud.');

      router.push('/applys/thank-you');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📩 Applys</h1>
        <p className="mb-4">
          Rellena los siguientes campos para enviar tu aplicación a raideos, roster y más:
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre de personaje */}
          <div>
            <label htmlFor="characterName" className="block mb-1">
              Nombre de personaje en WoW
            </label>
            <input
              id="characterName"
              type="text"
              value={characterName}
              onChange={e => setCharacterName(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required
            />
          </div>

          {/* Selector de clase */}
          <div>
            <label htmlFor="characterClass" className="block mb-1">
              Clase
            </label>
            <select
              id="characterClass"
              value={characterClass}
              onChange={e => { setCharacterClass(e.target.value); setSpec(''); }}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required
            >
              <option value="">Selecciona una clase</option>
              {CLASES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Selector de especialización */}
          <div>
            <label htmlFor="spec" className="block mb-1">
              Especialización
            </label>
            <select
              id="spec"
              value={spec}
              onChange={e => setSpec(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required
              disabled={!characterClass}
            >
              <option value="">Selecciona una especialización</option>
              {characterClass &&
                ESPECIALIZACIONES[characterClass].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
            </select>
          </div>

          {/* URL de imagen de interfaz */}
          <div>
            <label htmlFor="uiImageUrl" className="block mb-1">
              URL de la imagen de tu interfaz
            </label>
            <input
              id="uiImageUrl"
              type="url"
              value={uiImageUrl}
              onChange={e => setUiImageUrl(e.target.value)}
              placeholder="https://i.imgur.com/ejemplo.png"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required
            />
          </div>

          {/* Usuario de Discord */}
          <div>
            <label htmlFor="discordUsername" className="block mb-1">
              Usuario de Discord <span className="text-sm text-gray-400">(nombre#0000)</span>
            </label>
            <input
              id="discordUsername"
              type="text"
              value={discordUsername}
              onChange={e => setDiscordUsername(e.target.value)}
              placeholder="Kolkuth#1234"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required
            />
          </div>

          {/* Enlace a Warcraft Logs */}
          <div>
            <label htmlFor="logsLink" className="block mb-1">
              Enlace a Warcraft Logs
            </label>
            <input
              id="logsLink"
              type="url"
              value={logsLink}
              onChange={e => setLogsLink(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Enviando...' : 'Enviar aplicación'}
          </button>
        </form>
      </div>
    </main>
  );
}
