'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Bienvenidos a LowoCraft</h1>
      <p className="text-lg max-w-2xl text-center mb-8">
        LowoCraft es una hermandad de World of Warcraft Classic forjada en la pasión por la aventura, el compañerismo
        y la estrategia. Aquí podrás conocer nuestras normas, unirte al clan, consultar el banco de objetos o aplicar
        para formar parte del equipo.
      </p>

      <nav className="flex flex-col gap-4 text-lg text-blue-400">
        <Link href="/normas" className="hover:underline">📜 Normas</Link>
        <Link href="/registro" className="hover:underline">📝 Registro</Link>
        <Link href="/personajes" className="hover:underline">👥 Personajes</Link>
        <Link href="/banco" className="hover:underline">💰 Banco de Guild</Link>
        <Link href="/applys" className="hover:underline">📩 Applys</Link>
      </nav>
    </main>
  );
}
