'use client';

import { useEffect, useState } from 'react';

type Apply = {
  id: number;
  nombrePJ: string;
  clase: string;
  especializacion: string;
  uiImageUrl: string;
  discordUsername: string;
  logsLink: string;
  status: string;
  createdAt: string;
};

export default function AdminApplysPage() {
  const [applies, setApplies] = useState<Apply[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/applications?status=PENDING')
      .then(res => res.json())
      .then(data => setApplies(data))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: number, status: 'APPROVED' | 'REJECTED') => {
    await fetch(`/api/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setApplies(curr => curr.filter(a => a.id !== id));
  };

  if (loading) return <p className="p-6">Cargando solicitudes…</p>;
  if (applies.length === 0) return <p className="p-6">No hay solicitudes pendientes.</p>;

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold mb-4">Solicitudes Pendientes</h1>
        {applies.map(a => (
          <div key={a.id} className="bg-gray-900 p-4 rounded">
            <p><strong>{a.nombrePJ}</strong> - {a.clase} / {a.especializacion}</p>
            <p><strong>Discord:</strong> {a.discordUsername}</p>
            <p><strong>Enviado:</strong> {new Date(a.createdAt).toLocaleString()}</p>
            <img
              src={a.uiImageUrl}
              alt={`Interfaz de ${a.nombrePJ}`}
              className="my-2 max-w-xs border"
            />
            <p>
              <a
                href={a.logsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Ver Warcraft Logs
              </a>
            </p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => updateStatus(a.id, 'APPROVED')}
                className="px-3 py-1 bg-green-600 rounded"
              >
                Aprobar
              </button>
              <button
                onClick={() => updateStatus(a.id, 'REJECTED')}
                className="px-3 py-1 bg-red-600 rounded"
              >
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
