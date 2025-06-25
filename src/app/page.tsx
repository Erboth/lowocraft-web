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
        <a href="/normas" className="hover:underline">📜 Normas</a>
        <a href="/registro" className="hover:underline">📝 Registro</a>
        <a href="/banco" className="hover:underline">💰 Banco de Guild</a>
        <a href="/applys" className="hover:underline">📩 Applys</a>
      </nav>
    </main>
  );
}
