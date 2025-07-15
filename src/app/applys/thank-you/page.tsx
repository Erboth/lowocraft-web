import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-4xl font-bold">¡Gracias!</h1>
        <p>Tu aplicación ha sido enviada correctamente. Pronto nos pondremos en contacto contigo.</p>
        <Link href="/" className="inline-block mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}