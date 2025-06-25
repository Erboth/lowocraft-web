'use client';

import { useState } from 'react';

type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const accordionData: AccordionItem[] = [
  {
    id: 'convivencia',
    title: '🧠 Normas de convivencia',
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>Respeto absoluto entre miembros.</li>
        <li>Prohibidos comentarios ofensivos o discriminatorios.</li>
        <li>Ayuda a los nuevos jugadores siempre que puedas.</li>
        <li>La guild es una comunidad, no un chat de toxicidad.</li>
      </ul>
    ),
  },
  {
    id: 'raids',
    title: '⚔️ Normas en raids',
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>El loot se reparte de forma justa. Nada de ninjadas.</li>
        <li>Uso obligatorio de Discord con micrófono activo.</li>
        <li>Si te apuntas a una raid, asiste (mínimo 70%).</li>
        <li>No interrumpas al raid leader durante estrategias.</li>
      </ul>
    ),
  },
  {
    id: 'comunicacion',
    title: '💬 Normas de comunicación',
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>El canal de guild no es para spam repetitivo.</li>
        <li>Usa los canales adecuados: trade, party, etc.</li>
        <li>Los dramas se resuelven por privado.</li>
      </ul>
    ),
  },
];

export default function NormasPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto bg-[#f7f0d3cc] text-gray-900 shadow-lg rounded-lg p-8 border border-[#c2b280]">
        <h1 className="text-4xl font-bold mb-6 text-center drop-shadow-lg">
          📜 Normas de LowoCraft
        </h1>

        {accordionData.map(({ id, title, content }) => (
          <div key={id} className="mb-4 border border-[#d6c299] rounded">
            <button
              onClick={() => toggle(id)}
              className="w-full text-left px-4 py-3 font-semibold bg-[#e5dac1] hover:bg-[#ded0b6] transition-all flex justify-between items-center text-lg"
            >
              <span>{title}</span>
              <span>{openId === id ? '−' : '+'}</span>
            </button>
            {openId === id && (
              <div className="px-6 py-4 bg-[#f7f0d3] transition-all text-base">
                {content}
              </div>
            )}
          </div>
        ))}

        <div className="mt-8 text-center">
          <a href="/" className="text-[#5a3e1b] hover:underline text-lg">
            ← Volver a la portada
          </a>
        </div>
      </div>
    </main>
  );
}
