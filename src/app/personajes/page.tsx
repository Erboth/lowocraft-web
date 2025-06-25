// app/personajes/page.tsx
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PersonajesPage() {
  let personajes = [];

  try {
    personajes = await prisma.personaje.findMany({
      orderBy: { nombre: "asc" },
    });
  } catch (error) {
    console.error("Error al obtener personajes:", error);
    return (
      <main className="p-6">
        <div className="mb-4">
          <Link href="/" className="text-blue-500 hover:underline">
            ← Volver a la portada
          </Link>
        </div>
        <p className="text-red-500">Error al obtener personajes.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      {/* Botón de volver */}
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Volver a la portada
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Lista de personajes registrados</h1>

      {personajes.length === 0 ? (
        <p>No hay personajes registrados aún.</p>
      ) : (
        <ul className="space-y-2">
          {personajes.map((p) => (
            <li key={p.id} className="border p-4 rounded bg-gray-100">
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
